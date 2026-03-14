import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "::",
    port: 8081,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3001",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@portal": path.resolve(__dirname, "./portal-src"),
    },
  },
  build: {
    outDir: "portal-dist",
    rollupOptions: {
      input: path.resolve(__dirname, "portal.html"),
    },
  },
});
