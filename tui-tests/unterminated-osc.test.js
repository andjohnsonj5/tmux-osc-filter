import { expect, test } from "@microsoft/tui-test";
import { spawnSync } from "node:child_process";

const tmux = process.env.TMUX_BIN;
if (!tmux)
  throw new Error("Set TMUX_BIN to the tmux binary to test");

const socket = `tui-osc-${process.pid}`;

test.use({
  columns: 80,
  rows: 24,
  program: {
    file: tmux,
    args: ["-L", socket, "-f", "/dev/null", "new-session", "sh", "-c", "printf ready; sleep 30"]
  }
});

function hasSession() {
  const result = spawnSync(tmux, ["-L", socket, "has-session"], {
    stdio: "ignore"
  });
  return result.status === 0;
}

function clientCount() {
  const result = spawnSync(tmux, ["-L", socket, "list-clients"], {
    encoding: "utf8"
  });
  if (result.status !== 0)
    return 0;
  return result.stdout.trim().split("\n").filter(Boolean).length;
}

async function waitFor(predicate, timeout = 3000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    if (predicate())
      return true;
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  return false;
}

test.afterEach(() => {
  spawnSync(tmux, ["-L", socket, "kill-server"], {
    stdio: "ignore"
  });
});

test("unterminated OSC colour reply does not block following keys", async ({ terminal }) => {
  await expect(terminal.getByText("ready", { full: true })).toBeVisible();
  await waitFor(hasSession);
  await waitFor(() => clientCount() === 1);

  terminal.write("\x1b]10;rgb:aaaa/bbbb/cccc\x02d");

  if (!await waitFor(() => clientCount() === 0))
    throw new Error("tmux did not process C-b d after an unterminated OSC colour reply");
});

test("complete OSC colour value without terminator releases printable input", async ({ terminal }) => {
  await expect(terminal.getByText("ready", { full: true })).toBeVisible();
  await waitFor(hasSession);
  await waitFor(() => clientCount() === 1);

  terminal.write("\x1b]10;rgb:aaaa/bbbb/ccccd");

  await expect(terminal.getByText("readyd", { full: true })).toBeVisible();
});

test("complete OSC colour value without terminator does not wait forever", async ({ terminal }) => {
  await expect(terminal.getByText("ready", { full: true })).toBeVisible();
  await waitFor(hasSession);
  await waitFor(() => clientCount() === 1);

  terminal.write("\x1b]10;rgb:aaaa/bbbb/cccc");
  terminal.write("d");

  await expect(terminal.getByText("readyd", { full: true })).toBeVisible();
});
