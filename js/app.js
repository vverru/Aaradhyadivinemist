/**
 * AARADHYA DIVINE MIST - Luxury Indian Spiritual E-Commerce Platform
 * Modern Vanilla JavaScript Application Logic
 */

// Initial Seed Data (Enables 100% offline & local file:// execution)
const APP_DATA = {
  categories: [
    {
      id: "cat-1",
      name: "Premium Agarbatti",
      slug: "premium-agarbatti",
      description: "Slow-burning, charcoal-free spiritual incense sticks hand-dipped in pure natural essential oils.",
      image: "images/categories/agarbatti.png"
    },
    {
      id: "cat-2",
      name: "Floral Collection",
      slug: "floral-collection",
      description: "Exquisite aromas distilled from temple-offered holy flowers including Damask Rose, Mogra, and Parijat.",
      image: "images/categories/floral.png"
    },
    {
      id: "cat-3",
      name: "Sandalwood Collection",
      slug: "sandalwood-collection",
      description: "Authentic Mysore Chandan with divine earthy undertones that ground the senses in sacred stillness.",
      image: "images/categories/sandalwood.png"
    },
    {
      id: "cat-4",
      name: "Daily Pooja Essentials",
      slug: "daily-pooja-essentials",
      description: "Pure Bhimseni camphor, natural cow ghee wicks, brass diyas and sacred havan ingredients.",
      image: "images/categories/pooja-essentials.png"
    },
    {
      id: "cat-5",
      name: "Dhoop Collection",
      slug: "dhoop-collection",
      description: "Traditional charcoal-free wet and dry dhoop sticks made with indigenous desi cow dung, loban, and guggul.",
      image: "images/categories/dhoop.png"
    },
    {
      id: "cat-6",
      name: "Gift Collections",
      slug: "gift-collections",
      description: "Curated royal gift boxes in gold-embossed ivory casings, crafted for festive gifting and housewarmings.",
      image: "images/categories/gifts.png"
    }
  ],
  products: [
    {
      id: "prod-sandalwood-essence",
      name: "Sandalwood Essence Agarbatti",
      slug: "sandalwood-essence-agarbatti",
      tagline: "Pure Mysore Chandan Incense for Deep Contemplation",
      categorySlug: "sandalwood-collection",
      categoryName: "Sandalwood Collection",
      fragranceNotes: ["Pure Mysore Sandalwood", "Sacred Woodbark", "Warm Amber"],
      price: 349,
      mrp: 450,
      packSize: "Pack of 50 Sticks (120g)",
      stock: 83,
      badge: "Bestseller",
      images: [
        "images/products/sandalwood.png",
        "images/products/sandalwood-detail.png"
      ],
      description: "Immerse your sanctuary in the timeless serenity of Sandalwood Essence. Handcrafted using authentic Indian sandalwood powder and therapeutic essential oils, these sticks burn smoothly without emitting black soot, filling your pooja room with an aura of tranquil divinity.",
      features: [
        "100% Charcoal-free & Non-toxic",
        "Infused with pure sandalwood essential oils",
        "45-50 minutes soothing burn time per stick",
        "Certified organic bamboo core",
        "Leaves zero choking chemical residue"
      ],
      specifications: {
        burnTime: "45 to 50 minutes per stick",
        stickLength: "9 inches (approx. 23 cm)",
        origin: "Mysore, Karnataka, India",
        netQuantity: "50 Luxury Sticks (120 gms)"
      },
      rating: 5.0,
      reviewsCount: 42
    },
    {
      id: "prod-divine-rose",
      name: "Divine Rose Incense Sticks",
      slug: "divine-rose-incense-sticks",
      tagline: "Distilled Indian Damask Rose for Devotional Harmony",
      categorySlug: "floral-collection",
      categoryName: "Floral Collection",
      fragranceNotes: ["Indian Damask Rose", "Morning Dew Accord", "Velvet Musk"],
      price: 299,
      mrp: 399,
      packSize: "Pack of 45 Sticks (100g)",
      stock: 94,
      badge: "Pure Temple Floral",
      images: [
        "images/products/rose.png",
        "images/products/rose-detail.png"
      ],
      description: "Distilled from sacred temple floral offerings, Divine Rose delivers a lush, velvety fragrance that elevates prayer spaces. The slow-diffusing natural rose oils soothe anxious thoughts and invite auspicious blessings into your home.",
      features: [
        "Temple flower upcycled formulation",
        "Charcoal-free smooth burn",
        "Authentic Damask rose extract",
        "Therapeutic uplifting aroma"
      ],
      specifications: {
        burnTime: "40 to 45 minutes per stick",
        stickLength: "9 inches (approx. 23 cm)",
        origin: "Pushkar & Kannauj, India",
        netQuantity: "45 Luxury Sticks (100 gms)"
      },
      rating: 4.9,
      reviewsCount: 38
    },
    {
      id: "prod-mogra-bliss",
      name: "Mogra Bliss Agarbatti",
      slug: "mogra-bliss-agarbatti",
      tagline: "Nocturnal Arabian Jasmine for Sacred Peace",
      categorySlug: "floral-collection",
      categoryName: "Floral Collection",
      fragranceNotes: ["Arabian Jasmine", "White Lily", "Green Stems"],
      price: 320,
      mrp: 420,
      packSize: "Pack of 50 Sticks (115g)",
      stock: 67,
      badge: "Divine Floral",
      images: [
        "images/products/mogra.png"
      ],
      description: "Mogra Bliss captures the pristine fragrance of twilight jasmine blossoms. Its clean, celestial aroma purifies surrounding energies, ideal for twilight sandhya prayers and meditative chants.",
      features: [
        "Pure Arabian jasmine floral oils",
        "Naturally derived binders",
        "Zero artificial scents",
        "Safe for kids and elderly"
      ],
      specifications: {
        burnTime: "45 minutes per stick",
        stickLength: "9 inches (approx. 23 cm)",
        origin: "Madurai, Tamil Nadu, India",
        netQuantity: "50 Luxury Sticks (115 gms)"
      },
      rating: 4.8,
      reviewsCount: 29
    },
    {
      id: "prod-lavender-calm",
      name: "Lavender Calm Incense Sticks",
      slug: "lavender-calm-incense-sticks",
      tagline: "Kashmiri Lavender to Ease the Mind & Sanctify Spaces",
      categorySlug: "premium-agarbatti",
      categoryName: "Premium Agarbatti",
      fragranceNotes: ["Kashmiri Wild Lavender", "Herbal Sage", "Fresh Pine"],
      price: 310,
      mrp: 399,
      packSize: "Pack of 45 Sticks (100g)",
      stock: 52,
      badge: "Vedic Calm",
      images: [
        "images/products/lavender.png"
      ],
      description: "Blended with pure Kashmiri lavender essence, these agarbattis calm nervous tension and foster deep tranquility during japa and evening meditation rituals.",
      features: [
        "Therapeutic aromatherapy grade",
        "Charcoal-free clean burn",
        "Promotes peaceful night sleep",
        "Natural botanical gums"
      ],
      specifications: {
        burnTime: "45 minutes per stick",
        stickLength: "9 inches (approx. 23 cm)",
        origin: "Kashmir Valley, India",
        netQuantity: "45 Luxury Sticks (100 gms)"
      },
      rating: 4.9,
      reviewsCount: 31
    },
    {
      id: "prod-divine-dhoop",
      name: "Divine Dhoop Pure Cow Dung & Loban Sticks",
      slug: "divine-dhoop-sticks",
      tagline: "Vedic Purification with Indigenous Gir Cow Gavyam & Sambrani",
      categorySlug: "dhoop-collection",
      categoryName: "Dhoop Collection",
      fragranceNotes: ["Benzoin Loban", "Gir Cow Ghee", "Sacred Guggul"],
      price: 275,
      mrp: 350,
      packSize: "Pack of 30 Thick Dhoop Sticks (150g)",
      stock: 45,
      badge: "Vedic Hawan",
      images: [
        "images/products/dhoop.png"
      ],
      description: "Handcrafted using solar-dried indigenous Gir Cow dung, pure Bhimseni camphor, natural loban, and guggul resins. Recreates the auspicious atmosphere of an ancient Vedic yajna without synthetic fumes.",
      features: [
        "Pure desi cow dung & sambrani",
        "Dispels negative indoor energy",
        "Charcoal-free and bamboo-free",
        "Creates auspicious temple ambiance"
      ],
      specifications: {
        burnTime: "50 to 55 minutes per stick",
        stickLength: "5 inches thick cylindrical",
        origin: "Vrindavan, Uttar Pradesh, India",
        netQuantity: "30 Dhoop Sticks (150 gms)"
      },
      rating: 5.0,
      reviewsCount: 56
    },
    {
      id: "prod-aaradhya-pooja-kit",
      name: "Aaradhya Divine Pooja Kit",
      slug: "aaradhya-divine-pooja-kit",
      tagline: "Complete Sacred Festival and Griha Pravesh Collection",
      categorySlug: "gift-collections",
      categoryName: "Gift Collections",
      fragranceNotes: ["Sandalwood", "Rose", "Loban", "Kapur"],
      price: 1499,
      mrp: 1999,
      packSize: "Royal Gold-Embossed Gift Box (Set of 6 Essentials)",
      stock: 28,
      badge: "Festive Edition",
      images: [
        "images/products/gift-kit.png",
        "images/products/gift-kit-inside.png"
      ],
      description: "An opulent gift set presented in a royal gold-embossed ivory casing. Contains Sandalwood & Rose agarbattis, desi cow loban dhoop, Bhimseni camphor, brass incense holder, and sacred Ganga jal vial.",
      features: [
        "All-in-one sacred pooja hamper",
        "Royal velvet-lined presentation box",
        "Includes heavy solid brass burner",
        "Perfect for Diwali & Housewarming gifts"
      ],
      specifications: {
        burnTime: "Assorted items included",
        stickLength: "Full luxury gift suite",
        origin: "Karnataka & Varanasi, India",
        netQuantity: "Set of 6 sacred articles (650 gms)"
      },
      rating: 5.0,
      reviewsCount: 64
    }
  ],
  reviews: [
    {
      id: "rev-1",
      customerName: "Ananya Sharma",
      customerLocation: "Bengaluru, Karnataka",
      productName: "Sandalwood Essence Agarbatti",
      rating: 5,
      title: "Pure Mysore Sandalwood aroma without smoke irritation!",
      comment: "Most commercial agarbattis give me a headache from chemical perfumes, but Aaradhya Divine Mist is noticeably natural and clean. The chandan note is subtle, authentic, and lasts for hours after our morning puja.",
      isVerifiedPurchase: true
    },
    {
      id: "rev-2",
      customerName: "Rajesh Venkat",
      customerLocation: "Chennai, Tamil Nadu",
      productName: "Divine Dhoop Pure Cow Dung & Loban Sticks",
      rating: 5,
      title: "Brings true temple energy into the home",
      comment: "The loban and sambrani formulation is superb. We use it every evening during sandhya aarti. The sticks burn steadily and leave a peaceful sacred fragrance that lingers till next morning.",
      isVerifiedPurchase: true
    },
    {
      id: "rev-3",
      customerName: "Pooja Agarwal",
      customerLocation: "Jaipur, Rajasthan",
      productName: "Aaradhya Divine Pooja Kit",
      rating: 5,
      title: "Exquisite gifting box for Griha Pravesh",
      comment: "Ordered 5 sets as return gifts for our housewarming ceremony. The ivory and gold packaging looked exceptionally royal, and the brass diya inside is solid and beautifully finished.",
      isVerifiedPurchase: true
    },
    {
      id: "rev-4",
      customerName: "Vikramaditya Rao",
      customerLocation: "Hyderabad, Telangana",
      productName: "Divine Rose Incense Sticks",
      rating: 5,
      title: "Soothing Damask rose aroma",
      comment: "Soft, gentle, and utterly divine. You can tell real rose petals are used instead of synthetic room freshener sprays. Wonderful product.",
      isVerifiedPurchase: true
    }
  ],
  orders: [
    {
      orderNumber: "ADM-2026-1001",
      customerName: "Siddharth Verma",
      items: ["Sandalwood Essence Agarbatti", "Divine Dhoop Sticks"],
      total: 823,
      status: "Delivered",
      date: "07 Nov 2026",
      courier: "Blue Dart Express (AWB: BLUEDART78942105)",
      step: 4
    },
    {
      orderNumber: "ADM-2026-1002",
      customerName: "Arjun Mehta",
      items: ["Aaradhya Divine Pooja Kit"],
      total: 1349,
      status: "Out for Delivery",
      date: "11 Nov 2026",
      courier: "Delhivery Surface (AWB: DELHIVERY84729103)",
      step: 3
    }
  ]
};

// Application State Management
class AppState {
  constructor() {
    this.products = [...APP_DATA.products];
    this.categories = [...APP_DATA.categories];
    this.reviews = this.loadFromStorage('adm_reviews', APP_DATA.reviews);
    this.cart = this.loadFromStorage('adm_cart', []);
    this.wishlist = this.loadFromStorage('adm_wishlist', []);
    this.orders = this.loadFromStorage('adm_orders', APP_DATA.orders);
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.sortBy = 'featured';
    this.promo = this.loadFromStorage('adm_promo', null);
    this.freeShippingThreshold = 799;
    this.standardShipping = 60;
  }

  loadFromStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  saveToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  }
}

const state = new AppState();

// DOM Ready Handler
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  renderCategories();
  renderProducts();
  renderReviews();
  initCart();
  initWishlist();
  initQuickViewModal();
  initCheckoutModal();
  initTrackOrder();
  initFaqAccordion();
  initNewsletter();
  initReviewSubmission();
  updateHeaderBadges();
});

/* ==========================================================================
   Header & Mobile Navigation
   ========================================================================== */
function initHeader() {
  const header = document.getElementById('main-header');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileClose = document.getElementById('mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => mobileNav.classList.add('open'));
  }
  if (mobileClose && mobileNav) {
    mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
}

function updateHeaderBadges() {
  const cartBadge = document.getElementById('cart-badge-count');
  const wishlistBadge = document.getElementById('wishlist-badge-count');

  const totalCartQty = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartBadge) {
    cartBadge.textContent = totalCartQty;
    cartBadge.style.display = totalCartQty > 0 ? 'flex' : 'none';
  }

  if (wishlistBadge) {
    const totalWish = state.wishlist.length;
    wishlistBadge.textContent = totalWish;
    wishlistBadge.style.display = totalWish > 0 ? 'flex' : 'none';
  }
}

/* ==========================================================================
   Categories Showcase
   ========================================================================== */
function renderCategories() {
  const container = document.getElementById('collections-grid');
  if (!container) return;

  container.innerHTML = state.categories.map(cat => `
    <div class="collection-card" onclick="filterByCategory('${cat.slug}')">
      <div class="collection-img-box">
        <img src="${cat.image}" alt="${cat.name}" loading="lazy" onerror="this.src='images/categories/agarbatti.png'">
      </div>
      <h3 class="collection-title">${cat.name}</h3>
      <p class="collection-desc">${cat.description}</p>
      <span class="collection-link">Explore Collection <i class="fa-solid fa-arrow-right"></i></span>
    </div>
  `).join('');
}

function filterByCategory(categorySlug) {
  state.activeCategory = categorySlug;
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    if (btn.dataset.category === categorySlug) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderProducts();

  const shopSection = document.getElementById('shop');
  if (shopSection) {
    shopSection.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ==========================================================================
   Interactive Shop & Products Grid
   ========================================================================== */
function renderProducts() {
  const container = document.getElementById('products-grid');
  if (!container) return;

  // Filter
  let filtered = state.products.filter(p => {
    const matchesCategory = state.activeCategory === 'all' || p.categorySlug === state.activeCategory;
    const matchesSearch = !state.searchQuery ||
      p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      p.fragranceNotes.some(note => note.toLowerCase().includes(state.searchQuery.toLowerCase())) ||
      p.tagline.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort
  if (state.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (state.sortBy === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: #fff; border-radius: 12px; border: 1px solid var(--border-light);">
        <i class="fa-solid fa-spa" style="font-size: 3rem; color: var(--gold-500); margin-bottom: 1rem;"></i>
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--forest-800); margin-bottom: 0.5rem;">No Divine Offerings Found</h3>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">We couldn't find items matching "${state.searchQuery}". Try selecting another category.</p>
        <button class="btn btn-gold" onclick="resetFilters()">View All Collections</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(prod => {
    const isWishlisted = state.wishlist.includes(prod.id);
    const savingsPercent = Math.round(((prod.mrp - prod.price) / prod.mrp) * 100);

    return `
      <div class="product-card" data-id="${prod.id}">
        <div class="product-badge-wrap">
          <span class="product-badge gold">${prod.badge || 'Pure Vedic'}</span>
          <span class="product-badge">100% Charcoal Free</span>
        </div>

        <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${prod.id}', event)" title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}">
          <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>

        <div class="product-img-box" onclick="openQuickView('${prod.id}')" style="cursor: pointer;">
          <img src="${prod.images[0]}" alt="${prod.name}" loading="lazy" onerror="this.src='images/products/sandalwood.png'">
        </div>

        <div class="fragrance-notes-pills">
          ${prod.fragranceNotes.slice(0, 2).map(n => `<span class="note-pill">✦ ${n}</span>`).join('')}
        </div>

        <span class="product-category-name">${prod.categoryName}</span>
        <h3 class="product-title font-serif" onclick="openQuickView('${prod.id}')" style="cursor: pointer;">${prod.name}</h3>
        <p class="product-pack-size">${prod.packSize}</p>

        <div class="product-rating">
          <div class="stars">
            ${'<i class="fa-solid fa-star"></i>'.repeat(Math.floor(prod.rating))}
            ${prod.rating % 1 !== 0 ? '<i class="fa-solid fa-star-half-stroke"></i>' : ''}
          </div>
          <span class="rating-count">(${prod.reviewsCount} devotees)</span>
        </div>

        <div class="product-price-box">
          <span class="current-price">₹${prod.price}</span>
          <span class="mrp-price">₹${prod.mrp}</span>
          <span class="discount-badge">Save ${savingsPercent}%</span>
        </div>

        <div class="product-actions">
          <button class="btn-card-quick" onclick="openQuickView('${prod.id}')">
            <i class="fa-regular fa-eye"></i> Details
          </button>
          <button class="btn-card-cart" onclick="addToCart('${prod.id}', 1)">
            <i class="fa-solid fa-cart-shopping"></i> Add to Cart
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function resetFilters() {
  state.activeCategory = 'all';
  state.searchQuery = '';
  const searchInput = document.getElementById('shop-search-input');
  if (searchInput) searchInput.value = '';

  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    if (btn.dataset.category === 'all') btn.classList.add('active');
    else btn.classList.remove('active');
  });

  renderProducts();
}

// Filter button click event bindings
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.activeCategory = btn.dataset.category;
    renderProducts();
  });
});

// Search input
const searchInput = document.getElementById('shop-search-input');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim();
    renderProducts();
  });
}

// Sort dropdown
const sortSelect = document.getElementById('shop-sort-select');
if (sortSelect) {
  sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderProducts();
  });
}

/* ==========================================================================
   Shopping Cart Logic
   ========================================================================== */
function initCart() {
  const cartTrigger = document.getElementById('cart-drawer-trigger');
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  const cartClose = document.getElementById('cart-drawer-close');
  const continueShoppingBtn = document.getElementById('cart-continue-shopping');

  if (cartTrigger && cartOverlay) {
    cartTrigger.addEventListener('click', openCart);
  }
  if (cartClose && cartOverlay) {
    cartClose.addEventListener('click', closeCart);
  }
  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) closeCart();
    });
  }
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', closeCart);
  }

  // Promo code form
  const promoBtn = document.getElementById('apply-promo-btn');
  const promoInput = document.getElementById('cart-promo-input');
  if (promoBtn && promoInput) {
    promoBtn.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      applyPromoCode(code);
    });
  }

  renderCart();
}

function openCart() {
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  if (cartOverlay) {
    renderCart();
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCart() {
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  if (cartOverlay) {
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function addToCart(productId, qty = 1) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = state.cart.findIndex(item => item.productId === productId);
  if (existingIndex > -1) {
    state.cart[existingIndex].quantity += qty;
  } else {
    state.cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      packSize: product.packSize,
      image: product.images[0],
      quantity: qty
    });
  }

  state.saveToStorage('adm_cart', state.cart);
  updateHeaderBadges();
  renderCart();
  showToast(`Added ${product.name} (${qty}) to sacred cart! ✨`, 'success');

  // Subtle header bounce animation
  const cartBtn = document.getElementById('cart-drawer-trigger');
  if (cartBtn) {
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => { cartBtn.style.transform = 'scale(1)'; }, 200);
  }
}

function updateCartQty(productId, newQty) {
  if (newQty <= 0) {
    removeFromCart(productId);
    return;
  }
  const item = state.cart.find(i => i.productId === productId);
  if (item) {
    item.quantity = newQty;
    state.saveToStorage('adm_cart', state.cart);
    updateHeaderBadges();
    renderCart();
  }
}

function removeFromCart(productId) {
  const item = state.cart.find(i => i.productId === productId);
  state.cart = state.cart.filter(i => i.productId !== productId);
  state.saveToStorage('adm_cart', state.cart);
  updateHeaderBadges();
  renderCart();
  if (item) {
    showToast(`Removed ${item.name} from cart`, 'info');
  }
}

function applyPromoCode(code) {
  if (!code) {
    showToast("Please enter a coupon code", "warning");
    return;
  }

  if (code === "DIVINE10") {
    state.promo = { code: "DIVINE10", discountPercent: 10, label: "10% Festive Discount" };
    state.saveToStorage('adm_promo', state.promo);
    showToast("Divine Blessing! 10% discount applied! 🪔", "success");
  } else if (code === "FIRSTAARADHYA") {
    state.promo = { code: "FIRSTAARADHYA", flatDiscount: 150, label: "₹150 Devotee Welcome" };
    state.saveToStorage('adm_promo', state.promo);
    showToast("Sacred Welcome! ₹150 off applied! 🌸", "success");
  } else {
    showToast("Invalid coupon code. Try DIVINE10", "error");
    return;
  }

  renderCart();
}

function removePromoCode() {
  state.promo = null;
  state.saveToStorage('adm_promo', null);
  renderCart();
  showToast("Coupon removed", "info");
}

function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items-body');
  const cartEmptyView = document.getElementById('cart-empty-view');
  const cartFooter = document.getElementById('cart-footer-section');
  const shippingMeterText = document.getElementById('shipping-meter-status');
  const shippingBarFill = document.getElementById('shipping-meter-fill');

  if (!cartItemsContainer) return;

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Free shipping progress
  const diff = state.freeShippingThreshold - subtotal;
  if (subtotal === 0) {
    if (shippingMeterText) shippingMeterText.innerHTML = `Add items to enjoy <strong>FREE Delivery</strong>`;
    if (shippingBarFill) shippingBarFill.style.width = '0%';
  } else if (diff > 0) {
    const percent = Math.min(100, Math.round((subtotal / state.freeShippingThreshold) * 100));
    if (shippingMeterText) shippingMeterText.innerHTML = `Add ₹${diff} more for <strong>FREE Delivery!</strong> 🎉`;
    if (shippingBarFill) shippingBarFill.style.width = `${percent}%`;
  } else {
    if (shippingMeterText) shippingMeterText.innerHTML = `✨ <strong>You've unlocked FREE Express Shipping!</strong>`;
    if (shippingBarFill) shippingBarFill.style.width = '100%';
  }

  if (state.cart.length === 0) {
    if (cartEmptyView) cartEmptyView.style.display = 'block';
    if (cartFooter) cartFooter.style.display = 'none';
    cartItemsContainer.innerHTML = '';
    return;
  }

  if (cartEmptyView) cartEmptyView.style.display = 'none';
  if (cartFooter) cartFooter.style.display = 'block';

  // Render items
  cartItemsContainer.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.name}" onerror="this.src='images/products/sandalwood.png'">
      </div>
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.name}</h4>
        <div class="cart-item-pack">${item.packSize}</div>
        <div class="cart-item-price">₹${item.price} <span style="font-size:0.8rem; font-weight:400; color:var(--text-light); text-decoration:line-through;">₹${item.mrp}</span></div>
        <div class="cart-stepper">
          <button class="step-btn" onclick="updateCartQty('${item.productId}', ${item.quantity - 1})">-</button>
          <span class="step-qty">${item.quantity}</span>
          <button class="step-btn" onclick="updateCartQty('${item.productId}', ${item.quantity + 1})">+</button>
          <button class="remove-item-btn" onclick="removeFromCart('${item.productId}')" title="Remove"><i class="fa-regular fa-trash-can"></i></button>
        </div>
      </div>
    </div>
  `).join('');

  // Calculations
  let discount = 0;
  if (state.promo) {
    if (state.promo.discountPercent) {
      discount = Math.round((subtotal * state.promo.discountPercent) / 100);
    } else if (state.promo.flatDiscount) {
      discount = Math.min(subtotal, state.promo.flatDiscount);
    }
  }

  const shipping = (subtotal >= state.freeShippingThreshold || subtotal === 0) ? 0 : state.standardShipping;
  const grandTotal = Math.max(0, subtotal - discount + shipping);

  // Update elements
  document.getElementById('cart-subtotal').textContent = `₹${subtotal}`;
  const discountRow = document.getElementById('cart-discount-row');
  if (discountRow) {
    if (discount > 0) {
      discountRow.style.display = 'flex';
      document.getElementById('cart-discount-value').textContent = `- ₹${discount} (${state.promo.code})`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  document.getElementById('cart-shipping').textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
  document.getElementById('cart-grand-total').textContent = `₹${grandTotal}`;
}

/* ==========================================================================
   Wishlist Handling
   ========================================================================== */
function initWishlist() {
  const wishlistBtn = document.getElementById('wishlist-trigger');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', openWishlistModal);
  }
}

function toggleWishlist(productId, event) {
  if (event) event.stopPropagation();

  const index = state.wishlist.indexOf(productId);
  const product = state.products.find(p => p.id === productId);

  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast(`Removed from Wishlist`, 'info');
  } else {
    state.wishlist.push(productId);
    showToast(`Saved ${product ? product.name : ''} to Wishlist ❤️`, 'success');
  }

  state.saveToStorage('adm_wishlist', state.wishlist);
  updateHeaderBadges();
  renderProducts();
}

function openWishlistModal() {
  const modalOverlay = document.getElementById('wishlist-modal-overlay');
  const container = document.getElementById('wishlist-items-container');
  if (!modalOverlay || !container) return;

  if (state.wishlist.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 3rem 1rem;">
        <i class="fa-regular fa-heart" style="font-size:3rem; color: var(--gold-500); margin-bottom: 1rem;"></i>
        <h4 style="font-family: var(--font-serif); font-size:1.3rem; color:var(--forest-800); margin-bottom:0.5rem;">Your Devotional Wishlist is Empty</h4>
        <p style="color:var(--text-muted); margin-bottom:1.5rem;">Click the heart icon on any product to save it for your next puja.</p>
        <button class="btn btn-gold" onclick="closeWishlistModal()">Explore Offerings</button>
      </div>
    `;
  } else {
    const wishlistedProducts = state.products.filter(p => state.wishlist.includes(p.id));
    container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:1rem; max-height: 60vh; overflow-y:auto; padding-right:0.5rem;">
        ${wishlistedProducts.map(p => `
          <div style="display:flex; align-items:center; gap:1rem; padding: 0.75rem 0; border-bottom:1px solid var(--border-light);">
            <img src="${p.images[0]}" alt="${p.name}" style="width:60px; height:60px; object-fit:contain; background:var(--neutral-soft); border-radius:6px; padding:4px;">
            <div style="flex-grow:1;">
              <h4 style="font-size:0.95rem; font-weight:600; color:var(--forest-800);">${p.name}</h4>
              <span style="font-size:0.85rem; font-weight:700; color:var(--forest-800);">₹${p.price}</span>
            </div>
            <button class="btn btn-forest" style="padding:0.45rem 0.9rem; font-size:0.8rem;" onclick="addToCart('${p.id}', 1); toggleWishlist('${p.id}');">
              Move to Cart
            </button>
            <button onclick="toggleWishlist('${p.id}'); openWishlistModal();" style="color:var(--text-light); font-size:1rem;" title="Remove">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeWishlistModal() {
  const modalOverlay = document.getElementById('wishlist-modal-overlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   Quick View Modal
   ========================================================================== */
function initQuickViewModal() {
  const overlay = document.getElementById('quickview-modal-overlay');
  const closeBtn = document.getElementById('quickview-close');

  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', closeQuickView);
  }
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeQuickView();
    });
  }
}

let quickViewQty = 1;

function openQuickView(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const overlay = document.getElementById('quickview-modal-overlay');
  const content = document.getElementById('quickview-modal-content');
  if (!overlay || !content) return;

  quickViewQty = 1;
  const savings = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  content.innerHTML = `
    <div class="quickview-grid">
      <div>
        <div class="quickview-img-box" id="qv-main-img-box">
          <img src="${product.images[0]}" id="qv-main-img" alt="${product.name}" onerror="this.src='images/products/sandalwood.png'">
        </div>
        ${product.images.length > 1 ? `
          <div style="display:flex; gap:0.5rem; margin-top:0.75rem;">
            ${product.images.map((img, idx) => `
              <img src="${img}" style="width:55px; height:55px; object-fit:contain; border-radius:6px; border:2px solid ${idx===0 ? 'var(--gold-500)' : 'var(--border-light)'}; cursor:pointer;" onclick="document.getElementById('qv-main-img').src='${img}'">
            `).join('')}
          </div>
        ` : ''}
      </div>

      <div style="display:flex; flex-direction:column;">
        <span style="font-size:0.75rem; font-weight:700; color:var(--gold-700); text-transform:uppercase; letter-spacing:0.1em;">${product.categoryName}</span>
        <h3 class="font-serif" style="font-size:1.75rem; color:var(--forest-800); margin:0.25rem 0 0.5rem;">${product.name}</h3>
        <p style="font-size:0.9rem; font-style:italic; color:var(--text-muted); margin-bottom:1rem;">"${product.tagline}"</p>

        <div style="display:flex; align-items:baseline; gap:0.75rem; margin-bottom:1rem;">
          <span style="font-size:1.6rem; font-weight:700; color:var(--forest-800);">₹${product.price}</span>
          <span style="font-size:1.05rem; text-decoration:line-through; color:var(--text-light);">₹${product.mrp}</span>
          <span class="discount-badge">Save ${savings}%</span>
        </div>

        <p style="font-size:0.92rem; color:var(--text-muted); line-height:1.6; margin-bottom:1.25rem;">
          ${product.description}
        </p>

        <div style="background:var(--ivory-100); border:1px solid var(--border-light); border-radius:8px; padding:0.85rem; margin-bottom:1.25rem; font-size:0.82rem;">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
            <div><strong>Burn Time:</strong> ${product.specifications.burnTime}</div>
            <div><strong>Stick Length:</strong> ${product.specifications.stickLength}</div>
            <div><strong>Origin:</strong> ${product.specifications.origin}</div>
            <div><strong>Net Quantity:</strong> ${product.specifications.netQuantity}</div>
          </div>
        </div>

        <div style="margin-top:auto; display:flex; gap:0.75rem; align-items:center;">
          <div style="display:flex; align-items:center; border:1px solid var(--border-light); border-radius:999px; background:var(--ivory-50); padding:0.2rem 0.6rem;">
            <button onclick="decrementQvQty()" style="font-size:1.1rem; padding:0.2rem 0.5rem; color:var(--forest-800);">-</button>
            <span id="qv-qty-val" style="min-width:24px; text-align:center; font-weight:700;">1</span>
            <button onclick="incrementQvQty()" style="font-size:1.1rem; padding:0.2rem 0.5rem; color:var(--forest-800);">+</button>
          </div>
          <button class="btn btn-gold" style="flex-grow:1;" onclick="addToCart('${product.id}', quickViewQty); closeQuickView();">
            <i class="fa-solid fa-cart-shopping"></i> Add to Sacred Cart
          </button>
        </div>
      </div>
    </div>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function incrementQvQty() {
  quickViewQty++;
  const el = document.getElementById('qv-qty-val');
  if (el) el.textContent = quickViewQty;
}

function decrementQvQty() {
  if (quickViewQty > 1) {
    quickViewQty--;
    const el = document.getElementById('qv-qty-val');
    if (el) el.textContent = quickViewQty;
  }
}

function closeQuickView() {
  const overlay = document.getElementById('quickview-modal-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   Checkout Modal & Order Placement
   ========================================================================== */
function initCheckoutModal() {
  const checkoutBtn = document.getElementById('cart-checkout-btn');
  const overlay = document.getElementById('checkout-modal-overlay');
  const closeBtn = document.getElementById('checkout-close');
  const checkoutForm = document.getElementById('sacred-checkout-form');

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (state.cart.length === 0) {
        showToast("Your cart is empty!", "warning");
        return;
      }
      closeCart();
      openCheckoutModal();
    });
  }

  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', closeCheckoutModal);
  }
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeCheckoutModal();
    });
  }

  // Payment method selection cards
  document.querySelectorAll('.payment-radio-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.payment-radio-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleOrderSubmit);
  }
}

function openCheckoutModal() {
  const overlay = document.getElementById('checkout-modal-overlay');
  if (!overlay) return;

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = 0;
  if (state.promo) {
    if (state.promo.discountPercent) discount = Math.round((subtotal * state.promo.discountPercent) / 100);
    else if (state.promo.flatDiscount) discount = Math.min(subtotal, state.promo.flatDiscount);
  }
  const shipping = subtotal >= state.freeShippingThreshold ? 0 : state.standardShipping;
  const grandTotal = Math.max(0, subtotal - discount + shipping);

  document.getElementById('checkout-summary-subtotal').textContent = `₹${subtotal}`;
  document.getElementById('checkout-summary-discount').textContent = discount > 0 ? `- ₹${discount}` : `₹0`;
  document.getElementById('checkout-summary-shipping').textContent = shipping === 0 ? `FREE` : `₹${shipping}`;
  document.getElementById('checkout-summary-total').textContent = `₹${grandTotal}`;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  const overlay = document.getElementById('checkout-modal-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function handleOrderSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('cust-name').value;
  const phone = document.getElementById('cust-phone').value;
  const email = document.getElementById('cust-email').value;
  const address = document.getElementById('cust-address').value;
  const city = document.getElementById('cust-city').value;
  const pincode = document.getElementById('cust-pincode').value;
  const paymentMethod = document.querySelector('input[name="payment_method"]:checked')?.value || 'UPI';

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = 0;
  if (state.promo) {
    if (state.promo.discountPercent) discount = Math.round((subtotal * state.promo.discountPercent) / 100);
    else if (state.promo.flatDiscount) discount = Math.min(subtotal, state.promo.flatDiscount);
  }
  const shipping = subtotal >= state.freeShippingThreshold ? 0 : state.standardShipping;
  const total = Math.max(0, subtotal - discount + shipping);

  const orderNum = `ADM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const newOrder = {
    orderNumber: orderNum,
    customerName: name,
    customerPhone: phone,
    customerEmail: email,
    shippingAddress: `${address}, ${city} - ${pincode}`,
    items: state.cart.map(i => `${i.name} (x${i.quantity})`),
    total: total,
    paymentMethod: paymentMethod,
    status: "Confirmed & In Packaging",
    date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    courier: "Blue Dart Express (Standard Temple Packaging)",
    step: 2
  };

  state.orders.unshift(newOrder);
  state.saveToStorage('adm_orders', state.orders);

  // Clear cart
  state.cart = [];
  state.promo = null;
  state.saveToStorage('adm_cart', []);
  state.saveToStorage('adm_promo', null);
  updateHeaderBadges();

  closeCheckoutModal();
  openSuccessModal(newOrder);
}

function openSuccessModal(order) {
  const overlay = document.getElementById('order-success-modal-overlay');
  const details = document.getElementById('success-order-details');
  if (!overlay || !details) return;

  details.innerHTML = `
    <div style="background:var(--ivory-100); border:1px solid var(--border-gold); border-radius:12px; padding:1.25rem; margin:1.5rem 0; text-align:left;">
      <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem;">
        <span style="color:var(--text-muted); font-size:0.85rem;">Order Number:</span>
        <strong style="color:var(--forest-800); font-family:monospace; font-size:1rem;">${order.orderNumber}</strong>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem;">
        <span style="color:var(--text-muted); font-size:0.85rem;">Customer:</span>
        <span style="font-weight:600; color:var(--forest-800);">${order.customerName}</span>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem;">
        <span style="color:var(--text-muted); font-size:0.85rem;">Payment Method:</span>
        <span style="font-weight:600; color:var(--forest-800);">${order.paymentMethod.toUpperCase()}</span>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem;">
        <span style="color:var(--text-muted); font-size:0.85rem;">Total Paid:</span>
        <strong style="color:var(--forest-800); font-size:1.1rem;">₹${order.total}</strong>
      </div>
      <div style="border-top:1px dashed var(--border-light); padding-top:0.75rem;">
        <span style="color:var(--text-muted); font-size:0.85rem;">Items Blessed:</span>
        <div style="font-size:0.88rem; color:var(--forest-800); margin-top:0.25rem;">
          ${order.items.join(', ')}
        </div>
      </div>
    </div>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSuccessModal() {
  const overlay = document.getElementById('order-success-modal-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   Order Tracking Lookup
   ========================================================================== */
function initTrackOrder() {
  const trackBtn = document.getElementById('track-order-submit');
  const trackInput = document.getElementById('track-order-input');

  if (trackBtn && trackInput) {
    trackBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const query = trackInput.value.trim().toUpperCase();
      searchOrderTracking(query);
    });
  }
}

function searchOrderTracking(orderNum) {
  const resultCard = document.getElementById('track-result-card');
  if (!resultCard) return;

  if (!orderNum) {
    showToast("Please enter an Order ID", "warning");
    return;
  }

  const order = state.orders.find(o => o.orderNumber.toUpperCase() === orderNum);

  if (!order) {
    resultCard.style.display = 'block';
    resultCard.innerHTML = `
      <div style="text-align:center; padding:1.5rem 0;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size:2rem; color:var(--gold-600); margin-bottom:0.5rem;"></i>
        <h4 style="font-family:var(--font-serif); font-size:1.2rem; color:var(--forest-800);">Order #${orderNum} Not Found</h4>
        <p style="color:var(--text-muted); font-size:0.9rem; margin-top:0.4rem;">
          Please check the order number or check your confirmation SMS. Try <strong>ADM-2026-1001</strong> or <strong>ADM-2026-1002</strong>.
        </p>
      </div>
    `;
    return;
  }

  const steps = [
    { label: "Order Received", icon: "fa-receipt" },
    { label: "Blessed & Packed", icon: "fa-box-open" },
    { label: "Dispatched", icon: "fa-truck-fast" },
    { label: "Delivered", icon: "fa-circle-check" }
  ];

  resultCard.style.display = 'block';
  resultCard.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-light); padding-bottom:1rem; margin-bottom:1.5rem;">
      <div>
        <span style="font-size:0.75rem; text-transform:uppercase; color:var(--gold-700); font-weight:700;">Live Dispatch Status</span>
        <h3 class="font-serif" style="font-size:1.3rem; color:var(--forest-800);">${order.orderNumber}</h3>
      </div>
      <div style="text-align:right;">
        <span class="product-badge gold" style="font-size:0.8rem;">${order.status}</span>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.25rem;">Courier: ${order.courier}</div>
      </div>
    </div>

    <div class="track-timeline">
      ${steps.map((st, i) => {
        const isDone = (i + 1) <= order.step;
        return `
          <div class="timeline-step ${isDone ? 'completed' : ''}">
            <div class="timeline-dot"><i class="fa-solid ${st.icon}"></i></div>
            <span>${st.label}</span>
          </div>
        `;
      }).join('')}
    </div>

    <div style="background:var(--ivory-100); border-radius:8px; padding:1rem; font-size:0.85rem; color:var(--forest-800); margin-top:1.5rem;">
      <strong>Devotee:</strong> ${order.customerName} | <strong>Ordered On:</strong> ${order.date} | <strong>Grand Total:</strong> ₹${order.total}
    </div>
  `;
}

/* ==========================================================================
   Devotee Reviews Rendering & Submission
   ========================================================================== */
function renderReviews() {
  const container = document.getElementById('reviews-grid');
  if (!container) return;

  container.innerHTML = state.reviews.map(rev => `
    <div class="review-card">
      <div>
        <div class="review-top">
          <div class="stars">
            ${'<i class="fa-solid fa-star"></i>'.repeat(rev.rating)}
          </div>
          ${rev.isVerifiedPurchase ? '<span class="review-verified"><i class="fa-solid fa-circle-check"></i> Verified Devotee</span>' : ''}
        </div>
        <div class="review-product-tag">Offering: ${rev.productName}</div>
        <h4>"${rev.title}"</h4>
        <p>"${rev.comment}"</p>
      </div>
      <div class="review-author">
        <div class="author-avatar">${rev.customerName.charAt(0)}</div>
        <div class="author-info">
          <h5>${rev.customerName}</h5>
          <span>${rev.customerLocation}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function initReviewSubmission() {
  const openBtn = document.getElementById('open-review-modal-btn');
  const overlay = document.getElementById('review-modal-overlay');
  const closeBtn = document.getElementById('review-modal-close');
  const form = document.getElementById('devotee-review-form');

  if (openBtn && overlay) {
    openBtn.addEventListener('click', () => {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Star rating selector
  let selectedRating = 5;
  document.querySelectorAll('.star-picker i').forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.dataset.val, 10);
      document.querySelectorAll('.star-picker i').forEach(s => {
        const val = parseInt(s.dataset.val, 10);
        if (val <= selectedRating) {
          s.classList.remove('fa-regular');
          s.classList.add('fa-solid');
        } else {
          s.classList.remove('fa-solid');
          s.classList.add('fa-regular');
        }
      });
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('review-author-name').value;
      const location = document.getElementById('review-author-location').value;
      const product = document.getElementById('review-product-select').value;
      const title = document.getElementById('review-title-input').value;
      const comment = document.getElementById('review-comment-input').value;

      const newReview = {
        id: `rev-${Date.now()}`,
        customerName: name,
        customerLocation: location,
        productName: product,
        rating: selectedRating,
        title: title,
        comment: comment,
        isVerifiedPurchase: true
      };

      state.reviews.unshift(newReview);
      state.saveToStorage('adm_reviews', state.reviews);
      renderReviews();

      overlay.classList.remove('open');
      document.body.style.overflow = '';
      form.reset();
      showToast("Thank you! Your sacred review has been blessed and posted! 🪔", "success");
    });
  }
}

/* ==========================================================================
   FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close other items
        document.querySelectorAll('.faq-item').forEach(other => {
          other.classList.remove('open');
          const otherAns = other.querySelector('.faq-answer');
          if (otherAns) otherAns.style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
        }
      });
    }
  });
}

/* ==========================================================================
   Newsletter Subscription
   ========================================================================== */
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('newsletter-email');
      if (input && input.value) {
        showToast("॥ हर हर महादेव ॥ You have joined the Aaradhya Devotee Circle! 🪔", "success");
        input.value = '';
      }
    });
  }
}

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  let icon = 'fa-circle-info';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'warning') icon = 'fa-triangle-exclamation';
  if (type === 'error') icon = 'fa-circle-xmark';

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 20);

  // Remove after 3.5s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
