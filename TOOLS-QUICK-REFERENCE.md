# CEH v13 — Quick Tool Reference

A condensed reminder for practical revision. Only use these against explicitly assigned lab targets. Replace all placeholders with today's range values.

## Connectivity and host information
```bash
ip addr
ip route
ip neigh
ping -c 4 <LAB_IP>
getent hosts <LAB_DOMAIN>
ss -tulpen
```
Windows: `ipconfig /all`, `route print`, `arp -a`, `netstat -ano`.

## DNS / HTTP
```bash
dig <LAB_DOMAIN> A
dig <LAB_DOMAIN> MX
dig <LAB_DOMAIN> NS
host <LAB_DOMAIN>
whois <LAB_DOMAIN>
curl -I https://<LAB_DOMAIN>/
```

## Scoped Nmap
```bash
nmap -sn <LAB_SUBNET>       # host discovery
nmap -sT -T3 <LAB_IP>       # TCP connect scan
nmap -sV <LAB_IP>           # service/version detection
nmap -p 22,80,443 <LAB_IP>  # selected ports
nmap -oN scan.txt <LAB_IP>  # save output
```
Open = service answered; closed = reachable/no listener; filtered = blocked or ambiguous. Banner ≠ proof of a vulnerability.

## Packets
```bash
sudo tcpdump -i <INTERFACE> -nn -c 50
sudo tcpdump -i <INTERFACE> -nn 'host <LAB_IP>' -c 100
sudo tcpdump -i <INTERFACE> -nn 'port 53' -c 100
```
Wireshark filters: `dns`, `arp`, `icmp`, `tcp.port == 80`, `ip.addr == <LAB_IP>`, `http.request`.

## Files and certificates
```bash
file sample.bin
sha256sum sample.bin
strings -n 6 sample.bin | head -n 40
openssl s_client -connect <LAB_DOMAIN>:443 -servername <LAB_DOMAIN>
```
Do not execute unknown files on your everyday host. Hashing is not encryption; Base64 is encoding.

## Web and mobile tools
- Browser DevTools → Network: request method, URL, params, status, redirects, cookies, response.
- Burp Suite / OWASP ZAP: authorized web request/response analysis.
- MobSF / JADX / ADB: supplied test APK and emulator only.
- Cloud CLI/policy simulator: confirm sandbox profile/account and prefer read-only inspection.

## Fast troubleshooting
Target and lab running → interface/route → DNS → protocol/port → credentials/permissions → firewall/ambiguous output → tool version/syntax.
See [full cheat sheet](TOOLS-CHEATSHEET.md), [exam workflow](EXAM-WORKFLOW.md) and [last-day checklist](REVISION-CHECKLIST.md).