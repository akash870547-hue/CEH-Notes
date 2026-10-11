# Linux / Windows System Checks + Offline Password Auditing

This guide covers account context, permissions, logs, file hashes and offline password-hash auditing using course-provided sample hashes. It does not cover attacking live login services.

## 1. Linux identity and permissions
```bash
whoami
id
groups
sudo -l
getent passwd
getent group
ls -la <LAB_PATH>
stat <LAB_FILE>
file <LAB_FILE>
sha256sum <LAB_FILE>
```
Use `sudo -l` only on a lab account you are authorized to inspect. Permission output needs context; a permission or group membership alone does not establish that privilege escalation is possible.

## 2. Linux processes, sockets and logs
```bash
ps aux
ss -tulpen
systemctl --type=service --state=running
journalctl -p warning --since '1 hour ago'
last
lastlog
```
Some commands require appropriate privileges or differ across distributions. Filter to the lab task rather than copying large logs containing unrelated data.

## 3. Windows checks (PowerShell / CMD)
```powershell
whoami
whoami /all
ipconfig /all
route print
arp -a
netstat -ano
Get-LocalUser
Get-LocalGroup
Get-FileHash .\sample.bin -Algorithm SHA256
Get-Process
Get-WinEvent -LogName Security -MaxEvents 20
```
Event log access depends on privileges and OS policy. Don't disable logs or alter evidence during an exam.

## 4. Windows file and ACL inspection
```powershell
Get-Acl C:\Lab\sample.txt
icacls C:\Lab\sample.txt
Get-ChildItem C:\Lab -Force
```
Substitute the instructor-provided lab path. Avoid recursively dumping folders outside task scope.

## 5. Offline password-hash auditing with John the Ripper
Only use hashes explicitly supplied for offline practice; don't collect hashes from real users.
```bash
john --version
john --list=formats
john --show <LAB_HASH_FILE>
john --format=<LAB_HASH_FORMAT> --wordlist=<LAB_WORDLIST> <LAB_HASH_FILE>
john --show <LAB_HASH_FILE>
```
- Format names vary by build; check `john --list=formats`.
- Start with a small course wordlist and a bounded task.
- Hash files can contain sensitive credentials; don't commit or share them.

## 6. Offline Hashcat basics
```bash
hashcat --version
hashcat -h
hashcat -I
hashcat -m <LAB_HASH_MODE> -a 0 <LAB_HASH_FILE> <LAB_WORDLIST>
hashcat -m <LAB_HASH_MODE> --show <LAB_HASH_FILE>
```
- `-m`: hash type/mode, confirm in installed help/reference.
- `-a 0`: straight/dictionary mode.
- `-I`: show compute devices.
Use only the hash type and files supplied by the course. Do not run password guessing against live accounts/services.

## 7. Safe malware triage (static)
```bash
file <LAB_FILE>
sha256sum <LAB_FILE>
strings -n 6 <LAB_FILE> | head -n 80
xxd -l 128 <LAB_FILE>
```
Perform on a copied training sample in an isolated VM. A hash or suspicious string is an indicator—not definitive malware proof. Never execute unknown samples on your daily computer.

## 8. Troubleshooting and evidence
- Hash tool reports no hashes: format may be wrong or file is not a supported hash format.
- Cracking yields no result: the password may not be in the lab wordlist; that does not prove it's strong or weak.
- Access denied: check identity and authorized privileges, not by blindly elevating.
- Capture identity, file hash, relevant output and timestamps; redact secrets.

References: [John the Ripper documentation](https://www.openwall.com/john/doc/) · [Hashcat wiki](https://hashcat.net/wiki/)
