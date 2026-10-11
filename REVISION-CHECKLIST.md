# Last-Day CEH Practical Revision Checklist

## Workflow muscle memory
- [ ] Scope → observe → hypothesize → validate → evidence → submit → stop.
- [ ] Know the five ethical-hacking phases and how the practical objective maps to them.
- [ ] Every note states target, method, finding, evidence and limitation.

## Network
- [ ] Difference between IP, MAC, hostname, FQDN, subnet, port and protocol.
- [ ] DNS A / AAAA / MX / NS records.
- [ ] TCP vs UDP; open vs closed vs filtered.
- [ ] Route/interface checks before blaming a tool.
- [ ] What Nmap service/version output can and cannot prove.

## Enumeration and vulnerability analysis
- [ ] SMB, SNMP, LDAP, DNS purposes and common exposure risks.
- [ ] CVE vs CVSS; scanner finding vs validated vulnerability.
- [ ] False positives, evidence, prioritization and remediation.

## System / malware / sniffing
- [ ] Least privilege, account context, file permissions and log locations.
- [ ] Hash / file type / strings are static clues; do not run unknown samples on a host.
- [ ] Capture interface and display/capture filters; ARP/DNS/DHCP concepts.
- [ ] Defensive indicators of DoS, spoofing, credential theft and malware.

## Web / session / SQLi
- [ ] HTTP methods, headers, status codes, cookies and redirects.
- [ ] Secure / HttpOnly / SameSite and session invalidation.
- [ ] Authentication vs authorization; role/object access control.
- [ ] SQLi types conceptually; parameterized query is the core defense.
- [ ] Record a request/response pair and verify impact without destructive changes.

## Wireless / mobile / IoT / cloud / crypto
- [ ] WPA2/WPA3, rogue AP indicators, network segmentation.
- [ ] Android permissions, APK static analysis, emulator use.
- [ ] Default credentials, firmware updates, exposed services and IoT isolation.
- [ ] Shared responsibility, IAM least privilege, public storage and audit logs.
- [ ] Hashing vs encryption vs encoding; certificate hostname/date/issuer.

## Final 10-minute routine
- [ ] Read each objective and identify the exact output required.
- [ ] Confirm correct lab target and tool.
- [ ] Keep answers precise; do not submit assumptions as facts.
- [ ] Check whitespace/case in values or flags.
- [ ] Stop testing once the required result is verified.

## Self-test
1. A host does not answer ping. Is it necessarily offline? **No**—ICMP may be filtered; corroborate with authorized checks.
2. Nmap reports an old server version. Does that prove a CVE? **No**—validate configuration/version and finding applicability.
3. What does a 403 mean? **Forbidden** in the current request context; not proof that the resource does not exist.
4. Are Base64 and hashing encryption? **No**.
5. What is the best next action when a tool returns nothing? **Check target, scope, network path, protocol, permissions, and tool syntax systematically.**
