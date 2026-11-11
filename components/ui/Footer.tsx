'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setIsSubscribed(true);
        setEmail('');
      }
    } catch {
      setIsSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-brand-forest text-brand-ivory border-t border-brand-gold/30">
      {/* Upper Brand USP Bar */}
      <div className="border-b border-white/10 py-8 bg-brand-forest-dark/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-semibold text-brand-ivory text-base">
              100% Charcoal-Free
            </h4>
            <p className="text-xs text-brand-sage mt-1">
              Zero toxic black soot for pure devotion
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-semibold text-brand-ivory text-base">
              Authentic Indian Extracts
            </h4>
            <p className="text-xs text-brand-sage mt-1">
              Mysore Chandan &amp; Damask Rose attars
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-semibold text-brand-ivory text-base">
              Pan-India Safe Delivery
            </h4>
            <p className="text-xs text-brand-sage mt-1">
              Dispatched with tamper-proof luxury seals
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-3">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-semibold text-brand-ivory text-base">
              Dedicated Customer Care
            </h4>
            <p className="text-xs text-brand-sage mt-1">
              WhatsApp &amp; Phone support 10am - 7pm IST
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 xl:gap-12">
          {/* Col 1: Brand Info & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="light" size="lg" showTagline={true} />
            <p className="text-sm text-brand-sage leading-relaxed max-w-sm pt-2">
              AARADHYA DIVINE MIST is a premium Indian spiritual fragrance brand dedicated to the sacred art of devotion. We blend pure botanical resins, Mysore sandalwood, and holy temple blossoms into incense that elevates your daily pooja into a divine experience.
            </p>

            {/* Indian Contact Info */}
            <div className="space-y-2 pt-2 text-xs text-brand-sage">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span>+91 98765 43210 / 1800-208-1080 (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span>care@aaradhyadivinemist.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>108 Sacred Grove, Udyog Vihar, Gurugram, Haryana 122016, India</span>
              </div>
            </div>

            {/* WhatsApp Quick Connect Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/919876543210?text=Namaste!%20I%20am%20interested%20in%20Aaradhya%20Divine%20Mist%20fragrances."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-full text-xs font-semibold hover:bg-[#20ba59] transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2: Collections */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-brand-gold tracking-wide mb-4 border-b border-brand-gold/20 pb-2">
              Sacred Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-sage font-sans">
              <li>
                <Link href="/collections/premium-agarbatti" className="hover:text-brand-gold transition-colors">
                  Premium Agarbatti
                </Link>
              </li>
              <li>
                <Link href="/collections/floral-collection" className="hover:text-brand-gold transition-colors">
                  Floral Collection (Rose &amp; Mogra)
                </Link>
              </li>
              <li>
                <Link href="/collections/sandalwood-collection" className="hover:text-brand-gold transition-colors">
                  Sandalwood Collection (Mysore Chandan)
                </Link>
              </li>
              <li>
                <Link href="/collections/daily-pooja-essentials" className="hover:text-brand-gold transition-colors">
                  Daily Pooja Essentials
                </Link>
              </li>
              <li>
                <Link href="/collections/dhoop-collection" className="hover:text-brand-gold transition-colors">
                  Dhoop Collection (Gir Cow Gavyam)
                </Link>
              </li>
              <li>
                <Link href="/collections/gift-collections" className="hover:text-brand-gold transition-colors">
                  Royal Gift Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links & Customer Care */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-brand-gold tracking-wide mb-4 border-b border-brand-gold/20 pb-2">
              Customer Sanctuary
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-sage font-sans">
              <li>
                <Link href="/our-story" className="hover:text-brand-gold transition-colors">
                  Our Sacred Story
                </Link>
              </li>
              <li>
                <Link href="/why-aaradhya" className="hover:text-brand-gold transition-colors">
                  Why Aaradhya Divine Mist
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-brand-gold transition-colors">
                  Track Your Sacred Parcel
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-brand-gold transition-colors">
                  My Devotee Account
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-gold transition-colors">
                  Contact Us &amp; Bulk Pooja Orders
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-brand-gold hover:underline">
                  Admin Dashboard Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-brand-gold tracking-wide mb-4 border-b border-brand-gold/20 pb-2">
              A Little Fragrance in Your Inbox
            </h4>
            <p className="text-xs text-brand-sage mb-4 leading-relaxed">
              Receive auspicious Vedic calendar notifications, festival pooja guides, and exclusive divine offerings.
            </p>

            {isSubscribed ? (
              <div className="flex items-center gap-2 p-3 bg-brand-forest-light border border-brand-gold/40 rounded text-xs text-brand-ivory">
                <CheckCircle className="w-4 h-4 text-brand-gold" />
                <span>Blessings! You are subscribed to Aaradhya.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-white/10 border border-brand-gold/30 rounded px-3 py-2.5 text-xs text-brand-ivory placeholder:text-brand-sage/60 focus:outline-none focus:border-brand-gold"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-gold text-brand-forest py-2.5 px-4 rounded text-xs font-semibold tracking-wider hover:bg-brand-gold-light transition-all flex items-center justify-center gap-1.5"
                >
                  {loading ? 'SUBSCRIBING...' : 'RECEIVE BLESSINGS'} <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <p className="text-[10px] text-brand-sage/70 pt-1">
                  We respect your sacred inbox. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Indian Compliance & Mandatory Legal Metrology Info */}
        <div className="mt-12 pt-8 border-t border-brand-gold/15 grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] text-brand-sage">
          <div>
            <p className="font-semibold text-brand-gold mb-1">
              Indian Consumer Protection (E-Commerce) Rules &amp; Legal Metrology:
            </p>
            <p className="leading-relaxed">
              Manufactured &amp; Packed by: Aaradhya Divine Fragrances Pvt Ltd. Country of Origin: India. All product prices are in INR (₹) and inclusive of all applicable GST taxes. Net quantity, MRP, batch number, and best before date are declared on every individual package.
            </p>
          </div>
          <div>
            <p className="font-semibold text-brand-gold mb-1">
              Grievance Redressal &amp; Nodal Officer:
            </p>
            <p className="leading-relaxed">
              In accordance with Information Technology Act, 2000 and Consumer Protection Rules: Grievance Officer: Mr. Alok Sengupta, Email: grievances@aaradhyadivinemist.com. Response within 48 hours; resolution within 30 days.
            </p>
          </div>
        </div>

        {/* Policies and Copyright */}
        <div className="mt-8 pt-6 border-t border-brand-gold/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-sage">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/policy/privacy" className="hover:text-brand-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/policy/terms" className="hover:text-brand-gold transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/policy/shipping" className="hover:text-brand-gold transition-colors">
              Shipping &amp; Delivery Policy
            </Link>
            <Link href="/policy/returns" className="hover:text-brand-gold transition-colors">
              Returns &amp; Refund Policy
            </Link>
            <Link href="/policy/grievance" className="hover:text-brand-gold transition-colors">
              Grievance Redressal
            </Link>
          </div>
          <div className="text-center md:text-right text-[11px] text-brand-sage/80">
            © {new Date().getFullYear()} AARADHYA DIVINE MIST. All rights reserved. Handcrafted with devotion in India.
          </div>
        </div>
      </div>
    </footer>
  );
};
