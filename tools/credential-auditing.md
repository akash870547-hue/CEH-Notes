# Credential Auditing — Hydra, John the Ripper and Hashcat

This guide is for the **isolated CEH Cyber Range or an explicitly designated test account**. Online password testing can lock accounts and disrupt services. Never use these commands against public/third-party hosts, employee accounts, leaked credentials or a live login without written authorization and strict test limits.

## 1. First decide which kind of test the lab asks for
- **Offline hash audit:** John or Hashcat operates on a course-provided hash file. It does not send login attempts.
- **Online authentication test:** Hydra or similar tools sends login attempts to a service and can lock accounts. Use only a deliberately vulnerable lab endpoint, one lab-provided user, a tiny supplied test list, a low rate and a defined stop condition.
- Do not confuse the two workflows.

## 2. Check command syntax
```bash
hydra -h
john --help
hashcat -h
``
Hydra service modules and syntax differ by version. Follow the installed help and the lab service module.

## 3. Bounded online check (lab-only, low rate)
Only if the course task explicitly requires a controlled login test against the lab VM and gives a test user:
```bash
hydra -l <LAB_TEST_USER> -P <SMALL_LAB_WORDLIST> -t 1 -f -w 3 ssh://<LAB_IP>
``
What the options do:
- `-l`: one designated test username.
- `-P`: password list supplied for the lab (keep it small).
- `-t 1`: one task/thread.
- `-f`: stop after a valid pair is found.
- `-w 3`: bound the per-connection wait; exact behavior follows the installed version.
- `ssh://`: selected protocol module/endpoint.
Do not scale the thread count, use massive lists, spray many accounts or target any service outside the task scope. If the lab doesn't explicitly ask for an online test, skip this section and use offline audit or policy review instead.

## 4. Offline John workflow
```bash
file <LAB_HASH_FILE>
john --list=formats
john --format=<LAB_HASH_FORMAT> --wordlist=<LAB_WORDLIST> <LAB_HASH_FILE>
john --show <LAB_HASH_FILE>
``
Use only course-provided hashes. Hash format names vary by build; choose the exact compatible format from the installed tool help.

## 5. Offline Hashcat workflow
```bash
hashcat -I
hashcat -m <LAB_HASH_MODE> -a 0 <LAB_HASH_FILE> <LAB_WORDLIST>
hashcat -m <LAB_HASH_MODE> --show <LAB_HASH_FILE>
``
- `-m`: hash type/mode.
- `-a 0`: dictionary/straight mode.
Only use the hash mode and wordlist specified for the training exercise. Don't upload hashes to online cracking sites.

## 6. Output and interpretation
- A recovered test password demonstrates a weakness only in its lab/policy context.
- No match does not prove a password is strong; the wordlist may simply lack it.
- Report password policy, rate limiting, lockout/monitoring behavior and MFA posture where the task asks for defensive lessons.
- Store password/hash outputs securely and never commit real secrets into GitHub.

## 7. Defenses worth remembering
Use long unique passwords, password managers, MFA, breached-password screening, rate limiting, appropriate lockout/backoff controls, and monitoring. Store passwords with a modern dedicated password-hashing scheme and unique salts—not plaintext or reversible encryption.

References: [Hydra project](https://github.com/vanhauser-thc/thc-hydra) · [John the Ripper](https://www.openwall.com/john/) · [Hashcat](https://hashcat.net/hashcat/)
