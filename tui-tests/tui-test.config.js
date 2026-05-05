import { defineConfig } from "@microsoft/tui-test";

export default defineConfig({
  reporter: "list",
  timeout: 10000,
  trace: false
});
