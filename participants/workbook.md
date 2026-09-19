# Participant workbook

# Exploring wild-bird *Campylobacter jejuni* with PubMLST

This practical uses the **Mourkas et al. (2024) Current Biology collection of 700 public *C. jejuni* genomes from wild birds**.

The aim is to move from database navigation to biological interpretation:

**metadata → MLST → clonal complex → cgMLST/population context → ecology/source inference → AMR interpretation**

---

## 0. Before the session

1. Register/log in at **PubMLST**.
2. Open the **Campylobacter jejuni/coli** database.
3. Keep this question in mind:

> A *C. jejuni* genome was isolated from a wild bird. Does that automatically make it a “wild-bird strain”? 

No. Sampling host and long-term ecological association are different questions.

---

# Exercise 1 — Find the published dataset

**Slides 5–13 | ~15 min**

1. Open the *Campylobacter jejuni/coli* **isolate/genome collection**.
2. Choose **Modify form**.
3. Enable **Filters**.
4. Filter the **Publication** field to:

`Mourkas et al. 2024 Curr Biol 34:3955–3965.e4`

5. Search.

### Checkpoint

You should see a dashboard containing **700 genomes**.

Record:

| Question | Your answer |
|---|---|
| Which continents/countries are represented? | |
| Which broad source labels appear? | |
| What are the most frequent STs? | |
| What are the most frequent clonal complexes? | |

### Think

Is the dashboard a prevalence survey of wild-bird *Campylobacter* worldwide?

**No.** It describes this assembled research collection. Sampling intensity, country, bird species, year and study design are not balanced.

---

# Exercise 2 — Interrogate host metadata

**Slides 14–20 | ~20 min**

At the bottom of the query results, use **Breakdown → Two Field**.

## 2A. Country × continent

Try:

- Field 1: `country`
- Field 2: `continent`

What does this tell you about geographic representation?

## 2B. Source × comments

Now try:

- Field 1: `source`
- Field 2: `comments`

The **comments** field contains the more specific bird-host annotation used in this collection.

### Questions

1. Why is `wild bird` too coarse a label for many ecological questions?
2. What is gained by retaining the bird species/genus in the metadata?
3. What happens to an analysis of host association if metadata are inconsistent or collapsed into broad categories?

## 2C. Customise the results table

Use **Customise → General options → Main results table – provenance field selection** and ensure `comments` is displayed.

Inspect several rows and compare the broad `source` field with the bird information in `comments`.

---

# Exercise 3 — From MLST to clonal complexes

**Slides 21–22 | ~15 min**

The seven MLST loci are:

`aspA, glnA, gltA, glyA, pgm, tkt, uncA`

Each unique seven-allele profile defines an **ST**. Related STs may be grouped into a **clonal complex (CC)**.

### Questions

1. Why is an ST more portable than a whole-genome phylogeny?
2. Why is an ST much lower resolution than cgMLST?
3. Does sharing an ST establish recent transmission?
4. Why might the ecological meaning of an ST/CC differ between a host specialist and a host generalist?

---

# Exercise 4 — Focal example 1: a bird-associated lineage

**Slides 23–24 | ~15 min**

Open PubMLST isolate **46556**.

Record:

| Field | Result |
|---|---|
| PubMLST ID | 46556 |
| isolate | |
| country | |
| year | |
| source | |
| comments / bird | |
| species | |
| ST | |
| clonal complex | |

Then inspect **Similar isolates / classification schemes** and the related records.

### Questions

1. What host pattern do you see among the closely related/ST-matched records?
2. How strong is the evidence that this lineage is bird associated?
3. Is “bird associated” the same as “this isolate was transmitted directly from another pigeon”? Why not?
4. At what point would you want cgMLST rather than MLST/CC?

---

# Exercise 5 — Focal example 2: a generalist lineage

**Slides 25–28 | ~15 min**

Open PubMLST isolate **46122**.

Record:

| Field | Result |
|---|---|
| PubMLST ID | 46122 |
| isolate | |
| country | |
| year | |
| source | |
| comments / bird | |
| species | |
| ST | |
| clonal complex | |

Now inspect the broader **ST-45 complex** context.

### Questions

1. Which host/source categories occur in the wider CC45 population?
2. Why does this make source attribution harder than for the previous example?
3. A wild-bird CC45 isolate clusters near chicken or human isolates. What can you conclude?
4. What can you **not** conclude without finer genomic, temporal and epidemiological evidence?

### Core idea

> Specialists can carry strong source/host signal. Generalists share gene pools across hosts, so ambiguity can be biological rather than a failure of the analysis.

---

# Exercise 6 — Add genome-wide resolution with Genome Comparator

**Slides 29–32 | ~25 min**

Use **Analysis → Genome Comparator**.

For a quick practical, paste the IDs from:

`participants/genome_comparator_panel.txt`

The panel contains examples shown in the slide deck plus the two focal isolates.

Select:

- **C. jejuni / C. coli cgMLST v2**
- retain the default pairwise treatment of incomplete loci used in the demo;
- exclude paralogous loci;
- initially **do not** request alignments — obtain the gene-by-gene comparison first.

### Interpret the output

In the exported table:

- columns = isolates/genomes;
- rows = loci;
- numbers = allele designations;
- `X` = missing locus;
- `I` = incomplete locus.

### Questions

1. Do isolates with the same ST remain identical at cgMLST resolution?
2. How much extra variation is revealed beyond seven-locus MLST?
3. Does the bird-associated example remain a coherent population at genome-wide resolution?
4. Does CC45 contain substantial diversity despite a shared MLST designation?
5. What threshold would be required before you described isolates as compatible with recent transmission, and what extra epidemiological evidence would you still require?

### Optional

Repeat with **Produce alignments** selected. This is slower and is best treated as an extension rather than the core exercise.

---

# Exercise 7 — Visualise a population in Microreact

**Slides 33–35 | ~15 min**

From the results/tools page choose **External → Microreact**.

For the rapid demonstration in the slides:

- select a typing scheme;
- include `country` as the geographic field;
- generate a tree from sequences using **FastTree (Approximate ML)**.

The CC45 example is useful because its broader population includes isolates from multiple countries and source categories.

### Questions

1. What is the difference between a tree that shows relatedness and a map that shows sampling location?
2. Do geography and source perfectly correspond to phylogeny?
3. What artefacts can be created by uneven sampling?
4. What additional metadata would you want to colour the tree by?

---

# Exercise 8 — Bring it back to AMR and wild-bird ecology

**Slides 3–4 and final discussion | ~10 min**

The Mourkas et al. study asks how wild-bird *Campylobacter* population structure and AMR relate to proximity to humans.

For each observation, distinguish what it **supports** from what it **proves**.

| Observation | Supports | Does not prove |
|---|---|---|
| AMR determinant in a generalist lineage found in a wild bird | exposure to/shared circulation of a resistant lineage or gene pool | the exact source host or transmission direction |
| closely related bird and livestock/human isolates | recent shared ancestry / connected population | a direct single transmission event |
| same resistance determinant in distant lineages | repeated acquisition or mobile-gene sharing is plausible | one clonal outbreak |
| association with human-proximal environments | anthropogenic ecology may matter | which individual exposure caused the resistant genotype |

### Final challenge

Choose either isolate **46556** or **46122** and give a 60-second interpretation:

> This isolate is *C. jejuni* ST **__**, CC **__**, sampled from **__**. Its broader population appears **host associated / generalist** because **__**. Genome-wide comparison shows **__**. This supports **__**, but it does not establish **__**.

---

# Take-home messages

1. **Sampling host is not the same thing as ecological source.**
2. **MLST is nomenclature; cgMLST adds resolution.**
3. **A close genomic relationship is not automatically a transmission event.**
4. **Specialist/generalist biology sets a real limit on source attribution.**
5. **AMR in wild birds should be interpreted in ecological and genomic context.**
