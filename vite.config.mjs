import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      // /esm/icons/index.mjs only exports the icons statically, so no separate chunks are created
      // fix https://github.com/tabler/tabler-icons/issues/1233
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
    coverage: {
      provider: 'v8',
      // 30% coverage threshold for all metrics, need to be increased
      thresholds: {
        line: 30,
        branches: 30,
        functions: 30,
        statements: 30,
        // autoUpdate: true,
      },
    },
  },
});
