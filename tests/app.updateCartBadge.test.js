import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

const setupCartBadgeTest = async (cartData) => {
  document.body.innerHTML = `
    <span id="cartBadge" class="hidden"></span>
  `;

  const localStorageMock = vi
    .spyOn(Storage.prototype, 'getItem')
    .mockImplementation((key) => {
      return key === 'cart' ? cartData : null;
    });

  await import('../assets/js/app.js');

  return {
    badge: document.querySelector('#cartBadge'),
    localStorageMock,
  };
};

describe('Fitur badge keranjang', () => {
  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = '';
    delete window.updateCartBadge;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
    document.body.innerHTML = '';
    delete window.updateCartBadge;
  });

  it('menampilkan jumlah seluruh produk di keranjang', async () => {
    const dataKeranjang = JSON.stringify([
      { qty: 2 },
      { qty: 3 },
    ]);

    const { badge, localStorageMock } = await setupCartBadgeTest(dataKeranjang);

    window.updateCartBadge();

    expect(localStorageMock).toHaveBeenCalledWith('cart');
    expect(badge.textContent).toBe('5');
    expect(badge.classList.contains('hidden')).toBe(false);
  });

  it('menyembunyikan badge jika keranjang tidak memiliki item', async () => {
    const { badge } = await setupCartBadgeTest('[]');

    window.updateCartBadge();

    expect(badge.classList.contains('hidden')).toBe(true);
  });

  it('tetap aman ketika data cart di localStorage tidak valid', async () => {
    const { badge } = await setupCartBadgeTest('{data-tidak-valid');

    expect(() => {
      window.updateCartBadge();
    }).not.toThrow();

    expect(badge.classList.contains('hidden')).toBe(true);
  });
});