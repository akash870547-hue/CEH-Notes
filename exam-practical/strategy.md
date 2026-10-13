# Six-Hour Workflow

## Suggested pacing

| Block | Time budget | Action |
|---|---:|---|
| Read and map | 15-20 min | Read every visible rule. Note the required answer and scope for each task. |
| Quick wins | 60-75 min | Resolve familiar file, hash, port, banner and configuration questions. |
| Enumeration | 100-120 min | Go from host discovery to focused service / artifact analysis. |
| Multi-step tasks | 100-120 min | Test one hypothesis at a time; reuse evidence instead of repeating scans. |
| Final audit | 25-35 min | Verify exact answer strings and confirm submission status. |

This is a flexible plan, not a promise about task difficulty. Follow the exam's own instructions.

## Repeatable workflow

1. **Scope:** Copy target IP, CIDR, URL, artifact, interface or supplied username from the objective.
2. **Observe:** Inspect supplied evidence before using active tools.
3. **Enumerate:** Identify the service, version, file format, parameter or hash type.
4. **Test one hypothesis:** Choose a focused command and keep the scope narrow.
5. **Verify:** A scanner warning is a lead. Verify version, configuration and preconditions.
6. **Extract:** Find the exact field requested: version, port, CVE, username, plaintext, filename, database cell or flag.
7. **Submit:** Preserve case and punctuation. Confirm the UI accepted the answer.
8. **Move on:** Record the next clue and return later if time remains.

## Five-minute reset

- Re-read the task and name the exact output type it requests.
- Validate IP / route / URL / file path / service port.
- Check tool presence with `command -v <TOOL>` and syntax with `<TOOL> --help`.
- Reduce the problem to one host, port, file or test account.
- Inspect raw output, redirects and errors. Do not add flags blindly.
- Save evidence, then switch tasks if no new evidence appears.

## Submission checklist

- [ ] Result belongs to the assigned target or supplied artifact.
- [ ] Evidence directly supports the submitted answer.
- [ ] I did not confuse a tool guess with confirmed behavior.
- [ ] Exact spelling, case and punctuation are correct.
- [ ] Answer was entered and accepted in the exam interface.
- [ ] Unfinished tasks have a recorded next step.

Do not assume a universal flag format. Use `flag{...}` only if that is the actual format shown by the challenge.
