# Module 06 — System Hacking

## Exam objective
Understand account context, password policy, privilege boundaries, weak permissions, authentication logs and safe post-incident evidence. In a practical, demonstrate what the current account can do; never assume a user is privileged because of a username or group alone.

## 1. Linux checks
```bash
whoami
id
groups
sudo -l
getent passwd <LAB_USER>
getent group
ls -la <LAB_PATH>
stat <LAB_FILE>
find <LAB_LAB_PATH> -maxdepth 2 -type f -perm -004 -print
```
Use the supplied lab paths; the `find` example is for auditing world-readable files, not exploiting permissions. Do not recursively search the whole host by default. `sudo -l` output is specific to the current account and sudo policy.

## 2. Windows checks
```powershell
whoami
whoami /all
net user <LAB_USER>
Get-LocalUser
Get-LocalGroup
Get-Acl C:\Lab\sample.txt
icacls C:\Lab\sample.txt
```
Record enabled/disabled state, group membership, ACL entries and inheritance. A permission is only a risk in context—show what the lab objective says should be allowed or denied.

## 3. Logs and authentication evidence
Linux:
```bash
journalctl -p warning --since '1 hour ago'
sudo grep -i 'failed\|accepted' /var/log/auth.log | tail -n 50
last
```
Windows:
```powershell
Get-WinEvent -LogName Security -MaxEvents 30 | Select-Object TimeCreated,Id,Message
```
Paths, event retention and access vary by OS. Correlate event time, account, source, and the test action. Never clear logs in an exam exercise.

## 4. Password policy and hash concepts
- Compare policy settings against course requirements: minimum length, reuse, lockout/backoff, MFA and secure reset.
- Never store or transmit plaintext passwords.
- Stored password verifiers should use a dedicated salted password-hashing algorithm and suitable work factor.
- For approved offline sample hashes, use the [credential audit guide](../tools/credential-auditing.md); do not guess passwords against a live service unless a separately authorized lab explicitly requires a tightly bounded test.

## 5. System-hacking process concepts
The module may cover password attacks, privilege escalation concepts, persistence and log/evidence impact. For the practical, prioritize evidence-based configuration review and the specific objective. Do not install persistence, disable security controls, or modify startup/registry/cron tasks unless a purpose-built lab explicitly instructs a reversible simulation.

## 6. Evidence and interpretation
Record identity, host, command, key output, file path, timestamp and expected policy. For permission problems distinguish:
- authentication: who are you?
- authorization: is this identity permitted to do this?
- execution context: elevated or non-elevated process?
- audit evidence: does the log confirm the event?

## Lab drill
Use a designated low-privilege account. Compare `whoami /all` or `id` with access to one harmless lab file and its ACL. Record an expected vs observed result and recommend least privilege.

## Quick self-test
1. What is the difference between identity and effective privileges?
2. Why is `sudo -l` more useful than assuming admin access?
3. Which evidence differentiates a failed login from an authorization denial?
4. Why should logs remain untouched during the test?
5. What is the safe handling rule for hashes and credentials?

**Related:** [System and password audit](../tools/system-and-password-audit.md) · [Credential auditing](../tools/credential-auditing.md) · [Log analysis](../tools/log-analysis.md)