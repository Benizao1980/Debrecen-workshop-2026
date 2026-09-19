# Bonus — reproduce and extend the analysis

## 1. Reproduce the live PubMLST collection

Open the *Campylobacter jejuni/coli* isolate/genome collection and filter **Publication** to:

`Mourkas et al. 2024 Curr Biol 34:3955–3965.e4`

The practical expects **700 genomes**.

## 2. Re-run the focal examples

Inspect:

- PubMLST **46556 / P3-2209 / ST2209 / ST-179 complex**;
- PubMLST **46122 / KAI44/12 / ST45 / ST-45 complex**.

Compare the host/source distribution of related records before moving to cgMLST.

## 3. Re-run Genome Comparator

Paste the IDs in `participants/genome_comparator_panel.txt` and use **C. jejuni / C. coli cgMLST v2**.

Compare:

- MLST identity;
- cgMLST allelic distance;
- missing/incomplete loci;
- metadata concordance.

## 4. Extend the wild-bird AMR analysis

Public contiguous assemblies from the Mourkas et al. study are available at:

`https://doi.org/10.6084/m9.figshare.23631495`

Useful extensions include:

- contrasting human-proximal vs remote bird populations;
- testing whether AMR determinants occur in one lineage or across unrelated lineages;
- adding mobile-element/long-read context;
- comparing matched human, livestock, sewage, water and environmental samples.
