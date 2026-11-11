import React from 'react';
import Link from 'next/link';
import {
  DollarSign,
  ShoppingCart,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Package,
  Plus,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { getDashboardStats, getProducts } from '@/lib/db';

export const revalidate = 0;

export default function AdminDashboardPage() {
  const stats = getDashboardStats();
  const products = getProducts({ status: 'all' });
  const lowStockProducts = products.filter((p) => p.stock <= (p.lowStockThreshold || 10));

  return (
    <div className="space-y-8">
      {/* Welcome & Quick Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-sans tracking-[0.25em] text-brand-gold-dark font-semibold">
            Store Performance Overview
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest mt-0.5">
            Admin Sanctuary Dashboard
          </h2>
          <p className="text-xs text-brand-text-muted mt-1 font-sans">
            Real-time analytics for Aaradhya Divine Mist incense orders, logistics, and inventory.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products?action=new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-forest text-brand-ivory text-xs font-sans font-semibold rounded-lg hover:bg-brand-forest-light transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 text-brand-gold" />
            <span>Add New Product</span>
          </Link>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-brand-gold/30 text-brand-forest text-xs font-sans font-semibold rounded-lg hover:bg-brand-sage/30 transition-all shadow-sm"
          >
            <ShoppingCart className="w-4 h-4 text-brand-gold-dark" />
            <span>View All Orders</span>
          </Link>
        </div>
      </div>

      {/* 8 Statistic Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Sales */}
        <div className="p-5 rounded-xl bg-white border border-brand-gold/20 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-500 font-sans">
            <span>Total Sales Revenue</span>
            <div className="w-8 h-8 rounded-full bg-brand-sage/50 flex items-center justify-center text-brand-forest">
              <span className="font-bold">₹</span>
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-brand-forest font-sans">
            ₹{stats.totalSales.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> 100% Verified Paid
          </span>
        </div>

        {/* Total Orders */}
        <div className="p-5 rounded-xl bg-white border border-brand-gold/20 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-500 font-sans">
            <span>Total Orders Placed</span>
            <div className="w-8 h-8 rounded-full bg-brand-sage/50 flex items-center justify-center text-brand-forest">
              <ShoppingCart className="w-4 h-4 text-brand-gold-dark" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-brand-forest font-sans">
            {stats.totalOrders}
          </p>
          <span className="text-[11px] text-brand-text-muted">
            Pan-India devotions
          </span>
        </div>

        {/* Pending Orders */}
        <div className="p-5 rounded-xl bg-white border border-brand-gold/20 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-500 font-sans">
            <span>Pending Dispatch</span>
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-amber-900 font-sans">
            {stats.pendingOrders}
          </p>
          <span className="text-[11px] text-amber-700 font-medium">
            Requires sacred packing
          </span>
        </div>

        {/* Delivered Orders */}
        <div className="p-5 rounded-xl bg-white border border-brand-gold/20 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-500 font-sans">
            <span>Delivered Shipments</span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-emerald-900 font-sans">
            {stats.deliveredOrders}
          </p>
          <span className="text-[11px] text-emerald-800 font-medium">
            Blessed into homes
          </span>
        </div>

        {/* Average Order Value (AOV) */}
        <div className="p-5 rounded-xl bg-white border border-brand-gold/20 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-500 font-sans">
            <span>Average Order Value</span>
            <div className="w-8 h-8 rounded-full bg-brand-sage/50 flex items-center justify-center text-brand-forest">
              <TrendingUp className="w-4 h-4 text-brand-gold-dark" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-brand-forest font-sans">
            ₹{stats.aov}
          </p>
          <span className="text-[11px] text-brand-text-muted">
            Per devotee basket
          </span>
        </div>

        {/* Low Stock Alerts */}
        <div className="p-5 rounded-xl bg-white border border-brand-gold/20 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-500 font-sans">
            <span>Low Stock Alerts</span>
            <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-rose-900 font-sans">
            {stats.lowStockCount}
          </p>
          <span className="text-[11px] text-rose-700 font-medium">
            Needs production dipping
          </span>
        </div>

        {/* Pending Reviews Moderation */}
        <div className="p-5 rounded-xl bg-white border border-brand-gold/20 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-500 font-sans">
            <span>Pending Reviews</span>
            <div className="w-8 h-8 rounded-full bg-brand-sage/50 flex items-center justify-center text-brand-forest">
              <Sparkles className="w-4 h-4 text-brand-gold" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-brand-forest font-sans">
            {stats.pendingReviews}
          </p>
          <span className="text-[11px] text-brand-gold-dark font-medium">
            Awaiting verification
          </span>
        </div>

        {/* Published Products */}
        <div className="p-5 rounded-xl bg-white border border-brand-gold/20 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-500 font-sans">
            <span>Catalog Items</span>
            <div className="w-8 h-8 rounded-full bg-brand-sage/50 flex items-center justify-center text-brand-forest">
              <Package className="w-4 h-4 text-brand-gold-dark" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-brand-forest font-sans">
            {products.length}
          </p>
          <span className="text-[11px] text-brand-text-muted">
            Active formulations
          </span>
        </div>
      </div>

      {/* Two Column Section: Recent Orders Table & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-brand-gold/20 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-brand-gold/15 pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-brand-forest">
                Recent Orders
              </h3>
              <p className="text-xs text-stone-500 font-sans">
                Latest customer devotions requiring packing &amp; shipment.
              </p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-brand-gold-dark hover:underline flex items-center gap-1 font-sans"
            >
              View All Orders <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-brand-neutral/50 text-brand-forest uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Order No.</th>
                  <th className="py-2.5 px-3">Devotee</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gold/15">
                {stats.recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-brand-neutral/30 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-brand-forest">
                      {ord.orderNumber}
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-semibold text-stone-900">{ord.customerName}</p>
                      <p className="text-[10px] text-stone-400">{ord.customerPhone}</p>
                    </td>
                    <td className="py-3 px-3 font-bold text-brand-forest">
                      ₹{ord.grandTotal}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          ord.status === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ord.status === 'shipped'
                            ? 'bg-brand-sage text-brand-forest'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        href={`/admin/orders?order=${ord.orderNumber}`}
                        className="text-brand-forest font-semibold hover:text-brand-gold underline"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts Box */}
        <div className="bg-white rounded-xl border border-brand-gold/20 p-6 shadow-sm space-y-4">
          <div className="border-b border-brand-gold/15 pb-4">
            <h3 className="font-serif text-xl font-bold text-brand-forest">
              Inventory Attention
            </h3>
            <p className="text-xs text-stone-500 font-sans">
              Products at or below reorder threshold.
            </p>
          </div>

          {lowStockProducts.length === 0 ? (
            <div className="py-8 text-center text-xs text-stone-500 font-sans">
              All inventory levels are healthy!
            </div>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-lg bg-amber-50/60 border border-amber-200 flex items-center justify-between text-xs font-sans"
                >
                  <div>
                    <p className="font-semibold text-amber-950 font-serif text-sm">
                      {p.name}
                    </p>
                    <p className="text-[11px] text-amber-800">{p.packSize}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-rose-700 block">
                      {p.stock} units left
                    </span>
                    <Link
                      href={`/admin/inventory?product=${p.id}`}
                      className="text-[11px] text-brand-forest underline hover:text-brand-gold font-semibold"
                    >
                      Restock →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-2">
            <Link
              href="/admin/inventory"
              className="block w-full text-center py-2 bg-brand-neutral rounded text-xs font-semibold text-brand-forest hover:bg-brand-sage/40 transition-colors"
            >
              Open Full Inventory Ledger →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
