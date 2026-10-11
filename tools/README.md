# CEH v13 Practical Tools — Core Command Library

This directory is a **core tool-by-tool reference from beginner to advanced usage**. It covers the recurring CLI/GUI workflows represented in these notes; it is not a claim that every tool ever mentioned across all CEH training editions is included. Always cross-check the tool inventory inside your current lab. Each guide gives syntax, key options, lab examples, output interpretation, troubleshooting, and a short practice task.

> **Scope rule:** Replace placeholders only with the IPs, domains, URLs, interfaces, test accounts and files provided by your authorized CEH Cyber Range or your own isolated lab. Do not run active tests against public/third-party systems without explicit written authorization. Run potentially disruptive or exploit-validation options only when the lab objective explicitly permits them.

## Tool guides

### Network discovery and enumeration
- [Nmap: host discovery, ports, versions, scripts, output](nmap.md)
- [Recon and DNS: whois, dig, host, nslookup, curl](recon-dns.md)
- [OSINT: theHarvester, ExifTool, Shodan, Recon-ng, Maltego and metadata](recon-osint.md)
- [Service enumeration: SMB, NetBIOS, SNMP, LDAP, RPC](network-enumeration.md)
- [Protocol enumeration: DNS enum, NTP, SMTP, NFS, RPC and IKE](protocol-enumeration.md)
- [General Linux / Windows CLI utilities](cli-utilities.md)
- [hping3 and network diagnostics](hping3.md)
- [Local host discovery: arp-scan and Netdiscover](host-discovery.md)
- [Netcat / Ncat and basic socket diagnostics](netcat-ncat.md)

### Web and application testing
- [curl, WhatWeb, Nikto, Gobuster, ffuf, testssl.sh](web-cli-tools.md)
- [Web content discovery: DIRB, Dirsearch, WPScan, Wfuzz, Wappalyzer](web-content-discovery.md)
- [Burp Suite and OWASP ZAP workflows](burp-zap.md)
- [sqlmap, from safe detection to controlled validation](sqlmap.md)
- [GUI web scanners: Acunetix / IBM AppScan workflow](gui-web-scanners.md)

### Vulnerability and exploitation frameworks
- [Nessus / Greenbone (OpenVAS) scanning workflow](vulnerability-scanners.md)
- [Nuclei template scanner](nuclei.md)
- [SearchSploit exploit-reference search](searchsploit.md)
- [Nuclei template scanner](nuclei.md)
- [SearchSploit exploit-reference search](searchsploit.md)
- [Metasploit Framework: console, modules, options and validation](metasploit.md)

### Traffic, wireless and system analysis
- [Wireshark, tcpdump and tshark](packet-analysis.md)
- [Wireless tools: iw, airodump-ng and capture review](wireless-tools.md)
- [Linux / Windows system inspection, hashes and offline password-audit basics](system-and-password-audit.md)
- [Credential auditing: Hydra plus offline John/Hashcat workflows](credential-auditing.md)
- [Steganography/steganalysis: ExifTool, Steghide, strings and Binwalk](steganography.md)
- [Malware triage: YARA, Sysinternals, PEStudio and sandboxing](malware-analysis.md)
- [Social Engineering Toolkit: consent-based awareness](social-engineering-tools.md)
- [Msfvenom tool orientation and safe lab handling](msfvenom-reference.md)
- [Firewall, IDS and IPS: Snort, Suricata, UFW, nftables](firewall-ids.md)
- [Steganography/steganalysis: ExifTool, Steghide, strings and Binwalk](steganography.md)
- [Bettercap: safe lab reconnaissance and traffic visibility](bettercap.md)

### Mobile, cloud, containers and cryptography
- [Android: ADB, JADX, apkanalyzer and MobSF](mobile-tools.md)
- [Cloud CLI and container image scanning with Grype](cloud-and-grype.md)
- [OpenSSL, certificates, hashes and crypto checks](crypto-openssl.md)
- [Log analysis: journalctl, grep, Get-WinEvent](log-analysis.md)
- [Objective-based practical command recipes](practical-command-recipes.md)

## How to learn each tool
1. Read the **purpose and prerequisites**.
2. Run the basic environment/version check first.
3. Copy the basic command with the right lab placeholder.
4. Read the output explanation, then move to intermediate/advanced options.
5. Save evidence and verify the result instead of guessing.

## Command conventions
- `<LAB_IP>`: exact lab target IP.
- `<LAB_SUBNET>`: assigned lab subnet in CIDR notation.
- `<LAB_DOMAIN>`: assigned lab hostname/domain.
- `<LAB_URL>`: fully qualified app URL.
- `<INTERFACE>`: lab interface such as `eth0` (verify with `ip addr`).
- `<LAB_FILE>`: course-provided sample/capture.
- `<LAB_USER>`: designated lab account.

Angle-bracket placeholders are explanatory; replace them before executing commands. Commands may vary by OS and software version.

## Official references
- [CEH v13 course outline](https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/)
- [Official CEH v13 Labs](https://ec-council-international.myshopify.com/products/certified-ethical-hacker-ceh-version-13-labs)
- [Nmap reference guide](https://nmap.org/book/man.html)
- [Wireshark User's Guide](https://www.wireshark.org/docs/wsug_html_chunked/)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [OWASP ZAP documentation](https://www.zaproxy.org/docs/)
- [Metasploit documentation](https://docs.metasploit.com/)
