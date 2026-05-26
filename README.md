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
