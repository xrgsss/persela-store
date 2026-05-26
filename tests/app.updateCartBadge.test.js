import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

async function loadAppWithCartStorage(cartValue) {
  document.body.innerHTML = '<span id="cartBadge" class="hidden"></span>';

  // Test double: stub localStorage.getItem agar test bisa mengontrol isi cart.
  const getItemStub = vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
    if (key === 'cart') return cartValue;
    return null;
  });

  await import('../assets/js/app.js');

  return {
    cartBadge: document.getElementById('cartBadge'),
    getItemStub
  };
}

describe('updateCartBadge', () => {
  beforeEach(() => {
    vi.resetModules();
    delete window.updateCartBadge;
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
    delete window.updateCartBadge;
    document.body.innerHTML = '';
  });

  it('menampilkan total qty cart pada badge', async () => {
    const { cartBadge, getItemStub } = await loadAppWithCartStorage(
      JSON.stringify([{ qty: 2 }, { qty: 3 }])
    );

    window.updateCartBadge();

    expect(getItemStub).toHaveBeenCalledWith('cart');
    expect(cartBadge.textContent).toBe('5');
    expect(cartBadge.classList.contains('hidden')).toBe(false);
  });

  it('menyembunyikan badge ketika cart kosong', async () => {
    const { cartBadge } = await loadAppWithCartStorage('[]');

    window.updateCartBadge();

    expect(cartBadge.classList.contains('hidden')).toBe(true);
  });

  it('menyembunyikan badge ketika data cart rusak', async () => {
    const { cartBadge } = await loadAppWithCartStorage('{cart-rusak');

    expect(() => window.updateCartBadge()).not.toThrow();
    expect(cartBadge.classList.contains('hidden')).toBe(true);
  });
});
