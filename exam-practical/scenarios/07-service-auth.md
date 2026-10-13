# 07 - Bounded Service Authentication Audit

## Trigger
The task provides one lab account and asks to validate authentication for FTP, SSH, RDP, SMB or an HTTP login.

Use only the supplied lab username, a small local wordlist, one assigned endpoint and low concurrency. Do not test real accounts or broad ranges.

## Check common wordlists
```bash
ls -lh /usr/share/wordlists/rockyou.txt /usr/share/wordlists/rockyou.txt.gz 2>/dev/null
find /usr/share/seclists/Passwords/Common-Credentials -maxdepth 1 -type f 2>/dev/null | head -n 30
find "$HOME/Desktop" "$HOME/Downloads" -type f 2>/dev/null | grep -Ei 'password|credential|wordlist' | head -n 30
```

## Hydra syntax for one lab user
```bash
hydra -l <USERNAME> -P <SMALL_WORDLIST> -t 1 -f ftp://<TARGET_IP>
hydra -l <USERNAME> -P <SMALL_WORDLIST> -t 1 -f ssh://<TARGET_IP>
hydra -l <USERNAME> -P <SMALL_WORDLIST> -t 1 -f rdp://<TARGET_IP>
hydra -l <USERNAME> -P <SMALL_WORDLIST> -t 1 -f smb://<TARGET_IP>
hydra -l <USERNAME> -P <SMALL_WORDLIST> -t 1 -f <TARGET_IP> http-get-form "/login.php:user=^USER^&pass=^PASS^:F=Invalid"
hydra -l <USERNAME> -P <SMALL_WORDLIST> -t 1 -f <TARGET_IP> http-post-form "/login.php:user=^USER^&pass=^PASS^:F=Login failed"
```

For web forms, replace the path, field names, cookies and failure marker with values observed in the lab request. Form syntax is version and application dependent.

## Alternatives
```bash
medusa -h <TARGET_IP> -u <USERNAME> -P <SMALL_WORDLIST> -M ssh -t 1 -f
ncrack -p 22 --user <USERNAME> -P <SMALL_WORDLIST> <TARGET_IP>
```

## Answer path
Use the tool's confirmed success record. Re-check against the assigned login only when permitted. Never publish recovered passwords.

## Troubleshooting
- Refused: confirm port and service state.
- No pair: validate username, wordlist readability and service module.
- Web form false positives: compare a known-invalid response and match the failure marker.
- Slow / lockout warning: stop and follow lab lockout rules.
