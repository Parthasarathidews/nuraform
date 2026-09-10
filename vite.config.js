// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs/promises";
import path from "node:path";

const injectPrecacheManifest = () => {
  let resolvedConfig;

  return {
    name: "inject-service-worker-precache",
    apply: "build",
    configResolved(config) {
      resolvedConfig = config;
    },
    async writeBundle(outputOptions) {
      const outputDirectory = path.resolve(resolvedConfig.root, outputOptions.dir || resolvedConfig.build.outDir);
      const files = [];

      const collectFiles = async (directory) => {
        const entries = await fs.readdir(directory, { withFileTypes: true });
        for (const entry of entries) {
          const filePath = path.join(directory, entry.name);
          if (entry.isDirectory()) {
            await collectFiles(filePath);
          } else if (entry.name !== "sw.js") {
            files.push(`/${path.relative(outputDirectory, filePath).replaceAll(path.sep, "/")}`);
          }
        }
      };

      await collectFiles(outputDirectory);
      const serviceWorkerPath = path.join(outputDirectory, "sw.js");
      const serviceWorker = await fs.readFile(serviceWorkerPath, "utf8");
      const precacheManifest = JSON.stringify(files.sort());
      await fs.writeFile(serviceWorkerPath, serviceWorker.replace('const PRECACHE_URLS = ["/", "/index.html"];', `const PRECACHE_URLS = ${precacheManifest};`));
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), injectPrecacheManifest()],
  server: {
    watch: {
      // json-server writes db.json on every create/update/delete/reorder.
      // Vite's watcher treats that root-level JSON change as a non-HMR update
      // and triggers a FULL PAGE RELOAD, which wiped the form builder UI state
      // (and sent the user back to the intro content). Ignoring it keeps React
      // state updates purely client-side.
      ignored: ["**/db.json", "**/db.json.*"],
    },
  },
});
