# Instructor answer key

## Exercise 0

| Question | Best answer |
|---|---|
| Species | direct/strongly determined from sequence |
| MLST ST | direct once alleles/profile are defined |
| Source population | probabilistic inference |
| Direct chicken → bird transmission | not established by genome alone |
| Known AMR determinant | directly detected from sequence; phenotype still needs interpretation |
| Particular antibiotic exposure caused it | not established by sequence alone |

## Mystery identities

Run the public-data setup first. The exact identities are written to:

`answers/mystery_key.tsv`

The design is intentionally stable even if the exact chosen records change because of formatting differences in the source table:

### A — wild-bird specialist

Expected generalist index: 1.

**Lesson:** strong host restriction gives the classifier a clean population signal. This still means “strong association with the sampled wild-bird population”, not proof that the isolate could never occur elsewhere.

### B — chicken specialist

Expected generalist index: 1, with a poultry-associated CC preferred where possible.

**Lesson:** source attribution is easiest when population structure and source labels line up.

### C — ruminant specialist / near-specialist

True label is cattle or sheep. Participants may reasonably answer “ruminant” before the reveal.

**Lesson:** cattle and sheep gene pools overlap, and the Arning et al. study identified cattle↔sheep as the commonest source-class confusion.

### D — ecological generalist

Preferred: CC21 or CC45, high generalist index, and a record that the published model predicted incorrectly.

**Lesson:** ambiguity/error can reflect real host switching and shared gene pools rather than simply poor modelling.

## Exercise 2

Do not provide a universal allelic-distance threshold for direct transmission. Interpretation depends on organism, scheme, recombination, time scale, QC and epidemiological context.

## Exercise 3

The important discussion is not just whether the model label equals the known source. Ask whether the prediction was biologically plausible and how much confidence the genomic structure supports.

Published context from Arning et al.:

- 5,799 genomes in the analytical snapshot;
- five source classes;
- ST-aware train/test separation;
- cgMLST XGBoost performed best (~85% top-line accuracy);
- increasing generalist index reduced attribution performance;
- cattle/sheep were particularly confusable.

## Exercise 4

Correct high-level interpretation:

The published 2024 wild-bird study supports an association between anthropogenic/urban proximity, greater *C. jejuni* lineage diversity and AMR. It does not identify one universal direction or route of AMR transmission.

A strong follow-up design would combine genomic context (ideally long reads) with denser ecological and environmental sampling.
