Nama Kelompok

Arkan Alsafi Sulaksono - 202210370311130
Reyhan Alfin Poki - 202310370311167
Mukhammad Rangga Hari Febrianto - 202310370311125
Arya Affif Ramadhani - 202310370311411

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

### 4. Refactoring & Pemeliharaan Kode (Code Maintainability)
Untuk menjaga kualitas kode agar tetap bersih (*Clean Code*) sesuai dengan prinsip Desain Perangkat Lunak, dilakukan proses refactoring pada file pengujian:
- **Ekstraksi Konstanta:** Data buatan (*fake data*) untuk kondisi normal dan kondisi *corrupt* dipisahkan ke dalam variabel konstanta di luar fungsi test.

### 5. Otomatisasi Pengujian (Continuous Integration)
Untuk memastikan bahwa setiap perubahan kode di masa mendatang tidak merusak fungsi yang sudah ada (*regression*), repositori ini telah dikonfigurasi dengan **GitHub Actions (CI)**:
- **Pipeline Otomatis:** File `.github/workflows/vitest.yml` akan mendeteksi setiap aktivitas `push` atau `pull request` ke branch `main`.

### 6. Standarisasi Lingkungan & Defensive Testing Lanjutan
- **Vitest Configuration:** Penambahan berkas `vitest.config.js` secara eksplisit menetapkan `environment: 'jsdom'` agar eksekusi pengujian DOM berjalan seragam di semua environment komputer pengembang.

- **Validasi Nilai Input (`NaN` Handling):** Penambahan pengujian aspek *robustness* untuk menangani manipulasi objek `cart` ilegal di sisi klien, memastikan fungsi kalkulasi menggunakan pertahanan `parseInt` dan `isNaN` sebelum merender ke antarmuka pengguna.

Langkah ini bertujuan untuk meningkatkan nilai *readability* (kemudahan kode untuk dibaca) dan mempermudah pemeliharaan jangka panjang (*maintainability*) apabila di kemudian hari struktur data keranjang belanja mengalami perubahan.

Sistem di server GitHub akan otomatis membuat lingkungan virtual Node.js, menginstal seluruh dependensi projek, dan langsung mengeksekusi perintah `npx vitest run`. Hal ini menjamin kode yang masuk ke fase produksi selalu dalam kondisi valid dan lolos uji.

## 🧪 Laporan Pengujian Perangkat Lunak (Branch Tugas)

### 1. Komponen & Strategi Test Double
- **Komponen:** Fungsi `updateCartBadge()` pada file `assets/js/app.js`.
- **Metode:** Unit Testing menggunakan **Vitest** dan lingkungan **jsdom**.
- **Test Double:** Menggunakan **Stub** pada `localStorage.getItem` untuk memotong dependensi browser asli agar pengujian berjalan secara terisolasi dan deterministik.

npm install
npx vitest run
