# 09 - Web Content Discovery and WordPress

## Trigger
Find hidden directories, admin pages, backup files, WordPress version, users or plugin/theme clues.

## Baseline
```bash
curl -sS -D - -o /dev/null <TARGET_URL>
curl -sS -L -I <TARGET_URL>
```

## Directory discovery
```bash
gobuster dir -u <TARGET_URL> -w <WORDLIST> -t 20
dirb <TARGET_URL> <WORDLIST>
```

Use a local wordlist after verifying its path. If every path returns the same status/length, configure the tool to filter that application's catch-all response instead of treating every result as real.

## WordPress scan
```bash
wpscan --url <TARGET_URL> --enumerate p,t
wpscan --url <TARGET_URL> --enumerate u
```

Use deeper enumeration only when specifically requested. Online password testing can trigger lockouts; follow the lab's exact scope and account limits rather than running broad guesses.

## Answer path
Check status code, redirect, discovered path, WPScan finding title/version/plugin, or task-named artifact. Open the path in the authorized browser to verify it.

## Troubleshooting
- 403: path may exist but be restricted; record exact response.
- TLS / redirect: preserve scheme and host; inspect redirect headers.
- Too many false paths: filter known wildcard response codes / sizes.
- WPScan has no findings: site may not be WordPress or enumeration may be blocked.
