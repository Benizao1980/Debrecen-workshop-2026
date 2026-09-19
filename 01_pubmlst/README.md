# 01 — PubMLST: find the study, inspect metadata, understand MLST

## Teaching aim

Introduce PubMLST as both a curated nomenclature system and a genome/isolate collection with provenance metadata.

The live exercise follows the delivered slide deck rather than uploading mystery FASTA files.

## Workflow

1. Log in to PubMLST.
2. Open the *Campylobacter jejuni/coli* database.
3. Open the isolate/genome collection.
4. Use **Modify form** to enable **Filters**.
5. Filter **Publication** to:

   `Mourkas et al. 2024 Curr Biol 34:3955–3965.e4`

6. Confirm the dashboard contains **700 genomes**.
7. Use **Breakdown → Two Field** to explore:
   - `country` × `continent`;
   - `source` × `comments`.
8. Customise the result table to display `comments`, which contains the more specific bird annotation used in this collection.

## Conceptual ladder

```text
sequence at locus → allele number
7 allele numbers → allelic profile
allelic profile → sequence type (ST)
related STs → clonal complex (CC)
whole genome → cgMLST / gene-by-gene comparison
```

The seven classical MLST loci are:

`aspA, glnA, gltA, glyA, pgm, tkt, uncA`

## Key questions

- What does the dashboard tell us about the **study collection**, and what does it not tell us about prevalence?
- Why is `wild bird` too coarse for many ecological questions?
- Why can ST/CC be useful even though they are much lower resolution than cgMLST?
- Does sharing an ST establish recent transmission? **No.**
