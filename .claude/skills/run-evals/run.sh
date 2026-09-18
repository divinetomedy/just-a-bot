#!/usr/bin/env bash
# Run the JUST A BOT eval suite and print a compact summary.
# Any arguments are passed through to `promptfoo eval`.
set -uo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
cd "$REPO_ROOT"

# --strict is ours, not promptfoo's — pull it out before forwarding.
STRICT=""
ARGS=()
for arg in "$@"; do
  if [ "$arg" = "--strict" ]; then STRICT="--strict"; else ARGS+=("$arg"); fi
done

# promptfoo needs Node ^20.20.0 || >=22.22.0 and exits with a confusing error
# otherwise. The repo's default Node frequently isn't one of those, so find one
# that is rather than making the caller debug it.
find_node() {
  local candidates=("$(command -v node || true)" /usr/local/bin/node /opt/homebrew/bin/node)
  while IFS= read -r n; do candidates+=("$n"); done < <(ls -d "$HOME"/.nvm/versions/node/*/bin/node 2>/dev/null | sort -Vr)
  for n in "${candidates[@]}"; do
    [ -x "$n" ] || continue
    "$n" -e 'const [a,b]=process.versions.node.split(".").map(Number);
             process.exit(((a===20&&b>=20)||(a===22&&b>=22)||a>22)?0:1)' 2>/dev/null && { echo "$n"; return 0; }
  done
  return 1
}

NODE="$(find_node)" || {
  echo "No Node version promptfoo supports (needs ^20.20.0 || >=22.22.0)." >&2
  echo "Installed: $(node -v 2>/dev/null || echo none). Install one, then re-run." >&2
  exit 1
}

if [ ! -f .env ] && [ -z "${ANTHROPIC_API_KEY:-}" ]; then
  echo "ANTHROPIC_API_KEY not found (.env or environment). The bot and the judge both need it." >&2
  exit 1
fi

OUT="$(mktemp -t just-a-bot-eval)".json

"$NODE" ./node_modules/.bin/promptfoo eval \
  -o "$OUT" --no-table --no-progress-bar \
  "${ARGS[@]+"${ARGS[@]}"}" > "${OUT%.json}.log" 2>&1
PF_EXIT=$?

if [ ! -s "$OUT" ]; then
  echo "promptfoo produced no results (exit $PF_EXIT). Output:" >&2
  tail -30 "${OUT%.json}.log" >&2
  exit 1
fi

"$NODE" "$(dirname "${BASH_SOURCE[0]}")/summarize.mjs" "$OUT" $STRICT
