const fs = require('fs');
const path = require('path');

function createCategorySVG(title, subtitle, accentColor, motifType) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="100%" height="100%">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#183B2C" />
        <stop offset="60%" stop-color="#0F261C" />
        <stop offset="100%" stop-color="#1A2D22" />
      </linearGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#DFCA95" />
        <stop offset="50%" stop-color="#C6A66A" />
        <stop offset="100%" stop-color="#9E824C" />
      </linearGradient>
      <radialGradient id="auraGrad" cx="50%" cy="45%" r="45%">
        <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.3" />
        <stop offset="70%" stop-color="#183B2C" stop-opacity="0.05" />
        <stop offset="100%" stop-color="#0F261C" stop-opacity="0" />
      </radialGradient>
      <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- Background -->
    <rect width="600" height="700" fill="url(#bgGrad)" />

    <!-- Delicate luxury border -->
    <rect x="25" y="25" width="550" height="650" fill="none" stroke="#C6A66A" stroke-width="1" stroke-opacity="0.35" />
    <rect x="33" y="33" width="534" height="634" fill="none" stroke="#DDE8D5" stroke-width="0.7" stroke-opacity="0.2" />

    <!-- Corner Vedic Flourishes -->
    <path d="M40 55 L55 55 L55 40" fill="none" stroke="#C6A66A" stroke-width="1.5" />
    <path d="M560 55 L545 55 L545 40" fill="none" stroke="#C6A66A" stroke-width="1.5" />
    <path d="M40 645 L55 645 L55 660" fill="none" stroke="#C6A66A" stroke-width="1.5" />
    <path d="M560 645 L545 645 L545 660" fill="none" stroke="#C6A66A" stroke-width="1.5" />

    <!-- Center Spiritual Aura -->
    <circle cx="300" cy="330" r="190" fill="url(#auraGrad)" />
    <circle cx="300" cy="330" r="150" fill="none" stroke="#C6A66A" stroke-width="0.8" stroke-dasharray="3 4" stroke-opacity="0.4" />
    <circle cx="300" cy="330" r="120" fill="none" stroke="#DDE8D5" stroke-width="1" stroke-opacity="0.25" />

    <!-- Incense Mist / Sacred Floral Illustration -->
    <g transform="translate(300, 330)">
      ${motifType === 'incense' ? `
        <!-- Incense Stick in Brass Holder -->
        <ellipse cx="0" cy="110" rx="45" ry="12" fill="url(#goldGrad)" filter="url(#softGlow)" />
        <ellipse cx="0" cy="110" rx="35" ry="8" fill="#F8F6ED" opacity="0.3" />
        <!-- Incense stick -->
        <line x1="0" y1="110" x2="-25" y2="-90" stroke="#DFCA95" stroke-width="3.5" stroke-linecap="round" />
        <circle cx="-25" cy="-90" r="3.5" fill="#FF8A65" filter="url(#softGlow)" />
        <!-- Glowing ember and delicate rising smoke -->
        <path d="M-25 -90 C-35 -130, -5 -160, -20 -200 C-35 -240, 10 -260, 0 -300" fill="none" stroke="#DDE8D5" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.65" />
        <path d="M-25 -90 C-15 -120, -40 -150, -25 -190 C-10 -230, -20 -270, -10 -290" fill="none" stroke="#C6A66A" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.5" />
      ` : motifType === 'floral' ? `
        <!-- Lotus / Flower Motif -->
        <path d="M0 60 C-40 20, -70 -20, -40 -70 C-10 -30, 0 10, 0 60 Z" fill="#DDE8D5" fill-opacity="0.25" stroke="#DFCA95" stroke-width="1" />
        <path d="M0 60 C40 20, 70 -20, 40 -70 C10 -30, 0 10, 0 60 Z" fill="#DDE8D5" fill-opacity="0.25" stroke="#DFCA95" stroke-width="1" />
        <path d="M0 60 C-25 10, -35 -40, 0 -90 C35 -40, 25 10, 0 60 Z" fill="url(#goldGrad)" fill-opacity="0.6" stroke="#FFFFFF" stroke-width="1" />
        <circle cx="0" cy="-20" r="10" fill="#FFD54F" filter="url(#softGlow)" />
        <!-- Rising petal fragrance mist -->
        <path d="M0 -90 C-20 -130, 15 -170, 0 -220" fill="none" stroke="#DDE8D5" stroke-width="2" stroke-dasharray="2 3" opacity="0.7" />
      ` : motifType === 'dhoop' ? `
        <!-- Traditional Conical Dhoop on Brass Platter -->
        <ellipse cx="0" cy="90" rx="60" ry="16" fill="url(#goldGrad)" />
        <path d="M-25 90 L0 10 L25 90 Z" fill="#2E4A3B" stroke="#DFCA95" stroke-width="1.5" />
        <circle cx="0" cy="10" r="4" fill="#FFA726" filter="url(#softGlow)" />
        <!-- Sacred Sambrani Cloud -->
        <path d="M0 10 C-30 -30, 20 -60, -10 -100 C-40 -140, 30 -170, 0 -220" fill="none" stroke="#F8F6ED" stroke-width="3" stroke-linecap="round" opacity="0.6" />
      ` : `
        <!-- Royal Gift Box Motif -->
        <rect x="-60" y="-10" width="120" height="100" rx="4" fill="#183B2C" stroke="#DFCA95" stroke-width="2" />
        <line x1="0" y1="-10" x2="0" y2="90" stroke="url(#goldGrad)" stroke-width="10" />
        <line x1="-60" y1="40" x2="60" y2="40" stroke="url(#goldGrad)" stroke-width="10" />
        <!-- Ribbon bow -->
        <ellipse cx="-15" cy="-20" rx="18" ry="10" fill="none" stroke="#DFCA95" stroke-width="3" transform="rotate(-25 -15 -20)" />
        <ellipse cx="15" cy="-20" rx="18" ry="10" fill="none" stroke="#DFCA95" stroke-width="3" transform="rotate(25 15 -20)" />
        <circle cx="0" cy="-15" r="7" fill="#C6A66A" />
      `}
    </g>

    <!-- Bottom Text Panel -->
    <g transform="translate(300, 560)">
      <text x="0" y="0" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="28" font-weight="700" letter-spacing="4" fill="#F8F6ED">
        ${title.toUpperCase()}
      </text>
      <line x1="-50" y1="16" x2="50" y2="16" stroke="#C6A66A" stroke-width="1.5" />
      <text x="0" y="38" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" letter-spacing="3" fill="#DDE8D5">
        ${subtitle.toUpperCase()}
      </text>
      <text x="0" y="60" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="14" font-style="italic" fill="#C6A66A">
        Explore Sacred Fragrance →
      </text>
    </g>
  </svg>`;
}

function createProductSVG(name, category, price, accentColor, imageType) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 550" width="100%" height="100%">
    <defs>
      <linearGradient id="prodBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FDFBF7" />
        <stop offset="100%" stop-color="#F3EFE6" />
      </linearGradient>
      <linearGradient id="goldGradProd" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#DFCA95" />
        <stop offset="50%" stop-color="#C6A66A" />
        <stop offset="100%" stop-color="#9E824C" />
      </linearGradient>
      <radialGradient id="pedestalGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#DDE8D5" stop-opacity="0.6" />
        <stop offset="100%" stop-color="#F3EFE6" stop-opacity="0" />
      </radialGradient>
      <filter id="prodShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#183B2C" flood-opacity="0.14" />
      </filter>
    </defs>

    <!-- Canvas -->
    <rect width="500" height="550" fill="url(#prodBg)" />

    <!-- Subtle luxury inner border -->
    <rect x="18" y="18" width="464" height="514" fill="none" stroke="#C6A66A" stroke-width="0.7" stroke-opacity="0.3" />

    <!-- Brand Emblem watermark -->
    <circle cx="250" cy="220" r="140" fill="url(#pedestalGrad)" />
    <circle cx="250" cy="220" r="110" fill="none" stroke="#C6A66A" stroke-width="0.8" stroke-dasharray="2 3" stroke-opacity="0.25" />

    <!-- Pedestal Shadow -->
    <ellipse cx="250" cy="380" rx="140" ry="24" fill="#183B2C" opacity="0.08" />

    <!-- Product Package Rendering -->
    <g transform="translate(250, 220)" filter="url(#prodShadow)">
      ${imageType === 'box' ? `
        <!-- Luxury Presentation Box -->
        <rect x="-90" y="-120" width="180" height="240" rx="6" fill="#183B2C" stroke="#C6A66A" stroke-width="2" />
        <!-- Gold foil border on box -->
        <rect x="-80" y="-110" width="160" height="220" fill="none" stroke="#DFCA95" stroke-width="1" />
        <!-- Emblem inside box -->
        <circle cx="0" cy="-50" r="26" fill="#25533F" stroke="#C6A66A" stroke-width="1.2" />
        <path d="M0 -62 C3 -57, 6 -52, 4 -47 C2 -44, -2 -44, -4 -47 C-6 -52, -3 -57, 0 -62 Z" fill="#DFCA95" />
        <!-- Gold Text on Box -->
        <text x="0" y="-10" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="14" font-weight="700" letter-spacing="3" fill="#F8F6ED">
          AARADHYA
        </text>
        <text x="0" y="6" text-anchor="middle" font-family="'Inter', sans-serif" font-size="7" letter-spacing="4" fill="#C6A66A">
          DIVINE MIST
        </text>
        <line x1="-40" y1="18" x2="40" y2="18" stroke="#C6A66A" stroke-width="0.8" />
        <text x="0" y="36" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="12" font-style="italic" fill="#DDE8D5">
          ${name.split(' ')[0]}
        </text>
        <!-- Incense sticks leaning alongside box -->
        <line x1="80" y1="120" x2="115" y2="-90" stroke="#8D6E63" stroke-width="3" stroke-linecap="round" />
        <line x1="90" y1="120" x2="125" y2="-80" stroke="#8D6E63" stroke-width="3" stroke-linecap="round" />
        <line x1="100" y1="120" x2="135" y2="-85" stroke="#8D6E63" stroke-width="3" stroke-linecap="round" />
        <!-- Incense smoke plume -->
        <path d="M115 -90 C125 -130, 95 -160, 110 -190" fill="none" stroke="#A58547" stroke-width="1.5" stroke-opacity="0.6" stroke-linecap="round" />
      ` : imageType === 'dhoop' ? `
        <!-- Dhoop Jar and Sticks -->
        <rect x="-65" y="-70" width="130" height="170" rx="8" fill="#183B2C" stroke="#C6A66A" stroke-width="2" />
        <ellipse cx="0" cy="-70" rx="65" ry="16" fill="#DFCA95" stroke="#A58547" stroke-width="1" />
        <text x="0" y="0" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="16" font-weight="bold" fill="#F8F6ED">
          DIVINE DHOOP
        </text>
        <text x="0" y="20" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8" letter-spacing="2" fill="#C6A66A">
          VEDIC HAVAN
        </text>
        <rect x="75" y="10" width="16" height="85" rx="3" fill="#3E2723" stroke="#8D6E63" stroke-width="1" />
        <circle cx="83" cy="10" r="3" fill="#FF7043" />
        <path d="M83 10 C70 -20, 100 -40, 85 -70" fill="none" stroke="#183B2C" stroke-width="1.8" opacity="0.4" />
      ` : `
        <!-- Aaradhya Pooja Kit Deluxe Box -->
        <rect x="-120" y="-90" width="240" height="190" rx="8" fill="#183B2C" stroke="url(#goldGradProd)" stroke-width="3" />
        <rect x="-110" y="-80" width="220" height="170" fill="none" stroke="#DFCA95" stroke-width="1" stroke-opacity="0.5" />
        <circle cx="0" cy="-20" r="35" fill="#25533F" stroke="#C6A66A" stroke-width="1.5" />
        <text x="0" y="-14" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="18" font-weight="bold" fill="#F8F6ED">
          AARADHYA
        </text>
        <text x="0" y="4" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8" letter-spacing="3" fill="#DFCA95">
          POOJA KIT
        </text>
        <text x="0" y="45" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="13" font-style="italic" fill="#DDE8D5">
          Pure Brass Diya &amp; Sacred Scents
        </text>
      `}
    </g>

    <!-- Top Badge -->
    <g transform="translate(38, 42)">
      <rect x="0" y="0" width="110" height="24" rx="12" fill="#183B2C" />
      <text x="55" y="16" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9.5" font-weight="600" letter-spacing="1" fill="#DFCA95">
        100% NATURAL
      </text>
    </g>

    <!-- Bottom Info Overlay -->
    <g transform="translate(250, 485)">
      <text x="0" y="0" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="20" font-weight="700" fill="#183B2C">
        ${name}
      </text>
      <text x="0" y="20" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" letter-spacing="1.5" fill="#55645A">
        ${category.toUpperCase()} • ₹${price}
      </text>
    </g>
  </svg>`;
}

// Generate Categories
const categories = [
  { file: 'agarbatti.png', title: 'Premium Agarbatti', subtitle: 'Hand-dipped Divine Scents', color: '#DDE8D5', motif: 'incense' },
  { file: 'floral.png', title: 'Floral Collection', subtitle: 'Temple Flower Distillations', color: '#F8BBD0', motif: 'floral' },
  { file: 'sandalwood.png', title: 'Sandalwood Collection', subtitle: 'Authentic Mysore Chandan', color: '#DFCA95', motif: 'incense' },
  { file: 'pooja-essentials.png', title: 'Daily Pooja Essentials', subtitle: 'Pure Camphor & Brass Diyas', color: '#FFF9C4', motif: 'dhoop' },
  { file: 'dhoop.png', title: 'Dhoop Collection', subtitle: 'Desi Cow Dung & Loban', color: '#C8E6C9', motif: 'dhoop' },
  { file: 'gifts.png', title: 'Gift Collections', subtitle: 'Royal Festive Presentation', color: '#DFCA95', motif: 'gift' },
];

const catDir = path.join(__dirname, '..', 'public', 'images', 'categories');
categories.forEach(c => {
  fs.writeFileSync(path.join(catDir, c.file), createCategorySVG(c.title, c.subtitle, c.color, c.motif));
});

// Generate Products
const products = [
  { file: 'sandalwood.png', name: 'Sandalwood Essence', category: 'Sandalwood Collection', price: 349, color: '#DFCA95', type: 'box' },
  { file: 'sandalwood-detail.png', name: 'Mysore Chandan Sticks', category: 'Sandalwood Collection', price: 349, color: '#DFCA95', type: 'box' },
  { file: 'rose.png', name: 'Divine Rose Agarbatti', category: 'Floral Collection', price: 299, color: '#F8BBD0', type: 'box' },
  { file: 'rose-detail.png', name: 'Damask Rose Petal Scent', category: 'Floral Collection', price: 299, color: '#F8BBD0', type: 'box' },
  { file: 'mogra.png', name: 'Mogra Bliss Agarbatti', category: 'Floral Collection', price: 320, color: '#E0F2F1', type: 'box' },
  { file: 'lavender.png', name: 'Lavender Calm Incense', category: 'Premium Agarbatti', price: 310, color: '#E1BEE7', type: 'box' },
  { file: 'dhoop.png', name: 'Divine Cow Dung Dhoop', category: 'Dhoop Collection', price: 275, color: '#D7CCC8', type: 'dhoop' },
  { file: 'gift-kit.png', name: 'Aaradhya Pooja Kit', category: 'Gift Collections', price: 1499, color: '#DFCA95', type: 'kit' },
  { file: 'gift-kit-inside.png', name: 'Royal Gift Box Inside', category: 'Gift Collections', price: 1499, color: '#DFCA95', type: 'kit' },
];

const prodDir = path.join(__dirname, '..', 'public', 'images', 'products');
products.forEach(p => {
  fs.writeFileSync(path.join(prodDir, p.file), createProductSVG(p.name, p.category, p.price, p.color, p.type));
});

console.log('Successfully generated all category and product assets!');
