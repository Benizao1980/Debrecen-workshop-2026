# Bonus — PubMLST REST API

PubMLST exposes BIGSdb data through a REST API.

Useful starting points:

```text
https://pubmlst.org/api
https://rest.pubmlst.org/
```

The workshop setup script uses the isolate record endpoint and, when available, follows the `sequence_bin.contigs_fasta` URL to retrieve a public genome assembly.

General pattern:

```text
GET /db/pubmlst_campylobacter_isolates/isolates/{PUBMLST_ID}
```

Do not build a teaching workflow that silently depends on live project membership. Use a published/pinned manifest for reproducibility.
