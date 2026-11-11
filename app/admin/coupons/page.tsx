'use client';

import React, { useState, useEffect } from 'react';
import { Tag, Plus, Trash2, CheckCircle, X, Sparkles } from 'lucide-react';
import { Coupon } from '@/types';
import { useToast } from '@/components/context/ToastContext';

export default function AdminCouponsPage() {
  const { showToast } = useToast();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState(10);
  const [minOrderValue, setMinOrderValue] = useState(499);
  const [maxDiscount, setMaxDiscount] = useState(200);
  const [validUntil, setValidUntil] = useState('2027-12-31T23:59:59Z');

  const loadCoupons = async () => {
    try {
      const res = await fetch('/api/coupons');
      const data = await res.json();
      if (data.coupons) setCoupons(data.coupons);
    } catch {
      showToast('Error loading coupons', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    try {
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          description,
          discountType,
          discountValue: Number(discountValue),
          minOrderValue: Number(minOrderValue),
          maxDiscount: discountType === 'percentage' ? Number(maxDiscount) : undefined,
          validUntil,
          isActive: true,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Coupon ${code.toUpperCase()} created!`, 'success');
        setIsModalOpen(false);
        setCode('');
        setDescription('');
        loadCoupons();
      }
    } catch {
      showToast('Failed to create coupon', 'error');
    }
  };

  const handleDeleteCoupon = async (id: string, couponCode: string) => {
    if (!confirm(`Delete coupon "${couponCode}"?`)) return;
    try {
      const res = await fetch(`/api/coupons?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (res.ok) {
        showToast(`Coupon "${couponCode}" deleted`, 'info');
        loadCoupons();
      }
    } catch {
      showToast('Failed to delete coupon', 'error');
    }
  };

  const handleToggleActive = async (c: Coupon) => {
    try {
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...c, isActive: !c.isActive }),
      });
      if (res.ok) {
        showToast(`Coupon ${c.code} status updated`, 'success');
        loadCoupons();
      }
    } catch {
      showToast('Failed to update status', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-brand-gold/20 gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold text-brand-forest">
            Coupons &amp; Promotional Marketing
          </h2>
          <p className="text-xs text-brand-text-muted mt-1 font-sans">
            Configure auspicious festive discounts, minimum order conditions, and view redemption metrics.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-forest text-brand-ivory text-xs font-sans font-semibold rounded-lg hover:bg-brand-forest-light transition-all shadow-sm"
        >
          <Plus className="w-4 h-4 text-brand-gold" />
          <span>Create Coupon</span>
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-xl border border-brand-gold/25 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-brand-neutral/60 text-brand-forest uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4">Coupon Code</th>
                <th className="py-3 px-4">Discount</th>
                <th className="py-3 px-4">Min Order</th>
                <th className="py-3 px-4">Usage Count</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-gold/15">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-brand-neutral/20 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-brand-forest text-sm bg-brand-sage/40 px-2.5 py-1 rounded border border-brand-gold/25">
                      {c.code}
                    </span>
                    <p className="text-[11px] text-stone-500 mt-1">{c.description}</p>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-brand-forest text-sm">
                    {c.discountType === 'percentage'
                      ? `${c.discountValue}% OFF`
                      : `Flat ₹${c.discountValue} OFF`}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-stone-700">
                    ₹{c.minOrderValue}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-brand-forest">
                    {c.usageCount} times
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleActive(c)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        c.isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {c.isActive ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDeleteCoupon(c.id, c.code)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 rounded hover:bg-rose-50"
                      title="Delete coupon"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-2xl max-w-md w-full p-6 space-y-4 z-10 shadow-2xl border border-brand-gold/30">
            <div className="flex justify-between items-center border-b border-brand-gold/20 pb-3">
              <h3 className="font-serif text-xl font-bold text-brand-forest">
                Create Festive Discount Coupon
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block font-semibold text-brand-forest mb-1">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. DIWALI20"
                  className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold uppercase font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-brand-forest mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. 20% festive discount on all items"
                  className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-brand-forest mb-1">
                    Discount Type
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold bg-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-brand-forest mb-1">
                    Value {discountType === 'percentage' ? '(%)' : '(₹)'} *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-brand-forest mb-1">
                    Min Order Value (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={minOrderValue}
                    onChange={(e) => setMinOrderValue(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold font-mono"
                  />
                </div>
                {discountType === 'percentage' && (
                  <div>
                    <label className="block font-semibold text-brand-forest mb-1">
                      Max Cap (₹)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={maxDiscount}
                      onChange={(e) => setMaxDiscount(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold font-mono"
                    />
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded text-stone-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-brand-forest text-brand-ivory rounded font-semibold hover:bg-brand-forest-light"
                >
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
