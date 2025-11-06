// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  base: "/kbank/",
  plugins: [svgr({ svgrOptions: { icon: true } }), react(), tsconfigPaths()],
  resolve: { alias: { "@": "/src" } },
  server: { port: 5173 },
});
