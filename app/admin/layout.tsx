'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Boxes,
  Users,
  Tag,
  Star,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Bell,
  Sparkles,
} from 'lucide-react';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useAuth } from '@/components/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If on login page, render children directly without sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { label: 'Inventory', href: '/admin/inventory', icon: Boxes },
    { label: 'Customers', href: '/admin/customers', icon: Users },
    { label: 'Coupons & Offers', href: '/admin/coupons', icon: Tag },
    { label: 'Review Moderation', href: '/admin/reviews', icon: Star },
    { label: 'Store Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-brand-ivory flex">
      {/* =========================================================================
          DESKTOP SIDEBAR (Forest Green Background as mandated by Section 12)
          ========================================================================= */}
      <aside className="hidden lg:flex w-64 bg-brand-forest text-brand-ivory flex-col justify-between border-r border-brand-gold/30 shrink-0">
        <div>
          {/* Admin Header */}
          <div className="p-6 border-b border-white/10">
            <BrandLogo variant="light" size="sm" showTagline={false} />
            <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 border border-brand-gold/30 text-[10px] text-brand-gold tracking-widest uppercase font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Sanctuary Portal</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 font-sans text-xs">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-colors font-medium ${
                    isActive
                      ? 'bg-brand-gold text-brand-forest font-bold shadow-sm'
                      : 'text-brand-sage hover:bg-white/10 hover:text-brand-ivory'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-2 text-xs font-sans">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-lg text-brand-sage hover:bg-white/10 hover:text-brand-ivory transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
              <span>Live Storefront</span>
            </span>
            <span className="text-[10px] text-brand-gold font-mono">↗</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-rose-300 hover:bg-rose-950/40 hover:text-rose-100 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* =========================================================================
          MAIN ADMIN WORKSPACE (Ivory Background)
          ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-brand-gold/20 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded text-brand-forest hover:bg-brand-sage/40"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="font-serif text-lg sm:text-xl font-bold text-brand-forest hidden sm:block">
              Aaradhya Commerce Suite
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-gold/30 text-xs font-sans text-brand-forest hover:bg-brand-sage/30 transition-colors"
            >
              <span>View Store</span>
              <ExternalLink className="w-3 h-3 text-brand-gold-dark" />
            </Link>

            <div className="flex items-center gap-2 pl-2 border-l border-brand-gold/20 text-xs font-sans">
              <div className="w-8 h-8 rounded-full bg-brand-forest text-brand-gold flex items-center justify-center font-bold">
                AD
              </div>
              <div className="hidden sm:block">
                <p className="font-bold text-brand-forest leading-none">Aaradhya Admin</p>
                <p className="text-[10px] text-stone-400 mt-0.5">superadmin@aaradhyadivinemist.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Slide-in Navigation */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-64 bg-brand-forest text-brand-ivory p-6 flex flex-col justify-between shadow-2xl">
              <div>
                <BrandLogo variant="light" size="sm" showTagline={false} />
                <nav className="mt-8 space-y-1 text-xs font-sans">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-colors font-medium ${
                          isActive
                            ? 'bg-brand-gold text-brand-forest font-bold'
                            : 'text-brand-sage hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center gap-2 text-brand-sage py-1"
                >
                  <ExternalLink className="w-4 h-4 text-brand-gold" />
                  <span>Open Public Store</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 text-rose-300 py-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Workspace Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
