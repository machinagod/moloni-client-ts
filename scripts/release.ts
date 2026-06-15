#!/usr/bin/env -S deno run --allow-read=. --allow-write=deno.json --allow-run=git,deno
/**
 * Release helper — bump the semver version in deno.json, commit, tag, and push.
 *
 * Usage:
 *   deno task release            # patch bump (default)
 *   deno task release patch
 *   deno task release minor
 *   deno task release major
 *   deno task release 1.4.0      # set an explicit version
 *   deno task release minor --dry-run
 *
 * Flow: require a clean working tree on an up-to-date `main` → bump the version
 * → run the full gate (`deno task ok`) → commit → annotated tag `vX.Y.Z` →
 * push the commit and the tag. Pushing the tag triggers the publish workflow
 * (.github/workflows/publish.yml), which re-runs the gate and publishes to JSR.
 */

const DENO_JSON = "deno.json";

function die(msg: string): never {
  console.error(`release: ${msg}`);
  Deno.exit(1);
}

/** Run a git subcommand. Returns trimmed stdout when `capture` is set. */
async function git(
  args: string[],
  { capture = false }: { capture?: boolean } = {},
): Promise<string> {
  const { code, stdout } = await new Deno.Command("git", {
    args,
    stdout: capture ? "piped" : "inherit",
    stderr: "inherit",
  }).output();
  if (code !== 0) die(`\`git ${args.join(" ")}\` failed (exit ${code})`);
  return capture ? new TextDecoder().decode(stdout).trim() : "";
}

function parseSemver(v: string): [number, number, number] {
  const m = v.match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!m) die(`"${v}" is not a plain semver version (expected x.y.z)`);
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function bump(version: string, kind: string): string {
  let [major, minor, patch] = parseSemver(version);
  switch (kind) {
    case "major":
      major++, (minor = 0), (patch = 0);
      break;
    case "minor":
      minor++, (patch = 0);
      break;
    case "patch":
      patch++;
      break;
    default:
      die(
        `unknown bump "${kind}" (use patch | minor | major or an explicit x.y.z)`,
      );
  }
  return `${major}.${minor}.${patch}`;
}

/** Returns negative / 0 / positive like a comparator. */
function compare(a: string, b: string): number {
  const pa = parseSemver(a), pb = parseSemver(b);
  return pa[0] - pb[0] || pa[1] - pb[1] || pa[2] - pb[2];
}

// --- parse arguments ---
const dryRun = Deno.args.includes("--dry-run");
const spec = Deno.args.find((a) => !a.startsWith("--")) ?? "patch";

// --- determine current and next version ---
const raw = await Deno.readTextFile(DENO_JSON);
const current = JSON.parse(raw).version;
if (typeof current !== "string") {
  die(`no string "version" field in ${DENO_JSON}`);
}

const explicit = /^\d+\.\d+\.\d+$/.test(spec);
const next = explicit ? spec : bump(current, spec);
const tag = `v${next}`;

if (explicit && compare(next, current) <= 0) {
  die(`requested version ${next} is not greater than current ${current}`);
}

console.log(
  `release: ${current} → ${next}  (tag ${tag})${dryRun ? "  [dry-run]" : ""}`,
);

// --- preflight checks ---
const branch = await git(["rev-parse", "--abbrev-ref", "HEAD"], {
  capture: true,
});
if (branch !== "main") die(`must be on main (currently on "${branch}")`);

if (await git(["status", "--porcelain"], { capture: true })) {
  die("working tree is not clean — commit or stash changes first");
}

await git(["fetch", "origin", "main", "--tags"]);
const behind = await git(["rev-list", "--count", "HEAD..origin/main"], {
  capture: true,
});
if (behind !== "0") {
  die(`local main is ${behind} commit(s) behind origin/main — pull first`);
}

if (await git(["tag", "--list", tag], { capture: true })) {
  die(`tag ${tag} already exists`);
}

if (dryRun) {
  console.log("release: dry-run — nothing written, committed, or pushed.");
  Deno.exit(0);
}

// --- bump the version (targeted replace keeps deno.json formatting intact) ---
const updated = raw.replace(/("version"\s*:\s*")[^"]*(")/, `$1${next}$2`);
if (updated === raw) {
  die(`could not rewrite the "version" field in ${DENO_JSON}`);
}
await Deno.writeTextFile(DENO_JSON, updated);

// --- gate: the same full check CI and the pre-commit hook run ---
console.log("release: running gate (deno task ok)…");
const gate = await new Deno.Command("deno", {
  args: ["task", "ok"],
  stdout: "inherit",
  stderr: "inherit",
}).output();
if (gate.code !== 0) {
  await git(["checkout", "--", DENO_JSON]); // revert the bump so the tree stays clean
  die(
    "gate failed (deno task ok) — reverted the version bump, nothing committed",
  );
}

// --- commit, tag, push ---
// --no-verify: the identical gate ran above, so skip the pre-commit hook rather
// than run the whole suite a second time.
await git(["add", DENO_JSON]);
await git(["commit", "--no-verify", "-m", `chore: release ${tag}`]);
await git(["tag", "-a", tag, "-m", `Release ${tag}`]);

console.log(`release: pushing commit and ${tag}…`);
await git(["push", "origin", "main"]);
await git(["push", "origin", tag]);

console.log(
  `release: ${tag} pushed. The publish workflow will build and publish it to JSR.`,
);
