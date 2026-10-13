# Quick Command Reference

## Nmap

```bash
nmap -sn <TARGET_CIDR>
nmap -n -Pn --top-ports 100 --open -T3 <TARGET_IP>
nmap -n -Pn -sV -O -p <PORTS> <TARGET_IP>
nmap -n -Pn -sC -sV -p <PORTS> <TARGET_IP>
```

## Wordlist lookup

```bash
ls /usr/share/wordlists 2>/dev/null
find /usr/share/seclists/Passwords -type f 2>/dev/null | head -n 50
find "$HOME/Desktop" "$HOME/Downloads" -type f 2>/dev/null | head -n 80
```

## Authentication testing

Use one lab-supplied account and low rate; complete syntax is in [Scenario 07](scenarios/07-service-auth.md).

## Hashes

```bash
hashid '<HASH_STRING>'
john --wordlist=<WORDLIST> <HASH_FILE>
john --show <HASH_FILE>
hashcat -m <MODE> <HASH_FILE> <WORDLIST> --status
hashcat -m <MODE> <HASH_FILE> --show
```

## Web

```bash
curl -sS -D - -o /dev/null <TARGET_URL>
gobuster dir -u <TARGET_URL> -w <WORDLIST> -t 20
dirb <TARGET_URL> <WORDLIST>
sqlmap -u '<TARGET_URL>?id=1' -p id --batch
```

## PCAP

```bash
capinfos <PCAP_FILE>
tshark -r <PCAP_FILE> -q -z io,phs
tshark -r <PCAP_FILE> -Y 'ftp || telnet || http'
```

## Crypto / stego

```bash
echo -n '<BASE64_TEXT>' | base64 -d
echo -n '<TEXT>' | tr 'A-Za-z' 'N-ZA-Mn-za-m'
echo -n '<HEX_STRING>' | xxd -r -p
file <ARTIFACT_FILE>
exiftool <ARTIFACT_FILE>
strings -n 6 <ARTIFACT_FILE> | head
```

## Troubleshooting

| Error | First check |
|---|---|
| Refused | Verify host/port and service state |
| Timeout | Verify route, interface and assigned scope |
| Not found | Verify path and installed version |
| No result | Validate input, parameter, hash or capture fields |
| Slow | Reduce scope / workers; do not add threads blindly |
