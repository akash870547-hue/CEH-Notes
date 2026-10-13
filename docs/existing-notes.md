# Existing CEH Notes Library

The Material site includes a five-module, search-indexed field manual. The source repository also contains detailed module notes and tool-specific command references. These links open the source files on GitHub; the linked files are not copied into the Pages build by default.

## Main libraries

| Library | Contents |
|---|---|
| [All 20 CEH topic modules](https://github.com/akash870547-hue/CEH-Notes/tree/main/modules) | Module-based workflows, evidence guidance and self-checks |
| [Tool guide index](https://github.com/akash870547-hue/CEH-Notes/blob/main/tools/README.md) | Individual tool and command guides |
| [Tool-to-module matrix](https://github.com/akash870547-hue/CEH-Notes/blob/main/TOOLS-MODULE-MATRIX.md) | Maps tool families to the public CEH module outline |
| [Full tools cheat sheet](https://github.com/akash870547-hue/CEH-Notes/blob/main/TOOLS-CHEATSHEET.md) | Command syntax and output interpretation |
| [Exam workflow](https://github.com/akash870547-hue/CEH-Notes/blob/main/EXAM-WORKFLOW.md) | Repeatable scenario-solving loop |
| [Revision checklist](https://github.com/akash870547-hue/CEH-Notes/blob/main/REVISION-CHECKLIST.md) | Final review prompts |
| [Lab notes template](https://github.com/akash870547-hue/CEH-Notes/blob/main/LAB-NOTES-TEMPLATE.md) | Evidence and troubleshooting template |

!!! note "Source notes versus published site"
    The five guides under **Practical Modules** are copied into the docs folder and included in Material search. The links above open the maintained source notes on GitHub. To include an additional page in the website search, add a copy under docs/ and map it in mkdocs.yml navigation.

## Suggested lookup order

1. Use site search for a string such as `smb2-security-mode`, `mqtt.topic`, `unshadow`, `WASC-19`, `CRC32` or `adb logcat`.
2. Open the topic module for an end-to-end workflow.
3. Follow the individual tool guide when an option or output field needs more detail.
4. Confirm syntax against the version actually installed in the lab image.
