'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-brand-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-sage/40 text-brand-forest text-xs font-sans uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Devotee Support &amp; Sanctuary</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-forest">
            Connect With Aaradhya
          </h1>
          <p className="font-sans text-xs sm:text-sm text-brand-text-muted">
            Have questions about sacred ingredients, bulk festival pooja orders, or delivery tracking? We are here to serve you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Contact Details */}
          <div className="bg-brand-forest text-brand-ivory rounded-2xl p-8 shadow-luxury-lg space-y-6">
            <h3 className="font-serif text-2xl font-bold text-brand-gold">
              Customer Sanctuary
            </h3>
            <p className="text-xs text-brand-sage leading-relaxed font-sans">
              Reach our devotional care executives for recommendations, temple supply queries, or order assistance.
            </p>

            <div className="space-y-4 text-xs font-sans pt-2">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-brand-ivory">Phone Support</span>
                  <span className="text-brand-sage">+91 98765 43210</span>
                  <span className="text-stone-400 block text-[11px]">Toll-Free: 1800-208-1080</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-brand-ivory">Email Sanctuary</span>
                  <span className="text-brand-sage">care@aaradhyadivinemist.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-brand-ivory">Service Timings</span>
                  <span className="text-brand-sage">Monday to Saturday: 10:00 AM – 7:00 PM IST</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-brand-ivory">Corporate Office</span>
                  <span className="text-brand-sage">
                    Aaradhya Divine Fragrances Pvt Ltd<br />
                    108 Sacred Grove, Udyog Vihar, Gurugram, Haryana 122016, India
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-gold/20">
              <a
                href="https://wa.me/919876543210?text=Namaste!%20I%20have%20an%20inquiry%20regarding%20Aaradhya%20Divine%20Mist."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366] text-white rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-2 hover:bg-[#20ba59] transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Support</span>
              </a>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-brand-gold/25 p-8 shadow-luxury space-y-6">
            <h3 className="font-serif text-2xl font-bold text-brand-forest">
              Send a Sacred Message
            </h3>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-700 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-emerald-950">
                  Message Received with Gratitude
                </h4>
                <p className="text-xs text-emerald-900 font-sans max-w-sm mx-auto">
                  Thank you, {name}. Our customer sanctuary team will review your inquiry and reply within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-brand-forest mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anand Joshi"
                      className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-brand-forest mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. anand@gmail.com"
                      className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-brand-forest mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-brand-forest mb-1">
                      Subject *
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold bg-white"
                    >
                      <option value="Product Inquiry">Product &amp; Scent Inquiry</option>
                      <option value="Bulk Pooja Orders">Bulk / Festival / Wedding Pooja Orders</option>
                      <option value="Shipping & Tracking">Shipping &amp; Order Status</option>
                      <option value="Feedback">Devotee Feedback &amp; Gratitude</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-brand-forest mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How may we assist your sacred spiritual journey?..."
                    className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3 bg-brand-forest text-brand-ivory text-xs font-semibold tracking-widest rounded-lg hover:bg-brand-forest-light transition-all shadow-md flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" /> SEND MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
