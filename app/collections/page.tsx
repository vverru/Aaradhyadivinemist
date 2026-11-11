import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getCategories } from '@/lib/db';

export const metadata = {
  title: 'Sacred Collections | AARADHYA DIVINE MIST',
  description: 'Explore our 6 divine fragrance collections: Premium Agarbatti, Floral Incense, Mysore Sandalwood, Daily Pooja Essentials, Pure Cow Dung Dhoop, and Royal Gift Sets.',
};

export default function CollectionsPage() {
  const categories = getCategories();

  return (
    <div className="bg-brand-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <nav className="text-xs font-sans text-brand-text-muted mb-2 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-brand-forest">
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-gold-dark font-medium">Collections</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-sage/40 text-brand-forest text-xs font-sans uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Divine Fragrance Families</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-forest">
            Explore by Sacred Collection
          </h1>
          <p className="font-sans text-sm text-brand-text-muted leading-relaxed">
            Each collection is thoughtfully created according to sacred Vedic principles, using pure natural resins, temple flower attars, and organic bamboo-free formulations.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/collections/${c.slug}`}
              className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-brand-forest shadow-luxury hover:shadow-luxury-lg transition-all duration-500 flex flex-col justify-end p-8"
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-forest via-brand-forest/60 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

              <div className="relative z-10 space-y-2 text-brand-ivory">
                <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-brand-gold font-semibold">
                  Handcrafted Series
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold group-hover:text-brand-gold transition-colors">
                  {c.name}
                </h2>
                <p className="text-xs text-brand-sage leading-relaxed line-clamp-3">
                  {c.description}
                </p>
                <div className="pt-3 flex items-center gap-2 text-xs font-sans tracking-widest text-brand-gold font-semibold">
                  <span>VIEW PRODUCTS</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
