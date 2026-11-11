import React from 'react';

export const metadata = {
  title: 'Shipping & Delivery Policy | AARADHYA DIVINE MIST',
  description: 'Pan-India shipping rates, delivery timelines, courier partners, and packaging standards for Aaradhya Divine Mist.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-brand-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
        <div className="border-b border-brand-gold/25 pb-6">
          <span className="text-xs uppercase font-sans tracking-widest text-brand-gold-dark font-semibold">
            Logistics &amp; Fulfillment
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest mt-1">
            Shipping &amp; Delivery Policy
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            Pan-India Coverage • Verified Courier Logistics
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-brand-forest">1. Delivery Zones &amp; Coverage</h2>
          <p>
            We deliver to over 19,000+ PIN codes across all 28 States and 8 Union Territories in India through our integrated logistics network including Blue Dart, Delhivery, DTDC, and India Post Speed Post.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-brand-forest">2. Shipping Charges</h2>
          <div className="p-4 bg-white rounded-xl border border-brand-gold/25 space-y-2">
            <p><strong>Standard Delivery:</strong> FREE on all orders with a cart value of ₹799 or above. For orders under ₹799, a nominal flat shipping fee of ₹60 is applied.</p>
            <p><strong>Priority Air Express:</strong> Flat ₹120 for same-day dispatch and 24-48 hours delivery to Tier-1 metropolitan cities.</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-brand-forest">3. Estimated Timelines</h2>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Delhi NCR, Punjab, Haryana: 1 to 2 business days.</li>
            <li>Bengaluru, Mumbai, Hyderabad, Chennai, Kolkata: 2 to 3 business days.</li>
            <li>Rest of India &amp; Rural PIN codes: 3 to 5 business days.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-brand-forest">4. Real-Time Tracking</h2>
          <p>
            As soon as your sacred order is packed and dispatched, an Air Waybill (AWB) number and direct tracking link are sent to your registered mobile number via SMS and WhatsApp. You can also track your parcel at any time through our online tracker at <a href="/track-order" className="text-brand-forest font-semibold underline">aaradhyadivinemist.com/track-order</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
