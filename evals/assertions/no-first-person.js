// Deterministic enforcement of the "one hard rule": never first person.
//
// This is the "enforcement" half of the spec's detection-vs-enforcement split
// — a hard rule we check mechanically instead of paying a (flakier) LLM judge.
//
// Design choice: bias for HIGH PRECISION so that a failure here is trustworthy
// (few false alarms), even if it means missing the odd phrasing. The LLM-rubric
// judge is the backstop for anything this misses.
//
// The hard part is telling pronoun "I" from Roman-numeral "I" ("World War I",
// "Type I", "Henry I"). Position alone can't — "World War I started" looks just
// like "I started". So instead of flagging every bare "I", we only flag "I"
// when it's followed by a self-reference verb (a strong pronoun signal). That
// clears the common numeral cases ("World War I started/began/ended") while
// still catching "I am", "I think", "I can", etc.
//
// Residual edge cases (e.g. "Henry I was king") can still false-positive; that's
// an accepted trade-off for an eval check. Production *enforcement* would use a
// more robust method (POS-aware or a tiny classifier).
//
// "we/us/our" is deliberately NOT checked: generic use is often legitimate
// ("when we add these numbers..."), so whether it means *the bot* is left to
// the judge.

// Verbs/auxiliaries that signal a first-person pronoun when they follow "I".
const SELF_VERBS = [
  "am", "was", "will", "would", "can", "could", "should", "shall", "may",
  "might", "must", "do", "did", "have", "had", "think", "thought", "feel",
  "felt", "believe", "know", "knew", "like", "love", "hate", "want", "need",
  "hope", "wish", "guess", "see", "saw", "said", "say", "agree", "suppose",
  "understand", "remember", "find", "found", "prefer", "promise",
];

const PATTERNS = [
  { re: /\bI['’](m|ve|d|ll)\b/, label: "I'm/I've/I'd/I'll" },
  { re: new RegExp(`\\bI\\s+(?:${SELF_VERBS.join("|")})\\b`), label: '"I" + self-verb (e.g. "I think")' },
  { re: /\b(me|my|mine|myself)\b/i, label: "me/my/mine/myself" },
];

export default (output) => {
  const text = String(output);
  const hits = PATTERNS.filter((p) => p.re.test(text)).map((p) => p.label);
  const pass = hits.length === 0;
  return {
    pass,
    score: pass ? 1 : 0,
    reason: pass
      ? "No first-person self-reference"
      : `First-person detected: ${hits.join("; ")}`,
  };
};
