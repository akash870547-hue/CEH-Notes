# Module 18: IoT Hacking

## Practical focus
IoT/OT asset discovery, default-credential risk, exposed services, firmware integrity/update, MQTT/CoAP concepts, device lifecycle and network segmentation. OT may have strict availability/safety constraints.

## Lab workflow
1. Use the simulated device or assigned lab subnet only.
2. Record the device/model/firmware version and exposed service details.
3. Review supplied firmware/configuration for unsafe defaults and unnecessary services.
4. Inspect provided MQTT/CoAP capture or lab logs if the objective requests it.
5. Recommend unique credentials, signed updates, disabled unused services, segmentation and monitored egress.

## Safe artifact analysis
- Use `file` and `sha256sum` to identify supplied artifacts.
- Use `binwalk` only on firmware provided for analysis, in an appropriate lab.
- Do not reset, update or stress a production device without explicit approval.

## Self-check
1. Why are default passwords dangerous on unattended devices?
2. What role do firmware updates play?
3. Why segment IoT devices from workstations?
4. What evidence demonstrates an exposed service?
5. Why are OT tests subject to safety constraints?

[Tool cheat sheet](../TOOLS-CHEATSHEET.md) · [Exam workflow](../EXAM-WORKFLOW.md)