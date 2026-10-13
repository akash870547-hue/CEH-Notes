<p class="ceh-kicker">MODULE 05 · HOST & MOBILE FORENSICS</p>

# System and Mobile Artifacts

> **Scope:** Run ADB queries only against the designated lab emulator / device and artifacts provided by the challenge. Contact records and logs may contain sensitive data; extract only the fields needed for the exercise.

!!! note "Fast lookup"
    Confirm the ADB serial and artifact path before collecting evidence. Use only the designated synthetic lab device and PML / APK files supplied for the exercise.

??? tip "ADB / PhoneSploit caution"
    PhoneSploit wrappers and menus differ by version. First inspect local help and device connectivity. Do not use features that access contacts, messages, camera, calls or files on real / third-party devices.

## Quick reference

| Objective | Command | Answer location |
|---|---|---|
| Identify attached device | `adb devices -l` | Serial / product / state |
| OS / build info | `adb -s <SERIAL> shell getprop ro.build.version.release` | Android release / build |
| Save logs | `adb -s <SERIAL> logcat -d -v threadtime > <LOG_FILE>` | Local log file; filter by tag / time |
| List third-party packages | `adb -s <SERIAL> shell pm list packages -3` | Package IDs |
| Query lab test contacts | `adb -s <SERIAL> shell content query --uri content://com.android.contacts/contacts --projection _id:display_name` | Returned contact rows if permission allows |
| Open / convert Process Monitor log | `procmon.exe /OpenLog <PML_FILE> /SaveAs <CSV_FILE> /Quiet` | CSV rows / event properties |
| Search Procmon result codes | `Select-String -Path <CSV_FILE> -Pattern 'ACCESS DENIED|NAME NOT FOUND'` | Matching event rows |
| Validate APK ZIP CRCs | `unzip -t <APK_FILE>` | `No errors detected` or bad entry |
| Print APK CRC32 per entry | Python snippet below | ZIP central-directory CRC / path |

## Scenario archetypes

| If the question asks… | Workflow |
|---|---|
| Determine Android version / device model | Select correct serial; query relevant `getprop` values |
| Find a log event / app crash / error | Save `logcat`, search by tag / keyword / timestamp |
| Find app package / permissions | `pm list packages`, then `dumpsys package <PACKAGE>` |
| Determine contact name / ID from a lab device | Query the contacts provider only on the designated test device |
| Extract an event from a PML trace | Open or export PML using Procmon, then filter CSV columns |
| Identify failed file / registry operations | Filter `Result` for `ACCESS DENIED`, `NAME NOT FOUND` etc. |
| Verify APK entry CRC32 | Test archive, then list stored CRC32 values by entry |
| Compare APK identity across copies | Compute whole-file SHA-256 separately from per-entry CRC32 |

## Core command / tool syntax

### 1. ADB device selection and inventory

```bash
adb devices -l
adb -s <SERIAL> shell getprop ro.product.model
adb -s <SERIAL> shell getprop ro.build.version.release
adb -s <SERIAL> shell getprop ro.build.version.sdk
adb -s <SERIAL> shell getprop ro.build.fingerprint
adb -s <SERIAL> shell pm list packages -3
adb -s <SERIAL> shell dumpsys package <PACKAGE_NAME>
```

Always specify `-s <SERIAL>` if multiple devices or emulators are connected. Do not assume the default selected device is the challenge target.

### 2. Logcat capture and parsing

```bash
# Save current buffer; does not start an indefinite live follow
adb -s <SERIAL> logcat -d -v threadtime > <LOG_FILE>

# Search saved logs for task-relevant terms
grep -niE 'fatal exception|exception|denied|error|flag|token|proof' <LOG_FILE>

# Look for an Android runtime stack trace or package name
grep -niE 'FATAL EXCEPTION|AndroidRuntime|<PACKAGE_NAME>' <LOG_FILE>
```

`logcat` output can be truncated by device version / buffer limits. If the task requires events over time, follow the task procedure and capture a bounded time window rather than assuming the existing buffer includes all events.

### 3. Contacts content provider: authorized test device only

```bash
# Query contact IDs / display names from the designated lab device
adb -s <SERIAL> shell content query --uri content://com.android.contacts/contacts --projection _id:display_name
```

Access depends on Android version, app permissions, provider behavior and device state. If permission is denied, do not bypass security controls. Use only synthetic data / the lab-provided device and copy only the exact row fields requested by the objective.

### 4. Process Monitor (.PML) inspection

From an authorized Windows lab workstation, convert the supplied PML to a CSV with the installed Sysinternals Process Monitor. Exact options can vary by version; verify with the tool's help if needed.

```powershell
# Export PML to CSV (run from the folder containing Procmon.exe)
.\Procmon.exe /AcceptEula /OpenLog "<PML_PATH>" /SaveAs "<CSV_PATH>" /Quiet

# Load exported CSV and select likely relevant rows
Import-Csv "<CSV_PATH>" |
  Where-Object { $_.Result -match 'ACCESS DENIED|NAME NOT FOUND|PATH NOT FOUND|BUFFER OVERFLOW' } |
  Select-Object 'Time of Day','Process Name','PID','Operation','Path','Result','Detail' |
  Format-Table -AutoSize

# Search saved CSV for an exact artifact / registry path or result
Select-String -Path "<CSV_PATH>" -Pattern '<PATH_FRAGMENT>|ACCESS DENIED|NAME NOT FOUND'
```

If the CLI export fails, open Procmon, use **File → Open** for the PML, then **File → Save** and select CSV format / the appropriate events. PML is a native binary trace, not plain text.

### 5. APK CRC32 verification

```bash
# Validate ZIP integrity and CRC for entries
unzip -t <APK_FILE>

# Display ZIP entries and CRC column
unzip -v <APK_FILE>

# Print stored CRC32 for every archive entry and test archive integrity
python3 - "<APK_FILE>" <<'PY'
import sys
import zipfile

apk_path = sys.argv[1]
with zipfile.ZipFile(apk_path) as archive:
    for entry in archive.infolist():
        print(f"{entry.CRC:08X}  {entry.filename}")
    bad_entry = archive.testzip()
    if bad_entry is None:
        print("ZIP_CRC_CHECK=OK")
    else:
        print(f"ZIP_CRC_CHECK=FAILED entry={bad_entry}")
PY

# Hash the entire APK to compare file identity (different purpose than CRC32)
sha256sum <APK_FILE>
```

CRC32 is a ZIP integrity checksum, not a cryptographic integrity or authenticity proof. Compare CRC values for the same internal entry when the task asks for an APK file CRC. Use SHA-256 when the task requests a cryptographic file hash.

## Interpretation and output analysis

- **ADB serial:** use the serial associated with the assigned lab device. `unauthorized` means device-side debugging approval is missing; do not attempt to bypass it.
- **Android version:** release, SDK version and fingerprint are separate values; use the exact property asked for.
- **Logcat:** record timestamp, process / PID, tag, priority and message. A keyword match alone may be unrelated; inspect surrounding events.
- **Contact rows:** output can be unavailable due to provider schema or permissions. Do not infer a blank name from a missing row.
- **Procmon:** prioritize the requested process, operation, path, result and timestamp. `NAME NOT FOUND` is common normal application behavior; correlate repeated events and process context.
- **PML export:** a PML file can be reopened in Procmon. Exported CSV loses some native trace interactivity but is easier to grep / script.
- **APK CRC32:** each ZIP member has its own CRC. An archive can have many CRC values. `unzip -t` checks member data against stored checksums.
- **APK SHA-256:** hashes the whole APK byte stream, not any particular resource entry.

## Filters / regex / CLI parsing

| Need | Filter / parser |
|---|---|
| Find crashes / Java exceptions | `grep -niE 'FATAL EXCEPTION|AndroidRuntime|Exception|Caused by:' <LOG_FILE>` |
| Find named package in logs | `grep -niF '<PACKAGE_NAME>' <LOG_FILE>` |
| Search Procmon failures | `Select-String -Path <CSV_FILE> -Pattern 'ACCESS DENIED|NAME NOT FOUND|PATH NOT FOUND'` |
| Filter procmon process / result (PowerShell) | `Import-Csv <CSV_FILE> | Where-Object { $_.'Process Name' -match '<PROCESS>' -or $_.Result -match 'ACCESS DENIED' }` |
| Find likely flag / proof strings in extracted lab files | `grep -RniE 'flag\{|proof|token|secret' <OUTPUT_DIR>` |
| Test APK archive | `unzip -t <APK_FILE>` |

## Edge cases and troubleshooting

| Symptom | Fallback |
|---|---|
| `adb devices` shows unauthorized | Approve debugging on the lab device through the official flow; if not possible, use provided artifacts. |
| Multiple devices connected | Add `-s <SERIAL>` to every ADB command. |
| Log file has no event | Check buffer age / task time window, package name, tag and device serial. |
| Contacts query denied | Check task scope and provider permissions; do not bypass access controls. |
| Procmon CSV export fails | Open PML in Procmon GUI and export through File → Save; inspect help for installed version. |
| Search has huge output | Filter by process name, time, operation and relevant path; avoid treating normal events as bugs. |
| ZIP CRC test fails | Record the affected entry. Verify source integrity before treating it as tampering. |
| CRC differs but APK hash differs too | Confirm both artifacts are the intended copies; CRC32 can collide and is not a security hash. |

### PhoneSploit preflight

Use only the lab device / isolated emulator. Check the installed project help before choosing menu actions; do not assume every clone supports the same command-line flags.

```bash
python3 phonesploit.py --help
adb devices -l
adb -s <SERIAL> get-state
```

If the local project is menu-driven, launch its documented entry point and select only inventory / status operations permitted by the lab. Do not install an unverified fork during the timed task.

=== "Linux / macOS"
    ```bash
    adb devices -l
    adb -s <SERIAL> logcat -d -v threadtime > <LOG_FILE>
    sha256sum <APK_FILE>
    unzip -t <APK_FILE>
    ```

=== "Windows PowerShell"
    ```powershell
    adb devices -l
    adb -s <SERIAL> logcat -d -v threadtime | Out-File -Encoding utf8 '<LOG_FILE>'
    Get-FileHash -Algorithm SHA256 '<APK_FILE>'
    tar -tf '<APK_FILE>' | Select-Object -First 30
    ```

## References

- [Android Debug Bridge (ADB)](https://developer.android.com/tools/adb)
- [Android logcat](https://developer.android.com/tools/logcat)
- [Android content provider basics](https://developer.android.com/guide/topics/providers/content-provider-basics)
- [Microsoft Process Monitor](https://learn.microsoft.com/en-us/sysinternals/downloads/procmon)
