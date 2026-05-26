mukhammad rangga hari febrianto
reyhan alfin poko
arya affif ramadhani

## Unit Testing - Design for Testability

Untuk tugas individu ini saya menambahkan unit test sederhana pada bagian badge keranjang.

### Bagian yang diuji

- File: `assets/js/app.js`
- Function: `updateCartBadge()`

Function ini membaca data `cart` dari `localStorage`, menjumlahkan semua `qty`, lalu mengatur tampilan badge keranjang di elemen `#cartBadge`.

Saya memilih bagian ini karena logic-nya kecil, tidak perlu login, tidak perlu backend, dan tidak perlu mengubah alur utama aplikasi.

### Test double

Test double yang digunakan adalah **stub** pada `localStorage.getItem`.

Stub ini dipakai supaya isi cart bisa ditentukan langsung dari file test. Jadi test tidak bergantung pada data yang sedang tersimpan di browser asli. Ini juga membuat test lebih mudah dijalankan ulang dengan hasil yang sama.

### Daftar test case

1. Cart berisi item dengan `qty` 2 dan 3. Hasilnya badge harus menampilkan angka `5`.
2. Cart kosong. Hasilnya badge tetap disembunyikan.
3. Data cart rusak atau bukan JSON valid. Hasilnya function tidak error dan badge tetap disembunyikan.

### Cara menjalankan unit test

Jalankan dari root project:

```bash
npm.cmd test
```

Kalau terminal bisa menjalankan npm langsung, command ini juga bisa dipakai:

```bash
npm test
```

### Hasil yang diharapkan

Hasil yang diharapkan di terminal:

```text
Test Files  1 passed
Tests       3 passed
```

### Catatan tugas individu

Unit test ini saya buat sebagai bagian individu untuk tugas Design for Testability dan Unit Testing. Test hanya fokus ke satu function supaya mudah dijelaskan dan tidak mengubah fitur utama aplikasi.

### Bukti hasil unit test

Riwayat test di GitHub bisa dilihat dari workflow **Unit Test** setelah branch ini di-push:

```text
https://github.com/xrgsss/persela-store/actions/workflows/unit-test.yml
```

Screenshot hasil test disimpan di folder `screenshots/`. Nama file yang dipakai:

```text
screenshots/hasil-unit-test.png
```

Cara menyiapkan screenshot:

1. Jalankan test dari terminal:

```bash
npm.cmd test
```

2. Pastikan hasil terminal menunjukkan:

```text
Test Files  1 passed
Tests       3 passed
```

3. Ambil screenshot terminal tersebut.

4. Simpan gambar ke folder `screenshots/` dengan nama:

```text
hasil-unit-test.png
```

5. Commit dan push screenshot tersebut. Link gambar di GitHub nantinya:

```text
https://github.com/xrgsss/persela-store/blob/tugas-unit-test-design-for-testability/screenshots/hasil-unit-test.png
```

Catatan: screenshot harus berasal dari hasil test yang benar-benar dijalankan sendiri, bukan gambar contoh.
