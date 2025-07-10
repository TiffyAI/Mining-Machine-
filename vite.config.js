import { defineConfig } from 'vite'

export default defineConfig({
  base: '/Mining-Machine-/', // very important for GitHub Pages
  build: {
    outDir: 'dist',
    assetsInclude: ['**/*.mp4', '**/*.jpg']
  }
})
