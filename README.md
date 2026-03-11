Welcome to tmux!

This fork includes two behavior changes aimed at using Codex TUI smoothly
inside tmux:

- mouse support is enabled by default (`set -g mouse on`)
- mouse wheel handling is improved for Codex alternate-screen sessions

* Quick start on a new machine

If you just want the prebuilt binary from GitHub Releases, download it and
start tmux directly:

	$ curl -L -o /usr/local/bin/tmux \
	    https://github.com/andjohnsonj5/tmux-osc-filter/releases/download/tmux-binary-20260311/tmux
	$ chmod +x /usr/local/bin/tmux
	$ /usr/local/bin/tmux -V

Or with wget:

	$ wget -O /usr/local/bin/tmux \
	    https://github.com/andjohnsonj5/tmux-osc-filter/releases/download/tmux-binary-20260311/tmux
	$ chmod +x /usr/local/bin/tmux
	$ /usr/local/bin/tmux -V

If `/usr/local/bin` is before `/usr/bin` in `PATH`, opening a new shell and
running `tmux` will use this build automatically.

* One-command install from GitHub Release (Linux x86_64)

Run as root:

	$ bash -lc 'curl -L \
	    https://github.com/andjohnsonj5/tmux-osc-filter/releases/download/tmux-binary-20260311/tmux \
	    -o /usr/local/bin/tmux && chmod +x /usr/local/bin/tmux'

Then verify:

	$ tmux -V
	$ tmux start-server \; show -gv mouse

The second command should print:

	on

* Recommended Codex usage

To run Codex with this tmux build:

	$ tmux
	$ CODEX_HOME=~/.paolu-codex codex-v0.111.2-long-horizon-x86_64-unknown-linux-gnu

If you want to ensure you are using this fork and not a system tmux binary:

	$ /usr/local/bin/tmux new

* Building from this repository on Debian 13

See `BUILD-DEBIAN13.md` for a step-by-step source build.

tmux is a terminal multiplexer: it enables a number of terminals to be created,
accessed, and controlled from a single screen. tmux may be detached from a
screen and continue running in the background, then later reattached.

This release runs on OpenBSD, FreeBSD, NetBSD, Linux, macOS and Solaris.

* Dependencies

tmux depends on libevent 2.x, available from:

	https://github.com/libevent/libevent/releases/latest

It also depends on ncurses, available from:

	https://invisible-mirror.net/archives/ncurses/

To build tmux, a C compiler (for example gcc or clang), make, pkg-config and a
suitable yacc (yacc or bison) are needed.

* Installation

To build and install tmux from a release tarball, use:

	$ ./configure && make
	$ sudo make install

tmux can use the utempter library to update utmp(5), if it is installed - run
configure with --enable-utempter to enable this.

To get and build the latest from version control - note that this requires
autoconf, automake and pkg-config:

	$ git clone https://github.com/tmux/tmux.git
	$ cd tmux
	$ sh autogen.sh
	$ ./configure && make
	$ sudo make install

* Contributing

Bug reports, feature suggestions and especially code contributions are most
welcome. Please send by email to:

	tmux-users@googlegroups.com

Or open a GitHub issue or pull request.

* Documentation

For documentation on using tmux, see the tmux.1 manpage. View it from the
source tree with:

	$ nroff -mdoc tmux.1|less

A small example configuration is in example_tmux.conf.

Other documentation is available in the wiki:

	https://github.com/tmux/tmux/wiki

Also see the tmux FAQ at:

	https://github.com/tmux/tmux/wiki/FAQ

A bash(1) completion file is at:

	https://github.com/scop/bash-completion/blob/main/completions/tmux

For debugging, run tmux with -v and -vv to generate server and client log files
in the current directory.

* Support

The tmux mailing list for general discussion and bug reports is:

	https://groups.google.com/forum/#!forum/tmux-users

Subscribe by sending an email to:

	tmux-users+subscribe@googlegroups.com

* License

This file and the CHANGES files are licensed under the ISC license. All other
files have a license and copyright notice at their start.
