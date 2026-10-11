# hping3 — Packet-Level Network Diagnostics

`hping3` can craft TCP/UDP/ICMP packets. Packet crafting can trigger alerts and affect services; use a designated lab IP, low packet counts, and avoid flood modes.

## 1. Check and syntax
```bash
hping3 --version
hping3 --help
```
General structure:
```bash
hping3 [mode/options] <LAB_IP>
```

## 2. Small-count reachability probes
```bash
hping3 -1 -c 3 <LAB_IP>                 # ICMP mode, 3 probes
sudo hping3 -S -p 443 -c 3 <LAB_IP>     # TCP SYN to selected lab port
sudo hping3 -A -p 443 -c 3 <LAB_IP>     # TCP ACK probe
sudo hping3 -U -p 53 -c 3 <LAB_IP>      # UDP probe to selected port
```
- `-1`: ICMP mode.
- `-S`: SYN flag.
- `-A`: ACK flag.
- `-U`: UDP mode.
- `-p`: destination port.
- `-c`: packet count; bounded checks only.
Results depend on filtering, local privilege and target behavior. No response does not prove the host is down.

## 3. TTL and path troubleshooting
```bash
sudo hping3 -S -p 443 -c 2 -t 1 <LAB_IP>
```
`-t` sets TTL. This can help observe hop-related behavior in a lab, but use normal `traceroute`/`tracepath` first.

## 4. Save supporting evidence
Capture the test on your authorized interface with Wireshark/tcpdump and correlate timestamps, flags, source/destination addresses and replies. Use a small count and stop.

## 5. Avoid these mistakes
- Never use flood/high-rate switches against shared or external systems.
- Do not infer port state from one unanswered crafted packet.
- Confirm the correct interface, route, protocol and port.
- Distinguish a firewall drop from a service not listening.
- Keep source spoofing outside normal practice unless the isolated lab explicitly calls for it and the instructor explains return-path limitations.

References: `man hping3` on the lab VM; [Nmap/hping network diagnostics context](https://nmap.org/book/man.html)
