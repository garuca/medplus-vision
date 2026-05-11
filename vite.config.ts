import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      "/proxy-melhor-envio": {
        target: "https://melhorenvio.com.br",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/proxy-melhor-envio/, ""),
      },
    },
  },
});
