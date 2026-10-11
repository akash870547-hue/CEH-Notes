# Module 19: Cloud Computing

## Practical focus
Shared responsibility, IAM, least privilege, public storage exposure, security groups, metadata-service risk, audit trails, secrets management and key rotation.

## Lab workflow
1. Confirm the precise sandbox account/tenant, subscription and region.
2. Inspect identities, storage and network configuration with read-only commands first.
3. Compare access policies to the task; note public access, wildcard permissions and unused identities.
4. Review audit records and correlate them to the test timestamp.
5. Recommend least privilege, private-by-default storage, managed secrets, rotation and continuous posture checks.

## Core concepts
- Provider/customer responsibility depends on the service model.
- IAM policies should grant only the minimum required actions on the minimum required resources.
- Never run a lab command against a personal or production cloud profile by accident.
- A configuration scanner can flag context-specific conditions; validate before reporting.

## Self-check
1. What does shared responsibility mean?
2. Why are wildcard IAM policies risky?
3. What evidence proves a storage resource is public?
4. Why begin with read-only inspection?
5. What should happen after a credential exposure?

[Tool cheat sheet](../TOOLS-CHEATSHEET.md) · [Exam workflow](../EXAM-WORKFLOW.md)