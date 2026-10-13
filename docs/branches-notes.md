# Branch Notes and Contribution Workflow

## Branch roles

| Branch pattern | Purpose | Deploys the website? |
|---|---|---|
| `main` | Reviewed and publishable documentation | Yes, on push / merge when GitHub Pages is enabled |
| `feature/<topic>` | Add modules, nav, configuration or content | No; pull requests run a build check only |
| `fix/<topic>` | Focused corrections for paths, syntax or links | No; merge the reviewed change to main to publish |

The working branch for this documentation site is `feature/ceh-practical-architect-modules`. Keep changes on this branch unless you intentionally start a separate feature branch.

## Common Git commands

    # Check current branch and changes
    git status --short --branch
    git branch --show-current

    # Create a separate branch from the latest main
    git switch main
    git pull --ff-only origin main
    git switch -c feature/docs-topic

    # Validate, stage, commit and publish
    mkdocs build --strict
    git diff --check
    git add mkdocs.yml requirements.txt docs/ .github/workflows/deploy.yml
    git commit -m "Add MkDocs CEH field manual"
    git push -u origin HEAD

Open a pull request from your feature branch to `main`. Pull requests run the documentation build, but the workflow deploys only after a push to `main`, normally after merge.

## Content workflow

1. Keep one topic or configuration change per commit.
2. Use safe, clearly labeled placeholders for lab targets and artifacts.
3. Run `mkdocs build --strict` and `git diff --check` before review.
4. Check that each navigation entry points to a file under `docs/`.
5. Review code wrapping, tables and mobile layout in the local preview.
6. Merge the reviewed PR, then check **Actions → Build and deploy MkDocs** for deployment status.

!!! note "Feature branches do not publish"
    The workflow skips deployment on pull requests and feature branches. Draft content cannot replace the public study site until it reaches `main`.

!!! warning "One-time Pages enablement"
    In repository Settings → Pages, select **GitHub Actions** as the publishing source once. After that, pushes to `main` deploy automatically. A workflow file cannot override every repository-level Pages setting by itself.

- Do not commit `.venv/`, generated `site/`, caches, secrets, recovered credentials, or private lab artifacts.
- Avoid force-pushing a shared branch unless the maintainer agrees.
- Keep lab-specific answer strings out of public notes unless intentionally public training material.
