#!/bin/bash

# Moloni API Data Retrieval Script
# Retrieves data from Moloni API for Higitotal company and stores in canned responses
# Only executes GET operations (getAll, getOne, getMe, count)

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory and paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
CANNED_DIR="$SCRIPT_DIR/canned"
ENV_FILE="$PROJECT_ROOT/.env"
LOG_FILE="$SCRIPT_DIR/fetch-log-$(date +%Y%m%d_%H%M%S).log"

# Counters
SUCCESS_COUNT=0
ERROR_COUNT=0
EMPTY_COUNT=0

echo -e "${BLUE}=== Moloni API Data Retrieval Script ===${NC}"
echo "Project Root: $PROJECT_ROOT"
echo "Canned Dir: $CANNED_DIR"
echo "Log File: $LOG_FILE"
echo ""

# Function to log messages
log() {
    local level="$1"
    local message="$2"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [$level] $message" >> "$LOG_FILE"
    
    case "$level" in
        "ERROR")
            echo -e "${RED}❌ $message${NC}" >&2
            ;;
        "SUCCESS")
            echo -e "${GREEN}✅ $message${NC}" >&2
            ;;
        "WARNING")
            echo -e "${YELLOW}⚠️ $message${NC}" >&2
            ;;
        "INFO")
            echo -e "${BLUE}ℹ️ $message${NC}" >&2
            ;;
    esac
}

# Check if .env file exists
if [[ ! -f "$ENV_FILE" ]]; then
    log "ERROR" ".env file not found at $ENV_FILE"
    exit 1
fi

# Load environment variables
log "INFO" "Loading environment variables from .env file..."
set -a
source "$ENV_FILE"
set +a

# Check required environment variables
required_vars=("MOLONI_CLIENT_ID" "MOLONI_CLIENT_SECRET" "MOLONI_USER" "MOLONI_PASSWORD")
for var in "${required_vars[@]}"; do
    if [[ -z "${!var:-}" ]]; then
        log "ERROR" "Required environment variable $var is not set"
        exit 1
    fi
done

log "SUCCESS" "Environment variables loaded successfully"

# Create canned directory structure
log "INFO" "Creating directory structure..."
mkdir -p "$CANNED_DIR"

# Function to authenticate and get access token
authenticate() {
    log "INFO" "Authenticating with Moloni API..."

    local auth_url="https://api.moloni.pt/v1/grant/?grant_type=password&client_id=${MOLONI_CLIENT_ID}&client_secret=${MOLONI_CLIENT_SECRET}&username=${MOLONI_USER}&password=${MOLONI_PASSWORD}"

    local response
    if ! response=$(curl -s -X GET "$auth_url" -H "Accept: */*" -H "Connection: keep-alive"); then
        log "ERROR" "Failed to authenticate with Moloni API"
        exit 1
    fi

    # Check if response contains error
    if echo "$response" | grep -q "error"; then
        log "ERROR" "Authentication failed: $response"
        exit 1
    fi

    # Extract access token
    local access_token
    if ! access_token=$(echo "$response" | jq -r '.access_token' | tr -d '\n\r'); then
        log "ERROR" "Failed to parse access token from response"
        exit 1
    fi

    if [[ "$access_token" == "null" || -z "$access_token" ]]; then
        log "ERROR" "Access token is null or empty"
        exit 1
    fi

    log "SUCCESS" "Authentication successful"

    # Only output the token to stdout
    echo -n "$access_token"
}

# Function to make API request and save response
make_request() {
    local endpoint="$1"
    local data="$2"
    local output_dir="$3"
    local description="$4"
    
    log "INFO" "Fetching $description..."
    
    # Create output directory
    mkdir -p "$output_dir"
    
    # Make request
    local response
    echo -n "${MOLONI_ACCESS_TOKEN}" | xxd >&2
    echo "https://api.moloni.pt${endpoint}?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" | xxd >&2
    if ! response=$(curl -X POST "https://api.moloni.pt${endpoint}?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
        -H "Content-Type: application/x-www-form-urlencoded" \
        -d "$data"); then
        log "ERROR" "Failed to fetch $description. Response: $response"
        ((ERROR_COUNT++))
        return 1
    fi
    
    # Check if response contains error
    if echo "$response" | grep -q '"error"'; then
        local error_msg=$(echo "$response" | jq -r '.error_description // .error')
        log "ERROR" "$description failed: $error_msg"
        ((ERROR_COUNT++))
        return 1
    fi
    
    # Check if response is empty or null
    if [[ "$response" == "null" || "$response" == "[]" || "$response" == "{}" || -z "$response" ]]; then
        log "WARNING" "$description returned empty response"
        ((EMPTY_COUNT++))
        return 0
    fi
    
    # Save response to file
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local output_file="$output_dir/response.json"
    
    if echo "$response" | jq . > "$output_file"; then
        log "SUCCESS" "$description saved to $output_file"
        ((SUCCESS_COUNT++))
    else
        log "ERROR" "Failed to save $description - invalid JSON"
        echo "$response" > "$output_dir/response_${timestamp}.txt"
        log "WARNING" "Raw response saved as .txt file"
        ((ERROR_COUNT++))
    fi
    
    # Add small delay to respect rate limits
    sleep 0.5
}

# Get access token
MOLONI_ACCESS_TOKEN=$(authenticate)
# Trim any whitespace from the token
MOLONI_ACCESS_TOKEN=$(echo -n "$MOLONI_ACCESS_TOKEN" | tr -d '[:space:]')

log "INFO" "Starting data retrieval for company ID: 240211"
echo ""

# Define all GET endpoints with their parameters
declare -a endpoints=(
    # Documents
    "/v1/documents/getAll/|{\"company_id\": 240211, \"qtd\": 100}|v1/documents/getAll|Documents - Get All"
    "/v1/documents/count/|{\"company_id\": 240211}|v1/documents/count|Documents - Count"
    
    # Invoices
    "/v1/invoices/getAll/|{\"company_id\": 240211, \"limit\": 50}|v1/invoices/getAll|Invoices - Get All"
    
    # Receipts
    "/v1/receipts/getAll/|{\"company_id\": 240211}|v1/receipts/getAll|Receipts - Get All"
    
    # Credit Notes
    "/v1/creditNotes/getAll/|{\"company_id\": 240211}|v1/creditNotes/getAll|Credit Notes - Get All"
    
    # Debit Notes
    "/v1/debitNotes/getAll/|{\"company_id\": 240211}|v1/debitNotes/getAll|Debit Notes - Get All"
    
    # Simplified Invoices
    "/v1/simplifiedInvoices/getAll/|{\"company_id\": 240211, \"limit\": 100}|v1/simplifiedInvoices/getAll|Simplified Invoices - Get All"
    
    # Delivery Notes
    "/v1/deliveryNotes/getAll/|{\"company_id\": 240211}|v1/deliveryNotes/getAll|Delivery Notes - Get All"
    
    # Purchase Orders
    "/v1/purchaseOrder/getAll/|{\"company_id\": 240211}|v1/purchaseOrder/getAll|Purchase Orders - Get All"
    
    # Supplier Documents
    "/v1/supplierInvoices/getAll/|{\"company_id\": 240211}|v1/supplierInvoices/getAll|Supplier Invoices - Get All"
    "/v1/supplierPurchaseOrder/getAll/|{\"company_id\": 240211}|v1/supplierPurchaseOrder/getAll|Supplier Purchase Orders - Get All"
    
    # Transport Documents
    "/v1/billsOfLading/getAll/|{\"company_id\": 240211}|v1/billsOfLading/getAll|Bills of Lading - Get All"
    "/v1/waybills/getAll/|{\"company_id\": 240211}|v1/waybills/getAll|Waybills - Get All"
    
    # Pending Documents
    "/v1/SalesPending/getAll/|{\"company_id\": 240211, \"limit\": 25}|v1/SalesPending/getAll|Pending Documents - Get All"
    
    # Settlement Notes
    "/v1/settlementNotes/getAll/|{\"company_id\": 240211}|v1/settlementNotes/getAll|Settlement Notes - Get All"
    
    # Products
    "/v1/products/getAll/|{\"company_id\": 240211, \"limit\": 50}|v1/products/getAll|Products - Get All"
    
    # Product Categories
    "/v1/productCategories/getAll/|{\"company_id\": 240211}|v1/productCategories/getAll|Product Categories - Get All"
    
    # Product Stocks
    "/v1/productStocks/getAll/|{\"company_id\": 240211}|v1/productStocks/getAll|Product Stocks - Get All"
    
    # Company
    "/v1/companies/getOne/|{\"company_id\": 240211}|v1/companies/getOne|Company - Get One"
    "/v1/companies/getAll/|{}|v1/companies/getAll|Companies - Get All"
    
    # Users
    "/v1/users/getMe/|{}|v1/users/getMe|Users - Get Me"
    
    # Customers
    "/v1/customers/getAll/|{\"company_id\": 240211, \"limit\": 50}|v1/customers/getAll|Customers - Get All"
    
    # Suppliers
    "/v1/suppliers/getAll/|{\"company_id\": 240211}|v1/suppliers/getAll|Suppliers - Get All"
    
    # Salesmen
    "/v1/salesmen/getAll/|{\"company_id\": 240211}|v1/salesmen/getAll|Salesmen - Get All"
    
    # Settings - Document Sets
    "/v1/documentSets/getAll/|{\"company_id\": 240211}|v1/documentSets/getAll|Document Sets - Get All"
    
    # Settings - Payment Methods
    "/v1/paymentMethods/getAll/|{\"company_id\": 240211}|v1/paymentMethods/getAll|Payment Methods - Get All"
    
    # Settings - Taxes
    "/v1/taxes/getAll/|{\"company_id\": 240211}|v1/taxes/getAll|Taxes - Get All"
    
    # Settings - Warehouses
    "/v1/warehouses/getAll/|{\"company_id\": 240211}|v1/warehouses/getAll|Warehouses - Get All"
    
    # Settings - Measurement Units
    "/v1/measurementUnits/getAll/|{\"company_id\": 240211}|v1/measurementUnits/getAll|Measurement Units - Get All"
    
    # Global Data - Countries
    "/v1/countries/getAll/|{}|v1/countries/getAll|Countries - Get All"
    
    # Global Data - Currencies
    "/v1/currencies/getAll/|{}|v1/currencies/getAll|Currencies - Get All"
    
    # Global Data - Languages
    "/v1/languages/getAll/|{}|v1/languages/getAll|Languages - Get All"
)

# Process each endpoint
for endpoint_config in "${endpoints[@]}"; do
    IFS='|' read -r endpoint data path description <<< "$endpoint_config"
    
    output_dir="$CANNED_DIR/$path"
    make_request "$endpoint" "$data" "$output_dir" "$description"
done

echo ""
echo -e "${BLUE}=== Summary ===${NC}"
echo -e "${GREEN}Successful requests: $SUCCESS_COUNT${NC}"
echo -e "${YELLOW}Empty responses: $EMPTY_COUNT${NC}"
echo -e "${RED}Failed requests: $ERROR_COUNT${NC}"
echo -e "${BLUE}Total requests: $((SUCCESS_COUNT + EMPTY_COUNT + ERROR_COUNT))${NC}"
echo ""
echo -e "${BLUE}Log file: $LOG_FILE${NC}"
echo -e "${BLUE}Canned responses directory: $CANNED_DIR${NC}"

log "INFO" "Script completed - Success: $SUCCESS_COUNT, Empty: $EMPTY_COUNT, Errors: $ERROR_COUNT"

if [[ $ERROR_COUNT -gt 0 ]]; then
    exit 1
fi
