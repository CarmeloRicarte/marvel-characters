/// <reference types="vitest/globals" />

import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, 'src/ui'),
      '@marvel': path.resolve(__dirname, 'src/marvel'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      include: ['src'],
      reporter: ['text', 'json', 'html'],
      exclude: [
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/**/index.ts',
        'src/__mocks__/**/*',
        'src/App.tsx',
      ],
      thresholds: {
        branches: 80,
        functions: 80,
        statements: 80,
        lines: 80,
      },
    },
    restoreMocks: true,
    setupFiles: ['./setupTests.ts'],
  },
});
