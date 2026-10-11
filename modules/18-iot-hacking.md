# Module 18: IoT Hacking

## Exam focus
IoT/OT asset discovery, default credentials as a risk, exposed services, firmware integrity/update, MQTT/CoAP, device lifecycle and network segmentation. OT environments may have availability and safety constraints.

## Lab workflow
1. Work on the simulated device or assigned lab subnet only.
2. Record model/firmware version and exposed service details.
3. Review supplied firmware/configuration for known unsafe defaults and unnecessary services.
4. Inspect a provided MQTT/CoAP capture or lab logs when requested.
5. Recommend unique credentials, signed updates, disabled unused services, segmentation and monitored egress.

## Safe analysis
- Use `file` and `sha256sum` to identify supplied artifacts.
- Use `binwalk` only on firmware supplied for analysis and within an appropriate lab.
- Do not reset, update or stress a live production device during a test without explicit approval.

## Self-check
1. Why are default passwords especially dangerous on unattended devices?
2. What is the role of firmware updates?
3. Why separate IoT devices from sensitive workstations?
4. What evidence identifies an exposed service?
5. What safety constraint applies to OT?

[Tool cheat sheet](../TOOLS-CHEATSHEET.md) · [Exam workflow](../EXAM-WORKFLOW.md)