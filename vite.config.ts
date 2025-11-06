// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    svgr({ svgrOptions: { icon: true } }), // ⬅️ react보다 앞에
    react(),
    tsconfigPaths(),
  ],
  resolve: { alias: { "@": "/src" } },
  server: { port: 5173 },
});
