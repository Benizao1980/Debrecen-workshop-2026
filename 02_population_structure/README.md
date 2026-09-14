# 02 - Population structure and Genome Comparator

## Live workflow

Genome Comparator can analyse isolates already in BIGSdb and can also accept user-uploaded genomes: one FASTA or a ZIP containing multiple FASTA files.

For the workshop:

1. zip `mystery_A.fasta` ... `mystery_D.fasta`;
2. open **Analysis -> Genome Comparator**;
3. upload the ZIP;
4. select a high-resolution *C. jejuni* defined-locus scheme;
5. keep the default pairwise handling of incomplete loci unless there is a reason to change it;
6. inspect the variable-locus table, distance matrix and NeighborNet.

Official documentation:
https://bigsdb.readthedocs.io/en/latest/data_analysis/genome_comparator.html

## Interpretation prompts

- MLST asks whether seven loci match. Genome Comparator can ask the same question across hundreds/thousands of loci.
- The distance matrix counts allele differences; it is not a count of transmission events.
- Recombination, missing loci, assembly quality and sampling all affect interpretation.
- A close pair is a hypothesis-generating observation. Direct transmission requires epidemiological support and appropriate temporal/spatial sampling.

## Curated visual reference panel

Use the compact panel in `data/reference_panel_plan.tsv`. It contains non-agricultural wild-bird, poultry and ruminant examples chosen to expose the biological contrasts rather than to estimate population frequencies. In particular, it deliberately includes CC45 in all three source categories and ST19/CC21 in both poultry and ruminants. It also includes a poultry ST1525 genome for comparison with mystery D.

The four mysteries + nine references gives a 13-genome teaching comparison: small enough to interpret in the room, but rich enough to show why lineage names and source labels do not map one-to-one.

**Do not use this tiny panel to train a source-attribution classifier.** SourceRunner-ML should use the larger source-labelled reference dataset.
