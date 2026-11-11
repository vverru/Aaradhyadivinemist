'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle,
  Truck,
  CreditCard,
  Banknote,
  ArrowRight,
  ArrowLeft,
  Lock,
  Sparkles,
  Info,
  AlertCircle,
} from 'lucide-react';
import { useCart } from '@/components/context/CartContext';
import { useToast } from '@/components/context/ToastContext';
import { BrandLogo } from '@/components/ui/BrandLogo';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, appliedCoupon, clearCart } = useCart();
  const { showToast } = useToast();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  // Step 1: Customer Details
  const [customer, setCustomer] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  // Step 2: Shipping Address
  const [address, setAddress] = useState({
    houseFlat: '',
    street: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
  });

  // Step 3: Shipping Method
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  // Step 4: Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'upi' | 'card' | 'cod'>('razorpay');

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Calculations
  const standardFee = subtotal >= 799 || subtotal === 0 ? 0 : 60;
  const shippingFee = shippingMethod === 'express' ? 120 : standardFee;

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

  // Step Validation Handlers
  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName.trim() || !customer.email.includes('@') || customer.phone.length < 10) {
      setErrorMessage('Please provide your full name, valid email, and 10-digit mobile number.');
      return;
    }
    setErrorMessage('');
    setStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.houseFlat.trim() || !address.street.trim() || !address.city.trim() || !address.state.trim() || !/^\d{6}$/.test(address.pincode.trim())) {
      setErrorMessage('Please fill out all address fields including a valid 6-digit Indian PIN code.');
      return;
    }
    setErrorMessage('');
    setStep(3);
  };

  const handleFinalOrderSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Secure server-side price & discount validation endpoint
      const payload = {
        customer,
        shippingAddress: {
          ...address,
          fullName: customer.fullName,
          email: customer.email,
          phone: customer.phone,
        },
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          packSize: i.packSize,
        })),
        couponCode: appliedCoupon?.code,
        shippingMethod,
        paymentMethod,
      };

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || 'Error creating order. Please verify your details.');
        setIsSubmitting(false);
        return;
      }

      // Order created successfully
      const createdOrder = data.order;
      showToast(`Divine blessings! Order #${createdOrder.orderNumber} placed successfully.`, 'success');
      clearCart();

      // Navigate to order confirmation
      router.push(`/order-success?orderId=${encodeURIComponent(createdOrder.orderNumber)}`);
    } catch {
      setErrorMessage('Network error occurred. Please check your connection and retry.');
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-brand-ivory min-h-screen py-20 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-sm px-4">
          <h2 className="font-serif text-2xl font-bold text-brand-forest">
            Your Basket is Empty
          </h2>
          <p className="text-xs text-brand-text-muted">
            Please add sacred fragrances to your basket before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-2.5 bg-brand-forest text-brand-ivory text-xs font-semibold rounded"
          >
            RETURN TO SHOP
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-neutral/40 min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Checkout Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-8 border-b border-brand-gold/25 gap-4">
          <BrandLogo variant="dark" size="sm" showTagline={false} />
          <div className="flex items-center gap-2 text-xs text-brand-forest font-medium">
            <Lock className="w-3.5 h-3.5 text-brand-gold" />
            <span>256-bit SSL Encrypted Indian Sacred Checkout</span>
          </div>
        </div>

        {/* Step Progress Indicators */}
        <div className="mb-10">
          <div className="flex items-center justify-between max-w-2xl mx-auto text-xs font-sans font-semibold">
            {[
              { num: 1, label: 'Customer' },
              { num: 2, label: 'Address' },
              { num: 3, label: 'Delivery' },
              { num: 4, label: 'Payment' },
              { num: 5, label: 'Review' },
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    step === s.num
                      ? 'bg-brand-gold text-brand-forest font-bold ring-4 ring-brand-gold/20'
                      : step > s.num
                      ? 'bg-brand-forest text-brand-ivory'
                      : 'bg-stone-200 text-stone-500'
                  }`}
                >
                  {step > s.num ? <CheckCircle className="w-4 h-4" /> : s.num}
                </div>
                <span className="mt-1 text-[11px] text-brand-forest hidden sm:inline">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="max-w-2xl mx-auto mb-6 p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Step Form Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-brand-gold/25 p-6 sm:p-8 shadow-luxury">
              {/* ==============================================================
                  STEP 1: CUSTOMER DETAILS
                  ============================================================== */}
              {step === 1 && (
                <form onSubmit={handleNextStep1} className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-brand-forest">
                      Step 1: Devotee Information
                    </h2>
                    <p className="text-xs text-brand-text-muted mt-1">
                      Enter your contact details to receive dispatch &amp; SMS tracking updates. Guest checkout supported.
                    </p>
                  </div>

                  <div className="space-y-4 text-xs font-sans">
                    <div>
                      <label className="block font-semibold text-brand-forest mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customer.fullName}
                        onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                        placeholder="e.g. Ramesh Chandra"
                        className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-brand-forest mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={customer.email}
                          onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                          placeholder="e.g. ramesh@gmail.com"
                          className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-brand-forest mb-1">
                          Mobile Number (10 Digits) *
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 border border-r-0 border-brand-gold/30 bg-brand-neutral rounded-l-lg text-stone-600 font-mono">
                            +91
                          </span>
                          <input
                            type="tel"
                            maxLength={10}
                            required
                            value={customer.phone}
                            onChange={(e) => setCustomer({ ...customer, phone: e.target.value.replace(/\D/g, '') })}
                            placeholder="9876543210"
                            className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-r-lg text-brand-forest focus:outline-none focus:border-brand-gold font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-8 py-3 bg-brand-forest text-brand-ivory text-xs font-sans tracking-widest font-semibold rounded hover:bg-brand-forest-light transition-all flex items-center gap-2"
                    >
                      CONTINUE TO ADDRESS <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* ==============================================================
                  STEP 2: SHIPPING ADDRESS
                  ============================================================== */}
              {step === 2 && (
                <form onSubmit={handleNextStep2} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-brand-forest">
                        Step 2: Shipping Address
                      </h2>
                      <p className="text-xs text-brand-text-muted mt-1">
                        Where should we dispatch your sacred fragrances?
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-brand-gold-dark hover:underline flex items-center gap-1 font-semibold"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  </div>

                  <div className="space-y-4 text-xs font-sans">
                    <div>
                      <label className="block font-semibold text-brand-forest mb-1">
                        Flat / House No. / Building / Floor *
                      </label>
                      <input
                        type="text"
                        required
                        value={address.houseFlat}
                        onChange={(e) => setAddress({ ...address, houseFlat: e.target.value })}
                        placeholder="e.g. Flat 402, Shivam Apartments"
                        className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-brand-forest mb-1">
                          Street / Road / Colony *
                        </label>
                        <input
                          type="text"
                          required
                          value={address.street}
                          onChange={(e) => setAddress({ ...address, street: e.target.value })}
                          placeholder="e.g. 14th Cross, Mandir Marg"
                          className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-brand-forest mb-1">
                          Area / Locality / Landmark
                        </label>
                        <input
                          type="text"
                          value={address.area}
                          onChange={(e) => setAddress({ ...address, area: e.target.value })}
                          placeholder="e.g. Near Hanuman Temple, Sector 15"
                          className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-semibold text-brand-forest mb-1">
                          PIN Code (6 Digits) *
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          required
                          value={address.pincode}
                          onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '') })}
                          placeholder="560001"
                          className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-brand-forest mb-1">
                          City / District *
                        </label>
                        <input
                          type="text"
                          required
                          value={address.city}
                          onChange={(e) => setAddress({ ...address, city: e.target.value })}
                          placeholder="e.g. Bengaluru"
                          className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-brand-forest mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          value={address.state}
                          onChange={(e) => setAddress({ ...address, state: e.target.value })}
                          placeholder="e.g. Karnataka"
                          className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs font-semibold text-brand-forest hover:underline"
                    >
                      ← Previous
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-brand-forest text-brand-ivory text-xs font-sans tracking-widest font-semibold rounded hover:bg-brand-forest-light transition-all flex items-center gap-2"
                    >
                      CONTINUE TO DELIVERY <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* ==============================================================
                  STEP 3: DELIVERY & SHIPPING
                  ============================================================== */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-brand-forest">
                        Step 3: Delivery Options
                      </h2>
                      <p className="text-xs text-brand-text-muted mt-1">
                        Select your preferred shipping speed via our express courier network (Blue Dart, Delhivery, DTDC).
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs text-brand-gold-dark hover:underline flex items-center gap-1 font-semibold"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  </div>

                  <div className="space-y-3 font-sans">
                    {/* Standard Shipping */}
                    <label
                      onClick={() => setShippingMethod('standard')}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        shippingMethod === 'standard'
                          ? 'border-brand-forest bg-brand-sage/20 shadow-sm'
                          : 'border-stone-200 hover:border-brand-gold/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                          className="accent-brand-forest w-4 h-4"
                        />
                        <div>
                          <div className="font-bold text-sm text-brand-forest flex items-center gap-2">
                            <span>Standard Express Delivery</span>
                            {standardFee === 0 && (
                              <span className="text-[10px] bg-emerald-800 text-white px-2 py-0.5 rounded font-bold">
                                FREE (Orders ₹799+)
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-500 mt-0.5">
                            Estimated delivery in 2 to 4 business days.
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-sm text-brand-forest">
                        {standardFee === 0 ? 'FREE' : `₹${standardFee}`}
                      </span>
                    </label>

                    {/* Priority Express Shipping */}
                    <label
                      onClick={() => setShippingMethod('express')}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        shippingMethod === 'express'
                          ? 'border-brand-forest bg-brand-sage/20 shadow-sm'
                          : 'border-stone-200 hover:border-brand-gold/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                          className="accent-brand-forest w-4 h-4"
                        />
                        <div>
                          <div className="font-bold text-sm text-brand-forest flex items-center gap-2">
                            <span>Air Express Priority Dispatch</span>
                            <span className="text-[10px] bg-brand-gold text-brand-forest px-2 py-0.5 rounded font-bold">
                              FASTEST
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 mt-0.5">
                            Same-day dispatch; estimated delivery in 24 to 48 hours to major metros.
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-sm text-brand-forest">₹120</span>
                    </label>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs font-semibold text-brand-forest hover:underline"
                    >
                      ← Previous
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="px-8 py-3 bg-brand-forest text-brand-ivory text-xs font-sans tracking-widest font-semibold rounded hover:bg-brand-forest-light transition-all flex items-center gap-2"
                    >
                      CONTINUE TO PAYMENT <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ==============================================================
                  STEP 4: PAYMENT METHOD SELECTION
                  ============================================================== */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-brand-forest">
                        Step 4: Payment Method
                      </h2>
                      <p className="text-xs text-brand-text-muted mt-1">
                        Secure instant checkout via Razorpay (UPI, Cards, Net Banking) or Cash on Delivery.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="text-xs text-brand-gold-dark hover:underline flex items-center gap-1 font-semibold"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  </div>

                  <div className="space-y-3 font-sans">
                    {/* Razorpay All-in-One (UPI, Cards, NetBanking) */}
                    <label
                      onClick={() => setPaymentMethod('razorpay')}
                      className={`flex items-start justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'razorpay'
                          ? 'border-brand-forest bg-brand-sage/20 shadow-sm'
                          : 'border-stone-200 hover:border-brand-gold/40'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'razorpay'}
                          onChange={() => setPaymentMethod('razorpay')}
                          className="accent-brand-forest w-4 h-4 mt-1"
                        />
                        <div>
                          <div className="font-bold text-sm text-brand-forest flex items-center gap-2">
                            <span>UPI, Debit &amp; Credit Cards, Net Banking</span>
                            <span className="text-[10px] bg-brand-forest text-brand-gold px-2 py-0.5 rounded font-bold">
                              RECOMMENDED
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 mt-1">
                            Pay securely with Google Pay, PhonePe, Paytm, BHIM, Visa, MasterCard, RuPay, or HDFC/SBI Net Banking via Razorpay.
                          </p>
                        </div>
                      </div>
                      <CreditCard className="w-5 h-5 text-brand-gold shrink-0 mt-1" />
                    </label>

                    {/* Cash on Delivery (COD) */}
                    <label
                      onClick={() => setPaymentMethod('cod')}
                      className={`flex items-start justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-brand-forest bg-brand-sage/20 shadow-sm'
                          : 'border-stone-200 hover:border-brand-gold/40'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="accent-brand-forest w-4 h-4 mt-1"
                        />
                        <div>
                          <div className="font-bold text-sm text-brand-forest">
                            Cash on Delivery (COD)
                          </div>
                          <p className="text-xs text-stone-500 mt-1">
                            Pay in cash or UPI QR code to the courier delivery executive upon receiving your sacred package.
                          </p>
                        </div>
                      </div>
                      <Banknote className="w-5 h-5 text-emerald-700 shrink-0 mt-1" />
                    </label>
                  </div>

                  {/* Razorpay Gateway Status Note */}
                  <div className="p-3 bg-brand-neutral rounded-lg border border-brand-gold/20 text-xs text-brand-text-muted flex items-center gap-2">
                    <Info className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>
                      Live Razorpay Server Signature verification enabled. Zero surcharge on UPI or Cards.
                    </span>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="text-xs font-semibold text-brand-forest hover:underline"
                    >
                      ← Previous
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(5)}
                      className="px-8 py-3 bg-brand-forest text-brand-ivory text-xs font-sans tracking-widest font-semibold rounded hover:bg-brand-forest-light transition-all flex items-center gap-2"
                    >
                      REVIEW &amp; PLACE ORDER <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ==============================================================
                  STEP 5: FINAL ORDER SUMMARY & CONFIRMATION
                  ============================================================== */}
              {step === 5 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-brand-forest">
                        Step 5: Review &amp; Confirm
                      </h2>
                      <p className="text-xs text-brand-text-muted mt-1">
                        Please review your final order details before placing your sacred order.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="text-xs text-brand-gold-dark hover:underline flex items-center gap-1 font-semibold"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  </div>

                  {/* Summary Review Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="p-4 bg-brand-neutral/40 rounded-xl border border-brand-gold/20">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-brand-forest">Devotee &amp; Delivery</span>
                        <button onClick={() => setStep(1)} className="text-brand-gold-dark font-semibold">
                          Edit
                        </button>
                      </div>
                      <p className="font-semibold text-stone-800">{customer.fullName}</p>
                      <p className="text-stone-600">{customer.phone} • {customer.email}</p>
                      <p className="text-stone-600 mt-1">
                        {address.houseFlat}, {address.street}, {address.city}, {address.state} - {address.pincode}
                      </p>
                    </div>

                    <div className="p-4 bg-brand-neutral/40 rounded-xl border border-brand-gold/20">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-brand-forest">Shipping &amp; Payment</span>
                        <button onClick={() => setStep(4)} className="text-brand-gold-dark font-semibold">
                          Edit
                        </button>
                      </div>
                      <p className="font-semibold text-stone-800 capitalize">
                        Method: {shippingMethod} Express
                      </p>
                      <p className="text-stone-600 capitalize">
                        Payment: {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online via Razorpay'}
                      </p>
                    </div>
                  </div>

                  {/* Purchased Items List */}
                  <div className="border border-brand-gold/20 rounded-xl p-4 bg-white space-y-3">
                    <span className="text-xs font-bold text-brand-forest block font-sans">
                      Order Items ({items.length})
                    </span>
                    <div className="divide-y divide-brand-gold/15 max-h-56 overflow-y-auto">
                      {items.map((i) => (
                        <div key={i.productId} className="py-2.5 flex items-center justify-between text-xs font-sans">
                          <div className="flex items-center gap-3">
                            <Link
                              href={`/shop/${i.slug}`}
                              target="_blank"
                              className="relative w-10 h-10 rounded overflow-hidden bg-brand-ivory shrink-0 border border-brand-gold/20 block hover:opacity-85 transition-opacity"
                            >
                              <Image src={i.image} alt={i.productName} fill className="object-cover" />
                            </Link>
                            <div>
                              <Link
                                href={`/shop/${i.slug}`}
                                target="_blank"
                                className="font-semibold text-brand-forest hover:text-brand-gold hover:underline line-clamp-1 block"
                              >
                                {i.productName}
                              </Link>
                              <p className="text-[10px] text-stone-500">Qty: {i.quantity} • {i.packSize}</p>
                            </div>
                          </div>
                          <span className="font-bold text-brand-forest">₹{i.price * i.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Place Order CTA */}
                  <div className="pt-2">
                    <button
                      onClick={handleFinalOrderSubmit}
                      disabled={isSubmitting}
                      className="w-full py-4 bg-brand-forest text-brand-ivory rounded font-sans text-xs tracking-[0.22em] font-bold hover:bg-brand-forest-light transition-all shadow-luxury flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Sparkles className="w-4 h-4 animate-spin text-brand-gold" />
                          CONFIRMING SACRED ORDER...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-brand-gold" />
                          CONFIRM &amp; PLACE ORDER • ₹{grandTotal}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Order Summary Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-brand-gold/25 p-6 shadow-luxury space-y-4">
              <h3 className="font-serif text-lg font-bold text-brand-forest border-b border-brand-gold/20 pb-3">
                Price Breakdown
              </h3>

              <div className="space-y-2 text-xs font-sans text-brand-forest">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Coupon ({appliedCoupon?.code})</span>
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
                  <span>Grand Total</span>
                  <span className="text-xl">₹{grandTotal}</span>
                </div>
              </div>

              <div className="p-3 bg-brand-sage/30 rounded-lg text-[11px] text-brand-forest space-y-1">
                <p className="font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" /> Aaradhya Purity Guarantee
                </p>
                <p className="text-brand-text-muted">
                  Your order is prepared in our sanctuary with pure sacred materials and tamper-proof seals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
