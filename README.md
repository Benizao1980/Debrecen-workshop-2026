# Wild-bird AMR workshop: from genome to epidemiological story

A 2-hour hands-on workshop built around *Campylobacter jejuni* genomes from the Swedish livestock-wildlife interface study.

The practical follows one simple chain of questions:

**What is it? -> What lineage is it? -> What is it related to? -> What source/ecology does it resemble? -> What AMR does it carry? -> How confident are we?**

## Learning outcomes

By the end of the session, participants should be able to:

1. use PubMLST to identify a *Campylobacter* MLST profile from a whole-genome assembly;
2. distinguish allele, sequence type (ST), clonal complex (CC), and higher-resolution gene-by-gene comparisons;
3. use Genome Comparator to compare uploaded assemblies and interpret an allelic-distance/NeighborNet output;
4. explain what genomic source attribution does and why generalist lineages can be difficult to attribute;
5. interpret AMR determinants in ecological context without confusing association with transmission.

## Recommended 120-minute running order

| Time | Activity |
|---|---|
| 0-10 min | Project question + mystery genomes |
| 10-25 min | PubMLST concepts and live demonstration |
| 25-45 min | Exercise 1: type the genomes |
| 45-70 min | Exercise 2: population structure + Genome Comparator |
| 70-90 min | Exercise 3: source attribution |
| 90-110 min | Exercise 4: AMR at the livestock-wildlife interface |
| 110-120 min | Reveal, limitations, take-home discussion |

`workshop.md` is the participant workbook. `instructor/run_sheet.md` is the teaching script.

## Core mystery set

The participant-facing files should be renamed `mystery_A.fasta` to `mystery_D.fasta`. The real isolate mapping is deliberately kept in `answers/mystery_key.tsv`.

The selected set was chosen to provide four different teaching stories: a non-agricultural wild-bird lineage, a classic CC45 generalist, a contrasting near-farm wild-bird lineage, and a host-sharing ST with no assigned CC.

### Genome files are intentionally not committed yet

This repository contains the **selection and all workshop materials**, but not the FASTA assemblies. Before publishing the repository, copy the appropriate assemblies into `data/mystery_genomes/` using `scripts/prepare_mystery_genomes.sh`.

This is deliberate: the source metadata available while assembling the workshop did not establish a public assembly accession for every selected mystery/reference isolate. Do not put a non-public genome on a public GitHub repository simply for convenience.

A safe alternative is to distribute a small workshop ZIP privately on the day while keeping all instructions and precomputed outputs public on GitHub.

## Internet-proofing

Every live web step should have a precomputed fallback. Before the workshop, save:

- PubMLST typing output for A-D;
- Genome Comparator distance matrix and NeighborNet image;
- source-attribution prediction table;
- AMR calls for A-D.

Put them in `data/precomputed/`. Participants can then continue even if Wi-Fi or a server job fails.

## Public resources used

- Campylobacter PubMLST: https://pubmlst.org/organisms/campylobacter-jejunicoli
- BIGSdb sequence-query documentation: https://bigsdb.readthedocs.io/en/latest/data_query/0010_determine_allele_identity.html
- BIGSdb Genome Comparator documentation: https://bigsdb.readthedocs.io/en/latest/data_analysis/genome_comparator.html
- PubMLST REST API: https://pubmlst.org/api
- Swedish study BioProject: https://www.ncbi.nlm.nih.gov/bioproject/1450089
- SourceRunner-ML: https://github.com/Benizao1980/SourceRunnerML

## Repository map

```text
.
├── README.md
├── workshop.md
├── data/
│   ├── mystery_genomes/
│   ├── mystery_participant.tsv
│   ├── reference_panel_plan.tsv
│   ├── reference_genomes/
│   ├── study_context.tsv
│   └── precomputed/
├── 01_pubmlst/
├── 02_population_structure/
├── 03_source_attribution/
├── 04_amr/
├── answers/
├── instructor/
├── assets/
├── scripts/
└── slides/
```

## Suggested repository title

`wild-bird-campylobacter-workshop`

A good one-line description is:

> Hands-on PubMLST, population genomics, source attribution and AMR practical using wild-bird *Campylobacter jejuni* genomes.

