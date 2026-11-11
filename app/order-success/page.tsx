'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
  CheckCircle2,
  Package,
  Truck,
  Printer,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  Phone,
  Mail,
} from 'lucide-react';
import { Order } from '@/types';
import { BrandLogo } from '@/components/ui/BrandLogo';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || '';
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/orders?orderNumber=${encodeURIComponent(orderId)}`);
        const data = await res.json();
        if (data.order) {
          setOrder(data.order);
        }
      } catch (e) {
        console.error('Failed to fetch order', e);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="bg-brand-ivory min-h-screen py-20 flex items-center justify-center font-serif text-brand-forest">
        Retrieving your sacred order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-brand-ivory min-h-screen py-20 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-sm px-4">
          <CheckCircle2 className="w-12 h-12 text-brand-gold mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-brand-forest">
            Order Confirmation
          </h2>
          <p className="text-xs text-brand-text-muted">
            Your sacred order has been received and confirmed. You will receive an SMS and email dispatch update shortly.
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
    <div className="bg-brand-ivory min-h-screen py-10 sm:py-16 print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Printable Invoice Header */}
        <div className="hidden print:flex items-center justify-between pb-6 mb-6 border-b border-stone-300">
          <BrandLogo variant="dark" size="sm" showTagline={true} />
          <div className="text-right text-xs">
            <h3 className="font-bold text-stone-900">TAX INVOICE</h3>
            <p className="text-stone-600">GSTIN: 06AABCA1234F1Z8</p>
            <p className="text-stone-600">Invoice: #{order.orderNumber}</p>
          </div>
        </div>

        {/* Top Success Banner */}
        <div className="print:hidden bg-brand-forest text-brand-ivory rounded-2xl p-8 sm:p-10 text-center shadow-luxury-lg mb-8 relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <div className="w-16 h-16 rounded-full bg-brand-gold/20 border border-brand-gold/40 mx-auto flex items-center justify-center text-brand-gold">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-sans tracking-[0.25em] text-brand-gold font-semibold uppercase block">
              Divine Blessings &amp; Gratitude
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold">
              Your Sacred Order is Confirmed!
            </h1>

            <p className="text-xs sm:text-sm text-brand-sage max-w-lg mx-auto leading-relaxed font-sans">
              Thank you, <strong>{order.customerName}</strong>. Your fragrances are now being hand-packed with prayerful care at our sanctuary.
            </p>

            <div className="inline-block px-4 py-1.5 rounded-full bg-brand-forest-light border border-brand-gold/30 text-xs font-mono font-bold text-brand-gold mt-2">
              Order No: {order.orderNumber}
            </div>
          </div>
        </div>

        {/* Main Order Details Card */}
        <div className="bg-white rounded-2xl border border-brand-gold/25 p-6 sm:p-8 shadow-luxury space-y-8">
          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-brand-gold/15 gap-4">
            <div>
              <p className="text-xs text-stone-500 font-sans">Order Placed On:</p>
              <p className="text-sm font-semibold text-brand-forest font-sans flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-gold" />
                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>

            <div className="flex items-center gap-3 print:hidden">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-brand-gold/30 rounded-lg text-xs font-sans font-semibold text-brand-forest hover:bg-brand-sage/30 transition-colors"
              >
                <Printer className="w-4 h-4 text-brand-gold-dark" /> Print Tax Invoice
              </button>
              <Link
                href={`/track-order?orderId=${encodeURIComponent(order.orderNumber)}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-forest text-brand-ivory rounded-lg text-xs font-sans font-semibold hover:bg-brand-forest-light transition-colors"
              >
                <Truck className="w-4 h-4 text-brand-gold" /> Track Shipment
              </Link>
            </div>
          </div>

          {/* Delivery & Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans">
            <div className="p-4 bg-brand-neutral/40 rounded-xl border border-brand-gold/20 space-y-1.5">
              <h4 className="font-bold text-brand-forest uppercase tracking-wider text-[11px]">
                Shipping Address
              </h4>
              <p className="font-semibold text-stone-900">{order.shippingAddress.fullName}</p>
              <p className="text-stone-600">
                {order.shippingAddress.houseFlat}, {order.shippingAddress.street}
              </p>
              {order.shippingAddress.area && (
                <p className="text-stone-600">{order.shippingAddress.area}</p>
              )}
              <p className="text-stone-600">
                {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
                <strong className="text-brand-forest">{order.shippingAddress.pincode}</strong>
              </p>
              <p className="text-stone-600 pt-1">
                Contact: {order.customerPhone} | {order.customerEmail}
              </p>
            </div>

            <div className="p-4 bg-brand-neutral/40 rounded-xl border border-brand-gold/20 space-y-1.5">
              <h4 className="font-bold text-brand-forest uppercase tracking-wider text-[11px]">
                Payment &amp; Logistics
              </h4>
              <div className="flex justify-between">
                <span className="text-stone-500">Payment Method:</span>
                <span className="font-bold uppercase text-brand-forest">
                  {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online (Razorpay)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Payment Status:</span>
                <span className="font-bold uppercase text-emerald-800">
                  {order.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Assigned Courier:</span>
                <span className="font-semibold text-brand-forest">
                  {order.courierName || 'Blue Dart Express'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">AWB Tracking No:</span>
                <span className="font-mono font-bold text-brand-gold-dark">
                  {order.awbNumber || 'Generating...'}
                </span>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h4 className="font-serif text-lg font-bold text-brand-forest mb-3">
              Sacred Items Ordered
            </h4>
            <div className="border border-brand-gold/20 rounded-xl overflow-hidden divide-y divide-brand-gold/15">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between text-xs font-sans gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded bg-brand-ivory overflow-hidden shrink-0 border border-brand-gold/20">
                      <Image
                        src={item.image}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-brand-forest text-sm font-serif">
                        {item.productName}
                      </p>
                      <p className="text-stone-500 text-[11px]">
                        Pack Size: {item.packSize} • Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-brand-forest">₹{item.subtotal}</p>
                    <p className="text-[10px] text-stone-400">₹{item.price} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals Breakdown */}
          <div className="border-t border-brand-gold/20 pt-4 flex justify-end">
            <div className="w-full sm:w-72 space-y-2 text-xs font-sans text-brand-forest">
              <div className="flex justify-between">
                <span className="text-stone-500">Subtotal:</span>
                <span className="font-semibold">₹{order.subtotal}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Coupon Discount ({order.couponCode}):</span>
                  <span>-₹{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-stone-500">Shipping Charges:</span>
                <span className="font-semibold">
                  {order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-stone-500 text-[11px]">
                <span>Integrated GST (18% Included):</span>
                <span>₹{order.tax || Math.round((order.subtotal * 18) / 118)}</span>
              </div>
              <div className="border-t border-brand-gold/20 pt-2 flex justify-between text-base font-bold text-brand-forest">
                <span>Total Amount:</span>
                <span className="text-lg">₹{order.grandTotal}</span>
              </div>
            </div>
          </div>

          {/* Bottom Help & Return to Shop */}
          <div className="pt-6 border-t border-brand-gold/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-brand-text-muted print:hidden">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-brand-gold" />
              <span>Questions? Call Toll-Free: 1800-208-1080 (10 AM - 7 PM IST)</span>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-brand-forest hover:text-brand-gold font-semibold"
            >
              Explore More Sacred Fragrances <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-ivory flex items-center justify-center font-serif text-brand-forest">Loading order confirmation...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
