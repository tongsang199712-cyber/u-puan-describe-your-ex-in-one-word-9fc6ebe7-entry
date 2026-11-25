import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The one-word verdict on an ex: "unsubscribed".
// An ex treated like a subscription you finally cancelled:
// the emails stop, the charges stop, and you wonder why
// you ever signed up in the first place. It lands at a
// glance, it is not the obvious insult, and anyone who
// has ever hit unsubscribe on a person knows the feeling.
// No punctuation tricks, no caption needed: the word is
// the whole joke, and the verdict is the cancellation.
const WORD = "unsubscribed";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", WORD, "utf8");

// Read back and verify: the gate requires 1-111 chars of
// non-whitespace text, and the judge wants exactly one word,
// with no trailing newline and nothing else attached.
if (WORD.length < 1 || WORD.length > 111 || /\s/.test(WORD)) {
  throw new Error(`word fails the gate: ${JSON.stringify(WORD)}`);
}
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== WORD) {
  throw new Error(`entry.txt mismatch: expected ${JSON.stringify(WORD)}, got ${JSON.stringify(written)}`);
}
console.log(`wrote ${WORD.length} chars to /output/entry.txt`);
