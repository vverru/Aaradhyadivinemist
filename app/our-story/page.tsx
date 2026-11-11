import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, Heart, Award, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Our Sacred Story | AARADHYA DIVINE MIST',
  description: 'Discover the roots of AARADHYA DIVINE MIST. Handcrafting 100% charcoal-free incense with pure Mysore sandalwood, temple flowers, and sacred Vedic traditions.',
};

export default function OurStoryPage() {
  return (
    <div className="bg-brand-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-sage/40 text-brand-forest text-xs font-sans uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Spiritual Roots &amp; Heritage</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-brand-forest">
            More Than a Fragrance. <br />
            <span className="text-brand-gold italic font-normal">A Divine Experience.</span>
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-brand-forest/80 max-w-xl mx-auto leading-relaxed">
            &ldquo;In every prayer, an intention. In every fragrance, a sacred bridge to the divine.&rdquo;
          </p>
        </div>

        {/* Hero Visual */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-brand-forest shadow-luxury-lg border border-brand-gold/25">
          <Image
            src="/images/story/temple-puja.svg"
            alt="Sacred Indian Puja Altar"
            fill
            className="object-cover"
          />
        </div>

        {/* Story Paragraphs */}
        <div className="space-y-8 font-sans text-sm sm:text-base text-brand-forest/90 leading-relaxed max-w-3xl mx-auto">
          <section className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest">
              The Sacred Inception
            </h2>
            <p>
              The journey of <strong>AARADHYA DIVINE MIST</strong> began inside a peaceful Indian prayer sanctuary. Watching a mother light morning incense for the family deity, we observed a troubling reality: most commercial agarbattis available across India released thick black smoke, chemical soot, and harsh synthetic perfumes that irritated the eyes and caused respiratory discomfort.
            </p>
            <p>
              In our sacred tradition, fragrance is not intended to mask odors; it is a sacred offering (<em>Gandham</em>) to the Almighty, designed to purify space and attune the human mind toward peace and contemplation. How could an offering to the Divine be made with cheap charcoal and petroleum chemicals?
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest">
              Returning to Sacred Purity
            </h2>
            <p>
              We resolved to change this standard. Working closely with master traditional perfume distillers in Kannauj and sandalwood artisans in Mysore, we revived authentic ancient Vedic formulations:
            </p>
            <ul className="space-y-2 list-disc list-inside pl-2 text-stone-700">
              <li><strong>100% Charcoal-Free:</strong> Eliminating black toxic soot and throat irritation.</li>
              <li><strong>Temple Floral Offerings:</strong> Upcycling holy rose petals and marigolds into fragrant attars.</li>
              <li><strong>Mysore Chandan:</strong> Ground with natural tree barks and therapeutic botanical gums.</li>
              <li><strong>Indigenous Desi Cow Gavyam:</strong> Purifying homes naturally with loban, sambrani, and guggul.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest">
              What &ldquo;Aaradhya&rdquo; Means to Us
            </h2>
            <p>
              In Sanskrit, <em>Aaradhya</em> signifies that which is worthy of the highest worship, love, and sacred devotion. Our motto—<strong>&ldquo;Way to connect your Aaradhya&rdquo;</strong>—is a solemn promise that every single stick you light in your home honors the purity of your devotion.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-brand-gold/20">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-brand-forest text-brand-ivory px-8 py-3.5 rounded text-xs font-sans tracking-[0.2em] font-semibold hover:bg-brand-forest-light transition-all shadow-luxury"
          >
            DISCOVER OUR SACRED SCENTS <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
