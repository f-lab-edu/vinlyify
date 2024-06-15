import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import type { UserConfig } from 'vite';
import type { InlineConfig } from 'vitest';

type ViteConfig = UserConfig & { test: InlineConfig };
const config: ViteConfig = {
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
  server: {
    proxy: {
      '/music-info/api': {
        target: 'https://api.musixmatch.com/ws/1.1',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/music-info\/api/, ''),
      },
      '/music-info/stands4-api': {
        target: 'https://www.stands4.com/services/v2',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/music-info\/stands4-api/, ''),
      },
    },
  },
};
export default defineConfig(config);
