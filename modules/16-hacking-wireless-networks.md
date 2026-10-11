# Module 16 — Hacking Wireless Networks

## Exam objective
Recognize 802.11 concepts, SSID/BSSID, channels, authentication/encryption modes, rogue access points and practical wireless hardening. Practice only on your own access point, supplied pcap or isolated lab WLAN.

## 1. Core terms
- **SSID:** human-readable network name.
- **BSSID:** identifier for a particular access-point radio/interface, often represented as a MAC address.
- **Channel/band:** radio frequency/channel used by the network.
- **WPA2-AES / WPA3:** security modes; verify actual configuration, not just SSID.
- **Rogue AP / evil twin:** unauthorized AP or lookalike network; confirm against approved inventory.
- **Monitor mode:** adapter mode that receives 802.11 frames; adapter/driver support varies.

Hiding SSID or MAC filtering is not a substitute for strong encryption and access control.

## 2. Read-only Wi-Fi status (Linux)
```bash
iw dev
iw dev <WIRELESS_INTERFACE> link
iw dev <WIRELESS_INTERFACE> info
iw list
rfkill list
nmcli device wifi list
```
These show interface/link/capability information or nearby SSID metadata, depending on permissions and hardware. Do not analyze unrelated users' traffic.

## 3. Capture supplied lab material
```bash
file <LAB_CAPTURE>
sha256sum <LAB_CAPTURE>
wireshark <LAB_CAPTURE>
tshark -r <LAB_CAPTURE> -Y 'wlan'
```
In Wireshark, inspect frame type/subtype, BSSID, channel/radio metadata when present, security information and time. Not all captures include all 802.11 metadata.

## 4. Aircrack-ng orientation
```bash
airmon-ng --help
airodump-ng --help
aircrack-ng --help
```
For an isolated lab adapter, follow the installed version's instructions to enter/exit monitor mode. Interface names vary, and starting monitor mode may disconnect the adapter. Do not run deauthentication/injection commands against other clients or networks. For capture tasks, use only the lab-specified BSSID/channel/interface.

## 5. Practical assessment flow
1. Verify adapter/SSID/BSSID and the approved lab AP.
2. Record security mode/channel and check router configuration.
3. Review supplied capture or lab-approved frames.
4. Distinguish normal beacon/probe/association behavior from suspicious evidence.
5. Recommend WPA3 or WPA2-AES as supported, unique credentials, modern firmware, disabled unused WPS where applicable, guest isolation and monitoring.

## 6. Evidence and limitations
Record adapter/driver, lab AP, channel, capture source/time and exact result. An unknown BSSID may be a neighbor or authorized guest AP; verify inventory/location. Captures can omit payload or management information depending on setup.

## Troubleshooting
- No wireless interface: check USB passthrough, driver, rfkill and iw list.
- Monitor mode unsupported: adapter/driver limitation; use the supplied capture.
- No frames: wrong interface/channel/band, AP out of range or permissions.
- WPA metadata unclear: verify capture includes relevant beacon/association frames.
- Restore normal mode using the installed tool's documented procedure.

## Lab drill
Inspect a supplied wireless capture. Identify SSID/BSSID if available, channel/security clue, one observation, limitations and three hardening controls.

**Related:** [Wireless tool guide](../tools/wireless-tools.md) · [Packet analysis](../tools/packet-analysis.md)