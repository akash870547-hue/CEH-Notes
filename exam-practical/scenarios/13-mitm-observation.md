# 13 - ARP / LLMNR / Responder Observation

## Trigger
Identify ARP spoofing, LLMNR / NBT-NS traffic, or a Responder-related artifact.

Prefer a supplied capture. Active interception can expose credentials or disrupt service, so use live tooling only on a dedicated, explicitly authorized lab segment.

## Passive observation
```bash
ip -brief address
ip route
sudo tcpdump -ni <LAB_INTERFACE> 'arp or port 5355 or port 137 or port 53'
```

Wireshark filters:
```text
arp
arp.opcode == 2
llmnr || nbns
udp.port == 5355 || udp.port == 137
```

## Responder
```bash
responder -h
sudo responder -I <LAB_INTERFACE> -A
```

The `-A` option is analyze-only in common versions; check the installed version's help first. Do not run active poisoning responses outside the specifically assigned isolated exercise.

## Evidence / answer path
For ARP, compare IP-to-MAC mappings across frames and record frame number / timestamp. For LLMNR / NBNS, record queried name, sender and response. Use the exact PCAP field or lab artifact requested.

## Troubleshooting
- No packets: verify interface / PCAP time window and task topology.
- Wrong interface: inspect `ip -brief address`.
- Same IP changes MAC: correlate with legitimate failover / duplicate-IP possibilities before declaring spoofing.
