'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, Coupon } from '@/types';
import { useToast } from './ToastContext';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  shippingFee: number;
  grandTotal: number;
  appliedCoupon: Coupon | null;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  addItem: (product: Product, quantity?: number, packSize?: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('aaradhya_cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem('aaradhya_coupon');
      if (savedCoupon) {
        setAppliedCoupon(JSON.parse(savedCoupon));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('aaradhya_cart', JSON.stringify(items));
      if (appliedCoupon) {
        localStorage.setItem('aaradhya_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('aaradhya_coupon');
      }
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [items, appliedCoupon, isLoaded]);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  // Free shipping threshold ₹799
  const shippingFee = subtotal >= 799 || subtotal === 0 ? 0 : 60;

  // Coupon calculation
  let discount = 0;
  if (appliedCoupon && subtotal >= (appliedCoupon.minOrderValue || 0)) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = (subtotal * appliedCoupon.discountValue) / 100;
      if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
        discount = appliedCoupon.maxDiscount;
      }
    } else {
      discount = appliedCoupon.discountValue;
    }
  }

  const grandTotal = Math.max(0, subtotal - discount + shippingFee);

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const addItem = (product: Product, quantity = 1, customPackSize?: string) => {
    setItems((prevItems) => {
      const existing = prevItems.find((i) => i.productId === product.id);
      if (existing) {
        return prevItems.map((i) =>
          i.productId === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [
        ...prevItems,
        {
          productId: product.id,
          productName: product.name,
          packSize: customPackSize || product.packSize,
          price: product.price,
          mrp: product.mrp,
          quantity,
          image: product.images[0] || '/images/products/sandalwood.png',
          slug: product.slug,
        },
      ];
    });

    showToast(`Added "${product.name}" to your sacred basket.`, 'success');
    openCartDrawer();
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  };

  const removeItem = (productId: string) => {
    const item = items.find((i) => i.productId === productId);
    setItems((prev) => prev.filter((i) => i.productId !== productId));
    if (item) {
      showToast(`Removed "${item.productName}" from cart.`, 'info');
    }
  };

  const applyCoupon = async (code: string) => {
    try {
      const res = await fetch(`/api/coupons/validate?code=${encodeURIComponent(code)}&subtotal=${subtotal}`);
      const data = await res.json();
      if (data.valid && data.coupon) {
        setAppliedCoupon(data.coupon);
        showToast(`Coupon "${data.coupon.code}" applied successfully!`, 'success');
        return { success: true, message: `Coupon ${data.coupon.code} applied!` };
      } else {
        showToast(data.message || 'Invalid coupon code', 'error');
        return { success: false, message: data.message || 'Invalid coupon code' };
      }
    } catch {
      showToast('Error validating coupon. Please try again.', 'error');
      return { success: false, message: 'Server error' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        discount,
        shippingFee,
        grandTotal,
        appliedCoupon,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        addItem,
        updateQuantity,
        removeItem,
        applyCoupon,
        removeCoupon,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
