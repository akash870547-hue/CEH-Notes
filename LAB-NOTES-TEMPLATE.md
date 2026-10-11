# CEH v13: Lab Notes Template + Troubleshooting

## Capture every practical
```text
Module / task:
Required output (flag, value, finding, screenshot):
Authorized target / scope:
Tool and version:
Command or UI path:
Key output:
Interpretation:
Cross-check:
Evidence file:
Exact submitted value:
Mitigation / lesson:
```

## Fast diagnosis
| Symptom | Check first | Next useful check |
|---|---|---|
| Host seems down | Lab started, correct target and interface | Route, DNS, permitted alternate reachability signal |
| Scan shows no ports | Correct IP, scope and protocol | Firewall, scan permissions, service state |
| Port filtered | Network controls may block probes | Lab guide, path/ACL, distinguish filtered from closed |
| DNS answer unexpected | Correct resolver and record type | A/AAAA/CNAME/NS, cache and split DNS |
| Web page redirects | Exact URL, scheme, path and status | Location header, auth/session state |
| 401 vs 403 | Authentication vs current authorization | Login state, account role, lab instructions |
| Scanner reports CVE | Version/configuration evidence | Validate applicability and false positives |
| Packet capture empty | Correct interface, capture started, permissions | Filter, traffic actually generated, VLAN/VM network |
| Tool not found | Tool installed and PATH | `which tool`, `tool --help`, lab-provided alternative |
| Flag rejected | Exact case/whitespace/format | Required step completed? correct field? |

## Exam discipline
Read the task → scope target → collect minimal evidence → verify → submit exact result → stop. Avoid guessing based on remembered lab IPs or old walkthroughs.
