'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    itemCount,
    subtotal,
    discount,
    shippingFee,
    grandTotal,
    appliedCoupon,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = 799;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setIsApplyingCoupon(true);
    await applyCoupon(couponInput.trim());
    setIsApplyingCoupon(false);
    setCouponInput('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={closeCartDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-brand-ivory border-l border-brand-gold/30 shadow-2xl flex flex-col justify-between animate-slide-left">
          {/* Header */}
          <div className="p-6 border-b border-brand-gold/20 flex items-center justify-between bg-brand-ivory">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-brand-forest" />
              <h2 className="font-serif text-xl font-bold text-brand-forest tracking-wide">
                Sacred Basket
              </h2>
              <span className="text-xs bg-brand-sage text-brand-forest px-2.5 py-0.5 rounded-full font-semibold">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={closeCartDrawer}
              className="p-2 text-stone-500 hover:text-brand-forest rounded-full hover:bg-brand-sage/30 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Milestone Meter */}
          <div className="bg-brand-sage-light px-6 py-3 border-b border-brand-gold/15">
            {amountToFreeShipping > 0 ? (
              <div>
                <p className="text-xs text-brand-forest font-medium mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  Add <strong className="text-brand-forest font-bold">₹{amountToFreeShipping}</strong> more for <strong>FREE Divine Shipping</strong>!
                </p>
                <div className="w-full bg-brand-sage h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-forest h-full transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-xs text-brand-forest font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-gold shrink-0 animate-bounce" />
                Congratulations! You have unlocked FREE Pan-India Shipping!
              </p>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-brand-sage/40 flex items-center justify-center mb-4 text-brand-forest">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-2xl text-brand-forest font-semibold mb-2">
                  Your Sacred Basket is Empty
                </h3>
                <p className="text-sm text-brand-text-muted max-w-xs mb-6">
                  Discover our temple-grade agarbatti, Mysore chandan, and sacred pooja essentials.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCartDrawer}
                  className="inline-flex items-center gap-2 bg-brand-forest text-brand-ivory px-6 py-3 rounded text-xs font-sans tracking-widest hover:bg-brand-forest-light transition-all shadow-luxury"
                >
                  EXPLORE SHOP <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 p-3.5 bg-white/70 rounded-lg border border-brand-gold/15 shadow-sm"
                >
                  <Link
                    href={`/shop/${item.slug}`}
                    onClick={closeCartDrawer}
                    className="relative w-20 h-20 rounded bg-brand-ivory shrink-0 overflow-hidden border border-brand-gold/10 block hover:opacity-85 transition-opacity"
                  >
                    <Image
                      src={item.image}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/shop/${item.slug}`}
                          onClick={closeCartDrawer}
                          className="font-serif text-sm font-semibold text-brand-forest hover:text-brand-gold line-clamp-1"
                        >
                          {item.productName}
                        </Link>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-brand-text-muted">{item.packSize}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-brand-forest">
                          ₹{item.price}
                        </span>
                        {item.mrp > item.price && (
                          <span className="text-xs text-stone-400 line-through">
                            ₹{item.mrp}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-brand-gold/30 rounded bg-brand-ivory/60">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-1 hover:bg-brand-sage/50 text-brand-forest"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-brand-forest">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-1 hover:bg-brand-sage/50 text-brand-forest"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <span className="text-xs font-bold text-brand-forest">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] bg-brand-ivory border-t border-brand-gold/25 space-y-4">
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-brand-sage/50 border border-brand-gold/30 rounded text-xs text-brand-forest">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-brand-gold" />
                    <span>
                      Coupon <strong>{appliedCoupon.code}</strong> applied (-₹{discount})
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-500 hover:text-rose-600 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Coupon (e.g. DIVINE10)"
                    className="flex-1 px-3 py-2 text-xs border border-brand-gold/30 rounded bg-white focus:outline-none focus:border-brand-gold uppercase text-brand-forest font-mono"
                  />
                  <button
                    type="submit"
                    disabled={isApplyingCoupon || !couponInput.trim()}
                    className="px-4 py-2 bg-brand-forest text-brand-ivory text-xs tracking-wider rounded font-sans hover:bg-brand-forest-light disabled:opacity-50 transition-colors"
                  >
                    APPLY
                  </button>
                </form>
              )}

              {/* Price Details */}
              <div className="space-y-1.5 text-xs text-brand-forest/80 font-sans">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-forest">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Coupon Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Charges</span>
                  <span className="font-semibold text-brand-forest">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-800 font-bold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="border-t border-brand-gold/20 pt-2 flex justify-between text-sm font-bold text-brand-forest">
                  <span>Estimated Total</span>
                  <span className="text-base text-brand-forest">₹{grandTotal}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                onClick={closeCartDrawer}
                className="w-full py-3.5 bg-brand-forest text-brand-ivory rounded font-sans text-xs tracking-[0.2em] font-semibold flex items-center justify-center gap-2 hover:bg-brand-forest-light transition-all shadow-luxury"
              >
                PROCEED TO CHECKOUT • ₹{grandTotal} <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-brand-text-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                <span>100% Secure Checkout with Razorpay &amp; COD Available</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
