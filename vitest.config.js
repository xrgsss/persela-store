import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    // HANYA jalankan file test yang berada di folder assets/js/
    include: ['assets/js/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}'],
  },
});
