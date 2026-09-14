# 01 - PubMLST and MLST

## Core message

MLST converts sequence variation at a small set of housekeeping loci into a portable allelic profile and sequence type (ST). A clonal complex groups related STs. These are names for population structure, not proof of direct transmission.

## Live workflow

1. Open the *C. jejuni/C. coli* PubMLST sequence-definition database.
2. Choose **Single sequence**.
3. Upload one mystery genome in FASTA format.
4. Select the *C. jejuni/C. coli* MLST scheme.
5. Submit and record the allele profile, ST and CC.
6. Repeat with the remaining genomes.

BIGSdb explicitly supports whole-genome, multi-contig uploads for sequence query; when all loci in a selected scheme match, scheme fields such as ST can be returned in one operation.

Official documentation:
https://bigsdb.readthedocs.io/en/latest/data_query/0010_determine_allele_identity.html

## Teaching prompts

- Why do we assign allele numbers instead of comparing raw sequences every time?
- What information is lost when a ~1.6 Mb genome is represented by seven allele numbers?
- Why can two isolates in CC45 still be epidemiologically unrelated?
- What might cause a locus not to return an exact allele match?
