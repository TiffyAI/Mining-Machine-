import { defineConfig } from 'vite'

export default defineConfig({
  base: '/Mining-Machine-/', // keep this for GitHub Pages
  build: {
    outDir: 'dist',
    assetsInclude: ['**/*.mp4', '**/*.jpg']
  },
  publicDir: 'public' // <-- ensure this line is here
})
