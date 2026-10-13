# 02 - Service, Banner and OS Detection

## Trigger
Find service name/version, operating system, or run a relevant Nmap NSE check.

## Commands
```bash
nmap -n -Pn -sV --version-light -p <PORTS> <TARGET_IP>
nmap -n -Pn -O -sV -p <PORTS> <TARGET_IP>
nmap -n -Pn -sC -sV -p <PORTS> <TARGET_IP>
nmap --script-help 'safe and discovery scripts'
nmap -n -Pn --script <SCRIPT_NAME> -p <PORT> <TARGET_IP>
```

Run scripts only against the assigned lab target. Check script descriptions with `nmap --script-help <SCRIPT_NAME>` before use; do not assume a script is passive.

## Answer path
Use the service/version fields and any OS guess printed in output. OS detection is probabilistic; corroborate with open ports, banners and task hints.

## Troubleshooting
- No version: ensure the port is open and test only the discovered service ports.
- OS guess missing: requires reachable probes and enough port responses; report uncertainty.
- Script error: confirm spelling and local script availability.
- Slow results: avoid broad script categories; select one relevant script.
