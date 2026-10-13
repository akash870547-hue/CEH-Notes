# 02 - Network Traffic Analysis and PCAP Forensics

> **Input:** Prefer the PCAP supplied by the task. Live capture is only for a network you are explicitly authorized to monitor. Filters narrow evidence; they do not independently prove malicious intent.

## Quick reference

| Objective | Display filter / CLI | Evidence field |
|---|---|---|
| FTP login commands | `ftp.request.command == "USER" || ftp.request.command == "PASS"` | Request argument, frame, TCP stream |
| HTTP form submits | `http.request.method == "POST"` | URI, headers, decoded body |
| Telnet | `telnet` | Follow TCP Stream if unencrypted |
| SYN flood candidate | `tcp.flags.syn == 1 && tcp.flags.ack == 0` | Time, source, target, packet rate |
| ICMP activity | `icmp` | Type/code, src/dst, payload bytes |
| ARP replies | `arp.opcode == 2` | Sender IP/MAC, changing mappings |
| RPC | `dcerpc` | Frame, endpoints, operation details |
| MQTT PUBLISH | `mqtt.msgtype == 3` | Topic and decoded payload if visible |
| Protocol inventory | `tshark -r <PCAP_FILE> -q -z io,phs` | Protocol counts |
| Top talkers | `tshark ... -T fields -e ip.src | sort | uniq -c | sort -nr` | Source IP packet counts |

## Scenario archetypes

| If the question asks… | First action | Exact answer usually comes from |
|---|---|---|
| Find FTP username / password | Filter USER/PASS commands | `ftp.request.arg` and packet / stream |
| Identify SYN-flood source | Filter SYN without ACK | Source counts by time and destination port |
| Distinguish DoS from DDoS | Endpoints + Conversations + I/O Graph | Rate, volume, source diversity, timeline |
| Identify RPC traffic / endpoint | `dcerpc` / endpoint mapper packets | Packet tree, port and call details |
| Find MQTT topic / sensor data | Filter MQTT PUBLISH packets | Topic and PUBLISH payload |
| Export HTTP / SMB object | File → Export Objects | Saved artifact and its file contents |
| Detect ARP spoof indicator | Compare ARP replies | IP-to-MAC changes across frames |

## Core command / tool syntax

### Inventory and protocol hierarchy

```bash
capinfos <PCAP_FILE>
tshark -r <PCAP_FILE> -q -z io,phs
tshark -r <PCAP_FILE> -q -z conv,tcp
tshark -r <PCAP_FILE> -q -z endpoints,ip
```

### Extract protocol evidence

```bash
# FTP USER / PASS commands; works only if FTP control payload is visible
tshark -r <PCAP_FILE> -Y 'ftp.request.command == "USER" || ftp.request.command == "PASS"' -T fields -e frame.number -e frame.time -e ip.src -e ip.dst -e ftp.request.command -e ftp.request.arg

# HTTP method / host / URI
tshark -r <PCAP_FILE> -Y http.request -T fields -e frame.number -e frame.time -e ip.src -e ip.dst -e http.host -e http.request.method -e http.request.uri

# Telnet packets / streams
tshark -r <PCAP_FILE> -Y telnet -T fields -e frame.number -e ip.src -e ip.dst -e tcp.stream

# DCE/RPC packets
tshark -r <PCAP_FILE> -Y dcerpc -T fields -e frame.number -e frame.time -e ip.src -e ip.dst -e tcp.srcport -e tcp.dstport

# MQTT parsed fields if protocol dissector recognizes the payload
tshark -r <PCAP_FILE> -Y mqtt -T fields -e frame.number -e ip.src -e ip.dst -e mqtt.msgtype -e mqtt.clientid -e mqtt.topic
```

Field names can vary with Wireshark/TShark version and protocol dissection. If a field is rejected, use display-filter autocomplete and inspect the packet tree.

### SYN / ICMP / source concentration

```bash
# Time and source / destination for initial SYNs
tshark -r <PCAP_FILE> -Y 'tcp.flags.syn == 1 && tcp.flags.ack == 0' -T fields -e frame.time_epoch -e ip.src -e ip.dst -e tcp.dstport > syn-events.tsv

# Most frequent source IPs among SYN-without-ACK frames
tshark -r <PCAP_FILE> -Y 'tcp.flags.syn == 1 && tcp.flags.ack == 0 && ip.src' -T fields -e ip.src | sort | uniq -c | sort -nr | head -n 20

# Most frequent ICMP source IPs
tshark -r <PCAP_FILE> -Y 'icmp && ip.src' -T fields -e ip.src | sort | uniq -c | sort -nr | head -n 20

# ICMP packets with generic dissected data; inspect raw bytes if no value is shown
tshark -r <PCAP_FILE> -Y 'icmp && data.data' -T fields -e frame.number -e ip.src -e ip.dst -e data.data
```

### MQTT inspection

```bash
# MQTT PUBLISH packets (message type 3)
tshark -r <PCAP_FILE> -Y 'mqtt.msgtype == 3' -T fields -e frame.number -e ip.src -e ip.dst -e mqtt.topic

# All MQTT packets
tshark -r <PCAP_FILE> -Y mqtt
```

Select the frame and expand MQTT to inspect its topic and payload. Payload visibility depends on TLS and capture completeness. CONNECT username/password **flags** do not themselves show the credential value.

### Export artifacts

In Wireshark choose **File → Export Objects → HTTP** (or SMB if supported by the installed build). Save only the object relevant to the task.

```bash
file <EXPORTED_FILE>
sha256sum <EXPORTED_FILE>
strings -n 6 <EXPORTED_FILE> | head -n 100
```

## Interpretation and output analysis

- FTP USER/PASS fields can show credentials because standard FTP control traffic is plaintext. Do not assume all FTP-related payloads are credentials.
- HTTP POST is just a method; inspect the request body and content type to determine what was submitted.
- HTTP Basic Authorization is Base64 encoding, not encryption. Decode only within authorized evidence handling.
- HTTPS/TLS payloads are normally unreadable without authorized session keys / decryption material.
- Use frame number and `tcp.stream` as evidence locators; **Follow → TCP Stream** reconstructs context.
- A SYN flood hypothesis requires unusually high SYN-without-ACK rate toward a service in a time window. A DDoS hypothesis should include multiple sources and correlated traffic to a target. One SYN is not an attack.
- ICMP volume must be compared with baseline, timing and other traffic.
- For ARP spoofing, look for conflicting IP-to-MAC mappings and timing; legitimate failover or duplicate IPs can also explain changes.
- For RPC, use endpoint mapper and decoded details rather than inferring the operation from port number alone.
- MQTT topic and PUBLISH payload are visible only when decoded and not protected by TLS.

## Wireshark filters / CLI parsing

| Need | Filter / expression |
|---|---|
| FTP auth commands | `ftp.request.command == "USER" || ftp.request.command == "PASS"` |
| HTTP requests | `http.request` |
| HTTP Basic auth header | `http.authorization` |
| SYN without ACK | `tcp.flags.syn == 1 && tcp.flags.ack == 0` |
| TCP resets | `tcp.flags.reset == 1` |
| DNS | `dns` |
| ARP replies | `arp.opcode == 2` |
| RPC | `dcerpc` |
| MQTT | `mqtt` |
| Top source IPs | `tshark -r <PCAP_FILE> -Y <FILTER> -T fields -e ip.src | sort | uniq -c | sort -nr` |

## Edge cases and troubleshooting

| Symptom | Fallback |
|---|---|
| Filter yields nothing | Check protocol and capture time range; remove one filter clause at a time. |
| No credentials visible | Traffic may be encrypted, login may precede capture, or data may be in a POST body. |
| MQTT fields blank | Confirm packet decode and port; inspect stream / packet bytes. |
| RPC not decoded | Use Decode As where appropriate; verify protocol and port assumptions. |
| Many source packets from one IP | NAT/proxy may aggregate clients; correlate conversations and timing. |
| Large capture / slow CLI | Filter with `-Y`, extract selected fields and limit printed output. |
| Export Objects is empty | Check protocol dissection, TCP reassembly and whether transfer is complete. |
| Invalid field name | Use local filter autocomplete / field reference for the installed version. |

## References

- [Wireshark display-filter syntax](https://www.wireshark.org/docs/man-pages/wireshark-filter.html)
- [Wireshark FTP filter fields](https://www.wireshark.org/docs/dfref/f/ftp.html)
- [Wireshark DCE/RPC reference](https://www.wireshark.org/docs/dfref/d/dcerpc.html)
- [Wireshark MQTT reference](https://www.wireshark.org/docs/dfref/m/mqtt.html)
- [Wireshark SMB2 reference](https://www.wireshark.org/docs/dfref/s/smb2.html)
