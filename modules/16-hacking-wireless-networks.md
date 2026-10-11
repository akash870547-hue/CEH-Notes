# Module 16: Hacking Wireless Networks

## Practical focus
Understand 802.11 basics, SSID/BSSID, channels, WPA2/WPA3, authentication, encryption, rogue access points, WPS risk and wireless segmentation.

## Lab workflow
1. Confirm the supplied wireless adapter/capture and authorized lab context.
2. Identify SSID/BSSID, channel, security mode and signal details with permitted OS/lab tools.
3. Review your own or lab router configuration: WPA2-AES/WPA3, unique admin password, firmware updates and unused features disabled.
4. Inspect a supplied capture for relevant management/authentication traffic or suspicious AP indicators.
5. Record the observation and a defensive recommendation.

## Key concepts
- SSID is the wireless network name; BSSID identifies an AP radio/interface.
- Hiding an SSID does not replace encryption.
- Rogue-AP risk can be reduced through managed configuration, enterprise authentication where appropriate and wireless monitoring.
- Deauthentication or credential-capture techniques should never be tested outside a specifically authorized isolated exercise.

## Self-check
1. Difference between SSID and BSSID?
2. Why is MAC filtering not sufficient?
3. How do you identify the configured security mode?
4. What evidence may indicate an unknown AP?
5. Why separate guest/IoT WLANs from sensitive systems?

[Tool cheat sheet](../TOOLS-CHEATSHEET.md) · [Exam workflow](../EXAM-WORKFLOW.md)