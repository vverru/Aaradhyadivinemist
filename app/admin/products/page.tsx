'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Check,
  X,
  Sparkles,
  AlertCircle,
  Upload,
} from 'lucide-react';
import { Product, Category } from '@/types';
import { useToast } from '@/components/context/ToastContext';

export default function AdminProductsPage() {
  const { showToast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State for Create / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    categorySlug: 'premium-agarbatti',
    price: 349,
    mrp: 450,
    packSize: 'Pack of 50 Sticks (120g)',
    stock: 50,
    lowStockThreshold: 10,
    fragranceNotes: 'Mysore Sandalwood, Rose Petals',
    description: '',
    features: '100% Charcoal-Free\nOrganic Bamboo Core\nPure Essential Oils',
    usage: 'Light the tip until glowing. Blow out flame.',
    safety: 'Keep away from flammable materials and children.',
    status: 'published' as 'draft' | 'published',
    isFeatured: false,
    isBestseller: false,
    isNewArrival: false,
  });

  const loadData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/products?status=all'),
        fetch('/api/categories'),
      ]);
      const prodData = await prodRes.json();
      const catData = await catRes.json();
      if (prodData.products) setProducts(prodData.products);
      if (catData.categories) setCategories(catData.categories);
    } catch {
      showToast('Error loading catalog products', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openNewModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      tagline: '',
      categorySlug: categories[0]?.slug || 'premium-agarbatti',
      price: 299,
      mrp: 399,
      packSize: 'Pack of 50 Sticks (120g)',
      stock: 60,
      lowStockThreshold: 10,
      fragranceNotes: 'Pure Sandalwood, Camphor, Floral',
      description: 'Handcrafted spiritual incense crafted with natural botanical oils.',
      features: '100% Charcoal-Free\nNon-toxic\nSlow burning',
      usage: 'Light tip, blow out after glowing, place in holder.',
      safety: 'Never leave unattended.',
      status: 'published',
      isFeatured: false,
      isBestseller: false,
      isNewArrival: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      tagline: p.tagline || '',
      categorySlug: p.categorySlug,
      price: p.price,
      mrp: p.mrp,
      packSize: p.packSize,
      stock: p.stock,
      lowStockThreshold: p.lowStockThreshold || 10,
      fragranceNotes: p.fragranceNotes?.join(', ') || '',
      description: p.description,
      features: p.features?.join('\n') || '',
      usage: p.usageInstructions?.join('\n') || '',
      safety: p.safetyInstructions?.join('\n') || '',
      status: p.status,
      isFeatured: !!p.isFeatured,
      isBestseller: !!p.isBestseller,
      isNewArrival: !!p.isNewArrival,
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.price <= 0) {
      showToast('Name and valid price are required', 'error');
      return;
    }

    const categoryObj = categories.find((c) => c.slug === formData.categorySlug);

    const productPayload: Partial<Product> = {
      id: editingProduct?.id || `prod-${Date.now()}`,
      name: formData.name,
      tagline: formData.tagline,
      categorySlug: formData.categorySlug,
      categoryName: categoryObj?.name || 'Sacred Collection',
      price: Number(formData.price),
      mrp: Number(formData.mrp),
      packSize: formData.packSize,
      stock: Number(formData.stock),
      lowStockThreshold: Number(formData.lowStockThreshold),
      fragranceNotes: formData.fragranceNotes.split(',').map((s) => s.trim()).filter(Boolean),
      description: formData.description,
      features: formData.features.split('\n').map((s) => s.trim()).filter(Boolean),
      usageInstructions: formData.usage.split('\n').map((s) => s.trim()).filter(Boolean),
      safetyInstructions: formData.safety.split('\n').map((s) => s.trim()).filter(Boolean),
      status: formData.status,
      isFeatured: formData.isFeatured,
      isBestseller: formData.isBestseller,
      isNewArrival: formData.isNewArrival,
      images: editingProduct?.images || ['/images/products/sandalwood.png'],
      specifications: editingProduct?.specifications || {
        burnTime: '45 minutes',
        stickLength: '9 inches',
        fragranceFamily: 'Sacred Bouquet',
        origin: 'India',
        netQuantity: formData.packSize,
      },
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productPayload),
      });

      const data = await res.json();
      if (data.success) {
        showToast(
          editingProduct ? `Updated "${formData.name}"` : `Added "${formData.name}" to catalog`,
          'success'
        );
        setIsModalOpen(false);
        loadData();
      }
    } catch {
      showToast('Error saving product', 'error');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast(`Product "${name}" deleted`, 'info');
        loadData();
      }
    } catch {
      showToast('Error deleting product', 'error');
    }
  };

  const handleToggleStatus = async (p: Product) => {
    const newStatus = p.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/products/${p.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        showToast(`Product changed to ${newStatus.toUpperCase()}`, 'success');
        loadData();
      }
    } catch {
      showToast('Status update failed', 'error');
    }
  };

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.categoryName?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.categorySlug === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-brand-gold/20 gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold text-brand-forest">
            Product Management
          </h2>
          <p className="text-xs text-brand-text-muted mt-1 font-sans">
            Create, edit, manage pricing, inventory, and toggle draft/publish statuses.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-forest text-brand-ivory text-xs font-sans font-semibold rounded-lg hover:bg-brand-forest-light transition-all shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4 text-brand-gold" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product title or category..."
            className="w-full pl-10 pr-4 py-2 border border-brand-gold/30 rounded-lg text-xs text-brand-forest focus:outline-none focus:border-brand-gold bg-white"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 border border-brand-gold/30 rounded-lg text-xs text-brand-forest bg-white focus:outline-none focus:border-brand-gold"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-brand-gold/25 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-brand-neutral/60 text-brand-forest uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price / MRP</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-gold/15">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-brand-neutral/20 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded bg-brand-ivory overflow-hidden shrink-0 border border-brand-gold/20">
                        <Image
                          src={prod.images[0] || '/images/products/sandalwood.png'}
                          alt={prod.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-serif font-bold text-sm text-brand-forest line-clamp-1">
                          {prod.name}
                        </p>
                        <p className="text-[11px] text-stone-500">{prod.packSize}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-stone-700">
                    {prod.categoryName}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-brand-forest text-sm">₹{prod.price}</span>
                    {prod.mrp > prod.price && (
                      <span className="text-[10px] text-stone-400 line-through block">
                        ₹{prod.mrp}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`font-bold ${
                        prod.stock <= (prod.lowStockThreshold || 10)
                          ? 'text-rose-600'
                          : 'text-stone-800'
                      }`}
                    >
                      {prod.stock} units
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleStatus(prod)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                        prod.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      }`}
                      title="Click to toggle Draft / Published"
                    >
                      {prod.status}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/shop/${prod.slug}`}
                        target="_blank"
                        className="p-1.5 text-stone-500 hover:text-brand-forest rounded hover:bg-stone-100"
                        title="View on store"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => openEditModal(prod)}
                        className="p-1.5 text-brand-forest hover:text-brand-gold rounded hover:bg-brand-sage/40"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id, prod.name)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 rounded hover:bg-rose-50"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 z-10 shadow-2xl border border-brand-gold/30 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-brand-gold/20 pb-4">
              <h3 className="font-serif text-2xl font-bold text-brand-forest">
                {editingProduct ? `Edit "${editingProduct.name}"` : 'Create New Sacred Product'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block font-semibold text-brand-forest mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Royal Chandan Dhoop Sticks"
                  className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block font-semibold text-brand-forest mb-1">
                  Sacred Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Pure Mysore Chandan Incense for Deep Contemplation"
                  className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-brand-forest mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.categorySlug}
                    onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-brand-forest mb-1">
                    Pack Size / Quantity Declaration *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.packSize}
                    onChange={(e) => setFormData({ ...formData, packSize: e.target.value })}
                    placeholder="e.g. Pack of 50 Sticks (120g)"
                    className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block font-semibold text-brand-forest mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-brand-forest mb-1">
                    MRP (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.mrp}
                    onChange={(e) => setFormData({ ...formData, mrp: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-brand-forest mb-1">
                    Stock Units *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-brand-forest mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold bg-white"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Unpublished)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-brand-forest mb-1">
                  Fragrance Notes (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.fragranceNotes}
                  onChange={(e) => setFormData({ ...formData, fragranceNotes: e.target.value })}
                  placeholder="e.g. Mysore Sandalwood, Temple Camphor, Sacred Bark"
                  className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block font-semibold text-brand-forest mb-1">
                  Devotional Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the aroma and spiritual experience..."
                  className="w-full px-3.5 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-brand-forest">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="accent-brand-forest"
                  />
                  <span>Show on Homepage Featured Section</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-brand-forest">
                  <input
                    type="checkbox"
                    checked={formData.isBestseller}
                    onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                    className="accent-brand-forest"
                  />
                  <span>Mark as Bestseller</span>
                </label>
              </div>

              <div className="pt-4 border-t border-brand-gold/20 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded text-xs font-semibold text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-forest text-brand-ivory rounded text-xs font-semibold tracking-wider hover:bg-brand-forest-light transition-colors"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
