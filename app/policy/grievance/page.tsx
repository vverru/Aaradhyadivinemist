import React from 'react';

export const metadata = {
  title: 'Grievance Redressal Mechanism | AARADHYA DIVINE MIST',
  description: 'Nodal Officer and Grievance Redressal details in accordance with Consumer Protection (E-Commerce) Rules, 2020.',
};

export default function GrievancePage() {
  return (
    <div className="bg-brand-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
        <div className="border-b border-brand-gold/25 pb-6">
          <span className="text-xs uppercase font-sans tracking-widest text-brand-gold-dark font-semibold">
            Statutory Indian Compliance
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest mt-1">
            Grievance Redressal Mechanism
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            In compliance with the Consumer Protection (E-Commerce) Rules, 2020 &amp; Information Technology Act, 2000
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-brand-forest">1. Consumer Care &amp; Escalation Matrix</h2>
          <p>
            We take consumer trust and devotional integrity with utmost seriousness. In accordance with the Consumer Protection (E-Commerce) Rules, 2020, every customer has the statutory right to prompt grievance resolution.
          </p>
          <div className="p-4 bg-white rounded-xl border border-brand-gold/25 space-y-2">
            <h3 className="font-bold text-brand-forest text-sm">Level 1: Devotee Care Support</h3>
            <p>Email: <a href="mailto:care@aaradhyadivinemist.com" className="text-brand-forest underline">care@aaradhyadivinemist.com</a></p>
            <p>Phone: +91 98765 43210 / Toll-Free: 1800-208-1080 (10:00 AM – 7:00 PM IST, Monday to Saturday)</p>
            <p className="text-stone-500 text-xs">Standard response time: Within 24 business hours.</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-brand-forest">2. Designated Grievance &amp; Nodal Officer</h2>
          <p>
            If your grievance is not resolved to your satisfaction at Level 1, you may escalate directly to our statutory Grievance Officer:
          </p>
          <div className="p-5 bg-brand-forest text-brand-ivory rounded-xl space-y-2 text-xs">
            <p><strong className="text-brand-gold">Name:</strong> Mr. Alok Sengupta</p>
            <p><strong className="text-brand-gold">Designation:</strong> Nodal &amp; Grievance Redressal Officer</p>
            <p><strong className="text-brand-gold">Company:</strong> Aaradhya Divine Fragrances Pvt Ltd</p>
            <p><strong className="text-brand-gold">Address:</strong> 108 Sacred Grove, Udyog Vihar, Gurugram, Haryana 122016, India</p>
            <p><strong className="text-brand-gold">Grievance Email:</strong> <a href="mailto:grievances@aaradhyadivinemist.com" className="text-brand-gold-light underline">grievances@aaradhyadivinemist.com</a></p>
            <p><strong className="text-brand-gold">Resolution SLA:</strong> Acknowledgment within 48 hours; full redressal within 30 days from date of receipt.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
