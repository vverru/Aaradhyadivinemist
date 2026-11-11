import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { getCategoryBySlug, getProducts, getCategories } from '@/lib/db';
import { ProductCard } from '@/components/shop/ProductCard';

interface PageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  const categories = getCategories();
  return categories.map((c) => ({
    category: c.slug,
  }));
}

export default function CategoryDetailPage({ params }: PageProps) {
  const category = getCategoryBySlug(params.category);
  if (!category) {
    notFound();
  }

  const products = getProducts({
    category: category.slug,
    status: 'published',
  });

  return (
    <div className="bg-brand-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <nav className="text-xs font-sans text-brand-text-muted mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-brand-forest">
              Home
            </Link>
            <span>/</span>
            <Link href="/collections" className="hover:text-brand-forest">
              Collections
            </Link>
            <span>/</span>
            <span className="text-brand-gold-dark font-semibold">{category.name}</span>
          </nav>

          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-xs font-sans text-brand-forest hover:text-brand-gold font-medium mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Collections
          </Link>

          <div className="border-b border-brand-gold/20 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-sage/40 text-brand-forest text-xs font-sans uppercase tracking-widest mb-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span>Sacred Collection</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-forest">
                {category.name}
              </h1>
              <p className="font-sans text-sm text-brand-text-muted mt-2 max-w-2xl leading-relaxed">
                {category.description}
              </p>
            </div>

            <span className="text-xs font-sans text-brand-forest font-semibold bg-brand-sage/40 px-3.5 py-1.5 rounded-full shrink-0">
              {products.length} {products.length === 1 ? 'Product' : 'Products'} Available
            </span>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-xl border border-brand-gold/20 p-12 text-center space-y-4">
            <h3 className="font-serif text-2xl font-bold text-brand-forest">
              New Releases Arriving Shortly
            </h3>
            <p className="text-xs text-brand-text-muted max-w-sm mx-auto">
              Our craftsmen are dipping new batches of {category.name} in sacred essential oils.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-brand-forest text-brand-ivory px-6 py-2.5 rounded text-xs tracking-widest font-sans font-semibold hover:bg-brand-forest-light"
            >
              EXPLORE OTHER COLLECTIONS
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
