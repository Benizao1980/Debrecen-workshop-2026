# Participant workbook

## From a wild-bird genome to an epidemiological story

You have four *Campylobacter jejuni* genome assemblies recovered from wild birds. Your job is not simply to type them. Your job is to decide what the genomes can - and cannot - tell you about ecology, transmission and antimicrobial resistance.

**Do not open the `answers/` directory until the final discussion.**

---

## 0. Before you touch the data

For each statement, decide whether it is something a bacterial genome can establish directly, support probabilistically, or cannot establish by itself.

| Question | Direct / probabilistic / not by genome alone? |
|---|---|
| What species is this? | |
| What MLST sequence type is it? | |
| Was this bacterium transmitted directly from a chicken to this bird? | |
| Is this genome more similar to poultry-associated than wild-bird-associated populations? | |
| Does it contain a known resistance determinant? | |
| Was antibiotic use on this farm responsible for the determinant? | |

Keep these answers in mind: the distinction between **relatedness**, **source association**, and **transmission** matters throughout the workshop.

---

# Exercise 1 - What is it? MLST with PubMLST

**Time: ~20 min**

Open the *Campylobacter jejuni/coli* PubMLST database and go to the sequence-definition database.

Use **Single sequence** query and upload `mystery_A.fasta`.

For a whole genome, choose the *C. jejuni/C. coli* MLST scheme rather than querying an individual locus. BIGSdb can query a multi-contig genome against every locus in a scheme and return the scheme fields when all loci match.

Repeat for genomes B-D.

### Record your results

| Genome | aspA | glnA | gltA | glyA | pgm | tkt | uncA | ST | CC |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| A | | | | | | | | | |
| B | | | | | | | | | |
| C | | | | | | | | | |
| D | | | | | | | | | |

### Questions

1. Which genomes belong to the same clonal complex?
2. Does sharing a CC mean two isolates are closely related enough to infer recent transmission?
3. What does an unassigned CC tell you? What does it **not** tell you?
4. Which of the four would you predict to be easiest to place ecologically from MLST alone?

---

# Exercise 2 - What is it related to?

**Time: ~25 min**

MLST gives a useful name, but seven loci throw away most of the information in a whole genome.

## 2A. Explore the isolate collection

For each ST from Exercise 1, search the PubMLST isolate collection.

Look at the source/host metadata represented among matching records. Do not just count the first page: ask whether the lineage appears narrow or broadly distributed across reservoirs.

Record a qualitative interpretation:

| Genome | ST/CC | Mainly wild bird? | Poultry represented? | Ruminants represented? | Initial ecological interpretation |
|---|---|---|---|---|---|
| A | | | | | |
| B | | | | | |
| C | | | | | |
| D | | | | | |

**Caution:** PubMLST is a collection of submitted isolates, not a random survey of nature. Apparent source frequencies reflect sampling and submission as well as biology.

## 2B. Genome Comparator

Open **Analysis -> Genome Comparator**.

Upload the four mystery genomes (a ZIP containing multiple FASTA files is accepted). Select a high-resolution defined-locus scheme appropriate for *C. jejuni* and submit the job.

When the job finishes, inspect:

- the allele-difference tables;
- the distance matrix;
- the NeighborNet/network output.

### Questions

1. Does the grouping agree with MLST?
2. Are any isolates that share a CC still separated by many allelic differences?
3. Which genome is the clearest outlier?
4. Why is a genomic network/tree evidence of **relatedness**, not proof of a transmission direction?

If the job does not finish during the session, use the copy in `data/precomputed/`.

---

# Exercise 3 - Where might it have come from? Source attribution

**Time: ~20 min**

Source attribution is a classification problem. A model is trained on genomes with known source labels and estimates which reference source a new genome most resembles.

For this workshop use three broad training groups:

- poultry;
- ruminant;
- wild bird.

The live session focuses on interpretation rather than installing a machine-learning environment. Open `data/precomputed/source_predictions.tsv` if it is available. The optional follow-up in `03_source_attribution/` shows how to repeat the analysis with SourceRunner-ML.

Before looking at the model, make your own predictions from the PubMLST/Genome Comparator evidence:

| Genome | Your predicted source | Confidence (low/medium/high) | Why? |
|---|---|---|---|
| A | | | |
| B | | | |
| C | | | |
| D | | | |

Then compare with the model output.

### Discussion

1. Which prediction is most convincing?
2. Which isolate is a **generalist-lineage problem**?
3. Is the highest probability necessarily the true source?
4. What happens if the true ecological reservoir is missing from the training data?
5. What happens when the reference data are geographically unbalanced?

A useful formulation is:

> Source attribution estimates **genomic affinity to sampled source populations**. It is not a direct observation of where an individual bacterium came from.

---

# Exercise 4 - What AMR does it carry?

**Time: ~20 min**

Open the supplied AMR results for the mystery genomes if available, then inspect the project-level AMR figure in `assets/project_amr_tree.png` and `assets/project_amr_hosts.png`.

For each genome record known resistance determinants and the predicted drug class affected.

| Genome | Determinant(s) | Drug class | Genotypic prediction | Caveat |
|---|---|---|---|---|
| A | | | | |
| B | | | | |
| C | | | | |
| D | | | | |

## Ecological context

In the Swedish study, resistance was more common in wild birds sampled near farms than in wild birds sampled at a non-agricultural site. `tetO` showed a farm-proximity association, and `gyrA_T86I` was found in livestock and near-farm wild birds but not in the non-agricultural wild-bird group.

### Questions

1. Is an AMR determinant evidence of recent acquisition on a farm?
2. Could the association instead reflect movement of resistant lineages between ecological compartments?
3. How would long-read sequencing help distinguish clonal spread from mobile-element spread?
4. What additional metadata would strengthen the inference?

---

# Final synthesis - tell the story, then state the uncertainty

For one mystery genome, make a 60-second interpretation using this template:

> **Genome ___ is ST___ / CC___.** At whole-genome resolution it clusters with ___. Its source profile is most compatible with ___, although ___. It carries ___, which is consistent with ___. These data support ___, but they do **not** demonstrate ___.

## The six take-home messages

1. MLST is an excellent language for naming lineages, but it is not the whole genome.
2. Whole-genome relatedness increases resolution but does not by itself establish transmission.
3. Source attribution is probabilistic and only as good as the reference populations.
4. Generalist lineages are biologically interesting precisely because source attribution can be difficult.
5. AMR must be interpreted in both lineage and ecological context.
6. Good metadata are not decoration: they are part of the genomic analysis.

