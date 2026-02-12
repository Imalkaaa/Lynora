import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, Product, ProductImage } from './supabase';

type CartItemType = {
  id: string;
  product: Product & { product_images: ProductImage[] };
  quantity: number;
  size: string;
  color: string;
};

type CartContextType = {
  cart: CartItemType[];
  addToCart: (product: Product & { product_images: ProductImage[] }, quantity: number, size: string, color: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const useCart = () => useContext(CartContext);

function getSessionId() {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItemType[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const sessionId = getSessionId();
    const { data: cartItems } = await supabase
      .from('cart_items')
      .select(`
        id,
        quantity,
        size,
        color,
        product_id
      `)
      .eq('session_id', sessionId);

    if (cartItems) {
      const productIds = cartItems.map(item => item.product_id);
      const { data: products } = await supabase
        .from('products')
        .select(`
          *,
          product_images(*)
        `)
        .in('id', productIds);

      if (products) {
        const formattedCart = cartItems.map(item => {
          const product = products.find(p => p.id === item.product_id);
          return {
            id: item.id,
            product: product!,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
          };
        }).filter(item => item.product);

        setCart(formattedCart);
      }
    }
  };

  const addToCart = async (product: Product & { product_images: ProductImage[] }, quantity: number, size: string, color: string) => {
    const sessionId = getSessionId();

    const { data, error } = await supabase
      .from('cart_items')
      .insert({
        session_id: sessionId,
        product_id: product.id,
        quantity,
        size,
        color,
      })
      .select()
      .single();

    if (data && !error) {
      setCart([...cart, {
        id: data.id,
        product,
        quantity,
        size,
        color,
      }]);
    }
  };

  const removeFromCart = async (id: string) => {
    await supabase
      .from('cart_items')
      .delete()
      .eq('id', id);

    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', id);

    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const clearCart = async () => {
    const sessionId = getSessionId();
    await supabase
      .from('cart_items')
      .delete()
      .eq('session_id', sessionId);

    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}
