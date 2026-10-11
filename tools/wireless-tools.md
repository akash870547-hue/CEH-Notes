# Wireless Tools — iw, airmon-ng, airodump-ng and Capture Review

Perform wireless testing only on your own access point or the isolated lab WLAN with the provided adapter. Monitor mode may interrupt your Wi-Fi connection. This guide focuses on discovery and capture analysis; do not deauthenticate users or capture third-party credentials.

## 1. Inspect wireless interfaces
```bash
iw dev
iw list
rfkill list
ip link
``
On Kali with Aircrack-ng tools:
```bash
airmon-ng
airmon-ng --help
airodump-ng --help
aircrack-ng --help
``
Not every adapter/driver supports monitor mode or every band.

## 2. Review your own adapter/router
```bash
iw dev <WIRELESS_INTERFACE> link
iw dev <WIRELESS_INTERFACE> info
``
For a router, prefer its admin page to verify WPA2-AES/WPA3, firmware version, WPS policy and guest isolation. Do not confuse a hidden SSID with encryption.

## 3. Monitor-mode workflow (dedicated lab adapter only)
First read the local Aircrack-ng guide and understand that monitor mode may disconnect the adapter. If the lab explicitly asks you to switch modes, use the interface name returned by the tool—not a copied sample name:
```bash
sudo airmon-ng start <WIRELESS_INTERFACE>
iw dev
``
Stop if this disrupts a personal or production connection. The monitor interface name varies by driver.

## 4. Observe nearby lab APs
```bash
sudo airodump-ng <MONITOR_INTERFACE>
``
This is active radio monitoring and may show nearby network metadata. Limit your analysis to the lab AP/capture and follow local law/lab rules. Stop with Ctrl+C.

## 5. Focus on a specified lab AP (only if instructed)
```bash
sudo airodump-ng --bssid <LAB_AP_BSSID> --channel <LAB_CHANNEL> --write lab-capture <MONITOR_INTERFACE>
``
Keep the capture private. The BSSID, channel and AP must come from the authorized exercise. Avoid deauthentication/injection tactics against any network.

## 6. Analyze a supplied capture
```bash
file <LAB_FILE>
sha256sum <LAB_FILE>
wireshark <LAB_FILE>
aircrack-ng <LAB_CAPTURE>
``
The last command can inspect supported wireless captures and report metadata; do not use password-recovery modes against networks you don't own. If a controlled offline password-audit task is part of your lab, follow its supplied capture/wordlist and stopping conditions exactly.

## 7. Clues to recognize
- SSID: advertised network name.
- BSSID: AP radio MAC identifier.
- Channel/band: radio channel and frequency.
- WPA2/WPA3: security protocols; a hidden SSID is not protection.
- Rogue AP: unknown/unauthorized AP resembling or connected to a managed network; verify with inventory/location controls.
- Strong security: unique admin password, current firmware, WPA2-AES/WPA3, disabled unused WPS, guest/IoT isolation.

## Troubleshooting
- Adapter missing: check USB passthrough, driver, `rfkill` and `iw list`.
- Monitor mode fails: not supported by adapter/driver or another network manager owns interface.
- No frames: wrong channel/band, wrong interface or no AP in range.
- Return to normal mode using the Aircrack-ng/OS procedure for the active interface; the correct command depends on the interface name and distro.

References: [Aircrack-ng documentation](https://www.aircrack-ng.org/doku.php) · [Linux wireless documentation](https://wireless.docs.kernel.org/)
