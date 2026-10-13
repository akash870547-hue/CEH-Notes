# SearchSploit — Search Exploit References Safely

SearchSploit searches a local Exploit Database index for exploit references, papers and proof-of-concept entries. It is a research aid—not permission to run an exploit and not proof that the target is vulnerable.

## 1. Check the tool
```bash
searchsploit -h
searchsploit --help
searchsploit -u
```
Update behavior/network access may be restricted on exam images; follow lab instructions if offline.

## 2. Search by product and version clue
```bash
searchsploit apache 2.4
searchsploit -t nginx
searchsploit --cve CVE-YYYY-NNNN
```
Use the actual product/CVE from lab evidence. Search results can be broad, duplicate or out of date.

## 3. Inspect a result
```bash
searchsploit -p <EDB_ID>
searchsploit -x <EDB_ID>
searchsploit -j apache 2.4
```
- **-p:** show local path for an entry.
- **-x:** examine the local reference/code with a pager.
- **-j:** JSON output for structured review.
Use exact options from the installed help because packaging/version can vary. Read code only for understanding; don't execute it on a real target.

## 4. Applicability checklist
Before writing a finding, verify:
- product/build/platform match the lab's affected range;
- required configuration and preconditions are present;
- the entry describes the same issue, not just the same product;
- patch/backport status is known;
- a safe lab check or scanner evidence supports the result.

A local exploit reference may be a crash/DoS proof of concept and may be outdated, unreliable or malicious. Don't mirror/run code unless the isolated lab objective explicitly requires it and the sample is vetted.

## 5. How to report
Record search terms, database/tool update context, EDB ID/CVE, affected versions, prerequisites, evidence of applicability, impact and remediation. Prefer vendor advisories and current patch guidance for final validation.

## Common traps
- A match on product name alone is insufficient.
- SearchSploit results are database records, not live verified vulnerabilities.
- Missing results in an offline database do not mean no public exploit exists.
- Never confuse a PoC reference with a confirmed compromise.

References: [Exploit Database SearchSploit manual](https://www.exploit-db.com/searchsploit) · [NVD](https://nvd.nist.gov/)
