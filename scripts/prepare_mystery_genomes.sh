#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./scripts/prepare_mystery_genomes.sh /path/to/assemblies
#
# Expected source filenames can be .fasta, .fa or .fna and must contain the
# isolate id. Edit find_one() if your project naming convention differs.

SOURCE_DIR="${1:-}"
DEST_DIR="$(cd "$(dirname "$0")/.." && pwd)/data/mystery_genomes"

if [[ -z "$SOURCE_DIR" || ! -d "$SOURCE_DIR" ]]; then
  echo "Usage: $0 /path/to/assemblies" >&2
  exit 2
fi

mkdir -p "$DEST_DIR"

find_one() {
  local isolate="$1"
  find "$SOURCE_DIR" -type f \( -iname "*${isolate}*.fasta" -o -iname "*${isolate}*.fa" -o -iname "*${isolate}*.fna" \) | head -n 1
}

copy_isolate() {
  local mystery="$1"
  local isolate="$2"
  local src
  src="$(find_one "$isolate")"
  if [[ -z "$src" ]]; then
    echo "ERROR: no FASTA found for $isolate" >&2
    return 1
  fi
  cp "$src" "$DEST_DIR/mystery_${mystery}.fasta"
  echo "$isolate -> mystery_${mystery}.fasta"
}

copy_isolate A Cj_2849
copy_isolate B Cj_10787
copy_isolate C Cj_10726
copy_isolate D Cj_10753

cd "$DEST_DIR"
zip -q -j mystery_genomes_A-D.zip mystery_A.fasta mystery_B.fasta mystery_C.fasta mystery_D.fasta

echo "Created $DEST_DIR/mystery_genomes_A-D.zip"
