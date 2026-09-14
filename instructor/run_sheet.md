# Instructor run sheet - 120 minutes

## Before people arrive

- Put the GitHub/ZIP link on the first slide and in the chat/handout.
- Test PubMLST from the workshop Wi-Fi.
- Have A-D FASTAs downloaded locally on every machine if possible.
- Have all precomputed outputs open in separate browser tabs.
- Do not rely on a queued web analysis finishing inside the scheduled slot.

## 0-10 min - Frame the problem

**Slides 1-4.**

Opening question:

> “We cultured *C. jejuni* from a wild bird. Does that make it a wild-bird strain?”

Ask for a show of hands: who thinks genome sequence can tell you where it came from?

Give the four mystery genomes. Explain that all were cultured from wild birds, but hide bird species and sampling context.

## 10-25 min - PubMLST in one conceptual picture

**Slides 5-7.**

Keep jargon to a minimum:

DNA sequence -> allele number -> allelic profile -> ST -> CC -> cg/wgMLST comparison.

Show the distinction between the **typing/definition database** and the **isolate/genome collection**. The important idea is that PubMLST links a nomenclature system to genomes plus provenance metadata.

Live-demo mystery A only.

## 25-45 min - Exercise 1

Participants type A-D.

Walk the room. If someone is stuck, pair them with someone who has a result rather than stopping the entire room.

At ~40 min reveal the expected ST/CC table but not the original host/site identities.

## 45-70 min - Exercise 2

**Slides 8-11.**

First let them query matching STs and inspect metadata. Then run Genome Comparator.

Key sentence:

> “MLST gives the lineage a name; the larger gene-by-gene comparison asks how much genomic resolution is hidden behind that name.”

If Genome Comparator is slow, immediately switch to precomputed output.

End this block by showing the study population tree and ask them where they would place each mystery isolate.

## 70-90 min - Exercise 3: source attribution

**Slides 12-14.**

Before revealing the ML result, force a prediction. Participants should give a source and a confidence level.

Then reveal the precomputed SourceRunner-ML probabilities.

Spend most discussion time on B/ST45. The “failure” to confidently assign a generalist is a biological result, not merely a bad algorithm.

## 90-110 min - Exercise 4: AMR

**Slides 15-16.**

Reveal exact A-D AMR calls after they have made a prediction from the ecological context.

Then zoom out to the project-level result: near-farm wild birds carried more selected resistance determinants than non-agricultural birds; `tetO` and `gyrA_T86I` provide concrete examples.

Ask: “What experiment or data would distinguish resistant lineage movement from mobile-gene movement?”

Expected answer includes long reads/plasmid context plus denser temporal/ecological sampling.

## 110-120 min - Reveal and synthesis

**Slides 17-18.**

Reveal host species and sites.

Get one participant/group to give a 60-second interpretation of one isolate using the synthesis template in `workshop.md`.

Finish on uncertainty rather than a list of tools.

> “Genomes make our hypotheses much sharper. They do not remove the need for ecology, metadata or good sampling.”
