'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Heart,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  Star,
  ShieldCheck,
  Truck,
  Sparkles,
  MapPin,
  Clock,
  Flame,
  RotateCcw,
  AlertCircle,
  Award,
  ChevronRight,
  ChevronLeft,
  Send,
} from 'lucide-react';
import { Product, Review } from '@/types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { ProductCard } from './ProductCard';

interface ProductDetailViewProps {
  product: Product;
  initialReviews: Review[];
  relatedProducts: Product[];
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  initialReviews,
  relatedProducts,
}) => {
  const router = useRouter();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  // Purchase state
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // PIN code checker state
  const [pincode, setPincode] = useState('');
  const [checkingPincode, setCheckingPincode] = useState(false);
  const [pincodeResult, setPincodeResult] = useState<{
    checked: boolean;
    serviceable: boolean;
    message?: string;
    city?: string;
    deliveryDays?: string;
  } | null>(null);

  // Tabs state
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'instructions' | 'shipping' | 'reviews'>('desc');

  // Review submission state
  const [reviewsList, setReviewsList] = useState<Review[]>(initialReviews);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const images = product.images.length > 0 ? product.images : ['/images/products/sandalwood.png'];
  const discountPercent =
    product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  const inWishlist = isInWishlist(product.id);

  // Genuine review averages
  const avgRating =
    reviewsList.length > 0
      ? reviewsList.reduce((sum, r) => sum + r.rating, 0) / reviewsList.length
      : 0;

  // Image mouse move for zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product, quantity);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    router.push('/checkout');
  };

  const checkPincodeService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) {
      setPincodeResult({
        checked: true,
        serviceable: false,
        message: 'Please enter a valid 6-digit Indian PIN code.',
      });
      return;
    }

    setCheckingPincode(true);
    try {
      const res = await fetch(`/api/shipping/pincode?pincode=${pincode.trim()}`);
      const data = await res.json();
      if (data.serviceable) {
        setPincodeResult({
          checked: true,
          serviceable: true,
          city: `${data.city}, ${data.state}`,
          deliveryDays: data.deliveryDays,
        });
      } else {
        setPincodeResult({
          checked: true,
          serviceable: false,
          message: 'Currently unable to verify delivery to this PIN code.',
        });
      }
    } catch {
      setPincodeResult({
        checked: true,
        serviceable: true,
        city: 'All India Serviceable',
        deliveryDays: '3-4 Business Days',
      });
    } finally {
      setCheckingPincode(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    setSubmittingReview(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          customerName: newReviewName.trim(),
          rating: newReviewRating,
          title: newReviewTitle.trim() || 'Sacred Fragrance Experience',
          comment: newReviewComment.trim(),
        }),
      });

      if (res.ok) {
        setReviewSubmitted(true);
        showToast('Thank you! Your verified review has been submitted for moderation.', 'success');
        setNewReviewName('');
        setNewReviewTitle('');
        setNewReviewComment('');
      }
    } catch {
      showToast('Error submitting review. Please try again.', 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="bg-brand-ivory min-h-screen py-8 sm:py-12 lg:py-16 pb-28 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs font-sans text-brand-text-muted mb-6 sm:mb-8 flex flex-wrap items-center gap-2">
          <Link href="/" className="hover:text-brand-forest">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-brand-forest">
            Sacred Shop
          </Link>
          <span>/</span>
          <Link
            href={`/collections/${product.categorySlug}`}
            className="hover:text-brand-forest capitalize"
          >
            {product.categoryName}
          </Link>
          <span>/</span>
          <span className="text-brand-gold-dark font-medium line-clamp-1">
            {product.name}
          </span>
        </nav>

        {/* Product Showcase: Left Gallery & Right Details (Tablet: 2 columns, Mobile: 1 column, Desktop: 2 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-start">
          {/* =========================================================================
              LEFT: IMAGE GALLERY & ZOOM
              ========================================================================= */}
          <div className="space-y-4">
            {/* Main Stage Image with Zoom Preview & Touch Navigation */}
            <div
              className="relative aspect-square w-full bg-white rounded-2xl border border-brand-gold/25 overflow-hidden shadow-luxury cursor-crosshair group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={images[activeImageIndex] || '/images/products/sandalwood.png'}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-contain p-4 sm:p-6 transition-transform duration-200 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }
                    : undefined
                }
              />

              {/* Floating Badges */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                {discountPercent > 0 && (
                  <span className="bg-brand-forest text-brand-gold text-[10px] sm:text-xs font-bold font-sans tracking-wider px-2.5 sm:px-3 py-1 rounded shadow-sm">
                    SAVE {discountPercent}%
                  </span>
                )}
                {product.isBestseller && (
                  <span className="bg-brand-gold text-brand-forest text-[10px] sm:text-xs font-bold font-sans tracking-wider px-2.5 sm:px-3 py-1 rounded shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> BESTSELLER
                  </span>
                )}
              </div>

              {/* Floating Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-3 right-3 sm:top-4 sm:right-4 p-2.5 sm:p-3 rounded-full backdrop-blur-md transition-all shadow-md z-10 ${
                  inWishlist
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : 'bg-white/85 text-brand-forest hover:bg-white hover:text-brand-gold border border-brand-gold/20'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${inWishlist ? 'fill-rose-600' : ''}`} />
              </button>

              {/* Touch & Click Image Navigation Chevrons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                    }}
                    className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 text-brand-forest hover:bg-white shadow-md flex items-center justify-center transition-all z-10 active:scale-90"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 text-brand-forest hover:bg-white shadow-md flex items-center justify-center transition-all z-10 active:scale-90"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </>
              )}

              {/* Mobile Image Counter Indicator */}
              {images.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-brand-forest/80 text-brand-gold text-[10px] sm:text-xs font-sans font-medium px-2.5 py-0.5 rounded-full backdrop-blur-sm pointer-events-none z-10">
                  {activeImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Navigation with Touch Scrolling */}
            {images.length > 1 && (
              <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-white border-2 transition-all shrink-0 snap-start active:scale-95 ${
                      activeImageIndex === idx
                        ? 'border-brand-gold shadow-md'
                        : 'border-brand-gold/20 hover:border-brand-gold/60 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      className="object-contain p-1.5 sm:p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* =========================================================================
              RIGHT: DETAILS, PRICING, PINCODE CHECKER, ADD TO CART & BUY NOW
              ========================================================================= */}
          <div className="space-y-6">
            <div>
              {/* Category */}
              <Link
                href={`/collections/${product.categorySlug}`}
                className="text-xs uppercase font-sans tracking-[0.25em] text-brand-gold-dark font-semibold hover:underline"
              >
                {product.categoryName}
              </Link>

              {/* Product Title */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest mt-1.5 leading-tight">
                {product.name}
              </h1>

              {/* Tagline */}
              {product.tagline && (
                <p className="font-serif italic text-base sm:text-lg text-brand-text-muted mt-2">
                  &ldquo;{product.tagline}&rdquo;
                </p>
              )}

              {/* Rating (Section 4: Only when genuine reviews exist) */}
              {reviewsList.length > 0 && (
                <div className="flex items-center gap-2 mt-3 text-xs">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(avgRating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-brand-forest">
                    {avgRating.toFixed(1)}
                  </span>
                  <span className="text-stone-400">
                    ({reviewsList.length} verified devotee {reviewsList.length === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              )}
            </div>

            {/* Price Showcase */}
            <div className="p-4 rounded-xl bg-white border border-brand-gold/20 shadow-sm space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-bold text-brand-forest font-sans">
                  ₹{product.price}
                </span>
                {product.mrp > product.price && (
                  <span className="text-base sm:text-lg text-stone-400 line-through font-sans">
                    MRP: ₹{product.mrp}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs bg-brand-forest text-brand-gold font-sans font-bold px-2.5 py-1 rounded">
                    SAVE ₹{product.mrp - product.price} ({discountPercent}% OFF)
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500">
                Inclusive of all applicable Indian taxes (GST) • Free Pan-India Delivery on orders above ₹799
              </p>
            </div>

            {/* Pack Size & Key Fragrance Notes */}
            <div className="space-y-3">
              <div>
                <span className="text-xs font-semibold text-brand-forest block mb-1.5 font-sans">
                  Selected Quantity / Pack Size:
                </span>
                <div className="inline-block px-4 py-2 rounded-lg bg-brand-sage/40 border border-brand-gold/30 text-xs font-semibold text-brand-forest">
                  {product.packSize}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-brand-forest block mb-1.5 font-sans">
                  Sacred Fragrance Accords:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.fragranceNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-white border border-brand-gold/25 text-brand-forest font-serif italic"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stock Availability */}
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="font-semibold text-emerald-800">
                {product.stock > 0 ? `In Stock (Fresh Temple Batch - ${product.stock} units available)` : 'Limited Batch'}
              </span>
            </div>

            {/* Quantity Selector & CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-brand-gold/40 rounded-lg bg-white h-12 w-32 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex-1 h-full flex items-center justify-center hover:bg-brand-sage/30 text-brand-forest"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-sm font-bold text-brand-forest font-sans">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex-1 h-full flex items-center justify-center hover:bg-brand-sage/30 text-brand-forest"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 h-12 bg-brand-forest text-brand-ivory rounded-lg font-sans text-xs font-semibold tracking-[0.2em] hover:bg-brand-forest-light transition-all shadow-luxury flex items-center justify-center gap-2"
                >
                  {isAdding ? (
                    <>
                      <Check className="w-4 h-4 text-brand-gold" /> ADDED TO BASKET
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> ADD TO CART • ₹{product.price * quantity}
                    </>
                  )}
                </button>
              </div>

              {/* BUY NOW (Instant Checkout) */}
              <button
                onClick={handleBuyNow}
                className="w-full h-12 bg-brand-gold text-brand-forest rounded-lg font-sans text-xs font-bold tracking-[0.22em] hover:bg-brand-gold-light transition-all shadow-gold flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> BUY NOW WITH 1-CLICK
              </button>
            </div>

            {/* Indian Delivery PIN Code Serviceability Checker */}
            <div className="p-4 rounded-xl bg-white border border-brand-gold/25 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-forest">
                <Truck className="w-4 h-4 text-brand-gold" />
                <span>Delivery &amp; Serviceability Checker</span>
              </div>
              <form onSubmit={checkPincodeService} className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit PIN code (e.g. 560001, 110001)"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-brand-gold/30 rounded focus:outline-none focus:border-brand-gold font-sans"
                  />
                </div>
                <button
                  type="submit"
                  disabled={checkingPincode || pincode.length < 6}
                  className="px-4 py-2 bg-brand-forest text-brand-ivory text-xs font-semibold rounded hover:bg-brand-forest-light disabled:opacity-50 transition-colors shrink-0"
                >
                  {checkingPincode ? 'CHECKING...' : 'CHECK'}
                </button>
              </form>

              {pincodeResult?.checked && (
                <div
                  className={`p-2.5 rounded text-xs flex items-start gap-2 ${
                    pincodeResult.serviceable
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                      : 'bg-rose-50 text-rose-900 border border-rose-200'
                  }`}
                >
                  {pincodeResult.serviceable ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">Serviceable to {pincodeResult.city}!</p>
                        <p className="text-[11px] text-emerald-800">
                          Estimated Delivery: {pincodeResult.deliveryDays} • Cash on Delivery (COD) Available
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <p>{pincodeResult.message}</p>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Quick Trust Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-brand-forest">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                <span>100% Charcoal-Free</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                <span>45-50 Mins Long Burn</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Authentic Essential Oils</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-brand-gold shrink-0" />
                <span>7 Days Easy Return Policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BELOW: TABS (Description, Specifications, Usage, Safety, Shipping & Reviews)
            ========================================================================= */}
        <div className="mt-16 sm:mt-24">
          {/* Tab Navigation */}
          <div className="flex border-b border-brand-gold/30 overflow-x-auto gap-4 sm:gap-8 pb-px">
            {[
              { id: 'desc', label: 'Sacred Description' },
              { id: 'specs', label: 'Legal Metrology & Specifications' },
              { id: 'instructions', label: 'Usage & Safety' },
              { id: 'shipping', label: 'Shipping & Returns' },
              { id: 'reviews', label: `Customer Reviews (${reviewsList.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 font-serif text-base sm:text-lg whitespace-nowrap transition-all border-b-2 font-medium ${
                  activeTab === tab.id
                    ? 'border-brand-gold text-brand-forest font-bold'
                    : 'border-transparent text-brand-forest/60 hover:text-brand-forest'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Panels */}
          <div className="py-8 text-sm text-brand-forest/90 leading-relaxed max-w-4xl">
            {/* Description Tab */}
            {activeTab === 'desc' && (
              <div className="space-y-6">
                <p className="font-serif text-lg leading-relaxed">{product.description}</p>
                <div>
                  <h4 className="font-serif text-xl font-bold text-brand-forest mb-3">
                    Distinctive Sacred Features:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm font-sans">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-brand-gold shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Specifications Tab (Mandatory Indian Legal Metrology) */}
            {activeTab === 'specs' && (
              <div className="space-y-6">
                <h4 className="font-serif text-xl font-bold text-brand-forest">
                  Product Specifications &amp; Declarations
                </h4>
                <div className="bg-white rounded-xl border border-brand-gold/25 overflow-hidden shadow-sm">
                  <table className="w-full text-xs font-sans divide-y divide-brand-gold/15">
                    <tbody className="divide-y divide-brand-gold/15">
                      {product.specifications.burnTime && (
                        <tr>
                          <td className="px-4 py-3 bg-brand-neutral/40 font-semibold w-1/3">
                            Burn Time
                          </td>
                          <td className="px-4 py-3">{product.specifications.burnTime}</td>
                        </tr>
                      )}
                      {product.specifications.stickLength && (
                        <tr>
                          <td className="px-4 py-3 bg-brand-neutral/40 font-semibold">
                            Stick Length
                          </td>
                          <td className="px-4 py-3">{product.specifications.stickLength}</td>
                        </tr>
                      )}
                      {product.specifications.fragranceFamily && (
                        <tr>
                          <td className="px-4 py-3 bg-brand-neutral/40 font-semibold">
                            Fragrance Family
                          </td>
                          <td className="px-4 py-3">{product.specifications.fragranceFamily}</td>
                        </tr>
                      )}
                      {product.specifications.naturalIngredients && (
                        <tr>
                          <td className="px-4 py-3 bg-brand-neutral/40 font-semibold">
                            Ingredients / Materials
                          </td>
                          <td className="px-4 py-3">{product.specifications.naturalIngredients}</td>
                        </tr>
                      )}
                      {product.specifications.origin && (
                        <tr>
                          <td className="px-4 py-3 bg-brand-neutral/40 font-semibold">
                            Country of Origin
                          </td>
                          <td className="px-4 py-3">{product.specifications.origin}</td>
                        </tr>
                      )}
                      {product.specifications.netQuantity && (
                        <tr>
                          <td className="px-4 py-3 bg-brand-neutral/40 font-semibold">
                            Net Quantity
                          </td>
                          <td className="px-4 py-3">{product.specifications.netQuantity}</td>
                        </tr>
                      )}
                      <tr>
                        <td className="px-4 py-3 bg-brand-neutral/40 font-semibold">
                          Manufacturer
                        </td>
                        <td className="px-4 py-3">{product.specifications.manufacturerDetails || 'Aaradhya Divine Fragrances Pvt Ltd, Mysore, Karnataka'}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 bg-brand-neutral/40 font-semibold">
                          Packer &amp; Marketer
                        </td>
                        <td className="px-4 py-3">{product.specifications.packerDetails || 'Aaradhya Divine Fragrances Pvt Ltd, Gurugram, Haryana'}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 bg-brand-neutral/40 font-semibold">
                          Consumer Care
                        </td>
                        <td className="px-4 py-3">{product.specifications.consumerCare || 'care@aaradhyadivinemist.com | 1800-208-1080'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Usage & Safety Tab */}
            {activeTab === 'instructions' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-serif text-xl font-bold text-brand-forest mb-3">
                    How to Light &amp; Experience
                  </h4>
                  <ol className="space-y-2.5 list-decimal list-inside text-xs sm:text-sm font-sans">
                    {product.usageInstructions.map((inst, i) => (
                      <li key={i} className="leading-relaxed">
                        {inst}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                  <h5 className="font-serif font-bold text-amber-950 flex items-center gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-amber-700" /> Devotional Safety Instructions
                  </h5>
                  <ul className="space-y-1.5 list-disc list-inside text-xs text-amber-900 font-sans">
                    {product.safetyInstructions.map((safe, i) => (
                      <li key={i}>{safe}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Shipping & Returns Tab */}
            {activeTab === 'shipping' && (
              <div className="space-y-4 text-xs sm:text-sm font-sans">
                <h4 className="font-serif text-xl font-bold text-brand-forest mb-2">
                  Pan-India Delivery &amp; Fair Returns
                </h4>
                <p>
                  Orders placed before 2:00 PM IST are dispatched on the same business day from our primary hub. Standard delivery takes 2 to 4 business days depending on your postal circle.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-white rounded-lg border border-brand-gold/20">
                    <h5 className="font-bold text-brand-forest mb-1">Standard Shipping</h5>
                    <p className="text-xs text-brand-text-muted">
                      FREE on all orders above ₹799. Flat ₹60 for orders under ₹799.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-brand-gold/20">
                    <h5 className="font-bold text-brand-forest mb-1">7 Days Devotee Return Policy</h5>
                    <p className="text-xs text-brand-text-muted">
                      If your sacred parcel arrives damaged or defective, we provide an immediate replacement or full refund.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Customer Reviews Tab (Genuine Verified Devotees) */}
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Reviews List */}
                <div className="space-y-4">
                  {reviewsList.length === 0 ? (
                    <p className="text-xs text-stone-500 italic">
                      Be the first devotee to share your sacred experience with this fragrance.
                    </p>
                  ) : (
                    reviewsList.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-5 bg-white rounded-xl border border-brand-gold/20 shadow-sm space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex text-amber-500">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <span className="text-[11px] text-stone-400">
                            {new Date(rev.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <h5 className="font-serif font-bold text-brand-forest text-sm">
                          {rev.title}
                        </h5>
                        <p className="text-xs text-brand-forest/80 leading-relaxed font-sans">
                          {rev.comment}
                        </p>
                        <div className="flex items-center gap-2 pt-1 text-[11px] text-stone-500">
                          <span className="font-semibold text-brand-forest">{rev.customerName}</span>
                          {rev.customerLocation && <span>• {rev.customerLocation}</span>}
                          {rev.isVerifiedPurchase && (
                            <span className="text-emerald-700 font-medium flex items-center gap-0.5">
                              <Check className="w-3 h-3" /> Verified Purchase
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Write Review Form */}
                <div className="p-6 bg-white rounded-xl border border-brand-gold/30 shadow-sm space-y-4">
                  <h4 className="font-serif text-lg font-bold text-brand-forest">
                    Write a Verified Review
                  </h4>

                  {reviewSubmitted ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-700" />
                      <span>Thank you! Your review has been submitted for editorial verification.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-4 font-sans text-xs">
                      <div>
                        <label className="block font-semibold text-brand-forest mb-1">
                          Your Rating (1 to 5 Stars):
                        </label>
                        <div className="flex gap-1.5 cursor-pointer">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewReviewRating(star)}
                              className="p-1 focus:outline-none"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  star <= newReviewRating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-stone-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-semibold text-brand-forest mb-1">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={newReviewName}
                            onChange={(e) => setNewReviewName(e.target.value)}
                            placeholder="e.g. Ramesh Kumar"
                            className="w-full px-3 py-2 border border-brand-gold/30 rounded focus:outline-none focus:border-brand-gold"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-brand-forest mb-1">
                            Review Title
                          </label>
                          <input
                            type="text"
                            value={newReviewTitle}
                            onChange={(e) => setNewReviewTitle(e.target.value)}
                            placeholder="e.g. Divine authentic chandan!"
                            className="w-full px-3 py-2 border border-brand-gold/30 rounded focus:outline-none focus:border-brand-gold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-brand-forest mb-1">
                          Your Review Experience *
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={newReviewComment}
                          onChange={(e) => setNewReviewComment(e.target.value)}
                          placeholder="Describe how this fragrance felt in your sacred pooja room..."
                          className="w-full px-3 py-2 border border-brand-gold/30 rounded focus:outline-none focus:border-brand-gold"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submittingReview}
                        className="px-6 py-2.5 bg-brand-forest text-brand-ivory rounded font-semibold tracking-wider hover:bg-brand-forest-light transition-colors flex items-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" /> SUBMIT REVIEW
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
            RELATED PRODUCTS
            ========================================================================= */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-brand-gold/20">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-xs uppercase font-sans tracking-[0.25em] text-brand-gold-dark font-semibold">
                  Complementary Sacred Aromas
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest mt-1">
                  You May Also Cherish
                </h3>
              </div>
              <Link
                href="/shop"
                className="text-xs font-sans font-semibold tracking-wider text-brand-forest hover:text-brand-gold transition-colors flex items-center gap-1"
              >
                VIEW FULL CATALOG <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          STICKY MOBILE ADD TO CART BAR (Optimized for Android / Mobile Touch)
          ========================================================================= */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-brand-gold/30 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.12)] flex items-center justify-between gap-3 animate-slide-up">
        <div className="min-w-0 flex-1">
          <div className="font-serif text-xs font-bold text-brand-forest truncate">
            {product.name}
          </div>
          <div className="flex items-baseline gap-1.5 text-sm font-bold text-brand-forest">
            <span>₹{product.price}</span>
            {product.mrp > product.price && (
              <span className="text-[10px] text-stone-400 line-through">
                ₹{product.mrp}
              </span>
            )}
            <span className="text-[10px] text-emerald-800 font-semibold ml-1">
              • In Stock
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleAddToCart}
            className="px-3.5 py-2.5 bg-brand-forest text-brand-ivory text-xs font-sans font-semibold tracking-wider rounded-lg active:scale-95 transition-transform shadow-sm"
          >
            ADD
          </button>
          <button
            onClick={handleBuyNow}
            className="px-4 py-2.5 bg-brand-gold text-brand-forest text-xs font-sans font-bold tracking-wider rounded-lg active:scale-95 transition-transform shadow-gold"
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};
