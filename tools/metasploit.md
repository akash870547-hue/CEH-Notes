# Metasploit Framework — Beginner to Advanced (CEH Labs)

Metasploit is a framework for controlled exploit validation, auxiliary scanning and post-assessment evidence. Only use it within the authorized challenge range. Prefer discovery/check modules first; never run an exploit module just because it exists.

## 1. Start the console and learn syntax
```bash
msfconsole
msfconsole -q
msfconsole -h
``
Inside `msfconsole`:
```text
help
version
search <keyword>
search type:auxiliary <keyword>
info <module_path>
show -h
``

## 2. Search and inspect modules
```text
search type:auxiliary name:scanner
search <service>
info auxiliary/scanner/<category>/<module>
``
Use the full path shown by your installed version. Module names and availability vary with release; verify with `info` and the module's references.

## 3. Configure a module
```text
use auxiliary/scanner/<category>/<module>
show options
show advanced
show targets
set RHOSTS <LAB_IP>
set RPORT <LAB_PORT>
set THREADS 1
check
``
Not all options/modules support `check`, `show targets` or `show advanced`. Set only options actually listed in `show options`. Keep RHOSTS to the single target unless the lab explicitly assigns a range.

## 4. Run a lab-approved auxiliary check
```text
run
``
Some modules use `exploit` as a generic run alias; confirm module behavior with `info`. A scanner may query many endpoints or trigger IDS alerts, so use a small scope and the prescribed rate.

## 5. Exploit modules: strict preflight
Only when the lab objective explicitly requires exploiting a deliberately vulnerable target:
1. confirm the exact target/port and module from the lab guide;
2. read `info`, references, target platform/version and prerequisites;
3. set only the listed options;
4. inspect required payload/target options and verify they are the lab's expected configuration;
5. run only within the sanctioned lab and stop immediately once the required result is obtained.

Do not run exploit modules against public/third-party targets or select payloads intended to maintain covert access. This guide intentionally avoids generic persistence, stealth, credential theft or evasion sequences.

## 6. Session and console essentials
```text
sessions -l
sessions -h
jobs -l
jobs -h
back
exit
``
Only interact with sessions created by the authorized lab. Do not run arbitrary commands or modify the target beyond the defined objective.

## 7. Save evidence
Record module path/version, configured target, relevant options (omit secrets), output, timestamp, and which observation proves the task. Treat tool success messages cautiously; independently verify the objective.

## 8. Frequent errors
- **No matching module:** update/use the installed lab image's module set; verify spelling and version.
- **Option not found:** run `show options` after `use`.
- **Target unreachable:** verify lab state, target IP, route, port and firewall.
- **Check unsupported:** module may not implement it; do not assume vulnerable/safe.
- **Exploit failure:** verify version/prerequisites; don't repeatedly run against a target.
- **Too many targets:** stop and reset RHOSTS to the task scope.

References: [Metasploit documentation](https://docs.metasploit.com/) · [Rapid7 module search](https://www.rapid7.com/db/)
