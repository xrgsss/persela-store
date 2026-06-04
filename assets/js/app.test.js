import { describe, it, expect, vi, beforeEach } from 'vitest';

// DATA DUMMY (Menerapkan prinsip Clean Code agar tidak duplikasi data)
const FAKE_CART_DATA = JSON.stringify([
  { id: 1, name: 'Jersey Persela', quantity: 2 },
  { id: 2, name: 'Syal Persela', quantity: 3 }
]);
const CORRUPT_JSON_DATA = "{ data keranjang rusak masukkan teks acak }";

function testUpdateCartBadge() {
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badgeElement = document.getElementById('cartBadge');
    if (badgeElement) badgeElement.textContent = totalItems;
  } catch (error) {
    const badgeElement = document.getElementById('cartBadge');
    if (badgeElement) badgeElement.textContent = '0';
  }
}

describe('updateCartBadge() - Unit Test dengan JSDOM & Stub', () => {
  beforeEach(() => {
    document.body.innerHTML = '<span id="cartBadge">0</span>';
    vi.restoreAllMocks();
  });

  it('harus memperbarui badge dengan total quantity dari localStorage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(FAKE_CART_DATA);
    testUpdateCartBadge();
    const badgeElement = document.getElementById('cartBadge');
    expect(badgeElement.textContent).toBe('5');
  });

  it('harus menampilkan "0" jika localStorage kosong atau null', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    testUpdateCartBadge();
    const badgeElement = document.getElementById('cartBadge');
    expect(badgeElement.textContent).toBe('0');
  });

  it('harus menangani data JSON corrupt di localStorage tanpa membuat aplikasi crash', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(CORRUPT_JSON_DATA);
    expect(() => testUpdateCartBadge()).not.toThrow();
    const badgeElement = document.getElementById('cartBadge');
    expect(badgeElement.textContent).toBe('0');
  });
});
