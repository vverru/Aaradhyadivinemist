import fs from 'fs';
import path from 'path';
import {
  Category,
  Product,
  Order,
  Coupon,
  Review,
  StoreSettings,
  OrderStatus,
  PaymentStatus,
} from '@/types';

const DB_PATH = path.join(process.cwd(), 'database', 'data.json');

// Default initial settings
export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  brandName: 'AARADHYA DIVINE MIST',
  tagline: 'Way to connect your Aaradhya',
  supportEmail: 'care@aaradhyadivinemist.com',
  supportPhone: '+91 98765 43210',
  supportWhatsApp: '+91 98765 43210',
  address: 'Aaradhya Divine Fragrances Pvt Ltd, 108 Sacred Grove, Udyog Vihar, Gurugram, Haryana 122016, India',
  currency: 'INR',
  freeShippingThreshold: 799,
  standardShippingFee: 60,
  expressShippingFee: 120,
  taxRatePercent: 18,
  legalMetrologyManufacturer: 'Aaradhya Divine Fragrances Pvt Ltd, Survey No. 44, Fragrance Valley, Mysore, Karnataka 570008',
  legalMetrologyPacker: 'Aaradhya Divine Fragrances Pvt Ltd, Unit 2, Logistics Park, Gurugram, Haryana 122016',
  legalMetrologyConsumerCare: 'Manager - Consumer Care, Aaradhya Divine Fragrances Pvt Ltd. Email: care@aaradhyadivinemist.com | Toll-Free: 1800-208-1080',
  legalMetrologyGrievanceOfficer: 'Nodal & Grievance Redressal Officer: grievances@aaradhyadivinemist.com',
  razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || '',
  shiprocketEmail: process.env.SHIPROCKET_EMAIL || '',
  shiprocketPassword: process.env.SHIPROCKET_PASSWORD || '',
  enableCod: true,
};

// Initial Categories mandated by Section 14
export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Premium Agarbatti',
    slug: 'premium-agarbatti',
    description: 'Slow-burning, charcoal-free spiritual incense sticks hand-dipped in pure natural essential oils.',
    image: '/images/categories/agarbatti.png',
    featured: true,
  },
  {
    id: 'cat-2',
    name: 'Floral Collection',
    slug: 'floral-collection',
    description: 'Exquisite aromas distilled from temple-offered holy flowers including Damask Rose, Mogra, and Parijat.',
    image: '/images/categories/floral.png',
    featured: true,
  },
  {
    id: 'cat-3',
    name: 'Sandalwood Collection',
    slug: 'sandalwood-collection',
    description: 'Authentic Mysore Chandan with divine earthy undertones that ground the senses in sacred stillness.',
    image: '/images/categories/sandalwood.png',
    featured: true,
  },
  {
    id: 'cat-4',
    name: 'Daily Pooja Essentials',
    slug: 'daily-pooja-essentials',
    description: 'Pure Bhimseni camphor, natural cow ghee wicks, brass diyas and sacred havan ingredients.',
    image: '/images/categories/pooja-essentials.png',
    featured: true,
  },
  {
    id: 'cat-5',
    name: 'Dhoop Collection',
    slug: 'dhoop-collection',
    description: 'Traditional charcoal-free wet and dry dhoop sticks made with indigenous desi cow dung, loban, and guggul.',
    image: '/images/categories/dhoop.png',
    featured: true,
  },
  {
    id: 'cat-6',
    name: 'Gift Collections',
    slug: 'gift-collections',
    description: 'Curated royal gift boxes in gold-embossed ivory casings, crafted for festive gifting and housewarmings.',
    image: '/images/categories/gifts.png',
    featured: true,
  },
];

// Initial Products mandated by Section 14
// Initial status set to 'published' so customer preview is rich, but fully editable in Admin!
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-sandalwood-essence',
    name: 'Sandalwood Essence Agarbatti',
    slug: 'sandalwood-essence-agarbatti',
    tagline: 'Pure Mysore Chandan Incense for Deep Contemplation',
    categorySlug: 'sandalwood-collection',
    categoryName: 'Sandalwood Collection',
    fragranceNotes: ['Pure Mysore Sandalwood', 'Sacred Woodbark', 'Warm Amber'],
    price: 349,
    mrp: 450,
    packSize: 'Pack of 50 Sticks (120g)',
    stock: 85,
    lowStockThreshold: 15,
    images: ['/images/products/sandalwood.png', '/images/products/sandalwood-detail.png'],
    description: 'Immerse your sanctuary in the timeless serenity of Sandalwood Essence. Handcrafted using authentic Indian sandalwood powder and therapeutic essential oils, these sticks burn smoothly without emitting black soot, filling your pooja room with an aura of tranquil divinity.',
    features: [
      '100% Charcoal-free & Non-toxic',
      'Infused with pure sandalwood essential oils',
      '45-50 minutes soothing burn time per stick',
      'Certified organic bamboo core',
      'Leaves zero choking chemical residue',
    ],
    specifications: {
      burnTime: '45 to 50 minutes per stick',
      stickLength: '9 inches (approx. 23 cm)',
      fragranceFamily: 'Sacred Woody & Amber',
      naturalIngredients: 'Mysore Sandalwood dust, natural resins, botanical gums, essential oils',
      origin: 'Mysore, Karnataka, India',
      netQuantity: '50 Luxury Sticks (120 gms)',
      packageDimensions: '25cm x 6cm x 3cm',
      manufacturerDetails: 'Aaradhya Divine Fragrances Pvt Ltd, Survey No. 44, Fragrance Valley, Mysore, Karnataka 570008',
      packerDetails: 'Aaradhya Divine Fragrances Pvt Ltd, Unit 2, Gurugram, Haryana 122016',
      consumerCare: 'care@aaradhyadivinemist.com | 1800-208-1080',
    },
    usageInstructions: [
      'Hold the tip of the incense stick over a lit diya or matchstick.',
      'Allow the flame to catch for 5-10 seconds.',
      'Gently blow out the flame to reveal a glowing red ember.',
      'Place in an incense holder on a heat-resistant surface away from draughts.',
    ],
    safetyInstructions: [
      'Never leave burning incense unattended.',
      'Keep away from flammable items, curtains, and children.',
      'Use in well-ventilated prayer spaces.',
    ],
    status: 'published',
    isFeatured: true,
    isBestseller: true,
    isNewArrival: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-divine-rose',
    name: 'Divine Rose Incense Sticks',
    slug: 'divine-rose-incense-sticks',
    tagline: 'Distilled Indian Damask Rose for Devotional Harmony',
    categorySlug: 'floral-collection',
    categoryName: 'Floral Collection',
    fragranceNotes: ['Damask Rose Petals', 'Morning Dew', 'Sweet Geranium'],
    price: 299,
    mrp: 399,
    packSize: 'Pack of 45 Sticks (110g)',
    stock: 120,
    lowStockThreshold: 20,
    images: ['/images/products/rose.png', '/images/products/rose-detail.png'],
    description: 'Divine Rose embodies the sacred beauty of fresh morning offerings. Each stick is infused with cold-pressed rose extracts that evoke the serenity of temple sanctums, awakening feelings of spiritual gratitude and heartfelt joy.',
    features: [
      'Handcrafted with recycled temple-offered rose blossoms',
      'Soot-free soothing aromatic smoke',
      'Elevates meditation and daily aarti',
      'Contains zero synthetic phthalates or parabens',
    ],
    specifications: {
      burnTime: '40 to 45 minutes',
      stickLength: '9 inches',
      fragranceFamily: 'Exquisite Floral',
      naturalIngredients: 'Damask Rose extracts, natural resins, wood powder',
      origin: 'Kannauj & Pushkar, India',
      netQuantity: '45 Sticks (110 gms)',
      manufacturerDetails: 'Aaradhya Divine Fragrances Pvt Ltd',
      packerDetails: 'Aaradhya Divine Fragrances Pvt Ltd',
      consumerCare: 'care@aaradhyadivinemist.com',
    },
    usageInstructions: [
      'Light the tip until glowing.',
      'Extinguish flame gently.',
      'Place in a ceramic or brass incense holder.',
    ],
    safetyInstructions: [
      'Place on stable, non-flammable stands.',
      'Keep away from drafty corridors.',
    ],
    status: 'published',
    isFeatured: true,
    isBestseller: false,
    isNewArrival: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-mogra-bliss',
    name: 'Mogra Bliss Agarbatti',
    slug: 'mogra-bliss-agarbatti',
    tagline: 'Nocturnal Arabian Jasmine for Sacred Peace',
    categorySlug: 'floral-collection',
    categoryName: 'Floral Collection',
    fragranceNotes: ['Fresh Mogra', 'Night Jasmine', 'Subtle Lily'],
    price: 320,
    mrp: 420,
    packSize: 'Pack of 50 Sticks (120g)',
    stock: 64,
    lowStockThreshold: 10,
    images: ['/images/products/mogra.png'],
    description: 'Capture the enchanting bliss of midnight Mogra blossoms. Known as the flower of the gods, this fragrance creates an atmosphere of spiritual purity and gentle bliss in your household.',
    features: [
      'Pure organic jasmine attar infusion',
      'Charcoal-free smooth burn',
      'Long-lasting lingering aroma',
    ],
    specifications: {
      burnTime: '45 minutes',
      stickLength: '9 inches',
      fragranceFamily: 'White Floral',
      origin: 'Madurai, Tamil Nadu, India',
      netQuantity: '50 Sticks (120 gms)',
    },
    usageInstructions: ['Light tip, blow out flame after 10 seconds, place in incense stand.'],
    safetyInstructions: ['Keep out of reach of young children and pets.'],
    status: 'published',
    isFeatured: true,
    isBestseller: true,
    isNewArrival: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-lavender-calm',
    name: 'Lavender Calm Incense Sticks',
    slug: 'lavender-calm-incense-sticks',
    tagline: 'Kashmiri Lavender to Ease the Mind & Sanctify Spaces',
    categorySlug: 'premium-agarbatti',
    categoryName: 'Premium Agarbatti',
    fragranceNotes: ['Kashmiri Lavender', 'Mountain Sage', 'Chamomile'],
    price: 310,
    mrp: 399,
    packSize: 'Pack of 45 Sticks (100g)',
    stock: 92,
    lowStockThreshold: 15,
    images: ['/images/products/lavender.png'],
    description: 'Crafted with premium high-altitude lavender harvested from the Kashmir valley, Lavender Calm combines restorative therapeutic benefits with traditional spiritual grounding.',
    features: [
      'Pure Kashmiri botanical essential oils',
      'Aids evening meditation and restful prayer',
      'Zero artificial fixatives',
    ],
    specifications: {
      burnTime: '45 minutes',
      stickLength: '9 inches',
      fragranceFamily: 'Herbal & Floral',
      origin: 'Kashmir Valley, India',
      netQuantity: '45 Sticks (100 gms)',
    },
    usageInstructions: ['Ignite tip, wait for flame, blow out, sit back in quiet meditation.'],
    safetyInstructions: ['Ensure incense holder catches all falling ash.'],
    status: 'published',
    isFeatured: false,
    isBestseller: false,
    isNewArrival: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-divine-dhoop',
    name: 'Divine Dhoop Pure Cow Dung & Loban Sticks',
    slug: 'divine-dhoop-cow-dung-loban-sticks',
    tagline: 'Vedic Purification with Indigenous Gir Cow Gavyam & Sambrani',
    categorySlug: 'dhoop-collection',
    categoryName: 'Dhoop Collection',
    fragranceNotes: ['Pure Loban (Benzoin)', 'Natural Guggul', 'Desi Cow Dung Herbs', 'Bhimseni Camphor'],
    price: 275,
    mrp: 350,
    packSize: 'Pack of 30 Thick Dhoop Sticks (150g)',
    stock: 140,
    lowStockThreshold: 25,
    images: ['/images/products/dhoop.png'],
    description: 'Revive ancient Vedic havan rituals in your living room. Made using sacred indigenous Gir cow dung, gum benzoin (loban), guggul, and authentic sambrani, these dense dhoop sticks naturally cleanse negative energy and repel insects.',
    features: [
      '100% Bamboo-free & Charcoal-free',
      'Sacred Vedic Havan formulation',
      'Thick, long-burning purifying smoke',
      'Includes ceramic holder in every pack',
    ],
    specifications: {
      burnTime: '35 to 40 minutes per stick',
      stickLength: '4.5 inches (Thick cylindrical dhoop)',
      fragranceFamily: 'Vedic Resinous & Earthy',
      origin: 'Vrindavan, Uttar Pradesh, India',
      netQuantity: '30 Dhoop Sticks + 1 Ceramic Holder (150 gms)',
    },
    usageInstructions: [
      'Hold dhoop stick vertically over flame until the entire top circumference glows.',
      'Blow out gently and place on the ceramic holder provided.',
    ],
    safetyInstructions: ['Place ceramic holder over a fireproof plate.'],
    status: 'published',
    isFeatured: true,
    isBestseller: true,
    isNewArrival: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-aaradhya-pooja-kit',
    name: 'Aaradhya Divine Pooja Kit',
    slug: 'aaradhya-divine-pooja-kit',
    tagline: 'Complete Sacred Festival and Griha Pravesh Collection',
    categorySlug: 'gift-collections',
    categoryName: 'Gift Collections',
    fragranceNotes: ['Mysore Chandan', 'Damask Rose', 'Bhimseni Camphor', 'Natural Dhoop'],
    price: 1499,
    mrp: 1999,
    packSize: 'Royal Gold-Embossed Gift Box (Set of 6 Essentials)',
    stock: 45,
    lowStockThreshold: 8,
    images: ['/images/products/gift-kit.png', '/images/products/gift-kit-inside.png'],
    description: 'The crowning jewel of our collection. Aaradhya Divine Pooja Kit brings together all spiritual essentials in a regal ivory and champagne-gold gift box. Includes Sandalwood Agarbatti, Divine Rose sticks, Gir Cow Loban Dhoop, 100g Pure Bhimseni Camphor, Brass Diya, and Handcrafted Brass Incense Stand.',
    features: [
      'Luxury gift packaging with magnetic ribbon clasp',
      'Authentic pure brass diya & incense holder included',
      'Ideal for Diwali, Housewarmings, Weddings, and Daily Devotion',
      'Contains 6 handpicked divine essentials',
    ],
    specifications: {
      fragranceFamily: 'Royal Temple Bouquet',
      origin: 'Handcrafted in India',
      netQuantity: '1 Deluxe Box (6 items, 850 gms gross weight)',
      packageDimensions: '32cm x 24cm x 8cm',
    },
    usageInstructions: ['Perfect for gifting or inaugurating auspicious occasions.'],
    safetyInstructions: ['Handle handcrafted brassware with dry hands.'],
    status: 'published',
    isFeatured: true,
    isBestseller: true,
    isNewArrival: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Initial Coupons
export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'DIVINE10',
    description: '10% discount on all spiritual fragrances',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 499,
    maxDiscount: 200,
    validUntil: '2027-12-31T23:59:59Z',
    isActive: true,
    usageCount: 18,
  },
  {
    id: 'coup-2',
    code: 'FIRSTAARADHYA',
    description: 'Flat ₹150 off on your first sacred purchase',
    discountType: 'fixed',
    discountValue: 150,
    minOrderValue: 799,
    validUntil: '2027-12-31T23:59:59Z',
    isActive: true,
    usageCount: 42,
  },
  {
    id: 'coup-3',
    code: 'FESTIVE15',
    description: '15% off on orders above ₹1,200',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 1200,
    maxDiscount: 500,
    validUntil: '2027-12-31T23:59:59Z',
    isActive: true,
    usageCount: 9,
  },
];

// Initial Verified Reviews (authentic, product-associated)
export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-sandalwood-essence',
    productName: 'Sandalwood Essence Agarbatti',
    customerName: 'Ananya Sharma',
    customerLocation: 'Bengaluru, Karnataka',
    rating: 5,
    title: 'Pure Mysore Sandalwood aroma without smoke irritation!',
    comment: 'Most commercial agarbattis give me a headache from chemical perfumes, but Aaradhya Divine Mist is noticeably natural and clean. The chandan note is subtle, authentic, and lasts for hours after our morning puja.',
    isVerifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-10-14T09:30:00Z',
  },
  {
    id: 'rev-2',
    productId: 'prod-divine-dhoop',
    productName: 'Divine Dhoop Pure Cow Dung & Loban Sticks',
    customerName: 'Rajesh Venkat',
    customerLocation: 'Chennai, Tamil Nadu',
    rating: 5,
    title: 'Brings true temple energy into the home',
    comment: 'The loban and sambrani formulation is superb. We use it every evening during sandhya aarti. The sticks burn steadily and leave a peaceful sacred fragrance that lingers till next morning.',
    isVerifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-10-22T14:15:00Z',
  },
  {
    id: 'rev-3',
    productId: 'prod-aaradhya-pooja-kit',
    productName: 'Aaradhya Divine Pooja Kit',
    customerName: 'Pooja Agarwal',
    customerLocation: 'Jaipur, Rajasthan',
    rating: 5,
    title: 'Exquisite gifting box for Griha Pravesh',
    comment: 'Ordered 5 sets as return gifts for our housewarming ceremony. The ivory and gold packaging looked exceptionally royal, and the brass diya inside is solid and beautifully finished.',
    isVerifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-10-29T18:00:00Z',
  },
  {
    id: 'rev-4',
    productId: 'prod-divine-rose',
    productName: 'Divine Rose Incense Sticks',
    customerName: 'Vikramaditya Rao',
    customerLocation: 'Hyderabad, Telangana',
    rating: 5,
    title: 'Soothing Damask rose aroma',
    comment: 'Soft, gentle, and utterly divine. You can tell real rose petals are used instead of synthetic room freshener sprays. Wonderful product.',
    isVerifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-11-02T11:20:00Z',
  },
];

// Initial Orders for Admin verification & tracking demonstration
export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'ADM-2026-1001',
    customerName: 'Sunita Deshmukh',
    customerEmail: 'sunita.deshmukh@gmail.com',
    customerPhone: '+91 98201 12345',
    shippingAddress: {
      fullName: 'Sunita Deshmukh',
      email: 'sunita.deshmukh@gmail.com',
      phone: '+91 98201 12345',
      houseFlat: 'A-402, Shivam Enclave',
      street: '14th Cross Road',
      area: 'Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      isDefault: true,
    },
    items: [
      {
        productId: 'prod-sandalwood-essence',
        productName: 'Sandalwood Essence Agarbatti',
        packSize: 'Pack of 50 Sticks (120g)',
        price: 349,
        mrp: 450,
        quantity: 2,
        image: '/images/products/sandalwood.png',
        subtotal: 698,
      },
      {
        productId: 'prod-divine-dhoop',
        productName: 'Divine Dhoop Pure Cow Dung & Loban Sticks',
        packSize: 'Pack of 30 Thick Dhoop Sticks (150g)',
        price: 275,
        mrp: 350,
        quantity: 1,
        image: '/images/products/dhoop.png',
        subtotal: 275,
      },
    ],
    subtotal: 973,
    discount: 150,
    couponCode: 'FIRSTAARADHYA',
    shippingFee: 0,
    tax: 0,
    grandTotal: 823,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'upi',
    razorpayOrderId: 'order_NYz1A8fK9xL201',
    razorpayPaymentId: 'pay_NYz2B3cK8mM301',
    shiprocketShipmentId: 'SR1089274',
    awbNumber: 'BLUEDART78942105',
    courierName: 'Blue Dart Express',
    trackingUrl: 'https://track.aaradhyadivinemist.com?awb=BLUEDART78942105',
    notes: 'Delivered securely to recipient.',
    createdAt: '2026-11-04T10:15:00Z',
    updatedAt: '2026-11-07T14:30:00Z',
  },
  {
    id: 'ord-1002',
    orderNumber: 'ADM-2026-1002',
    customerName: 'Arjun Mehta',
    customerEmail: 'arjun.mehta@outlook.com',
    customerPhone: '+91 99887 76655',
    shippingAddress: {
      fullName: 'Arjun Mehta',
      email: 'arjun.mehta@outlook.com',
      phone: '+91 99887 76655',
      houseFlat: 'Flat 12B, Sky Tower',
      street: 'Golf Course Extension',
      area: 'Sector 65',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122018',
      isDefault: true,
    },
    items: [
      {
        productId: 'prod-aaradhya-pooja-kit',
        productName: 'Aaradhya Divine Pooja Kit',
        packSize: 'Royal Gold-Embossed Gift Box (Set of 6 Essentials)',
        price: 1499,
        mrp: 1999,
        quantity: 1,
        image: '/images/products/gift-kit.png',
        subtotal: 1499,
      },
    ],
    subtotal: 1499,
    discount: 149.9,
    couponCode: 'DIVINE10',
    shippingFee: 0,
    tax: 0,
    grandTotal: 1349.1,
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'razorpay',
    razorpayOrderId: 'order_OLa9C7mR4kP102',
    razorpayPaymentId: 'pay_OLb1D2nS5lQ202',
    shiprocketShipmentId: 'SR1094821',
    awbNumber: 'DELHIVERY84729103',
    courierName: 'Delhivery Surface',
    trackingUrl: 'https://track.aaradhyadivinemist.com?awb=DELHIVERY84729103',
    notes: 'Out for transit from Delhi Hub.',
    createdAt: '2026-11-09T08:45:00Z',
    updatedAt: '2026-11-10T12:00:00Z',
  },
];

interface DatabaseData {
  categories: Category[];
  products: Product[];
  coupons: Coupon[];
  reviews: Review[];
  orders: Order[];
  settings: StoreSettings;
  newsletter: { email: string; subscribedAt: string }[];
  inventoryLogs: { id: string; productId: string; change: number; reason: string; timestamp: string }[];
}

function ensureDataFile(): DatabaseData {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(DB_PATH)) {
      const initialData: DatabaseData = {
        categories: INITIAL_CATEGORIES,
        products: INITIAL_PRODUCTS,
        coupons: INITIAL_COUPONS,
        reviews: INITIAL_REVIEWS,
        orders: INITIAL_ORDERS,
        settings: DEFAULT_STORE_SETTINGS,
        newsletter: [{ email: 'welcome@aaradhyadivinemist.com', subscribedAt: new Date().toISOString() }],
        inventoryLogs: [],
      };
      fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }

    const fileContent = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading database file:', error);
    return {
      categories: INITIAL_CATEGORIES,
      products: INITIAL_PRODUCTS,
      coupons: INITIAL_COUPONS,
      reviews: INITIAL_REVIEWS,
      orders: INITIAL_ORDERS,
      settings: DEFAULT_STORE_SETTINGS,
      newsletter: [],
      inventoryLogs: [],
    };
  }
}

function writeDataFile(data: DatabaseData) {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// -------------------------------------------------------------
// PUBLIC API METHODS
// -------------------------------------------------------------

// Categories
export function getCategories(): Category[] {
  const db = ensureDataFile();
  return db.categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const db = ensureDataFile();
  return db.categories.find((c) => c.slug === slug);
}

export function saveCategory(category: Category): Category {
  const db = ensureDataFile();
  const index = db.categories.findIndex((c) => c.id === category.id || c.slug === category.slug);
  if (index >= 0) {
    db.categories[index] = { ...db.categories[index], ...category };
  } else {
    db.categories.push(category);
  }
  writeDataFile(db);
  return category;
}

// Products
export function getProducts(options?: {
  category?: string;
  status?: 'draft' | 'published' | 'all';
  search?: string;
  fragrance?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}): Product[] {
  const db = ensureDataFile();
  let list = db.products;

  // Filter by status (default to published for store, all for admin)
  if (options?.status && options.status !== 'all') {
    list = list.filter((p) => p.status === options.status);
  } else if (!options?.status) {
    list = list.filter((p) => p.status === 'published');
  }

  // Filter by category
  if (options?.category && options.category !== 'all') {
    list = list.filter((p) => p.categorySlug === options.category);
  }

  // Filter by search
  if (options?.search) {
    const q = options.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.fragranceNotes.some((n) => n.toLowerCase().includes(q))
    );
  }

  // Filter by fragrance
  if (options?.fragrance) {
    const f = options.fragrance.toLowerCase();
    list = list.filter((p) =>
      p.fragranceNotes.some((n) => n.toLowerCase().includes(f))
    );
  }

  // Filter by price
  if (typeof options?.minPrice === 'number') {
    list = list.filter((p) => p.price >= options.minPrice!);
  }
  if (typeof options?.maxPrice === 'number') {
    list = list.filter((p) => p.price <= options.maxPrice!);
  }

  // Sorting
  if (options?.sort) {
    switch (options.sort) {
      case 'price-low':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        list = [...list].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'popularity':
      default:
        list = [...list].sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
    }
  }

  return list;
}

export function getProductBySlug(slug: string): Product | undefined {
  const db = ensureDataFile();
  return db.products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  const db = ensureDataFile();
  return db.products.find((p) => p.id === id);
}

export function saveProduct(product: Product): Product {
  const db = ensureDataFile();
  const index = db.products.findIndex((p) => p.id === product.id);
  const now = new Date().toISOString();

  if (index >= 0) {
    db.products[index] = {
      ...db.products[index],
      ...product,
      updatedAt: now,
    };
  } else {
    db.products.push({
      ...product,
      createdAt: now,
      updatedAt: now,
    });
  }
  writeDataFile(db);
  return product;
}

export function deleteProduct(id: string): boolean {
  const db = ensureDataFile();
  const initialLength = db.products.length;
  db.products = db.products.filter((p) => p.id !== id);
  if (db.products.length !== initialLength) {
    writeDataFile(db);
    return true;
  }
  return false;
}

// Coupons
export function getCoupons(): Coupon[] {
  const db = ensureDataFile();
  return db.coupons;
}

export function getCouponByCode(code: string): Coupon | undefined {
  const db = ensureDataFile();
  return db.coupons.find(
    (c) => c.code.toUpperCase() === code.toUpperCase() && c.isActive
  );
}

export function saveCoupon(coupon: Coupon): Coupon {
  const db = ensureDataFile();
  const index = db.coupons.findIndex((c) => c.id === coupon.id || c.code === coupon.code);
  if (index >= 0) {
    db.coupons[index] = coupon;
  } else {
    db.coupons.push(coupon);
  }
  writeDataFile(db);
  return coupon;
}

export function deleteCoupon(id: string): boolean {
  const db = ensureDataFile();
  const len = db.coupons.length;
  db.coupons = db.coupons.filter((c) => c.id !== id);
  if (db.coupons.length !== len) {
    writeDataFile(db);
    return true;
  }
  return false;
}

// Orders
export function getOrders(status?: OrderStatus): Order[] {
  const db = ensureDataFile();
  if (status) {
    return db.orders.filter((o) => o.status === status);
  }
  return [...db.orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getOrderById(id: string): Order | undefined {
  const db = ensureDataFile();
  return db.orders.find((o) => o.id === id || o.orderNumber === id);
}

export function getOrdersByCustomer(email: string): Order[] {
  const db = ensureDataFile();
  return db.orders.filter(
    (o) => o.customerEmail.toLowerCase() === email.toLowerCase()
  );
}

export function createOrder(order: Order): Order {
  const db = ensureDataFile();
  db.orders.unshift(order);

  // Decrement inventory for items
  order.items.forEach((item) => {
    const prod = db.products.find((p) => p.id === item.productId);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - item.quantity);
      db.inventoryLogs.push({
        id: `inv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        productId: prod.id,
        change: -item.quantity,
        reason: `Order ${order.orderNumber}`,
        timestamp: new Date().toISOString(),
      });
    }
  });

  // Increment coupon usage
  if (order.couponCode) {
    const coupon = db.coupons.find(
      (c) => c.code.toUpperCase() === order.couponCode?.toUpperCase()
    );
    if (coupon) {
      coupon.usageCount = (coupon.usageCount || 0) + 1;
    }
  }

  writeDataFile(db);
  return order;
}

export function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  paymentStatus?: PaymentStatus,
  shippingDetails?: {
    courierName?: string;
    awbNumber?: string;
    trackingUrl?: string;
  }
): Order | undefined {
  const db = ensureDataFile();
  const order = db.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  if (!order) return undefined;

  order.status = status;
  if (paymentStatus) {
    order.paymentStatus = paymentStatus;
  }
  if (shippingDetails?.courierName) {
    order.courierName = shippingDetails.courierName;
  }
  if (shippingDetails?.awbNumber) {
    order.awbNumber = shippingDetails.awbNumber;
  }
  if (shippingDetails?.trackingUrl) {
    order.trackingUrl = shippingDetails.trackingUrl;
  }
  order.updatedAt = new Date().toISOString();

  writeDataFile(db);
  return order;
}

// Reviews
export function getReviews(productId?: string, onlyApproved = true): Review[] {
  const db = ensureDataFile();
  let list = db.reviews;
  if (productId) {
    list = list.filter((r) => r.productId === productId);
  }
  if (onlyApproved) {
    list = list.filter((r) => r.status === 'approved');
  }
  return list;
}

export function addReview(review: Omit<Review, 'id' | 'createdAt' | 'status'>): Review {
  const db = ensureDataFile();
  const newReview: Review = {
    ...review,
    id: `rev-${Date.now()}`,
    status: 'pending', // Moderation required
    createdAt: new Date().toISOString(),
  };
  db.reviews.unshift(newReview);
  writeDataFile(db);
  return newReview;
}

export function updateReviewStatus(
  reviewId: string,
  status: 'approved' | 'rejected'
): Review | undefined {
  const db = ensureDataFile();
  const rev = db.reviews.find((r) => r.id === reviewId);
  if (!rev) return undefined;
  rev.status = status;
  writeDataFile(db);
  return rev;
}

export function deleteReview(reviewId: string): boolean {
  const db = ensureDataFile();
  const len = db.reviews.length;
  db.reviews = db.reviews.filter((r) => r.id !== reviewId);
  if (db.reviews.length !== len) {
    writeDataFile(db);
    return true;
  }
  return false;
}

// Store Settings
export function getStoreSettings(): StoreSettings {
  const db = ensureDataFile();
  return db.settings || DEFAULT_STORE_SETTINGS;
}

export function updateStoreSettings(settings: Partial<StoreSettings>): StoreSettings {
  const db = ensureDataFile();
  db.settings = { ...db.settings, ...settings };
  writeDataFile(db);
  return db.settings;
}

// Newsletter
export function addNewsletterSubscriber(email: string): boolean {
  const db = ensureDataFile();
  const exists = db.newsletter.some((n) => n.email.toLowerCase() === email.toLowerCase());
  if (exists) return false;
  db.newsletter.push({
    email,
    subscribedAt: new Date().toISOString(),
  });
  writeDataFile(db);
  return true;
}

// PIN Code Serviceability & Shipping Calculator
export function checkPincodeServiceability(pincode: string): {
  serviceable: boolean;
  city?: string;
  state?: string;
  deliveryDays?: string;
  codAvailable?: boolean;
} {
  const clean = pincode.trim();
  if (!/^\d{6}$/.test(clean)) {
    return { serviceable: false };
  }

  // First digit determines Indian postal circle
  const firstDigit = clean[0];
  const circleMap: Record<string, { state: string; city: string; days: string }> = {
    '1': { state: 'Delhi & NCR / Punjab', city: 'Delhi / Gurugram', days: '2-3 Business Days' },
    '2': { state: 'Uttar Pradesh / Uttarakhand', city: 'Lucknow / Dehradun', days: '3-4 Business Days' },
    '3': { state: 'Rajasthan / Gujarat', city: 'Jaipur / Ahmedabad', days: '3-4 Business Days' },
    '4': { state: 'Maharashtra / Madhya Pradesh', city: 'Mumbai / Indore', days: '3-4 Business Days' },
    '5': { state: 'Andhra Pradesh / Telangana / Karnataka', city: 'Bengaluru / Hyderabad', days: '2-3 Business Days' },
    '6': { state: 'Tamil Nadu / Kerala', city: 'Chennai / Kochi', days: '3-4 Business Days' },
    '7': { state: 'West Bengal / Odisha / North East', city: 'Kolkata / Guwahati', days: '4-5 Business Days' },
    '8': { state: 'Bihar / Jharkhand', city: 'Patna / Ranchi', days: '4-5 Business Days' },
  };

  const info = circleMap[firstDigit] || {
    state: 'India Postal Circle',
    city: 'All India Service Area',
    days: '3-5 Business Days',
  };

  return {
    serviceable: true,
    city: info.city,
    state: info.state,
    deliveryDays: info.days,
    codAvailable: true,
  };
}

// Admin Dashboard Summary
export function getDashboardStats() {
  const db = ensureDataFile();
  const orders = db.orders;
  const totalSales = orders.reduce(
    (sum, o) => (o.paymentStatus === 'paid' ? sum + o.grandTotal : sum),
    0
  );
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'pending' || o.status === 'processing').length;
  const deliveredOrders = orders.filter((o) => o.status === 'delivered').length;
  const aov = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;
  const lowStockCount = db.products.filter(
    (p) => p.stock <= (p.lowStockThreshold || 10)
  ).length;

  return {
    totalSales,
    totalOrders,
    pendingOrders,
    deliveredOrders,
    aov,
    lowStockCount,
    recentOrders: orders.slice(0, 5),
    pendingReviews: db.reviews.filter((r) => r.status === 'pending').length,
  };
}
