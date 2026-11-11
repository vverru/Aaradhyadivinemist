import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/context/ToastContext';
import { CartProvider } from '@/components/context/CartContext';
import { WishlistProvider } from '@/components/context/WishlistContext';
import { AuthProvider } from '@/components/context/AuthContext';
import { StoreLayout } from '@/components/layout/StoreLayout';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#183B2C',
};

export const metadata: Metadata = {
  title: 'AARADHYA DIVINE MIST | Premium Agarbatti, Incense Sticks & Pooja Essentials',
  description:
    'Way to connect your Aaradhya. Discover luxury charcoal-free agarbatti, authentic Mysore sandalwood incense, natural dhoop sticks and royal pooja collections handcrafted in India.',
  keywords: [
    'Premium Agarbatti Online',
    'Buy Agarbatti Online',
    'Luxury Incense Sticks',
    'Premium Dhoop Sticks',
    'Pooja Essentials Online',
    'Aaradhya Divine Mist',
    'Mysore Sandalwood Chandan',
    'Temple Dhoop Loban',
  ],
  metadataBase: new URL('https://aaradhyadivinemist.com'),
  openGraph: {
    title: 'AARADHYA DIVINE MIST | Premium Indian Spiritual Fragrance',
    description: 'Way to connect your Aaradhya. 100% Charcoal-free luxury incense and pooja essentials.',
    url: 'https://aaradhyadivinemist.com',
    siteName: 'Aaradhya Divine Mist',
    images: [
      {
        url: '/images/hero/hero-incense.svg',
        width: 1200,
        height: 630,
        alt: 'Aaradhya Divine Mist - Sacred Fragrance',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AARADHYA DIVINE MIST | Way to connect your Aaradhya',
    description: '100% Charcoal-free luxury agarbatti, dhoop & pooja essentials.',
    images: ['/images/hero/hero-incense.svg'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased selection:bg-brand-gold selection:text-brand-forest">
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <StoreLayout>{children}</StoreLayout>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
