# Voice profile: Ariel Gianatiempo

Writer-profile distillation for the `humanize` skill (protocol step 0). Load this
before humanizing or drafting anything in Ariel's voice.

## Sample provenance

| Sample                                                | Register                     | Weight                                |
| ----------------------------------------------------- | ---------------------------- | ------------------------------------- |
| `src/content/post/01_getting_started/index.md` (2024) | published prose              | **primary**                           |
| Ariel's raw chat messages                             | unedited / thinking-out-loud | **primary**                           |
| `src/content/post/02_building_with_ai/index.md`       | Claude prose Ariel approved  | reference only, do NOT distil from it |

Post 02 is contaminated. It reads well and Ariel accepted it, but it is a model's
rhythm wearing his facts. Training on it re-teaches the model its own habits.

## The two registers

He has a published register and a raw register, and they differ in mechanics only,
never in personality.

**Published:** sentence case, correct apostrophes, American spelling.
**Raw:** lowercase throughout, dropped apostrophes (`im`, `dont`, `wont`), ALL CAPS
for emphasis, typos. Never reproduce the typos. Do carry the energy.

## Ten hypotheses

1. **Burstiness comes from comma-spliced accumulation, not from fragments.** His
   long sentences are chains of clauses joined by commas that keep adding on past
   where a careful writer would stop. Then a four-word interjection lands. The
   `humanize` skill's default advice (drop a punchy fragment every 3-4 sentences)
   produces the wrong rhythm for him. Build the variance his way: let one sentence
   run 45 to 60 words as an accumulating list of things that happened, then cut it
   off with "Ok, ok." or "So here it is."

2. **Ellipses are the signature punctuation.** Mid-sentence and at paragraph ends.
   `"So, here we go with v2..."` / `"Ok but... why?"` / `"hope to keep the pace..."`
   Wherever a draft wants an em dash, he uses "..." or a comma. This is the single
   highest-value substitution when humanizing toward his voice.

3. **Zero em dashes, natively.** Neither sample contains one. He does not reach for
   them even in raw form. So the ceiling is not "one per 300 words", it is zero.

4. **Parentheses carry the jokes.** Almost every aside is self-deprecating and lives
   in brackets: `(can't remember where)`, `(Yeah, sorry, I learn by doing;
documentation is boring!)`, `(we dont want to remember our dark days of dark theme
and tailwinds everywhere)`. Cutting his parentheticals removes the humour.

5. **Headers are questions or shrugs.** `How did I get here` / `Ok but... why?` /
   `What is next?` The `humanize` skill says to cut rhetorical questions as
   transitions. For Ariel they are structural and they are what makes the post
   scannable. Keep them.

6. **He pre-empts the criticism.** Self-deprecation arrives before anyone could
   object: "it was functional, but to say the least, it was terrible", "I'll manage
   to release a new version that may or may not be awesome". Never let a draft claim
   competence he has not already undercut himself.

7. **Discourse markers instead of transitions.** "Ok, ok", "To be honest", "Let's
   face it", "Having said that", "Sorry, I got distracted", "On top of that", "On my
   end", "Lucky for me", "So...". Zero formal connectors. "Furthermore" and
   "Moreover" would be unrecognizable as him.

8. **He talks to the reader and to himself, often as an interrogation.** Post 01 has
   an imagined voice piling on questions, then him answering it: "And while we're at
   it, can we also learn about Astro? Would you consider adding some projects? Do you
   have a blog? And... / Ok, ok, let's take it easy, please..." Use sparingly, once
   per post, it is a strong move and it wears out.

9. **He signs off.** "Thanks for reading until the end, and see you soon!" The
   `humanize` skill says to end on the last substantive sentence with no closing
   summary. Override it: he wants a short human sign-off. Short, no recap.

10. **Plain words, bare tech names.** "stuff", "thing", "terrible", "boring",
    "dull", "Frankenstein template", "life happened", "back on my track". He never
    explains a tool he names, he just links it. No elevated vocabulary anywhere.

## Mechanics

- **Spelling: American.** Post 01 has `realize` and `colors`. Post 02's `recognise`
  is a Claude import and is wrong for him.
- **Strikethrough as a punchline:** `~~ReactJs~~` for a thing he abandoned mid-post.
- **Inline code for code-shaped nouns:** `` `!important` ``, `` `</div>` ``.
- **Semicolons:** one instance across both samples. Treat as near-zero.
- **Exclamation marks:** rare but real, and only on a joke.
- **ALL CAPS for emphasis** in raw register. In published prose, use bold instead.
- **Footnotes and `<details>`** are available in this repo's post schema and suit him,
  because they let the main line stay fast while the pedantry hides underneath.

## Where his voice overrides the humanize skill

| Skill default                              | Override for Ariel                                       |
| ------------------------------------------ | -------------------------------------------------------- |
| Max 1 em dash per 300 words                | Zero. Use "..." or a comma.                              |
| Drop a 5-word fragment every 3-4 sentences | Use long comma-spliced runs, then one short interjection |
| Cut rhetorical questions                   | Keep them, especially as headers                         |
| No closing sign-off                        | Keep a short one                                         |
| Cut parentheticals                         | Keep them, they carry the humour                         |
| British/neutral spelling                   | American                                                 |

## One trap

Post 01 contains the word "delve" ("maybe even delve into Figma"). It is genuinely
his word from 2024, and it is now the most recognizable AI tell in English. Do not
reintroduce it. If he writes it himself, leave it, it is his post.
