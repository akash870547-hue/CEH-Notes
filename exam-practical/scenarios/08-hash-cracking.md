# 08 - Hash Identification and Offline Cracking

## Trigger
Identify a supplied hash type or recover the plaintext for an assigned lab hash.

## Identify first
```bash
hashid '<HASH_STRING>'
hash-identifier
file <HASH_FILE>
```

## Hashcat mode lookup examples
| Type | Common mode |
|---|---:|
| MD5 | 0 |
| SHA-1 | 100 |
| SHA-256 | 1400 |
| NTLM | 1000 |

Confirm the expected format in the installed Hashcat help because prefixes and application-specific formats can change identification.

## Commands
```bash
# Hashcat wordlist run against supplied lab hash file
hashcat -m <MODE> <HASH_FILE> <WORDLIST> --status
hashcat -m <MODE> <HASH_FILE> --show

# John the Ripper
john --wordlist=<WORDLIST> <HASH_FILE>
john --show <HASH_FILE>
john --list=formats | head

# Linux shadow audit: use only supplied lab files and authorized access
unshadow <PASSWD_FILE> <SHADOW_FILE> > <COMBINED_FILE>
john --wordlist=<WORDLIST> <COMBINED_FILE>
```

## Answer path
Use `--show` or John’s result summary; copy the requested plaintext or hash type exactly. Do not infer hash type from length alone.

## Troubleshooting
- Separator / token error: verify the exact hash format and whether salts or usernames are required.
- Zero recovery: check mode / format, list integrity, and whether the task provides a different wordlist.
- GPU / memory issue: use a smaller lab list or John CPU mode if available.
