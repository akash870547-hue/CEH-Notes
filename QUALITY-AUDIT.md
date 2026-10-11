# CEH Notes — Quality Audit and Coverage

This file records the quality checks applied to the study notes so a reader can distinguish a content review from a live tool execution test.

## Repository coverage checked

- **20 numbered module notes** (Modules 01–20).
- **2 custom workflow clusters**: reconnaissance/scanning/enumeration and session/perimeter/web. They are study groupings, not official Engage phase numbers.
- **26 individual tool/topic guides** under `tools/`, with an index in `tools/README.md`.
- Root navigation: README, exam workflow, lab note template, revision checklist, full cheat sheet and quick reference.

## Improvements applied

- Rewrote module notes to make the content module-specific instead of repeating a generic practical template.
- Added practical workflows, tool syntax, interpretation caveats, troubleshooting, evidence fields and defensive takeaways.
- Added links for OSINT/metadata analysis, local host discovery, SearchSploit, Nuclei and steganography/steganalysis.
- Added NFS and BGP enumeration awareness to Module 04 and steganography concepts to Module 06.
- Corrected the hping3 UDP example: `-2` is UDP mode; `-U` is the TCP URG flag.
- Fixed malformed Markdown code-block closing fences found in module and tool pages.
- Updated module and tool indexes and clarified Module 18 naming: the current course outline includes IoT and OT, while some official CEH v13 lab-catalog text uses the shorter label "IoT Hacking".

## Static checks performed

- Checked all 20 numbered module files and the two workflow-cluster files for local Markdown links and code-fence balance.
- Checked the root README and tool index for local links and code-fence balance.
- Checked the 26 tool/topic pages in batches for local-link correctness and malformed/unbalanced code fences.
- Verified every file under `tools/` (other than its index) is linked from `tools/README.md`.
- Rechecked the root README links to the tool library and key revision documents.

## What these checks do not prove

- Commands were **not executed** against every OS, tool version or CEH lab image. Flags and menu names can differ; check `--help` or the installed manual before use.
- External documentation can change after this audit. Follow the official lab guide supplied for your exam.
- A tool finding is not automatically a confirmed vulnerability. Validate applicability and retain evidence.
- This is an independent study aid, not an official EC-Council publication or a source of guaranteed exam flags.

## Authoritative references

- [EC-Council CEH v13 course outline](https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/)
- [Official CEH v13 Labs outline and challenge format](https://ec-council-international.myshopify.com/products/certified-ethical-hacker-ceh-version-13-labs)
- [Nmap reference](https://nmap.org/book/man.html)
- [Wireshark documentation](https://www.wireshark.org/docs/)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
