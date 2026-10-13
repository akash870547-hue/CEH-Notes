# 20 - Cloud, Containers and Kubernetes Basics

## Trigger
Find cloud identity, storage exposure, container-image issues or Kubernetes configuration risks.

## Read-only checks first
```bash
# AWS caller identity and configured profile
aws sts get-caller-identity
aws configure list

# Local containers / images
docker ps -a
docker image ls
trivy image <IMAGE_NAME>

# Kubernetes context and permissions
kubectl config current-context
kubectl auth can-i --list
kubectl get namespaces
kubectl get pods -A

# Local configuration scan where authorized
trivy fs <PROJECT_DIRECTORY>
```

Use the supplied profile/context and follow lab rules. Avoid destructive cloud changes or collecting unrelated data. Do not assume the active AWS or Kubernetes context is the one named in the objective; verify it first.

## Answer path
Use the caller identity, bucket / resource name, image finding, CVE, namespace, resource or permission entry that the objective asks for. Record exact spelling and severity.

## Troubleshooting
- AWS access denied: inspect the active profile and permissions; do not change credentials to a real account.
- Wrong Kubernetes cluster: confirm context before any command.
- Image not found: verify repository/tag and local availability.
- Scanner finding: confirm package version and affected range before reporting it as exploitable.
