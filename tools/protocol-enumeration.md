# Protocol Enumeration — DNS, NetBIOS, NTP, SMTP, NFS, RPC and IPsec

First confirm the service/port from the lab scope or authorized service scan. These checks reveal metadata; don't enumerate unrelated accounts or data.

## 1. DNS enum: dnsenum and dnsrecon
```bash
dnsenum --help
dnsenum <LAB_DOMAIN>
dnsrecon -h
dnsrecon -d <LAB_DOMAIN> -t std
```
These tools can perform many DNS queries and may expand to names/subdomains depending on options. Use only the supplied domain, review source/wordlist choices, and avoid brute-force/zone-transfer attempts unless specifically authorized by the lab. No result isn't proof that no other hostname exists.

## 2. NetBIOS: nbtscan
```bash
nbtscan -h
nbtscan <LAB_IP>
nbtscan <LAB_SUBNET>
```
Use the exact lab host/subnet. NetBIOS is often disabled in newer networks; no result can coexist with SMB over TCP 445.

## 3. NTP
```bash
ntpq -pn <LAB_IP>
ntpdate -q <LAB_IP>
```
Availability and behavior depend on installed NTP implementation. These are query-oriented checks; don't run clock-stepping or configuration commands on production systems. An NTP response may expose time/peer metadata; validate version and configuration before reporting risk.

## 4. SMTP service identification (avoid account harvesting)
```bash
nmap -sV -p 25,465,587 <LAB_IP>
nc -vz -w 3 <LAB_IP> 25
openssl s_client -connect <LAB_DOMAIN>:465 -servername <LAB_DOMAIN>
openssl s_client -starttls smtp -connect <LAB_DOMAIN>:587 -servername <LAB_DOMAIN>
```
Use an assigned lab mail service. Do not run mass recipient verification or use VRFY/EXPN for account discovery unless an isolated lab specifically demonstrates protocol behavior. Banner disclosure, STARTTLS support and certificate identity are separate observations.

## 5. NFS and RPC
```bash
rpcinfo -p <LAB_IP>
showmount -e <LAB_IP>
nmap -sV -p 111,2049 <LAB_IP>
```
A listed export doesn't prove write access or access from every client. Never mount/copy data unless the lab objective explicitly asks.

## 6. IPsec/IKE scanning
```bash
ike-scan --help
sudo ike-scan <LAB_IP>
```
IKE probes can trigger monitoring. Use only on a single assigned lab VPN endpoint and follow its scope requirements. Do not attempt PSK cracking, aggressive-mode harvesting or credential attacks against real endpoints.

## 7. General service workflow
1. Verify target IP and scope.
2. Confirm expected port/protocol.
3. Run the smallest relevant query.
4. Read response and error output completely.
5. Record source, version, result, limitation and remediation.
6. Stop once the objective is answered.

## Common pitfalls
- UDP silence is ambiguous.
- A port number is a hint, not proof of service.
- DNS tools can query many names; inspect options before running.
- Read-only enumeration can reveal sensitive metadata; minimize captured output.
- If a utility isn't installed, use the lab-approved equivalent rather than downloading random scripts mid-exam.
