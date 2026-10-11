# Service Enumeration — SMB, NetBIOS, SNMP, LDAP and RPC

Enumeration is protocol-specific. Verify reachability and the stated scope first; use credentials given by the lab. Do not guess or brute-force passwords on external systems.

## 1. Quick service map
- SMB: usually TCP 445; shares, domain/workgroup, file permissions.
- NetBIOS: legacy name/session services often around UDP 137/138 and TCP 139.
- SNMP: commonly UDP 161 queries and UDP 162 traps; version/community permissions matter.
- LDAP: commonly TCP/UDP 389; LDAPS commonly TCP 636.
- RPC: service-specific endpoints; restrict to the lab host and approved checks.

## 2. Check your tools
```bash
smbclient --version
snmpwalk --version
ldapsearch -VV
rpcclient --version
``

## 3. SMB with smbclient
```bash
smbclient -L //<LAB_IP> -U <LAB_USER>
smbclient //<LAB_IP>/<LAB_SHARE> -U <LAB_USER>
``
Enter the lab password at the prompt rather than putting it in command history. Within an authorized share session:
```text
ls
pwd
cd <LAB_DIR>
get <LAB_FILE>
quit
``
Only download the specific file the exercise asks you to inspect. A denied share may indicate permission policy rather than a server vulnerability.

## 4. NetBIOS and SMB inventory
If installed in the lab, `nmblookup` can query NetBIOS names:
```bash
nmblookup -A <LAB_IP>
``
Some systems do not expose NetBIOS; an empty result is not proof the host is down. Newer Windows environments may rely on SMB over TCP 445 and DNS.

## 5. SNMP basics
Use the lab's SNMP version and authorized community/credentials; do not use guessed values on arbitrary hosts.
```bash
snmpwalk -v2c -c <LAB_READONLY_COMMUNITY> <LAB_IP> system
snmpget -v2c -c <LAB_READONLY_COMMUNITY> <LAB_IP> sysDescr.0
``
SNMPv3 (preferred where supported) uses auth/privacy credentials; options depend on the lab configuration. Avoid placing secrets directly in shared terminal logs. SNMP values may include sensitive inventory; capture only the task-relevant result.

## 6. LDAP queries using supplied credentials
```bash
ldapsearch -x -H ldap://<LAB_IP>:389 -s base -b '' namingContexts
ldapsearch -x -H ldap://<LAB_IP>:389 -D '<LAB_BIND_DN>' -W -b '<LAB_BASE_DN>' '(objectClass=*)' dn
``
- `-x`: simple authentication mode.
- `-H`: server URI.
- `-D`: bind DN.
- `-W`: prompt for password securely.
- `-b`: search base.
- `-s base`: query only the base entry.
Avoid large full-directory exports unless the lab task explicitly requires them.

## 7. RPC client
```bash
rpcclient -U <LAB_USER> <LAB_IP>
``
Use only read-only enumeration operations documented by the exercise. RPC commands differ across Samba versions; at the prompt, `help` shows available commands. Log off with `quit`.

## 8. Output interpretation
- Share listed ≠ share readable; test only using authorized lab identity.
- Anonymous/guest access should be reported with exact evidence and scope.
- SNMP community-based access can expose device/system metadata.
- LDAP bind/search results depend on base DN and access control.
- A port open does not prove the protocol is misconfigured.

## Troubleshooting
- Check ports/service state first.
- Confirm protocol version and lab credentials.
- Use `-W`/interactive prompt to avoid secrets in shell history.
- Check DNS/base DN/share name spelling.
- Separate authentication failure from authorization failure.
- Keep searches minimal and avoid dumping unrelated personal data.

References: [smbclient manual](https://www.samba.org/samba/docs/current/man-html/smbclient.1.html) · [OpenLDAP ldapsearch](https://www.openldap.org/software/man.cgi?query=ldapsearch)
