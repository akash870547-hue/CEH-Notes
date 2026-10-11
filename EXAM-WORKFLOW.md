# CEH Practical Exam — Repeatable Workflow

## Before touching a target
- [ ] Read the objective twice. Underline the required artifact: hostname, username, service/version, file/hash, evidence screenshot, or flag.
- [ ] Confirm allowed target(s), subnet, credentials, tools, time window, and prohibited actions from the lab instructions.
- [ ] Record starting state and create a scratchpad for commands and observations.
- [ ] Check your own interface, route, DNS and clock. Do not assume a sample IP from a guide matches your current lab.

## On each scenario
1. **Scope:** translate the objective into one testable question.
2. **Observe:** use built-in lab clues, service banners, normal browser access, logs, and low-impact discovery first.
3. **Hypothesis:** explain why the suspected service/weakness might answer the question.
4. **Validate:** choose one appropriate lab tool/action, not five at once.
5. **Read the output:** understand port state, status code, error, hash, permission, or packet fields.
6. **Pivot carefully:** if a result is missing, test connectivity, correct target/interface, name resolution, credentials, tool version and permissions before changing strategy.
7. **Evidence:** retain target, exact command/settings, important output, timestamp, and brief interpretation.
8. **Submit:** copy the exact value into the required field; watch case, whitespace and format.
9. **Stop:** once the task is verified, avoid unnecessary activity that could disrupt the lab.

## The broad five-phase methodology
- Reconnaissance: gather and validate information.
- Scanning: discover live hosts, ports and service characteristics.
- Gaining access: validate a weakness in the controlled range.
- Maintaining access: understand the risk and inspect lab evidence; never persist outside the exercise.
- Covering tracks: in an exam, understand log/evidence implications and defensive detection. Do not delete or alter evidence unless a specific authorized lab objective explicitly requires a safe simulation.

## Quick troubleshooting tree
- **No response:** confirm lab VM/range is started, correct interface/IP, route, DNS and scope.
- **Port appears closed/filtered:** distinguish closed from filtered; check firewall, service state, protocol and scan assumptions.
- **Tool missing:** use `which toolname` (Linux) / `where toolname` (Windows), check PATH and the lab's preinstalled tool list.
- **Permission error:** confirm required privilege inside the lab; do not blindly run every tool as administrator.
- **No expected flag:** confirm exact target and challenge step, revisit the evidence, check output formatting and whether the task asks for a value rather than a description.
- **Tool result seems too broad:** stop and tighten the scope before another run.

## Evidence-note template
```text
Task/objective:
Authorized target:
Start time:
Tool/version:
Command/settings:
Key output:
What it proves:
What it does NOT prove:
Evidence location:
Flag/value submitted:
Defensive lesson:
```

## Common exam traps
- Treating a tool's guess as confirmed fact.
- Mixing up a hostname, URL, IP address, and subnet.
- Scanning the wrong interface or stale target.
- Forgetting TCP vs UDP, or confusing open / closed / filtered.
- Reading only the first lines of output.
- Copying a hash/flag with an extra newline or wrong case.
- Continuing after success and wasting time.
