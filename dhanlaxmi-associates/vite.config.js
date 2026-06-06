import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) return 'react-vendor';
            if (id.includes('gsap')) return 'gsap-vendor';
            if (id.includes('framer-motion')) return 'framer-vendor';
            if (id.includes('three') || id.includes('@react-three')) return 'three-vendor';
            if (id.includes('lenis')) return 'lenis-vendor';
            if (id.includes('swiper')) return 'swiper-vendor';
            if (id.includes('lightgallery')) return 'gallery-vendor';
            return 'vendor';
          }
        },
      },
    },
  },
})
