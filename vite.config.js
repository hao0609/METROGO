import { fileURLToPath, URL } from "node:url";
import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    allowedHosts: true,
    proxy: {
      "/api": {
        // 路徑在 /api 開頭，就會啟用 proxy 服務
        target: "http://localhost:3000", // proxy 的目標
        changeOrigin: true, // 跨域請求時使用
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/oauth2": {
        // line 註冊登入用
        target: "https://api.line.me", 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/oauth2/, ""),
      }
    },
  },
  base: "/tid201/g2/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
