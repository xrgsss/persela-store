import { describe, it, expect, vi, beforeEach } from 'vitest';

// Fungsi kalkulasi mandiri yang aman dari segala bentuk data aneh (Desimal, Null, atau Corrupt)
function sdmCartCalculator() {
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!Array.isArray(cart)) return '0';
    
    const totalItems = cart.reduce((sum, item) => {
      // Antisipasi jika quantity bernilai desimal, tulisan huruf, atau minus
      const q = Math.floor(parseFloat(item.quantity)) || 0;
      return sum + (q < 0 ? 0 : q);
    }, 0);
    
    return String(totalItems);
  } catch (e) {
    return '0'; // Fallback aman jika data JSON rusak total
  }
}

describe('Pengujian Integritas Data - Persela Store', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('harus membulatkan nilai quantity desimal ke bawah demi integritas data', () => {
    const decimalData = JSON.stringify([
      { id: 1, name: 'Jersey Persela', quantity: 2.7 },
      { id: 2, name: 'Syal Persela', quantity: 1.2 }
    ]);
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(decimalData);

    const result = sdmCartCalculator();
    expect(result).toBe('3'); // 2 + 1 = 3
  });

  it('harus mengembalikan "0" jika data localStorage corrupt atau rusak', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue("{ data acak rusak }");
    
    const result = sdmCartCalculator();
    expect(result).toBe('0'); // Aman tidak membuat server crash
  });
});
