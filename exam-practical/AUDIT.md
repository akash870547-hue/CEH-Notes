# Documentation Audit and Verification Notes

## Scope audited

The existing repository already has module-wise CEH notes and a tool reference library. The gap addressed here is a compact, cross-domain field manual for the requested artifacts: network identity / service discovery, PCAP interpretation, web / database checks, crypto / stego / entropy, and host / mobile artifacts.

## Restructure delivered

| File | Scope | Template sections |
|---|---|---|
| [01-Recon-Scanning.md](01-Recon-Scanning.md) | Subnet / port scanning, NetBIOS, SMB signing, SMTP and MSSQL | Scenario, syntax, interpretation, filters/parsing, edge cases |
| [02-Network-Traffic-Analysis.md](02-Network-Traffic-Analysis.md) | Credentials in authorized captures, DoS indicators, RPC, MQTT, exports | Scenario, syntax, interpretation, filters/parsing, edge cases |
| [03-Web-Database.md](03-Web-Database.md) | SQLmap hierarchy, WASC identifiers, HTTP security headers | Scenario, syntax, interpretation, filters/parsing, edge cases |
| [04-Crypto-Stego-Forensics.md](04-Crypto-Stego-Forensics.md) | Batch MD5/SHA-256, VeraCrypt, Steghide, entropy, file triage | Scenario, syntax, interpretation, filters/parsing, edge cases |
| [05-Mobile-System-Artifacts.md](05-Mobile-System-Artifacts.md) | ADB, logcat, lab contacts, Procmon PML/CSV, APK CRC32 | Scenario, syntax, interpretation, filters/parsing, edge cases |

## Accuracy controls

- Commands use placeholders such as `<TARGET_IP>` and `<PCAP_FILE>`; they must be replaced with exact challenge values before execution.
- Nmap states / versions and OS detection are interpreted separately; OS guesses and banners are not conclusive proof of vulnerability.
- PCAP indicators are hypotheses that require timing, packet counts and context. Encrypted payloads should not be described as plaintext.
- WASC identifiers reference the WASC Threat Classification Reference Grid; IDs are categories, not severity scores.
- HSTS is evaluated on HTTPS responses; a missing header on an HTTP-only response does not by itself prove that HSTS is absent for the site.
- VeraCrypt examples mount volumes read-only and avoid passwords in command-line arguments.
- Contacts queries are restricted to a designated synthetic lab device. Process Monitor PML files should be opened/exported using Procmon rather than parsed as plain text.
- APK CRC32 is per ZIP entry and is not a cryptographic integrity/authenticity check. SHA-256 is included for whole-file identity checks.
- Tool options and decoded fields differ by OS / version. The installed tool's help and official documentation take precedence.

## Known verification limits

- The commands have not been executed inside the user's CEH iLabs image.
- A link / syntax review cannot guarantee that a specific utility is installed in an exam image.
- The public CEH Practical outline describes a six-hour exam with 20 practical challenges. CEH Engage is also described by EC-Council as a distinct four-phase mock engagement; do not assume its phases and the practical exam use identical task layouts.
- No notes can guarantee 100% score or predict exact live tasks / flag names.

## Authoritative references

- [CEH Practical exam details](https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh-practical/)
- [CEH program and Engage overview](https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/)
- [Nmap scripting reference](https://nmap.org/nsedoc/scripts/)
- [Wireshark filter reference](https://www.wireshark.org/docs/man-pages/wireshark-filter.html)
- [WASC Threat Classification Reference Grid](https://projects.webappsec.org/w/page/13246974/Threat%20Classification%20Reference%20Grid)
- [OWASP HTTP Headers Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)
- [VeraCrypt Unix command line](https://veracrypt.io/en/Command%20Line%20Usage%20for%20Unix.html)
- [Android Debug Bridge](https://developer.android.com/tools/adb)
- [Microsoft Process Monitor](https://learn.microsoft.com/en-us/sysinternals/downloads/procmon)
