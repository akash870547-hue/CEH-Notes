# Steganography & Steganalysis — ExifTool, Steghide, Strings, Binwalk

Steganography hides data within a carrier file; steganalysis looks for clues that hidden data may exist. Use course-supplied images/audio/files in an isolated analysis folder. Treat extracted content as untrusted; never execute it.

## 1. Establish artifact identity
```bash
file <LAB_FILE>
sha256sum <LAB_FILE>
stat <LAB_FILE>
exiftool <LAB_FILE>
strings -n 6 <LAB_FILE> | head -n 80
xxd -l 256 <LAB_FILE>
```
Hash first and work on a copy. File extension alone doesn't prove actual format.

## 2. Check steghide capability and metadata
```bash
steghide --version
steghide --help
steghide info <LAB_STEG_FILE>
```
Steghide supports selected formats only (commonly JPEG/BMP and some audio formats). An info result may ask for a passphrase; use only a passphrase provided by the lab. No positive result doesn't rule out other steganography schemes.

## 3. Extract only a lab-authorized payload
```bash
mkdir -p analysis-output
cd analysis-output
steghide extract -sf <LAB_STEG_FILE> -xf extracted.bin
file extracted.bin
sha256sum extracted.bin
strings -n 6 extracted.bin | head -n 80
```
Run in a disposable VM and use only the designated lab artifact. Extracted file names may be untrusted; direct output to a fresh folder and inspect before opening. Do not run scripts/macros or unknown binaries.

## 4. Firmware/archive clues
```bash
binwalk <LAB_FILE>
```
Use extraction features only when the task requires them and the input is trusted for analysis; malformed files may trigger parser bugs. For firmware, prefer an isolated VM with updated tooling.

## 5. Steganalysis reasoning
Possible clues: unusual metadata, extra trailing data, mismatched file signature/extension, unexpected file size, high entropy or strings that do not fit the carrier. These indicators are not proof: compression, encryption and legitimate metadata can create similar patterns.

## 6. Practical workflow
1. Verify target file/path and compute hash.
2. Record true file type and metadata.
3. Inspect strings/header/trailing-data clues.
4. Try only the format-appropriate tool included in the lab instructions.
5. If a hidden artifact is recovered, hash and inspect it as data; do not execute it.
6. Document method, result, limitation and safe handling.

## 7. Troubleshooting
- Steghide says unsupported format: check file type and supported carrier formats.
- Extraction fails: wrong tool family, corrupted sample or incorrect lab passphrase may explain it.
- Empty strings: compressed/encrypted/binary payloads may not contain visible text.
- Large binwalk output: start with metadata listing and follow the specific objective.
- A suspicious string alone is not proof of hidden data or malware.

References: [Steghide manual](https://steghide.sourceforge.net/documentation/manual.pdf) · [ExifTool](https://exiftool.org/) · [Binwalk](https://github.com/ReFirmLabs/binwalk)
