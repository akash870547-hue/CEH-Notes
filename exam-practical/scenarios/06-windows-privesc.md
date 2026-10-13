# 06 - Windows Local Enumeration

## Trigger
Find the current user, local admin membership, service configuration, privileges, weak permissions or a task proof file.

## CMD / PowerShell
```powershell
whoami
whoami /all
whoami /priv
systeminfo
ipconfig /all
net user
net localgroup administrators
Get-CimInstance Win32_Service | Select-Object Name,StartName,State,PathName
Get-ChildItem C:\Users -Force
Get-ChildItem C:\Users\<USERNAME>\Desktop -Force
```

If winPEAS is supplied in the authorized lab, check its help / documentation and follow the task rules; do not fetch unknown binaries during the exam.

## Answer path
Inspect the exact user, group, privilege, service account, binary path or file named by the objective. Record service executable paths and permissions before claiming a misconfiguration.

## Troubleshooting
- Access denied: continue with non-admin enumeration.
- CIM unavailable: use `sc.exe query` / `sc.exe qc <SERVICE>`.
- Long output: filter by service name or requested field.
- No proof file: verify active username and task-specified directory.
