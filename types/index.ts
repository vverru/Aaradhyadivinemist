export type Role = 'admin' | 'customer';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: Role;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount?: number;
  featured?: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  packSize: string; // e.g. "Pack of 50 Sticks", "100g", "Box of 2"
  sku: string;
  price: number; // Selling price in INR
  mrp: number; // Maximum Retail Price in INR
  stock: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  categorySlug: string;
  categoryName: string;
  fragranceNotes: string[]; // e.g. ["Sandalwood", "Warm Wood", "Sacred Camphor"]
  price: number; // In INR
  mrp: number; // In INR
  packSize: string;
  stock: number;
  lowStockThreshold?: number;
  images: string[];
  description: string;
  features: string[];
  specifications: {
    burnTime?: string;
    stickLength?: string;
    fragranceFamily?: string;
    naturalIngredients?: string;
    origin?: string;
    netQuantity?: string;
    packageDimensions?: string;
    manufacturerDetails?: string;
    packerDetails?: string;
    consumerCare?: string;
  };
  usageInstructions: string[];
  safetyInstructions: string[];
  status: 'draft' | 'published';
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  productName: string;
  packSize: string;
  price: number;
  mrp: number;
  quantity: number;
  image: string;
  slug: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  houseFlat: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  packSize: string;
  price: number;
  mrp: number;
  quantity: number;
  image: string;
  subtotal: number;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export type PaymentStatus =
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded';

export type PaymentMethod =
  | 'razorpay'
  | 'upi'
  | 'card'
  | 'netbanking'
  | 'cod';

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  tax: number; // GST included or calculated
  grandTotal: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  shiprocketShipmentId?: string;
  awbNumber?: string;
  courierName?: string;
  trackingUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // percentage (e.g. 10) or fixed amount in INR (e.g. 150)
  minOrderValue: number;
  maxDiscount?: number;
  validUntil: string;
  isActive: boolean;
  usageCount: number;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerLocation?: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface StoreSettings {
  brandName: string;
  tagline: string;
  supportEmail: string;
  supportPhone: string;
  supportWhatsApp: string;
  address: string;
  currency: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  expressShippingFee: number;
  taxRatePercent: number; // GST
  legalMetrologyManufacturer: string;
  legalMetrologyPacker: string;
  legalMetrologyConsumerCare: string;
  legalMetrologyGrievanceOfficer: string;
  razorpayKeyId?: string;
  razorpayKeySecret?: string;
  shiprocketEmail?: string;
  shiprocketPassword?: string;
  enableCod: boolean;
}
