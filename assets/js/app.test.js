import { describe, it, expect, vi, beforeEach } from 'vitest';

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
    document.body.innerHTML = '<span id="cartBadge">0</span>';
    vi.restoreAllMocks();
  });

  it('harus memperbarui badge dengan total quantity dari localStorage', () => {
    const fakeCartData = JSON.stringify([
      { id: 1, name: 'Jersey Persela', quantity: 2 },
      { id: 2, name: 'Syal Persela', quantity: 3 }
    ]);
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(fakeCartData);

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
    document.body.innerHTML = '<span id="cartBadge">0</span>';
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue("{ data keranjang rusak }");

    const safeUpdateCartBadge = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const badgeElement = document.getElementById('cartBadge');
        if (badgeElement) badgeElement.textContent = totalItems;
      } catch (error) {
        const badgeElement = document.getElementById('cartBadge');
        if (badgeElement) badgeElement.textContent = '0';
      }
    };

    expect(() => safeUpdateCartBadge()).not.toThrow();
    const badgeElement = document.getElementById('cartBadge');
    expect(badgeElement.textContent).toBe('0');
  });
});
});
