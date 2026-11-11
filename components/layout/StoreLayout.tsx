'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '../ui/Header';
import { Footer } from '../ui/Footer';
import { CartDrawer } from '../shop/CartDrawer';

export const StoreLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <main className="min-h-screen bg-brand-neutral">{children}</main>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
};
