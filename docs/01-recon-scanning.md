<p class="ceh-kicker">MODULE 01 · NETWORK INTELLIGENCE</p>

# Reconnaissance and Scanning

> Scope: use only the assigned CEH iLabs / Engage target or subnet. Exact task wording overrides these examples.

!!! note "Fast lookup"
    Confirm the assigned CIDR / host before scanning. Replace every placeholder and capture output with `-oA` when results may need parsing.

??? tip "When scans return nothing"
    Verify the lab route and target address. Use `-Pn` only for a specifically assigned host when discovery probes are blocked; keep ports narrow.

## Quick reference

| Objective | Command | Answer field |
|---|---|---|
| Live hosts | `nmap -n -sn <TARGET_CIDR>` | Hosts marked up |
| Common ports | `nmap -n -Pn --top-ports 100 --open -T3 <TARGET_IP>` | PORT / STATE / SERVICE |
| Service version | `nmap -n -Pn -sV -p <PORTS> <TARGET_IP>` | VERSION / banner |
| OS guess | `sudo nmap -n -Pn -O --osscan-limit <TARGET_IP>` | OS details, confidence |
| NetBIOS / domain | `nmblookup -A <TARGET_IP>` | Domain / workgroup name |
| SMB signing | `nmap -n -Pn --script smb-security-mode,smb2-security-mode -p 445 <TARGET_IP>` | Signing supported / required |
| SMTP / MSSQL | `nmap -n -Pn -sV -p 25,465,587,1433,1434 <TARGET_IP>` | Open port + identified service |
| Save evidence | `nmap -n -Pn -sV -p <PORTS> <TARGET_IP> -oA <OUT_PREFIX>` | .nmap / .xml / .gnmap files |

## Scenario archetypes

| If the question asks… | Use | Then |
|---|---|---|
| Find subnet hosts | `nmap -sn` | Extract only addresses reported up |
| Identify FTP, SMB, RDP, HTTP, MySQL or MSSQL | Focused port list + `-sV` | Copy exact port / service / version |
| Determine NetBIOSDomainName | `nmblookup -A`, `nbtscan -v`, or `smb-os-discovery` | Copy explicit domain/workgroup field |
| Is SMB signing required? | SMB security-mode NSE scripts | Distinguish enabled/supported from required |
| Identify SMTP banner | `nc -nv <TARGET_IP> 25` | Read server greeting; STARTTLS may be required |
| Identify OS | `-O` + service detection | Treat OS result as a fingerprint estimate |

## Core command / tool syntax

### Host discovery and port sweep

```bash
# Subnet: only the CIDR explicitly given in the objective
nmap -n -sn <TARGET_CIDR> -oA <OUT_PREFIX>

# Grepable output: print live IP addresses
nmap -n -sn <TARGET_CIDR> -oG - | awk '/Status: Up/{print $2}'

# If probes are blocked but the exact target is assigned, skip discovery
nmap -n -Pn --top-ports 100 --open -T3 <TARGET_IP>

# Narrow port set: FTP, SSH, SMTP, DNS, HTTP(S), NetBIOS/SMB, MSSQL,
# MySQL, RDP and common web alternate
nmap -n -Pn -sS -sV --open -p 21,22,25,53,80,110,139,143,443,445,465,587,1433,3306,3389,8080 <TARGET_IP>

# UDP checks for NetBIOS name service and SQL Server Browser
sudo nmap -n -Pn -sU -sV -p 137,1434 <TARGET_IP>
```

### OS and NSE enumeration

```bash
sudo nmap -n -Pn -O --osscan-limit -p <OPEN_PORTS> <TARGET_IP>
nmap -n -Pn --script smb-os-discovery -p 445 <TARGET_IP>
nmap -n -Pn --script smb-security-mode,smb2-security-mode -p 445 <TARGET_IP>
nmap -n -Pn -sV --script ms-sql-info -p 1433 <TARGET_IP>
nmap --script-help <SCRIPT_NAME>
```

Inspect each NSE script's description first. Not every script is read-only, safe or applicable to every service.

### NetBIOS / domain name

```bash
nmblookup -A <TARGET_IP>
nbtscan -v <TARGET_IP>
nmap -n -Pn -sU -p 137 --script nbstat <TARGET_IP>
nmap -n -Pn --script smb-os-discovery -p 445 <TARGET_IP>
```

A NetBIOS suffix such as `<1C>` can mark a domain group; confirm the output field before copying. Domain information may be unavailable anonymously.

### Banner checks

```bash
nc -nv <TARGET_IP> 25
openssl s_client -connect <TARGET_IP>:25 -starttls smtp
nmap -n -Pn -sV -p 3306 <TARGET_IP>
curl -sS -D - -o /dev/null <TARGET_URL>
```

## Interpretation and output analysis

- **Open** means a service responded; **closed** usually means a reachable host rejected the connection; **filtered** means a filter or missing response prevented classification.
- `-sV` reports a probe-based product/version guess. Verify important values with a banner or application response.
- `-O` is probabilistic; NAT, filters and too few open/closed ports can weaken the guess.
- SMB signing “supported/enabled” is not equivalent to “required.” Copy the explicit script result.
- Port 1433 is commonly MSSQL/TCP; UDP 1434 commonly relates to SQL Server Browser. Confirm with service detection.
- A port alone is not a CVE, and a banner alone does not prove exploitability.

## Wireshark / regex / CLI parsing

| Goal | Filter / parser |
|---|---|
| SMB / NetBIOS capture | `smb || smb2 || nbns` |
| DNS queries | `dns` |
| SMTP traffic | `smtp || tcp.port == 25 || tcp.port == 465 || tcp.port == 587` |
| MSSQL traffic | `tcp.port == 1433 || udp.port == 1434` |
| Extract service rows | `grep -E '^[0-9]+/(tcp|udp)[[:space:]]+open' <SCAN_FILE>` |
| Domain / signing clues | `grep -Ei 'NetBIOS|Domain|signing|workgroup' <SCAN_FILE>` |

## Edge cases and troubleshooting

| Failure | Next check |
|---|---|
| No hosts found | Verify assigned CIDR, lab VPN, `ip -brief address`, and `ip route`. |
| ICMP blocked | If the target is explicitly assigned, scan it with `-Pn` and narrow ports. |
| Slow scan | Reduce hosts / ports. Do not increase timing or parallelism blindly. |
| SMB scripts fail | Confirm TCP 445 is open; try NetBIOS UDP 137 only when relevant. |
| Domain not returned | Use `nmblookup -A` and `smb-os-discovery`; anonymous access can be disabled. |
| OS unclear | Use service banners and task evidence; do not invent a precise build. |
| Connection refused | Verify address/port; service may be stopped or bound to another interface. |

=== "Linux / macOS"
    ```bash
    ip -brief address
    ip route
    command -v nmap nmblookup nbtscan
    nmap -n -sn <TARGET_CIDR>
    ```

=== "Windows PowerShell"
    ```powershell
    Get-NetIPConfiguration
    Test-NetConnection -ComputerName <TARGET_IP> -Port 445
    Get-Command nmap -ErrorAction SilentlyContinue
    ```

## References

- [Nmap scanning reference](https://nmap.org/book/man-port-scanning-techniques.html)
- [Nmap NSE reference](https://nmap.org/nsedoc/scripts/)
- [SMB security-mode script](https://nmap.org/nsedoc/scripts/smb-security-mode.html)
- [MSSQL NSE scripts](https://nmap.org/nsedoc/scripts/)
