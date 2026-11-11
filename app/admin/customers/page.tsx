'use client';

import React, { useState, useEffect } from 'react';
import { Users, Mail, Phone, ShoppingBag, Search, Sparkles } from 'lucide-react';
import { Order } from '@/types';

export default function AdminCustomersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.orders) setOrders(data.orders);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Aggregate orders by unique email
  const customersMap = new Map<string, {
    email: string;
    name: string;
    phone: string;
    city: string;
    state: string;
    orderCount: number;
    totalSpend: number;
    lastOrderDate: string;
  }>();

  orders.forEach((ord) => {
    const key = ord.customerEmail.toLowerCase();
    if (!customersMap.has(key)) {
      customersMap.set(key, {
        email: ord.customerEmail,
        name: ord.customerName,
        phone: ord.customerPhone,
        city: ord.shippingAddress.city,
        state: ord.shippingAddress.state,
        orderCount: 1,
        totalSpend: ord.grandTotal,
        lastOrderDate: ord.createdAt,
      });
    } else {
      const c = customersMap.get(key)!;
      c.orderCount += 1;
      c.totalSpend += ord.grandTotal;
      if (new Date(ord.createdAt) > new Date(c.lastOrderDate)) {
        c.lastOrderDate = ord.createdAt;
      }
    }
  });

  const customers = Array.from(customersMap.values());

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-brand-gold/20 pb-6">
        <h2 className="font-serif text-3xl font-bold text-brand-forest">
          Customer Directory &amp; Devotee Lifetime Value
        </h2>
        <p className="text-xs text-brand-text-muted mt-1 font-sans">
          Track customer engagement, order counts, and lifetime sacred purchases.
        </p>
      </div>

      <div className="max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by customer name, email, or city..."
          className="w-full px-3.5 py-2 border border-brand-gold/30 rounded-lg text-xs text-brand-forest focus:outline-none focus:border-brand-gold bg-white"
        />
      </div>

      <div className="bg-white rounded-xl border border-brand-gold/25 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-brand-neutral/60 text-brand-forest uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4">Devotee Customer</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Orders Placed</th>
                <th className="py-3 px-4">Lifetime Spend</th>
                <th className="py-3 px-4">Last Order</th>
                <th className="py-3 px-4 text-right">Devotee Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-gold/15">
              {filtered.map((cust, idx) => (
                <tr key={idx} className="hover:bg-brand-neutral/20 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-brand-forest text-sm">{cust.name}</p>
                    <p className="text-[11px] text-stone-500">{cust.email} • {cust.phone}</p>
                  </td>
                  <td className="py-3.5 px-4 text-stone-700">
                    {cust.city}, {cust.state}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-brand-forest">
                    {cust.orderCount} {cust.orderCount === 1 ? 'order' : 'orders'}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-brand-forest text-sm font-sans">
                    ₹{cust.totalSpend.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-stone-500">
                    {new Date(cust.lastOrderDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-sage text-brand-forest">
                      <Sparkles className="w-3 h-3 text-brand-gold-dark" /> Aaradhya Circle
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
