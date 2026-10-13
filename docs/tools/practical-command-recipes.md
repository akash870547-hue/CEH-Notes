# CEH Practical Command Recipes — Objective to Evidence

These workflows combine tools to answer common practical objectives. Commands must stay within the exact course range; do not substitute public targets.

## Recipe 1: "Find the service on the supplied host"
```bash
ip addr
ip route
nmap -sT -T3 -p <LAB_PORT> <LAB_IP>
nmap -sV -p <LAB_PORT> -oN service.txt <LAB_IP>
```
Evidence: target, port state, service/version output and limitations.

## Recipe 2: "Resolve the given hostname and inspect its web response"
```bash
dig <LAB_DOMAIN> A
dig <LAB_DOMAIN> AAAA
curl -I https://<LAB_DOMAIN>/
curl -v https://<LAB_DOMAIN>/
```
Evidence: DNS answer, HTTP status/headers, TLS/redirect behavior. Keep DNS resolution distinct from reachability.

## Recipe 3: "Check a TLS certificate"
```bash
openssl s_client -connect <LAB_DOMAIN>:443 -servername <LAB_DOMAIN> -showcerts
testssl.sh --fast <LAB_DOMAIN>
```
Check SAN/hostname, issuer/chain, validity dates and protocol results. Use testssl options that exist in your installed version.

## Recipe 4: "Identify DNS/SMB/SNMP/LDAP exposure"
```bash
nmap -sV -p 53,139,445,161,389,636 <LAB_IP>
dig @<LAB_IP> <LAB_DOMAIN> A
smbclient -L //<LAB_IP> -U <LAB_USER>
snmpget -v2c -c <LAB_READONLY_COMMUNITY> <LAB_IP> sysDescr.0
ldapsearch -x -H ldap://<LAB_IP>:389 -s base -b '' namingContexts
```
Run only protocol checks relevant to the question and credentials supplied by the exercise; not every listed service will exist.

## Recipe 5: "Inspect a packet capture"
```bash
file <LAB_FILE>
sha256sum <LAB_FILE>
tshark -r <LAB_FILE> -Y 'dns'
tshark -r <LAB_FILE> -Y 'http.request' -T fields -e frame.time -e ip.src -e http.host -e http.request.uri
```
Use Wireshark for detailed stream, packet and protocol inspection. Protect capture files because they may contain sensitive content.

## Recipe 6: "Review a web application request"
1. Open the lab app through Burp/ZAP proxy or browser DevTools.
2. Capture a baseline request and response.
3. Confirm host/path/role; redact cookies before saving.
4. Change one harmless test parameter only if instructed.
5. Compare status, body, redirects and error output.
6. State what is observed, impact and fix.

## Recipe 7: "Validate a scanner result"
1. Confirm the finding's host/port/path and evidence.
2. Check software version/configuration and prerequisites.
3. Validate with one safe, repeatable lab request or log check.
4. Mark confirmed/likely/false-positive/not assessed.
5. Recommend fix and document re-test.

## Recipe 8: "Review an Android test APK"
```bash
sha256sum <LAB_APK>
apkanalyzer apk summary <LAB_APK>
apkanalyzer manifest permissions <LAB_APK>
jadx -d jadx-output <LAB_APK>
```
Use a course-provided APK only; static analysis has limits and decompiled code can be obfuscated.

## Recipe 9: "Inspect a local container image"
```bash
docker image ls
docker image inspect <LAB_IMAGE>
grype <LAB_IMAGE> -o table
grype <LAB_IMAGE> -o json > grype-report.json
```
Confirm local image/tag first. Findings must be interpreted against package version, fix availability and actual use.

## Recipe 10: "Record a password-hash audit result"
```bash
file <LAB_HASH_FILE>
john --list=formats
john --format=<LAB_HASH_FORMAT> --wordlist=<LAB_WORDLIST> <LAB_HASH_FILE>
john --show <LAB_HASH_FILE>
```
Offline training hashes only. Do not test password guesses against live logins.

## General exam checklist
- Exact target and protocol confirmed.
- Command/options supported by installed version.
- Minimal scope, rate and privileges.
- Complete output read, not just first line.
- Evidence saved and sensitive values redacted.
- Final answer copied in the requested format.
