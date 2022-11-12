import { resolve as pathResolve } from "node:path";
import { promises } from "node:fs";

import { defineConfig } from "vite";
import ReactPlugin from "@vitejs/plugin-react";

const envDir = pathResolve(__dirname, "./.env");

export default defineConfig(async () => {
  return {
    envDir,
    plugins: [ReactPlugin()],
    resolve: {
      alias: {
        "~": pathResolve(__dirname, "./src"),
      },
    },
    server: {
      host: "local.spookysoftware.dev",
      port: 443,
      strictPort: true,
      https: {
        cert: await promises.readFile(pathResolve(envDir, "./certs/local.spookysoftware.dev.pem")),
        key: await promises.readFile(
          pathResolve(envDir, "./certs/local.spookysoftware.dev-key.pem"),
        ),
      },
    },
  };
});
