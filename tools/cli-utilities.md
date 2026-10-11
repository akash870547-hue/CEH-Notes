# Linux / Windows CLI Utilities — Basic to Advanced

These commands are the glue used across CEH practicals. Paths and flags differ by OS; use the lab VM's own man page or help if behavior changes.

## 1. Identify the environment
```bash
date -Is
whoami
id
uname -a
cat /etc/os-release
which nmap
command -v dig
```
PowerShell:
```powershell
Get-Date
whoami /all
$PSVersionTable
Get-ComputerInfo | Select-Object OsName, OsVersion
Get-Command nmap
```

## 2. Files, types and hashes
```bash
file <LAB_FILE>
stat <LAB_FILE>
sha256sum <LAB_FILE>
strings -n 6 <LAB_FILE> | head -n 80
find <LAB_DIR> -maxdepth 2 -type f
```
Hash before analysis; work on copies of forensic samples. Don't execute unknown files. Limit find to the lab directory.

## 3. Text filtering and pipelines
```bash
grep -inE 'error|denied|failed' <LAB_LOG>
cut -d',' -f1,3 <LAB_CSV>
sort <LAB_FILE> | uniq -c | sort -nr | head -n 20
wc -l <LAB_FILE>
sed -n '1,40p' <LAB_FILE>
awk '{print $1, $2, $NF}' <LAB_LOG> | head
tail -n 100 <LAB_LOG>
```
- grep -i/-n/-E: case-insensitive, line numbers, extended regex.
- cut: delimited columns; only if the file really uses that delimiter.
- sort | uniq -c: frequency counts; sort first because uniq merges adjacent duplicates.
- wc -l: line count.
- sed -n: selected lines.
- awk: field extraction; whitespace parsing fails with quoted/embedded spaces.
- head/tail: bounded output for logs.
Avoid printing credentials or tokens in shared terminals/reports.

## 4. Processes and sockets
```bash
ps aux
ss -tulpen
ss -s
lsof -i -P -n
```
Windows:
```powershell
Get-Process
Get-NetTCPConnection
netstat -ano
tasklist
```
A listening socket shows a bound service/process, not automatically an exposed or vulnerable service. Correlate process and firewall context.

## 5. Network context
```bash
ip addr
ip route
ip neigh
ping -c 3 <LAB_IP>
traceroute <LAB_IP>
tracepath <LAB_IP>
```
Windows: ipconfig /all, route print, arp -a, ping <LAB_IP>, tracert <LAB_IP>. Ping/traceroute can be filtered, so no response doesn't prove a host is down.

## 6. Archives and encodings
```bash
xxd -l 256 <LAB_FILE>
od -An -tx1 -N64 <LAB_FILE>
base64 <LAB_FILE>
sha256sum <LAB_FILE>
```
Base64 is encoding, not encryption. Before decompressing unknown archives, work in an isolated lab folder and watch for path traversal or oversized content.

## 7. PowerShell log/file triage
```powershell
Get-FileHash .\sample.bin -Algorithm SHA256
Get-ChildItem C:\Lab -Force
Select-String -Path C:\Lab\*.log -Pattern 'error|failed|denied'
Get-Content C:\Lab\sample.log -Tail 100
Get-WinEvent -LogName System -MaxEvents 50
```
Use instructor-provided paths. Security log access depends on permissions and policy.

## Troubleshooting / exam traps
- Empty output: command can succeed and still find no match.
- Wrong field output: verify delimiter and field structure.
- Permission denied: confirm intended user and only elevate if required.
- Different OS: check command availability and equivalent syntax.
- Hash mismatch: compare exact file and algorithm.
- A CLI result is evidence only for the command context, time and target used.
