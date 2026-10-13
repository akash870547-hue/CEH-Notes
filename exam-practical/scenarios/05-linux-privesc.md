# 05 - Linux Local Privilege Enumeration

## Trigger
Find user/group privileges, SUID/SGID files, sudo rules, capabilities, writable jobs or a task proof file.

## Fast checks
```bash
whoami; id; hostname; uname -a
cat /etc/os-release 2>/dev/null
sudo -l
getent passwd
find / -type f -perm -4000 -ls 2>/dev/null
find / -type f -perm -2000 -ls 2>/dev/null
getcap -r / 2>/dev/null
cat /etc/crontab 2>/dev/null
find /home /opt /tmp -maxdepth 3 -type f -readable 2>/dev/null | head -n 100
```

If linPEAS is supplied in the lab, inspect its local help and run only as allowed by the objective; don't download random scripts during the exam.

## Answer path
Read the exact result: current identity, sudo permission, binary path, capability, writable script/job, or the named file's contents. Preserve full paths and capitalization.

## Troubleshooting
- Permission denied: expected for protected paths; record the permitted evidence.
- No SUID result: verify find syntax and filesystem scope.
- sudo asks for password: don't guess; continue with non-sudo enumeration unless the task supplies credentials.
- Flag search: inspect the specified user's home and challenge-mentioned paths first.
