# 15 - Steganography and Hidden Files

## Trigger
Find a hidden message or file in an image, audio sample, binary or text artifact.

## Triage first
```bash
file <ARTIFACT_FILE>
sha256sum <ARTIFACT_FILE>
exiftool <ARTIFACT_FILE>
strings -n 6 <ARTIFACT_FILE> | head -n 100
binwalk <ARTIFACT_FILE>
binwalk -e <ARTIFACT_FILE>
```

## Steghide
```bash
steghide info <IMAGE_FILE>
steghide extract -sf <IMAGE_FILE>
steghide extract -sf <IMAGE_FILE> -p '<LAB_PASSPHRASE>'
```

The no-passphrase form may prompt interactively. Use only a passphrase supplied by the challenge or allowed by the task.

## OpenStego / QuickStego / SNOW
- OpenStego: check `openstego --help` for local extract syntax and use a supplied key only if the task gives one.
- QuickStego is GUI-based on many images; open the supplied file and inspect extracted text.
- SNOW whitespace stego: check `snow -h` / `snow --help`; versions use different hide/extract and passphrase switches. Extract only the supplied lab file.

## Answer path
Inspect the extraction output file or stdout. Use `file`, `strings`, and `sha256sum` on recovered artifacts; copy the exact task answer.

## Troubleshooting
- Unsupported file: verify format and whether the challenge names a specific utility.
- Wrong passphrase: check capitalization and the exact supplied string.
- Binwalk extraction fails: inspect offsets and output before assuming the file is damaged.
