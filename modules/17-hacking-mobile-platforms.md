# Module 17 — Hacking Mobile Platforms

## Exam objective
Assess a course-provided mobile app's permissions, package metadata, exported components, local data handling, debugging configuration and transport security. Use an emulator/test device, not a personal handset.

## 1. Preparation
Confirm APK/device is supplied for the lab; record filename, package, version and hash; snapshot/reset emulator before testing. Do not upload proprietary APKs or reports to public services.

## 2. ADB basics
```bash
adb version
adb devices -l
adb shell getprop ro.build.version.release
adb shell pm list packages -3
adb shell pm path <LAB_PACKAGE_NAME>
adb logcat -d -t 300
```
ADB access depends on emulator/debugging setup. Logs may expose tokens or personal data; review and redact before saving.

For a designated emulator only:
```bash
adb install <LAB_APK>
adb shell monkey -p <LAB_PACKAGE_NAME> 1
```
Use the course install/run/reset instructions. Do not sideload the exercise APK onto your everyday phone.

## 3. APK manifest and static analysis
```bash
sha256sum <LAB_APK>
apkanalyzer apk summary <LAB_APK>
apkanalyzer manifest permissions <LAB_APK>
apkanalyzer manifest print <LAB_APK>
jadx -d jadx-output <LAB_APK>
jadx-gui <LAB_APK>
```
Command syntax varies by Android SDK/JADX version; check installed help. Inspect:
- requested permissions vs app purpose;
- exported activities/services/receivers/providers and access guards;
- cleartext traffic/debuggable/backup settings;
- hard-coded secrets, after confirming they are not placeholders;
- local file/shared-preference/database handling;
- TLS validation and insecure trust configuration.

Decompiled output may be incomplete, obfuscated or misleading; corroborate with manifest/config and controlled runtime observation.

## 4. MobSF
Use the lab-hosted MobSF instance or installation method specified by the instructor. Upload only the course APK. Dynamic analysis requires a configured emulator. Do not expose the analysis web interface publicly.

## 5. Runtime observations
Observe only the designated app, test account and controlled traffic. Capture relevant log/network behavior; do not access other apps' data. If proxying is required, use the lab's configured Burp/ZAP and test-CA process.

## 6. Finding → fix mapping
- Excessive permission → remove unused capabilities.
- Exported component lacks access control → restrict export/require permission and validate caller.
- Debug features enabled in release → disable in release builds.
- Sensitive local data in plaintext → use platform-backed secure storage and reduce retention.
- Weak TLS validation → validate hostname/chain; do not trust every certificate.
- Hard-coded secret → rotate/remove it and move secret operations server-side.

## 7. Troubleshooting
- ADB device unauthorized/offline: start emulator and check lab debugging setup.
- APK won't parse: confirm file integrity and compatible tools.
- No decompiled source: obfuscation or packaging may limit analysis.
- MobSF result too broad: inspect evidence and validate in app context.
- Logs contain sensitive data: restrict and redact.

## Lab drill
For a supplied test APK, report SHA-256, package/version, three manifest observations, one runtime observation and one limitation. Do not label an observation exploitable without evidence.

**Related:** [Mobile tools guide](../tools/mobile-tools.md) · [SQLite3/Androguard](../tools/extra-practical-tools.md) · [Crypto/TLS](../tools/crypto-openssl.md) · [Web testing](14-hacking-web-applications.md)