# Nmap — Basic to Advanced (CEH v13)

Nmap helps identify hosts, open ports, services and probable versions. It is not a guarantee that a vulnerability exists.

> Use only against the exact lab host/subnet assigned to you. A scan can create load and alerts; do not widen scope just because a command accepts a CIDR.

## 0. Check install and interface
```bash
nmap --version
nmap --help
ip addr
ip route
```
If a scan behaves strangely, first verify that the lab VM is started, route/interface are correct and target is copied exactly.

## 1. Basic host and port checks
```bash
nmap <LAB_IP>
nmap -sn <LAB_SUBNET>
nmap -p 80,443 <LAB_IP>
nmap -p 1-1000 <LAB_IP>
```
- `-sn`: host discovery only; no port scan.
- `-p`: select ports. Prefer only the relevant ports when a task is narrow.
- A host may be alive even if ICMP-based discovery does not show it.

## 2. Common TCP scan types
```bash
nmap -sT <LAB_IP>               # TCP connect scan
sudo nmap -sS <LAB_IP>          # SYN scan; commonly needs elevated privileges
nmap -sT -T3 -p 22,80,443 <LAB_IP>
```
- `-sT`: uses the OS connect call.
- `-sS`: SYN scan; needs privileges on common platforms.
- `-T0` to `-T5`: timing templates. Higher is faster/noisier; do not optimize stealth in a live environment. For a lab, use the rate/timing specified by the exercise.

## 3. UDP and service/version detection
```bash
sudo nmap -sU -p 53,67,123,161 <LAB_IP>
nmap -sV <LAB_IP>
nmap -sV --version-light -p 22,80,443 <LAB_IP>
```
- UDP can be slow and often returns `open|filtered` when a response is absent.
- `-sV` probes services to infer their software/version.
- Version output can be inaccurate or hidden by proxies/backports; validate before mapping a CVE.

## 4. OS fingerprinting and traceroute
```bash
sudo nmap -O <LAB_IP>
nmap --traceroute <LAB_IP>
```
OS detection is probabilistic and may require a responsive host with useful open/closed ports.

## 5. Save and compare output
```bash
nmap -oN nmap.txt <LAB_IP>              # normal text
nmap -oX nmap.xml <LAB_IP>              # XML for parsers
nmap -oA lab-scan <LAB_IP>              # .nmap, .xml, .gnmap outputs
```
Name output files by lab objective/date; don't include secrets in filenames.

## 6. NSE scripts: safe and targeted
Nmap Scripting Engine (NSE) extends Nmap. Inspect a script's description before running it.
```bash
nmap --script-help safe
nmap --script-help http-title
nmap --script http-title -p 80,443 <LAB_IP>
nmap --script ssl-cert -p 443 <LAB_IP>
nmap --script banner -p 21,22,25,80 <LAB_IP>
```
Use vulnerability-checking scripts only if the lab permits them and the target range is confirmed. Some scripts are intrusive; do not indiscriminately run `--script all`.

## 7. Helpful scan combinations
```bash
nmap -sV -p 22,80,443 -oN services.txt <LAB_IP>
nmap -sC -sV -p 22,80,443 <LAB_IP>
```
- `-sC` runs the default script set; review its effects and lab rules first.
- Combining options saves time but can increase probing. Begin small, then expand when the result justifies it.

## 8. Port states to memorize

| State | Meaning | Exam interpretation |
|---|---|---|
| open | A service is listening/responding | identify service and investigate as directed |
| closed | Host reachable, no listener on that port | not the same as filtered |
| filtered | Filter prevents a definitive state | check ACL/firewall and path |
| open|filtered | Nmap cannot distinguish open from filtered | common for some UDP scans |
| closed|filtered | Nmap cannot confidently distinguish states | depends on scan type/environment |

## 9. Troubleshooting
- **All hosts down:** confirm subnet, route, VPN/lab access, and host-discovery behavior.
- **No ports shown:** host might filter probes, service may be on a non-default port, or target may be wrong.
- **Needs privileges:** use elevated permissions only in your lab VM and only when required.
- **Slow UDP:** narrow ports and follow the task's timeout/timing settings.
- **Unexpected versions:** compare with the actual service response or lab evidence.
- **CVE assumptions:** a version string alone is not proof of exploitability.

## Mini practice
Given a lab IP and task asking for HTTPS service version:
1. confirm IP is in assigned scope;
2. scan TCP 443 with service detection;
3. save output;
4. describe state and service/version, including any uncertainty.

Official docs: [Nmap Reference Guide](https://nmap.org/book/man.html) · [NSE docs](https://nmap.org/book/nse.html)
