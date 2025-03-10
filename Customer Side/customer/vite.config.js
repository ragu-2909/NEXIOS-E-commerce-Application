import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }) // Analyze bundle size (optional)
  ],
  optimizeDeps: {
    include: [
      // Add frequently used dependencies to pre-bundle them
      'react',
      'react-dom',
    ],
    exclude: [
      // Exclude dependencies you don't need or rarely use
      'unused-large-library',
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group all node_modules dependencies into a single chunk
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    watch: {
      // Ignore unnecessary files during development
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
  },
})
