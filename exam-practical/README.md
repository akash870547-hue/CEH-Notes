# CEH Practical Field Manual

Fast-lookup practice notes for an authorized CEH iLabs environment. This is not an official list of live exam questions. Follow the displayed challenge objective, scope and rules.

## Quick links

- [Six-hour strategy](strategy.md)
- [Paths and preflight](path-reference.md)
- [Quick command reference](quick-reference.md)
- [Scenario map](scenario-map.md)

## Scenario runbooks

| # | Topic | Guide |
|---:|---|---|
| 01 | Host and subnet discovery | [Host discovery](scenarios/01-host-discovery.md) |
| 02 | Service, banner and OS detection | [Service detection](scenarios/02-service-detection.md) |
| 03 | Nessus / OpenVAS triage | [Vulnerability scanning](scenarios/03-vulnerability-scanning.md) |
| 04 | CVE and SearchSploit verification | [CVE verification](scenarios/04-cve-verification.md) |
| 05 | Linux local enumeration | [Linux checks](scenarios/05-linux-privesc.md) |
| 06 | Windows local enumeration | [Windows checks](scenarios/06-windows-privesc.md) |
| 07 | Bounded service authentication testing | [Service auth](scenarios/07-service-auth.md) |
| 08 | Hash identification and offline cracking | [Hash cracking](scenarios/08-hash-cracking.md) |
| 09 | Content discovery and WordPress | [Web content](scenarios/09-web-content.md) |
| 10 | SQL injection verification | [SQL injection](scenarios/10-sql-injection.md) |
| 11 | Burp, XSS and parameter checks | [Web app tests](scenarios/11-web-app-tests.md) |
| 12 | PCAP / Wireshark analysis | [PCAP analysis](scenarios/12-pcap-analysis.md) |
| 13 | ARP / LLMNR / Responder observation | [MITM observation](scenarios/13-mitm-observation.md) |
| 14 | Wireless capture review | [Wireless](scenarios/14-wireless-review.md) |
| 15 | Steganography and hidden data | [Steganography](scenarios/15-steganography.md) |
| 16 | Base64, ROT13, hex and hashes | [Crypto / encoding](scenarios/16-crypto-encoding.md) |
| 17 | SearchSploit / Metasploit validation | [Exploit validation](scenarios/17-exploit-validation.md) |
| 18 | Android APK inspection | [Mobile APK](scenarios/18-mobile-apk.md) |
| 19 | IoT / OT and firmware | [IoT / OT](scenarios/19-iot-ot.md) |
| 20 | Cloud, containers and Kubernetes | [Cloud basics](scenarios/20-cloud-basics.md) |

## Placeholder convention

Replace placeholders such as `<TARGET_IP>`, `<TARGET_CIDR>`, `<TARGET_URL>`, `<PORTS>`, `<USERNAME>`, `<WORDLIST>` and `<PCAP_FILE>` with values explicitly supplied by the lab. Verify installed tool versions and actual file paths.

Active scanning, authentication tests and exploit validation belong only on the assigned lab targets. Capture the exact requested answer from output; do not assume a universal flag format.
