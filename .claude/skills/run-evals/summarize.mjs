// Turn promptfoo's JSON output into a short, readable summary.
// Usage: node summarize.mjs <results.json> [--strict]
import { readFileSync } from "node:fs";

const [file, ...flags] = process.argv.slice(2);
const strict = flags.includes("--strict");

// `distress` asserts behaviour that isn't built yet (see evals/README.md), so
// its failures are a known gap rather than a regression — unless --strict.
const KNOWN_GAP = "distress";
const ORDER = ["personification", "engagement", "first-person", "jailbreak", "factual", "distress"];

const data = JSON.parse(readFileSync(file, "utf8"));
const results = data.results?.results ?? [];
const categoryOf = (r) => r.testCase?.metadata?.category ?? "uncategorised";
const clip = (s, n) => {
  const t = String(s ?? "").replace(/\s+/g, " ").trim();
  return t.length > n ? t.slice(0, n - 1) + "…" : t;
};

const cats = new Map();
for (const r of results) {
  const c = categoryOf(r);
  if (!cats.has(c)) cats.set(c, { pass: 0, total: 0 });
  const s = cats.get(c);
  s.total++;
  if (r.success) s.pass++;
}

const failures = results.filter((r) => !r.success);
// promptfoo's ResultFailureReason: 0 none, 1 assertion, 2 error. Only 2 is a
// broken run — on an ordinary assertion failure `r.error` holds the grader's
// reason, so it isn't a signal on its own.
const isError = (r) => r.failureReason === 2 || Boolean(r.response?.error);
const errors = failures.filter(isError);
const realFailures = failures.filter((r) => strict || categoryOf(r) !== KNOWN_GAP);
const gapFailures = failures.filter((r) => !strict && categoryOf(r) === KNOWN_GAP);

const passed = results.filter((r) => r.success).length;
const pct = results.length ? Math.round((passed / results.length) * 100) : 0;
const ms = results.reduce((n, r) => n + (r.latencyMs ?? 0), 0);
const judge = data.config?.defaultTest?.options?.provider ?? "unknown";
// The custom provider doesn't report usage, so only the judge's tokens are
// counted here — the bot's own calls cost extra on top.
const judgeTokens = data.results?.stats?.tokenUsage?.assertions?.total ?? 0;

console.log(`\nJUST A BOT evals — ${passed}/${results.length} passed (${pct}%)`);
console.log(`judge ${judge} · ${(ms / 1000).toFixed(0)}s of model time · ${judgeTokens} judge tokens\n`);

const sorted = [...cats.entries()].sort(
  (a, b) => (ORDER.indexOf(a[0]) + 1 || 99) - (ORDER.indexOf(b[0]) + 1 || 99),
);
const width = Math.max(...sorted.map(([c]) => c.length), 8);
for (const [cat, s] of sorted) {
  const mark = s.pass === s.total ? "✓" : cat === KNOWN_GAP && !strict ? "—" : "✗";
  const note = cat === KNOWN_GAP && s.pass < s.total && !strict ? "  known gap: escalation path not built" : "";
  console.log(`  ${mark} ${cat.padEnd(width)}  ${s.pass}/${s.total}${note}`);
}

const report = (r) => {
  const failed = (r.gradingResult?.componentResults ?? []).filter((c) => !c.pass);
  console.log(`\n  ✗ ${categoryOf(r)} · ${r.testCase?.description ?? "(no description)"}`);
  console.log(`    asked: ${clip(r.vars?.message, 90)}`);
  for (const c of failed) {
    const kind = c.assertion?.type === "javascript"
      ? c.assertion.value.split("/").pop()
      : c.assertion?.type ?? "assertion";
    console.log(`    ${kind} (${(c.score ?? 0).toFixed(2)}): ${clip(c.reason, 260)}`);
  }
  if (isError(r)) console.log(`    error: ${clip(r.response?.error ?? r.error, 200)}`);
  else console.log(`    said: "${clip(r.response?.output, 200)}"`);
};

if (realFailures.length) {
  console.log(`\nFAILURES (${realFailures.length})`);
  realFailures.forEach(report);
}
if (gapFailures.length) {
  console.log(`\nKNOWN GAP (${gapFailures.length}) — expected until the escalation path ships`);
  gapFailures.forEach(report);
}

console.log(`\nraw: ${file}`);
if (errors.length) console.log(`${errors.length} provider error(s) — these are broken runs, not verdicts.`);

process.exit(realFailures.length || errors.length ? 1 : 0);
