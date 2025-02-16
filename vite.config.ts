import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true
  },
  build: {
    outDir: "dist",  // Ensures dist/ is the output directory
    assetsDir: "assets",  // Ensures that assets don't get duplicated in root dist/
    emptyOutDir: true,  // Cleans dist/ before every new build to prevent duplicates
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion', '@hello-pangea/dnd']
        }
      }
    },
    copyPublicDir: true,  // Ensures that public/ files are referenced correctly, not duplicated
  }
});
