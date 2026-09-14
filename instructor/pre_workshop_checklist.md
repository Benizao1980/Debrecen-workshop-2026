# Pre-workshop checklist

## Must do

- [ ] Confirm the slot is exactly 120 minutes.
- [ ] Locate the assembly FASTAs for Cj_2849, Cj_10787, Cj_10726 and Cj_10753.
- [ ] Confirm whether Cj_2849 can be redistributed publicly. If not, distribute that FASTA privately or substitute a public Ottenby genome.
- [ ] Rename/copy them with `scripts/prepare_mystery_genomes.sh`.
- [ ] Test all four in the current PubMLST sequence-query interface.
- [ ] Save expected MLST allele profiles/ST/CC results.
- [ ] Run Genome Comparator once and save the distance matrix plus NeighborNet image.
- [ ] Run SourceRunner-ML using the intended training set and save probabilities.
- [ ] Run the project AMR pipeline on A-D and save exact calls.
- [ ] Add all fallback outputs to `data/precomputed/`.
- [ ] Test every link and every exercise from a non-Oxford network.

## Strongly recommended

- [ ] Prepare one ZIP containing A-D FASTAs to avoid four separate downloads.
- [ ] Keep the source-attribution computation precomputed; do not install packages live.
- [ ] Put a PDF copy of the participant workbook in the room/shared folder.
- [ ] Put a QR code to the repository on the title and final slides.
- [ ] Have an offline copy of the slide deck and repository ZIP.

## Nice extension if time permits

- [ ] Repeat source attribution with global versus geographically closer training data.
- [ ] Add cgMLST/LIN/hierarchical clustering discussion only if it serves the audience; do not let nomenclature crowd out the ecological story.
- [ ] Add one deliberately poor-quality assembly to demonstrate how missing loci affect genome comparison.
