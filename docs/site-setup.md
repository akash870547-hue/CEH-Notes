# Site Setup: Directory Structure and Deployment

## Repository layout

```text
CEH-Notes/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Build + GitHub Pages deploy workflow
├── docs/
│   ├── index.md                # Home, keyboard shortcuts, six-hour workflow
│   ├── 01-recon-scanning.md    # Nmap, SMB, NetBIOS, SMTP / MSSQL
│   ├── 02-pcap-traffic.md      # Wireshark / TShark, DoS, RPC, MQTT
│   ├── 03-web-databases.md     # SQLmap, WASC, security headers
│   ├── 04-hashes-crypto.md     # MD5 / SHA-256, VeraCrypt, Steghide, entropy
│   ├── 05-system-mobile.md     # ADB, PhoneSploit preflight, PML, APK CRC32
│   ├── branches-notes.md       # Branch conventions and PR workflow
│   ├── existing-notes.md       # Links to all existing CEH modules / tool guides
│   ├── local-preview.md        # Install, serve and strict build
│   ├── site-setup.md           # This page
│   └── validation.md           # Pre-release checklist
├── mkdocs.yml                  # Material theme, plugins, extensions, navigation
├── requirements.txt            # Pinned MkDocs Material dependency
├── .gitignore                  # Excludes site/ and local Python artifacts
├── modules/                    # Existing 20 module source notes
└── tools/                      # Existing tool-specific source notes
```

The current MkDocs build indexes Markdown under `docs/`. The original `modules/` and `tools/` libraries remain in the repository and are linked from the site; they are not duplicated into the site search index by default. Copy a page under `docs/` and add it to `mkdocs.yml` `nav` if you want it searchable on the website.

## Local preview: three commands

Run these from the repository root:

```bash
python -m venv .venv && source .venv/bin/activate
python -m pip install -r requirements.txt
mkdocs serve
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000). For a strict pre-commit build, run `mkdocs build --strict`.

Windows PowerShell:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
mkdocs serve
```

## GitHub Pages: one-time repository setting

The workflow builds on pull requests and deploys when changes reach `main`.

1. Open the repository **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Confirm Actions are allowed by the repository / organization policy.
4. Merge the site PR into `main`.
5. Open **Actions → Build and deploy MkDocs** and verify the successful deployment job.

After this one-time Pages setup, future pushes to `main` trigger build and deploy automatically. Pull requests only run the strict build and do not publish draft pages.

## What each configuration file controls

| File | Purpose |
|---|---|
| `mkdocs.yml` | Site metadata, URL, Material theme, light / dark palettes, search, code presentation, Markdown extensions, navigation |
| `requirements.txt` | Reproducible theme dependency version |
| `.github/workflows/deploy.yml` | Build on PRs; publish Pages artifact and deploy on main |
| `.gitignore` | Avoid committing build output and local environment caches |
| `docs/validation.md` | Human review checklist for UI, search, links and deploy run |

## Troubleshooting

| Symptom | Fix |
|---|---|
| Workflow can't deploy | Confirm Settings → Pages source is GitHub Actions and workflow has Pages / OIDC permissions |
| Build says navigation file missing | Check filename case and confirm it is inside `docs/` |
| Theme / extension missing | Install the repository's `requirements.txt` inside the active virtual environment |
| Pages shows old content | Confirm the PR was merged, then check the newest Actions run and deployment URL |
| Search doesn't include a source note | Copy / link its required content under `docs/` and add the page to navigation |
