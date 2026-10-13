# CEH v13 Practical Exam — Repeatable Workflow

This page is an exam-time method, not a prediction of exact tasks or flags. Your current lab instructions are authoritative for target, tools, allowed methods and required output.

## 1. Before touching a target
- [ ] Read the objective twice. Highlight the requested output: hostname, record, service/version, filename/hash, account/context, finding, screenshot or flag.
- [ ] Confirm allowed targets, subnet, URL paths, credentials, test window, prohibited actions and stop conditions.
- [ ] Start a scratchpad and evidence folder using only non-sensitive names.
- [ ] Check your own interface, route, resolver, clock and tool availability.
- [ ] Never re-use target IPs or payloads from another person's walkthrough without confirming today's lab.

## 2. On every scenario: objective → evidence
1. **Scope:** convert the task into one testable question.
2. **Orient:** use lab-provided clues, normal browser behavior, local interface/route and read-only checks.
3. **Hypothesize:** state what evidence would answer the question.
4. **Test:** choose one relevant tool/action and use the smallest useful scope.
5. **Interpret:** read the complete output; understand port state, status, permission, packet fields, hash or error.
6. **Cross-check:** when practical, use a second independent signal (e.g., scan plus service response; app behavior plus log).
7. **Record:** command/settings, tool version, target, key output, time and limitations.
8. **Submit:** copy the exact requested value and respect case/format.
9. **Stop:** don't continue probing after the answer is verified.

## 3. Keep two frameworks distinct
### Five phases of ethical hacking
- Reconnaissance
- Scanning
- Gaining access
- Maintaining access
- Covering tracks

These are methodology stages. During a practical, understand the security implications of all five. Do not establish persistence, erase logs or alter evidence unless an explicit, reversible lab instruction requires a harmless simulation.

### CEH v13 learning framework
EC-Council describes a wider Learn / Certify / Engage / Compete learning framework. Engage uses scenario-driven, flag-based lab work. The exact internal task sequence and tool choices can differ by lab version; follow the current lab brief rather than assuming each task maps to a fixed generic sequence.

## 4. Fast command-selection guide
| Objective clue | Best first move | Evidence to retain |
|---|---|---|
| "Resolve this hostname" | DNS query of specified record | record type, answer, TTL/status |
| "Find open ports" | scoped Nmap scan of supplied host/range | target, command, port states |
| "Identify service/version" | focused service detection | exact service line and uncertainty |
| "Enumerate share/user/directory" | protocol-specific tool and supplied credentials | exact allowed result, access context |
| "Review a web endpoint" | browser Network / curl headers | URL, method, status, relevant headers |
| "Analyze this pcap/file" | confirm artifact hash/type, then inspect | artifact hash, filter/query, finding |
| "Validate vulnerability" | inspect finding evidence then safe lab check | preconditions, reproducible evidence, fix |
| "Return a flag/value" | identify the single source that yields it | exact value and required format |

## 5. Troubleshooting tree
- **No response:** confirm the lab is started, target/IP and interface are correct, route/DNS are right and the target is in scope.
- **Port not as expected:** distinguish closed from filtered, check TCP vs UDP, and verify service state.
- **Tool missing:** run the installed tool's help/version command; use only lab-approved alternatives.
- **Permission error:** confirm whether the task needs elevated access; do not run every tool as administrator.
- **Empty capture/output:** verify interface, filter, time window and whether the test traffic occurred.
- **Wrong flag:** confirm task step, value source, case, whitespace, prefix and requested input field.
- **Scanner says vulnerable:** inspect plugin/request evidence, affected version/configuration and preconditions before claiming confirmation.
- **Too broad/noisy result:** stop and reduce scope, request rate or filters.

## 6. Evidence note template
```text
Task/objective:
Authorized target/scope:
Start time / timezone:
Tool and version:
Command or UI path:
Key output / status:
What it proves:
What it does NOT prove:
Cross-check:
Evidence filename:
Secrets/personal data redacted?:
Exact submitted value:
Mitigation / lesson:
```

## 7. Common exam traps
- Confusing a hostname, URL, IP address, subnet and URL path.
- Treating ping failure as proof of an offline host.
- Confusing open, closed, filtered and open|filtered.
- Assuming a banner or CVE match proves exploitability.
- Changing several variables at once and losing the baseline.
- Copying a token, hash or flag with extra whitespace.
- Saving real session cookies, passwords or API keys in evidence.
- Continuing after success or running broad checks without need.

**Quick links:** [Tool library](tools/README.md) · [Command recipes](tools/practical-command-recipes.md) · [Lab notes template](LAB-NOTES-TEMPLATE.md) · [Revision checklist](REVISION-CHECKLIST.md)

Official context: [CEH v13 course outline](https://www.eccouncil.org/certified-ethical-hacker-online-training/) · [Official CEH v13 Labs](https://ec-council-international.myshopify.com/products/certified-ethical-hacker-ceh-version-13-labs)