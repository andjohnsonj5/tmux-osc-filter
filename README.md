# tmux-osc-filter

Builds run automatically on pushes to `master`, pull requests targeting `master`, manual dispatches, and `tmux-binary-*` tags. Push and pull request builds upload GitHub Actions artifacts. To refresh the downloadable `releases/latest` binaries, create and push a new `tmux-binary-*` tag so GitHub Actions publishes a new GitHub Release and marks it as the latest release. Release binaries are built on Ubuntu 22.04 for better compatibility with systems that do not provide the newer `libtinfo` ABI from Ubuntu 24.04. Mouse selections still use tmux copy mode by default, but copied text now also falls back to common clipboard tools such as `wl-copy`, `xsel`, `xclip`, `pbcopy`, and `clip.exe` when terminal clipboard integration is unavailable. Clipboard integration is enabled by default so Windows Terminal over SSH can use tmux-side OSC 52 copies out of the box.

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

Windows Terminal over SSH to Linux running tmux:

- Keep tmux mouse support enabled if you want pane mouse handling and wheel events.
- In Windows Terminal, enable `copyOnSelect` so terminal-side selections copy to the Windows clipboard automatically.
- When tmux mouse mode is active, use `Shift` + drag to force Windows Terminal text selection instead of sending the drag to tmux.
- tmux copies still try terminal clipboard integration first, then fall back to common clipboard commands.

Windows Terminal `settings.json` example:

```json
{
  "copyOnSelect": true
}
```

Recommended tmux config for this scenario:

```tmux
set -g mouse on
set -s set-clipboard on
set -as terminal-features ',xterm-256color:clipboard'
```
