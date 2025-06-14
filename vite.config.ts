import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
import viteImagemin from "vite-plugin-imagemin";
export default defineConfig({
  plugins: [
    react(),
    // 压缩插件，打包时启用
    viteCompression({
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
      deleteOriginFile: true,
    }),
    // 打包分析插件
    visualizer({ open: true }),
    // 图片压缩插件
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
          },
          {
            name: "removeEmptyAttrs",
            active: false,
          },
        ],
      },
    }),
  ],
  resolve: {},
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
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: "[ext]/[name]-[hash].[ext]",
      },
    },
  },
});
