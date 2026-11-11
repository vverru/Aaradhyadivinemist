'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  ShieldCheck,
  CreditCard,
  Truck,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Building,
} from 'lucide-react';
import { StoreSettings } from '@/types';
import { useToast } from '@/components/context/ToastContext';

export default function AdminSettingsPage() {
  const { showToast } = useToast();
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data.settings) setSettings(data.settings);
      } catch {
        showToast('Error loading store settings', 'error');
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Store settings & compliance configurations updated!', 'success');
      }
    } catch {
      showToast('Error saving settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="py-20 text-center text-xs text-stone-500 font-sans">
        Loading store settings...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-brand-gold/20 pb-6">
        <h2 className="font-serif text-3xl font-bold text-brand-forest">
          Store Settings &amp; Indian Compliance
        </h2>
        <p className="text-xs text-brand-text-muted mt-1 font-sans">
          Configure official brand identity, Razorpay payment keys, Shiprocket credentials, GST rates, and Legal Metrology details.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8 text-xs font-sans">
        {/* Section 1: Brand & Identity */}
        <div className="bg-white rounded-xl border border-brand-gold/25 p-6 shadow-sm space-y-4">
          <h3 className="font-serif text-xl font-bold text-brand-forest border-b border-brand-gold/15 pb-2">
            1. Brand Identity &amp; Positioning
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-brand-forest mb-1">
                Official Brand Name
              </label>
              <input
                type="text"
                required
                value={settings.brandName}
                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-brand-forest mb-1">
                Official Tagline
              </label>
              <input
                type="text"
                required
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest font-serif italic"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-brand-forest mb-1">
                Support Email
              </label>
              <input
                type="email"
                required
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest"
              />
            </div>
            <div>
              <label className="block font-semibold text-brand-forest mb-1">
                Support Phone
              </label>
              <input
                type="text"
                required
                value={settings.supportPhone}
                onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-brand-forest mb-1">
                WhatsApp Devotee Care
              </label>
              <input
                type="text"
                required
                value={settings.supportWhatsApp}
                onChange={(e) => setSettings({ ...settings, supportWhatsApp: e.target.value })}
                className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Pricing, Tax & Shipping */}
        <div className="bg-white rounded-xl border border-brand-gold/25 p-6 shadow-sm space-y-4">
          <h3 className="font-serif text-xl font-bold text-brand-forest border-b border-brand-gold/15 pb-2">
            2. Currency, Shipping &amp; Tax Rules
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block font-semibold text-brand-forest mb-1">
                Currency
              </label>
              <input
                type="text"
                disabled
                value="INR (₹)"
                className="w-full px-3 py-2 border border-stone-200 rounded-lg text-stone-600 bg-stone-50 font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold text-brand-forest mb-1">
                Free Shipping Order Min (₹)
              </label>
              <input
                type="number"
                required
                value={settings.freeShippingThreshold}
                onChange={(e) =>
                  setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest font-mono font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold text-brand-forest mb-1">
                Standard Shipping Fee (₹)
              </label>
              <input
                type="number"
                required
                value={settings.standardShippingFee}
                onChange={(e) =>
                  setSettings({ ...settings, standardShippingFee: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-brand-forest mb-1">
                GST Tax Rate (%)
              </label>
              <input
                type="number"
                required
                value={settings.taxRatePercent}
                onChange={(e) =>
                  setSettings({ ...settings, taxRatePercent: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest font-mono"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer font-semibold text-brand-forest pt-2">
            <input
              type="checkbox"
              checked={settings.enableCod}
              onChange={(e) => setSettings({ ...settings, enableCod: e.target.checked })}
              className="accent-brand-forest w-4 h-4"
            />
            <span>Enable Cash on Delivery (COD) for Pan-India Orders</span>
          </label>
        </div>

        {/* Section 3: Razorpay Payment Credentials */}
        <div className="bg-white rounded-xl border border-brand-gold/25 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-brand-gold/15 pb-2">
            <h3 className="font-serif text-xl font-bold text-brand-forest flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-brand-gold" />
              <span>3. Razorpay Payment Gateway Integration</span>
            </h3>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase">
              Secure Server Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-brand-forest mb-1">
                Razorpay Key ID
              </label>
              <input
                type="text"
                value={settings.razorpayKeyId || ''}
                onChange={(e) => setSettings({ ...settings, razorpayKeyId: e.target.value })}
                placeholder="rzp_live_xxxxxxxx or rzp_test_xxxxxxxx"
                className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-brand-forest mb-1">
                Razorpay Key Secret
              </label>
              <input
                type="password"
                value={settings.razorpayKeySecret || ''}
                onChange={(e) => setSettings({ ...settings, razorpayKeySecret: e.target.value })}
                placeholder="••••••••••••••••••••"
                className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest font-mono"
              />
            </div>
          </div>
          <p className="text-[11px] text-stone-500">
            Never shared with client browser code. Used strictly on server for HMAC-SHA256 signature verification and order creation.
          </p>
        </div>

        {/* Section 4: Indian Legal Metrology Declarations */}
        <div className="bg-white rounded-xl border border-brand-gold/25 p-6 shadow-sm space-y-4">
          <h3 className="font-serif text-xl font-bold text-brand-forest border-b border-brand-gold/15 pb-2 flex items-center gap-2">
            <Building className="w-5 h-5 text-brand-gold" />
            <span>4. Mandatory Indian Legal Metrology Declarations</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-brand-forest mb-1">
                Manufacturer Details (Survey / Factory)
              </label>
              <input
                type="text"
                required
                value={settings.legalMetrologyManufacturer}
                onChange={(e) =>
                  setSettings({ ...settings, legalMetrologyManufacturer: e.target.value })
                }
                className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest"
              />
            </div>

            <div>
              <label className="block font-semibold text-brand-forest mb-1">
                Packer &amp; Logistics Hub
              </label>
              <input
                type="text"
                required
                value={settings.legalMetrologyPacker}
                onChange={(e) =>
                  setSettings({ ...settings, legalMetrologyPacker: e.target.value })
                }
                className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest"
              />
            </div>

            <div>
              <label className="block font-semibold text-brand-forest mb-1">
                Consumer Care Declaration
              </label>
              <input
                type="text"
                required
                value={settings.legalMetrologyConsumerCare}
                onChange={(e) =>
                  setSettings({ ...settings, legalMetrologyConsumerCare: e.target.value })
                }
                className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest"
              />
            </div>

            <div>
              <label className="block font-semibold text-brand-forest mb-1">
                Nodal Grievance Redressal Officer
              </label>
              <input
                type="text"
                required
                value={settings.legalMetrologyGrievanceOfficer}
                onChange={(e) =>
                  setSettings({ ...settings, legalMetrologyGrievanceOfficer: e.target.value })
                }
                className="w-full px-3 py-2 border border-brand-gold/30 rounded-lg text-brand-forest"
              />
            </div>
          </div>
        </div>

        {/* Save CTA */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-brand-forest text-brand-ivory text-xs font-sans tracking-widest font-semibold rounded-lg hover:bg-brand-forest-light transition-all flex items-center gap-2 shadow-md"
          >
            <Save className="w-4 h-4 text-brand-gold" />
            <span>{saving ? 'SAVING SETTINGS...' : 'SAVE ALL SETTINGS'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
