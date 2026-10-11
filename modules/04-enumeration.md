# Module 04 — Enumeration

## Exam objective
After a service is discovered, use its protocol to gather only the information required by the exercise. Enumeration is not the same as simply seeing an open port.

## 1. Start by mapping service to protocol
| Service clue | Common port | Tool family | Typical evidence |
|---|---:|---|---|
| SMB | TCP 445; legacy 139 | smbclient, enum4linux-ng | shares, host/domain info, access behavior |
| NetBIOS | UDP 137/138, TCP 139 | nmblookup | NetBIOS names |
| SNMP | UDP 161 | snmpget/snmpwalk | system OIDs and accessible values |
| LDAP | TCP 389 / 636 for LDAPS | ldapsearch | naming context and permitted directory data |
| DNS | TCP/UDP 53 | dig/host | records and resolver responses |
| RPC | service-specific | rpcclient / rpcinfo | permitted RPC metadata |
| NFS | commonly TCP/UDP 2049 plus RPC | showmount, rpcinfo | exported paths and RPC services |
| BGP | TCP 179 | router's read-only CLI in a lab | peer/state/route evidence |

Port numbers are defaults, not proof. Use discovered service/version and lab notes to confirm.

## NFS and BGP awareness
```bash
showmount -e <LAB_IP>
rpcinfo -p <LAB_IP>
```
Use these only against the designated lab host; command availability and NFS/RPC version behavior vary. A listed export does not prove it is writable or that every client can mount it. For BGP, use the lab router's read-only command interface when supplied (for example, FRRouting: `vtysh -c 'show ip bgp summary'` and `vtysh -c 'show ip bgp'`). Do not configure peers, announce routes or alter routing state unless the exercise explicitly defines a reversible simulation.

## 2. SMB / NetBIOS
```bash
smbclient -L //<LAB_IP> -U <LAB_USER>
nmblookup -A <LAB_IP>
enum4linux-ng -h
enum4linux-ng -S <LAB_IP>
enum4linux-ng -U <LAB_IP>
```
Flags vary by enum4linux-ng version; check `-h`. Broad/all-check modes should be used only when explicitly allowed. Enter passwords interactively; don't place secrets in shell history.

If the lab asks to inspect one share:
```bash
smbclient //<LAB_IP>/<LAB_SHARE> -U <LAB_USER>
```
At the prompt, use `ls`, navigate only within the task, then `quit`. A listed share is not necessarily readable, and denied access may be correct policy.

## 3. SNMP (use supplied read-only credentials)
```bash
snmpget -v2c -c <LAB_READONLY_COMMUNITY> <LAB_IP> sysDescr.0
snmpwalk -v2c -c <LAB_READONLY_COMMUNITY> <LAB_IP> system
```
SNMPv3 is preferable in real deployments and uses version-specific user/auth/privacy options. Do not guess community strings against arbitrary targets. Inventory data may be sensitive; keep output minimal.

## 4. LDAP
```bash
ldapsearch -x -H ldap://<LAB_IP>:389 -s base -b '' namingContexts
ldapsearch -x -H ldap://<LAB_IP>:389 -D '<LAB_BIND_DN>' -W -b '<LAB_BASE_DN>' '(objectClass=*)' dn
```
- `-x`: simple authentication mode.
- `-H`: server URI.
- `-s base`: base-object query.
- `-D` plus `-W`: use the bind DN and prompt for password.
Use the base DN and account provided by the exercise. A broad search can expose unnecessary directory data—filter narrowly to the requested attribute/entry.

## 5. RPC
```bash
rpcclient -U <LAB_USER> <LAB_IP>
```
At the interactive prompt use `help` to see supported commands, and stick to read-only operations required by the lab. Commands vary by Samba build.

## 6. Output logic and troubleshooting
- **Authentication failure** is different from **authorization denied**.
- **Anonymous access** should be recorded precisely: what operation succeeded without credentials?
- **No SNMP answer** may mean filtering, wrong version/community, or service disabled.
- **LDAP empty result** can mean wrong base DN/filter or access controls, not “no directory.”
- **No NetBIOS name** does not imply SMB is absent; modern SMB can operate on 445 without NetBIOS.
- Verify discovered port/service before selecting a protocol tool.

## Lab drill
Given one service port from your lab scan, identify the relevant protocol, run the smallest authorized enumeration query, and write: method, exact output, security implication, limitation and mitigation.

**Related:** [Service enumeration tool guide](../tools/network-enumeration.md) · [Nmap](../tools/nmap.md)