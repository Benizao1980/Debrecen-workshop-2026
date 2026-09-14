# Mystery genome assemblies

These files are intentionally generated/downloaded from public records rather than stored as unpublished project data.

Run:

```bash
python scripts/prepare_public_dataset.py --download-fastas
```

Expected filenames:

```text
mystery_A.fasta
mystery_B.fasta
mystery_C.fasta
mystery_D.fasta
```

If direct PubMLST REST download fails, use `data/generated/mystery_manifest.tsv` to retrieve the public records manually.
