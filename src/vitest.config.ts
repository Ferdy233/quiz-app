import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
   
    // Add module name mapping for static assets
    alias: {
      // Mock SVG imports
      '.*\\.(svg|png|jpg|jpeg|gif)$': '__mocks__/fileMock.js',
    },
  },
});