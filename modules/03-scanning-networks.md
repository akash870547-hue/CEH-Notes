# Module 03 — Scanning Networks

## Exam objective
Identify live hosts and exposed services in the assigned range, distinguish port states correctly, and capture a reproducible scan result. Never scan a broader network than the lab assigns.

## 1. Verify the local path first
```bash
ip addr
ip route
ip neigh
ping -c 3 <LAB_IP>
nmap --version
```
Ping failure does not prove the host is down: ICMP may be filtered, and the target may still answer on a permitted TCP/UDP service.

## 2. Nmap progression — broad to focused
```bash
nmap -sn <LAB_SUBNET>
nmap -sT -T3 <LAB_IP>
nmap -p 22,80,443 <LAB_IP>
nmap -sV -p 22,80,443 <LAB_IP>
nmap -oA evidence/host-scan <LAB_IP>
```
- `-sn`: host discovery without port scan.
- `-sT`: TCP connect scan.
- `-p`: select ports/ranges.
- `-sV`: service/version probes.
- `-oA`: save normal, XML and grepable outputs with one base name.
- `-T3`: a moderate timing template; use the setting the lab specifies.
- SYN scans and OS fingerprinting commonly need elevated privileges; only elevate inside your lab when needed.

Advanced but still bounded:
```bash
sudo nmap -sU -p 53,123,161 <LAB_IP>
sudo nmap -O <LAB_IP>
nmap --traceroute <LAB_IP>
```
UDP results can be ambiguous and slower. OS detection is a guess based on network responses, not a guarantee.

## 3. Port-state interpretation
| State | Meaning | What to do next |
|---|---|---|
| open | A service responds on the port | identify service and follow task |
| closed | Target reachable, no listener accepted probe | verify expected service/port |
| filtered | Filter blocks a definitive answer | note filtering; check route/ACL if in scope |
| open|filtered | Scanner can't decide | common on some UDP tests |
| closed|filtered | Scanner can't decide between those states | interpret within scan type |

TCP and UDP are separate. A TCP port finding does not answer whether the same-numbered UDP port is open.

## 4. NSE scripts
Nmap Scripting Engine adds targeted checks; script effects vary.
```bash
nmap --script-help http-title
nmap --script http-title -p 80,443 <LAB_IP>
nmap --script ssl-cert -p 443 <LAB_IP>
```
Read a script's purpose before use. Use scripts classified as safe/discovery only when the lab allows them; avoid indiscriminate `--script all` or vulnerability scripts without explicit authorization.

## 5. Practical evidence format
Save the command, Nmap version, authorized target, time, relevant host/port lines and output filename. Write service/version as “detected” not “verified” unless corroborated. A banner alone is insufficient proof of a CVE.

## 6. Common failures
- **Host appears down:** verify subnet mask, VPN, interface and host-discovery behavior.
- **No ports shown:** wrong IP, filtering, different port, or service down.
- **Version is blank/inaccurate:** probe blocked, proxy banner, or service does not disclose details.
- **Permission error:** run only the required scan with lab-approved privileges.
- **Unexpectedly slow:** narrow ports, avoid unnecessary UDP/full-range scans and respect lab timing.

## Lab drill
Run a discovery scan, then a focused scan for only the ports named in the task. Compare what each command tells you and what it cannot establish.

**Related:** [Nmap complete guide](../tools/nmap.md) · [Packet analysis](../tools/packet-analysis.md)