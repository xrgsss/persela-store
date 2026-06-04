import { describe, it, expect, vi, beforeEach } from 'vitest';

function safeUpdateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => {
    // Menerapkan prinsip defensive: jika quantity minus, paksa jadi 0
    const q = item.quantity < 0 ? 0 : item.quantity;
    return sum + q;
  }, 0);
  const badgeElement = document.getElementById('cartBadge');
  if (badgeElement) badgeElement.textContent = totalItems;
}

describe('Regression Test - Penanganan Nilai Minus', () => {
  beforeEach(() => {
    document.body.innerHTML = '<span id="cartBadge">0</span>';
    vi.restoreAllMocks();
  });

  it('harus mengabaikan item jika quantity bernilai negatif/minus', () => {
    const anomalyData = JSON.stringify([
      { id: 1, name: 'Jersey Persela', quantity: 3 },
      { id: 2, name: 'Syal Persela', quantity: -5 } // Data aneh/minus
    ]);
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(anomalyData);

    safeUpdateCartBadge();

    const badgeElement = document.getElementById('cartBadge');
    // Hasil harus 3, karena yang -5 diabaikan (dianggap 0)
    expect(badgeElement.textContent).toBe('3');
  });
});
