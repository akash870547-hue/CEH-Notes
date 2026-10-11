# Android / Mobile Tools — ADB, JADX, apkanalyzer and MobSF

Only analyze course-provided APKs and designated emulators/test devices. Don't install a lab APK on a personal phone or inspect other people's app data.

## 1. Verify tools
```bash
adb version
adb devices -l
apkanalyzer --help
jadx --version
docker --version
``
An empty ADB device list usually means the emulator/device isn't running or debugging connection isn't configured.

## 2. ADB device and package basics
```bash
adb devices -l
adb shell getprop ro.build.version.release
adb shell pm list packages
adb shell pm list packages -3
adb shell pm path <LAB_PACKAGE_NAME>
``
Use the package name found in the lab guide/app metadata.

## 3. Install/run a course APK (emulator only)
```bash
adb install <LAB_APK>
adb shell monkey -p <LAB_PACKAGE_NAME> 1
adb logcat -d -t 500
``
Logs may contain tokens or personal data. Review locally and redact before sharing. Remove the course app from the emulator when the lab says to reset it.

## 4. APK metadata and permissions
```bash
apkanalyzer apk summary <LAB_APK>
apkanalyzer manifest permissions <LAB_APK>
apkanalyzer manifest print <LAB_APK>
``
Subcommands may vary with Android SDK build-tools; inspect `apkanalyzer --help`.

## 5. JADX static inspection
```bash
jadx -d jadx-output <LAB_APK>
jadx-gui <LAB_APK>
``
Search source/resources for insecure configuration, exported components, hard-coded secrets, insecure storage patterns and debug flags. Decompiled code is an approximation and can be incomplete/obfuscated.

## 6. MobSF local container (if Docker and network access are available in the lab)
```bash
docker image ls
docker run --rm -it -p 8000:8000 opensecurity/mobile-security-framework-mobsf:latest
``
Image tags and run options can change; follow MobSF's current installation docs and your lab's approved image. Open the local address shown in the docs, upload only the course APK, and do not expose the analysis service publicly. If the lab provides a preinstalled MobSF instance, use that instead.

## 7. Finding categories
- Excessive permissions: requested capabilities exceed product purpose.
- Debuggable app/backup options: may expose app data on misconfigured devices.
- Exported component: check whether exposure is intended and guarded.
- Hard-coded secret: validate it isn't a placeholder before reporting.
- Insecure local storage: check location/protection and sensitivity.
- TLS validation weakness: confirm the app's actual network configuration in a controlled test.

## 8. Troubleshooting
- ADB unauthorized: accept prompt on the lab device or restart the emulator.
- APK parse failure: confirm file is a valid APK and tool version is compatible.
- No source output: app may be heavily obfuscated or dynamic.
- MobSF port already in use: stop the lab service or choose an approved unused local port.
- Avoid posting APKs or analysis reports publicly; they can expose secrets.

References: [Android Debug Bridge](https://developer.android.com/tools/adb) · [JADX](https://github.com/skylot/jadx) · [MobSF](https://github.com/MobSF/Mobile-Security-Framework-MobSF)
