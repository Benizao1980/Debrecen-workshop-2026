#!/usr/bin/env python3
"""Prepare a reproducible, public Campylobacter teaching set.

The script pins sample selection to Arning et al. (2021) PLOS Genetics S1 Table
(DOI: 10.1371/journal.pgen.1009436.s001), rather than assuming that the live
PubMLST project 102 membership is unchanged.

Outputs are written relative to the repository root.
"""

from __future__ import annotations

import argparse
import csv
import io
import json
import re
import shutil
import sys
import time
import urllib.error
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, Mapping

PLOS_S1_URL = (
    "https://journals.plos.org/plosgenetics/article/file?"
    "id=10.1371/journal.pgen.1009436.s001&type=supplementary"
)
AISOURCE_OUTPUT_URLS = [
    "https://raw.githubusercontent.com/narning1992/aiSource/master/test_aiSource_out.tsv",
    "https://raw.githubusercontent.com/narning1992/aiSource/main/test_aiSource_out.tsv",
]
PUBMLST_ISOLATE = (
    "https://rest.pubmlst.org/db/pubmlst_campylobacter_isolates/isolates/{id}"
)
USER_AGENT = "wild-bird-campylobacter-workshop/1.0 (+public teaching data)"


@dataclass(frozen=True)
class Cols:
    pid: str
    st: str
    cc: str | None
    source: str
    prediction: str | None
    generalist: str
    country: str | None
    year: str | None
    species: str | None
    split: str | None


def norm(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", (s or "").lower())


def get_url(url: str, timeout: int = 60) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read()


def download_with_fallback(urls: Iterable[str]) -> tuple[bytes, str]:
    errors: list[str] = []
    for url in urls:
        try:
            return get_url(url), url
        except Exception as exc:  # noqa: BLE001 - report all network failures clearly
            errors.append(f"{url}: {exc}")
    raise RuntimeError("All download attempts failed:\n" + "\n".join(errors))


def read_tsv(path: Path) -> tuple[list[str], list[dict[str, str]]]:
    text = path.read_text(encoding="utf-8-sig", errors="replace")
    # A few download layers can wrap a one-column TSV as quoted text. Normal TSV is expected.
    reader = csv.DictReader(io.StringIO(text), delimiter="\t")
    if not reader.fieldnames:
        raise ValueError(f"No header found in {path}")
    rows = [{k: (v or "").strip() for k, v in row.items()} for row in reader]
    return list(reader.fieldnames), rows


def choose_col(headers: list[str], aliases: Iterable[str], required: bool = True) -> str | None:
    by_norm = {norm(h): h for h in headers}
    for alias in aliases:
        if norm(alias) in by_norm:
            return by_norm[norm(alias)]
    # Fuzzy fallback: all tokens from alias occur in header normalisation.
    for alias in aliases:
        a = norm(alias)
        for hn, original in by_norm.items():
            if a and (a in hn or hn in a):
                return original
    if required:
        raise KeyError(
            f"Could not identify required column from aliases {list(aliases)}. "
            f"Available columns: {headers}"
        )
    return None


def infer_columns(headers: list[str]) -> Cols:
    return Cols(
        pid=choose_col(headers, ["PubMLST accession ID", "PubMLST ID", "PubMLST", "id"]),
        st=choose_col(headers, ["sequence type", "ST"]),
        cc=choose_col(headers, ["clonal complex", "CC"], required=False),
        source=choose_col(headers, ["source label", "source", "true label", "label"]),
        prediction=choose_col(
            headers,
            ["predicted label", "prediction", "predicted source", "predicted_source"],
            required=False,
        ),
        generalist=choose_col(headers, ["generalist index", "generalist_index"]),
        country=choose_col(headers, ["country of isolation", "country"], required=False),
        year=choose_col(headers, ["year of sampling", "year"], required=False),
        species=choose_col(
            headers,
            ["Campylobacter species", "species", "organism"],
            required=False,
        ),
        split=choose_col(
            headers,
            ["training or testing", "train/test", "training/testing", "set", "dataset"],
            required=False,
        ),
    )


def source_norm(value: str) -> str:
    n = norm(value)
    mapping = {
        "bird": "wild bird",
        "wildbird": "wild bird",
        "wildbirds": "wild bird",
        "chicken": "chicken",
        "chickenoffalormeat": "chicken",
        "cattle": "cattle",
        "cattleoffalormeat": "cattle",
        "sheep": "sheep",
        "sheepoffalormeat": "sheep",
        "environment": "environment",
        "environmental": "environment",
        "riverwater": "environment",
        "sand": "environment",
    }
    if n in mapping:
        return mapping[n]
    if "bird" in n:
        return "wild bird"
    if "chicken" in n:
        return "chicken"
    if "cattle" in n or "bovine" in n or n == "cow":
        return "cattle"
    if "sheep" in n or "ovine" in n:
        return "sheep"
    if "environment" in n or "water" in n or "sand" in n:
        return "environment"
    return value.strip().lower()


def split_norm(value: str) -> str:
    n = norm(value)
    if "test" in n:
        return "test"
    if "train" in n:
        return "train"
    return value.strip().lower()


def intish(value: str, default: int = 10**9) -> int:
    m = re.search(r"-?\d+", value or "")
    return int(m.group()) if m else default


def cc_norm(value: str) -> str:
    n = norm(value)
    n = n.replace("clonalcomplex", "").replace("complex", "").replace("cc", "")
    m = re.search(r"\d+", n)
    return m.group() if m else n


def row_view(row: Mapping[str, str], c: Cols) -> dict[str, object]:
    return {
        "pubmlst_id": row.get(c.pid, ""),
        "st": row.get(c.st, ""),
        "cc": row.get(c.cc, "") if c.cc else "",
        "source": source_norm(row.get(c.source, "")),
        "prediction": source_norm(row.get(c.prediction, "")) if c.prediction else "",
        "generalist": intish(row.get(c.generalist, ""), default=999),
        "country": row.get(c.country, "") if c.country else "",
        "year": row.get(c.year, "") if c.year else "",
        "species": row.get(c.species, "") if c.species else "",
        "split": split_norm(row.get(c.split, "")) if c.split else "",
        "raw": row,
    }


def numeric_id_key(v: Mapping[str, object]) -> tuple[int, str]:
    s = str(v["pubmlst_id"])
    return (intish(s), s)


def pick_first(candidates: list[dict[str, object]], label: str) -> dict[str, object]:
    if not candidates:
        raise RuntimeError(f"Could not find a suitable candidate for mystery {label}")
    return sorted(candidates, key=numeric_id_key)[0]


def is_jejuni(v: Mapping[str, object]) -> bool:
    sp = norm(str(v.get("species", "")))
    return not sp or "jejuni" in sp


def select_mysteries(rows: list[dict[str, object]]) -> dict[str, dict[str, object]]:
    test = [r for r in rows if r["split"] == "test"] or rows
    test = [r for r in test if is_jejuni(r)] or test

    # A: wild-bird specialist, preferably correctly classified.
    a_pool = [r for r in test if r["source"] == "wild bird" and r["generalist"] == 1]
    a_correct = [r for r in a_pool if not r["prediction"] or r["prediction"] == r["source"]]
    A = pick_first(a_correct or a_pool, "A")

    # B: chicken specialist; prioritise commonly recognised poultry-associated CCs.
    poultry_cc = {"257", "353", "354", "443", "464", "607"}
    b_pool = [
        r for r in test
        if r["source"] == "chicken" and r["generalist"] == 1 and r["pubmlst_id"] != A["pubmlst_id"]
    ]
    b_pref = [r for r in b_pool if cc_norm(str(r["cc"])) in poultry_cc]
    b_correct = [r for r in (b_pref or b_pool) if not r["prediction"] or r["prediction"] == r["source"]]
    B = pick_first(b_correct or b_pref or b_pool, "B")

    # C: ruminant specialist/near-specialist; prefer classical ruminant CC42/CC61.
    ruminant_cc = {"42", "61"}
    c_pool = [
        r for r in test
        if r["source"] in {"cattle", "sheep"} and r["pubmlst_id"] not in {A["pubmlst_id"], B["pubmlst_id"]}
    ]
    if not c_pool:
        raise RuntimeError("No cattle/sheep candidates found for mystery C")
    min_gi = min(int(r["generalist"]) for r in c_pool)
    c_low = [r for r in c_pool if r["generalist"] == min_gi]
    c_pref = [r for r in c_low if cc_norm(str(r["cc"])) in ruminant_cc]
    c_correct = [r for r in (c_pref or c_low) if not r["prediction"] or r["prediction"] == r["source"]]
    C = pick_first(c_correct or c_pref or c_low, "C")

    used = {A["pubmlst_id"], B["pubmlst_id"], C["pubmlst_id"]}
    # D: biological generalist. Prefer CC21/45 AND a published misclassification.
    d_pool = [r for r in test if r["pubmlst_id"] not in used and r["generalist"] >= 4]
    if not d_pool:
        max_gi = max(int(r["generalist"]) for r in test if r["pubmlst_id"] not in used)
        d_pool = [r for r in test if r["pubmlst_id"] not in used and r["generalist"] == max_gi]
    d_cc = [r for r in d_pool if cc_norm(str(r["cc"])) in {"21", "45"}]
    d_mis = [r for r in (d_cc or d_pool) if r["prediction"] and r["prediction"] != r["source"]]
    D = pick_first(d_mis or d_cc or d_pool, "D")

    return {"A": A, "B": B, "C": C, "D": D}


def select_reference_panel(
    rows: list[dict[str, object]], mysteries: Mapping[str, Mapping[str, object]], per_source: int = 2
) -> list[dict[str, object]]:
    train = [r for r in rows if r["split"] == "train"] or rows
    excluded_ids = {str(m["pubmlst_id"]) for m in mysteries.values()}
    excluded_sts = {norm(str(m["st"])) for m in mysteries.values()}
    panel: list[dict[str, object]] = []
    for source in ["chicken", "cattle", "sheep", "wild bird", "environment"]:
        pool = [
            r for r in train
            if r["source"] == source
            and str(r["pubmlst_id"]) not in excluded_ids
            and norm(str(r["st"])) not in excluded_sts
            and is_jejuni(r)
        ]
        specialist = [r for r in pool if r["generalist"] == 1]
        chosen = sorted(specialist or pool, key=numeric_id_key)[:per_source]
        panel.extend(chosen)
    if len(panel) < 5:
        raise RuntimeError("Reference panel selection returned too few records")
    return panel


def write_tsv(path: Path, fieldnames: list[str], rows: Iterable[Mapping[str, object]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=fieldnames, delimiter="\t", extrasaction="ignore")
        writer.writeheader()
        for row in rows:
            writer.writerow({k: row.get(k, "") for k in fieldnames})


def public_row(mystery: str, r: Mapping[str, object]) -> dict[str, object]:
    return {
        "mystery_id": mystery,
        "pubmlst_id": r["pubmlst_id"],
        "ST": r["st"],
        "CC": r["cc"],
        "species": r["species"],
        "country": r["country"],
        "year": r["year"],
        "split": r["split"],
    }


def answer_row(mystery: str, r: Mapping[str, object]) -> dict[str, object]:
    x = public_row(mystery, r)
    x.update(
        {
            "true_source": r["source"],
            "published_prediction": r["prediction"],
            "generalist_index": r["generalist"],
        }
    )
    return x


def load_aisource_probabilities(cache_path: Path) -> dict[str, dict[str, str]]:
    try:
        if not cache_path.exists():
            data, used = download_with_fallback(AISOURCE_OUTPUT_URLS)
            cache_path.write_bytes(data)
            print(f"Downloaded optional aiSource probability output from {used}")
        headers, rows = read_tsv(cache_path)
        id_col = choose_col(headers, ["id", "PubMLST ID", "pubmlst_id"])
        out: dict[str, dict[str, str]] = {}
        for r in rows:
            out[str(r[id_col]).strip()] = r
        return out
    except Exception as exc:  # noqa: BLE001
        print(f"Warning: aiSource probability output unavailable: {exc}", file=sys.stderr)
        return {}


def probability_fields(prob_row: Mapping[str, str] | None) -> dict[str, str]:
    if not prob_row:
        return {}
    result: dict[str, str] = {}
    for target, aliases in {
        "p_chicken": ["chicken"],
        "p_cattle": ["cattle"],
        "p_sheep": ["sheep"],
        "p_wild_bird": ["wild bird", "wild_bird", "bird"],
        "p_environment": ["environment"],
    }.items():
        for h, v in prob_row.items():
            if norm(h) in {norm(a) for a in aliases}:
                result[target] = v
                break
    return result


def download_fasta(pubmlst_id: str, destination: Path) -> tuple[bool, str]:
    try:
        meta_url = PUBMLST_ISOLATE.format(id=pubmlst_id)
        payload = json.loads(get_url(meta_url).decode("utf-8"))
        seq_bin = payload.get("sequence_bin") or {}
        fasta_url = seq_bin.get("contigs_fasta")
        if not fasta_url:
            return False, "isolate record has no sequence_bin.contigs_fasta URL"
        data = get_url(fasta_url, timeout=90)
        if not data.lstrip().startswith(b">"):
            return False, "download did not look like FASTA"
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(data)
        return True, fasta_url
    except (urllib.error.URLError, urllib.error.HTTPError, json.JSONDecodeError, TimeoutError) as exc:
        return False, str(exc)
    except Exception as exc:  # noqa: BLE001
        return False, str(exc)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--s1", type=Path, help="Use an already downloaded PLOS S1 TSV")
    parser.add_argument(
        "--download-fastas",
        action="store_true",
        help="Attempt to download public assemblies from the PubMLST REST API",
    )
    parser.add_argument("--per-source", type=int, default=2, help="Reference records per source class")
    args = parser.parse_args()

    repo = Path(__file__).resolve().parents[1]
    generated = repo / "data" / "generated"
    generated.mkdir(parents=True, exist_ok=True)

    snapshot = generated / "source_snapshot.tsv"
    if args.s1:
        shutil.copyfile(args.s1, snapshot)
        print(f"Using supplied S1 file: {args.s1}")
    elif not snapshot.exists():
        try:
            data = get_url(PLOS_S1_URL)
            snapshot.write_bytes(data)
            print(f"Downloaded pinned PLOS S1 table to {snapshot}")
        except Exception as exc:  # noqa: BLE001
            print(
                "ERROR: Could not download the PLOS S1 table automatically.\n"
                f"{exc}\n\n"
                "Download DOI 10.1371/journal.pgen.1009436.s001 manually and rerun:\n"
                "  python scripts/prepare_public_dataset.py --s1 /path/to/pgen.1009436.s001.tsv\n",
                file=sys.stderr,
            )
            return 2
    else:
        print(f"Using cached pinned S1 table: {snapshot}")

    headers, raw_rows = read_tsv(snapshot)
    if len(raw_rows) < 1000:
        raise RuntimeError(
            f"Only {len(raw_rows)} data rows were parsed from S1; expected thousands. "
            "Check that the downloaded file is the TSV supplement."
        )
    cols = infer_columns(headers)
    rows = [row_view(r, cols) for r in raw_rows]
    print(f"Parsed {len(rows):,} published records")
    print("Inferred columns:", cols)

    mysteries = select_mysteries(rows)
    panel = select_reference_panel(rows, mysteries, per_source=max(1, args.per_source))

    # Participant-safe manifest (no true source/prediction).
    mystery_public = [public_row(k, mysteries[k]) for k in "ABCD"]
    write_tsv(
        generated / "mystery_manifest.tsv",
        ["mystery_id", "pubmlst_id", "ST", "CC", "species", "country", "year", "split"],
        mystery_public,
    )
    write_tsv(
        generated / "pubmlst_typing.tsv",
        ["mystery_id", "ST", "CC", "species"],
        mystery_public,
    )

    answers = [answer_row(k, mysteries[k]) for k in "ABCD"]
    write_tsv(
        repo / "answers" / "mystery_key.tsv",
        [
            "mystery_id", "pubmlst_id", "ST", "CC", "species", "country", "year", "split",
            "true_source", "published_prediction", "generalist_index",
        ],
        answers,
    )

    # Optional model probabilities from published aiSource example output.
    probs = load_aisource_probabilities(generated / "aisource_test_output.tsv")
    reveal_rows = []
    for k in "ABCD":
        r = mysteries[k]
        row = {
            "mystery_id": k,
            "pubmlst_id": r["pubmlst_id"],
            "ST": r["st"],
            "CC": r["cc"],
            "true_source": r["source"],
            "published_prediction": r["prediction"],
            "generalist_index": r["generalist"],
        }
        row.update(probability_fields(probs.get(str(r["pubmlst_id"]))))
        reveal_rows.append(row)
    reveal_fields = [
        "mystery_id", "pubmlst_id", "ST", "CC", "true_source", "published_prediction",
        "generalist_index", "p_chicken", "p_cattle", "p_sheep", "p_wild_bird", "p_environment",
    ]
    write_tsv(generated / "source_attribution_reveal.tsv", reveal_fields, reveal_rows)

    panel_rows = []
    counters: dict[str, int] = {}
    for r in panel:
        source = str(r["source"])
        counters[source] = counters.get(source, 0) + 1
        panel_rows.append(
            {
                "reference_id": f"{source.replace(' ', '_')}_{counters[source]}",
                "pubmlst_id": r["pubmlst_id"],
                "source": source,
                "ST": r["st"],
                "CC": r["cc"],
                "generalist_index": r["generalist"],
                "country": r["country"],
                "year": r["year"],
                "species": r["species"],
                "split": r["split"],
            }
        )
    write_tsv(
        generated / "reference_panel_manifest.tsv",
        [
            "reference_id", "pubmlst_id", "source", "ST", "CC", "generalist_index",
            "country", "year", "species", "split",
        ],
        panel_rows,
    )

    print("\nSelected mysteries:")
    for k in "ABCD":
        r = mysteries[k]
        print(
            f"  {k}: PubMLST {r['pubmlst_id']} | ST {r['st']} | CC {r['cc']} | "
            f"true={r['source']} | predicted={r['prediction'] or 'NA'} | GI={r['generalist']}"
        )

    if args.download_fastas:
        print("\nAttempting public FASTA downloads from PubMLST...")
        for k in "ABCD":
            r = mysteries[k]
            dest = repo / "data" / "mystery_genomes" / f"mystery_{k}.fasta"
            ok, note = download_fasta(str(r["pubmlst_id"]), dest)
            print(f"  mystery {k}: {'OK' if ok else 'FAILED'} — {note}")
            time.sleep(0.1)

        for i, r in enumerate(panel_rows, start=1):
            safe_source = str(r["source"]).replace(" ", "_")
            dest = repo / "data" / "reference_genomes" / (
                f"reference_{i:02d}_{safe_source}_pubmlst_{r['pubmlst_id']}.fasta"
            )
            ok, note = download_fasta(str(r["pubmlst_id"]), dest)
            print(f"  reference {i:02d}: {'OK' if ok else 'FAILED'} — {note}")
            time.sleep(0.1)

    print("\nDone. Core outputs:")
    for p in [
        generated / "mystery_manifest.tsv",
        generated / "reference_panel_manifest.tsv",
        generated / "pubmlst_typing.tsv",
        generated / "source_attribution_reveal.tsv",
        repo / "answers" / "mystery_key.tsv",
    ]:
        print(" ", p.relative_to(repo))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
