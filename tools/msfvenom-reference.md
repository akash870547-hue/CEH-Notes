# Msfvenom Reference — Safe Lab Orientation

Msfvenom can generate executable payloads. This page covers identification, help, listing formats and safe reporting, but intentionally omits commands that generate reverse shells, persistence payloads, evasive binaries or credential-theft tooling. Follow the exact authorized CEH lab guide if a payload-generation exercise is assigned.

## 1. Check installation and help
```bash
msfvenom --version
msfvenom --help
msfvenom -l payloads
msfvenom -l formats
msfvenom -l encoders
```
List flags may vary by installed Metasploit version. Payload/format availability varies by OS and architecture.

## 2. Understand option categories
- **Payload:** behavior selected for the training task.
- **Format:** output representation; selecting a format doesn't make a file safe.
- **Architecture/platform:** must match the authorized lab target.
- **Encoder:** representation transformation; encoding is not a reliable way to defeat modern security controls.
- **Handler/transport:** associated listener/network configuration, which must remain inside the isolated lab.
- **Output path:** use a disposable lab directory; never place generated executables in a shared/public repository.

## 3. Safe handling workflow
1. Confirm target, allowed behavior and cleanup steps in the lab guide.
2. Use a disposable VM/snapshot and isolated virtual network.
3. Follow only the course's prescribed command and exact platform/architecture.
4. Hash the artifact and label it as a lab sample.
5. Verify endpoint telemetry in the isolated target.
6. Remove the sample and reset both VMs when the task is complete.

## 4. Defensive skills tested
- Detect creation/execution of unknown binaries from file/process telemetry.
- Correlate process start, parent process, network connection and endpoint alert.
- Explain why application control, EDR, least privilege and egress controls reduce risk.
- Preserve evidence before containment; don't clear logs.

## 5. Troubleshooting
- Payload/format unsupported: check local help and architecture compatibility.
- Lab connection fails: check isolated network/target routing and lab instructions rather than widening exposure.
- AV/EDR alerts: this may be the expected defensive observation; don't disable controls to force success.
- Never run a generated artifact outside the assigned disposable lab.
