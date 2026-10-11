# Module 17: Hacking Mobile Platforms

## Exam focus
Android/iOS security model, APK/package metadata, permissions, insecure local storage, transport security, debugging, sideloading risk and mobile application testing.

## Lab workflow
1. Use only the course APK and supplied emulator/test device.
2. Record app/package name, version, requested permissions and signing details.
3. Perform static inspection before runtime analysis; note exported components, hard-coded secrets and risky configuration indicators.
4. Observe app traffic only in the test environment configured by the lab.
5. Save screenshots/logs and recommend least permissions, secure storage, TLS validation and removal of debug features.

## Tool purpose
- **ADB:** communicate with an authorized Android test device/emulator.
- **JADX / apkanalyzer:** inspect APK metadata and decompiled resources/code.
- **MobSF:** organize static/dynamic mobile app findings.
- **Emulator:** isolate testing from a personal handset.

## Self-check
1. Why should test APK analysis be isolated?
2. What does an app permission request tell you—and not tell you?
3. What is insecure local storage?
4. Why are hard-coded credentials risky?
5. Which remediation fits a debug build left enabled?

[Tool cheat sheet](../TOOLS-CHEATSHEET.md) · [Exam workflow](../EXAM-WORKFLOW.md)