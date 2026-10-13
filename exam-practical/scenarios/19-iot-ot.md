# 19 - IoT / OT Protocol and Firmware Review

## Trigger
Identify an IoT service, protocol port, firmware artifact or embedded secret in an authorized lab task.

## Narrow inventory
```bash
# Use only ports included in the assigned objective
nmap -n -Pn -sV -p 1883,5683,502,47808 <TARGET_IP>

# Inspect a supplied packet capture
capinfos <PCAP_FILE>
tshark -r <PCAP_FILE> -Y 'mqtt || coap || modbus'

# Firmware triage
file <FIRMWARE_FILE>
sha256sum <FIRMWARE_FILE>
binwalk <FIRMWARE_FILE>
strings -n 6 <FIRMWARE_FILE> | head -n 100
```

## Answer path
Record protocol, port, banner, firmware type, version or exact artifact data requested. For packet tasks, capture frame number and fields. Do not send state-changing commands to industrial protocols unless the challenge explicitly instructs it in an isolated simulator.

## Troubleshooting
- No service: confirm assigned IP and specified ports; do not expand to unrelated networks.
- No packet fields: check whether the dissector recognizes the protocol and inspect raw bytes.
- Binwalk result uncertain: validate offsets and file type before interpreting strings as secrets.
