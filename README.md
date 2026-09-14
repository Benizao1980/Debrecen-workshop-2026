# Wild-bird Campylobacter workshop — public-data edition

A 2-hour hands-on workshop using **fully public, published Campylobacter data** to move from genome typing to population structure, source attribution and antimicrobial-resistance ecology.

The practical follows one chain of questions:

**What is it? → What lineage is it? → What is it related to? → What source does it resemble? → What does that mean for wild-bird AMR? → How confident are we?**

## Why this edition exists

The workshop deliberately does **not** use unpublished livestock–wildlife project genomes. The core source-attribution exercise is built from the public dataset published by Arning et al. (2021), and the AMR application uses the published wild-bird study by Mourkas et al. (2024).

This makes the repository safe to share publicly, easier for participants to revisit after the workshop, and reproducible from stable publications/data repositories.

## Core teaching datasets

### 1. Source-attribution dataset

Arning N, Sheppard SK, Bayliss S, Clifton DA, Wilson DJ. **Machine learning to predict the source of campylobacteriosis using whole genome data.** *PLoS Genetics* (2021). DOI: `10.1371/journal.pgen.1009436`.

The published analytical snapshot contained **5,799 public C. jejuni/C. coli genomes** from five source classes:

- chicken: 4,147
- cattle: 716
- sheep: 584
- wild bird: 212
- environment: 140

The paper's S1 Table supplies PubMLST IDs, STs, clonal complexes, true source labels, model-predicted labels, generalist index, country/year/species and train/test assignment.

**Pinned snapshot:** `https://doi.org/10.1371/journal.pgen.1009436.s001`

**Live PubMLST project:** project 102. The live project can change over time, so this workshop treats the S1 table as the reproducible source of truth for sample selection.

### 2. Wild-bird AMR application

Mourkas E et al. **Proximity to humans is associated with antimicrobial-resistant enteric pathogens in wild bird microbiomes.** *Current Biology* (2024). DOI: `10.1016/j.cub.2024.07.059`.

The study analysed **700 C. jejuni genomes from 30 wild-bird species in eight countries** and found that proximity to human habitation was associated with greater lineage diversity and AMR. The contiguous assemblies used in that study are public at Figshare:

`https://doi.org/10.6084/m9.figshare.23631495`

## Learning outcomes

By the end of the session participants should be able to:

1. use PubMLST to identify a Campylobacter MLST profile from a whole-genome assembly;
2. distinguish allele, sequence type (ST), clonal complex (CC) and higher-resolution gene-by-gene comparisons;
3. use Genome Comparator to contextualise genomes and interpret allelic distance/network output;
4. explain why host specialists are usually easier to source-attribute than ecological generalists;
5. distinguish **source association**, **relatedness** and **direct transmission**;
6. interpret wild-bird AMR as an ecological/gene-pool problem rather than simply labelling birds as reservoirs.

## The mystery design

The setup script chooses four records **deterministically from the published S1 test set**:

| Mystery | Selection concept | Intended lesson |
|---|---|---|
| A | wild-bird specialist (generalist index 1) | strong host structure can make attribution relatively easy |
| B | chicken specialist (generalist index 1; poultry CC preferred) | a second clear specialist contrast |
| C | cattle/sheep specialist or near-specialist | ruminants form overlapping but informative gene pools |
| D | generalist (prefer CC21/CC45 and a published misclassification) | model uncertainty/error can be a biological result |

The exact PubMLST IDs are generated locally from the immutable S1 table rather than hard-coded into the teaching text.

## Setup

Python 3.9+ is sufficient for the data-preparation script.

```bash
python scripts/prepare_public_dataset.py
```

To also attempt downloading public FASTA assemblies directly from the PubMLST REST API:

```bash
python scripts/prepare_public_dataset.py --download-fastas
```

The script writes:

```text
data/generated/mystery_manifest.tsv
data/generated/reference_panel_manifest.tsv
data/generated/pubmlst_typing.tsv
data/generated/source_attribution_reveal.tsv
answers/mystery_key.tsv
```

and, when REST FASTA download succeeds:

```text
data/mystery_genomes/mystery_A.fasta ... mystery_D.fasta
data/reference_genomes/reference_*.fasta
```

If a network/authentication issue prevents automatic FASTA retrieval, the generated manifest still gives the exact PubMLST IDs for manual retrieval.

## Recommended 120-minute running order

| Time | Activity |
|---|---|
| 0–10 min | Frame the inference problem + four mysteries |
| 10–25 min | PubMLST concepts and live demonstration |
| 25–45 min | Exercise 1: type the genomes |
| 45–70 min | Exercise 2: contextualise + Genome Comparator |
| 70–95 min | Exercise 3: source attribution and the generalist problem |
| 95–112 min | Exercise 4: public wild-bird AMR case study |
| 112–120 min | Reveal, uncertainty and synthesis |

`workshop.md` is the participant workbook; `instructor/run_sheet.md` is the teaching script.

## Internet-proofing

Before travelling, run the setup script and populate `data/precomputed/` with:

- PubMLST typing output;
- Genome Comparator distance matrix/network image;
- source-attribution reveal table;
- screenshots/PDF exports needed for the AMR case study.

The workshop should remain teachable if Wi-Fi is poor.

## Repository map

```text
.
├── README.md
├── workshop.md
├── data/
│   ├── mystery_design.tsv
│   ├── dataset_sources.tsv
│   ├── participant_recording_sheet.tsv
│   ├── generated/
│   ├── mystery_genomes/
│   ├── reference_genomes/
│   └── precomputed/
├── 01_pubmlst/
├── 02_population_structure/
├── 03_source_attribution/
├── 04_amr/
├── answers/
├── instructor/
├── scripts/
├── bonus/
└── slides/
```

## Important interpretation rule

> A genome can strongly support a population/ecological association. It rarely identifies the actual transmission route by itself.
