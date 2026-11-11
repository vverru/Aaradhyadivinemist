# AARADHYA DIVINE MIST
### Official Luxury Indian Spiritual Fragrance & Pooja Essentials E-Commerce Platform

> **Official Tagline:** *"Way to connect your Aaradhya"*  
> **Brand Mission:** Elevate Indian spiritual devotion with 100% charcoal-free agarbatti, authentic Mysore sandalwood, holy temple floral attars, and royal festive gift collections.

---

## 🌸 Brand Identity & Design System

- **Primary Colors:**
  - **Primary Sage Green:** `#DDE8D5`
  - **Deep Forest Green:** `#183B2C`
  - **Ivory Cream:** `#F8F6ED`
  - **Champagne Gold:** `#C6A66A`
  - **Pure White:** `#FFFFFF`
  - **Soft Neutral:** `#F2F0E8`
- **Typography:**
  - **Editorial Headings:** Cormorant Garamond / Playfair Display
  - **Modern Body Text:** Inter / DM Sans
- **Visual Design:** High-resolution luxury vector emblems, smoke animations, generous whitespace, subtle gold borders, and serene Indian temple aesthetics.

---

## 🪔 Complete Architecture & Features

### 1. Luxury Homepage (12 Editorial Sections)
1. **Cinematic Hero:** Atmospheric incense smoke animation, sacred prayer altar visuals, gold CTAs.
2. **Brand Introduction:** Welcome to the World of Aaradhya.
3. **Shop by Collection:** 6 image-led categories (Premium Agarbatti, Floral Collection, Sandalwood Collection, Daily Pooja Essentials, Dhoop Collection, Gift Collections).
4. **Featured Products:** 4-column luxury grid with MRP, selling price, discounts, genuine star ratings, Quick View modal, Wishlist toggle, and Add to Cart.
5. **Brand Story:** Two-column editorial layout explaining our Sanskrit roots and Vedic philosophy.
6. **Why Choose Aaradhya:** 4 feature blocks (Charcoal-Free, Essential Oils, Sacred Vedic Formulations, Moisture-Locked Packaging).
7. **Fragrance Experience:** Full-width cinematic banner.
8. **Gift Collections:** Dedicated festival and wedding gifting showcase with royal velvet-lined box visuals.
9. **Devotee Reviews:** Verified customer testimonials with star ratings and product associations (strictly no fake reviews).
10. **Instagram Visual Sanctuary:** 6-column curated visual gallery.
11. **Newsletter Subscription:** Email subscription with consent validation.
12. **Mandatory Compliance Footer:** Official brand logo, Indian consumer care, toll-free number, WhatsApp link, and legal policies.

### 2. Sacred Shopping Experience (`/shop` & `/collections`)
- Dynamic category, fragrance accord, price range, and stock availability sidebar filters.
- Real-time sort (Popularity/Bestsellers, New Arrivals, Price Low-High, Price High-Low).
- Search query filtering with active filter pills and clear-all.
- Refined empty state when no products match.

### 3. Product Details Page (`/shop/[slug]`)
- Multi-image zoom gallery with thumbnail switcher.
- Real-time price breakdown with savings percentage.
- Pack size and fragrance accord badges.
- **Indian PIN Code Delivery Checker:** Real-time postal circle serviceability, estimated delivery days, and COD availability.
- Full specifications table covering mandatory Legal Metrology declarations.
- Usage instructions and fire safety warnings.
- Devotee reviews list with "Write a Review" form.
- Related products recommendations.
- Sticky mobile "Add to Cart" bar.

### 4. E-Commerce & Checkout Engine (`/cart`, `/checkout`, `/order-success`)
- Persistent basket synchronized across browser sessions.
- Dynamic free delivery progress meter ("Add ₹X more for FREE Divine Shipping").
- Multi-step checkout: Devotee Details → Address & PIN Code → Shipping Speed → Payment Method (UPI, Cards, COD) → Review & Confirm.
- **Server-Side Price Validation:** Every item price, quantity, and coupon discount is calculated and verified on the server.
- Printable GST Tax Invoice generation.

### 5. Order Tracking (`/track-order`)
- Real-time 5-step status tracker (Confirmed → Sacred Packing → In Transit with Blue Dart/Delhivery → Out for Delivery → Delivered).
- Direct courier tracking portal link.

### 6. Devotee Sanctuary Account (`/account`)
- Profile information management.
- Order history with tracking numbers and cancellation/return requests.
- Saved delivery addresses.
- Devotional wishlist with 1-click move to basket.
- Password change and session logout.

### 7. Comprehensive Administrator Portal (`/admin`)
- **Dashboard:** Sales revenue, total orders, pending dispatches, delivered shipments, AOV, and low stock warnings.
- **Product Management:** Create, edit, delete, update pricing, inventory, and toggle **Draft vs. Published** status (Section 14).
- **Order Logistics:** Manage orders, update status, change payment states, assign courier names and AWB tracking numbers.
- **Inventory Ledger:** Low-stock alerts, manual stock adjustments with reason notes, and audit logs.
- **Customer Directory:** Devotee order counts and lifetime spend in INR (₹).
- **Marketing & Coupons:** Create percentage or fixed-amount coupons with minimum order rules and validity dates.
- **Review Moderation:** Approve, reject, or delete customer reviews.
- **Store Settings:** Configure brand details, Razorpay credentials, Shiprocket settings, GST rate, and Legal Metrology officer details.

### 8. Statutory Indian E-Commerce Compliance
- Mandatory Legal Metrology declarations (Packer, Manufacturer, Net Quantity, Country of Origin).
- Integrated 18% GST calculation.
- Dedicated statutory policy pages:
  - Privacy Policy (IT Act, 2000 compliant)
  - Terms & Conditions
  - Shipping & Delivery Policy
  - Cancellation & 7-Day Refund Policy
  - Grievance Redressal Mechanism with Nodal Officer contact

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` to preview the luxury storefront.

### 3. Administrator Access
- **URL:** `http://localhost:3000/admin`
- **Email:** `admin@aaradhyadivinemist.com`
- **Password:** `AaradhyaDivine2026!`

### 4. Build for Production
```bash
npm run build
npm start
```
