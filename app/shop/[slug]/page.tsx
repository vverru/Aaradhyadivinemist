import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts, getReviews } from '@/lib/db';
import { ProductDetailView } from '@/components/shop/ProductDetailView';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const products = getProducts({ status: 'all' });
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return {
      title: 'Sacred Product Not Found | AARADHYA DIVINE MIST',
    };
  }

  return {
    title: `${product.name} | Premium ${product.categoryName} | AARADHYA DIVINE MIST`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} - AARADHYA DIVINE MIST`,
      description: product.description.slice(0, 160),
      url: `https://aaradhyadivinemist.com/shop/${product.slug}`,
      images: [
        {
          url: product.images[0] || '/images/products/sandalwood.png',
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  const reviews = getReviews(product.id, true);
  const relatedProducts = getProducts({
    category: product.categorySlug,
    status: 'published',
  }).filter((p) => p.id !== product.id);

  // JSON-LD Structured Data for Google Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'AARADHYA DIVINE MIST',
    },
    offers: {
      '@type': 'Offer',
      url: `https://aaradhyadivinemist.com/shop/${product.slug}`,
      priceCurrency: 'INR',
      price: product.price,
      availability:
        product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailView
        product={product}
        initialReviews={reviews}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
