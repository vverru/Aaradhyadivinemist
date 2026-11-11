import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  const isLight = variant === 'light';

  // Sizing definitions
  const emblemSize = size === 'sm' ? 36 : size === 'lg' ? 56 : 46;
  const brandTitleSize = size === 'sm' ? 'text-lg tracking-[0.25em]' : size === 'lg' ? 'text-3xl tracking-[0.3em]' : 'text-xl tracking-[0.28em]';
  const subtitleSize = size === 'sm' ? 'text-[9px] tracking-[0.3em]' : size === 'lg' ? 'text-xs tracking-[0.35em]' : 'text-[10px] tracking-[0.32em]';
  const taglineSize = size === 'sm' ? 'text-[10px]' : size === 'lg' ? 'text-sm' : 'text-xs';

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3.5 group select-none transition-opacity duration-300 hover:opacity-95 ${className}`}
      aria-label="Aaradhya Divine Mist - Home"
    >
      {/* Official Sacred Kalash & Flame Emblem */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={emblemSize}
          height={emblemSize}
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-500 group-hover:scale-105"
        >
          {/* Outer halo */}
          <circle
            cx="40"
            cy="40"
            r="38"
            fill={isLight ? 'rgba(255,255,255,0.06)' : '#F8F6ED'}
            stroke="#C6A66A"
            strokeWidth="1.2"
            strokeDasharray="2 2"
          />
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke={isLight ? '#DDE8D5' : '#DDE8D5'}
            strokeWidth="1.2"
          />
          <circle
            cx="40"
            cy="40"
            r="30"
            fill={isLight ? '#1F4735' : '#183B2C'}
          />

          {/* Sacred Diya / Kalash base */}
          <path
            d="M27 54 C27 59, 53 59, 53 54 L51 46 C51 43.5, 29 43.5, 29 46 Z"
            fill="#C6A66A"
          />
          <ellipse cx="40" cy="45.5" rx="11" ry="3" fill="#DFCA95" />

          {/* Golden Flame */}
          <path
            d="M40 19 C43.5 25, 47.5 33, 44 40 C41.5 44, 38.5 44, 36 40 C32.5 33, 36.5 25, 40 19 Z"
            fill="url(#brandLogoFlameGrad)"
          />
          <path
            d="M40 26 C41.5 30, 43 35, 42 38 C41 40, 39 40, 38 38 C37 35, 38.5 30, 40 26 Z"
            fill="#FFF8EB"
          />

          {/* Spiraling Divine Incense Mist */}
          <path
            d="M37 18 C35 13, 42 10, 44 6 C45 4, 43 2.5, 40 1.5"
            stroke={isLight ? '#FFFFFF' : '#DDE8D5'}
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          <path
            d="M43 20 C47 14, 41 9, 46 4 C48 2.5, 46 1, 44 0.5"
            stroke="#DFCA95"
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
            opacity="0.95"
          />

          <defs>
            <linearGradient id="brandLogoFlameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#A58547" />
              <stop offset="50%" stopColor="#C6A66A" />
              <stop offset="100%" stopColor="#FFF2D6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span
          className={`font-serif font-bold uppercase ${brandTitleSize} leading-none ${
            isLight ? 'text-brand-ivory' : 'text-brand-forest'
          }`}
        >
          AARADHYA
        </span>
        <span
          className={`font-sans font-semibold uppercase ${subtitleSize} mt-1 ${
            isLight ? 'text-brand-gold-light' : 'text-brand-gold'
          }`}
        >
          DIVINE MIST
        </span>
        {showTagline && (
          <span
            className={`font-serif italic ${taglineSize} tracking-normal mt-0.5 ${
              isLight ? 'text-brand-sage' : 'text-brand-text-muted'
            }`}
          >
            &ldquo;Way to connect your Aaradhya&rdquo;
          </span>
        )}
      </div>
    </Link>
  );
};
