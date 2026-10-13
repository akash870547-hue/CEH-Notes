# 16 - Crypto, Encoding and Hash Quick Decode

## Trigger
Decode Base64 / ROT13 / hex, identify a digest or distinguish encoding from encryption.

## One-liners
```bash
# Base64
echo -n '<BASE64_TEXT>' | base64 -d

# ROT13
echo -n '<TEXT>' | tr 'A-Za-z' 'N-ZA-Mn-za-m'

# Hex to bytes / text (input must be even-length hex)
echo -n '<HEX_STRING>' | xxd -r -p

# Inspect hex bytes
xxd -g 1 <ARTIFACT_FILE> | head

# SHA-256 file digest
sha256sum <ARTIFACT_FILE>

# List supported OpenSSL ciphers
openssl list -cipher-algorithms | head -n 40
```

## Recognition hints
| Shape | First test |
|---|---|
| Base64 alphabet, optional padding | Decode Base64 and inspect output |
| Hex pairs only | Convert hex to bytes |
| Text that may use a letter shift | Test ROT13 |
| Fixed-length digest | Identify likely hash family; length alone is not conclusive |
| High-entropy bytes | Inspect file metadata and task context; do not assume text encoding |

## Answer path
Submit decoded plaintext, encoding / hash type, or computed digest as requested. Preserve exact case and punctuation.

## Troubleshooting
- Invalid Base64: remove only known line breaks; do not alter arbitrary characters.
- Hex error: check for an even number of valid hexadecimal digits.
- Output unreadable: it may be binary, compressed or encrypted rather than text.
