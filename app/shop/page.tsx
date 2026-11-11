'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Filter,
  SlidersHorizontal,
  X,
  Search,
  Sparkles,
  RotateCcw,
  ChevronDown,
} from 'lucide-react';
import { Product, Category } from '@/types';
import { ProductCard } from '@/components/shop/ProductCard';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedFragrance, setSelectedFragrance] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(2000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  // Sync from URL params
  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
    if (initialSearch) setSearchQuery(initialSearch);
  }, [initialCategory, initialSearch]);

  // Fetch products and categories from local API
  useEffect(() => {
    async function loadData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch('/api/products?status=published'),
          fetch('/api/categories'),
        ]);
        const prodData = await prodRes.json();
        const catData = await catRes.json();
        if (prodData.products) setProducts(prodData.products);
        if (catData.categories) setCategories(catData.categories);
      } catch (err) {
        console.error('Failed to load shop products', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Distinct fragrance notes across catalog
  const allFragrances = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      p.fragranceNotes?.forEach((n) => set.add(n));
    });
    return Array.from(set);
  }, [products]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.categorySlug === selectedCategory);
    }

    // Fragrance filter
    if (selectedFragrance !== 'all') {
      result = result.filter((p) =>
        p.fragranceNotes?.some((n) => n.toLowerCase().includes(selectedFragrance.toLowerCase()))
      );
    }

    // Price filter
    result = result.filter((p) => p.price <= priceRange);

    // Availability filter
    if (onlyInStock) {
      result = result.filter((p) => p.stock > 0);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fragranceNotes?.some((n) => n.toLowerCase().includes(q))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popularity':
      default:
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
    }

    return result;
  }, [products, selectedCategory, selectedFragrance, priceRange, onlyInStock, searchQuery, sortBy]);

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedFragrance !== 'all' ? 1 : 0) +
    (priceRange < 2000 ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedFragrance('all');
    setPriceRange(2000);
    setOnlyInStock(false);
    setSearchQuery('');
    setSortBy('popularity');
  };

  return (
    <div className="bg-brand-ivory min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="border-b border-brand-gold/20 pb-8 mb-8">
          <nav className="text-xs font-sans text-brand-text-muted mb-3 flex items-center gap-2">
            <Link href="/" className="hover:text-brand-forest">
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-gold-dark font-medium">Sacred Shop</span>
            {selectedCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="capitalize text-brand-forest font-semibold">
                  {selectedCategory.replace(/-/g, ' ')}
                </span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-forest">
                Spiritual Fragrances &amp; Pooja Essentials
              </h1>
              <p className="font-sans text-sm text-brand-text-muted mt-2 max-w-2xl">
                100% charcoal-free agarbatti, authentic Mysore sandalwood, pure cow dung dhoop, and royal festive gift collections.
              </p>
            </div>

            {/* Total Results Count */}
            <span className="text-xs font-sans text-brand-forest font-semibold bg-brand-sage/40 px-3.5 py-1.5 rounded-full shrink-0">
              Showing {filteredProducts.length} of {products.length} Sacred Products
            </span>
          </div>
        </div>

        {/* Search, Filter Bar & Sort Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by scent, name, or occasion..."
              className="w-full bg-white border border-brand-gold/30 rounded-lg pl-10 pr-4 py-2 text-xs sm:text-sm text-brand-forest placeholder:text-stone-400 focus:outline-none focus:border-brand-gold"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-brand-gold/30 rounded-lg text-xs font-sans font-semibold text-brand-forest"
            >
              <Filter className="w-4 h-4" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white border border-brand-gold/30 rounded-lg px-3 py-1.5 text-xs text-brand-forest font-sans">
              <span className="text-stone-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-semibold focus:outline-none cursor-pointer"
              >
                <option value="popularity">Bestsellers &amp; Popularity</option>
                <option value="newest">New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Pill Bar */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8 bg-brand-sage/20 p-3 rounded-lg border border-brand-gold/20">
            <span className="text-xs text-brand-forest font-medium mr-1">Active Filters:</span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-white border border-brand-gold/30 text-brand-forest text-xs px-2.5 py-1 rounded-full">
                Category: {selectedCategory.replace(/-/g, ' ')}
                <button onClick={() => setSelectedCategory('all')}>
                  <X className="w-3 h-3 text-stone-400 hover:text-stone-700" />
                </button>
              </span>
            )}
            {selectedFragrance !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-white border border-brand-gold/30 text-brand-forest text-xs px-2.5 py-1 rounded-full">
                Scent: {selectedFragrance}
                <button onClick={() => setSelectedFragrance('all')}>
                  <X className="w-3 h-3 text-stone-400 hover:text-stone-700" />
                </button>
              </span>
            )}
            {priceRange < 2000 && (
              <span className="inline-flex items-center gap-1 bg-white border border-brand-gold/30 text-brand-forest text-xs px-2.5 py-1 rounded-full">
                Under ₹{priceRange}
                <button onClick={() => setPriceRange(2000)}>
                  <X className="w-3 h-3 text-stone-400 hover:text-stone-700" />
                </button>
              </span>
            )}
            {onlyInStock && (
              <span className="inline-flex items-center gap-1 bg-white border border-brand-gold/30 text-brand-forest text-xs px-2.5 py-1 rounded-full">
                In Stock Only
                <button onClick={() => setOnlyInStock(false)}>
                  <X className="w-3 h-3 text-stone-400 hover:text-stone-700" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-white border border-brand-gold/30 text-brand-forest text-xs px-2.5 py-1 rounded-full">
                Query: &ldquo;{searchQuery}&rdquo;
                <button onClick={() => setSearchQuery('')}>
                  <X className="w-3 h-3 text-stone-400 hover:text-stone-700" />
                </button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-xs text-brand-gold-dark hover:underline font-semibold ml-auto flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Clear All
            </button>
          </div>
        )}

        {/* Main Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block space-y-6">
            {/* Category Filter */}
            <div className="bg-white p-6 rounded-xl border border-brand-gold/20 shadow-sm space-y-3">
              <h3 className="font-serif text-lg font-bold text-brand-forest border-b border-brand-gold/15 pb-2">
                Collections
              </h3>
              <ul className="space-y-2 text-xs font-sans">
                <li>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left py-1 px-2 rounded transition-colors flex items-center justify-between ${
                      selectedCategory === 'all'
                        ? 'bg-brand-sage text-brand-forest font-bold'
                        : 'text-brand-text-muted hover:text-brand-forest'
                    }`}
                  >
                    <span>All Collections</span>
                    <span>{products.length}</span>
                  </button>
                </li>
                {categories.map((c) => {
                  const count = products.filter((p) => p.categorySlug === c.slug).length;
                  return (
                    <li key={c.id}>
                      <button
                        onClick={() => setSelectedCategory(c.slug)}
                        className={`w-full text-left py-1 px-2 rounded transition-colors flex items-center justify-between ${
                          selectedCategory === c.slug
                            ? 'bg-brand-sage text-brand-forest font-bold'
                            : 'text-brand-text-muted hover:text-brand-forest'
                        }`}
                      >
                        <span className="truncate pr-2">{c.name}</span>
                        <span>{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Price Filter */}
            <div className="bg-white p-6 rounded-xl border border-brand-gold/20 shadow-sm space-y-3">
              <div className="flex justify-between items-center border-b border-brand-gold/15 pb-2">
                <h3 className="font-serif text-lg font-bold text-brand-forest">
                  Max Price
                </h3>
                <span className="text-xs font-bold text-brand-forest font-sans">
                  ₹{priceRange}
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="2000"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-brand-gold cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400 font-sans">
                <span>₹200</span>
                <span>₹2,000+</span>
              </div>
            </div>

            {/* Fragrance Accords Filter */}
            {allFragrances.length > 0 && (
              <div className="bg-white p-6 rounded-xl border border-brand-gold/20 shadow-sm space-y-3">
                <h3 className="font-serif text-lg font-bold text-brand-forest border-b border-brand-gold/15 pb-2">
                  Fragrance Notes
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedFragrance('all')}
                    className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                      selectedFragrance === 'all'
                        ? 'bg-brand-forest text-brand-ivory font-semibold'
                        : 'bg-brand-neutral text-brand-forest hover:bg-brand-sage/50'
                    }`}
                  >
                    All Notes
                  </button>
                  {allFragrances.map((f, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedFragrance(f)}
                      className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                        selectedFragrance === f
                          ? 'bg-brand-forest text-brand-ivory font-semibold'
                          : 'bg-brand-neutral text-brand-forest hover:bg-brand-sage/50'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Availability Toggle */}
            <div className="bg-white p-6 rounded-xl border border-brand-gold/20 shadow-sm">
              <label className="flex items-center gap-3 cursor-pointer text-xs font-sans font-medium text-brand-forest">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-brand-forest focus:ring-brand-gold accent-brand-forest w-4 h-4 cursor-pointer"
                />
                <span>In-Stock Items Only</span>
              </label>
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-white/70 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              /* Attractive Empty State */
              <div className="bg-white rounded-xl border border-brand-gold/20 p-12 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-brand-sage/40 mx-auto flex items-center justify-center text-brand-forest">
                  <Search className="w-8 h-8 text-brand-gold" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-brand-forest">
                  No Fragrances Match Your Filters
                </h3>
                <p className="font-sans text-xs sm:text-sm text-brand-text-muted max-w-md mx-auto">
                  Try clearing some filter criteria, adjusting your price limit, or searching for alternative scents such as Sandalwood, Rose, or Dhoop.
                </p>
                <div className="pt-2">
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 bg-brand-forest text-brand-ivory px-6 py-2.5 rounded text-xs font-sans tracking-widest font-semibold hover:bg-brand-forest-light transition-all"
                  >
                    RESET ALL FILTERS
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer Filter Dialog */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-brand-ivory shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-brand-gold/20 pb-4">
                  <h3 className="font-serif text-xl font-bold text-brand-forest">
                    Filter Fragrances
                  </h3>
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="p-1 text-stone-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="text-xs uppercase font-sans font-bold text-brand-forest mb-2">
                    Collection
                  </h4>
                  <div className="space-y-1 text-xs">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`block w-full text-left py-1.5 px-2 rounded ${
                        selectedCategory === 'all' ? 'bg-brand-sage font-bold' : ''
                      }`}
                    >
                      All Collections
                    </button>
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategory(c.slug)}
                        className={`block w-full text-left py-1.5 px-2 rounded ${
                          selectedCategory === c.slug ? 'bg-brand-sage font-bold' : ''
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-brand-forest mb-2">
                    <span>Max Price:</span>
                    <span>₹{priceRange}</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="2000"
                    step="50"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-brand-gold"
                  />
                </div>

                {/* Availability */}
                <label className="flex items-center gap-2 text-xs font-semibold text-brand-forest">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="accent-brand-forest w-4 h-4"
                  />
                  <span>In-Stock Only</span>
                </label>
              </div>

              <div className="pt-6 border-t border-brand-gold/20 flex gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-2.5 border border-brand-gold/40 rounded text-xs font-sans font-semibold text-brand-forest"
                >
                  RESET
                </button>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="flex-1 py-2.5 bg-brand-forest text-brand-ivory rounded text-xs font-sans font-semibold"
                >
                  APPLY FILTERS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-ivory flex items-center justify-center font-serif text-brand-forest">Loading sacred catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
