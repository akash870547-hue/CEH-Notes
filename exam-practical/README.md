# CEH Practical / CEHv13 Engage Field Manual

Fast lookup for the **authorized CEH iLabs / Engage practice environment**. These are skill-based runbooks, not leaked questions or a guarantee that exact challenge wording / flags will appear. The displayed objective, lab instructions and scope are the source of truth.

## Consolidated modules

| Module | Quick scope | File |
|---|---|---|
| 01 | Recon, subnet sweeps, NetBIOS, SMB signing, SMTP/MSSQL | [01 - Reconnaissance and Scanning](01-Recon-Scanning.md) |
| 02 | PCAP, credentials, DoS indicators, RPC, MQTT, object export | [02 - Network Traffic Analysis](02-Network-Traffic-Analysis.md) |
| 03 | SQLmap, WASC classification, HTTP security headers | [03 - Web and Database](03-Web-Database.md) |
| 04 | Batch hashes, VeraCrypt, Steghide, entropy, file triage | [04 - Crypto, Stego and Forensics](04-Crypto-Stego-Forensics.md) |
| 05 | ADB, logcat, contacts provider, Procmon PML/CSV, APK CRC32 | [05 - Mobile and System Artifacts](05-Mobile-System-Artifacts.md) |
| Audit | Structure, validation and limitations | [Audit and Validation](AUDIT.md) |

## Existing scenario runbooks

The more granular scenario guides from the existing notes are useful for targeted revision. Use the consolidated modules above as the top-level field manual and retain existing module/tool references where relevant.

## Placeholder convention

Replace values such as `<TARGET_IP>`, `<TARGET_CIDR>`, `<TARGET_URL>`, `<PORTS>`, `<PCAP_FILE>`, `<SERIAL>`, `<PML_FILE>` and `<APK_FILE>` with exact values from the assigned task. Confirm that the tool and option exist in the installed image before use.

## Fast solve loop

1. Read the task and identify the exact deliverable: IP, port, domain, CVE, WASC ID, packet field, topic, row, hash, path, version or flag.
2. Confirm the supplied target / artifact and permitted scope.
3. Run the smallest applicable command first.
4. Read the relevant output field and corroborate it where ambiguity exists.
5. Record the command, frame / row / path and exact value; submit only what the challenge asks for.

## Range safety and accuracy

- Active scanning applies only to assigned lab targets. Do not extend a target range based on guesswork.
- PCAP guides assume supplied / authorized capture files. Do not collect traffic from networks you do not administer.
- ADB contacts queries are for the designated synthetic lab device only.
- PML / APK / container findings are triage clues until correlated with the right process, entry, timestamp or file.
- Never assume a universal flag wrapper such as `flag{...}`. Copy the exact value shown by the task.
- Commands have not been executed inside your CEH iLabs image. Tool options and output fields vary by installed version.

## Official references

- [CEH Practical exam details](https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh-practical/)
- [CEH program and Engage overview](https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/)
