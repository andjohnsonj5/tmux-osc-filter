# tmux-osc-filter

Builds run automatically on pushes to `master`, pull requests targeting `master`, manual dispatches, and `tmux-binary-*` tags. Push and pull request builds upload GitHub Actions artifacts. To refresh the downloadable `releases/latest` binaries, create and push a new `tmux-binary-*` tag so GitHub Actions publishes a new GitHub Release and marks it as the latest release. Release binaries are built on Ubuntu 22.04 for better compatibility with systems that do not provide the newer `libtinfo` ABI from Ubuntu 24.04.

Publish a new latest binary release:

```bash
export GIT_TERMINAL_PROMPT=0
tag=tmux-binary-$(date -u +%Y%m%d-%H%M%S)
git tag "$tag"
git push origin "$tag"
```

Install the latest released binary:

```bash
curl -L https://github.com/andjohnsonj5/tmux-osc-filter/releases/latest/download/tmux -o /usr/local/bin/tmux && chmod +x /usr/local/bin/tmux
```

Install the latest released Ubuntu 22.04-compatible binary:

```bash
curl -L https://github.com/andjohnsonj5/tmux-osc-filter/releases/latest/download/tmux-ubuntu-22.04-x86_64 -o /usr/local/bin/tmux && chmod +x /usr/local/bin/tmux
```
