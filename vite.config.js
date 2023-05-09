import { defineConfig } from "vite";
import { resolve } from 'path'




export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        success: resolve(__dirname, 'form/success.html')
      }
    }
  }
  })

  