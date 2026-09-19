# Debrecen 2026 — PubMLST wild-bird *Campylobacter* practical

This repository contains the public teaching materials used for the Debrecen wild-bird AMR workshop.

The practical is now aligned to the **36-slide `pubMLST_intro_WB` session actually delivered in Hungary** and uses one coherent published dataset throughout: the **700-genome *Campylobacter jejuni* wild-bird collection from Mourkas et al. (2024), Current Biology**.

The earlier four-mystery-genome / Arning et al. teaching exercise has been retired from the live workshop materials.

## Teaching story

**Find the study → explore metadata → inspect MLST/ST/CC → contrast a host-associated lineage with a generalist lineage → add cgMLST resolution → visualise population structure → discuss what source/ecology/AMR conclusions are justified.**

Two focal isolates anchor the session:

| Role | PubMLST ID | Isolate | Country/year | Bird | ST | Clonal complex | Teaching point |
|---|---:|---|---|---|---:|---|---|
| Host-associated example | **46556** | **P3-2209** | Japan, 2010 | Pigeon / “Unknown dove” | **2209** | **ST-179 complex** | strong bird-host structure |
| Generalist example | **46122** | **KAI44/12** | Finland, 2012 | Goose | **45** | **ST-45 complex** | broad host/source generalist; source inference is intrinsically harder |

## Core dataset

In the PubMLST *Campylobacter jejuni/coli* isolate/genome collection, enable filters and select:

**Publication: `Mourkas et al. 2024 Curr Biol 34:3955–3965.e4`**

The dashboard used in the practical contains **700 genomes**. The session works directly with public PubMLST records rather than redistributing private or unpublished assemblies.

Core paper:

> Mourkas E, Valdebenito JO, Marsh H, Hitchings MD, Cooper KK, Parker CT, Székely T, Johansson H, Ellström P, Pascoe B, Waldenström J, Sheppard SK. **Proximity to humans is associated with antimicrobial-resistant enteric pathogens in wild bird microbiomes.** *Current Biology*. 2024;34:3955–3965.e4. DOI: `10.1016/j.cub.2024.07.059`.

Public contiguous assemblies: `https://doi.org/10.6084/m9.figshare.23631495`

## Start here

- **Participants:** [`participants/workbook.md`](participants/workbook.md)
- **Quick reference:** [`participants/quick_reference.md`](participants/quick_reference.md)
- **Genome Comparator panel:** [`participants/genome_comparator_panel.txt`](participants/genome_comparator_panel.txt)
- **Instructor run sheet:** [`instructor/run_sheet.md`](instructor/run_sheet.md)
- **Slide-by-slide map:** [`instructor/slide_map.md`](instructor/slide_map.md)
- **Instructor answer key:** [`instructor/answer_key.md`](instructor/answer_key.md)
- **Slide guide:** [`slides/README.md`](slides/README.md)

`workshop.md` is retained as a root-level copy of the participant workbook for backwards compatibility.

## Learning outcomes

By the end participants should be able to:

1. navigate the PubMLST *C. jejuni/coli* isolate and genome collections;
2. filter a public collection by publication and interrogate provenance/host metadata;
3. explain allele → ST → clonal complex → cgMLST resolution;
4. recognise why host-associated lineages can carry stronger ecological signal than generalist lineages;
5. use Genome Comparator to inspect gene-by-gene variation and allelic relatedness;
6. export/visualise population structure in Microreact;
7. distinguish **population association**, **genomic relatedness**, **source attribution** and **direct transmission**;
8. interpret AMR in wild birds in the context of ecology and anthropogenic exposure rather than treating a single genome as proof of a transmission route.

## 120-minute flow

| Time | Activity |
|---|---|
| 0–12 min | framing + PubMLST orientation |
| 12–28 min | find the Mourkas 2024 collection and inspect the dashboard |
| 28–43 min | country/continent and source/comments metadata breakdowns |
| 43–57 min | MLST, ST and clonal-complex concepts |
| 57–72 min | focal isolate 46556 / P3-2209 / CC179 |
| 72–87 min | focal isolate 46122 / KAI44/12 / CC45 |
| 87–107 min | Genome Comparator / cgMLST |
| 107–114 min | Microreact |
| 114–120 min | AMR/ecology synthesis |

## Repository map

```text
.
├── README.md
├── workshop.md
├── 01_pubmlst/
├── 02_population_structure/
├── 03_source_attribution/
├── 04_amr/
├── participants/
├── instructor/
├── data/
├── references/
└── slides/
```

## Important interpretation rule

> Genomes can support population/ecological associations and transmission hypotheses. They do not, by themselves, establish the direction or exact route of transmission.

The related HU-RIZON research project is linked in [`HU_RIZON_LINK.md`](HU_RIZON_LINK.md).
