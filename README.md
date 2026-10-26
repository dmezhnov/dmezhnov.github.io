# dmezhnov.github.io

GitHub Pages site, served from `main`.

- `index.html` redirects to <https://dmezhnov.org/>.
- `privacy.html` is the privacy policy of the Google OAuth app «Claude Calendar MCP»
  (GCP project `claude-calendar-mcp-512719`). Its Branding page names
  `https://dmezhnov.github.io/` as the home page, this file as the privacy policy URL
  and `dmezhnov.github.io` as an authorized domain, so the file must stay here and stay
  a readable policy. `mise test` checks that.

## Publishing

Changes reach `main` only through a release, never a direct push:

```sh
mise publish 0.2.0 "What changed"   # mise test → VERSION → commit → push to test → wait for CI
```

The task refuses a version whose tag `v<version>` already exists, runs `mise test`, writes the
version into `VERSION`, commits everything and pushes the commit to `test`. There
`.github/workflows/publish.yml` runs `mise test` again and only when it is green fast-forwards
`main`, tags `v<version>` and creates the GitHub release with the commit message as its notes;
a red run leaves `main` untouched. The task streams that run and fetches `origin` at the end.
The workflow pushes through the deploy key in the `RELEASE_SSH_KEY` secret, because GitHub refuses
a `GITHUB_TOKEN` push that changes `.github/workflows/`.
