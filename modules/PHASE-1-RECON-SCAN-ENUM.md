# Phase 1 Focus — Reconnaissance, Scanning & Enumeration

Modules 02–04 are easiest to revise as one chain: **what is known → which host/service exists → what that service reveals**.

## 1. Establish a scope card
Record the exact hostname/IP/subnet provided by the lab. Resolve a hostname before scanning and keep your scan commands constrained to that range.

## 2. Reconnaissance
- Passive: public documents, search-engine results, registration records, public DNS.
- Active: direct DNS queries and authorized interaction with the target.
- Verify information from more than one source when practical; record collection time.
- Do not treat guessed email addresses, subdomains, or OS fingerprints as confirmed.

Useful read-only commands are in [the command sheet](../TOOLS-CHEATSHEET.md): `dig`, `host`, `whois`, `curl -I`.

## 3. Network discovery and service scanning
1. Check interface and route.
2. Use a lab-approved host-discovery method.
3. Scan only the host/ports relevant to the task.
4. Add service/version detection when the initial result justifies it.
5. Save output and note scan conditions.

Important Nmap concepts:
- `-sn`: host discovery without a port scan.
- `-sT`: TCP connect scan.
- `-sV`: service/version detection.
- `-O`: OS fingerprint attempt.
- `-p`: select ports.
- `-oN`: save readable results.

A stealthy-looking scan is not automatically more accurate. Timing, packet loss, firewall policy, privilege level, and lab design affect output.

## 4. Enumeration
Enumeration is service-specific:
- SMB/NetBIOS: shares, host/workgroup information and access controls.
- SNMP: exposed management data; community strings and access policy matter.
- LDAP: directory structure and permitted anonymous/authenticated queries.
- DNS: records, delegation and misconfigurations.
- RPC/services: exposed interfaces and configuration details.

For each finding, write: **service → method → exact output → why it matters → remediation**. Avoid assuming that a service is vulnerable merely because it is present.

## 5. Vulnerability analysis handoff
Use the service/version and configuration clues to choose an approved scanner check. Review CVE applicability, CVSS context, evidence, potential false positives and remediation. A scanner score is not the same as business risk.

## Practice prompt
The lab gives you a hostname and asks which service is running on a specified port.
- What is the first DNS check?
- How do you constrain a scan to the supplied host and port?
- Which output line indicates state and which indicates service/version?
- What evidence would you save?
- What would you write if the port is filtered?

## Typical mistakes
- Scanning an old IP cached in notes rather than today's lab target.
- Using the full public IP space instead of the assigned range.
- Confusing DNS lookup failure with host failure.
- Misreading UDP's ambiguous/open|filtered states.
- Reporting an unverified CVE based only on a banner.
