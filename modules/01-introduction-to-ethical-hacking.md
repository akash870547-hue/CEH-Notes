# Module 01 — Introduction to Ethical Hacking

## Exam objective
Start every practical by proving that you understand **scope, permission, task output and stop conditions**. A technically correct command run against the wrong target is still a failed/unsafe test.

## 1. Core terminology
- **Asset / target:** host, subnet, application, account, cloud resource or file being assessed.
- **Scope:** explicitly allowed assets, paths, protocols, time window and test methods.
- **Rules of engagement (RoE):** approved intensity, contacts, prohibited techniques, data handling and stop conditions.
- **Finding:** a reproducible observation that supports a security claim.
- **Evidence:** command output, request/response, screenshot, log or hash that another reviewer can verify.
- **False positive:** the tool reports a weakness that does not apply or cannot be demonstrated in this context.
- **False negative:** a weakness exists but the test did not identify it.

## 2. Before the first command
Use the lab sheet as the source of truth; do not reuse remembered IPs from another session.

```bash
date -Is
whoami
ip addr
ip route
nmap --version
``

Windows equivalents: `Get-Date`, `whoami /all`, `ipconfig /all`, `route print`. These commands establish local context; they do not authorize a test.

Create a scope note:
```text
Objective:
In-scope targets:
Out-of-scope targets:
Allowed tools / methods:
Credentials supplied by lab:
Test window / stop condition:
Required answer format:
Evidence location:
```

## 3. Repeatable practical method
1. **Parse:** identify the exact requested value (e.g. service/version, record type, hash, alert or flag).
2. **Scope:** confirm target and allowed action.
3. **Baseline:** observe normal behavior first.
4. **Test:** change one variable at a time and use the smallest relevant check.
5. **Interpret:** quote the evidence and explain what it proves and does not prove.
6. **Verify:** use a second signal if appropriate (tool + application response/log).
7. **Submit and stop:** match case/format exactly; don't continue probing after success.

## 4. Ethics, safety and evidence
- Never scan, intercept, stress-test or exploit a third-party system without explicit authorization.
- Use test accounts and synthetic data. Redact cookies, passwords, API keys and personal information.
- Preserve original evidence; do not clear logs or alter timestamps.
- Keep tool output, date/time, target, version and a concise interpretation.

## 5. Lab drill
Given a fictional target and a practical objective, create a scope card and decide which of these you can run: a local version check, a DNS lookup, a single-host scan, a web parameter test, a high-rate stress test. Explain why permission and scope differ for each.

## Quick self-test
1. What's the difference between scope and objective?
2. Why is an open port not itself a vulnerability?
3. Give one example of evidence and one unsupported assumption.
4. When should you stop testing?
5. Why must credentials and session cookies be redacted?

**Next:** [Exam workflow](../EXAM-WORKFLOW.md) · [Tool index](../tools/README.md) · [Revision checklist](../REVISION-CHECKLIST.md)