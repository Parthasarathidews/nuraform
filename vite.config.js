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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
