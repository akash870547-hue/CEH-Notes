# 14 - Wireless Capture Review

## Trigger
Find SSID, BSSID, channel / security mode or inspect a supplied handshake capture.

## Commands

```bash
aircrack-ng <PCAP_FILE>
aircrack-ng <PCAP_FILE> -w <LAB_WORDLIST>
```

The second command is offline validation against a supplied lab capture only. Check the tool help if capture format / options differ.

## Answer path
Use the capture summary for ESSID, BSSID and security. If the task asks for a recovered lab passphrase, use the exact successful result.

## Troubleshooting
- No networks: confirm supplied capture format and whether it contains 802.11 frames.
- No handshake: inspect capture summary and task-provided artifacts; do not inject / deauthenticate unless the lab explicitly requires it.
- No match: verify wordlist path and the expected method.
