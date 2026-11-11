import React from 'react';

export const metadata = {
  title: 'Cancellation & Return Policy | AARADHYA DIVINE MIST',
  description: 'Devotee-friendly 7 days replacement and refund policy for damaged or defective spiritual incense.',
};

export default function ReturnsPolicyPage() {
  return (
    <div className="bg-brand-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
        <div className="border-b border-brand-gold/25 pb-6">
          <span className="text-xs uppercase font-sans tracking-widest text-brand-gold-dark font-semibold">
            Consumer Satisfaction
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest mt-1">
            Cancellation &amp; Refund Policy
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            7 Days Devotee Purity Assurance
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-brand-forest">1. Order Cancellations</h2>
          <p>
            You can request an order cancellation before your parcel is manifested with the courier by logging into your Devotee Sanctuary account or contacting our customer care at <a href="mailto:care@aaradhyadivinemist.com" className="text-brand-forest underline font-semibold">care@aaradhyadivinemist.com</a> or via WhatsApp at +91 98765 43210. Full refunds for prepaid orders will be processed immediately to the original payment source.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-brand-forest">2. 7-Day Replacement Policy</h2>
          <p>
            Due to the sacred and personal devotional nature of incense products, opened or burned incense sticks cannot be accepted for return. However, if your order arrives:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Damaged in transit or broken during shipping,</li>
            <li>Defective in manufacturing, or</li>
            <li>Different from the items ordered,</li>
          </ul>
          <p>
            we provide a <strong>100% free replacement or full refund</strong>. Simply notify us within 7 days of delivery with a photo of the received outer box and damaged contents.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-brand-forest">3. Refund Timelines</h2>
          <p>
            Refunds are credited back to the original method (Bank account, UPI, Debit/Credit Card) within 5 to 7 working days from the date of approval, in accordance with Reserve Bank of India (RBI) payment settlement guidelines.
          </p>
        </section>
      </div>
    </div>
  );
}
