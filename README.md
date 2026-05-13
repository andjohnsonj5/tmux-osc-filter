# tmux-osc-filter

One-line install on Linux x86_64:

```bash
curl -L  -o /usr/local/bin/tmux \
https://github.com/andjohnsonj5/tmux-osc-filter/releases/latest/download/tmux \
&& chmod 755 /usr/local/bin/tmux
```

Verify:

```bash
tmux -V
```

Windows Terminal selection:

This build leaves tmux mouse mode off by default so Windows Terminal native
drag selection and right-click copy keep working. If you prefer tmux mouse
selection, panes, and wheel handling, add this to `~/.tmux.conf`:

```tmux
set -g mouse on
```
