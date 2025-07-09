import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/Mining-Machine-/', // 👈 VERY IMPORTANT! this is your repo name
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
})
