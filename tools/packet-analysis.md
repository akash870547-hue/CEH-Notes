# Wireshark, tcpdump and tshark — Basic to Advanced

Use a capture from the lab or capture only on the assigned lab interface/network. Packet captures may contain credentials, tokens and personal information; keep them private and redact before sharing.

## 1. Identify interfaces and versions
```bash
wireshark --version
tshark --version
tcpdump --version
ip addr
tcpdump -D
``

## 2. tcpdump basics
```bash
sudo tcpdump -i <INTERFACE> -nn -c 50
sudo tcpdump -i <INTERFACE> -nn 'host <LAB_IP>' -c 100
sudo tcpdump -i <INTERFACE> -nn 'port 53' -c 100
sudo tcpdump -i <INTERFACE> -nn 'tcp port 80' -c 50
``
- `-i`: interface.
- `-n/-nn`: disable name/service resolution.
- `-c`: stop after N packets.
- BPF filters such as `host`, `net`, `port`, `tcp`, `udp`, `icmp` can limit capture.

Save to a pcap:
```bash
sudo tcpdump -i <INTERFACE> -nn -c 200 -w lab-capture.pcap
tcpdump -nn -r lab-capture.pcap
``

## 3. Wireshark display filters
Common filters:
- `dns`
- `arp`
- `icmp`
- `tcp`
- `udp`
- `tcp.port == 80`
- `tcp.port == 443`
- `ip.addr == <LAB_IP>`
- `ip.src == <LAB_IP>`
- `ip.dst == <LAB_IP>`
- `http.request`
- `http.response.code >= 400`
- `tcp.flags.syn == 1 && tcp.flags.ack == 0`
- `tcp.analysis.retransmission`
- `tls.handshake.type == 1` (ClientHello in common Wireshark versions)

Display filters are not the same as capture filters. If a filter yields nothing, remove it and check whether packets exist first.

## 4. tshark for terminal analysis
```bash
tshark -D
tshark -i <INTERFACE> -c 50
tshark -r lab-capture.pcap
tshark -r lab-capture.pcap -Y 'dns'
tshark -r lab-capture.pcap -Y 'http.request' -T fields -e frame.time -e ip.src -e http.host -e http.request.uri
``
Always verify field names with the installed version and `tshark -G fields` if a field is unknown.

## 5. Follow a conversation
In Wireshark: select a TCP packet → right-click → **Follow → TCP Stream**. This reconstructs stream content where it is available. TLS-encrypted application data remains encrypted unless you have legitimate keys and a controlled test setup.

## 6. Protocol clues
- DNS: query name, type, response code and TTL.
- ARP: who has/replies; unexpected MAC mappings can be suspicious but require context.
- TCP handshake: SYN → SYN/ACK → ACK; missing replies can imply filtering or loss.
- HTTP: method, host/path, status and headers.
- TLS: handshake, SNI (if visible), certificate and negotiated parameters; encrypted payload is not plain text.
- ICMP: type/code and errors that can help explain reachability.

## 7. Troubleshooting
- Permission error: use the lab's approved capture privileges.
- No packets: wrong interface, VM network mode, inactive traffic or overly narrow filter.
- Huge file: use a packet count or capture filter for the specific lab task.
- Name resolution noise: add `-n` while troubleshooting.
- Data appears sensitive: close/redact and store capture safely.

References: [Wireshark display filters](https://www.wireshark.org/docs/dfref/) · [tcpdump man page](https://www.tcpdump.org/manpages/tcpdump.1.html)
