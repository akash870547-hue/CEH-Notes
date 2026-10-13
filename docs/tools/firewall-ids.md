# Firewall, IDS and IPS — Snort, Suricata, UFW and nftables

Use this guide for configuration review, alert interpretation and benign lab validation. Do not alter firewall rules or disable IDS/IPS protections on shared systems without an approved change/rollback plan.

## 1. Inspect local network policy
```bash
sudo ufw status verbose
sudo nft list ruleset
sudo iptables -S
sudo firewall-cmd --state
sudo firewall-cmd --list-all
```
Not every command exists on every distro; these are alternative firewall front ends. Prefer the active manager's read-only status/rule display. Don't mix UFW/nftables/iptables changes blindly.

## 2. Snort/Suricata version and service status
```bash
snort -V
suricata --build-info
systemctl status suricata
systemctl status snort
```
One sensor may be installed, both may be absent, and service names/log paths vary. Use the lab-provided sensor.

## 3. Inspect alerts and logs
```bash
sudo tail -n 100 /var/log/suricata/fast.log
sudo tail -n 100 /var/log/snort/alert
journalctl -u suricata --since '30 minutes ago'
```
Record timestamp, signature/message, source/destination, port/protocol and action. Logs may be JSON or another format; use the actual lab path.

## 4. Analyze a supplied pcap with an IDS
Where a lab-provided configuration/ruleset exists, use its documented test/replay workflow. Avoid launching an IDS against a broad production interface or changing live rules during an exam. Replay of a supplied pcap is more reproducible than generating attack traffic.

## 5. Interpret detection properly
- **Alert ≠ confirmed attack:** a signature can match benign traffic.
- **No alert ≠ secure:** traffic may not cross the sensor, a rule may be disabled, capture may be lost, or traffic may not match.
- **IDS vs IPS:** IDS usually alerts; IPS may block inline.
- **Firewall vs IDS:** firewall enforces traffic policy; IDS detects patterns. A stateful firewall tracks connection state; a WAF focuses on web/application behavior.
- **Honeypot/canary alerts:** high-signal but still require correlation/context.

## 6. Controlled validation workflow
1. Confirm lab sensor, rule and expected action.
2. Use only a benign test supplied by the course.
3. Capture sensor and host timestamps.
4. Confirm alert/block behavior and compare to expected rule.
5. Change a copied lab rule only if explicitly requested.
6. Document rollback and verify the rule remains enabled.

## 7. Troubleshooting
- Service inactive: check lab service name/config path and status.
- Empty alert file: no match, wrong path, sensor inactive or filtering.
- Too many alerts: examine rule, asset baseline and false-positive pattern before tuning.
- Rule fails to load: validate installed version/config, then restore known-good config.
- Never delete evidence or disable a rule merely to silence an alert.

References: [Snort docs](https://docs.snort.org/) · [Suricata docs](https://docs.suricata.io/) · [nftables wiki](https://wiki.nftables.org/)
