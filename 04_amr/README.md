# 04 - AMR in ecological context

## Live session

Use the project figure in `assets/` and a precomputed isolate-level AMR table. The key task is interpretation, not memorising resistance genes.

The study-level pattern provides a useful ecological contrast:

- conventional chicken: 25.0% with selected resistance determinants;
- organic chicken: 15.1%;
- ruminants: 40.0% (small n=15 group);
- wild birds near farms: 18.4%;
- non-agricultural wild birds: 10.9%.

`tetO` was enriched in near-farm wild birds relative to non-agricultural birds. `gyrA_T86I` was observed in livestock and near-farm wild birds but not in the non-agricultural wild-bird group in this dataset.

## Pre-workshop output

Populate `data/precomputed/amr_calls.tsv` with the exact calls for A-D from the same pipeline you use in the project.

Suggested fields:

```text
mystery_id,isolate_id,determinant,drug_class,predicted_phenotype,method,notes
```

## Discussion prompts

- Does the determinant sit in a lineage already common in livestock?
- Is there evidence for the same determinant in multiple genomic backgrounds?
- Is the resistance gene chromosomal or mobile?
- Does the observation support spillover, gene-pool sharing, selection, or merely exposure?
- What would long reads add?
