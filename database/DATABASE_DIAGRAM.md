# Athletix Database Schema - Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                     ATHLETIX E-COMMERCE DATABASE                     │
│                      PostgreSQL Schema (Supabase)                    │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│       USERS          │
├──────────────────────┤
│ PK id (UUID)         │
│    firebase_uid      │◄──────── Linked to Firebase Auth
│    email             │
│    display_name      │
│    phone             │
│    photo_url         │
│    auth_provider     │
│    created_at        │
│    updated_at        │
│    last_login        │
└──────────┬───────────┘
           │
           │ One user has many addresses
           │
           ▼
┌──────────────────────┐
│     ADDRESSES        │
├──────────────────────┤
│ PK id (UUID)         │
│ FK user_id           │◄──────── References users(id)
│    name              │
│    phone             │
│    street            │
│    city              │
│    state             │
│    pincode           │
│    is_default        │◄──────── Only one can be TRUE per user
│    created_at        │
│    updated_at        │
└──────────────────────┘

┌──────────────────────┐
│       USERS          │
└──────────┬───────────┘
           │
           │ One user has many orders
           │
           ▼
┌──────────────────────┐
│       ORDERS         │
├──────────────────────┤
│ PK id (UUID)         │
│    order_number      │◄──────── e.g., "ATH1707738367890"
│ FK user_id           │◄──────── References users(id)
│                      │
│ --- Order Details ---│
│    subtotal          │
│    shipping_cost     │
│    tax               │
│    total             │
│                      │
│ --- Payment ------   │
│    payment_method    │◄──────── 'cod', 'card', 'upi'
│    payment_status    │◄──────── 'pending', 'paid', 'failed'
│                      │
│ --- Shipping -----   │
│    shipping_name     │
│    shipping_phone    │
│    shipping_street   │
│    shipping_city     │
│    shipping_state    │
│    shipping_pincode  │
│                      │
│ --- Status -------   │
│    order_status      │◄──────── 'confirmed', 'shipped', 'delivered'
│    tracking_number   │
│    notes             │
│                      │
│ --- Timestamps ---   │
│    created_at        │
│    updated_at        │
│    shipped_at        │
│    delivered_at      │
│    cancelled_at      │
└──────────┬───────────┘
           │
           │ One order has many items
           │
           ▼
┌──────────────────────┐
│    ORDER_ITEMS       │
├──────────────────────┤
│ PK id (UUID)         │
│ FK order_id          │◄──────── References orders(id)
│                      │
│ --- Product Info --- │
│    product_id        │◄──────── Reference to products (in JS)
│    product_name      │◄──────── Snapshot at order time
│    product_slug      │
│    product_image     │
│                      │
│ --- Variant ------   │
│    selected_color    │
│    selected_size     │
│                      │
│ --- Pricing ------   │
│    unit_price        │
│    quantity          │
│    subtotal          │◄──────── unit_price × quantity
│                      │
│    created_at        │
└──────────────────────┘

┌──────────────────────┐
│       USERS          │
└──────────┬───────────┘
           │
           │ One user has many wishlist items
           │
           ▼
┌──────────────────────┐
│      WISHLIST        │
├──────────────────────┤
│ PK id (UUID)         │
│ FK user_id           │◄──────── References users(id)
│    product_id        │◄──────── Reference to products (in JS)
│    added_at          │
│                      │
│ UNIQUE(user_id,      │◄──────── One entry per user-product
│        product_id)   │
└──────────────────────┘

┌──────────────────────┐
│       USERS          │
└──────────┬───────────┘
           │
           │ One user has one cart with many items
           │
           ▼
┌──────────────────────┐
│        CART          │
├──────────────────────┤
│ PK id (UUID)         │
│ FK user_id           │◄──────── References users(id)
│    product_id        │◄──────── Reference to products (in JS)
│    quantity          │
│    selected_color    │
│    selected_size     │
│    added_at          │
│    updated_at        │
│                      │
│ UNIQUE(user_id,      │◄──────── One entry per variant
│        product_id,   │
│        color, size)  │
└──────────────────────┘


═══════════════════════════════════════════════════════════════════════
                            RELATIONSHIPS
═══════════════════════════════════════════════════════════════════════

1. USER → ADDRESSES     : One-to-Many (User has multiple addresses)
2. USER → ORDERS        : One-to-Many (User places multiple orders)
3. ORDER → ORDER_ITEMS  : One-to-Many (Order contains multiple items)
4. USER → WISHLIST      : One-to-Many (User saves multiple products)
5. USER → CART          : One-to-Many (User has cart items)


═══════════════════════════════════════════════════════════════════════
                          SECURITY FEATURES
═══════════════════════════════════════════════════════════════════════

✓ Row Level Security (RLS) enabled on ALL tables
✓ Users can ONLY access their OWN data
✓ Policies enforce user_id = auth.uid()
✓ Database automatically validates Firebase JWT tokens


═══════════════════════════════════════════════════════════════════════
                            INDEXES
═══════════════════════════════════════════════════════════════════════

USERS table:
  - idx_users_email (email)
  - idx_users_firebase_uid (firebase_uid)

ADDRESSES table:
  - idx_addresses_user_id (user_id)

ORDERS table:
  - idx_orders_user_id (user_id)
  - idx_orders_order_number (order_number)
  - idx_orders_created_at (created_at DESC)
  - idx_orders_status (order_status)

ORDER_ITEMS table:
  - idx_order_items_order_id (order_id)
  - idx_order_items_product_id (product_id)

WISHLIST table:
  - idx_wishlist_user_product (user_id, product_id) UNIQUE
  - idx_wishlist_user_id (user_id)

CART table:
  - idx_cart_user_product_variant (user_id, product_id, color, size) UNIQUE
  - idx_cart_user_id (user_id)


═══════════════════════════════════════════════════════════════════════
                          TRIGGERS & FUNCTIONS
═══════════════════════════════════════════════════════════════════════

1. update_updated_at_column()
   - Automatically updates 'updated_at' timestamp on record modification
   - Applied to: users, addresses, orders, cart

2. ensure_single_default_address()
   - Ensures only ONE address is marked as default per user
   - Automatically unsets other default addresses when new one is set


═══════════════════════════════════════════════════════════════════════
                          DATA FLOW
═══════════════════════════════════════════════════════════════════════

User Registration/Login:
  Firebase Auth → UserService.upsertUser() → USERS table

Add Address:
  Frontend Form → AddressService.addAddress() → ADDRESSES table

Place Order:
  Checkout → OrderService.createOrder() → ORDERS + ORDER_ITEMS tables

Add to Wishlist:
  Product Page → WishlistService.addToWishlist() → WISHLIST table

Cart Sync:
  Cart Context → CartService → CART table
```
