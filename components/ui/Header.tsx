'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const { itemCount, openCartDrawer } = useCart();
  const { wishlistIds } = useWishlist();

  // Handle scroll effect for luxury transparent -> ivory transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  const isHome = pathname === '/';
  const navBackground = isScrolled || !isHome
    ? 'bg-brand-ivory/95 backdrop-blur-md shadow-luxury border-b border-brand-gold/20 text-brand-forest'
    : 'bg-transparent text-brand-forest md:text-brand-ivory';

  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'SHOP', href: '/shop' },
    { label: 'COLLECTIONS', href: '/collections' },
    { label: 'OUR STORY', href: '/our-story' },
    { label: 'WHY AARADHYA', href: '/why-aaradhya' },
    { label: 'CONTACT', href: '/contact' },
  ];

  return (
    <>
      {/* Top Divine Announcement Bar */}
      <div className="bg-brand-forest text-brand-ivory py-2 px-4 text-xs tracking-wider border-b border-brand-gold/20 flex items-center justify-between text-center font-sans z-40 relative">
        <div className="hidden lg:flex items-center gap-2 text-brand-gold text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% Charcoal-Free • Authentic Mysore Extracts</span>
        </div>
        <div className="w-full lg:w-auto flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
          <span>
            Special Launch: Free Pan-India Delivery on orders above ₹799 | Code: <strong className="text-brand-gold font-bold">DIVINE10</strong> for 10% Off
          </span>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-[11px] text-brand-sage">
          <Link href="/track-order" className="hover:text-brand-gold transition-colors">
            Track Order
          </Link>
          <span>•</span>
          <Link href="/admin" className="text-brand-gold hover:underline">
            Admin Portal
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${navBackground}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Left: Brand Logo */}
            <div className="flex items-center">
              <BrandLogo
                variant={isScrolled || !isHome ? 'dark' : 'light'}
                size="md"
              />
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-9 font-sans text-xs tracking-[0.2em] font-medium">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-1 group transition-colors duration-200 ${
                      isActive
                        ? isScrolled || !isHome
                          ? 'text-brand-forest font-semibold'
                          : 'text-brand-gold font-semibold'
                        : isScrolled || !isHome
                        ? 'text-brand-forest/80 hover:text-brand-forest'
                        : 'text-brand-ivory/85 hover:text-brand-gold'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-gold transition-transform duration-300 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right: Actions (Search, Account, Wishlist, Cart) */}
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-full transition-colors ${
                  isScrolled || !isHome
                    ? 'text-brand-forest hover:bg-brand-sage/40'
                    : 'text-brand-ivory hover:bg-white/10'
                }`}
                aria-label="Search Fragrances"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Account / Profile */}
              <Link
                href="/account"
                className={`hidden sm:inline-flex p-2 rounded-full transition-colors ${
                  isScrolled || !isHome
                    ? 'text-brand-forest hover:bg-brand-sage/40'
                    : 'text-brand-ivory hover:bg-white/10'
                }`}
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Wishlist */}
              <Link
                href="/account?tab=wishlist"
                className={`relative p-2 rounded-full transition-colors ${
                  isScrolled || !isHome
                    ? 'text-brand-forest hover:bg-brand-sage/40'
                    : 'text-brand-ivory hover:bg-white/10'
                }`}
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistIds.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-brand-gold text-brand-forest text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistIds.length}
                  </span>
                )}
              </Link>

              {/* Cart Trigger with Live Count */}
              <button
                onClick={openCartDrawer}
                className={`relative p-2.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isScrolled || !isHome
                    ? 'bg-brand-forest text-brand-ivory hover:bg-brand-forest-light'
                    : 'bg-brand-gold text-brand-forest hover:bg-brand-gold-light'
                }`}
                aria-label="Open Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-forest border-2 border-brand-gold text-brand-gold text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-md ${
                  isScrolled || !isHome ? 'text-brand-forest' : 'text-brand-ivory'
                }`}
                aria-label="Toggle Mobile Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="bg-brand-ivory border-t border-b border-brand-gold/30 px-4 py-4 animate-fade-in shadow-luxury">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-brand-forest/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search divine agarbatti, chandan, rose, loban, pooja essentials..."
                className="w-full bg-transparent border-none focus:outline-none text-brand-forest placeholder:text-brand-text-muted text-sm sm:text-base font-serif"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
              />
              <button
                onClick={() => {
                  if (searchQuery.trim()) {
                    window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                className="bg-brand-forest text-brand-ivory px-4 py-2 rounded text-xs font-sans tracking-widest hover:bg-brand-forest-light transition-colors"
              >
                SEARCH
              </button>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-stone-500 hover:text-stone-800 p-1"
                aria-label="Close Search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Slide-in Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-brand-ivory border-r border-brand-gold/30 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-right">
            <div>
              {/* Drawer Header */}
              <div className="p-6 border-b border-brand-gold/20 flex items-center justify-between">
                <BrandLogo variant="dark" size="sm" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-brand-forest hover:bg-brand-sage/40 rounded-full"
                  aria-label="Close navigation"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="p-4 border-b border-brand-gold/15">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
                    }
                  }}
                  className="relative"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search sacred aromas..."
                    className="w-full bg-brand-neutral/80 border border-brand-gold/30 rounded-full pl-10 pr-4 py-2 text-sm text-brand-forest focus:outline-none focus:border-brand-gold"
                  />
                  <Search className="w-4 h-4 text-brand-forest/60 absolute left-3.5 top-3" />
                </form>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="p-6 space-y-4 font-serif text-lg text-brand-forest">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between py-2 border-b border-brand-neutral-dark/60 hover:text-brand-gold transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-brand-gold/60" />
                  </Link>
                ))}
                <Link
                  href="/account"
                  className="flex items-center justify-between py-2 border-b border-brand-neutral-dark/60 hover:text-brand-gold transition-colors"
                >
                  <span>MY ACCOUNT & ORDERS</span>
                  <ChevronRight className="w-4 h-4 text-brand-gold/60" />
                </Link>
                <Link
                  href="/track-order"
                  className="flex items-center justify-between py-2 border-b border-brand-neutral-dark/60 hover:text-brand-gold transition-colors"
                >
                  <span>TRACK ORDER</span>
                  <ChevronRight className="w-4 h-4 text-brand-gold/60" />
                </Link>
              </nav>
            </div>

            {/* Drawer Footer */}
            <div className="p-6 bg-brand-forest text-brand-ivory text-xs space-y-2">
              <p className="font-serif italic text-brand-gold text-sm">
                &ldquo;Way to connect your Aaradhya&rdquo;
              </p>
              <p className="text-brand-sage text-[11px]">
                Pan-India Express Shipping • 100% Charcoal-Free
              </p>
              <div className="pt-2">
                <Link
                  href="/admin"
                  className="inline-block text-[11px] text-brand-gold hover:underline"
                >
                  Admin Management Portal →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
