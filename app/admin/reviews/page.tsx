'use client';

import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, XCircle, Trash2, ShieldCheck, Sparkles } from 'lucide-react';
import { Review } from '@/types';
import { useToast } from '@/components/context/ToastContext';

export default function AdminReviewsPage() {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    try {
      const res = await fetch('/api/reviews?all=true');
      const data = await res.json();
      if (data.reviews) setReviews(data.reviews);
    } catch {
      showToast('Error loading reviews', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const res = await fetch('/api/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        showToast(`Review marked as ${status.toUpperCase()}`, 'success');
        loadReviews();
      }
    } catch {
      showToast('Failed to update review status', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this review?')) return;
    try {
      const res = await fetch(`/api/reviews?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Review deleted', 'info');
        loadReviews();
      }
    } catch {
      showToast('Failed to delete review', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-brand-gold/20 pb-6">
        <h2 className="font-serif text-3xl font-bold text-brand-forest">
          Review Moderation &amp; Authenticity
        </h2>
        <p className="text-xs text-brand-text-muted mt-1 font-sans">
          In adherence to our strict brand guidelines (Section 4 &amp; 12), only genuine, verified customer reviews are approved for public storefront display.
        </p>
      </div>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="bg-white rounded-xl border border-brand-gold/25 p-10 text-center text-xs text-stone-500 font-sans">
            No reviews awaiting moderation.
          </div>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-xl border border-brand-gold/25 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-mono text-xs text-stone-400">
                    Product: <strong className="text-brand-forest">{rev.productName}</strong>
                  </span>
                  {rev.isVerifiedPurchase && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                      <ShieldCheck className="w-3 h-3" /> Verified Purchase
                    </span>
                  )}
                </div>

                <h4 className="font-serif font-bold text-base text-brand-forest">
                  &ldquo;{rev.title}&rdquo;
                </h4>

                <p className="text-xs text-stone-700 leading-relaxed font-sans max-w-2xl">
                  {rev.comment}
                </p>

                <p className="text-[11px] text-stone-400 font-sans">
                  Submitted by <strong>{rev.customerName}</strong> ({rev.customerLocation || 'India'}) on{' '}
                  {new Date(rev.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-brand-gold/15">
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    rev.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : rev.status === 'rejected'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {rev.status}
                </span>

                {rev.status !== 'approved' && (
                  <button
                    onClick={() => handleUpdateStatus(rev.id, 'approved')}
                    className="px-3 py-1.5 bg-emerald-700 text-white text-xs font-semibold rounded hover:bg-emerald-800 flex items-center gap-1"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Approve
                  </button>
                )}

                {rev.status !== 'rejected' && (
                  <button
                    onClick={() => handleUpdateStatus(rev.id, 'rejected')}
                    className="px-3 py-1.5 bg-amber-700 text-white text-xs font-semibold rounded hover:bg-amber-800 flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Reject
                  </button>
                )}

                <button
                  onClick={() => handleDelete(rev.id)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 rounded"
                  title="Delete review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
