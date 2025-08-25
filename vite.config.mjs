import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/livera-ticketing-app/",
  // This changes the output dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 2000,
  },
  plugins: [
    tsconfigPaths(),
    react()
    // tagger() was removed because it's not defined
  ],
  server: {
    port: "4028",
    host: "0.0.0.0",
    strictPort: true,
  }
});
