# 02 - Network Traffic Analysis and PCAP Forensics

> **Input:** Prefer the capture file supplied by the task. Capture and inspect traffic only on networks you are authorized to monitor. A filter narrows evidence; it does not establish malicious intent by itself.

## Quick reference

| Objective | Wireshark display filter / CLI | Answer location |
|---|---|---|
| FTP username / password commands | `ftp.request.command == "USER" || ftp.request.command == "PASS"` | FTP request argument, packet number, stream |
| HTTP form submission | `http.request.method == "POST"` | Request body / Follow TCP Stream |
| Telnet | `telnet` | Reassembled stream, only if payload is unencrypted |
| SYN-heavy traffic | `tcp.flags.syn == 1 && tcp.flags.ack == 0` | Frame time, source/destination, packet rate |
| ICMP messages / payload | `icmp` or `icmp && data.data` | ICMP fields and packet bytes |
| ARP mapping changes | `arp.opcode == 2` | Sender IP / MAC, timing, repeated conflicts |
| DCE/RPC | `dcerpc` | RPC endpoint, operation fields, frame |
| MQTT PUBLISH | `mqtt.msgtype == 3` | Topic / payload in packet details |
| Capture inventory | `capinfos <PCAP_FILE>` | Time range, packet count, capture interfaces |
| Protocol hierarchy | `tshark -r <PCAP_FILE> -q -z io,phs` | Top-level protocol counts |

## Scenario archetypes

| If the question asks… | Start with | Then extract |
|---|---|---|
| “Find the FTP password” | Filter FTP USER/PASS commands | `ftp.request.arg` and frame number |
| “Identify source of a SYN flood” | Filter SYN without ACK | Group packet counts by source and compare rate |
| “Determine whether this is DDoS” | Endpoints / Conversations / I/O Graph | Multiple sources, packet rate, time window, target |
| “Find RPC endpoint / operation” | `dcerpc` / `epm` | Port mapper response, endpoint and packet details |
| “Find MQTT topic / message” | `mqtt` or PUBLISH only | Topic and payload fields |
| “Export an object from the trace” | File → Export Objects | Save artifact; hash and inspect it |
| “Find ARP spoof evidence” | ARP replies | One IP associated with multiple MACs over time |

## Core command syntax

### 1. Capture inventory and protocol hierarchy

```bash
capinfos <PCAP_FILE>
tshark -r <PCAP_FILE> -q -z io,phs
tshark -r <PCAP_FILE> -q -z conv,tcp
tshark -r <PCAP_FILE> -q -z endpoints,ip
```

### 2. Extract protocol-specific evidence

```bash
# FTP USER / PASS request fields (cleartext FTP only)
tshark -r <PCAP_FILE> -Y 'ftp.request.command == "USER" || ftp.request.command == "PASS"' -T fields -e frame.number -e frame.time -e ip.src -e ip.dst -e ftp.request.command -e ftp.request.arg

# HTTP request path and method
tshark -r <PCAP_FILE> -Y 'http.request' -T fields -e frame.number -e frame.time -e ip.src -e ip.dst -e http.host -e http.request.method -e http.request.uri

# Telnet packets and IPs; inspect stream in Wireshark for reassembled text
tshark -r <PCAP_FILE> -Y telnet -T fields -e frame.number -e ip.src -e ip.dst -e tcp.stream

# RPC / DCE-RPC packets
tshark -r <PCAP_FILE> -Y dcerpc -T fields -e frame.number -e frame.time -e ip.src -e ip.dst -e tcp.srcport -e tcp.dstport

# MQTT packets and parsed topic / client ID fields when available
tshark -r <PCAP_FILE> -Y mqtt -T fields -e frame.number -e ip.src -e ip.dst -e mqtt.msgtype -e mqtt.clientid -e mqtt.topic
```

Field availability depends on the Wireshark/TShark version and protocol dissection. If a field is rejected, use the installed display-filter autocomplete or inspect the packet tree.

### 3. SYN / ICMP / source counts

```bash
# SYN packets without ACK: evidence for connection-attempt analysis
tshark -r <PCAP_FILE> -Y 'tcp.flags.syn == 1 && tcp.flags.ack == 0' -T fields -e frame.time_epoch -e ip.src -e ip.dst -e tcp.dstport > syn-events.tsv

# Top source IP counts for those packets
tshark -r <PCAP_FILE> -Y 'tcp.flags.syn == 1 && tcp.flags.ack == 0 && ip.src' -T fields -e ip.src | sort | uniq -c | sort -nr | head -n 20

# Top source IP counts for ICMP
tshark -r <PCAP_FILE> -Y 'icmp && ip.src' -T fields -e ip.src | sort | uniq -c | sort -nr | head -n 20

# ICMP with a dissected data payload; inspect bytes / stream manually if blank
tshark -r <PCAP_FILE> -Y 'icmp && data.data' -T fields -e frame.number -e ip.src -e ip.dst -e data.data
```

### 4. MQTT message inspection

```bash
# PUBLISH messages (MQTT message type 3)
tshark -r <PCAP_FILE> -Y 'mqtt.msgtype == 3' -T fields -e frame.number -e ip.src -e ip.dst -e mqtt.topic

# All MQTT control packets
tshark -r <PCAP_FILE> -Y mqtt
```

Select the packet and expand MQTT. The topic and payload may be visible if the traffic is not protected by TLS and the dissector has enough bytes. Do not treat the CONNECT username/password **flags** as the credentials themselves.

### 5. Export files from a PCAP

In Wireshark, open the assigned capture and choose **File → Export Objects → HTTP** (or **SMB** if that object exporter exists in the installed build). Select only the artifact required by the task and save it to a task directory.

```bash
file <EXPORTED_FILE>
sha256sum <EXPORTED_FILE>
strings -n 6 <EXPORTED_FILE> | head -n 100
```

## Interpretation and output analysis

### Credentials
- FTP `USER` / `PASS` commands may expose username and password on an unencrypted control channel.
- HTTP POST does **not** mean credentials are present. Inspect the body and content type.
- HTTP Basic Authorization is Base64-encoded, not encryption; decode only in an authorized evidence workflow.
- HTTPS / TLS payloads are normally not readable from a passive capture without authorized session keys or decryption material.
- Record frame number and `tcp.stream`; use **Follow → TCP Stream** to reconstruct context.

### DoS / DDoS indicators
- **SYN flood hypothesis:** unusually high SYN-without-ACK rate toward a service, high incomplete connection count or repeated SYNs over a short interval.
- **DDoS hypothesis:** converging traffic from multiple source addresses to the same service with correlated timing and elevated volume.
- **ICMP flood hypothesis:** unusual ICMP packet rate / byte rate, compared with baseline and other time windows.
- Correlate packet rate, bytes, destination, TCP flags, source diversity and time. A single SYN or ICMP packet is not a flood.

### ARP spoofing / poisoning
Check whether the same IPv4 address maps to different MAC addresses in a short interval, whether unsolicited ARP replies occur, and whether the claimed gateway mapping changes. Account for legitimate failover, duplicate IPs and capture vantage before concluding spoofing.

### RPC / MQTT
- RPC ports and protocol labels alone may not identify the called operation. Inspect endpoint mapper responses and decoded DCE/RPC details.
- MQTT PUBLISH identifies the topic and message type; payload visibility depends on protocol decoding and whether TLS is used.

## Fast filters and CLI parsing

| Need | Expression |
|---|---|
| FTP login commands | `ftp.request.command == "USER" || ftp.request.command == "PASS"` |
| HTTP methods | `http.request.method` exists; use `http.request` |
| HTTP Basic Authorization | `http.authorization` |
| SYN without ACK | `tcp.flags.syn == 1 && tcp.flags.ack == 0` |
| TCP resets | `tcp.flags.reset == 1` |
| DNS | `dns` |
| ARP replies | `arp.opcode == 2` |
| DCE/RPC | `dcerpc` |
| MQTT | `mqtt` |
| Top IPs from filtered trace | `tshark ... -T fields -e ip.src | sort | uniq -c | sort -nr` |

## Edge cases and troubleshooting

| Symptom | Fallback |
|---|---|
| Display filter yields no packets | Verify protocol and capture time window; remove one condition at a time. |
| No username/password text | Traffic may be TLS, credentials may be in a POST body, or capture starts after authentication. |
| MQTT fields blank | Confirm traffic is MQTT (often TCP 1883) and inspect packet bytes / TCP stream. |
| RPC not decoded | Use **Decode As**, check TCP/UDP port and inspect endpoint-mapper traffic. |
| Source count suggests one system | NAT / proxy may aggregate many clients; correlate timing and conversation data. |
| Capture is huge | Filter with `-Y`, extract specific fields and avoid dumping full payloads. |
| Export Objects is empty | Recheck protocol dissection, TCP reassembly settings and whether object transfers are complete. |
| Filter syntax invalid | Use local display-filter autocomplete or field reference for the installed Wireshark version. |

## References

- [Wireshark display-filter syntax](https://www.wireshark.org/docs/man-pages/wireshark-filter.html)
- [Wireshark FTP filter fields](https://www.wireshark.org/docs/dfref/f/ftp.html)
- [Wireshark DCE/RPC reference](https://www.wireshark.org/docs/dfref/d/dcerpc.html)
- [Wireshark MQTT reference](https://www.wireshark.org/docs/dfref/m/mqtt.html)
- [Wireshark SMB2 reference](https://www.wireshark.org/docs/dfref/s/smb2.html)
