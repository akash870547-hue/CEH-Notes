# Module 19: Cloud Computing

## Exam focus
Shared responsibility, IAM, least privilege, public storage exposure, security groups, metadata-service risk, audit trails, secrets management and key rotation.

## Lab workflow
1. Confirm the exact sandbox account, tenant/subscription and region.
2. Inspect identity, storage and network configuration using read-only commands first.
3. Compare permissions to the stated task; flag public access, wildcard actions/resources and unused identities.
4. Review audit logs and correlate to the lab activity timestamp.
5. Recommend least privilege, private-by-default storage, managed secrets, key rotation and continuous posture checks.

## Core concepts
- Cloud security is shared between provider and customer; exact responsibility depends on service type.
- An IAM permission should be scoped to the minimum actions and resources needed.
- Avoid running commands against a personal or production cloud profile during exam practice.
- A configuration scanner may flag context-specific conditions; validate before reporting.

## Self-check
1. What is shared responsibility?
2. Why are wildcard IAM policies risky?
3. Which evidence proves a storage bucket/container is public?
4. Why use read-only inspection first?
5. What should happen when a credential is exposed?

[Tool cheat sheet](../TOOLS-CHEATSHEET.md) · [Exam workflow](../EXAM-WORKFLOW.md)