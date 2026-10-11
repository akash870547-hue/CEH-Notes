# Module 08 — Sniffing

## Exam objective
Capture and analyze authorized network traffic, distinguish capture filters from display filters, interpret common protocols and explain why TLS limits payload visibility.

## 1. Identify capture interface
```bash
ip addr
ip route
tcpdump -D
``
Choose the interface attached to the course virtual network. Capturing on Wi-Fi/host interface instead of a lab VM interface is a common reason for empty results.

## 2. tcpdump: bounded capture patterns
```bash
sudo tcpdump -i <INTERFACE> -nn -c 50
sudo tcpdump -i <INTERFACE> -nn 'host <LAB_IP>' -c 100
sudo tcpdump -i <INTERFACE> -nn 'port 53' -c 100
sudo tcpdump -i <INTERFACE> -nn 'arp or icmp' -c 100
sudo tcpdump -i <INTERFACE> -nn -w lab.pcap -c 200
tcpdump -nn -r lab.pcap
``
- `-i`: interface; `-nn`: no name/service resolution; `-c`: packet cap; `-w/-r`: write/read capture.
Capture only what is needed; pcaps can contain credentials/tokens and must be protected.

## 3. Wireshark display filters
- DNS: `dns`
- ARP: `arp`
- ICMP: `icmp`
- Only lab IP: `ip.addr == <LAB_IP>`
- HTTP requests: `http.request`
- HTTP errors: `http.response.code >= 400`
- TCP port: `tcp.port == 80`
- SYN without ACK: `tcp.flags.syn == 1 && tcp.flags.ack == 0`
- Retransmissions: `tcp.analysis.retransmission`

Capture filters (BPF) apply before packets are recorded; display filters apply after capture. A valid display filter cannot bring back packets that were never captured.

## 4. TShark command-line analysis
```bash
tshark -D
tshark -r lab.pcap -Y 'dns'
tshark -r lab.pcap -Y 'http.request' -T fields -e frame.time -e ip.src -e http.host -e http.request.uri
``
Field names and protocol dissection vary by version. Use `tshark -G fields` to check fields if a query fails.

## 5. Protocol clues
- **ARP:** resolves local IPv4-to-MAC mappings; unexpected changes need corroboration.
- **DNS:** query type/name, response code and TTL help explain name resolution.
- **TCP:** SYN/SYN-ACK/ACK is a common connection setup; resets/timeouts have multiple causes.
- **DHCP:** lease/address assignment visibility in the local broadcast domain.
- **HTTP:** request/response data may be readable if unencrypted.
- **TLS/HTTPS:** most application payload is encrypted; certificate/SNI/handshake data may still be visible depending on version and configuration.

## 6. Spoofing/MITM indicators and defenses
Indicators: unusual ARP mapping changes, duplicate IP claims, unexpected gateway MAC, odd DNS responses or certificate warnings. No single clue proves an attack. Validate against known inventory/logs. Defenses include TLS validation, switch protections such as DHCP snooping/DAI where supported, segmented networks and monitoring.

## 7. Troubleshooting
- Empty capture: wrong interface, inactive test traffic, VM network mode or capture filter too narrow.
- Names obscure output: use `-nn`.
- Too much traffic: add host/port filter or capture count.
- HTTPS body unreadable: expected without legitimate keys in a controlled lab.
- Strange retransmission/reset: packet loss, filtering, server/client behavior and capture loss may look similar.

## Lab drill
Capture a small approved sequence while making one DNS request and one HTTP request to the lab. Filter both protocols and annotate the timestamp, source/destination, query/request and response.

**Related:** [Packet-analysis tool guide](../tools/packet-analysis.md) · [Nmap](../tools/nmap.md)