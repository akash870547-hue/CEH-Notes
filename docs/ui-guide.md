# Documentation Design System

Use this page when adding a new topic. Keep the UI predictable so the reader can recognize the relevant command, output field and fallback without learning a new layout every time.

## Page anatomy

Every field guide should follow this order:

1. **Title and scope**: one sentence on the problem area and authorized artifact / target.
2. **Fast lookup table**: objective → command / filter → where to read the answer.
3. **Scenario archetypes**: common task wording and first useful action.
4. **Core workflow**: short numbered sequence with copyable commands.
5. **Interpretation**: exact output field, packet, row, path or file.
6. **Filters and parsing**: Wireshark filters, grep / awk / PowerShell or tool-native output parsing.
7. **Edge cases**: the fastest sensible fallback for empty output, denied access, missing tool or timeout.
8. **References**: primary documentation, not unverified command collections.

## Copy-ready template

```markdown
# NN - Topic Name

> **Scope:** use only the assigned lab target or supplied artifact.

!!! note "Fast lookup"
    State the most important prerequisite and what evidence to keep.

??? tip "When the first attempt fails"
    Give the smallest useful fallback. Don't blindly increase scan scope or thread count.

## Quick reference

| Objective | Command / filter | Answer field |
|---|---|---|
| Find the requested value | `<COMMAND>` | Exact output line / field |

## Scenario archetypes

| If the task asks… | First action | Evidence |
|---|---|---|
| "Find X" | Focused command | Exact result field |

## Core command / tool syntax

```bash
<COMMAND_WITH_PLACEHOLDERS>
```

=== "Linux / macOS"
    ```bash
    <PLATFORM_COMMAND>
    ```

=== "Windows PowerShell"
    ```powershell
    <PLATFORM_COMMAND>
    ```

## Interpretation and output analysis

- Identify the exact field and what it does / does not prove.
- Record frame, timestamp, path, row or line number when applicable.

## Filters / parsing

| Objective | Filter / one-liner |
|---|---|
| Extract the relevant value | `<FILTER_OR_PARSER>` |

## Edge cases and troubleshooting

| Symptom | Fallback |
|---|---|
| Empty output | Verify target, path, format and scope |
| Permission / connection error | Check authorized access and exact endpoint |

## References

- [Primary tool documentation](<URL>)
```

## Components used by this site

| Component | When to use it |
|---|---|
| `!!! note "Title"` | Scope, caveat or fast-reference prerequisite |
| `??? tip "Title"` | Collapsible troubleshooting / optional detail |
| `=== "Tab title"` | Equivalent CLI syntax across operating systems |
| `<div class="grid cards" markdown>` | Topic selection / jump links on landing pages |
| `ceh-kicker` class | Small section / module label above an H1 |
| `ceh-hero` / `ceh-metrics` | Homepage hero and high-level metrics |
| `ceh-steps` | Short numbered workflow on the homepage |

## Visual and content rules

- Keep one primary action per card and descriptive link text.
- Put a quick-reference table near the top of each page.
- Use a separate fenced block for each independently copyable command sequence.
- Prefer one command per line; split long commands if that improves legibility.
- Keep tables to three columns where possible. For wide output, use a code block instead of a deeply nested table.
- Use the same placeholder names across all pages, for example `<TARGET_IP>`, `<TARGET_URL>`, `<PCAP_FILE>`, `<WORDLIST>` and `<SERIAL>`.
- Explain the answer locator directly: field name, output line, packet number, table / column, entry path or hash output.
- Distinguish a candidate indicator from verified evidence.
- Never include real credentials, access tokens, private customer data or unapproved packet captures.

## Preview checklist

- [ ] Title and quick reference appear near the top.
- [ ] Every code block has a language label and balanced fence.
- [ ] Callout, tab and code-copy controls render correctly.
- [ ] Commands fit desktop and mobile widths.
- [ ] Internal links resolve.
- [ ] New page is added to `mkdocs.yml` navigation.
- [ ] `mkdocs build --strict` passes.
