import React from 'react';

export const metadata = {
  title: 'Privacy Policy | AARADHYA DIVINE MIST',
  description: 'Privacy Policy of Aaradhya Divine Mist in compliance with the Information Technology Act, 2000 and Digital Personal Data Protection guidelines.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-brand-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
        <div className="border-b border-brand-gold/25 pb-6">
          <span className="text-xs uppercase font-sans tracking-widest text-brand-gold-dark font-semibold">
            Indian E-Commerce Compliance
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest mt-1">
            Privacy Policy
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            Effective Date: November 2026 | Last Updated: November 11, 2026
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-brand-forest">1. Introduction</h2>
          <p>
            AARADHYA DIVINE MIST (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to protecting the privacy of our devotees and customers. This Privacy Policy governs the collection, use, storage, and disclosure of personal data collected through our official portal in accordance with the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-brand-forest">2. Information We Collect</h2>
          <p>We collect personal information necessary to deliver sacred products and provide customer service:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Customer Name, Email address, and Mobile contact number.</li>
            <li>Shipping address including PIN code for accurate courier routing.</li>
            <li>Transaction reference numbers, order details, and payment statuses. (Note: We never store complete debit/credit card numbers or UPI MPINs; all payment processing is handled through PCI-DSS Level 1 compliant gateways such as Razorpay).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-brand-forest">3. How We Use Your Information</h2>
          <p>Your information is used strictly to:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Process and dispatch your incense and pooja essentials orders.</li>
            <li>Send order confirmation, GST invoices, and real-time shipment tracking via SMS and email.</li>
            <li>Respond to consumer inquiries and grievance requests.</li>
            <li>Comply with Indian tax, GST, and legal regulations.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-brand-forest">4. Data Sharing &amp; Third Parties</h2>
          <p>
            We do not sell, rent, or trade your personal data. We only share necessary delivery information with authorized courier partners (such as Blue Dart, Delhivery, DTDC via Shiprocket) solely for the fulfillment of your shipment.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-brand-forest">5. Grievance Officer Contact</h2>
          <p>
            For any privacy-related queries or requests to review or delete your data, please contact our designated Grievance Officer:
          </p>
          <div className="p-4 bg-brand-neutral rounded-lg border border-brand-gold/20 text-xs">
            <p><strong>Nodal &amp; Grievance Redressal Officer:</strong> Mr. Alok Sengupta</p>
            <p><strong>Email:</strong> grievances@aaradhyadivinemist.com</p>
            <p><strong>Address:</strong> 108 Sacred Grove, Udyog Vihar, Gurugram, Haryana 122016, India</p>
          </div>
        </section>
      </div>
    </div>
  );
}
