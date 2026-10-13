# CEH v13 Practical Tool Matrix — Module → Tool → Command Guide

This matrix is a revision aid for the tools currently covered in this repository. **It is not an official exhaustive list of every tool bundled into every EC-Council lab image.** EC-Council describes a broad toolset and lab-specific virtualized environments; your current lab's installed-tool inventory and task instructions take precedence.

## How to read this matrix
- **CLI commands** are examples, not guaranteed exam answers. Replace placeholders with the values given by your lab.
- **GUI workflow** means the tool is mainly operated through its application interface.
- **Read-only / low-impact** means the examples aim to inspect or validate, not that every query is invisible or risk-free.
- For active scanners, credential tools, wireless tests and exploitation frameworks, stay on an explicitly authorized, isolated target and follow the lab's own rate, scope and cleanup rules.

| Module | Tool coverage in this repository | Best starting guide |
|---|---|---|
| 01 Introduction to Ethical Hacking | CLI basics, scope, evidence handling, CIA/risk, RoE | [CLI utilities](tools/cli-utilities.md) · [Exam workflow](EXAM-WORKFLOW.md) |
| 02 Footprinting & Reconnaissance | WHOIS/RDAP, dig/host/nslookup, curl, theHarvester, ExifTool, Shodan, Recon-ng, Maltego, FOCA/Metagoofil awareness, search operators | [Recon/DNS](tools/recon-dns.md) · [OSINT](tools/recon-osint.md) |
| 03 Scanning Networks | Nmap, arp-scan, Netdiscover, ping, traceroute/tracepath, hping3, ss/netstat | [Nmap](tools/nmap.md) · [Host discovery](tools/host-discovery.md) · [hping3](tools/hping3.md) |
| 04 Enumeration | SMB/smbclient, enum4linux-ng, NetBIOS/nbtscan, SNMP, LDAP, RPC, DNS enum, NTP, SMTP, NFS, BGP, IKE/IPsec concepts | [Service enumeration](tools/network-enumeration.md) · [Protocol enumeration](tools/protocol-enumeration.md) |
| 05 Vulnerability Analysis | Nessus, Greenbone/OpenVAS, Nuclei, Nmap NSE, SearchSploit, CVE/CVSS and evidence validation | [Vulnerability scanners](tools/vulnerability-scanners.md) · [Nuclei](tools/nuclei.md) · [SearchSploit](tools/searchsploit.md) |
| 06 System Hacking | Linux/Windows identity and permissions, John/Hashcat/Hydra awareness, logs, steganography, safe payload-tool orientation | [System & password audit](tools/system-and-password-audit.md) · [Credential audit](tools/credential-auditing.md) · [Hashid and additional audit tools](tools/extra-practical-tools.md) · [Steganography](tools/steganography.md) · [Msfvenom reference](tools/msfvenom-reference.md) |
| 07 Malware Threats | file, SHA-256, strings, ExifTool, YARA, Sysinternals Process Explorer/Procmon/Autoruns, PEStudio and safe sandbox principles | [Malware analysis](tools/malware-analysis.md) · [DiE/Stegdetect/Steganography](tools/extra-practical-tools.md) |
| 08 Sniffing | Wireshark, tcpdump, tshark, ARP/DNS/TCP/TLS and pcap analysis | [Packet analysis](tools/packet-analysis.md) · [tcpflow](tools/extra-practical-tools.md) |
| 09 Social Engineering | SET tool orientation, email header inspection, SPF/DKIM/DMARC, benign consent-based awareness simulations | [Social engineering tools](tools/social-engineering-tools.md) |
| 10 Denial-of-Service | hping3 low-count diagnostics, pcap analysis, resource counters, logs and defensive response; no flood commands | [hping3](tools/hping3.md) · [Packet analysis](tools/packet-analysis.md) · [Log analysis](tools/log-analysis.md) |
| 11 Session Hijacking | Browser DevTools, Burp Suite, ZAP, curl, cookie/session lifecycle | [Burp/ZAP](tools/burp-zap.md) · [Web CLI tools](tools/web-cli-tools.md) |
| 12 IDS, Firewalls & Honeypots | Snort, Suricata, UFW, nftables, iptables, firewall logs, benign rule/capture validation | [Firewall & IDS](tools/firewall-ids.md) |
| 13 Hacking Web Servers | curl, WhatWeb, Nikto, testssl.sh, OpenSSL, directory-discovery tools, server logs | [Web CLI tools](tools/web-cli-tools.md) · [Web content discovery](tools/web-content-discovery.md) |
| 14 Hacking Web Applications | Burp/ZAP, browser Network panel, curl, DIRB/Dirsearch/Wfuzz, WPScan, request comparison | [Burp/ZAP](tools/burp-zap.md) · [Web content discovery](tools/web-content-discovery.md) |
| 15 SQL Injection | SQLmap, request capture, response/timing/error interpretation, parameterized-query remediation | [sqlmap](tools/sqlmap.md) |
| 16 Wireless Networks | iw, nmcli, Aircrack-ng tool orientation, supplied wireless captures, Wireshark | [Wireless tools](tools/wireless-tools.md) |
| 17 Mobile Platforms | ADB, apkanalyzer, JADX, MobSF; emulator and APK checks | [Mobile tools](tools/mobile-tools.md) · [SQLite3/Androguard](tools/extra-practical-tools.md) |
| 18 IoT and OT Hacking | Nmap, MQTT/CoAP pcap filters, file/strings/Binwalk firmware triage | [IoT/OT module](modules/18-iot-hacking.md) · [Nmap](tools/nmap.md) |
| 19 Cloud Computing | AWS CLI identity and read-only inventory, IAM/storage/network review, Docker, Grype | [Cloud & Grype](tools/cloud-and-grype.md) |
| 20 Cryptography | sha256sum, OpenSSL, certificate/TLS checks, Base64 encoding, PKI/key-management concepts | [OpenSSL/crypto](tools/crypto-openssl.md) · [VeraCrypt](tools/extra-practical-tools.md) |

## Tool proficiency ladder

### Beginner — identify and observe
Check tool version/help, verify target/interface/account, run a narrow read-only command, and learn the meaning of each output field.

### Intermediate — filter and corroborate
Select a specific host/port/path, save output, compare against a baseline, add timestamps and cross-check with a second tool or log.

### Advanced — validate in context
Understand options and side effects, validate scanner findings against exact version/configuration and preconditions, keep tests reproducible, and document remediation/re-test. "Advanced" does not mean adding stealth, persistence, credential theft or uncontrolled traffic.

## Universal practical placeholders
- `<LAB_IP>`: target IP explicitly assigned by the lab.
- `<LAB_SUBNET>`: exact in-scope subnet/CIDR.
- `<LAB_DOMAIN>`: authorized hostname/domain.
- `<LAB_URL>`: authorized application URL.
- `<INTERFACE>`: confirmed lab interface.
- `<LAB_FILE>`: supplied file/pcap/APK/firmware.
- `<LAB_USER>`: lab-provided test identity.
- `<LAB_WORDLIST>`: small, course-supplied wordlist.

## Final rule
Use the **current lab guide, scope, target values and installed versions** as the source of truth. A public write-up or this matrix cannot guarantee that a particular binary, flag, target address or challenge answer exists in your lab.
