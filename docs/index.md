# CEH Practical Field Manual

Search-first revision notes for the CEH Practical and CEHv13 Engage learning environment. Each page is organized for rapid lookup: **scenario → command → output field → fallback**.

!!! warning "Use the assigned scope"
    Commands are templates for authorized iLabs / cyber-range targets and supplied artifacts. Replace placeholders with exact values from the objective. Never assume a target, installed tools, wordlist paths, or flag format.

## Start here

| Task clue | Open | First move |
|---|---|---|
| IP / subnet / open ports / NetBIOS | [Recon & Scanning](01-recon-scanning.md) | Confirm scope, discover hosts, identify open ports |
| PCAP / credentials / SYN / ARP / MQTT / RPC | [PCAP & Traffic](02-pcap-traffic.md) | Inventory capture, then filter relevant frames |
| Web headers / URL / SQL database / WASC ID | [Web & Databases](03-web-databases.md) | Capture status + headers; test one assigned parameter |
| Hash / file integrity / hidden message / encrypted volume | [Hashes, Crypto & Stego](04-hashes-crypto.md) | Identify format and calculate hash before deeper analysis |
| Android / ADB / PML / APK / CRC32 | [System & Mobile](05-system-mobile.md) | Confirm device serial or artifact path, then collect scoped evidence |
| Existing repo notes / module guides | [Existing Notes Library](existing-notes.md) | Open the existing 20-module and tool references |
| Local environment and branches | [Branch Notes](branches-notes.md) · [Local Preview](local-preview.md) | Work on a feature branch; preview before merging |

## Keyboard and lookup shortcuts

| Key / control | Use |
|---|---|
| `/` | Focus the Material search field on supported browsers |
| `↑` / `↓` | Move through visible search suggestions / results |
| `Enter` | Submit a search or open the selected result |
| `Esc` | Close the active search overlay or navigation drawer |
| Code-copy icon | Copy a code block without selecting its text |
| Left sidebar | Jump between modules |
| Right-side table of contents | Jump to a section within the current module |

Exact key behavior can vary by browser and keyboard layout. Search for strings such as `NetBIOSDomainName`, `mqtt.topic`, `WASC-19`, `CRC32`, or an Nmap flag.

## Six-hour exam workflow

| Phase | Fast workflow | Stop when… |
|---|---|---|
| 1. Parse | Read the objective; note target, artifact, required field, answer format and limits | You can name the exact deliverable |
| 2. Observe | Inspect supplied files, headers, packet summary, device or existing scan | You have a useful first clue |
| 3. Enumerate | Run the smallest applicable command; narrow by service / parameter / file | Relevant evidence is visible |
| 4. Verify | Cross-check value, field name, timestamp, hash algorithm or service version | Evidence directly supports the answer |
| 5. Submit | Copy exact value and confirm acceptance | The UI marks the task complete |
| 6. Return | Save the next lead and switch tasks if progress stalls | Time remains for a second pass |

??? tip "The five-minute reset"
    Re-read the request and identify its answer type. Confirm the lab route, exact file path, tool availability and version. Reduce scope to one host, port, request or artifact. If no new evidence appears, capture what you have and move to another task.

## Common placeholder syntax

| Placeholder | Replace with |
|---|---|
| `<TARGET_IP>` | One assigned lab host |
| `<TARGET_CIDR>` | The exact subnet authorized by the objective |
| `<TARGET_URL>` | Full lab URL, including scheme and required path |
| `<PORTS>` | Discovered / task-specified ports |
| `<PCAP_FILE>` | Path to the supplied capture |
| `<WORDLIST>` | An existing, authorized wordlist path |
| `<SERIAL>` | ADB serial for the designated emulator / device |
| `<APK_FILE>`, `<PML_FILE>` | Supplied artifact path |

## Preview the site locally

```bash
python -m venv .venv && source .venv/bin/activate
python -m pip install -r requirements.txt
mkdocs serve
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000). Full steps are in [Local Preview](local-preview.md).

## Accuracy notes

- A port is not a CVE. A banner or OS fingerprint is not proof of exploitability.
- A SYN / ICMP packet is not by itself evidence of DoS; compare count, rate, destination and timeline.
- CRC32 is a ZIP-entry checksum, not a cryptographic authenticity check. Use SHA-256 for whole-file comparison.
- Use supplied capture files and synthetic lab devices. Do not collect third-party traffic or query real contact databases.
- No guide can guarantee a 100% score or predict exact live challenge values. The objective and official lab rules take precedence.
