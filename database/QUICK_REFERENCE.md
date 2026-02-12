# 🎯 Database Quick Reference

## ⚡ Quick Commands

### Start Fresh
```bash
# 1. Create .env file with your Supabase credentials
# 2. Restart dev server
npm run dev
```

### Check Database Connection
```javascript
// In browser console
import { isSupabaseConfigured } from './src/config/supabase';
console.log('Database configured:', isSupabaseConfigured());
```

---

## 📋 Common Operations

### Save User to Database
```javascript
import { UserService } from './services/database';

const dbUser = await UserService.upsertUser({
  uid: firebaseUser.uid,
  email: firebaseUser.email,
  name: firebaseUser.displayName
});
```

### Add Address
```javascript
import { AddressService } from './services/database';

const address = await AddressService.addAddress(userId, {
  name: 'John Doe',
  phone: '+91 9876543210',
  street: '123 Main St',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400001'
});
```

### Create Order
```javascript
import { OrderService } from './services/database';

const order = await OrderService.createOrder(userId, {
  items: cartItems,
  subtotal: 12999,
  shipping: 100,
  tax: 1300,
  total: 14399,
  paymentMethod: 'cod',
  shippingAddress: address
});
```

### Manage Wishlist
```javascript
import { WishlistService } from './services/database';

// Add to wishlist
await WishlistService.addToWishlist(userId, productId);

// Remove from wishlist
await WishlistService.removeFromWishlist(userId, productId);

// Get wishlist
const wishlist = await WishlistService.getUserWishlist(userId);
```

---

## 🔍 Useful SQL Queries

### View All Tables
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

### Count Records
```sql
SELECT 'users' as table, COUNT(*) FROM users
UNION ALL
SELECT 'orders', COUNT(*) FROM orders
UNION ALL
SELECT 'addresses', COUNT(*) FROM addresses;
```

### Recent Orders
```sql
SELECT 
  order_number,
  total,
  order_status,
  created_at
FROM orders
ORDER BY created_at DESC
LIMIT 10;
```

### User Details
```sql
SELECT 
  u.*,
  COUNT(DISTINCT o.id) as order_count,
  COUNT(DISTINCT a.id) as address_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
LEFT JOIN addresses a ON u.id = a.user_id
GROUP BY u.id;
```

---

## 🗂️ File Locations

```
c:\Users\hp\ecomm\
├── database/
│   ├── schema.sql              ← Database schema (run in Supabase)
│   ├── sample-queries.sql      ← Example SQL queries
│   ├── README.md               ← Quick setup guide
│   └── DATABASE_DIAGRAM.md     ← Visual schema diagram
│
├── src/
│   ├── config/
│   │   └── supabase.js         ← Supabase client config
│   │
│   └── services/
│       ├── database.js         ← Database service layer
│       └── database-usage-examples.js  ← Usage examples
│
├── .env.example                ← Environment template
├── .env                        ← Your credentials (create this!)
└── DATABASE_SETUP_GUIDE.md     ← Full setup instructions
```

---

## 🛠️ Environment Variables

Required in `.env`:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

---

## 🔑 Service Methods Reference

### UserService
- `upsertUser(userData)` - Create or update user
- `getUserByFirebaseUid(uid)` - Get user by Firebase UID
- `updateUser(userId, updates)` - Update user profile

### AddressService
- `getUserAddresses(userId)` - Get all addresses
- `addAddress(userId, data)` - Add new address
- `updateAddress(addressId, updates)` - Update address
- `deleteAddress(addressId)` - Delete address
- `setDefaultAddress(addressId)` - Set as default

### OrderService
- `createOrder(userId, orderData)` - Create new order
- `getUserOrders(userId)` - Get all user orders
- `getOrderById(orderId)` - Get specific order
- `updateOrderStatus(orderId, status)` - Update order status

### WishlistService
- `getUserWishlist(userId)` - Get wishlist items
- `addToWishlist(userId, productId)` - Add to wishlist
- `removeFromWishlist(userId, productId)` - Remove from wishlist

---

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Supabase not configured" | Check `.env` file and restart server |
| Can't save user | Verify schema was run in Supabase |
| RLS policy error | Check Firebase auth is working |
| Connection timeout | Check Supabase project is active |

---

## 📚 Next Steps

1. ✅ **Set up Supabase** - Follow `DATABASE_SETUP_GUIDE.md`
2. ✅ **Configure .env** - Add your credentials
3. ✅ **Test connection** - Login and check Supabase tables
4. 🔄 **Integrate with app** - Update AuthContext and Checkout
5. 📊 **Add analytics** - Use sample-queries.sql

---

## 🆘 Need Help?

- **Setup Guide**: Open `DATABASE_SETUP_GUIDE.md`
- **Schema Diagram**: Open `database/DATABASE_DIAGRAM.md`
- **Examples**: Open `src/services/database-usage-examples.js`
- **Queries**: Open `database/sample-queries.sql`
