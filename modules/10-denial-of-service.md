# Module 10 — Denial-of-Service (DoS)

## Exam objective
Differentiate DoS from DDoS, identify likely resource bottlenecks from telemetry and capture, and recommend controlled mitigation. This module uses **analysis and low-impact diagnostics**; it does not provide traffic-flood commands.

## 1. Concepts
- **DoS:** one or more sources exhaust a resource or prevent legitimate use.
- **DDoS:** distributed sources make blocking harder and usually require provider/upstream coordination.
- **Volumetric:** bandwidth/packet capacity saturated.
- **Protocol/state exhaustion:** connection tables or protocol resources consumed.
- **Application layer:** expensive requests or request rates overwhelm app/database resources.
- **Legitimate traffic spike:** may resemble an attack; correlate with business events and request mix.

## 2. Inspect host resource pressure
Linux:
```bash
uptime
top
free -h
vmstat 1 5
ss -s
ss -ant | head -n 30
journalctl -p warning --since '30 minutes ago'
``
If available, `sar -n DEV 1 5` reports network interface statistics. Windows: Task Manager/Resource Monitor, `Get-Counter`, and relevant System/Application event logs.

## 3. Small, passive packet review
```bash
sudo tcpdump -i <INTERFACE> -nn -c 100 'host <LAB_IP>'
tshark -r <LAB_CAPTURE> -Y 'tcp.flags.syn == 1 && tcp.flags.ack == 0'
tshark -r <LAB_CAPTURE> -Y 'icmp'
``
Use supplied capture where possible. Many SYN packets alone do not prove a SYN flood; check completion rates, source diversity, packet rate, service metrics and baseline. Source IPs can be spoofed or shared.

## 4. Web/application evidence
Review web server access/error logs for:
- request rate and distribution over time;
- repeated expensive endpoints;
- status codes, response time and upstream errors;
- client/source diversity and user-agent patterns;
- correlation to CPU, memory, DB connections and load balancer health.

Do not publish logs with session identifiers or personal data.

## 5. Detection workflow
1. Confirm impact and affected service/time window.
2. Compare traffic/resource metrics with a normal baseline.
3. Correlate packet, edge/load-balancer, application and system logs.
4. Determine whether bottleneck is bandwidth, connection state, app CPU, database or dependency.
5. Apply approved mitigations (rate limits, caching, connection/resource limits, WAF rules, filtering, upstream DDoS service) and assess collateral impact.
6. Preserve evidence and verify recovery.

## 6. Defensive controls
Use capacity planning, rate limiting, connection/time limits, caching, request validation, queue/backpressure controls, redundant architecture and upstream DDoS mitigation. Firewall blocks alone may fail when traffic volume consumes the upstream link.

## Troubleshooting
- High CPU but normal network: investigate expensive application work/dependency failures.
- High bandwidth but low request count: consider large payloads or non-HTTP traffic.
- Many half-open connections: compare SYN/SYN-ACK/ACK ratios and service telemetry.
- 5xx burst: correlate with app/database health.
- One capture is not enough: capture loss and sampling can distort conclusions.

## Lab drill
Given a dashboard or pcap, identify the strongest evidence of saturation, name the likely resource, list one alternative explanation and propose two mitigations.

**Related:** [Packet analysis](../tools/packet-analysis.md) · [Log analysis](../tools/log-analysis.md)