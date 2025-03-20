import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        // 路徑在 /api 開頭，就會啟用 proxy 服務
        target: "http://localhost:3000", // proxy 的目標
        changeOrigin: true, // 跨域請求時使用
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  base: "/tid201/g2/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
