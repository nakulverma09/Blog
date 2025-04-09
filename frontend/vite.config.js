import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // 1MB warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom', 'react-router'],
          mantine: ['@mantine/core', '@mantine/hooks', '@mantine/rte'],
          fontawesome: [
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-brands-svg-icons',
            '@fortawesome/free-solid-svg-icons',
            '@fortawesome/react-fontawesome',
          ],
          form: ['react-hook-form'],
          motion: ['framer-motion'],
          quill: ['react-quill'],
          icons: ['lucide-react'],
          axios: ['axios'],
          spinners: ['react-spinners'],
          cookies: ['js-cookie'],
        },
      },
    },
  },
})
