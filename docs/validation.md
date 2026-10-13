# Site Validation Checklist

## Build and navigation

- [x] `mkdocs build --strict` passes in the current pull-request workflow.
- [x] All pages listed in `mkdocs.yml` exist under `docs/`.
- [x] Markdown code fences are balanced across the field guides.
- [x] Internal Markdown links in the reviewed field-guide pages resolve.
- [ ] Search finds commands, flags and artifact fields in the browser.
- [ ] Edit links point to the intended source branch / file.

## UI / UX review

- [x] Landing page uses a clear hero, primary actions and topic cards.
- [x] Sidebar is grouped into Field Manual, Notes Library and Project.
- [x] Light / dark palettes are configured and share a teal accent.
- [x] Responsive custom CSS styles cards, typography, tables, callouts and code blocks.
- [x] Topic pages use a consistent label, fast-lookup table, callouts, tabs and troubleshooting.
- [ ] Verify card layout and horizontal scrolling on a narrow mobile viewport.
- [ ] Verify palette toggle, search keyboard navigation and code copy in a browser.
- [ ] Review long command blocks for line wrap / horizontal scroll on mobile.

## Deployment

- [x] Pull-request workflow builds without deploying the draft.
- [ ] Merge the PR into `main`.
- [ ] Confirm **Settings → Pages → Source** is set to **GitHub Actions**.
- [ ] Confirm the post-merge deploy job completes.
- [ ] Open the published Pages URL and test a few routes, search terms and theme toggle.

## Limits

The latest CI build proves that MkDocs config, Markdown processing and navigation compile cleanly. It does not replace visual testing in an actual desktop / mobile browser, and it does not prove that the site is already publicly deployed. Tool commands are reference examples and have not been executed in the user's CEH iLabs image.
