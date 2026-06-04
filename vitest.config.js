import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // Memastikan semua test otomatis punya akses ke HTML DOM buatan
    globals: true,        // Mengizinkan penggunaan fungsi seperti 'describe' tanpa perlu di-import manual tiap file
  },
});
