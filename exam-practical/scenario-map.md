# Scenario Map

Use the task wording to select a runbook. These are practice archetypes, not a prediction of exact live questions.

| # | Trigger | First step | Guide |
|---:|---|---|---|
| 01 | Find live hosts / ports | Nmap discovery, then a narrow port scan | [01](scenarios/01-host-discovery.md) |
| 02 | Banner, version, OS | Targeted service detection | [02](scenarios/02-service-detection.md) |
| 03 | Nessus / OpenVAS result | Read evidence and validate version | [03](scenarios/03-vulnerability-scanning.md) |
| 04 | CVE / local exploit reference | Check affected versions and preconditions | [04](scenarios/04-cve-verification.md) |
| 05 | Linux sudo / SUID / capabilities | Local enumeration | [05](scenarios/05-linux-privesc.md) |
| 06 | Windows user / service / privilege | Local enumeration | [06](scenarios/06-windows-privesc.md) |
| 07 | FTP / SSH / RDP / SMB / HTTP login | One authorized lab account, low rate | [07](scenarios/07-service-auth.md) |
| 08 | Hash type / plaintext | Identify format, audit offline | [08](scenarios/08-hash-cracking.md) |
| 09 | Hidden web path / WordPress | Capture status, then content discovery | [09](scenarios/09-web-content.md) |
| 10 | SQLi / DB / table / column | Confirm parameter, narrow the query | [10](scenarios/10-sql-injection.md) |
| 11 | XSS / parameter / authorization | Compare one request change in Repeater | [11](scenarios/11-web-app-tests.md) |
| 12 | Credentials / PCAP / SYN / ARP | Display filters and packet fields | [12](scenarios/12-pcap-analysis.md) |
| 13 | ARP / LLMNR / Responder | Passive capture review first | [13](scenarios/13-mitm-observation.md) |
| 14 | SSID / BSSID / handshake | Analyze supplied wireless capture | [14](scenarios/14-wireless-review.md) |
| 15 | Hidden message / file | File type, metadata, then stego tool | [15](scenarios/15-steganography.md) |
| 16 | Base64 / ROT13 / hex / hash | Try encoding checks before encryption assumptions | [16](scenarios/16-crypto-encoding.md) |
| 17 | SearchSploit / Metasploit | Inspect module details and preconditions | [17](scenarios/17-exploit-validation.md) |
| 18 | APK / package / permissions | Static manifest and strings review | [18](scenarios/18-mobile-apk.md) |
| 19 | MQTT / CoAP / OT / firmware | Narrow inventory or supplied artifact review | [19](scenarios/19-iot-ot.md) |
| 20 | Cloud / container / Kubernetes | Verify active identity/context; read-only checks | [20](scenarios/20-cloud-basics.md) |

## Universal troubleshooting

- **Connection refused:** verify target, port and whether the service is listening.
- **Timeout / filtered:** check the assigned route, target and scope; narrow the probe set.
- **Command not found:** inspect installed tools and task-provided VM notes.
- **No result:** validate file path, parameter, account, hash format, or capture fields.
- **Long-running command:** stop safely, reduce scope / workers, and follow the lab's rules.

## Answer discipline

Copy the exact requested value from the relevant evidence. A port is not a CVE, a service version is not proof of exploitability, and a scanner warning is not automatically a confirmed vulnerability. Do not assume a `flag{...}` format unless the task displays it.
