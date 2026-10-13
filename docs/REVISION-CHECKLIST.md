# CEH v13 Practical — Last-Day Revision Checklist

Use this as a quick confidence check, not as a substitute for practicing the exact tools installed in your lab VM. Tick only what you can explain or demonstrate.

## Universal lab workflow
- [ ] Identify exact objective, output format, authorized target and stop condition.
- [ ] Verify current IP/interface/route/DNS; don't rely on remembered lab IPs.
- [ ] Read full tool output and validate before submitting a result.
- [ ] Save sanitized evidence with timestamp, tool version and a limitation.
- [ ] Distinguish the five ethical-hacking stages from the CEH Learn/Certify/Engage/Compete learning framework.

## Module-by-module memory jog

### Modules 01–05: Foundations and assessment
- [ ] **01 Ethical Hacking:** CIA triad, authorization/scope, RoE, hacker classes, risk, Cyber Kill Chain vs MITRE ATT&CK, incident/evidence handling.
- [ ] **02 Recon:** passive vs active, DNS A/AAAA/MX/NS/TXT, WHOIS/RDAP, OSINT source confidence, HTTP/TLS headers.
- [ ] **03 Scanning:** TCP vs UDP, Nmap -sn/-sT/-sV/-p/-oA, open/closed/filtered/open|filtered.
- [ ] **04 Enumeration:** SMB/NetBIOS, SNMP, LDAP, DNS, RPC, NFS and BGP concepts; know the correct protocol tool and access context.
- [ ] **05 Vulnerability Analysis:** CVE vs CVSS, authenticated vs unauthenticated scans, false positives, applicability, risk and retest.

### Modules 06–10: Systems, malware, traffic and people
- [ ] **06 System Hacking:** account context, permissions, password policy, audit logs, steganography/steganalysis concepts and evidence preservation.
- [ ] **07 Malware:** hash/file/strings metadata, static vs dynamic analysis, IoCs, isolated sandbox and containment.
- [ ] **08 Sniffing:** interface choice, capture filter vs display filter, ARP/DNS/TCP/HTTP/TLS visibility.
- [ ] **09 Social Engineering:** sender vs Reply-To, SPF/DKIM/DMARC, URL hostname, urgency/pretext and independent verification.
- [ ] **10 DoS:** DoS vs DDoS, volumetric/protocol/application patterns, resource metrics, rate limiting and upstream mitigation.

### Modules 11–15: Session, perimeter and web
- [ ] **11 Session Hijacking:** session rotation, cookie flags, expiry/invalidation, CSRF relationship.
- [ ] **12 IDS/Firewall/Honeypots:** IDS vs IPS, stateful firewall vs WAF, alert correlation, rule tuning and false positives.
- [ ] **13 Web Servers:** headers/methods, TLS hostname/chain/dates, default content, logs and server hardening.
- [ ] **14 Web Applications:** authn vs authz, role/object access, upload validation, baseline request/response and business logic.
- [ ] **15 SQL Injection:** error/UNION/blind/time/second-order concepts, repeatable evidence, parameterized queries and least privilege.

### Modules 16–20: Wireless, mobile, IoT/OT, cloud and crypto
- [ ] **16 Wireless:** SSID/BSSID, channel, WPA2/WPA3, rogue AP clues and segmentation.
- [ ] **17 Mobile:** package/version/permissions, exported components, local storage, TLS, ADB/JADX/MobSF in emulator.
- [ ] **18 IoT and OT:** exposed services, unique credentials, firmware/update integrity, MQTT/CoAP and safety/availability.
- [ ] **19 Cloud:** verify account/profile/region, shared responsibility, IAM least privilege, public storage, logs and secret handling.
- [ ] **20 Cryptography:** hashing vs encryption vs encoding, salt, signatures, certificate SAN/issuer/dates/chain.

## Core command recall
- [ ] **Nmap:** discovery → scoped port scan → service/version → save output.
- [ ] **DNS:** dig/host/nslookup; read record type, TTL and status.
- [ ] **HTTP:** curl -I/-i/-v, browser DevTools Network.
- [ ] **Packets:** tcpdump capture counts/filters; Wireshark display filters; pcap hash.
- [ ] **System:** whoami/id/groups/sockets/logs; Windows whoami /all and Get-WinEvent.
- [ ] **Files/crypto:** file, SHA-256, strings; OpenSSL certificate/TLS inspection.
- [ ] **Web proxy:** Burp/ZAP baseline → one change → response compare → redact evidence.
- [ ] **Scanner:** record exact plugin/request evidence; confirm applicability and re-test.

## Final 10 minutes
- [ ] Read each active task's final sentence for the required output format.
- [ ] Confirm the current target and current lab phase.
- [ ] Remove spaces/newlines only if the task's flag format requires it; don't alter actual values.
- [ ] Submit the exact value, then stop testing that objective.

## Self-test
1. Ping doesn't respond. Is the host definitely down? **No**—ICMP can be filtered.
2. Nmap shows old software version. Is a CVE proven? **No**—validate patch/build/configuration and prerequisites.
3. Is 403 proof the resource doesn't exist? **No**—it is forbidden in that request context.
4. Is Base64 encryption? **No**—it is encoding.
5. Does a scanner's "critical" score equal business risk? **No**—include exposure, asset importance and impact.
6. What is a safe response to unknown malware? **Hash and analyze in an isolated lab; do not run it on a personal machine.**

**Deep study:** [Module index](module-library.md) · [Tool library](tool-library.md) · [Command recipes](tools/practical-command-recipes.md)