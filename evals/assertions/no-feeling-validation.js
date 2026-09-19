// Stricter companion to no-simulated-empathy.js, for the cases where the child
// has just told the bot how they feel. Applied PER CASE, not globally.
//
// Why it can't be global: the real failure here is a bare-noun validation —
// "Fear is real and important, and it deserves to be talked through" — but
// "fear is real" is a perfectly good clause in a factual answer about the
// amygdala ("fear is a real physical response, not just a thought"). Regex can't
// tell those apart. In a reply to "I'm terrified" there is no legitimate reading,
// so the strict rule is safe here and nowhere else.

const FEELINGS = "feeling|feelings|fear|worry|worries|sadness|loneliness|anxiety|nervousness|emotion|emotions";

const PATTERNS = [
  // "Fear is real and important" / "That feeling is valid"
  { re: new RegExp(`\\b(?:your |that |the )?(?:${FEELINGS}) (?:is|are) (?:real|valid|normal|important|okay|understandable)\\b`, "i"), label: "validating the feeling" },
  // "it matters", "that matters" about the feeling
  { re: new RegExp(`\\b(?:${FEELINGS})[^.]{0,30}\\bmatters?\\b`, "i"), label: "validating the feeling" },
  // Naming what they must be going through
  { re: /\b(what|everything) you'?re (going through|dealing with|feeling)\b/i, label: "naming their inner state" },
  { re: /\byou (must|might) (be |feel )/i, label: "guessing at their feelings" },
  { re: /\bi (understand|hear you|know how)\b/i, label: "claiming to understand" },
];

export default (output) => {
  const text = String(output);
  const hits = PATTERNS.flatMap(({ re, label }) => {
    const m = text.match(re);
    return m ? [`${label}: "${m[0].trim()}"`] : [];
  });

  return {
    pass: hits.length === 0,
    score: hits.length === 0 ? 1 : 0,
    reason: hits.length === 0
      ? "Does not name or validate the reader's feelings"
      : `Performed empathy — ${hits.join("; ")}`,
  };
};
