# Bettercap — Safe Lab Reconnaissance and Traffic Visibility

Bettercap supports network discovery and traffic analysis. Certain modules can intercept traffic or manipulate ARP/DNS; this guide emphasizes safe host visibility and defensive observation. Do not perform MITM, credential collection, spoofing or session interception on shared networks.

## 1. Check tool version and help
```bash
bettercap -version
bettercap -h
``
Command options vary by release and platform. Work from a disposable lab VM and isolated virtual network.

## 2. Select the lab interface
```bash
ip addr
ip route
sudo bettercap -iface <INTERFACE>
``
Inside the Bettercap interactive session:
```text
help
help net
net.show
net.probe on
net.show
net.probe off
quit
``
`net.probe` sends discovery traffic; use it only on the lab network. Keep discovery short and disable it when done.

## 3. Understand the result
`net.show` can display hosts/interfaces observed or discovered by Bettercap, depending on its state and version. Validate an IP/MAC association through another authorized source; cached or virtualized neighbor information can be misleading.

## 4. Inspect available modules without starting them
```text
help
help net.recon
help net.sniff
help arp.spoof
``
Help output can explain a module's purpose without enabling it. Do not enable spoofing/interception features on your everyday LAN. Where a lab specifically requires an MITM demonstration, follow the official lab steps in the isolated virtual topology only.

## 5. Practical defensive use
- Confirm the test interface belongs to the lab.
- Capture a baseline neighbor table with `ip neigh`.
- Run authorized short discovery, record observed hosts.
- Compare with the expected lab host inventory.
- Discuss mitigations: switch protections, TLS, network segmentation, DHCP snooping/DAI where supported, and monitoring for unexpected ARP changes.

## Troubleshooting
- No hosts: wrong interface/subnet, no traffic, VM NIC mode, or permissions.
- Unexpected hosts: ensure you're not on a home/public interface; stop immediately if scope is uncertain.
- Module name/option not found: consult the installed release's `help` output.
- Capture contains tokens or personal data: stop, secure and redact it.

Reference: [Bettercap documentation](https://www.bettercap.org/)
