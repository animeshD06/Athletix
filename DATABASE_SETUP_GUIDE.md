# 🗄️ Athletix SQL Database - Complete Setup Guide

## ✅ What You Have Now

Your Athletix e-commerce project now has a complete **PostgreSQL database** setup with:

### 📦 Files Created:
- **`database/schema.sql`** - Complete database schema with all tables
- **`database/sample-queries.sql`** - Example queries for testing and analytics
- **`database/README.md`** - Quick setup guide
- **`src/config/supabase.js`** - Supabase client configuration
- **`src/services/database.js`** - Database service layer (UserService, AddressService, OrderService, WishlistService)
- **`src/services/database-usage-examples.js`** - Integration examples
- **`.env.example`** - Environment variables template
- **`.gitignore`** - Updated to protect credentials

### 🗃️ Database Tables:
1. **users** - User profiles (linked to Firebase Auth)
2. **addresses** - Multiple addresses per user
3. **orders** - Order records with full details
4. **order_items** - Products in each order
5. **wishlist** - User's saved products
6. **cart** - Persistent shopping cart

---

## 🚀 Quick Start (5 Steps)

### Step 1: Create Supabase Account (2 minutes)

1. Go to https://supabase.com
2. Click **"Start your project"**
3. Sign up with GitHub or Email
4. Create a new project:
   - **Name**: `athletix` (or your choice)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Select closest to your location
   - Click **"Create new project"** and wait ~2 minutes

### Step 2: Set Up Database Schema (1 minute)

1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Open `database/schema.sql` in your code editor
4. **Copy ALL contents** of the file
5. **Paste** into the Supabase SQL Editor
6. Click **RUN** (or press Ctrl+Enter)
7. You should see "Success. No rows returned"

✅ **Verify**: Go to **Table Editor** → You should see 6 tables (users, addresses, orders, etc.)

### Step 3: Get Your Database Credentials (1 minute)

1. In Supabase dashboard, go to **Settings** → **API**
2. Find these two values:

   ```
   Project URL
   https://xxxxxxxxxxxxx.supabase.co
   
   anon public key
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M... (long string)
   ```

3. **Copy both values** - you'll need them next!

### Step 4: Configure Environment Variables (1 minute)

1. In your project root (`c:\Users\hp\ecomm`), create a file named **`.env`**:

   ```bash
   # Create .env file (if not exists)
   # Copy .env.example to .env
   ```

2. Open `.env` and add your credentials:

   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

   # Your existing Firebase config (keep these)
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

3. **Replace** the placeholder values with your actual credentials
4. **Save** the file

⚠️ **Important**: Never commit `.env` to Git (it's already in `.gitignore`)

### Step 5: Test the Setup (1 minute)

1. **Restart your development server**:
   ```bash
   # Press Ctrl+C to stop current server
   npm run dev
   ```

2. Open your app in browser
3. **Sign up** or **Login** with Google
4. Go back to **Supabase Dashboard** → **Table Editor** → **users**
5. ✅ You should see your user record!

---

## 📊 How It Works

### Current Flow:

```
User Signs In (Firebase)
      ↓
AuthContext detects login
      ↓
Call UserService.upsertUser()
      ↓
Save user to Supabase PostgreSQL
      ↓
Load addresses & orders from database
      ↓
Update app state
```

### What's Stored Where:

| Data | Storage | Reason |
|------|---------|--------|
| Authentication | Firebase | Secure auth with Google, Email, etc. |
| User Profiles | Supabase | Persistent, queryable, relational |
| Orders | Supabase | Permanent record, analytics |
| Addresses | Supabase | Multi-device sync |
| Wishlist | Supabase | Sync across devices |
| Products | Static JS file | Fast loading, no DB needed (for now) |
| Cart | localStorage (can sync to DB) | Fast, but can be enhanced |

---

## 🔧 Next Steps to Integrate with Your App

### Option A: Automatic Integration (Recommended)

I can update your `AuthContext.jsx` and `Checkout.jsx` to automatically:
- Save users to database on login
- Load orders and addresses from database
- Save new orders to database
- Sync wishlist with database

**Just say**: *"Integrate the database with my app"*

### Option B: Manual Integration

Follow the examples in `src/services/database-usage-examples.js`:

1. **In `AuthContext.jsx`** - After Firebase login:
   ```javascript
   import { UserService, AddressService, OrderService } from './services/database';
   
   // Inside loginWithGoogle:
   const dbUser = await UserService.upsertUser(firebaseUser);
   const addresses = await AddressService.getUserAddresses(dbUser.id);
   const orders = await OrderService.getUserOrders(dbUser.id);
   ```

2. **In `Checkout.jsx`** - When placing order:
   ```javascript
   import { OrderService } from '../services/database';
   
   const order = await OrderService.createOrder(user.id, orderData);
   ```

---

## 🧪 Testing Your Database

### Test 1: View Tables

1. Supabase → **Table Editor**
2. Click on each table to see structure

### Test 2: Run Sample Queries

1. Supabase → **SQL Editor**
2. Copy queries from `database/sample-queries.sql`
3. Run them to see results

### Test 3: Check User Data

After logging in:
```sql
-- In Supabase SQL Editor
SELECT * FROM users;
```

---

## 🔐 Security Features

✅ **Row Level Security (RLS)** is enabled
- Users can only access their own data
- Enforced at database level
- No way to bypass from frontend

✅ **Environment Variables** are protected
- `.env` not committed to Git
- Credentials kept secret

✅ **Firebase + Supabase** integration
- Firebase handles auth
- Supabase validates auth tokens
- Secure end-to-end

---

## 📈 Database Analytics

You can now track:
- Total users
- Order statistics
- Revenue by month
- Top customers
- Product popularity
- Delivery times

Use queries in `database/sample-queries.sql` for analytics.

---

## 🆘 Troubleshooting

### Issue: "Supabase not configured" warning

**Solution**: 
1. Check `.env` file exists in project root
2. Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
3. Restart dev server (`npm run dev`)

### Issue: "Failed to save user" error

**Solution**:
1. Check Supabase → **Logs** → **Error logs**
2. Verify schema was executed successfully
3. Check RLS policies are enabled

### Issue: Can't see user in database

**Solution**:
1. Check browser console for errors
2. Verify Firebase auth is working
3. Check Supabase logs for RLS policy issues

### Issue: CORS errors

**Solution**:
1. Supabase → **Settings** → **API**
2. Check that your localhost is allowed (it is by default)

---

## 🎯 Benefits You Now Have

✅ **Persistent Data** - Data survives browser clear, works across devices
✅ **Real Database** - PostgreSQL with full SQL power
✅ **Scalable** - Handles millions of records
✅ **Free Tier** - Generous free tier from Supabase
✅ **Analytics** - Query your data for insights
✅ **Secure** - Row-level security built-in
✅ **Fast** - Optimized indexes and queries
✅ **Real-time** - Can add real-time features later

---

## 📚 Useful Resources

- **Supabase Docs**: https://supabase.com/docs
- **SQL Tutorial**: https://www.postgresql.org/docs/current/tutorial.html
- **Supabase JS Client**: https://supabase.com/docs/reference/javascript/introduction

---

## ✨ Ready to Go!

Your SQL database is now set up and ready to use. 

**Want me to integrate it with your app automatically?** Just ask! 🚀
