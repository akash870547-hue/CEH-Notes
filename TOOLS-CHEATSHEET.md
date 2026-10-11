# Tool & Command Cheat Sheet (CEH v13)

> **Want the detailed commands for each tool? Start with the [Complete Tool Library](tools/README.md).** It has individual beginner-to-advanced guides for Nmap, DNS/recon, SMB/SNMP/LDAP, web CLI tools, Burp/ZAP, sqlmap, Nessus/OpenVAS, Metasploit, hping3, Netcat, Wireshark/tcpdump/tshark, wireless, Bettercap, John/Hashcat, ADB/JADX/MobSF, cloud/Grype, OpenSSL and log analysis. [Objective-based command recipes](tools/practical-command-recipes.md) are also available.

Use commands only on the assigned course range, owned systems or explicitly authorized targets. Replace placeholders such as `<LAB_IP>`, `<LAB_SUBNET>`, `<LAB_DOMAIN>`, `<INTERFACE>`, and `<LAB_URL>` with values from your current lab sheet.

## 1. Linux/network basics
```bash
ip addr                         # interfaces and IP addresses
ip route                        # routing/default gateway
ip neigh                        # ARP/neighbour cache
ss -tulpen                      # listening sockets (permissions vary)
ping -c 4 <LAB_IP>              # basic reachability; ICMP may be filtered
getent hosts <LAB_DOMAIN>       # resolver lookup
which nmap                      # check if a tool is installed
```
Windows equivalents: `ipconfig /all`, `route print`, `arp -a`, `netstat -ano`.

## 2. DNS and reconnaissance
```bash
whois <LAB_DOMAIN>              # registration metadata (may be redacted)
dig <LAB_DOMAIN> A              # IPv4 record
dig <LAB_DOMAIN> AAAA            # IPv6 record
dig <LAB_DOMAIN> MX              # mail records
dig <LAB_DOMAIN> NS              # name servers
dig @<LAB_DNS_IP> <LAB_DOMAIN>   # ask lab DNS server
host <LAB_DOMAIN>
nslookup <LAB_DOMAIN>
curl -I https://<LAB_DOMAIN>/   # HTTP response headers
```
DNS may be cached, split-horizon, wildcarded or stale—corroborate important results.

## 3. Nmap: scoped discovery and inspection
```bash
nmap -sn <LAB_SUBNET>             # host discovery
nmap -sT -T3 <LAB_IP>             # TCP connect scan with moderate timing
nmap -sV <LAB_IP>                 # service/version detection
nmap -O <LAB_IP>                  # OS fingerprint attempt; may be uncertain
nmap -p 22,80,443 <LAB_IP>         # selected TCP ports
nmap -sU -p 53,123 <LAB_IP>        # selected UDP services; may be slow/ambiguous
nmap -oN scan.txt <LAB_IP>         # save readable output
```
- **open:** a service answered the probe.
- **closed:** host is reachable but no listener accepted the probe.
- **filtered:** firewall/filtering prevents a clear answer.
- **open|filtered:** common ambiguity with some UDP tests.
- A service banner is an indicator, not proof that a CVE applies.

## 4. HTTP/web testing
```bash
curl -I <LAB_URL> 
curl -i <LAB_URL>
curl -sS -o /dev/null -w '%{http_code}\n' <LAB_URL>
```
Use browser DevTools → Network to reproduce one action and inspect method, URL, parameters, status, redirects, cookies and response. Burp/ZAP should be scoped to the lab host.
- 200: response returned, not necessarily objective success.
- 301/302: redirect.
- 401: authentication required.
- 403: forbidden in this context.
- 404: not found, or possibly hidden.
- 500: server-side error.

## 5. Packet capture
```bash
sudo tcpdump -i <INTERFACE> -nn -c 50
sudo tcpdump -i <INTERFACE> -nn 'host <LAB_IP>' -c 100
sudo tcpdump -i <INTERFACE> -nn 'port 53' -c 100
```
Wireshark display filters: `dns`, `arp`, `icmp`, `tcp.port == 80`, `ip.addr == <LAB_IP>`, `http.request`.
Capture only on an authorized interface/network. TLS application data is normally not readable without legitimate keys or a controlled test arrangement.

## 6. File / malware triage (safe sample only)
```bash
file sample.bin
sha256sum sample.bin
strings -n 6 sample.bin | head -n 40
stat sample.bin
```
PowerShell: `Get-FileHash .\sample.bin -Algorithm SHA256`. Do not execute unknown samples on your everyday machine; use an isolated course sandbox.

## 7. Windows system checks
```powershell
whoami
whoami /priv
whoami /groups
Get-LocalUser
Get-FileHash .\sample.bin -Algorithm SHA256
netstat -ano
```
Interpret permissions and privileges in context; do not assume every listed privilege is enabled or exploitable.

## 8. Certificates and crypto
```bash
openssl s_client -connect <LAB_DOMAIN>:443 -servername <LAB_DOMAIN>
openssl x509 -in certificate.pem -noout -subject -issuer -dates
sha256sum <FILE>
```
Hashing is not encryption. Base64 is encoding. Check certificate subject/SAN, validity dates, issuer/chain and hostname.

## 9. Tool families to recognize

| Tool | Purpose | What to verify |
|---|---|---|
| Nmap | Host, port and service discovery | scope, port state, TCP/UDP |
| Wireshark/tcpdump | Packet capture and protocol analysis | correct interface/filter/time |
| Burp Suite / OWASP ZAP | Web request/response inspection | target scope and baseline |
| Nessus / Greenbone | Vulnerability assessment | safe profile, finding validation |
| SMB/SNMP/LDAP clients | Service enumeration | protocol, permitted access, output |
| MobSF / JADX / ADB | Mobile app analysis | test APK/device only |
| OpenSSL | TLS/certificate checks | correct hostname and certificate |
| Cloud CLI / policy simulator | IAM/config review | sandbox identity/account and permissions |

## 10. When output is unexpected
1. Confirm lab started and exact target is correct.
2. Check interface, local IP and routing.
3. Test name resolution separately from IP connectivity.
4. Verify protocol/port and whether credentials are required.
5. Consider firewall filtering, UDP ambiguity or insufficient permissions.
6. Check installed version and `tool --help`.
7. Keep the exact error message and only then choose the next test.

See also: [Exam workflow](EXAM-WORKFLOW.md) · [Revision checklist](REVISION-CHECKLIST.md)