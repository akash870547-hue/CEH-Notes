# 01 - Reconnaissance and Network Scanning

> **Scope:** Only scan the host or subnet explicitly assigned in the CEH iLabs / Engage range. Start with the exact objective and keep scan scope narrow.

## Quick reference

| Objective | Command / filter | Where to read the answer |
|---|---|---|
| Discover live hosts | `nmap -sn <TARGET_CIDR>` | Hosts marked `Status: Up` |
| Fast common-port scan | `nmap -n -Pn --top-ports 100 --open -T3 <TARGET_IP>` | `PORT / STATE / SERVICE` |
| Service and version | `nmap -n -Pn -sV -p <PORTS> <TARGET_IP>` | `VERSION` column and service banners |
| OS guess | `sudo nmap -n -Pn -O --osscan-limit <TARGET_IP>` | OS details and confidence |
| NetBIOS / domain clues | `nmblookup -A <TARGET_IP>` | Workstation / domain name and suffix |
| SMB signing | `nmap -n -Pn --script smb-security-mode,smb2-security-mode -p 445 <TARGET_IP>` | Signing enabled / required status |
| SMTP | `nmap -n -Pn -sV -p 25,465,587 <TARGET_IP>` | Open SMTP port / service |
| MSSQL | `nmap -n -Pn -sV -p 1433,1434 <TARGET_IP>` | SQL Server service; UDP 1434 may expose Browser service |
| Parse scan output | `grep -E 'open|NetBIOS|Domain|signing' <SCAN_FILE>` | Matching evidence lines |

## Scenario archetypes

| If the question asks… | Start with | Follow-up |
|---|---|---|
| “Find live hosts in this subnet” | Scoped `nmap -sn` | Extract up addresses into a target list |
| “Which service runs on port X?” | Focused `-sV -p <PORT>` | Check banner and version |
| “Determine NetBIOSDomainName” | `nmblookup -A`, `nbtscan` or `smb-os-discovery` | Use the domain / workgroup value, not the host label |
| “Is SMB signing required?” | `smb-security-mode` / `smb2-security-mode` | Distinguish supported/enabled from required |
| “Identify SMTP / MSSQL / MySQL / RDP” | Scan exact service ports | Corroborate port and detected product |
| “Find OS version” | `-O` plus service/version probes | Treat Nmap OS result as a fingerprint guess |

## Core command syntax

### 1. Host discovery and target extraction

```bash
# ICMP / ARP / discovery probes, only within the assigned range
nmap -n -sn <TARGET_CIDR> -oA <OUTPUT_PREFIX>

# Grepable output to list only addresses with Status: Up
nmap -n -sn <TARGET_CIDR> -oG - | awk '/Status: Up/{print $2}'

# If host discovery probes are blocked but the assigned target is known:
nmap -n -Pn --top-ports 100 --open -T3 <TARGET_IP>
```

### 2. Common TCP and UDP services

```bash
# Common relevant TCP ports: FTP, SSH, SMTP, DNS, HTTP(S), NetBIOS/SMB,
# MSSQL, MySQL, RDP and common web alternates
nmap -n -Pn -sS -sV --open -p 21,22,25,53,80,110,139,143,443,445,465,587,1433,3306,3389,8080 <TARGET_IP>

# Targeted UDP checks: NetBIOS name service and SQL Server Browser
sudo nmap -n -Pn -sU -sV -p 137,1434 <TARGET_IP>

# Inventory a supplied list of in-scope hosts
nmap -n -sV --top-ports 100 -iL <TARGET_LIST_FILE> -oA <OUTPUT_PREFIX>
```

### 3. OS, scripts and SMB posture

```bash
sudo nmap -n -Pn -O --osscan-limit -p <OPEN_PORTS> <TARGET_IP>

# SMB host, domain and OS clues
nmap -n -Pn --script smb-os-discovery -p 445 <TARGET_IP>

# SMB security mode / signing posture
nmap -n -Pn --script smb-security-mode,smb2-security-mode -p 445 <TARGET_IP>

# Only after reading the script help and confirming relevance
nmap --script-help <SCRIPT_NAME>
nmap -n -Pn --script <SAFE_RELEVANT_SCRIPT> -p <PORT> <TARGET_IP>
```

NSE scripts vary by Nmap version and category. Review the script description before execution; not every script is safe or read-only.

### 4. NetBIOS name / domain

```bash
nmblookup -A <TARGET_IP>
nbtscan -v <TARGET_IP>
nmap -n -Pn -sU -p 137 --script nbstat <TARGET_IP>
nmap -n -Pn --script smb-os-discovery -p 445 <TARGET_IP>
```

A NetBIOS suffix such as `<1C>` often identifies a domain group. Confirm the field semantics in the output before copying a value. SMB domain information may require a successful SMB connection and may not be exposed to anonymous users.

### 5. Banners and SMTP / database identification

```bash
# Plain SMTP greeting in the assigned lab
nc -nv <TARGET_IP> 25

# SMTP STARTTLS certificate / protocol evidence
openssl s_client -connect <TARGET_IP>:25 -starttls smtp

# MSSQL service detection
nmap -n -Pn -sV --script ms-sql-info -p 1433 <TARGET_IP>

# MySQL service detection
nmap -n -Pn -sV -p 3306 <TARGET_IP>

# HTTP headers
curl -sS -D - -o /dev/null <TARGET_URL>
```

Do not submit a TCP banner as a product version unless the objective asks for the banner itself.

## Interpretation and output analysis

- **Open:** connection accepted or a protocol response indicates a listening service.
- **Closed:** host responded that the port is reachable but not listening.
- **Filtered:** a firewall / filter or missing response prevents Nmap from classifying it.
- **Service version:** a probe-based identification; validate with a direct banner or application response if important.
- **OS detection:** probabilistic. Firewalls, NAT, proxies and limited open/closed ports can reduce accuracy.
- **SMB signing:** “enabled” is not equivalent to “required.” Read the exact script field.
- **NetBIOS domain:** use the explicit domain/workgroup field, not the machine name or an unrelated DNS suffix.

### Fast CLI parsing

```bash
# Pull key lines from a saved normal Nmap output
grep -E '^[0-9]+/(tcp|udp)[[:space:]]+open|OS details|Running:|NetBIOS|Domain|signing' <SCAN_FILE>

# Output open ports from grepable output
awk '/Ports:/{print $2, $0}' <SCAN_GREPABLE_FILE>

# Preserve results in normal, grepable and XML formats for later parsing
nmap -n -Pn -sV -p <PORTS> <TARGET_IP> -oA <OUTPUT_PREFIX>
```

## Wireshark / filter / regex quick lookup

| Need | Filter / expression |
|---|---|
| SMB / NetBIOS traffic in a supplied PCAP | `smb || smb2 || nbns` |
| DNS name traffic | `dns` |
| SMTP traffic | `smtp || tcp.port == 25 || tcp.port == 465 || tcp.port == 587` |
| MSSQL port traffic | `tcp.port == 1433 || udp.port == 1434` |
| Pull discovered Nmap lines | `grep -Ei 'open|netbios|domain|signing|microsoft sql|mysql|smtp|rdp' <FILE>` |

## Edge cases and troubleshooting

| Symptom | Fallback |
|---|---|
| No hosts found | Check assigned CIDR, VPN / lab route and interface with `ip -brief address` and `ip route`. |
| ICMP blocked | If the target is explicitly assigned, use `-Pn` for a narrow port scan. |
| Very slow scan | Reduce ports and targets; avoid increasing timing or parallelism blindly. |
| SMB scripts fail | Confirm TCP 445 is open; test NetBIOS UDP 137 only if the task requires it. |
| No domain value | Try `nmblookup -A` and `smb-os-discovery`; anonymous enumeration may be disabled. |
| OS detection inconclusive | Use version banners and the task's host clues; don't invent a precise OS build. |
| “Connection refused” | Verify target IP and port; the service may be stopped or bound elsewhere. |
| Unknown NSE script | Run `nmap --script-help <SCRIPT_NAME>` and check local script availability. |

## References

- [Nmap port scanning techniques](https://nmap.org/book/man-port-scanning-techniques.html)
- [Nmap NSE script reference](https://nmap.org/nsedoc/scripts/)
- [Nmap smb-security-mode reference](https://nmap.org/nsedoc/scripts/smb-security-mode.html)
- [Nmap ms-sql-info / related scripts](https://nmap.org/nsedoc/scripts/)
