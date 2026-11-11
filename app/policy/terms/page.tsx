import React from 'react';

export const metadata = {
  title: 'Terms & Conditions | AARADHYA DIVINE MIST',
  description: 'Terms and conditions governing the purchase of incense and pooja essentials on Aaradhya Divine Mist.',
};

export default function TermsPage() {
  return (
    <div className="bg-brand-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
        <div className="border-b border-brand-gold/25 pb-6">
          <span className="text-xs uppercase font-sans tracking-widest text-brand-gold-dark font-semibold">
            Legal Terms of Service
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest mt-1">
            Terms &amp; Conditions
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            Last Updated: November 11, 2026
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-brand-forest">1. Agreement to Terms</h2>
          <p>
            By accessing or purchasing from AARADHYA DIVINE MIST, you agree to be bound by these Terms &amp; Conditions, our Privacy Policy, and applicable Indian laws including the Consumer Protection Act, 2019 and Legal Metrology Act, 2009.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-brand-forest">2. Product Pricing &amp; GST Declarations</h2>
          <p>
            All prices displayed on the website are in Indian Rupees (INR ₹) and are inclusive of Goods &amp; Services Tax (GST) at the prevailing statutory rate (18% for agarbatti and incense essentials). We reserve the right to revise prices without prior notice; however, completed orders will always be honored at the verified price at the time of checkout.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-brand-forest">3. Product Usage &amp; Fire Safety</h2>
          <p>
            Incense sticks and dhoop involve open embers. Customers are advised to strictly follow the safety instructions printed on the product packaging: never leave burning incense unattended, use heat-resistant non-flammable holders, and keep away from combustible materials, children, and pets.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-brand-forest">4. Jurisdiction</h2>
          <p>
            These terms shall be governed by and interpreted in accordance with the laws of India. Any disputes arising in connection with the purchase of products shall be subject to the exclusive jurisdiction of the competent courts in Gurugram / New Delhi, India.
          </p>
        </section>
      </div>
    </div>
  );
}
