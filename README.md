# CEH v13 Practical Notes 🛡️

A practical-revision knowledge base for the **Certified Ethical Hacker (CEH) v13** curriculum. Built for lab preparation and quick revision—not a dump of unverified "exam answers."

> **Use responsibly:** perform active testing only in your EC-Council Cyber Range, instructor-provided lab, or systems you own and are explicitly authorized to test. Never aim scans, password testing, packet interception, exploit tools, or stress tests at public/third-party targets without written authorization.

## Start here

- **[Practical exam workflow](EXAM-WORKFLOW.md)** — a repeatable method for scenario/flag-based tasks.
- **[Tool & command cheat sheet](TOOLS-CHEATSHEET.md)** — syntax patterns, output clues, and quick troubleshooting.
- **[Recon → scanning → enumeration](modules/PHASE-1-RECON-SCAN-ENUM.md)** — the first assessment workflow.
- **[Web and perimeter practicals](modules/PHASE-3-WEB-PERIMETER.md)** — HTTP, app testing, SQLi concepts and evidence.
- **[Rapid revision checklist](REVISION-CHECKLIST.md)** — last-day recall and common mistakes.

## Official module map (20 modules)

- [Module 01: Introduction to Ethical Hacking](modules/01-introduction-to-ethical-hacking.md)
- [Module 02: Footprinting and Reconnaissance](modules/02-footprinting-and-reconnaissance.md)
- [Module 03: Scanning Networks](modules/03-scanning-networks.md)
- [Module 04: Enumeration](modules/04-enumeration.md)
- [Module 05: Vulnerability Analysis](modules/05-vulnerability-analysis.md)
- [Module 06: System Hacking](modules/06-system-hacking.md)
- [Module 07: Malware Threats](modules/07-malware-threats.md)
- [Module 08: Sniffing](modules/08-sniffing.md)
- [Module 09: Social Engineering](modules/09-social-engineering.md)
- [Module 10: Denial-of-Service](modules/10-denial-of-service.md)
- [Module 11: Session Hijacking](modules/11-session-hijacking.md)
- [Module 12: Evading IDS, Firewalls, and Honeypots](modules/12-evading-ids-firewalls-and-honeypots.md)
- [Module 13: Hacking Web Servers](modules/13-hacking-web-servers.md)
- [Module 14: Hacking Web Applications](modules/14-hacking-web-applications.md)
- [Module 15: SQL Injection](modules/15-sql-injection.md)
- [Module 16: Hacking Wireless Networks](modules/16-hacking-wireless-networks.md)
- [Module 17: Hacking Mobile Platforms](modules/17-hacking-mobile-platforms.md)
- [Module 18: IoT Hacking](modules/18-iot-hacking.md)
- [Module 19: Cloud Computing](modules/19-cloud-computing.md)
- [Module 20: Cryptography](modules/20-cryptography.md)

Each module note includes: what to recognize, a lab workflow, evidence to capture, likely troubleshooting points, defensive takeaway, and self-check questions. Tools and menu names vary by OS, lab image, and installed version—follow the lab guide when it differs.

## A practical task loop

1. Read the objective and identify exact scope, target, and required output (often a value/flag or a finding).
2. Confirm connectivity and identify the relevant service or application.
3. Select the smallest relevant tool/action; start with observation before active testing.
4. Record the exact command, key output, target, time, and conclusion.
5. Verify the result using a second signal where possible; do not assume a tool banner alone proves a vulnerability.
6. Save the required evidence and submit the requested format; then stop when the objective is met.

## CEH v13 Engage reminder

Official CEH v13 Engage is organized as four scenario-driven phases. Plan the workflow around the stated task and its scope rather than trying random tools. A common broad flow is reconnaissance and assessment, gaining access in the range, perimeter/web assessment, and mobile/IoT/OT/cloud-related work. The actual lab guide and objective are authoritative for your sitting.

## Sources

- [EC-Council CEH v13 course outline](https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/)
- [EC-Council CEH Engage](https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh-engage/)
- [Official CEH v13 Labs course outline](https://ec-council-international.myshopify.com/products/certified-ethical-hacker-ceh-version-13-labs)

**Important:** this is an independent study aid, not an official EC-Council publication. Module coverage follows the published course outline; your practical tasks can differ by lab and exam version.
