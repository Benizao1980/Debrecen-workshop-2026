# Instructor run sheet — 2 hours

This run sheet follows the supplied **36-slide `pubMLST_intro_WB` deck** rather than the earlier mystery-genome package.

## Before participants arrive

- Confirm everyone can reach PubMLST.
- Ask participants to register/log in before the practical if possible.
- Have the publication filter text ready to paste:
  `Mourkas et al. 2024 Curr Biol 34:3955–3965.e4`
- Keep `participants/genome_comparator_panel.txt` open for copy/paste.
- Keep focal isolate IDs **46556** and **46122** visible.
- If Wi-Fi is poor, teach from screenshots in the slides and use the answer key rather than waiting for live jobs.

---

## 0–10 min — Frame the biological question

**Slides 1–4**

Opening prompt:

> “We cultured *C. jejuni* from a wild bird. Does that make it a wild-bird strain?”

Use the specialist/generalist figure on slide 4 to establish the core biological distinction before touching the database.

Key message: host-associated population structure can be strong, but generalist lineages move/share gene pools across host categories.

---

## 10–25 min — PubMLST orientation

**Slides 5–11**

Cover:
- isolate/provenance data vs genome data;
- MLST/cgMLST and allele calls;
- analysis tools;
- registration/log-in;
- selecting the *Campylobacter jejuni/coli* database;
- enabling filters;
- selecting the Mourkas 2024 publication.

Do not spend long explaining every BIGSdb tool. The practical is more useful if they reach the actual dataset quickly.

---

## 25–45 min — Explore the 700-genome collection

**Slides 12–20**

Participants:
1. confirm 700 genomes;
2. inspect country/continent/source/ST/CC dashboard tiles;
3. run country × continent two-field breakdown;
4. run source × comments breakdown;
5. add `comments` to the results display.

Discussion:
- “wild bird” is a coarse source label;
- the `comments` field recovers bird species/genus detail;
- database counts are collection composition, not prevalence estimates.

---

## 45–70 min — MLST and the specialist/generalist contrast

**Slides 21–28**

### Example 1 — PubMLST 46556
Expected:
- isolate P3-2209
- Japan, 2010
- *C. jejuni*
- wild bird; pigeon/unknown dove
- ST2209
- ST-179 complex

Ask participants to inspect similar isolates/classification groups.

Prompt:
> “How much host signal is carried by this lineage?”

### Example 2 — PubMLST 46122
Expected:
- KAI44/12
- Finland, 2012
- goose
- *C. jejuni*
- ST45
- ST-45 complex

The wider CC45 population contains multiple host/source categories. The slide demo shows a 250-isolate CC45 population dominated by ST45 but spanning human and chicken as well as other sources.

Prompt:
> “What does ‘source’ even mean for a lineage that is genuinely generalist?”

Key message:
> Difficulty attributing CC45 is not necessarily a model failure. It can be the correct expression of weak source specificity.

---

## 70–100 min — Genome Comparator

**Slides 29–32**

Use the panel in `participants/genome_comparator_panel.txt`.

Core run:
- C. jejuni / C. coli cgMLST v2
- no alignment initially
- retain demo defaults for incomplete loci
- exclude paralogous loci

While job runs, explain output:
- rows = loci;
- columns = genomes;
- allele numbers = gene-by-gene variation;
- X = missing;
- I = incomplete.

Questions:
- Do same-ST isolates remain identical genome-wide?
- How much within-CC45 diversity is hidden by seven-locus MLST?
- What would you need beyond cgMLST to infer a recent transmission event?

Optional: produce an alignment after the fast comparison if time/network allow.

---

## 100–112 min — Microreact visualisation

**Slides 33–35**

Demonstrate export to Microreact:
- choose a typing scheme;
- include country;
- sequences + FastTree (approximate ML) as shown in the deck.

Use this to separate three dimensions:
- phylogenetic relatedness;
- geography;
- host/source metadata.

Emphasise that none of these axes should be treated as interchangeable.

---

## 112–120 min — AMR/ecology and synthesis

**Slide 36 + return briefly to slides 3–4**

Ask:
- If a resistant CC45 isolate is found in a city-associated wild bird, what can the genome support?
- What would distinguish movement of a resistant strain from movement of a resistance determinant?
- What would be required to claim a direction of transmission?

Finish with:

**identity → relatedness → ecological association → transmission hypothesis**

and remind participants not to collapse these into one conclusion.
