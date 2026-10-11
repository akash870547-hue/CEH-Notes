# Module 18 — IoT and OT Hacking

## Terminology note
The current course outline expands this area to include operational technology (OT), while some official CEH v13 lab-catalog text uses the shorter label “IoT Hacking.” Follow the terminology and objective shown in your assigned lab.

## Exam objective
Identify common IoT/OT exposures in an authorized simulation: assets, network services, weak/default configuration, firmware lifecycle, MQTT/CoAP, segmentation and safety requirements. OT testing may affect availability and safety.

## 1. IoT security map
Consider device identity, firmware/software supply chain, exposed ports, credential uniqueness, insecure management, update/signature process, telemetry, cloud pairing and network isolation. A default-credential warning is a risk; validate configuration only in the lab.

## 2. Asset and service inventory (lab range)
```bash
ip addr
ip route
nmap -sn <LAB_SUBNET>
nmap -sT -T3 -p 22,23,80,443,1883,5683 <LAB_IP>
nmap -sV -p 22,23,80,443,1883,5683 <LAB_IP>
```
Selected ports are examples for SSH, Telnet, HTTP/S, MQTT and CoAP-like service clues; services may use different ports and UDP behavior differs. Scan only assigned lab hosts. An open port is not proof of misconfiguration.

## 3. Analyze supplied firmware safely
```bash
file <LAB_FIRMWARE>
sha256sum <LAB_FIRMWARE>
binwalk <LAB_FIRMWARE>
strings -n 6 <LAB_FIRMWARE> | head -n 80
```
Use an isolated VM and current tools. Do not flash/reboot physical devices unless expressly approved. A string resembling a password is not proof it is usable; treat candidate secrets as sensitive.

## 4. MQTT / CoAP capture review
```bash
tshark -r <LAB_CAPTURE> -Y 'mqtt'
tshark -r <LAB_CAPTURE> -Y 'coap'
```
Dissector availability and filters depend on version/traffic. Review broker/topic visibility, authentication indicators and transport protection using course traffic. Do not publish, subscribe, replay or alter messages on real devices.

## 5. Lab assessment workflow
1. Record device/model/firmware and assigned VLAN/subnet.
2. Discover only in-scope hosts and services.
3. Read configuration/firmware metadata supplied by the lab.
4. Correlate findings with intended function and expected exposure.
5. Recommend unique credentials, signed/verified updates, disabled unused services, secure management, segmentation and monitored egress.
6. Consider safety and recovery plan before any active test.

## 6. Common mistakes
- Assuming every device supports standard tools or can safely restart.
- Treating an open port or firmware string as a confirmed vulnerability.
- Testing default credentials on production equipment.
- Ignoring end-of-support firmware.
- Connecting a test device directly to a personal network.

## Lab drill
Review a supplied IoT scan or firmware sample. Identify an exposed surface, evidence, one safety limitation and at least three mitigations.

**Related:** [Nmap](../tools/nmap.md) · [Packet analysis](../tools/packet-analysis.md) · [OpenSSL/hashes](../tools/crypto-openssl.md)