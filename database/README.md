# Athletix Database Setup Guide

This guide will help you set up a PostgreSQL database using Supabase for your Athletix e-commerce application.

## 🚀 Quick Start

### Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project
   - Choose a project name (e.g., "athletix")
   - Set a strong database password
   - Select a region closest to you

### Step 2: Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Create a new query
3. Copy the entire contents of `schema.sql`
4. Paste it into the SQL Editor
5. Click **Run** to execute

This will create all necessary tables:
- `users` - User profiles
- `addresses` - User addresses
- `orders` - Order records
- `order_items` - Individual items in each order
- `wishlist` - User wishlist items
- `cart` - Persistent shopping cart

### Step 3: Get Your Supabase Credentials

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy the following:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

3. Also add your existing Firebase credentials if not already present.

### Step 5: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Step 6: Restart Development Server

After setting up the `.env` file:
```bash
# Stop current server (Ctrl+C)
npm run dev
```

## 📊 Database Structure

### Users Table
- Stores user profile information
- Links to Firebase Auth via `firebase_uid`
- Tracks authentication provider

### Addresses Table
- Multiple addresses per user
- One default address per user (enforced by trigger)

### Orders Table
- Complete order information
- Shipping details snapshot
- Order status tracking
- Payment information

### Order Items Table
- Individual products in each order
- Product snapshot at time of purchase
- Quantity and pricing

### Wishlist Table
- User's saved products
- Quick add to cart functionality

### Cart Table
- Persistent cart across devices
- Syncs cart state to database

## 🔒 Security

The database uses **Row Level Security (RLS)** to ensure:
- Users can only access their own data
- No unauthorized access to other users' orders, addresses, or cart
- Automatic enforcement at the database level

## 🔄 Migration from localStorage

The application will automatically migrate data from localStorage to Supabase when a user logs in for the first time after database setup.

## 📝 Testing the Database

After setup, you can test the connection:
1. Run your app: `npm run dev`
2. Register a new account or login
3. Go to Supabase dashboard → **Table Editor**
4. Check the `users` table - you should see your user data!

## 🆘 Troubleshooting

### Connection Issues
- Verify your Supabase URL and key in `.env`
- Check that the `.env` file is in the root directory
- Restart the dev server after changing `.env`

### RLS Policy Issues
- Ensure you're logged in with Firebase Auth
- Check Supabase logs in dashboard → **Logs**

### Schema Errors
- Make sure you ran the entire `schema.sql` file
- Check for any error messages in the SQL Editor

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
