# Cloud CLI, Docker and Grype — Configuration / Image Security

Cloud APIs and container scanners can affect real accounts if the wrong profile/tenant is active. Always check identity and use a sandbox/explicit read-only role before querying. Grype scans software packages/images for known vulnerabilities; it does not prove exploitability.

## 1. Confirm installed tools and identity
```bash
aws --version
aws sts get-caller-identity --profile <LAB_PROFILE>
docker version
grype version
grype --help
``
Do not proceed if the returned account/role is not the lab account. Prefer a named profile over an implicit default credential chain.

## 2. AWS read-only inventory examples (sandbox only)
```bash
aws ec2 describe-instances --profile <LAB_PROFILE> --region <LAB_REGION>
aws ec2 describe-security-groups --profile <LAB_PROFILE> --region <LAB_REGION>
aws s3api list-buckets --profile <LAB_PROFILE>
aws iam get-account-summary --profile <LAB_PROFILE>
``
These calls return account metadata and may reveal sensitive inventory. Use only when allowed by the exercise and save only task-relevant results. Command fields vary by API/version; check the provider CLI help.

## 3. IAM policy review
```bash
aws iam list-attached-user-policies --user-name <LAB_USER> --profile <LAB_PROFILE>
aws iam list-user-policies --user-name <LAB_USER> --profile <LAB_PROFILE>
aws iam get-user-policy --user-name <LAB_USER> --policy-name <LAB_POLICY> --profile <LAB_PROFILE>
``
Only inspect the supplied lab identity. Flag excessive wildcard permissions, unused identities, and permissions broader than the task requires. Never create keys or modify policies unless a lab explicitly requires the change and defines rollback.

## 4. Docker image inspection
```bash
docker image ls
docker image inspect <LAB_IMAGE>
docker history <LAB_IMAGE>
``
Container layers and history can expose accidentally embedded secrets. Do not publish outputs containing credentials.

## 5. Grype: image or package scan
```bash
grype <LAB_IMAGE>
grype <LAB_IMAGE> -o table
grype <LAB_IMAGE> -o json > grype-report.json
grype dir:<LAB_DIRECTORY>
grype sbom:<LAB_SBOM_FILE>
``
Exact source schemes/options vary by release; check `grype help`. Run only on a course-provided local image, directory or SBOM. JSON output can be large; keep it private if it includes internal package paths.

## 6. Read Grype findings
For each CVE, record package name/version, fixed version if available, severity, artifact source and whether the package is reachable/used. Prioritize confirmed affected components and exposure, not only the scanner's severity label. Rebuild/re-scan after upgrades.

## 7. Common cloud/container controls
- Least-privilege IAM; no unnecessary wildcard action/resource.
- Private-by-default object storage; public access explicitly reviewed.
- Short-lived credentials/roles rather than long-lived keys.
- Restricted security groups and audited ingress/egress.
- Secrets injected at runtime, not baked into image layers.
- Pinned/reproducible base images, dependency updates and SBOM review.

## 8. Troubleshooting
- Wrong account: stop, confirm profile and STS caller identity.
- AccessDenied: don't attempt to bypass IAM; report required permission to lab owner.
- Grype DB update fails offline: follow lab's preloaded DB procedure; don't assume an empty report means no vulnerabilities.
- Image not found: verify local image tag, registry login and lab network policy.
- Finding has no fix yet: record risk and compensating controls; don't silently ignore.

References: [AWS CLI docs](https://docs.aws.amazon.com/cli/latest/) · [Grype docs](https://github.com/anchore/grype)
