import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import type { UserConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import type { InlineConfig } from 'vitest';

type ViteConfig = UserConfig & { test: InlineConfig };
const config: ViteConfig = {
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        exportType: 'default',
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
    sentryVitePlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: 'pyotato',
      project: 'javascript-react',
    }),
  ],
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
      '/genius/api': {
        target: 'https://api.genius.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/genius\/api/, ''),
      },
    },
  build: {
    sourcemap: true, // Source map generation must be turned on
  },
};
export default defineConfig(config);
