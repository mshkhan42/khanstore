import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}


export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    let parsed = [];
    if (stored) {
      try {
        parsed = JSON.parse(stored);
        if (!Array.isArray(parsed)) {
          localStorage.removeItem('cart');
          parsed = [];
        }
      } catch {
        localStorage.removeItem('cart');
        parsed = [];
      }
    }
    return parsed;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      // normalize image field: prefer selectedImage, then image, then first of images
      const normalized = { ...product };
      if (!normalized.image) {
        normalized.image = normalized.selectedImage || (normalized.images && normalized.images[0]) || '';
      }
      return [...prev, { ...normalized, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  function updateQuantity(id, quantity) {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
// ...existing code...
