import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

const setupBadgeCart = async (cartValue) => {
  document.body.innerHTML = `
    <span id="cartBadge" class="hidden"></span>
  `;

  vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
    if (key === 'cart') {
      return cartValue;
    }

    return null;
  });

  await import('../assets/js/app.js');

  return document.querySelector('#cartBadge');
};

describe('Pengujian tambahan cart badge', () => {
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

  it('tidak error ketika elemen cartBadge tidak tersedia', async () => {
    document.body.innerHTML = '';

    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(
      JSON.stringify([{ qty: 2 }])
    );

    await import('../assets/js/app.js');

    expect(() => {
      window.updateCartBadge();
    }).not.toThrow();
  });

  it('menampilkan badge jika hanya ada satu produk di cart', async () => {
    const badge = await setupBadgeCart(
      JSON.stringify([{ qty: 4 }])
    );

    window.updateCartBadge();

    expect(badge.textContent).toBe('4');
    expect(badge.classList.contains('hidden')).toBe(false);
  });

  it('menyembunyikan badge jika cart bernilai null', async () => {
    const badge = await setupBadgeCart(null);

    window.updateCartBadge();

    expect(badge.classList.contains('hidden')).toBe(true);
  });
});
