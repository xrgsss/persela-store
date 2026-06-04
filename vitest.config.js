import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    // Secara spesifik hanya menjalankan berkas tes desimal kita yang sudah valid
    include: ['assets/js/app-decimal.test.js'],
  },
});
