'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Truck,
  CheckCircle,
  Package,
  Clock,
  MapPin,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { Order, OrderStatus } from '@/types';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || '';

  const [query, setQuery] = useState(initialOrderId);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchTrackOrder = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(`/api/orders?orderNumber=${encodeURIComponent(searchQuery.trim())}`);
      const data = await res.json();
      if (data.order) {
        setOrder(data.order);
      } else {
        setOrder(null);
        setErrorMsg(`No order found matching "${searchQuery}". Please check your order number.`);
      }
    } catch {
      setErrorMsg('Failed to fetch tracking details. Please try again.');
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  useEffect(() => {
    if (initialOrderId) {
      setQuery(initialOrderId);
      fetchTrackOrder(initialOrderId);
    }
  }, [initialOrderId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTrackOrder(query);
  };

  // Status mapping to 5 progression steps
  const steps: { key: OrderStatus; label: string; desc: string }[] = [
    { key: 'confirmed', label: 'Order Confirmed', desc: 'Received & authorized' },
    { key: 'processing', label: 'Sacred Packing', desc: 'Prepared with prayerful care' },
    { key: 'shipped', label: 'In Transit', desc: 'Dispatched with express courier' },
    { key: 'delivered', label: 'Delivered', desc: 'Blessed into your home' },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed':
        return 0;
      case 'processing':
        return 1;
      case 'shipped':
        return 2;
      case 'delivered':
        return 3;
      case 'cancelled':
        return -1;
      default:
        return 0;
    }
  };

  const currentStepIndex = order ? getStepIndex(order.status) : 0;

  return (
    <div className="bg-brand-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
          <nav className="text-xs font-sans text-brand-text-muted mb-2 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-brand-forest">
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-gold-dark font-medium">Shipment Tracker</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest">
            Track Your Sacred Parcel
          </h1>
          <p className="font-sans text-xs sm:text-sm text-brand-text-muted">
            Enter your order number (e.g. ADM-2026-1001) or registered email to view real-time courier tracking updates.
          </p>
        </div>

        {/* Tracking Search Input */}
        <div className="bg-white rounded-2xl border border-brand-gold/30 p-4 sm:p-6 shadow-luxury mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-3.5" />
              <input
                type="text"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Order No (e.g. ADM-2026-1001 or ADM-2026-1002)"
                className="w-full pl-11 pr-4 py-3 border border-brand-gold/30 rounded-xl text-xs sm:text-sm text-brand-forest focus:outline-none focus:border-brand-gold font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-8 py-3 bg-brand-forest text-brand-ivory text-xs font-sans font-semibold tracking-widest rounded-xl hover:bg-brand-forest-light transition-all flex items-center justify-center gap-2 shrink-0 shadow-sm"
            >
              {loading ? 'LOCATING...' : 'TRACK SHIPMENT'}
            </button>
          </form>

          {/* Quick Demo Test Order links */}
          <div className="mt-3 text-[11px] text-brand-text-muted flex items-center gap-2 flex-wrap">
            <span>Try sample orders:</span>
            <button
              onClick={() => {
                setQuery('ADM-2026-1001');
                fetchTrackOrder('ADM-2026-1001');
              }}
              className="text-brand-gold-dark font-semibold underline hover:text-brand-forest"
            >
              ADM-2026-1001 (Delivered)
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setQuery('ADM-2026-1002');
                fetchTrackOrder('ADM-2026-1002');
              }}
              className="text-brand-gold-dark font-semibold underline hover:text-brand-forest"
            >
              ADM-2026-1002 (In Transit)
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5 mb-8">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Order Tracking Timeline Card */}
        {order && (
          <div className="bg-white rounded-2xl border border-brand-gold/25 p-6 sm:p-8 shadow-luxury space-y-8 animate-fade-in">
            {/* Header Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-brand-gold/15 gap-4">
              <div>
                <span className="text-[11px] font-sans uppercase tracking-widest text-brand-gold-dark font-semibold">
                  Official Shipment Record
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-forest mt-0.5">
                  Order #{order.orderNumber}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Placed by {order.customerName} on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>

              <div className="flex flex-col sm:items-end">
                <span className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider font-sans bg-brand-forest text-brand-gold border border-brand-gold/30">
                  {order.status}
                </span>
                <span className="text-[11px] text-stone-500 mt-1">
                  Payment: {order.paymentStatus.toUpperCase()} ({order.paymentMethod.toUpperCase()})
                </span>
              </div>
            </div>

            {/* Visual 4-Step Progress Bar */}
            <div className="py-4">
              <div className="relative">
                {/* Connecting Track */}
                <div className="absolute top-5 left-6 right-6 h-1 bg-stone-200 -z-0 hidden sm:block">
                  <div
                    className="h-full bg-brand-forest transition-all duration-700"
                    style={{
                      width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
                    }}
                  />
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative z-10">
                  {steps.map((st, idx) => {
                    const isCompleted = currentStepIndex >= idx;
                    const isCurrent = currentStepIndex === idx;

                    return (
                      <div key={st.key} className="flex sm:flex-col items-center sm:text-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                            isCompleted
                              ? 'bg-brand-forest text-brand-gold ring-4 ring-brand-sage'
                              : 'bg-stone-200 text-stone-500'
                          }`}
                        >
                          {isCompleted ? <CheckCircle className="w-5 h-5" /> : idx + 1}
                        </div>
                        <div>
                          <p
                            className={`font-serif text-sm font-bold ${
                              isCurrent ? 'text-brand-forest' : isCompleted ? 'text-brand-forest/90' : 'text-stone-400'
                            }`}
                          >
                            {st.label}
                          </p>
                          <p className="text-[11px] text-stone-500 font-sans mt-0.5">
                            {st.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Courier Dispatch Meta Card */}
            <div className="p-4 rounded-xl bg-brand-neutral/40 border border-brand-gold/25 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
              <div>
                <span className="text-stone-500 block">Express Courier Partner</span>
                <span className="font-bold text-brand-forest text-sm">
                  {order.courierName || 'Blue Dart Express'}
                </span>
              </div>
              <div>
                <span className="text-stone-500 block">AWB Air Waybill No.</span>
                <span className="font-mono font-bold text-brand-gold-dark text-sm">
                  {order.awbNumber || 'Generating...'}
                </span>
              </div>
              <div className="sm:text-right flex items-center sm:justify-end">
                {order.trackingUrl ? (
                  <a
                    href={order.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-brand-forest hover:text-brand-gold font-bold underline"
                  >
                    <span>Courier Live Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-stone-400">Tracking link generating</span>
                )}
              </div>
            </div>

            {/* Delivery Destination */}
            <div className="text-xs font-sans space-y-1">
              <span className="font-bold text-brand-forest flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-gold" /> Delivering To:
              </span>
              <p className="text-stone-600 pl-5">
                {order.shippingAddress.fullName}, {order.shippingAddress.houseFlat}, {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
            </div>

            {/* Items Included */}
            <div className="border-t border-brand-gold/15 pt-4">
              <span className="text-xs font-bold text-brand-forest block mb-2 font-sans">
                Items in This Shipment ({order.items.length})
              </span>
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-sans text-stone-700">
                    <span>
                      {item.productName} ({item.packSize}) × {item.quantity}
                    </span>
                    <span className="font-semibold text-brand-forest">₹{item.subtotal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-ivory flex items-center justify-center font-serif text-brand-forest">Loading tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
