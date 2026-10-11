# Module 12 — IDS, Firewalls and Honeypots

## Exam objective
Understand how network controls make allow/deny decisions, how IDS/IPS alerts are generated, why evasion concepts matter, and how to validate detection in a controlled range. The actionable workflow here is defensive analysis and authorized benign validation—not stealth instructions for real networks.

## 1. Know the control types
- **Stateless firewall:** evaluates packet fields/rules without per-connection state.
- **Stateful firewall:** tracks connection state and related packets.
- **WAF:** inspects HTTP/application-layer patterns and policy.
- **IDS:** detects and alerts; **IPS** may block inline.
- **NDR/packet analytics:** identifies network patterns from traffic.
- **Honeypot/canary:** decoy system/service/resource designed to create high-signal alerts.

## 2. Inspect packet/firewall evidence
From a provided pcap:
```bash
tshark -r <LAB_CAPTURE> -Y 'tcp.flags.syn == 1 && tcp.flags.ack == 0'
tshark -r <LAB_CAPTURE> -Y 'tcp.analysis.retransmission'
tshark -r <LAB_CAPTURE> -Y 'dns'
```
Correlate packet time/tuple with the firewall log, IDS signature, application log and lab rule. One packet pattern or alert alone rarely proves malicious intent.

For local service context:
```bash
ss -tulpen
ip route
```

## 3. Inspect Suricata/Snort alerts
File/log paths vary by installed version:
```bash
suricata --build-info
snort -V
sudo tail -n 100 /var/log/suricata/fast.log
sudo tail -n 100 /var/log/snort/alert
```
Use whichever sensor exists in the lab; do not assume both log paths are present. Preserve alert timestamp, signature/message, source/destination, ports, protocol and action. Follow local access permissions.

## 4. Safe validation procedure
1. Confirm scope and the specific control/signature to test.
2. Ask the lab guide for an approved benign test packet/request or test rule.
3. Generate only that expected test traffic from the assigned source.
4. Verify whether the sensor logs/blocks it.
5. Compare expected vs actual rule action and timestamps.
6. Tune a rule only in a copied lab configuration; document the change and rollback.

Do not use fragmentation, obfuscation, spoofing or bypass methods to evade a real control. In exam questions, be able to explain the concepts and how defenders detect/mitigate them.

## 5. Honeypot signals
Possible clues include an unexpected decoy banner, unusually instrumented service, special canary resource or alert-producing destination. These are not definitive proof by themselves. Don't probe or interact with a suspected honeypot outside explicit scope.

## 6. Common false positives and gaps
- An alert reports a pattern, not necessarily intent.
- Encrypted payload reduces content inspection; metadata/endpoint telemetry may still help.
- Packet normalization, segmentation and rule order affect what each control sees.
- An IDS configured to alert may not block.
- No alert can mean no matching traffic, sensor loss, disabled rule or wrong interface.
- Rule tuning must not create a blind spot for the same or related attacks.

## 7. Quick self-test
1. IDS vs IPS?
2. Stateful firewall vs WAF?
3. Which fields let you correlate an alert to a packet?
4. Why is "no alert" not proof a system is secure?
5. Why test a copied rule/config and keep rollback steps?

**Related:** [Firewall/IDS/IPS tools](../tools/firewall-ids.md) · [Packet analysis](../tools/packet-analysis.md) · [Log analysis](../tools/log-analysis.md) · [Practical workflow](../EXAM-WORKFLOW.md)