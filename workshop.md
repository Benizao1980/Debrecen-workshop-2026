# Participant workbook

# From a Campylobacter genome to an ecological story

You have four public *Campylobacter* genomes selected from a published source-attribution dataset. Their source labels are hidden.

Your task is not simply to type them. Your task is to decide what the genomes can — and cannot — tell you about host association, source, transmission and antimicrobial resistance.

**Do not open `answers/` or `data/generated/source_attribution_reveal.tsv` until instructed.**

---

## 0. Before you touch the data

For each statement decide whether a bacterial genome can establish it **directly**, support it **probabilistically**, or **cannot establish it alone**.

| Question | Direct / probabilistic / not by genome alone? |
|---|---|
| What Campylobacter species is this? | |
| What MLST sequence type is it? | |
| Which sampled host population does it most resemble? | |
| Was it directly transmitted from a chicken to a wild bird? | |
| Does it contain a known resistance determinant? | |
| Did antibiotic use at a particular farm cause that determinant? | |

Keep this distinction in mind throughout the practical.

---

# Exercise 1 — What is it? MLST with PubMLST

**Time: ~20 min**

Open the *Campylobacter jejuni/coli* PubMLST database.

Use the **sequence query** with `data/mystery_genomes/mystery_A.fasta`. Select the *C. jejuni/C. coli* MLST scheme so that the whole assembly is queried against all seven MLST loci.

Repeat for B–D.

### Record your results

| Genome | aspA | glnA | gltA | glyA | pgm | tkt | uncA | ST | CC |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| A | | | | | | | | | |
| B | | | | | | | | | |
| C | | | | | | | | | |
| D | | | | | | | | | |

### Questions

1. Which result gives you a portable nomenclature and which gives you actual genomic distance?
2. Does sharing an ST imply recent transmission?
3. Would you expect all STs to be equally informative about source?
4. Which mystery do you predict will be easiest to source-attribute?

---

# Exercise 2 — What is it related to?

**Time: ~25 min**

## 2A. Use PubMLST as a population database

For each mystery ST/CC, search the PubMLST isolate collection.

Look at host/source metadata. Rather than treating the returned counts as prevalence estimates, ask a simpler question:

> Does this lineage look **host restricted**, **host biased**, or **broadly distributed** in the available collection?

Record your interpretation:

| Genome | ST / CC | Sources represented | Specialist / generalist impression | Evidence |
|---|---|---|---|---|
| A | | | | |
| B | | | | |
| C | | | | |
| D | | | | |

**Sampling caveat:** PubMLST is an extraordinary resource, but it is a collection of submitted isolates, not a random survey of nature. Submission intensity, geography, time and study design all matter.

## 2B. Add genome-wide resolution

Open **Analysis → Genome Comparator**.

Upload the four mysteries plus the small public reference panel in `data/reference_genomes/`. A ZIP of FASTA files can be used if convenient.

Choose an appropriate *C. jejuni* defined-locus/core-genome scheme and inspect:

- allele-difference table;
- distance matrix;
- NeighborNet/network output.

### Questions

1. Does genome-wide grouping agree with seven-locus MLST?
2. Do genomes from the same broad source form one clean cluster?
3. Does the generalist mystery sit between or among several ecological groups?
4. What extra evidence would you need before calling a close pair a transmission event?

If the live analysis is slow, switch to `data/precomputed/`.

---

# Exercise 3 — Where did it come from? Source attribution

**Time: ~25 min**

The public teaching dataset has five labelled source classes:

- chicken
- cattle
- sheep
- wild bird
- environment

For a first-pass biological interpretation you may combine cattle + sheep as **ruminant**, but the published machine-learning analysis treated them separately.

## 3A. Predict before you reveal

Use only the evidence you have already seen.

| Genome | Your predicted source | Confidence | Why? |
|---|---|---|---|
| A | | low / medium / high | |
| B | | low / medium / high | |
| C | | low / medium / high | |
| D | | low / medium / high | |

Now open `data/generated/source_attribution_reveal.tsv` when instructed.

The published Arning et al. dataset supplies both the **true source label** and the **published model prediction** for each record. The setup script also retains the published **generalist index**: the number of source classes in which the ST occurred.

### Discussion

1. Which specialist was easiest?
2. Did the generalist mystery produce the least satisfying answer?
3. Was any published prediction wrong? Is that necessarily an algorithmic failure?
4. Why are cattle and sheep particularly easy to confuse?
5. What happens if a real source is absent from the training set?
6. What happens if geographic sampling is badly unbalanced?

### Resolution matters

The Arning et al. analysis provides a useful progression in discriminatory power:

- conventional iSource/MLST benchmark: ~64%;
- machine learning on MLST: up to ~71%;
- XGBoost on 1,343-locus cgMLST: ~85%;
- best k-merised WGS result: ~78%.

More sequence does not magically solve the problem: biological generalism places a real ceiling on attribution.

> Source attribution asks which **sampled source population** a genome resembles. It does not observe the actual transmission event.

---

# Exercise 4 — Apply the logic to wild-bird AMR

**Time: ~17 min**

Now move from a clean source-classification exercise to a real published wild-bird ecology problem.

Mourkas et al. (2024) analysed 700 *C. jejuni* genomes from 30 wild-bird species in eight countries. The study found that proximity to human habitation was associated with greater lineage diversity and more AMR in wild-bird populations.

The assemblies used in that study are publicly available from Figshare (`10.6084/m9.figshare.23631495`).

## Think like an epidemiologist, not just a resistance caller

For an AMR-positive wild-bird genome, what would each observation support?

| Observation | What it might support | What it does **not** prove |
|---|---|---|
| AMR determinant in a livestock-associated/generalist lineage | movement/exposure of a resistant lineage | direct livestock → bird transmission |
| Same AMR determinant in several unrelated lineages | repeated acquisition or mobile gene-pool sharing | a single clonal outbreak |
| More AMR in urban-associated bird populations | anthropogenic ecological association | which individual exposure caused it |
| Closely related resistant genomes in different hosts | recent shared ancestry / connected transmission network | direction of transmission |

### Small-group challenge

You are designing the follow-up analysis. Choose **three** pieces of additional data that would best distinguish:

1. **movement of resistant strains**, from
2. **movement of resistance genes**, from
3. **independent selection/exposure**.

Possible ideas include long-read plasmid context, denser temporal sampling, water/sewage sampling, livestock sampling, antimicrobial-use data and ecological movement data.

---

# Final synthesis — a 60-second interpretation

Choose one mystery and complete:

> Genome **__** is *Campylobacter* **__**, ST **__**, CC **__**. In the public reference collection this lineage appears **specialist/generalist**. Genome-wide comparison places it **__**. I would attribute it to **__** with **low/medium/high** confidence because **__**. The strongest limitation is **__**. This supports **__**, but it does not demonstrate **__**.

## Take-home message

A useful genomic epidemiology story separates four things:

**identity → relatedness → ecological association → transmission hypothesis**.

Do not collapse them into one claim.
