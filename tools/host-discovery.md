# Local Host Discovery — arp-scan and Netdiscover

ARP-based discovery works only on the local Layer-2 network segment. It does not route across the internet or replace Nmap's TCP/UDP service discovery. Use only inside the assigned lab subnet.

## 1. Confirm interface and range
```bash
ip addr
ip route
arp-scan --help
netdiscover -h
```
Verify the VM adapter and CIDR from your lab notes. Do not derive a broader target range from a public IP.

## 2. arp-scan, bounded
```bash
sudo arp-scan --interface=<INTERFACE> <LAB_SUBNET>
sudo arp-scan --interface=<INTERFACE> --localnet
```
The localnet option uses the configured interface address/mask and may include network/broadcast addresses; review the range first. Responses can include IP, MAC and vendor inference. Duplicate or missing replies can be caused by filtering, VLANs, wireless isolation or sleeping hosts.

## 3. Netdiscover, passive or active modes
```bash
netdiscover -h
sudo netdiscover -i <INTERFACE> -r <LAB_SUBNET>
```
Netdiscover syntax/modes vary by version; use installed help. The range mode sends active ARP requests; run it only on the authorized lab segment. Prefer a supplied packet capture or passive mode when active discovery isn't required.

## 4. Interpreting results
- IP/MAC pairs identify responders in the local segment at that moment.
- Vendor/OUI is an estimate based on MAC prefix and may be wrong for virtualized/randomized addresses.
- No ARP response does not establish a host is offline.
- ARP discovery won't identify services; use a separate scoped port scan if the objective asks.

## 5. Evidence and troubleshooting
Record interface, lab CIDR, timestamp, responding IP/MAC and source of scope. If results are empty, check that the interface is on the right VLAN/VM network, the lab is running and you aren't using a host-only/NAT adapter with different visibility.

References: [arp-scan manual](https://manpages.debian.org/unstable/arp-scan/arp-scan.1.en.html) · [Netdiscover project](https://github.com/alexxy/netdiscover)
