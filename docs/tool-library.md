> **Searchable website edition:** each linked guide is included as its own page in this site. Search by tool name, command, protocol, output field or objective.

# CEH v13 Practical Tool Library

This library covers the common CLI and GUI tool families associated with the 20-module CEH v13 curriculum. It is **not a claim that every tool in every EC-Council lab image is listed**. The lab ecosystem is large, and exact tools, versions and menus depend on your course/lab image. Check the inventory and instructions in your assigned lab.

> **Scope rule:** Replace placeholders only with targets, URLs, interfaces, test accounts and files provided by your authorized CEH Cyber Range or isolated lab. Follow any lab-specific rate limits, credentials and cleanup steps.

## Network reconnaissance and host discovery
- [Nmap: basic through advanced scans, port states, output formats and NSE](tools/nmap.md)
- [Recon and DNS: WHOIS, dig, host, nslookup and curl](tools/recon-dns.md)
- [OSINT and metadata: theHarvester, ExifTool, Shodan, Recon-ng, Maltego, FOCA/Metagoofil](tools/recon-osint.md)
- [Local host discovery: arp-scan and Netdiscover](tools/host-discovery.md)
- [hping3 packet-level diagnostics](tools/hping3.md)
- [Netcat/Ncat socket diagnostics](tools/netcat-ncat.md)
- [General Linux/Windows CLI utilities](tools/cli-utilities.md)

## Enumeration and network protocols
- [Service enumeration: SMB, NetBIOS, SNMP, LDAP and RPC](tools/network-enumeration.md)
- [Protocol enumeration: DNS enum, NTP, SMTP, NFS, RPC and IKE/IPsec](tools/protocol-enumeration.md)

## Web server and application testing
- [curl, WhatWeb, Nikto, Gobuster, ffuf and testssl.sh](tools/web-cli-tools.md)
- [DIRB, Dirsearch, WPScan, Wfuzz and Wappalyzer](tools/web-content-discovery.md)
- [Burp Suite and OWASP ZAP](tools/burp-zap.md)
- [SQLmap: controlled SQL injection validation](tools/sqlmap.md)
- [GUI web scanners: Acunetix and IBM AppScan](tools/gui-web-scanners.md)

## Vulnerability research and frameworks
- [Nessus and Greenbone/OpenVAS workflow](tools/vulnerability-scanners.md)
- [Nuclei template scanner](tools/nuclei.md)
- [SearchSploit exploit-reference search](tools/searchsploit.md)
- [Metasploit Framework: console, modules and validation](tools/metasploit.md)
- [Msfvenom: safe orientation and lab handling](tools/msfvenom-reference.md)

## Packet analysis, firewall and wireless
- [Wireshark, tcpdump and tshark](tools/packet-analysis.md)
- [Bettercap: safe lab host discovery and traffic visibility](tools/bettercap.md)
- [Firewall/IDS/IPS: Snort, Suricata, UFW, nftables and iptables](tools/firewall-ids.md)
- [Wireless tools: iw, airodump-ng and supplied-capture analysis](tools/wireless-tools.md)

## System, password, malware and social engineering
- [Linux/Windows system inspection, hashes and offline audit basics](tools/system-and-password-audit.md)
- [Credential auditing: Hydra in tightly scoped labs, John and Hashcat offline](tools/credential-auditing.md)
- [Additional utilities: Hashid, Medusa, DiE, Stegdetect, VeraCrypt, tcpflow, SQLite3, Androguard](tools/extra-practical-tools.md)
- [Malware triage: YARA, Sysinternals, PEStudio and safe sandboxing](tools/malware-analysis.md)
- [Steganography/steganalysis: ExifTool, Steghide, strings and Binwalk](tools/steganography.md)
- [Social Engineering Toolkit: consent-based awareness simulation](tools/social-engineering-tools.md)
- [Log analysis: journalctl, grep and Get-WinEvent](tools/log-analysis.md)

## Mobile, IoT, cloud and cryptography
- [Android: ADB, apkanalyzer, APKTool, JADX and MobSF](tools/mobile-tools.md)
- [Cloud CLI, AWS, Docker, Grype, Trivy and read-only Kubernetes checks](tools/cloud-and-grype.md)
- [OpenSSL, TLS certificates, hashes and crypto checks](tools/crypto-openssl.md)

## Scenario recipes
- [Objective-based practical command recipes](tools/practical-command-recipes.md)
- [Module-to-tool matrix](TOOLS-MODULE-MATRIX.md)

## How to use each guide
1. **Beginner:** check version/help, verify target/account/interface, run one basic command and interpret all fields.
2. **Intermediate:** narrow host/port/path, save output, compare a baseline and cross-check with a second source.
3. **Advanced:** choose only task-relevant options, understand side effects, validate applicability, preserve evidence and document remediation/re-test.

"Advanced" does not mean adding stealth, persistence, credential theft or uncontrolled traffic. Some topics are GUI-first; their guides describe the workflow instead of inventing CLI flags.

## Placeholder dictionary
- `<LAB_IP>`: target IP explicitly assigned by the lab.
- `<LAB_SUBNET>`: exact in-scope subnet/CIDR.
- `<LAB_DOMAIN>`: authorized hostname/domain.
- `<LAB_URL>`: authorized application URL.
- `<INTERFACE>`: verified lab interface.
- `<LAB_FILE>`: supplied file, packet capture, APK or firmware.
- `<LAB_USER>`: lab-provided test identity.
- `<LAB_WORDLIST>`: small, course-supplied wordlist.

Placeholders are explanatory. Replace them before execution. Commands and flags can vary across OS/tool versions; check the installed help/man page.

## Authoritative / primary references
- [EC-Council CEH v13 course outline](https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/)
- [Official CEH v13 Labs](https://ec-council-international.myshopify.com/products/certified-ethical-hacker-ceh-version-13-labs)
- [Nmap Reference Guide](https://nmap.org/book/man.html)
- [Wireshark documentation](https://www.wireshark.org/docs/)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [OWASP ZAP documentation](https://www.zaproxy.org/docs/)
- [Metasploit documentation](https://docs.metasploit.com/)
- [Android Debug Bridge](https://developer.android.com/tools/adb)
