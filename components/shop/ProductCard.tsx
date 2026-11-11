'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Heart,
  ShoppingBag,
  Eye,
  Star,
  Check,
  Sparkles,
} from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  rating?: number;
  reviewCount?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  rating,
  reviewCount,
}) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const discountPercent =
    product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addItem(product, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <>
      <div className="group relative bg-white rounded-lg border border-brand-gold/20 overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-all duration-300 flex flex-col justify-between">
        {/* Top Badges & Wishlist */}
        <div className="relative aspect-square w-full bg-brand-ivory/50 overflow-hidden">
          {/* Main Product Image with subtle hover zoom */}
          <Link href={`/shop/${product.slug}`} className="block w-full h-full">
            <Image
              src={product.images[0] || '/images/products/sandalwood.png'}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Link>

          {/* Floating Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {discountPercent > 0 && (
              <span className="bg-brand-forest text-brand-gold text-[10px] font-bold font-sans tracking-wider px-2 py-0.5 rounded shadow-sm">
                SAVE {discountPercent}%
              </span>
            )}
            {product.isBestseller && (
              <span className="bg-brand-gold text-brand-forest text-[10px] font-bold font-sans tracking-wider px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> BESTSELLER
              </span>
            )}
            {product.isNewArrival && !product.isBestseller && (
              <span className="bg-brand-sage text-brand-forest text-[10px] font-bold font-sans tracking-wider px-2 py-0.5 rounded shadow-sm">
                NEW
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 shadow-sm ${
              inWishlist
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-white/80 text-brand-forest hover:bg-white hover:text-brand-gold border border-brand-gold/20'
            }`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-600' : ''}`} />
          </button>

          {/* Quick View Button Hover Overlay */}
          <button
            onClick={() => setIsQuickViewOpen(true)}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/95 text-brand-forest px-3.5 py-1.5 rounded-full text-xs font-sans font-medium tracking-wider shadow-md hover:bg-brand-forest hover:text-brand-ivory flex items-center gap-1.5 z-10"
          >
            <Eye className="w-3.5 h-3.5" /> QUICK VIEW
          </button>
        </div>

        {/* Content Info */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Category & Fragrance Notes */}
            <div className="flex items-center justify-between text-[11px] text-brand-text-muted mb-1.5">
              <span className="uppercase tracking-widest font-sans font-medium">
                {product.categoryName}
              </span>
              <span className="text-[10px] text-brand-gold-dark font-serif italic">
                {product.packSize}
              </span>
            </div>

            {/* Product Title */}
            <Link
              href={`/shop/${product.slug}`}
              className="font-serif text-base sm:text-lg font-bold text-brand-forest hover:text-brand-gold transition-colors line-clamp-1 block mb-1"
            >
              {product.name}
            </Link>

            {/* Fragrance Accords */}
            <div className="flex flex-wrap gap-1 mb-3">
              {product.fragranceNotes.slice(0, 2).map((note, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-brand-sage/40 text-brand-forest px-2 py-0.5 rounded-full"
                >
                  {note}
                </span>
              ))}
            </div>

            {/* Genuine Review Rating (Section 4: Only when genuine reviews exist) */}
            {typeof rating === 'number' && rating > 0 && (
              <div className="flex items-center gap-1.5 mb-3 text-xs">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.round(rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-brand-forest">
                  {rating.toFixed(1)}
                </span>
                {reviewCount && (
                  <span className="text-[11px] text-stone-400">
                    ({reviewCount})
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Pricing & Add to Cart */}
          <div className="pt-3 border-t border-brand-gold/15 flex items-center justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-bold text-brand-forest font-sans">
                  ₹{product.price}
                </span>
                {product.mrp > product.price && (
                  <span className="text-xs text-stone-400 line-through font-sans">
                    ₹{product.mrp}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-emerald-800 font-medium">
                {product.stock > 0 ? 'In Stock' : 'Low Stock'}
              </span>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding || product.stock === 0}
              className={`px-3.5 py-2 rounded text-xs font-sans font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5 shadow-sm ${
                isAdding
                  ? 'bg-emerald-700 text-white'
                  : 'bg-brand-forest text-brand-ivory hover:bg-brand-forest-light'
              }`}
              aria-label={`Add ${product.name} to cart`}
            >
              {isAdding ? (
                <>
                  <Check className="w-3.5 h-3.5" /> ADDED
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" /> ADD
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <QuickViewModal
          product={product}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
};
