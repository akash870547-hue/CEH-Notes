# Netcat / Ncat — Socket and Banner Diagnostics

Netcat utilities vary across implementations (`nc`, OpenBSD netcat, traditional netcat, Ncat from Nmap). Confirm the flags supported by your installed command first.

## 1. Identify installed variant
```bash
nc -h
ncat --help
which nc
nc -h 2>&1 | head -n 30
```

## 2. Basic reachability / TCP connect
```bash
nc -vz -w 3 <LAB_IP> 22
nc -vz -w 3 <LAB_IP> 80 443
ncat -vz --connect-timeout 3 <LAB_IP> 443
```
- `-v`: verbose.
- `-z`: scan/check without sending application data, where supported.
- `-w`/connect-timeout: bound the wait.
Multiple ports syntax varies by implementation; when uncertain, test one port at a time.

## 3. Read a service banner (where the service sends one)
```bash
printf 'HEAD / HTTP/1.0\r\nHost: <LAB_DOMAIN>\r\n\r\n' | nc -w 3 <LAB_IP> 80
```
Plain HTTP only; HTTPS requires TLS, for which use `openssl s_client` or `curl -v`. Some servers do not send banners until they receive a valid request.

## 4. Ncat with TLS information
```bash
ncat --help
ncat --ssl <LAB_DOMAIN> 443
```
Use only for basic interaction with a lab TLS service; for certificate validation details, OpenSSL is more informative.

## 5. Lab file transfer caution
Netcat can be abused to transfer files or expose listeners. Use the course's designated transfer utility and test files. Do not create public listeners or transfer executables/secrets over untrusted networks. The command patterns for reverse shells and covert tunnels are intentionally omitted.

## 6. Troubleshooting
- **Connection refused:** host replied but no service accepted the connection, or a device actively rejected it.
- **Timeout:** path/filter/target state may prevent a reply.
- **No banner:** service may expect a protocol-specific request or use TLS.
- **Unknown flag:** check which `nc` variant is installed.

References: [Ncat reference guide](https://nmap.org/ncat/guide/index.html)
