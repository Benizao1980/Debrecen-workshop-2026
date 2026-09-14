# Bonus — reproduce and extend the analysis

## 1. Recreate the public teaching set

```bash
python scripts/prepare_public_dataset.py --download-fastas
```

The selection rules are encoded in the script, not hidden in manual choices.

## 2. Inspect the original aiSource implementation

Published repository:

`https://github.com/narning1992/aiSource`

The repository contains an XGBoost cgMLST model and example data. Its original environment used older Python/XGBoost/scikit-learn versions, so it is intentionally an **after-workshop** exercise.

## 3. Compare source definitions

Repeat attribution under alternative class definitions:

- five classes: chicken / cattle / sheep / wild bird / environment;
- four classes: chicken / ruminant / wild bird / environment;
- three classes: poultry / ruminant / wild bird.

Ask what is gained and lost by collapsing biologically overlapping reservoirs.

## 4. Local vs global reference populations

A strong extension is to compare:

- a geographically broad/global training set; and
- a geographically closer/local training set.

Evaluate prediction stability, probability calibration and performance under lineage-aware cross-validation.
