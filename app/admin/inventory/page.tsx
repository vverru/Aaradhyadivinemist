'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Boxes,
  AlertTriangle,
  Plus,
  Minus,
  CheckCircle,
  Clock,
  Search,
} from 'lucide-react';
import { Product } from '@/types';
import { useToast } from '@/components/context/ToastContext';

export default function AdminInventoryPage() {
  const { showToast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [adjustmentAmount, setAdjustmentAmount] = useState<number>(10);
  const [adjustmentType, setAdjustmentType] = useState<'add' | 'subtract'>('add');
  const [reason, setReason] = useState('New Production Dipping Batch');

  const loadData = async () => {
    try {
      const res = await fetch('/api/products?status=all');
      const data = await res.json();
      if (data.products) setProducts(data.products);
    } catch {
      showToast('Error loading inventory', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdjustStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const diff = adjustmentType === 'add' ? adjustmentAmount : -adjustmentAmount;
    const newStock = Math.max(0, selectedProduct.stock + diff);

    try {
      const res = await fetch(`/api/products/${selectedProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: newStock }),
      });
      if (res.ok) {
        showToast(
          `Adjusted stock for ${selectedProduct.name} by ${diff > 0 ? '+' : ''}${diff} units (${reason}).`,
          'success'
        );
        setSelectedProduct(null);
        loadData();
      }
    } catch {
      showToast('Error adjusting inventory', 'error');
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.categoryName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-brand-gold/20 pb-6">
        <h2 className="font-serif text-3xl font-bold text-brand-forest">
          Inventory Ledger &amp; Stock Levels
        </h2>
        <p className="text-xs text-brand-text-muted mt-1 font-sans">
          Monitor physical warehouse counts, record new fragrance dipping batches, and manage threshold warnings.
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter inventory by fragrance or category..."
          className="w-full px-3.5 py-2 border border-brand-gold/30 rounded-lg text-xs text-brand-forest focus:outline-none focus:border-brand-gold bg-white"
        />
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-brand-gold/25 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-brand-neutral/60 text-brand-forest uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4">Fragrance SKU</th>
                <th className="py-3 px-4">Pack Size</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Reorder Level</th>
                <th className="py-3 px-4">Health Status</th>
                <th className="py-3 px-4 text-right">Quick Stock Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-gold/15">
              {filtered.map((prod) => {
                const isLow = prod.stock <= (prod.lowStockThreshold || 10);
                return (
                  <tr key={prod.id} className="hover:bg-brand-neutral/20 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded bg-brand-ivory overflow-hidden shrink-0 border border-brand-gold/20">
                          <Image src={prod.images[0] || '/images/products/sandalwood.png'} alt={prod.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-brand-forest">{prod.name}</p>
                          <p className="text-[10px] text-stone-400">{prod.categoryName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-stone-600">{prod.packSize}</td>
                    <td className="py-3.5 px-4 font-bold text-sm font-sans">
                      <span className={isLow ? 'text-rose-600 font-extrabold' : 'text-brand-forest'}>
                        {prod.stock} units
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-500 font-mono">
                      {prod.lowStockThreshold || 10} units
                    </td>
                    <td className="py-3.5 px-4">
                      {isLow ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                          <AlertTriangle className="w-3 h-3" /> Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          <CheckCircle className="w-3 h-3" /> Sufficient
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedProduct(prod)}
                        className="px-3 py-1 bg-brand-forest text-brand-ivory text-xs font-semibold rounded hover:bg-brand-forest-light"
                      >
                        Adjust Stock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Stock Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
          <div className="relative bg-white rounded-2xl max-w-md w-full p-6 space-y-4 z-10 shadow-2xl border border-brand-gold/30">
            <h3 className="font-serif text-xl font-bold text-brand-forest">
              Stock Adjustment: {selectedProduct.name}
            </h3>
            <p className="text-xs text-stone-500 font-sans">
              Current recorded balance: <strong>{selectedProduct.stock} units</strong>
            </p>

            <form onSubmit={handleAdjustStock} className="space-y-4 text-xs font-sans">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setAdjustmentType('add')}
                  className={`flex-1 py-2 rounded font-semibold border flex items-center justify-center gap-1 ${
                    adjustmentType === 'add'
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'border-stone-300 text-stone-600'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" /> Restock / Add
                </button>
                <button
                  type="button"
                  onClick={() => setAdjustmentType('subtract')}
                  className={`flex-1 py-2 rounded font-semibold border flex items-center justify-center gap-1 ${
                    adjustmentType === 'subtract'
                      ? 'bg-rose-700 text-white border-rose-700'
                      : 'border-stone-300 text-stone-600'
                  }`}
                >
                  <Minus className="w-3.5 h-3.5" /> Deduct / Damaged
                </button>
              </div>

              <div>
                <label className="block font-semibold text-brand-forest mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={adjustmentAmount}
                  onChange={(e) => setAdjustmentAmount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-brand-forest mb-1">
                  Reason for Adjustment
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold bg-white"
                >
                  <option value="New Production Dipping Batch">New Production Dipping Batch</option>
                  <option value="Warehouse Physical Count Audit">Warehouse Physical Count Audit</option>
                  <option value="Packaging Transit Damage">Packaging Transit Damage</option>
                  <option value="Temple Festive Donation / Sampling">Temple Festive Donation / Sampling</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 border border-stone-300 rounded text-stone-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-brand-forest text-brand-ivory rounded font-semibold hover:bg-brand-forest-light"
                >
                  Apply Stock Change
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
