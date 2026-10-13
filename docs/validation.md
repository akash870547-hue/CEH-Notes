# Site Validation Checklist

- [ ] `mkdocs build --strict` completes without warnings.
- [ ] Every navigation entry resolves to a file under docs/.
- [ ] Material search finds command names, flags and artifact fields.
- [ ] Copy button works for shell and PowerShell examples.
- [ ] Light / dark palette toggle works.
- [ ] Tabs and collapsible admonitions render correctly.
- [ ] Inline line numbers are visible and do not obscure the commands.
- [ ] Long command tables and code blocks remain usable on mobile.
- [ ] No credentials, access tokens, private PCAPs or real contact data are committed.
- [ ] The GitHub Actions build passes on the pull request.
- [ ] Repository Settings → Pages is set to GitHub Actions once.
- [ ] A push to main completes the GitHub Pages deployment.

The configuration is based on the official MkDocs Material and GitHub Pages action documentation. It has not yet been built in the GitHub Actions runner or deployed from this branch.
