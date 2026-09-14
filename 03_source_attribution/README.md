# 03 — Source attribution: specialists, generalists and uncertainty

## Published teaching dataset

Arning et al. (2021) used 5,799 public Campylobacter genomes from chicken, cattle, sheep, wild birds and the environment.

The dataset was split by **sequence type**, not by independently randomising individual genomes: all members of one ST were assigned wholly to training or testing. This reduces the risk of testing on near-duplicates of the same ST used for training.

## Why the mystery design works

A–C are selected to be relatively source restricted; D is deliberately a generalist and preferably one that the published model misclassified.

The published paper defined the **generalist index** as the number of source classes in which an ST occurred. Attribution accuracy declined as this index increased.

The paper reported that 58% of wild-bird isolates belonged to STs found only in the wild-bird niche, helping explain why wild-bird attribution performed well despite the smaller sample size.

## Resolution comparison

Published top-line performance:

| Input/method | Approximate accuracy |
|---|---:|
| standard iSource benchmark | 64% |
| ML on MLST | 71% |
| XGBoost on cgMLST | 85% |
| k-merised WGS | 78% |

The point is **not** that 85% is universally expected. The point is that adding genomic resolution helps, but biological host switching/generalism remains a real limit.

## Live exercise

Participants should make a source prediction and confidence rating **before** opening:

`data/generated/source_attribution_reveal.tsv`

Then discuss:

- true source;
- published predicted source;
- generalist index;
- whether an error is understandable from lineage ecology.

## Optional reproducible extension

The published aiSource repository is available at:

`https://github.com/narning1992/aiSource`

Treat this as an after-workshop exercise rather than trying to install an older machine-learning environment during the 2-hour session.
