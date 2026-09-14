# 03 - Source attribution

## Live session: interpret, do not install

Do not spend the 2-hour session installing a machine-learning stack. Participants first make an ecological prediction from MLST, PubMLST metadata and the Genome Comparator result. Then reveal a **precomputed** model output.

Put the final predictions in:

`data/precomputed/source_predictions.tsv`

Suggested columns:

```text
mystery_id,poultry_probability,ruminant_probability,wild_bird_probability,predicted_source,max_probability
```

## Optional follow-up

SourceRunner-ML repository:
https://github.com/Benizao1980/SourceRunnerML

Use source-labelled training genomes from clearly defined reference populations (for example poultry, ruminant and wild bird), and keep the workshop mystery genomes completely out of model training.

## What participants should learn

A classification model estimates resemblance to the source populations represented in its training data. It does not observe a transmission event.

Ask participants to identify at least four sources of uncertainty:

- generalist lineages;
- uneven sampling among sources;
- geographic mismatch between training and target data;
- a true reservoir missing from the model;
- correlated genomes/lineages leaking between training and test folds;
- poor metadata labels.

## Strong optional exercise

Run the same mystery genomes under two training designs:

1. a large/global source-labelled dataset;
2. a geographically closer/local dataset.

Compare probability calibration and prediction stability. This directly connects to the broader local-vs-global source-attribution question.
