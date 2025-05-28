import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    port: 8000,
    // 设置服务器主机名
    host: "localhost",
    // 设置是否自动打开浏览器
    open: true,
    // 设置服务器代理
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7001",
        changeOrigin: true,
      },
      "/re": {
        target: "http://127.0.0.1:7001",
        changeOrigin: true,
      },
      "/tasks": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
