# 04 - Cryptographic, Steganographic and File Forensics

> Analyze only challenge-provided files / volumes. Hashes verify identity; they do not decrypt data. Never place a container password directly in shell history or process arguments.

## Quick reference

| Objective | Command | Answer location |
|---|---|---|
| Hash one file | `sha256sum <FILE>` / `md5sum <FILE>` | Digest printed at left |
| Check an expected-hash manifest | `sha256sum -c <MANIFEST>` | `OK` / `FAILED` per file |
| Hash a directory of artifacts | `find <DIR> -type f -print0 | xargs -0 sha256sum` | One hash per path |
| Identify file type | `file <ARTIFACT>` | File signature / type |
| Inspect image metadata | `exiftool <IMAGE_FILE>` | Tags, timestamps, camera / embedded metadata |
| Find embedded signatures | `binwalk <ARTIFACT>` | Offsets and detected formats |
| Steghide metadata / extraction | `steghide info <IMAGE_FILE>` / `steghide extract -sf <IMAGE_FILE>` | Embedded-file name / extracted file |
| Mount a volume read-only | `veracrypt -t -m ro <VOLUME_FILE> <MOUNT_DIR>` | Files inside mount point |
| Entropy | Python snippet below / `binwalk -E <FILE>` | Bits per byte / entropy graph |

## Scenario archetypes

| If the question asks… | Workflow |
|---|---|
| Match supplied files against hashes | Calculate every digest; compare with the correct hash manifest |
| Identify MD5 / SHA-256 file hash | Use the named algorithm; confirm whether the task asks for file hash or text hash |
| Inspect encrypted VeraCrypt container | Verify file type / hash, mount read-only, inspect task-relevant paths, unmount |
| Extract a Steghide payload | Check metadata first, then interactive extraction using only the supplied passphrase |
| Find embedded archive / payload | `file` → `strings` → `exiftool` → `binwalk` |
| Compare entropy | Calculate bits/byte on comparable regions / files; interpret alongside file type and metadata |

## Core command / tool syntax

### 1. Batch MD5 / SHA-256 hashing and matching

```bash
# Hash a specific file
md5sum <FILE>
sha256sum <FILE>

# Generate manifests for all files under an evidence directory
find <DIR> -type f -print0 | xargs -0 sha256sum > <SHA256_MANIFEST>
find <DIR> -type f -print0 | xargs -0 md5sum > <MD5_MANIFEST>

# Validate a manifest in the standard sha256sum / md5sum format
sha256sum -c <SHA256_MANIFEST>
md5sum -c <MD5_MANIFEST>

# Compare known hash strings against a generated manifest
grep -Ff <KNOWN_HASH_LIST> <GENERATED_HASH_MANIFEST>
```

Hash manifests usually require the expected lines to use the standard `digest  filename` format. Do not compare an MD5 value against a SHA-256 manifest or compare a hash of the file with a hash of its text contents.

### 2. Read-only VeraCrypt triage

```bash
veracrypt -t --help
veracrypt -t --list
veracrypt --version

# Mount the task-provided volume read-only; VeraCrypt prompts for credentials
mkdir -p <MOUNT_DIR>
veracrypt -t -m ro <VOLUME_FILE> <MOUNT_DIR>

# Inventory files within the mounted volume
find <MOUNT_DIR> -maxdepth 3 -type f -print
file <MOUNT_DIR>/<TASK_FILE>
sha256sum <MOUNT_DIR>/<TASK_FILE>

# Unmount after collecting required evidence
veracrypt -t -u <MOUNT_DIR>
```

Option order and mount helpers are OS / version dependent; if syntax fails, consult `veracrypt -t --help`. Prefer the read-only mount option for examination. Do not pass volume passwords on the command line: arguments can be exposed in process listings or history.

### 3. Steganography and hidden-file triage

```bash
file <ARTIFACT_FILE>
sha256sum <ARTIFACT_FILE>
exiftool -a -u -g1 <ARTIFACT_FILE>
strings -n 6 <ARTIFACT_FILE> | head -n 100
binwalk <ARTIFACT_FILE>
binwalk -E <ARTIFACT_FILE>

# Steghide: inspect, then extract and allow an interactive passphrase prompt
steghide info <IMAGE_FILE>
steghide extract -sf <IMAGE_FILE>
```

Only enter a passphrase supplied or explicitly authorized by the lab. Treat extracted strings as leads and validate with `file`, metadata and a hash.

### 4. Shannon entropy per byte

```bash
python3 - "<FILE>" <<'PY'
import math
import sys
from collections import Counter

path = sys.argv[1]
with open(path, "rb") as handle:
    data = handle.read()

if not data:
    print("empty file; entropy undefined")
    raise SystemExit(0)

counts = Counter(data)
length = len(data)
entropy = -sum((count / length) * math.log2(count / length)
               for count in counts.values())
print(f"file={path}")
print(f"bytes={length}")
print(f"shannon_entropy_bits_per_byte={entropy:.6f} (maximum 8.0)")
PY
```

Entropy varies from 0 to 8 bits/byte for byte values. High entropy may indicate encryption, compression or random data; it does **not** prove encryption by itself. Compare like-sized regions and file types where possible.

## Interpretation and output analysis

- **MD5 / SHA-256:** compare the exact digest and exact artifact. MD5 is useful for legacy identification / duplicate checks but is not collision-resistant for security-critical integrity; prefer SHA-256 where available.
- **Manifest result:** `OK` means that file's calculated digest matches the manifest entry; `FAILED` indicates mismatch or unreadable/missing file.
- **VeraCrypt:** a successful mount exposes a filesystem at the mount point. The task answer is usually in an indicated path / filename or a value inside a file, not in the container's filename.
- **Steghide:** successful extraction reports the embedded file name or creates the payload in the working directory. Confirm the output path and inspect the extracted file type.
- **Entropy:** use as a triage signal, not a verdict. Compressed images / archives can also have high entropy. Plain text often trends lower but content matters.
- **Metadata:** timestamps and software / camera fields can be altered. Treat them as evidence, not guaranteed provenance.

## Wireshark / regex / CLI parsing

| Need | Expression |
|---|---|
| Find likely flag-like strings in lab output | `grep -RniE 'flag\{|proof|token|secret' <LAB_OUTPUT_DIR>` |
| Find hash-shaped strings (hex, broad heuristic) | `grep -Eio '\b[a-fA-F0-9]{32}\b|\b[a-fA-F0-9]{64}\b' <TEXT_FILE>` |
| Inspect likely artifacts by signature | `file <ARTIFACT_FILE> && xxd -l 64 <ARTIFACT_FILE>` |
| List detected embedded signatures | `binwalk <ARTIFACT_FILE>` |
| Extract metadata in machine-readable form | `exiftool -json <ARTIFACT_FILE>` |

Regex only detects string shape. A 32-character hex string is not guaranteed MD5; a 64-character string is not guaranteed SHA-256.

## Edge cases and troubleshooting

| Symptom | Fallback |
|---|---|
| Hash differs | Confirm path, byte-for-byte copy, algorithm and manifest format. |
| `sha256sum -c` reports “FAILED” | Recompute one file and verify it is the expected original artifact. |
| Volume does not mount | Confirm it is a VeraCrypt volume and inspect tool help; incorrect password / keyfile / PIM may be the cause. |
| Mount permission issue | Verify mount directory and lab privileges; don't alter system-wide settings unnecessarily. |
| Steghide fails | Check supported file format, exact supplied passphrase and whether the file contains a compatible payload. |
| Binwalk reports offsets but extraction fails | Inspect format and offset; signature detections can be false positives or truncated content. |
| High entropy | Compare file type / compression and entropy of relevant regions before concluding encryption. |
| Empty metadata | Metadata may be stripped; inspect file headers and embedded content instead. |

## References

- [VeraCrypt command-line usage (Unix)](https://veracrypt.io/en/Command%20Line%20Usage%20for%20Unix.html)
- [ExifTool documentation](https://exiftool.org/exiftool_pod2.html)
