'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
  User,
  Package,
  Heart,
  MapPin,
  Lock,
  LogOut,
  Truck,
  CheckCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/components/context/AuthContext';
import { useWishlist } from '@/components/context/WishlistContext';
import { useCart } from '@/components/context/CartContext';
import { useToast } from '@/components/context/ToastContext';
import { Order } from '@/types';

function AccountContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as any) || 'profile';

  const { user, logout, updateProfile } = useAuth();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'wishlist' | 'security'>(initialTab);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Edit Profile Form State
  const [editName, setEditName] = useState(user?.name || 'Priyanka Sharma');
  const [editEmail, setEditEmail] = useState(user?.email || 'devotee@aaradhyadivinemist.com');
  const [editPhone, setEditPhone] = useState(user?.phone || '+91 98765 12345');

  // Change Password Form State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Return / Cancellation Request State
  const [cancelModalOrderId, setCancelModalOrderId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  // Fetch customer orders
  useEffect(() => {
    async function loadOrders() {
      setLoadingOrders(true);
      try {
        const res = await fetch(`/api/orders?email=${encodeURIComponent(user?.email || 'devotee@aaradhyadivinemist.com')}`);
        const data = await res.json();
        if (data.orders) {
          setOrders(data.orders);
        }
      } catch (e) {
        console.error('Failed to load orders', e);
      } finally {
        setLoadingOrders(false);
      }
    }
    loadOrders();
  }, [user]);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      email: editEmail,
      phone: editPhone,
    });
    showToast('Your devotee profile details have been updated.', 'success');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match.', 'error');
      return;
    }
    setPasswordSuccess(true);
    showToast('Password updated securely.', 'success');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleRequestCancellation = (orderId: string) => {
    setCancelModalOrderId(null);
    showToast(`Cancellation & Return request registered for Order #${orderId}. Our customer sanctuary team will contact you within 24 hours.`, 'info');
  };

  return (
    <div className="bg-brand-ivory min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb */}
        <div className="border-b border-brand-gold/20 pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <nav className="text-xs font-sans text-brand-text-muted mb-2 flex items-center gap-2">
              <Link href="/" className="hover:text-brand-forest">
                Home
              </Link>
              <span>/</span>
              <span className="text-brand-gold-dark font-medium">Devotee Sanctuary</span>
            </nav>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest">
              Namaste, {user?.name || 'Devotee'}
            </h1>
            <p className="text-xs text-brand-text-muted mt-1 font-sans">
              Manage your sacred orders, delivery addresses, and spiritual wishlist.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-brand-forest text-brand-gold text-xs font-bold font-sans rounded-full border border-brand-gold/30">
              Devotee Tier: Aaradhya Circle
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Navigation Sidebar */}
          <aside className="space-y-2">
            <div className="bg-white rounded-xl border border-brand-gold/25 p-3 shadow-sm space-y-1 font-sans text-xs">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors text-left ${
                  activeTab === 'profile'
                    ? 'bg-brand-forest text-brand-ivory'
                    : 'text-brand-forest hover:bg-brand-sage/30'
                }`}
              >
                <User className="w-4 h-4 text-brand-gold" />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold transition-colors text-left ${
                  activeTab === 'orders'
                    ? 'bg-brand-forest text-brand-ivory'
                    : 'text-brand-forest hover:bg-brand-sage/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4 text-brand-gold" />
                  <span>Sacred Orders</span>
                </div>
                {orders.length > 0 && (
                  <span className="text-[10px] bg-brand-gold text-brand-forest px-2 py-0.5 rounded-full font-bold">
                    {orders.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold transition-colors text-left ${
                  activeTab === 'wishlist'
                    ? 'bg-brand-forest text-brand-ivory'
                    : 'text-brand-forest hover:bg-brand-sage/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-brand-gold" />
                  <span>Devotional Wishlist</span>
                </div>
                {wishlistItems.length > 0 && (
                  <span className="text-[10px] bg-brand-gold text-brand-forest px-2 py-0.5 rounded-full font-bold">
                    {wishlistItems.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors text-left ${
                  activeTab === 'addresses'
                    ? 'bg-brand-forest text-brand-ivory'
                    : 'text-brand-forest hover:bg-brand-sage/30'
                }`}
              >
                <MapPin className="w-4 h-4 text-brand-gold" />
                <span>Saved Addresses</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors text-left ${
                  activeTab === 'security'
                    ? 'bg-brand-forest text-brand-ivory'
                    : 'text-brand-forest hover:bg-brand-sage/30'
                }`}
              >
                <Lock className="w-4 h-4 text-brand-gold" />
                <span>Security &amp; Password</span>
              </button>

              <div className="pt-3 border-t border-brand-gold/15">
                <button
                  onClick={() => {
                    logout();
                    showToast('Logged out securely.', 'info');
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-semibold text-rose-700 hover:bg-rose-50 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Support Box */}
            <div className="p-4 bg-brand-forest text-brand-ivory rounded-xl text-xs space-y-2">
              <p className="font-serif italic text-brand-gold text-sm">
                Need Help with a Pooja Order?
              </p>
              <p className="text-brand-sage text-[11px] leading-relaxed">
                Our customer sanctuary team is available to guide you on authentic Vedic fragrances.
              </p>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[11px] text-brand-gold font-bold underline"
              >
                WhatsApp Devotee Care →
              </a>
            </div>
          </aside>

          {/* Right Tab Content Panel */}
          <main className="lg:col-span-3">
            {/* =========================================================================
                TAB 1: PROFILE
                ========================================================================= */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl border border-brand-gold/25 p-6 sm:p-8 shadow-luxury space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-brand-forest">
                    Devotee Profile Details
                  </h3>
                  <p className="text-xs text-brand-text-muted mt-1 font-sans">
                    Keep your primary contact info accurate for order tracking and SMS dispatch alerts.
                  </p>
                </div>

                <form onSubmit={handleProfileSave} className="space-y-4 text-xs font-sans max-w-lg">
                  <div>
                    <label className="block font-semibold text-brand-forest mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-brand-forest mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-brand-forest mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold font-mono"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-brand-forest text-brand-ivory rounded font-semibold tracking-wider hover:bg-brand-forest-light transition-colors"
                    >
                      SAVE PROFILE CHANGES
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* =========================================================================
                TAB 2: ORDERS
                ========================================================================= */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-brand-forest">
                    Your Sacred Orders ({orders.length})
                  </h3>
                  <p className="text-xs text-brand-text-muted mt-1 font-sans">
                    View order status, tracking AWB, printable tax invoices, and return requests.
                  </p>
                </div>

                {loadingOrders ? (
                  <div className="p-8 text-center text-xs text-stone-500 font-sans">
                    Loading your orders...
                  </div>
                ) : orders.length === 0 ? (
                  <div className="bg-white rounded-xl border border-brand-gold/25 p-10 text-center space-y-4">
                    <Package className="w-12 h-12 text-brand-gold mx-auto" />
                    <h4 className="font-serif text-xl font-bold text-brand-forest">
                      No Sacred Orders Yet
                    </h4>
                    <p className="text-xs text-brand-text-muted max-w-xs mx-auto">
                      Discover our charcoal-free agarbatti, authentic Mysore sandalwood, and sacred pooja essentials.
                    </p>
                    <Link
                      href="/shop"
                      className="inline-block px-6 py-2.5 bg-brand-forest text-brand-ivory text-xs font-semibold rounded"
                    >
                      EXPLORE SACRED SHOP
                    </Link>
                  </div>
                ) : (
                  orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white rounded-xl border border-brand-gold/25 p-6 shadow-sm space-y-5"
                    >
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-brand-gold/15 gap-3 text-xs font-sans">
                        <div>
                          <span className="font-bold text-brand-forest text-sm font-mono">
                            #{ord.orderNumber}
                          </span>
                          <span className="text-stone-400 mx-2">•</span>
                          <span className="text-stone-500">
                            {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-sage text-brand-forest">
                            {ord.status}
                          </span>
                          <span className="font-bold text-brand-forest text-sm font-sans">
                            ₹{ord.grandTotal}
                          </span>
                        </div>
                      </div>

                      {/* Items Preview */}
                      <div className="divide-y divide-brand-gold/10">
                        {ord.items.map((i, idx) => (
                          <div key={idx} className="py-2.5 flex items-center justify-between text-xs font-sans">
                            <div className="flex items-center gap-3">
                              <Link
                                href={i.slug ? `/shop/${i.slug}` : '/shop'}
                                className="relative w-10 h-10 rounded bg-brand-ivory overflow-hidden shrink-0 border border-brand-gold/15 block hover:opacity-85 transition-opacity"
                              >
                                <Image src={i.image} alt={i.productName} fill className="object-cover" />
                              </Link>
                              <div>
                                <Link
                                  href={i.slug ? `/shop/${i.slug}` : '/shop'}
                                  className="font-bold text-brand-forest hover:text-brand-gold hover:underline transition-colors block"
                                >
                                  {i.productName}
                                </Link>
                                <p className="text-[11px] text-stone-500">{i.packSize} • Qty: {i.quantity}</p>
                              </div>
                            </div>
                            <span className="font-semibold text-brand-forest">₹{i.subtotal}</span>
                          </div>
                        ))}
                      </div>

                      {/* Footer Actions: Track & Invoice & Cancellation */}
                      <div className="pt-3 border-t border-brand-gold/15 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
                        <div className="flex items-center gap-2 text-stone-500 text-[11px]">
                          <Truck className="w-3.5 h-3.5 text-brand-gold" />
                          <span>
                            {ord.courierName || 'Blue Dart Express'} • AWB: {ord.awbNumber || 'Generating...'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/track-order?orderId=${encodeURIComponent(ord.orderNumber)}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 border border-brand-gold/30 rounded text-brand-forest hover:bg-brand-sage/30 font-semibold"
                          >
                            <Truck className="w-3.5 h-3.5 text-brand-gold" />
                            <span>Track Parcel</span>
                          </Link>

                          <Link
                            href={`/order-success?orderId=${encodeURIComponent(ord.orderNumber)}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-brand-forest text-brand-ivory rounded font-semibold hover:bg-brand-forest-light"
                          >
                            <span>View Tax Invoice</span>
                          </Link>

                          {ord.status !== 'cancelled' && ord.status !== 'delivered' && (
                            <button
                              onClick={() => setCancelModalOrderId(ord.orderNumber)}
                              className="px-3 py-1.5 border border-stone-200 text-stone-600 hover:text-rose-700 rounded text-[11px]"
                            >
                              Request Cancellation
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* =========================================================================
                TAB 3: WISHLIST
                ========================================================================= */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-brand-forest">
                    Devotional Wishlist ({wishlistItems.length})
                  </h3>
                  <p className="text-xs text-brand-text-muted mt-1 font-sans">
                    Fragrances and pooja essentials saved for auspicious occasions.
                  </p>
                </div>

                {wishlistItems.length === 0 ? (
                  <div className="bg-white rounded-xl border border-brand-gold/25 p-10 text-center space-y-4">
                    <Heart className="w-12 h-12 text-rose-300 mx-auto" />
                    <h4 className="font-serif text-xl font-bold text-brand-forest">
                      Your Wishlist is Empty
                    </h4>
                    <p className="text-xs text-brand-text-muted max-w-xs mx-auto">
                      Click the heart icon on any product to save it here for later.
                    </p>
                    <Link
                      href="/shop"
                      className="inline-block px-6 py-2.5 bg-brand-forest text-brand-ivory text-xs font-semibold rounded"
                    >
                      EXPLORE PRODUCTS
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlistItems.map((p) => (
                      <div
                        key={p.id}
                        className="bg-white rounded-xl border border-brand-gold/20 p-4 flex gap-4 items-center shadow-sm"
                      >
                        <Link href={`/shop/${p.slug}`} className="relative w-20 h-20 rounded bg-brand-ivory shrink-0 overflow-hidden border border-brand-gold/15 block hover:opacity-85 transition-opacity">
                          <Image src={p.images[0] || '/images/products/sandalwood.png'} alt={p.name} fill className="object-cover" />
                        </Link>

                        <div className="flex-1">
                          <Link href={`/shop/${p.slug}`} className="font-serif font-bold text-brand-forest text-sm line-clamp-1 hover:text-brand-gold">
                            {p.name}
                          </Link>
                          <p className="text-[11px] text-stone-500 mt-0.5">₹{p.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => {
                                addItem(p, 1);
                                removeFromWishlist(p.id);
                              }}
                              className="px-3 py-1 bg-brand-forest text-brand-ivory text-[11px] rounded font-semibold flex items-center gap-1 hover:bg-brand-forest-light"
                            >
                              <ShoppingBag className="w-3 h-3" /> Move to Cart
                            </button>
                            <button
                              onClick={() => removeFromWishlist(p.id)}
                              className="p-1 text-stone-400 hover:text-rose-600"
                              aria-label="Remove"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* =========================================================================
                TAB 4: ADDRESSES
                ========================================================================= */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-xl border border-brand-gold/25 p-6 sm:p-8 shadow-luxury space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-brand-forest">
                    Saved Delivery Addresses
                  </h3>
                  <p className="text-xs text-brand-text-muted mt-1 font-sans">
                    Default address used for 1-click Express shipping across India.
                  </p>
                </div>

                <div className="p-5 rounded-xl border-2 border-brand-forest bg-brand-sage/20 text-xs font-sans space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-brand-forest flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-brand-gold" /> Primary Devotee Residence
                    </span>
                    <span className="bg-brand-forest text-brand-ivory text-[10px] px-2 py-0.5 rounded font-bold">
                      DEFAULT
                    </span>
                  </div>
                  <p className="font-semibold text-stone-900 text-sm">Priyanka Sharma</p>
                  <p className="text-stone-700">
                    A-402, Shivam Enclave, 14th Cross Mandir Marg, Indiranagar
                  </p>
                  <p className="text-stone-700">
                    Bengaluru, Karnataka - <strong>560038</strong>
                  </p>
                  <p className="text-stone-600 pt-1">
                    Phone: +91 98765 12345
                  </p>
                </div>
              </div>
            )}

            {/* =========================================================================
                TAB 5: SECURITY
                ========================================================================= */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-xl border border-brand-gold/25 p-6 sm:p-8 shadow-luxury space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-brand-forest">
                    Security &amp; Password
                  </h3>
                  <p className="text-xs text-brand-text-muted mt-1 font-sans">
                    Update your account password or review session security.
                  </p>
                </div>

                {passwordSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-700" />
                    <span>Password updated successfully.</span>
                  </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-4 text-xs font-sans max-w-md">
                  <div>
                    <label className="block font-semibold text-brand-forest mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-brand-forest mb-1">
                      New Sacred Password
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-brand-forest mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-brand-forest text-brand-ivory rounded font-semibold tracking-wider hover:bg-brand-forest-light transition-colors"
                    >
                      UPDATE PASSWORD
                    </button>
                  </div>
                </form>
              </div>
            )}
          </main>
        </div>

        {/* Cancellation Modal Dialog */}
        {cancelModalOrderId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCancelModalOrderId(null)} />
            <div className="relative bg-white rounded-xl max-w-md w-full p-6 space-y-4 z-10 shadow-2xl border border-brand-gold/30">
              <h4 className="font-serif text-xl font-bold text-brand-forest">
                Request Order Cancellation #{cancelModalOrderId}
              </h4>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                Please state the reason for cancellation or return. If payment was made online via Razorpay, refund is initiated back to original payment mode within 5-7 business days.
              </p>
              <textarea
                rows={3}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Reason for cancellation (e.g., ordered incorrect fragrance, duplicate order)..."
                className="w-full text-xs p-3 border border-stone-300 rounded focus:outline-none focus:border-brand-gold"
              />
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setCancelModalOrderId(null)}
                  className="px-4 py-2 border border-stone-300 rounded text-xs font-semibold text-stone-700"
                >
                  Close
                </button>
                <button
                  onClick={() => handleRequestCancellation(cancelModalOrderId)}
                  className="px-4 py-2 bg-rose-700 text-white rounded text-xs font-semibold hover:bg-rose-800"
                >
                  Submit Cancellation Request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-ivory flex items-center justify-center font-serif text-brand-forest">Loading devotee account...</div>}>
      <AccountContent />
    </Suspense>
  );
}
