import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': env.VITE_PROXY_URL
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './test-setup.ts',
      css: true,
    },
  };
});