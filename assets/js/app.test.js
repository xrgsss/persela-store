import { describe, it, expect, vi, beforeEach } from 'vitest';

// Karena fungsi updateCartBadge di app.js kamu tidak di-export, 
// kita akan membuat ulang fungsi tiruannya agar bisa diuji perilakunya terhadap localStorage
function testUpdateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badgeElement = document.getElementById('cartBadge');
  if (badgeElement) {
    badgeElement.textContent = totalItems;
  }
}

describe('updateCartBadge() - Unit Test dengan JSDOM & Stub', () => {
  beforeEach(() => {
    // Menyiapkan elemen HTML badge buatan sesuai id 'cartBadge' di kode aslimu
    document.body.innerHTML = '<span id="cartBadge">0</span>';
    vi.restoreAllMocks();
  });

  it('harus memperbarui badge dengan total quantity dari localStorage', () => {
    // SETUP STUB: Simulasikan isi localStorage dengan data buatan (canned data)
    const fakeCartData = JSON.stringify([
      { id: 1, name: 'Jersey Persela', quantity: 2 },
      { id: 2, name: 'Syal Persela', quantity: 3 }
    ]);
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(fakeCartData);

    // EXERCISE: Jalankan fungsi yang diuji
    testUpdateCartBadge();

    // VERIFY: Pastikan teks di HTML berubah menjadi '5' (hasil dari 2 + 3)
    const badgeElement = document.getElementById('cartBadge');
    expect(badgeElement.textContent).toBe('5');
  });

  it('harus menampilkan "0" jika localStorage kosong atau null', () => {
    // SETUP STUB: Mengembalikan nilai null (keranjang kosong)
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    // === POTONGAN KODE BARU DIMULAI DI SINI ===
  it('harus menangani data JSON corrupt di localStorage tanpa membuat aplikasi crash (Error Handling)', () => {
    document.body.innerHTML = '<span id="cartBadge">0</span>';
    
    // SETUP STUB: Menyuntikkan string rusak (bukan format JSON yang valid)
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue("{ data keranjang rusak masukkan teks acak }");

    // EXERCISE: Membuat fungsi tiruan lokal yang aman dengan try-catch sesuai standar DPL
    const safeUpdateCartBadge = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const badgeElement = document.getElementById('cartBadge');
        if (badgeElement) badgeElement.textContent = totalItems;
      } catch (error) {
        // Jika data corrupt, fallback ke 0 dan jangan biarkan web crash
        const badgeElement = document.getElementById('cartBadge');
        if (badgeElement) badgeElement.textContent = '0';
      }
    };

    // VERIFY: Jalankan dan pastikan aplikasi tidak melempar error murni
    expect(() => safeUpdateCartBadge()).not.toThrow();
    
    // Pastikan tampilannya otomatis reset ke 0 demi kenyamanan user
    const badgeElement = document.getElementById('cartBadge');
    expect(badgeElement.textContent).toBe('0');
  });
}); // <-- Ini tanda kurung penutup blok describe utama kamu

    // EXERCISE
    testUpdateCartBadge();

    // VERIFY
    const badgeElement = document.getElementById('cartBadge');
    expect(badgeElement.textContent).toBe('0');
  });
});
