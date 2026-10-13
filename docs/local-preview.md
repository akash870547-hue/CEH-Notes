# Local Preview and Build Check

Run these from the repository root.

## Install and preview

    python -m venv .venv
    source .venv/bin/activate
    python -m pip install -r requirements.txt
    mkdocs serve

Open [http://127.0.0.1:8000](http://127.0.0.1:8000). The server reloads when Markdown or configuration files change.

## Validate before pushing

    mkdocs build --strict
    git diff --check

The strict build fails on unresolved navigation or internal-link warnings rather than silently publishing a broken site.

## Windows PowerShell

    py -m venv .venv
    .\.venv\Scripts\Activate.ps1
    python -m pip install -r requirements.txt
    mkdocs serve

## Common problems

| Problem | Fix |
|---|---|
| `mkdocs: command not found` | Activate the virtual environment and install requirements.txt. |
| Port 8000 in use | Run `mkdocs serve -a 127.0.0.1:8001`. |
| Unknown navigation file | Check case and confirm that the file exists under docs/. |
| Strict build warnings | Fix the warning and rerun `mkdocs build --strict`. |
| Missing theme / extension | Install dependencies in the active environment from requirements.txt. |
| Pages shows an old site | Confirm the PR merged into main; check Actions and Pages settings. |
