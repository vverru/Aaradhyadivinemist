import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Flame, Award, Heart, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Why Aaradhya | AARADHYA DIVINE MIST',
  description: 'Learn why Indian households choose Aaradhya Divine Mist: 100% charcoal-free, non-toxic smoke, genuine essential oils, and sacred Vedic formulations.',
};

export default function WhyAaradhyaPage() {
  return (
    <div className="bg-brand-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-sage/40 text-brand-forest text-xs font-sans uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>The Purity Standard</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-brand-forest">
            Why Aaradhya Divine Mist?
          </h1>
          <p className="font-sans text-sm sm:text-base text-brand-text-muted max-w-xl mx-auto leading-relaxed">
            Discover the 4 sacred pillars that elevate our spiritual incense into a truly divine experience.
          </p>
        </div>

        {/* 4 Pillars Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-brand-gold/25 shadow-luxury space-y-4">
            <div className="w-12 h-12 rounded-full bg-brand-sage/40 flex items-center justify-center text-brand-forest">
              <ShieldCheck className="w-6 h-6 text-brand-gold-dark" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brand-forest">
              1. 100% Charcoal-Free Formulation
            </h3>
            <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed font-sans">
              Unlike generic commercial agarbatti rolled in powdered coal, Aaradhya sticks are crafted from pure wood powder, plant gums, and flower petals. They produce a smooth, delicate aromatic mist that never causes coughing or headaches.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-brand-gold/25 shadow-luxury space-y-4">
            <div className="w-12 h-12 rounded-full bg-brand-sage/40 flex items-center justify-center text-brand-forest">
              <Award className="w-6 h-6 text-brand-gold-dark" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brand-forest">
              2. Authentic Essential Oils
            </h3>
            <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed font-sans">
              We never use cheap synthetic chemical fragrances or hazardous phthalates. Every batch is dipped in therapeutic extracts including Kannauj Damask rose, authentic Mysore chandan dust, and pure Kashmiri lavender.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-brand-gold/25 shadow-luxury space-y-4">
            <div className="w-12 h-12 rounded-full bg-brand-sage/40 flex items-center justify-center text-brand-forest">
              <Flame className="w-6 h-6 text-brand-gold-dark" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brand-forest">
              3. Sacred Vedic Cleansing
            </h3>
            <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed font-sans">
              Our dhoop sticks incorporate indigenous Gir cow dung, gum benzoin (loban), and guggul. In Vedic havan sciences, these sacred resins naturally neutralize negative energies and create a sanctuary of peaceful spiritual vibrations.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-brand-gold/25 shadow-luxury space-y-4">
            <div className="w-12 h-12 rounded-full bg-brand-sage/40 flex items-center justify-center text-brand-forest">
              <Heart className="w-6 h-6 text-brand-gold-dark" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brand-forest">
              4. Royal Moisture-Locked Packaging
            </h3>
            <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed font-sans">
              Aaradhya packaging is engineered in thick gold-embossed ivory casings with airtight foil liners. This ensures your sacred sticks retain their potent aroma from the moment they are rolled in our workshop until they are lit on your altar.
            </p>
          </div>
        </div>

        <div className="text-center pt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-brand-forest text-brand-ivory px-8 py-3.5 rounded text-xs font-sans tracking-[0.2em] font-semibold hover:bg-brand-forest-light transition-all shadow-luxury"
          >
            EXPERIENCE THE PURITY <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
