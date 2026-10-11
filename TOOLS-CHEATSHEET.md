# Tool & Command Cheat Sheet (CEH v13)

This is a **syntax and interpretation** sheet. Replace placeholders such as `<LAB_IP>`, `<LAB_SUBNET>`, `<LAB_DOMAIN>`, `<INTERFACE>`, and `<LAB_URL>` with values from your authorized range. Examples use bounded discovery and inspection. Use the full lab-provided procedure where a challenge explicitly authorizes more intrusive testing.

## 1) Linux and network basics

```bash
ip addr                         # interfaces and assigned addresses
ip route                        # routing table/default gateway
ip neigh                        # local ARP/neighbour cache
ss -tulpen                      # listening TCP/UDP sockets, processes (permissions vary)
ping -c 4 <LAB_IP>              # basic reachability clue; ICMP may be blocked
getent hosts <LAB_DOMAIN>       # resolver lookup
which nmap                      # check whether a tool is installed
```

**Interpretation:** a failed ping does not prove a host is down. Confirm route, range state, interface and other allowed signals.

## 2) DNS and reconnaissance

```bash
whois <LAB_DOMAIN>              # registration data; may be redacted or unavailable
dig <LAB_DOMAIN> A              # IPv4 DNS record
dig <LAB_DOMAIN> AAAA           # IPv6 DNS record
dig <LAB_DOMAIN> MX             # mail exchange
dig <LAB_DOMAIN> NS             # authoritative name servers
dig @<LAB_DNS_IP> <LAB_DOMAIN>  # query a lab DNS server
host <LAB_DOMAIN>               # quick DNS lookup
nslookup <LAB_DOMAIN>           # alternative DNS client
curl -I https://<LAB_DOMAIN>/   # inspect HTTP response headers
```

**Remember:** DNS results can be cached, split-horizon, wildcarded or stale. Corroborate before concluding.

## 3) Nmap — authorized lab discovery

```bash
nmap -sn <LAB_SUBNET>            # host discovery; ICMP/firewall can affect results
nmap -sT -T3 <LAB_IP>            # TCP connect scan, moderate timing
nmap -sV <LAB_IP>                # service/version probes
nmap -O <LAB_IP>                 # OS fingerprinting; often needs privileges and may be uncertain
nmap -p 22,80,443 <LAB_IP>        # selected TCP ports only
nmap -sU -p 53,123 <LAB_IP>       # selected UDP services; can be slow/ambiguous
nmap -oN scan.txt <LAB_IP>        # save human-readable output
```

**Port states:** open = a service accepted/probed; closed = reachable but no listener; filtered = probes blocked/ambiguous. A version string is an indicator, not proof of a CVE.

## 4) HTTP / web testing

```bash
curl -I <LAB_URL>                # headers only
curl -i <LAB_URL>                # headers + response body
curl -sS -o /dev/null -w '%{http_code}\n' <LAB_URL>
```

Browser DevTools: Network tab → reproduce one action → inspect request method, URL, parameters, status code, response, cookies and redirects. In Burp/ZAP, use only the authorized lab proxy and target.

**Useful response clues:** 200 does not always mean success; 301/302 redirect; 401 authentication required; 403 forbidden; 404 not found (may also hide resources); 500 server-side error. Record context.

## 5) Packet capture and analysis

```bash
sudo tcpdump -i <INTERFACE> -nn -c 50
sudo tcpdump -i <INTERFACE> -nn 'host <LAB_IP>' -c 100
sudo tcpdump -i <INTERFACE> -nn 'port 53' -c 100
```

Wireshark display-filter reminders:
- `dns`
- `arp`
- `icmp`
- `tcp.port == 80`
- `ip.addr == <LAB_IP>`
- `http.request`

Capture only on an approved interface/network. Encrypted TLS payloads normally do not reveal application content without legitimate session keys or a controlled test setup.

## 6) File and malware triage (safe samples only)

```bash
file sample.bin
sha256sum sample.bin
strings -n 6 sample.bin | head -n 40
stat sample.bin
```

Do not execute an unknown sample on your everyday machine. Use the course sandbox or an isolated disposable VM with controlled networking. A hash identifies a file version; it does not by itself prove maliciousness.

## 7) Windows system checks

```powershell
ipconfig /all
route print
netstat -ano
whoami
whoami /priv
whoami /groups
Get-FileHash .\sample.bin -Algorithm SHA256
Get-LocalUser
```

Use a lab account and follow lab permissions. Interpret privileges in context; a listed privilege is not always enabled or exploitable.

## 8) Certificates and crypto

```bash
openssl s_client -connect <LAB_DOMAIN>:443 -servername <LAB_DOMAIN>
openssl x509 -in certificate.pem -noout -subject -issuer -dates
sha256sum <FILE>
```

Hashing is not encryption. Base64 is encoding, not protection. A certificate's subject/date chain and hostname match all matter.

## 9) Tool families — know the purpose

| Tool | Practical purpose | Check before use |
|---|---|---|
| Nmap | Host/port/service discovery | Exact lab scope, TCP/UDP, scan timing |
| Wireshark / tcpdump | Packet capture and protocol analysis | Correct interface, capture scope |
| Burp Suite / OWASP ZAP | Web request/response inspection | Explicitly set lab target/proxy |
| Nessus / Greenbone | Vulnerability scanning | Lab authorization, safe profile, false positives |
| SMB clients / SNMP / LDAP utilities | Enumeration of exposed services | Correct protocol, credentials and scope |
| MobSF / JADX / ADB | Mobile app analysis | Test APK/device/emulator only |
| OpenSSL | Certificate/TLS checks, crypto diagnostics | Correct hostname and certificate source |
| Cloud CLI / policy simulator | Cloud configuration and IAM review | Sandbox account/profile; read-only first |

## 10) Fast triage when output is unexpected

1. Confirm target copied correctly and the lab has started.
2. Verify local IP/interface and route.
3. Test name resolution separately from IP connectivity.
4. Confirm port/protocol and required credentials.
5. Check whether the scan was filtered, incomplete or privileged.
6. Verify tool syntax against `tool --help` and installed version.
7. Capture exact error text rather than repeatedly changing flags.
