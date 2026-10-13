# 12 - PCAP / Wireshark / TShark

## Trigger
Find plaintext protocol credentials, suspicious SYN / ICMP patterns, ARP spoof evidence, or export a file from a supplied capture.

## Inventory
```bash
capinfos <PCAP_FILE>
tshark -r <PCAP_FILE> -q -z io,phs
tshark -r <PCAP_FILE> -Y 'ftp || telnet || http'
```

## Display filters
| Objective | Wireshark display filter |
|---|---|
| FTP control traffic | `ftp || tcp.port == 21` |
| FTP username / password commands | `ftp.request.command == "USER" || ftp.request.command == "PASS"` |
| HTTP requests | `http.request` |
| HTTP form post | `http.request.method == "POST"` |
| Telnet | `telnet` |
| ARP replies | `arp.opcode == 2` |
| ICMP | `icmp` |
| TCP SYN without ACK | `tcp.flags.syn == 1 && tcp.flags.ack == 0` |
| DNS / LLMNR / NBNS | `dns || llmnr || nbns` |

## Extract fields / inspect packets
```bash
tshark -r <PCAP_FILE> -Y 'ftp.request.command == "USER" || ftp.request.command == "PASS"' -T fields -e frame.number -e ip.src -e ip.dst -e ftp.request.command -e ftp.request.arg
tshark -r <PCAP_FILE> -Y 'http.request' -T fields -e frame.number -e ip.src -e http.host -e http.request.method -e http.request.uri
tshark -r <PCAP_FILE> -Y 'tcp.flags.syn==1 && tcp.flags.ack==0' -T fields -e ip.src -e ip.dst | sort | uniq -c | sort -nr | head
```

## Export objects
Wireshark: **File → Export Objects → HTTP** (or SMB when supported), select the object and save it to the task directory. Inspect saved artifacts with `file`, `sha256sum` and `strings`.

## Answer path
Record frame number, timestamp, protocol field and exact value. For suspected DDoS / SYN flood, compare source diversity and rates over a time window; a single SYN is not proof. For ARP spoofing, compare repeated IP-to-MAC mappings.

## Troubleshooting
- No fields: protocol dissector may not recognize the traffic; use packet bytes and follow the TCP stream.
- No credentials: protocol may be encrypted or outside the capture window.
- Wrong format: filters are case-sensitive and version-specific; use autocomplete.
