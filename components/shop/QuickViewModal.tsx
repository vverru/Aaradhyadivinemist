'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  X,
  ShoppingBag,
  Heart,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!isOpen) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product, quantity);
    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-brand-ivory rounded-xl border border-brand-gold/30 shadow-2xl max-w-3xl w-full overflow-hidden z-10 animate-scale">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-brand-forest transition-colors z-20"
          aria-label="Close Quick View"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto h-72 md:h-full bg-white flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-brand-gold/20">
            <Image
              src={product.images[0] || '/images/products/sandalwood.png'}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
          </div>

          {/* Info */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-sans tracking-widest text-brand-gold-dark font-semibold">
                {product.categoryName}
              </span>
              <h3 className="font-serif text-2xl font-bold text-brand-forest mt-1 mb-2">
                {product.name}
              </h3>
              {product.tagline && (
                <p className="font-serif italic text-xs text-brand-text-muted mb-3">
                  &ldquo;{product.tagline}&rdquo;
                </p>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-bold text-brand-forest font-sans">
                  ₹{product.price}
                </span>
                {product.mrp > product.price && (
                  <span className="text-sm text-stone-400 line-through font-sans">
                    ₹{product.mrp}
                  </span>
                )}
                {product.mrp > product.price && (
                  <span className="text-xs bg-brand-forest text-brand-gold px-2 py-0.5 rounded font-sans font-bold">
                    SAVE {Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
                  </span>
                )}
              </div>

              {/* Pack Size & Notes */}
              <div className="space-y-2 mb-4 text-xs">
                <div className="flex items-center gap-2 text-brand-text-muted">
                  <span className="font-semibold text-brand-forest">Pack Size:</span>
                  <span>{product.packSize}</span>
                </div>
                <div className="flex items-center gap-2 text-brand-text-muted">
                  <span className="font-semibold text-brand-forest">Fragrance:</span>
                  <span>{product.fragranceNotes.join(' • ')}</span>
                </div>
              </div>

              <p className="text-xs text-brand-forest/80 line-clamp-3 leading-relaxed mb-6 font-sans">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4 border-t border-brand-gold/20">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-brand-gold/40 rounded bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-brand-sage/40 text-brand-forest"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-sm font-semibold text-brand-forest font-sans">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-brand-sage/40 text-brand-forest"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 bg-brand-forest text-brand-ivory py-2.5 px-4 rounded text-xs font-sans font-semibold tracking-widest hover:bg-brand-forest-light transition-all flex items-center justify-center gap-2 shadow-sm"
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

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2.5 rounded border border-brand-gold/40 transition-colors ${
                    inWishlist ? 'bg-rose-50 text-rose-600' : 'bg-white text-brand-forest hover:bg-brand-sage/30'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="flex items-center gap-1.5 text-brand-text-muted text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" /> 100% Charcoal-Free
                </span>
                <Link
                  href={`/shop/${product.slug}`}
                  onClick={onClose}
                  className="text-brand-forest hover:text-brand-gold font-semibold flex items-center gap-1 text-[11px] underline"
                >
                  View Full Product Details <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
