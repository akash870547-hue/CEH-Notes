# Module 17: Hacking Mobile Platforms

## Practical focus
Android/iOS security models, APK metadata, permissions, insecure local storage, transport security, debugging, sideloading risk and mobile application testing.

## Lab workflow
1. Use only the course APK and supplied emulator/test device.
2. Record package name, app version, requested permissions and signing details.
3. Perform static inspection first; note exported components, hard-coded secrets or unsafe configuration indicators.
4. Observe app traffic only in the test environment configured by the lab.
5. Save evidence and recommend least permissions, secure storage, correct TLS validation and removal of debug features.

## Tools and purpose
- **ADB:** communicate with an authorized Android emulator/test device.
- **JADX / apkanalyzer:** inspect APK metadata, resources and decompiled code.
- **MobSF:** organize static/dynamic mobile app findings.
- **Emulator:** keep testing separate from personal devices and data.

## Self-check
1. Why isolate test APK analysis?
2. What does a permission request tell you—and not tell you?
3. What counts as insecure local storage?
4. Why are hard-coded credentials risky?
5. How should a debug build be handled?

[Tool cheat sheet](../TOOLS-CHEATSHEET.md) · [Exam workflow](../EXAM-WORKFLOW.md)