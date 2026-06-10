# Moloni API - cURL Examples

This file provides cURL command examples for all endpoints available through the
Moloni Client library.

## Authentication

### Get Access Token

Send credentials in the request body — never on the URL — so they don't end up
in shell history, `Referer` headers, or proxy/CDN access logs.

```bash
# Authentication - Get access token
curl -X POST "https://api.moloni.pt/v1/grant/" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Accept: application/json" \
  --data-urlencode "grant_type=password" \
  --data-urlencode "client_id=YOUR_CLIENT_ID" \
  --data-urlencode "client_secret=YOUR_CLIENT_SECRET" \
  --data-urlencode "username=YOUR_USERNAME" \
  --data-urlencode "password=YOUR_PASSWORD"
```

or, using the `.env` settings from the root of the repo to grab the access token
and export it:

```bash
export MOLONI_ACCESS_TOKEN=`dotenv curl -X POST "https://api.moloni.pt/v1/grant/" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Accept: application/json" \
  --data-urlencode "grant_type=password" \
  --data-urlencode "client_id=${MOLONI_CLIENT_ID}" \
  --data-urlencode "client_secret=${MOLONI_CLIENT_SECRET}" \
  --data-urlencode "username=${MOLONI_USER}" \
  --data-urlencode "password=${MOLONI_PASSWORD}" | jq -r ".access_token"`
```

**Response:**

```json
{
  "access_token": "abc123...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "def456..."
}
```

## Base URL and Common Parameters

- **API Base URL:** `https://api.moloni.pt/v1`
- **Sandbox URL:** `https://api.moloni.pt/sandbox`
- All POST requests require `access_token`, `human_errors=true`, `json=true` as
  query parameters
- All requests require `company_id` in the request body

## Documents API

### General Documents

#### Get All Documents

```bash
curl -X POST "https://api.moloni.pt/v1/documents/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "status": 1
  }'
```

#### Count Documents

```bash
curl -X POST "https://api.moloni.pt/v1/documents/count/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "status": 0
  }'
```

#### Get One Document

```bash
curl -X POST "https://api.moloni.pt/v1/documents/getOne/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "document_id": 67890
  }'
```

### Invoices

#### Get All Invoices

```bash
curl -X POST "https://api.moloni.pt/v1/invoices/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "status": 0,
    "date_from": "2023-01-01",
    "date_to": "2023-12-31",
    "limit": 50,
    "offset": 0
  }'
```

#### Get One Invoice

```bash
curl -X POST "https://api.moloni.pt/v1/invoices/getOne/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "document_id": 67890
  }'
```

#### Create Invoice

```bash
curl -X POST "https://api.moloni.pt/v1/invoices/insert/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "date": "2023-12-01",
    "document_set_id": 1,
    "customer_id": 123,
    "products": [
      {
        "product_id": 456,
        "qty": 2,
        "price": 25.00
      }
    ]
  }'
```

### Receipts

#### Get All Receipts

```bash
curl -X POST "https://api.moloni.pt/v1/receipts/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "status": 1,
    "customer_id": 123
  }'
```

### Credit Notes

#### Get All Credit Notes

```bash
curl -X POST "https://api.moloni.pt/v1/creditNotes/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "status": 1
  }'
```

### Debit Notes

#### Get All Debit Notes

```bash
curl -X POST "https://api.moloni.pt/v1/debitNotes/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211
  }'
```

### Simplified Invoices

#### Get All Simplified Invoices

```bash
curl -X POST "https://api.moloni.pt/v1/simplifiedInvoices/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "limit": 100
  }'
```

### Delivery Notes

#### Get All Delivery Notes

```bash
curl -X POST "https://api.moloni.pt/v1/deliveryNotes/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "status": 1
  }'
```

### Purchase Orders

#### Get All Purchase Orders

```bash
curl -X POST "https://api.moloni.pt/v1/purchaseOrder/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "supplier_id": 789
  }'
```

### Supplier Documents

#### Get All Supplier Invoices

```bash
curl -X POST "https://api.moloni.pt/v1/supplierInvoices/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "date_from": "2023-01-01",
    "supplier_id": 456
  }'
```

#### Get All Supplier Purchase Orders

```bash
curl -X POST "https://api.moloni.pt/v1/supplierPurchaseOrder/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211
  }'
```

### Transport Documents

#### Get All Bills of Lading

```bash
curl -X POST "https://api.moloni.pt/v1/billsOfLading/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211
  }'
```

#### Get All Waybills

```bash
curl -X POST "https://api.moloni.pt/v1/waybills/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "transport_code": "ABC123"
  }'
```

### Pending Documents

#### Get All Pending Documents

```bash
curl -X POST "https://api.moloni.pt/v1/SalesPending/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "limit": 25
  }'
```

### Settlement Notes

#### Get All Settlement Notes

```bash
curl -X POST "https://api.moloni.pt/v1/settlementNotes/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "customer_id": 123
  }'
```

## Products API

### Products

#### Get All Products

```bash
curl -X POST "https://api.moloni.pt/v1/products/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "category_id": 5,
    "limit": 50
  }'
```

#### Get One Product

```bash
curl -X POST "https://api.moloni.pt/v1/products/getOne/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "product_id": 789
  }'
```

#### Create Product

```bash
curl -X POST "https://api.moloni.pt/v1/products/insert/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "category_id": 1,
    "type": 1,
    "name": "Product Name",
    "summary": "Product description",
    "reference": "REF001",
    "price": 25.99,
    "unit_id": 1,
    "has_stock": 1,
    "stock": 100,
    "taxes": [
      {
        "tax_id": 1,
        "value": 23,
        "order": 1,
        "cumulative": 0
      }
    ]
  }'
```

#### Update Product

```bash
curl -X POST "https://api.moloni.pt/v1/products/update/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "product_id": 789,
    "name": "Updated Product Name",
    "price": 29.99
  }'
```

### Product Categories

#### Get All Product Categories

```bash
curl -X POST "https://api.moloni.pt/v1/productCategories/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211
  }'
```

### Product Stocks

#### Get Product Stock

```bash
curl -X POST "https://api.moloni.pt/v1/productStocks/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "product_id": 789
  }'
```

## Company API

#### Get Company Information

```bash
curl -X POST "https://api.moloni.pt/v1/companies/getOne/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211
  }'
```

#### Get All Companies

```bash
curl -X POST "https://api.moloni.pt/v1/companies/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{}'
```

## Users API

#### Get User Information

```bash
curl -X POST "https://api.moloni.pt/v1/users/getMe/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{}'
```

## Entities API

### Customers

#### Get All Customers

```bash
curl -X POST "https://api.moloni.pt/v1/customers/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "limit": 50
  }'
```

#### Get One Customer

```bash
curl -X POST "https://api.moloni.pt/v1/customers/getOne/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "customer_id": 123
  }'
```

#### Create Customer

```bash
curl -X POST "https://api.moloni.pt/v1/customers/insert/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211,
    "vat": "123456789",
    "number": "1001",
    "name": "Customer Name",
    "language_id": 1,
    "address": "Customer Address",
    "zip_code": "1000-001",
    "city": "Lisbon",
    "country_id": 1,
    "email": "customer@example.com",
    "phone": "+351912345678"
  }'
```

### Suppliers

#### Get All Suppliers

```bash
curl -X POST "https://api.moloni.pt/v1/suppliers/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211
  }'
```

### Salesmen

#### Get All Salesmen

```bash
curl -X POST "https://api.moloni.pt/v1/salesmen/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211
  }'
```

## Settings API

### Document Sets

#### Get All Document Sets

```bash
curl -X POST "https://api.moloni.pt/v1/documentSets/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211
  }'
```

### Payment Methods

#### Get All Payment Methods

```bash
curl -X POST "https://api.moloni.pt/v1/paymentMethods/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211
  }'
```

### Taxes

#### Get All Taxes

```bash
curl -X POST "https://api.moloni.pt/v1/taxes/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211
  }'
```

### Warehouses

#### Get All Warehouses

```bash
curl -X POST "https://api.moloni.pt/v1/warehouses/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211
  }'
```

### Measurement Units

#### Get All Measurement Units

```bash
curl -X POST "https://api.moloni.pt/v1/measurementUnits/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{
    "company_id": 240211
  }'
```

## Global Data API

### Countries

#### Get All Countries

```bash
curl -X POST "https://api.moloni.pt/v1/countries/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{}'
```

### Currencies

#### Get All Currencies

```bash
curl -X POST "https://api.moloni.pt/v1/currencies/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{}'
```

### Languages

#### Get All Languages

```bash
curl -X POST "https://api.moloni.pt/v1/languages/getAll/?access_token=${MOLONI_ACCESS_TOKEN}&human_errors=true&json=true" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d '{}'
```

## Error Handling

### Common Error Response Format

```json
{
  "error": "invalid_request",
  "error_description": "The request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once, or is otherwise malformed."
}
```

### HTTP Status Codes

- `200` - Success
- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (invalid access token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

## Rate Limiting

The Moloni API has rate limiting in place. If you exceed the rate limit, you'll
receive a `429` status code.

## Notes

1. Replace `${MOLONI_ACCESS_TOKEN}` with the actual access token obtained from
   authentication
2. Replace `YOUR_CLIENT_ID`, `YOUR_CLIENT_SECRET`, `YOUR_USERNAME`,
   `YOUR_PASSWORD` with your actual credentials
3. Replace `12345` with your actual company ID
4. All timestamps should be in `YYYY-MM-DD` format for dates
5. The `human_errors=true` parameter provides more descriptive error messages
6. The `json=true` parameter ensures responses are in JSON format
7. Request bodies should be valid JSON strings
8. All POST requests use `application/x-www-form-urlencoded` content type
