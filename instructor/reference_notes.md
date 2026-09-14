# Reference notes for the instructor

## Why pin S1 rather than “project 102”?

PubMLST is a living database. The Arning et al. paper describes a specific 5,799-genome analytical snapshot and provides the exact records in S1 Table. The current live project may contain additional records. The workshop therefore chooses mysteries from the immutable published supplement.

## Why use the test set for mysteries?

The paper split data by ST: all genomes belonging to one ST were placed entirely in training or testing. Selecting mystery records from the published test set preserves the logic of evaluating attribution on lineages that were not split across train/test.

## Why deliberately choose a misclassified generalist for D?

A wrong prediction is pedagogically more useful when it exposes genuine biological overlap. It makes clear that source attribution is not a magical provenance detector and that host transition erodes source-specific genomic signal.

## Why not train a model live?

Two hours is better spent on biological reasoning. Environment management, model packages and data preprocessing can easily consume the entire session. The published aiSource repository remains a useful optional follow-up.
