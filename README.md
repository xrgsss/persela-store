mukhammad rangga hari febrianto
reyhan alfin poko
arya affif ramadhani
arkan alsafi sulaksono

## 🧪 Laporan Pengujian Perangkat Lunak (Tugas DPL)

### 1. Komponen yang Diuji
- **File:** `assets/js/app.js`
- **Fungsi:** `updateCartBadge()`
- **Deskripsi:** Fungsi untuk mengambil data keranjang dari `localStorage` dan memperbarui teks jumlah barang pada elemen badge di halaman web.

### 2. Strategi Pengujian & Test Double
- **Jenis Test Double:** **Stub** pada fungsi `localStorage.getItem`.
- **Alasan:** Memotong dependensi langsung ke browser. Dengan stub, kita bisa memalsukan data isi keranjang (*canned data*) agar pengujian berjalan secara terisolasi dan mandiri (deterministik).
- **Environment:** Vitest + jsdom.

### 3. Cara Menjalankan Unit Testing
Untuk menjalankan pengujian ini secara lokal, pastikan sudah menginstal dependensi lalu jalankan perintah:
```bash
npm install
npx vitest run
