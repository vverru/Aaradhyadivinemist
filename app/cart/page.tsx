'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag,
  ArrowLeft,
} from 'lucide-react';
import { useCart } from '@/components/context/CartContext';

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    discount,
    shippingFee,
    grandTotal,
    appliedCoupon,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [applying, setApplying] = useState(false);

  const freeShippingThreshold = 799;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setApplying(true);
    await applyCoupon(couponCode.trim());
    setApplying(false);
    setCouponCode('');
  };

  if (items.length === 0) {
    return (
      <div className="bg-brand-ivory min-h-screen py-20 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-brand-sage/40 mx-auto flex items-center justify-center text-brand-forest">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-brand-forest">
            Your Sacred Basket is Empty
          </h1>
          <p className="font-sans text-sm text-brand-text-muted">
            Explore our collection of authentic Mysore sandalwood agarbatti, damask rose, and temple pooja essentials.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-brand-forest text-brand-ivory px-8 py-3.5 rounded text-xs font-sans tracking-[0.2em] font-semibold hover:bg-brand-forest-light transition-all shadow-luxury"
            >
              EXPLORE SACRED CATALOG <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-ivory min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-brand-gold/20 pb-6 mb-8">
          <div>
            <nav className="text-xs font-sans text-brand-text-muted mb-2 flex items-center gap-2">
              <Link href="/" className="hover:text-brand-forest">
                Home
              </Link>
              <span>/</span>
              <span className="text-brand-gold-dark font-medium">Sacred Basket</span>
            </nav>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest">
              Your Devotional Basket ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </h1>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-sans text-brand-forest hover:text-brand-gold font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
          </Link>
        </div>

        {/* Free Shipping Milestone Alert */}
        <div className="bg-brand-sage-light p-4 rounded-xl border border-brand-gold/25 mb-8">
          {amountToFreeShipping > 0 ? (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-brand-forest font-semibold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-brand-gold" /> Add ₹{amountToFreeShipping} more to qualify for FREE Pan-India Delivery!
                </span>
                <span>{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-brand-sage h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-brand-forest h-full rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <p className="text-xs text-brand-forest font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-gold" />
              Auspicious! Your order qualifies for FREE Pan-India Express Delivery!
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-brand-gold/20 shadow-sm divide-y divide-brand-gold/15">
              {items.map((item) => (
                <div key={item.productId} className="p-4 sm:p-6 flex gap-4 sm:gap-6 items-center">
                  <Link
                    href={`/shop/${item.slug}`}
                    className="relative w-20 h-20 sm:w-24 sm:h-24 bg-brand-ivory rounded-lg overflow-hidden shrink-0 border border-brand-gold/15 block hover:opacity-85 transition-opacity"
                  >
                    <Image
                      src={item.image}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <Link
                        href={`/shop/${item.slug}`}
                        className="font-serif text-base sm:text-lg font-bold text-brand-forest hover:text-brand-gold transition-colors line-clamp-1"
                      >
                        {item.productName}
                      </Link>
                      <p className="text-xs text-brand-text-muted mt-0.5">{item.packSize}</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-sm sm:text-base font-bold text-brand-forest">
                          ₹{item.price}
                        </span>
                        {item.mrp > item.price && (
                          <span className="text-xs text-stone-400 line-through">
                            ₹{item.mrp}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-brand-gold/40 rounded bg-brand-ivory">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-1.5 hover:bg-brand-sage/40 text-brand-forest"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-brand-forest">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-1.5 hover:bg-brand-sage/40 text-brand-forest"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <span className="font-bold text-sm sm:text-base text-brand-forest min-w-[70px] text-right font-sans">
                        ₹{item.price * item.quantity}
                      </span>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Order Summary & Coupon */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-brand-gold/25 p-6 shadow-luxury space-y-5">
              <h3 className="font-serif text-xl font-bold text-brand-forest border-b border-brand-gold/20 pb-3">
                Order Summary
              </h3>

              {/* Coupon Box */}
              {appliedCoupon ? (
                <div className="p-3 bg-brand-sage/40 border border-brand-gold/30 rounded-lg flex items-center justify-between text-xs text-brand-forest">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-brand-gold" />
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
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Coupon Code (e.g. DIVINE10)"
                      className="flex-1 px-3 py-2 text-xs border border-brand-gold/30 rounded focus:outline-none focus:border-brand-gold uppercase font-mono"
                    />
                    <button
                      type="submit"
                      disabled={applying || !couponCode.trim()}
                      className="px-4 py-2 bg-brand-forest text-brand-ivory text-xs font-semibold rounded hover:bg-brand-forest-light disabled:opacity-50 transition-colors"
                    >
                      {applying ? '...' : 'APPLY'}
                    </button>
                  </div>
                  <p className="text-[10px] text-stone-400">
                    Try &ldquo;DIVINE10&rdquo; for 10% off or &ldquo;FIRSTAARADHYA&rdquo; for ₹150 off.
                  </p>
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-brand-forest font-sans">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Coupon Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-semibold">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-800 font-bold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-stone-500 text-[11px]">
                  <span>GST (18% Included)</span>
                  <span>₹{Math.round((subtotal * 18) / 118)}</span>
                </div>
                <div className="border-t border-brand-gold/20 pt-3 flex justify-between text-base font-bold text-brand-forest">
                  <span>Total Amount</span>
                  <span className="text-xl">₹{grandTotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full py-4 bg-brand-forest text-brand-ivory rounded font-sans text-xs tracking-[0.2em] font-semibold flex items-center justify-center gap-2 hover:bg-brand-forest-light transition-all shadow-luxury"
              >
                PROCEED TO CHECKOUT • ₹{grandTotal} <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[11px] text-brand-text-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                <span>100% Secure Checkout with Razorpay &amp; Cash on Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
