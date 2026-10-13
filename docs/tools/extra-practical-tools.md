# Additional CEH Practical Tools — Hashid, Medusa, DiE, Stegdetect, VeraCrypt, tcpflow, SQLite3 and Androguard

This reference fills common gaps that may appear in a CEH tool inventory. Tool availability and CLI options vary across lab images; start with the installed version's help. Use only course-provided hashes, captures, APKs and isolated test services.

## 1. Hashid — identify an unknown hash format

Check tool and options:
```bash
hashid --version
hashid --help
```

Analyze a course-provided sample:
```bash
hashid '<LAB_SAMPLE_HASH>'
hashid -m -j '<LAB_SAMPLE_HASH>'
hashid -e '<LAB_SAMPLE_HASH>'
hashid -m -j -o hashid-report.txt '<LAB_SAMPLE_HASH>'
```
- `-m`: show possible Hashcat mode.
- `-j`: show possible John the Ripper format.
- `-e`: include extended candidates.
- `-o`: save report.
Hash identification uses patterns and can return multiple possibilities. Verify against the application's hash format/salt structure before selecting a cracking format. A hash is not decrypted by Hashid.

## 2. Medusa — tightly bounded test-account authentication audit

Medusa sends login attempts to a live service. Use only if the assigned lab explicitly requires an online password audit, and only with one lab-provided test account, a small course wordlist and a stop condition. For offline hash tests, prefer [John/Hashcat](system-and-password-audit.md).

```bash
medusa -h
medusa -d
```
A constrained SSH lab example:
```bash
medusa -h <LAB_IP> -u <LAB_TEST_USER> -P <SMALL_LAB_WORDLIST> -M ssh -t 1 -f
```
- `-h`: one assigned host.
- `-u`: one authorized test username.
- `-P`: small list supplied by the course.
- `-M`: service module (confirm supported module with installed help).
- `-t 1`: keep concurrency low.
- `-f`: stop after a valid login result, where supported by the version.
Do not scale to multiple hosts/users, spray credentials, use leaked lists or target a service not named in the task. Stop if rate limits/lockout warnings appear. Record account lockout/rate limit controls as the security lesson, never the recovered secret in public notes.

## 3. Detect It Easy (DiE) / diec — file type and packer clues

```bash
diec --help
diec --version
diec <LAB_FILE>
diec --deepscan <LAB_FILE>
diec --heuristicscan <LAB_FILE>
```
Supported option spellings differ by release; check `diec --help`. `die` launches the graphical interface where available. Work on a copy of the supplied artifact inside an isolated analysis VM. Results can identify file formats, compiler/packer or signatures; they do not by themselves prove that a file is malicious.

## 4. Stegdetect — indicators of hidden content

Tool implementations differ, including legacy image steganalysis tools and newer scripts. Begin with:
```bash
stegdetect --help
stegdetect --version
stegdetect <LAB_IMAGE>
```
If the installed implementation explicitly supports a deeper mode, use its own documented option on the supplied sample only. For the newer script-based implementation, options such as `--deep` and `--output <DIR>` may be available; do not assume those flags work with every legacy build.

A positive result is a clue, not proof. Compare file type, size, metadata, headers and the course's expected carrier format. Don't run or open extracted files until their type/hash have been recorded in the isolated lab.

## 5. VeraCrypt — encrypted-volume inspection

VeraCrypt is often GUI-first; use a disposable test volume or an instructor-supplied volume. Never try to access another person's encrypted data or place passwords on the command line.

Linux/macOS:
```bash
veracrypt -t --help
veracrypt --version
veracrypt -t --list
veracrypt -t --test
```
- `-t`: text UI.
- `--list`: list currently mounted volumes.
- `--test`: test internal algorithms.
Check your build's help before using other options. For a lab-created test volume, use the GUI to verify mount/unmount behavior and encryption settings; use the official version-specific CLI guide for the assigned exercise. Avoid passing passwords as command-line arguments because they can appear in process listings/history.

## 6. tcpflow — reconstruct TCP streams from a lab capture

```bash
tcpflow -h
tcpflow -V
tcpflow -r <LAB_CAPTURE> -o tcpflow-output
```
- `-r`: read packets from a pcap file.
- `-o`: place reconstructed stream files in a dedicated output folder.
Run offline against a course pcap, not by sniffing a shared interface unless instructed. Reconstructed streams may contain credentials, session cookies or personal data—keep the output private and redact before sharing. TLS payload usually remains encrypted; tcpflow cannot magically decrypt it.

## 7. SQLite3 — inspect a supplied mobile-app database

```bash
sqlite3 --version
sqlite3 <LAB_DATABASE>
```
At the interactive prompt:
```text
.tables
.schema
.headers on
.mode column
SELECT name FROM sqlite_master WHERE type='table';
.quit
```
Inspect only the course-provided database. Query the specific table/fields named by the task; do not dump an entire real user's data. On an Android emulator, first confirm the lab guide has provided the database file or authorized access path. App-private databases generally require approved test-device/debugging context.

## 8. Androguard — APK metadata and static analysis

```bash
androguard --version
androguard --help
androguard apkid <LAB_APK>
androguard axml <LAB_APK>
androguard analyze <LAB_APK>
```
Androguard's subcommands have changed across releases. Confirm the installed `androguard --help`; if a subcommand does not exist, use its equivalent in the installed documentation rather than guessing. APK metadata/manifest parsing is static analysis. Don't automatically run or install the APK, and don't use dynamic trace commands against a personal device.

## Evidence template for these tools
```text
Tool / version:
Lab artifact or target:
Command / UI path:
Input hash (if file):
Key output:
What it supports:
Alternative explanation / limit:
Sensitive material redacted:
Defensive recommendation:
```

## Primary documentation
- [Hashid on Kali](https://www.kali.org/tools/hashid/)
- [Androguard CLI docs](https://androguard.readthedocs.io/en/latest/tools/androguard.html)
- [Detect It Easy project](https://github.com/horsicq/Detect-It-Easy)
- [VeraCrypt command-line usage](https://veracrypt.io/en/Command%20Line%20Usage%20for%20Unix.html)
- [tcpflow project](https://github.com/simsong/tcpflow)
