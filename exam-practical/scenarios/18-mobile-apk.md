# 18 - Android APK Static Review

## Trigger
Given an APK and asked for its package name, permissions, exported components, strings or database artifacts.

## First look
```bash
file <APK_FILE>
sha256sum <APK_FILE>
unzip -l <APK_FILE> | head -n 80
strings <APK_FILE> | grep -Ei 'flag|token|http|api|password|secret' | head -n 80
command -v aapt apkanalyzer jadx adb
```

If tools are present:
```bash
aapt dump badging <APK_FILE>
apkanalyzer manifest application-id <APK_FILE>
apkanalyzer manifest permissions <APK_FILE>
jadx -d <OUTPUT_DIR> <APK_FILE>
```

Treat embedded strings as leads. Do not publish real tokens, keys or personal data discovered inside an artifact.

## Answer path
Check manifest values, package ID, permission names, exported components, strings or the supplied database path specified by the task.

## Troubleshooting
- Command missing: use available local tools and task instructions; do not assume every tool is installed.
- APK won't parse: check archive integrity and whether it is actually an APK.
- No strings: inspect decoded resources / manifest with an APK-aware tool.
