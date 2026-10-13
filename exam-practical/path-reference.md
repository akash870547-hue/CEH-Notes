# Lab Paths and Preflight

Check the actual image before assuming files exist. Common locations include `$HOME/Desktop/`, `$HOME/Downloads/`, `/usr/share/wordlists/`, `/usr/share/seclists/`, and `/usr/share/nmap/scripts/`. CEH iLabs paths and tool versions can differ.

## Inspect the environment

```bash
whoami; id; hostname
cat /etc/os-release 2>/dev/null
ip -brief address
ip route
command -v nmap hydra medusa john hashcat sqlmap gobuster dirb tshark adb
```

## Find supplied files and lists

```bash
printf 'HOME=%s\n' "$HOME"
ls -lah "$HOME/Desktop" "$HOME/Downloads" 2>/dev/null
ls -lh /usr/share/wordlists 2>/dev/null
find /usr/share/seclists -type f 2>/dev/null | grep -Ei 'password|common|directory' | head -n 40
find /usr/share/nmap/scripts -maxdepth 1 -type f -name '*.nse' 2>/dev/null | head
```

| Purpose | Common location | Caveat |
|---|---|---|
| Desktop artifacts | `$HOME/Desktop/` or `/home/kali/Desktop/` | User profile may differ. |
| Downloads | `$HOME/Downloads/` | Check exact spelling/case. |
| Kali wordlists | `/usr/share/wordlists/` | RockYou may exist only as `.txt.gz`, or not be installed. |
| SecLists | `/usr/share/seclists/` | Optional package; do not assume installed. |
| Common credentials | `/usr/share/seclists/Passwords/Common-Credentials/` | Verify subfolders / filenames exist before choosing a list. |
| Nmap scripts | `/usr/share/nmap/scripts/` | Package and OS can change the path. |
| Windows Desktop | `%USERPROFILE%\Desktop\` | Check the active account and path. |

## Tool checks

```bash
nmap --version
sqlmap --version
hydra -h 2>&1 | head -n 15
john --list=formats 2>/dev/null | head
hashcat --version
gobuster --help 2>&1 | head -n 15
tshark --version 2>/dev/null | head
```

| Symptom | First check |
|---|---|
| Command not found | Verify with `command -v`; use the task-provided VM or available equivalent. |
| No scan results | Confirm the lab route, assigned target, address and allowed port range. |
| Invalid option | Check the installed version and its help output; examples may target another version. |
| Wordlist missing | Inspect local directories and select an allowed existing file. |
| Tool appears stuck | Stop safely, reduce target / port / thread scope, and check network reachability. |
| TLS or redirect issue | Record scheme, port and redirect; understand the error before changing verification settings. |

**Do not install, download, or modify system configuration mid-task unless the lab instructions permit it.**