# Module 19 — Cloud Computing

## Exam objective
Review shared responsibility, identity and access management (IAM), storage exposure, network controls, secrets, logging and vulnerability posture in the exact training account.

## 1. Shared responsibility
Provider responsibility varies by service model/product. Customers commonly remain responsible for identities, data classification, permissions, configurations and secure application use. Read the service-specific responsibility model; do not assume a cloud provider secures every customer setting.

## 2. Confirm identity/account before commands
For AWS lab profiles:
```bash
aws --version
aws sts get-caller-identity --profile <LAB_PROFILE>
aws configure list --profile <LAB_PROFILE>
```
Stop if the returned account/user/role is not the sandbox assigned to you. Never paste access keys into terminal commands or GitHub. Prefer a named profile and least-privilege role.

## 3. Read-only review (AWS examples)
```bash
aws ec2 describe-instances --profile <LAB_PROFILE> --region <LAB_REGION>
aws ec2 describe-security-groups --profile <LAB_PROFILE> --region <LAB_REGION>
aws s3api list-buckets --profile <LAB_PROFILE>
aws iam get-account-summary --profile <LAB_PROFILE>
```
These calls can reveal internal resource names. Use them only when the lab permits inventory access. Prefer read-only inspection before making any change.

## 4. Misconfigurations to recognize
- Public object storage or overly broad bucket/container policy.
- Wildcard IAM actions/resources broader than business need.
- Publicly exposed management ports or broad security-group ingress.
- Long-lived access keys or secrets in images/source control/logs.
- Missing audit logs, weak retention or unmonitored changes.
- Unpatched images/dependencies and excessive container privileges.
- Unrestricted workload access to metadata services.

## 5. IAM policy review
```bash
aws iam list-attached-user-policies --user-name <LAB_USER> --profile <LAB_PROFILE>
aws iam list-user-policies --user-name <LAB_USER> --profile <LAB_PROFILE>
```
Use the policy simulator/console and provider docs to examine effective access. Do not modify IAM or create keys unless a task explicitly requires a reversible lab change.

## 6. Evidence and remediation
Account/tenant/region → resource → policy/config evidence → effective exposure → business impact → least-privilege fix → re-test. Do not call a resource public based only on a scanner label; inspect configuration and use the approved verification path.

## 7. Defenses
Least-privilege roles, MFA for privileged users, temporary credentials, private-by-default storage, restricted ingress/egress, secret management, encryption, central audit logging, alerting, patching and configuration-as-code review.

## 8. Troubleshooting
- **AccessDenied:** a permission is missing; don't bypass IAM.
- **Wrong resources:** verify profile, account, region and tenant.
- **Empty inventory:** insufficient permission, wrong region/profile or no resources.
- **Ambiguous scanner alert:** inspect the actual policy and validate impact.
- **Production/cost risk:** avoid writes, deployments, resource creation or scanning beyond the sandbox.

## Lab drill
Using the training account, verify identity, inspect a storage/network/IAM setting and write exact evidence plus a least-privilege correction.

**Related:** [Cloud CLI, Docker, Grype, Trivy and Kubernetes](../tools/cloud-and-grype.md) · [Vulnerability analysis](05-vulnerability-analysis.md) · [Crypto/TLS](../tools/crypto-openssl.md)