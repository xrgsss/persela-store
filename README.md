mukhammad rangga hari febrianto
reyhan alfin poko
arya affif ramadhani

## Unit Testing - Design for Testability

Bagian ini dibuat untuk dokumentasi tugas individu mata kuliah Design for Testability dan Unit Testing.

### Fitur/function yang diuji

Function yang diuji adalah `updateCartBadge()` pada file `assets/js/app.js`.

Function ini bertugas membaca data keranjang dari `localStorage`, menghitung total `qty`, lalu menampilkan atau menyembunyikan badge keranjang pada elemen `#cartBadge`.

### Jenis test double yang digunakan

Test double yang digunakan adalah **stub** untuk `localStorage.getItem`.

### Alasan menggunakan test double

`updateCartBadge()` bergantung pada data dari `localStorage`. Agar unit test tidak bergantung pada isi storage browser yang asli, `localStorage.getItem` dibuat sebagai stub sehingga test bisa mengatur sendiri isi cart untuk setiap skenario.

Dengan cara ini, test menjadi lebih terisolasi, mudah diulang, dan cocok untuk prinsip Design for Testability.

### Daftar test case

1. Cart berisi item dengan `qty` 2 dan 3.
   - Hasil yang diharapkan: badge menampilkan angka `5` dan class `hidden` dihapus.

2. Cart kosong.
   - Hasil yang diharapkan: badge tetap disembunyikan dengan class `hidden`.

3. Data cart rusak atau bukan JSON valid.
   - Hasil yang diharapkan: function tidak error dan badge disembunyikan.

### Cara menjalankan unit test

Jalankan command berikut dari root project:

```bash
npm.cmd test
```

Jika menggunakan terminal yang tidak bermasalah dengan execution policy, command berikut juga bisa digunakan:

```bash
npm test
```

### Hasil yang diharapkan

Output test yang diharapkan:

```text
Test Files  1 passed
Tests       3 passed
```

### Catatan tugas individu

Unit test ini dibuat sebagai tambahan individu untuk memenuhi tugas Design for Testability dan Unit Testing. Test berfokus pada satu function yang kecil, aman diuji, dan tidak mengubah fitur utama aplikasi.

### Bukti hasil unit test

Riwayat pengujian unit test di GitHub dapat dilihat melalui GitHub Actions pada workflow **Unit Test** setelah branch ini di-push ke GitHub:

```text
https://github.com/xrgsss/persela-store/actions/workflows/unit-test.yml
```

Screenshot hasil unit test disimpan di folder `screenshots/`. Nama file yang disarankan:

```text
screenshots/hasil-unit-test.png
```

Cara mengambil screenshot hasil unit test:

1. Jalankan unit test dari terminal:

```bash
npm.cmd test
```

2. Pastikan hasil terminal menunjukkan:

```text
Test Files  1 passed
Tests       3 passed
```

3. Ambil screenshot terminal tersebut menggunakan fitur screenshot di sistem operasi.

4. Simpan gambar asli ke folder `screenshots/` dengan nama:

```text
hasil-unit-test.png
```

5. Commit dan push file screenshot tersebut ke branch tugas. Setelah itu, link GitHub gambar dapat menggunakan format:

```text
https://github.com/xrgsss/persela-store/blob/tugas-unit-test-design-for-testability/screenshots/hasil-unit-test.png
```

Catatan: screenshot harus berasal dari hasil test yang benar-benar dijalankan, bukan gambar contoh atau screenshot palsu.
