'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingCart,
  Search,
  Filter,
  Truck,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  X,
  FileText,
} from 'lucide-react';
import { Order, OrderStatus, PaymentStatus } from '@/types';
import { useToast } from '@/components/context/ToastContext';

export default function AdminOrdersPage() {
  const { showToast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Selected Order for Status Update Modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editStatus, setEditStatus] = useState<OrderStatus>('pending');
  const [editPaymentStatus, setEditPaymentStatus] = useState<PaymentStatus>('paid');
  const [courierName, setCourierName] = useState('');
  const [awbNumber, setAwbNumber] = useState('');
  const [saving, setSaving] = useState(false);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.orders) setOrders(data.orders);
    } catch {
      showToast('Error loading orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const openStatusModal = (ord: Order) => {
    setSelectedOrder(ord);
    setEditStatus(ord.status);
    setEditPaymentStatus(ord.paymentStatus);
    setCourierName(ord.courierName || 'Blue Dart Express');
    setAwbNumber(ord.awbNumber || `BLUEDART${Math.floor(10000000 + Math.random() * 90000000)}`);
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/orders/${selectedOrder.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editStatus,
          paymentStatus: editPaymentStatus,
          courierName,
          awbNumber,
          trackingUrl: `https://track.aaradhyadivinemist.com?awb=${awbNumber}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Order #${selectedOrder.orderNumber} updated to ${editStatus.toUpperCase()}`, 'success');
        setSelectedOrder(null);
        loadOrders();
      }
    } catch {
      showToast('Failed to update order', 'error');
    } finally {
      setSaving(false);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone.includes(search) ||
      o.shippingAddress.pincode.includes(search);
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-brand-gold/20 gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold text-brand-forest">
            Order Logistics &amp; Fulfillment
          </h2>
          <p className="text-xs text-brand-text-muted mt-1 font-sans">
            Manage dispatch statuses, assign courier AWBs, update payment states, and view customer addresses.
          </p>
        </div>

        <button
          onClick={loadOrders}
          className="inline-flex items-center gap-2 px-4 py-2 border border-brand-gold/30 rounded-lg text-xs font-sans font-semibold text-brand-forest hover:bg-brand-sage/30"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Orders</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 text-xs font-sans">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order #, devotee name, phone, or PIN code..."
            className="w-full pl-10 pr-4 py-2 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold bg-white"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest bg-white focus:outline-none focus:border-brand-gold"
        >
          <option value="all">All Order Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing (Sacred Packing)</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-brand-gold/25 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-brand-neutral/60 text-brand-forest uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4">Order No.</th>
                <th className="py-3 px-4">Devotee &amp; Destination</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-gold/15">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-stone-400">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-brand-neutral/20 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-forest">
                      {ord.orderNumber}
                      <span className="block text-[10px] text-stone-400 font-sans font-normal">
                        {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-stone-900">{ord.customerName}</p>
                      <p className="text-[11px] text-stone-500">
                        {ord.shippingAddress.city}, {ord.shippingAddress.state} ({ord.shippingAddress.pincode})
                      </p>
                      <p className="text-[10px] text-stone-400">{ord.customerPhone}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold">{ord.items.length} items</span>
                      <span className="text-[10px] text-stone-500 block truncate max-w-[150px]">
                        {ord.items.map((i) => i.productName).join(', ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-brand-forest text-sm">
                      ₹{ord.grandTotal}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          ord.paymentStatus === 'paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ord.paymentStatus === 'refunded'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ord.paymentStatus}
                      </span>
                      <span className="text-[10px] text-stone-400 block uppercase">
                        {ord.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          ord.status === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ord.status === 'shipped'
                            ? 'bg-brand-sage text-brand-forest'
                            : ord.status === 'cancelled'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/order-success?orderId=${encodeURIComponent(ord.orderNumber)}`}
                          target="_blank"
                          className="p-1 text-stone-400 hover:text-brand-forest"
                          title="View Tax Invoice"
                        >
                          <FileText className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => openStatusModal(ord)}
                          className="px-3 py-1 bg-brand-forest text-brand-ivory text-xs font-semibold rounded hover:bg-brand-forest-light"
                        >
                          Manage
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Status & Shipping Update Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 z-10 shadow-2xl border border-brand-gold/30">
            <div className="flex justify-between items-center border-b border-brand-gold/20 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-brand-forest">
                  Manage Order #{selectedOrder.orderNumber}
                </h3>
                <p className="text-xs text-stone-500 font-sans">
                  Devotee: {selectedOrder.customerName} • Grand Total: ₹{selectedOrder.grandTotal}
                </p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-brand-forest mb-1">
                    Order Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as any)}
                    className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold bg-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing (Packing)</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-brand-forest mb-1">
                    Payment Status
                  </label>
                  <select
                    value={editPaymentStatus}
                    onChange={(e) => setEditPaymentStatus(e.target.value as any)}
                    className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold bg-white"
                  >
                    <option value="paid">Paid</option>
                    <option value="pending">Pending (COD)</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-brand-forest mb-1">
                  Courier Company
                </label>
                <select
                  value={courierName}
                  onChange={(e) => setCourierName(e.target.value)}
                  className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold bg-white"
                >
                  <option value="Blue Dart Express">Blue Dart Express</option>
                  <option value="Delhivery Surface">Delhivery Surface</option>
                  <option value="DTDC Express">DTDC Express</option>
                  <option value="India Post Speed Post">India Post Speed Post</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-brand-forest mb-1">
                  Air Waybill (AWB) Number
                </label>
                <input
                  type="text"
                  value={awbNumber}
                  onChange={(e) => setAwbNumber(e.target.value)}
                  placeholder="e.g. BLUEDART98765432"
                  className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold font-mono"
                />
              </div>

              <div className="pt-4 border-t border-brand-gold/20 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 border border-stone-300 rounded text-xs font-semibold text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-brand-forest text-brand-ivory rounded text-xs font-semibold hover:bg-brand-forest-light transition-colors"
                >
                  {saving ? 'Saving...' : 'Update Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
