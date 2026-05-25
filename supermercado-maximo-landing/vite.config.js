import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    cssMinify: true,       // ← agregar
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':     ['react', 'react-dom'],
          'vendor-bootstrap': ['bootstrap'],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console:  true,
        drop_debugger: true,
      },
    },
  },
})