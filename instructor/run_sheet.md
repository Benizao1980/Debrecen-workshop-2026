# Instructor run sheet — 120 minutes

## Before people arrive

1. Run `python scripts/prepare_public_dataset.py --download-fastas` on a reliable connection.
2. Check A–D in PubMLST manually once.
3. Run Genome Comparator once and save a screenshot/export in `data/precomputed/`.
4. Keep `answers/mystery_key.tsv` closed.
5. Put the repository/ZIP link and a QR code (optional) on the first slide.
6. Do not depend on installing aiSource/SourceRunner live.

---

## 0–10 min — Frame the inference problem

Opening question:

> “We have a Campylobacter genome. How far can sequence alone take us toward saying where it came from?”

Explain that A–D are **public source-labelled isolates**, but source labels are hidden.

Get the room to classify the six statements in Exercise 0 as direct/probabilistic/not-by-genome-alone.

Key message: relatedness, source association and transmission are different claims.

---

## 10–25 min — PubMLST in one picture

Keep the conceptual ladder simple:

**sequence → allele → 7-locus profile → ST → CC → cg/wgMLST**

Show the difference between:

- definitions/nomenclature; and
- isolate/genome + metadata collection.

Live-demo mystery A only.

---

## 25–45 min — Exercise 1

Participants type A–D.

At ~40 min reveal only ST/CC (copy from `data/generated/pubmlst_typing.tsv`), not source labels.

Ask: “Which ST looks most likely to be source-specific?”

---

## 45–70 min — Exercise 2

Participants query their STs/CCs in the isolate database and label each lineage “specialist-looking / generalist-looking / unclear”.

Then run Genome Comparator on A–D + the public reference panel.

Key sentence:

> “MLST gives the lineage a portable name. Genome-wide comparison tells us how much diversity that name is hiding.”

If the server is slow, switch immediately to the precomputed output.

---

## 70–95 min — Exercise 3: source attribution

Force a prediction before the reveal.

Ask participants to give:

1. source;
2. confidence;
3. one piece of supporting evidence;
4. one thing that could make them wrong.

Then open `data/generated/source_attribution_reveal.tsv`.

Spend the most time on mystery D.

Useful published numbers:

- dataset: chicken 4,147; cattle 716; sheep 584; wild bird 212; environment 140;
- best cgMLST/XGBoost result ~85%;
- wild-bird test accuracy reported ~84% despite smaller n;
- increasing generalist index reduced accuracy;
- cattle/sheep were the most frequent confusion.

Make the conceptual point that **a confidently generalist lineage may be correctly hard to assign**.

---

## 95–112 min — Exercise 4: wild-bird AMR

Transition:

> “So far source labels were clean experimental classes. Wild-bird ecology is messier — and more interesting.”

Introduce the published 2024 Current Biology dataset:

- 700 C. jejuni genomes;
- 30 bird species;
- eight countries;
- public assemblies on Figshare;
- proximity to human habitation associated with increased lineage diversity and AMR.

Do the strain-movement vs gene-movement vs independent-selection challenge.

Expected strong suggestions:

- long-read/plasmid context;
- dense local livestock + bird + water/sewage sampling;
- temporal sampling;
- antimicrobial-use/exposure data;
- movement ecology.

---

## 112–120 min — Final reveal and synthesis

Reveal exact PubMLST IDs and metadata from `answers/mystery_key.tsv`.

Ask one group for a 60-second interpretation using the template in `workshop.md`.

Finish with:

> “Genomes make hypotheses much sharper. They do not remove the need for ecology, metadata and sampling design.”
