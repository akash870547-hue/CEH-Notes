# Log Analysis and Search Commands — Linux, Windows and Lab Evidence

Logs are often the fastest way to verify whether a lab action occurred. Search only the supplied system/logs and do not erase or alter evidence.

## 1. Linux log discovery
```bash
journalctl --since '30 minutes ago'
journalctl -p warning --since today
journalctl -u <LAB_SERVICE> --since '1 hour ago'
sudo tail -n 100 /var/log/auth.log
sudo tail -f /var/log/syslog
```
Log paths differ by distro. On some systems, authentication logs are in `/var/log/secure`; `journalctl` may be the main source.

## 2. Search text logs
```bash
grep -i 'failed' <LAB_LOG>
grep -nE 'denied|error|warning' <LAB_LOG>
grep -c 'Accepted' <LAB_LOG>
tail -n 100 <LAB_LOG>
less <LAB_LOG>
```
- `-i`: case-insensitive.
- `-n`: line numbers.
- `-E`: extended regular expressions.
- `-c`: count matching lines.
Always account for rotating logs/time zones and correlate the time window.

## 3. Quick structured extraction
```bash
cut -d' ' -f1-4 <LAB_LOG> | head
sort <LAB_LOG> | uniq -c | sort -nr | head
awk '{print $1, $2, $3}' <LAB_LOG> | head
```
Log formats are often not space-delimited; test parsing against sample lines before concluding. Avoid publishing IPs, usernames or session identifiers unnecessarily.

## 4. Windows Event Viewer / PowerShell
```powershell
Get-WinEvent -ListLog *
Get-WinEvent -LogName Security -MaxEvents 50
Get-WinEvent -FilterHashtable @{LogName='System'; StartTime=(Get-Date).AddHours(-1)} -MaxEvents 100
Get-WinEvent -LogName System -MaxEvents 50 | Select-Object TimeCreated, Id, LevelDisplayName, Message
```
Access to Security log depends on rights and OS policy. Event IDs and message fields vary across Windows versions/configuration.

## 5. Windows text search
```powershell
Select-String -Path C:\Lab\*.log -Pattern 'failed|denied|error'
Get-Content C:\Lab\sample.log -Tail 100
```
Use the supplied lab folder. Avoid wildcarding across the whole machine.

## 6. Wireshark / packet logs
Use packet capture filters/display filters from [packet analysis guide](packet-analysis.md). Correlate packet time, source, destination and protocol with application/system logs.

## 7. Practical investigation steps
1. Note the task's time window and target system.
2. Establish a baseline log source.
3. Filter by one relevant event/phrase/ID.
4. Correlate with a second source where possible.
5. Preserve original file and record exact filter/query.
6. Explain whether the evidence confirms or merely suggests the event.

## Troubleshooting
- No matches: wrong time zone/path, rotated logs, access denied, different event wording.
- Too many results: narrow time window, service, event ID or host.
- Parser output appears shifted: logs may include quoted fields/embedded spaces.
- Never clear logs or disable auditing as a shortcut.

References: [Microsoft Get-WinEvent](https://learn.microsoft.com/powershell/module/microsoft.powershell.diagnostics/get-winevent) · [journalctl](https://www.freedesktop.org/software/systemd/man/latest/journalctl.html)
