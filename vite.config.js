import { defineConfig } from "vite";
import { resolve } from 'path'




export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        success: resolve(__dirname, 'form/success.html')
      }
    }
  }
  })