import { describe, it, expect, vi, beforeEach } from 'vitest';

function safeUpdateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => {
    // Memastikan jika ada input desimal, dibulatkan ke bawah dengan Math.floor atau parseInt
    const q = Math.floor(parseFloat(item.quantity)) || 0;
    return sum + q;
  }, 0);
  const badgeElement = document.getElementById('cartBadge');
  if (badgeElement) badgeElement.textContent = totalItems;
}

describe('Data Integrity Test - Penanganan Angka Desimal', () => {
  beforeEach(() => {
    document.body.innerHTML = '<span id="cartBadge">0</span>';
    vi.restoreAllMocks();
  });

  it('harus membulatkan nilai quantity desimal ke bawah demi integritas data UI', () => {
    const decimalData = JSON.stringify([
      { id: 1, name: 'Jersey Persela', quantity: 2.7 }, // Desimal pecahan
      { id: 2, name: 'Syal Persela', quantity: 1.2 }
    ]);
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(decimalData);

    safeUpdateCartBadge();

    const badgeElement = document.getElementById('cartBadge');
    // Hasil harus 3 (dari pembulatan 2 + 1), bukan 3.9 yang bisa merusak tampilan HTML
    expect(badgeElement.textContent).toBe('3');
  });
});
