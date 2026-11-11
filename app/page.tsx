import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Star,
  Flame,
  Award,
  Package,
  Heart,
  Instagram,
  Compass,
} from 'lucide-react';
import { getCategories, getProducts, getReviews } from '@/lib/db';
import { ProductCard } from '@/components/shop/ProductCard';

export const revalidate = 0; // Dynamic server rendering for live updates

export default function HomePage() {
  const categories = getCategories();
  const products = getProducts({ status: 'published' });
  const reviews = getReviews(undefined, true);

  // Split featured items
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const giftProducts = products.filter((p) => p.categorySlug === 'gift-collections');

  return (
    <div className="space-y-0">
      {/* =========================================================================
          SECTION 1: HERO (Cinematic, Immersive Spiritual Fragrance)
          ========================================================================= */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center bg-brand-forest overflow-hidden -mt-20 sm:-mt-24 pt-24 pb-16">
        {/* Background Visual Graphic */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-incense.svg"
            alt="Aaradhya Divine Mist - Sacred Incense and Morning Prayer Altar"
            fill
            priority
            className="object-cover object-right md:object-center opacity-85 scale-100 transition-transform duration-1000"
          />
          {/* Subtle gradient vignette to highlight editorial typography */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-forest/95 via-brand-forest/80 to-transparent md:to-brand-forest/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-forest via-transparent to-brand-forest/40" />
        </div>

        {/* Smoke Plume Effect Layer */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 pointer-events-none animate-smoke opacity-40">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            <path
              d="M100 180 C80 140, 140 100, 90 60 C50 20, 130 10, 110 0"
              stroke="#DDE8D5"
              strokeWidth="4"
              strokeLinecap="round"
              filter="blur(4px)"
            />
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20">
          <div className="max-w-2xl lg:max-w-3xl space-y-6 text-brand-ivory">
            {/* Top Sacred Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-forest-dark/80 border border-brand-gold/40 backdrop-blur-md text-brand-gold text-xs tracking-[0.25em] font-sans font-medium uppercase shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
              <span>Way to connect your Aaradhya</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-brand-ivory">
              A Fragrance That Connects You to the{' '}
              <span className="text-brand-gold font-normal italic">Divine.</span>
            </h1>

            {/* Subheading */}
            <p className="font-serif text-lg sm:text-xl lg:text-2xl text-brand-sage/95 leading-relaxed max-w-xl font-normal">
              Discover a beautiful world of fragrance, devotion and timeless Indian traditions with{' '}
              <strong className="text-brand-ivory font-semibold">AARADHYA DIVINE MIST</strong>.
            </p>

            {/* Trust Badges Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-brand-sage/90 pt-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-brand-gold shrink-0" /> 100% Charcoal-Free
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-brand-gold shrink-0" /> Pure Mysore Sandalwood
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-brand-gold shrink-0" /> Pan-India Express Delivery
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2.5 bg-brand-gold text-brand-forest px-8 py-4 rounded font-sans text-xs tracking-[0.22em] font-bold hover:bg-brand-gold-light transition-all shadow-gold transform hover:-translate-y-0.5"
              >
                SHOP COLLECTION <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/our-story"
                className="inline-flex items-center justify-center gap-2 border border-brand-ivory/40 text-brand-ivory px-7 py-4 rounded font-sans text-xs tracking-[0.22em] font-medium hover:bg-white/10 hover:border-brand-ivory transition-all backdrop-blur-sm"
              >
                DISCOVER OUR STORY
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-brand-sage/60 text-[10px] tracking-widest font-sans uppercase">
          <span>Scroll to Explore</span>
          <div className="w-[1px] h-8 bg-brand-gold/40 mt-2 animate-bounce" />
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: BRAND INTRODUCTION
          ========================================================================= */}
      <section className="py-20 md:py-28 bg-brand-ivory border-b border-brand-gold/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <span className="w-12 h-[1px] bg-brand-gold" />
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold-dark font-semibold">
              Sacred Heritage
            </span>
            <span className="w-12 h-[1px] bg-brand-gold" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-forest">
            Welcome to the World of Aaradhya
          </h2>

          <p className="font-serif text-xl sm:text-2xl text-brand-forest/85 italic leading-relaxed max-w-2xl mx-auto">
            &ldquo;Every fragrance creates a moment. Every prayer creates a connection. At AARADHYA DIVINE MIST, we bring together the beauty of fragrance and the timeless spirit of devotion.&rdquo;
          </p>

          <p className="font-sans text-sm sm:text-base text-brand-text-muted leading-relaxed max-w-2xl mx-auto">
            From the tranquil dawn aartis to holy festive celebrations, our charcoal-free incense sticks, pure Mysore chandan, and indigenous Gir cow dhoop are formulated to purify the atmosphere, quiet the restless mind, and invite sacred blessings into your sanctum.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: SHOP BY COLLECTION
          ========================================================================= */}
      <section className="py-20 md:py-28 bg-brand-neutral/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-brand-gold-dark font-semibold">
                Explore Fragrance Families
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest mt-1">
                Shop by Sacred Collection
              </h2>
            </div>
            <Link
              href="/collections"
              className="inline-flex items-center gap-1.5 text-xs font-sans tracking-widest text-brand-forest font-semibold hover:text-brand-gold transition-colors"
            >
              VIEW ALL COLLECTIONS <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 6 Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/collections/${category.slug}`}
                className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-brand-forest shadow-luxury hover:shadow-luxury-lg transition-all duration-500 flex flex-col justify-end p-6 sm:p-8"
              >
                {/* Background Image with Zoom */}
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-forest via-brand-forest/60 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

                {/* Content */}
                <div className="relative z-10 space-y-2 text-brand-ivory">
                  <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-brand-gold font-semibold">
                    Collection
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold group-hover:text-brand-gold transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-brand-sage/90 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs font-sans tracking-wider text-brand-gold font-medium">
                    <span>EXPLORE NOW</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: FEATURED PRODUCTS
          ========================================================================= */}
      <section className="py-20 md:py-28 bg-brand-ivory border-y border-brand-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-brand-gold-dark font-semibold">
              Handpicked Essentials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest">
              Featured Divine Fragrances
            </h2>
            <p className="font-sans text-sm text-brand-text-muted">
              Charcoal-free incense crafted with authentic botanicals, rare floral extracts, and sacred Vedic traditions.
            </p>
          </div>

          {/* 4-Column Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {featuredProducts.map((product) => {
              // Get genuine review ratings if available
              const prodReviews = reviews.filter((r) => r.productId === product.id);
              const avgRating =
                prodReviews.length > 0
                  ? prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length
                  : undefined;

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  rating={avgRating}
                  reviewCount={prodReviews.length > 0 ? prodReviews.length : undefined}
                />
              );
            })}
          </div>

          {/* View All CTA */}
          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-brand-forest text-brand-ivory px-8 py-3.5 rounded text-xs font-sans font-semibold tracking-[0.2em] hover:bg-brand-forest-light transition-all shadow-luxury"
            >
              EXPLORE FULL CATALOG <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: BRAND STORY (Editorial Two-Column)
          ========================================================================= */}
      <section className="py-20 md:py-28 bg-brand-neutral/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual Column */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-brand-forest shadow-luxury-lg border border-brand-gold/25">
              <Image
                src="/images/story/temple-puja.svg"
                alt="Aaradhya Divine Mist Sacred Altar Ritual"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-brand-forest/85 backdrop-blur-md border border-brand-gold/30 text-brand-ivory text-xs">
                <p className="font-serif italic text-brand-gold text-sm">
                  &ldquo;In Sanskrit, Aaradhya signifies that which is worthy of worship and profound reverence.&rdquo;
                </p>
              </div>
            </div>

            {/* Editorial Text Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-brand-gold" />
                <span className="font-sans text-xs uppercase tracking-[0.25em] text-brand-gold-dark font-semibold">
                  Philosophy &amp; Roots
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-forest leading-tight">
                More Than a Fragrance. <br />
                <span className="text-brand-gold font-normal italic">A Divine Experience.</span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-brand-forest/85 leading-relaxed">
                In Indian homes, fragrance is never merely a pleasant aroma—it is an offering of love, a bridge between the seeker and the sacred. When you light an Aaradhya agarbatti, the pure rising smoke carries your deepest prayers toward the divine.
              </p>

              <p className="font-sans text-sm sm:text-base text-brand-text-muted leading-relaxed">
                We observed that most commercial incense sticks flood sacred rooms with acrid charcoal smoke, synthetic chemicals, and synthetic musks. Aaradhya was created to return to pure Vedic sanctity: 100% charcoal-free, dipped in pure temple flower attars, Mysore sandalwood dust, and healing botanical resins.
              </p>

              <div className="pt-2">
                <Link
                  href="/our-story"
                  className="inline-flex items-center gap-2 bg-brand-forest text-brand-ivory px-7 py-3.5 rounded text-xs font-sans tracking-[0.2em] font-semibold hover:bg-brand-forest-light transition-all shadow-luxury"
                >
                  EXPLORE OUR STORY <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: WHY CHOOSE AARADHYA (4 Feature Blocks)
          ========================================================================= */}
      <section className="py-20 md:py-28 bg-brand-ivory border-b border-brand-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-brand-gold-dark font-semibold">
              The Aaradhya Difference
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest">
              Why Choose Aaradhya
            </h2>
            <p className="font-sans text-sm text-brand-text-muted">
              Purity, integrity, and devotional elegance in every single stick.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Block 1 */}
            <div className="p-8 rounded-xl bg-white border border-brand-gold/20 shadow-luxury hover:border-brand-gold transition-all duration-300 space-y-4 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-brand-sage/40 flex items-center justify-center text-brand-forest">
                <Sparkles className="w-7 h-7 text-brand-gold-dark" />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-forest">
                Thoughtfully Selected Fragrances
              </h3>
              <p className="text-xs text-brand-text-muted leading-relaxed font-sans">
                Formulated using pure essential oils from Kannauj Damask rose, Mysore sandalwood, and nocturnal Arabian mogra for authentic spiritual resonance.
              </p>
            </div>

            {/* Block 2 */}
            <div className="p-8 rounded-xl bg-white border border-brand-gold/20 shadow-luxury hover:border-brand-gold transition-all duration-300 space-y-4 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-brand-sage/40 flex items-center justify-center text-brand-forest">
                <ShieldCheck className="w-7 h-7 text-brand-gold-dark" />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-forest">
                Quality-Focused Products
              </h3>
              <p className="text-xs text-brand-text-muted leading-relaxed font-sans">
                100% charcoal-free and sulphur-free. Burns smoothly for 45-50 minutes without releasing harsh black soot or causing nasal irritation.
              </p>
            </div>

            {/* Block 3 */}
            <div className="p-8 rounded-xl bg-white border border-brand-gold/20 shadow-luxury hover:border-brand-gold transition-all duration-300 space-y-4 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-brand-sage/40 flex items-center justify-center text-brand-forest">
                <Package className="w-7 h-7 text-brand-gold-dark" />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-forest">
                Beautiful Premium Packaging
              </h3>
              <p className="text-xs text-brand-text-muted leading-relaxed font-sans">
                Moisture-sealed in elegant gold-embossed ivory casings to preserve fresh fragrance oils and offer a royal gifting experience.
              </p>
            </div>

            {/* Block 4 */}
            <div className="p-8 rounded-xl bg-white border border-brand-gold/20 shadow-luxury hover:border-brand-gold transition-all duration-300 space-y-4 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-brand-sage/40 flex items-center justify-center text-brand-forest">
                <Flame className="w-7 h-7 text-brand-gold-dark" />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-forest">
                Fragrance for Every Occasion
              </h3>
              <p className="text-xs text-brand-text-muted leading-relaxed font-sans">
                From daily morning sandhya vandanam to auspicious Griha Pravesh ceremonies, Diwali pujas, and evening meditation tranquility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: FRAGRANCE EXPERIENCE (Full-Width Cinematic Visual)
          ========================================================================= */}
      <section className="relative py-28 md:py-36 bg-brand-forest overflow-hidden text-brand-ivory text-center">
        <Image
          src="/images/experience/mist-experience.svg"
          alt="Aaradhya Divine Fragrance Experience"
          fill
          className="object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-brand-forest/70 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-forest-dark/80 border border-brand-gold/40 text-brand-gold text-xs tracking-[0.25em] font-sans uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sacred Atmosphere</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Let Every Moment Feel Special
          </h2>

          <p className="font-serif italic text-lg sm:text-2xl text-brand-sage max-w-2xl mx-auto leading-relaxed">
            &ldquo;When fragrance is pure, silence becomes devotion. Fill your sanctuary with the gentle calmness of sacred botanicals.&rdquo;
          </p>

          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-forest px-8 py-4 rounded font-sans text-xs tracking-[0.22em] font-bold hover:bg-brand-gold-light transition-all shadow-gold"
            >
              EXPERIENCE THE MIST <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: GIFT COLLECTION
          ========================================================================= */}
      <section className="py-20 md:py-28 bg-brand-ivory border-b border-brand-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-brand-gold-dark font-semibold">
                Sacred Auspicious Gifting
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-forest leading-tight">
                Gift Divine Blessings &amp; Timeless Elegance
              </h2>
              <p className="font-sans text-sm sm:text-base text-brand-text-muted leading-relaxed">
                Whether inaugurating a new home, blessing a wedding couple, or celebrating Diwali, an offering of sacred fragrance touches the soul. Our royal gift sets feature handcrafted brassware, premium agarbattis, and Vedic havan essentials in velvet-lined ivory boxes.
              </p>

              <div className="space-y-3 pt-2 text-sm text-brand-forest">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-brand-gold" />
                  <span>Curated royal gift boxes in gold-embossed casings</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-brand-gold" />
                  <span>Handcrafted pure brass diya &amp; incense stands included</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-brand-gold" />
                  <span>Complimentary personalized blessing card with every gift kit</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/collections/gift-collections"
                  className="inline-flex items-center gap-2 bg-brand-forest text-brand-ivory px-8 py-4 rounded text-xs font-sans tracking-[0.2em] font-semibold hover:bg-brand-forest-light transition-all shadow-luxury"
                >
                  EXPLORE GIFT COLLECTION <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Gift Showcase Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-brand-forest shadow-luxury-lg border border-brand-gold/30">
              <Image
                src="/images/products/gift-kit.png"
                alt="Aaradhya Divine Mist Royal Pooja Gift Box"
                fill
                className="object-contain p-6"
              />
              <div className="absolute top-4 right-4 bg-brand-gold text-brand-forest text-xs font-bold font-sans px-3 py-1 rounded shadow-md">
                FESTIVE EDITION
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: CUSTOMER REVIEWS (Genuine Verified Devotees)
          ========================================================================= */}
      <section className="py-20 md:py-28 bg-brand-neutral/40 border-b border-brand-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-brand-gold-dark font-semibold">
              Verified Devotees
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest">
              Words of Sacred Gratitude
            </h2>
            <p className="font-sans text-sm text-brand-text-muted">
              Honest experiences from households across India who pray with Aaradhya Divine Mist.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.slice(0, 4).map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl p-6 border border-brand-gold/20 shadow-luxury flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Stars */}
                  <div className="flex text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Review Title */}
                  <h4 className="font-serif text-base font-bold text-brand-forest leading-snug">
                    &ldquo;{review.title}&rdquo;
                  </h4>

                  {/* Comment */}
                  <p className="font-sans text-xs text-brand-forest/80 leading-relaxed">
                    {review.comment}
                  </p>
                </div>

                {/* Devotee Info */}
                <div className="pt-4 mt-4 border-t border-brand-gold/15 flex items-center justify-between text-[11px]">
                  <div>
                    <p className="font-semibold text-brand-forest font-sans">
                      {review.customerName}
                    </p>
                    {review.customerLocation && (
                      <p className="text-stone-400">{review.customerLocation}</p>
                    )}
                  </div>
                  {review.isVerifiedPurchase && (
                    <span className="flex items-center gap-1 text-emerald-800 font-medium">
                      <CheckCircle className="w-3.5 h-3.5" /> Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: INSTAGRAM GALLERY
          ========================================================================= */}
      <section className="py-20 bg-brand-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-brand-gold-dark font-semibold">
                Visual Sanctuary
              </span>
              <h2 className="font-serif text-3xl font-bold text-brand-forest mt-1">
                #AaradhyaDivineMist on Instagram
              </h2>
            </div>
            <a
              href="https://instagram.com/aaradhyadivinemist"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-sans tracking-widest text-brand-forest font-semibold hover:text-brand-gold transition-colors"
            >
              <Instagram className="w-4 h-4 text-brand-gold" /> FOLLOW US @AARADHYADIVINEMIST
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {[
              { img: '/images/products/sandalwood.png', label: 'Sacred Chandan' },
              { img: '/images/products/rose.png', label: 'Damask Rose' },
              { img: '/images/products/dhoop.png', label: 'Vedic Dhoop' },
              { img: '/images/products/gift-kit.png', label: 'Festival Pooja Kit' },
              { img: '/images/products/mogra.png', label: 'Night Mogra' },
              { img: '/images/products/lavender.png', label: 'Kashmiri Lavender' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative aspect-square rounded-lg overflow-hidden bg-brand-neutral border border-brand-gold/20 shadow-sm"
              >
                <Image
                  src={item.img}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-forest/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-brand-ivory p-2 text-center">
                  <Instagram className="w-5 h-5 text-brand-gold mb-1" />
                  <span className="text-[10px] font-sans font-medium">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
