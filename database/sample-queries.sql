-- ============================================
-- SAMPLE DATA INSERTION QUERIES
-- Use these to test your database setup
-- ============================================

-- Sample User (use this if not using Firebase Auth)
INSERT INTO users (firebase_uid, email, display_name, phone, auth_provider)
VALUES 
  ('test-user-123', 'test@athletix.com', 'Test User', '+91 9876543210', 'email');

-- Sample Addresses for Test User
-- First, get the user ID:
-- SELECT id FROM users WHERE email = 'test@athletix.com';

-- Then insert addresses (replace USER_UUID with the actual UUID from above)
INSERT INTO addresses (user_id, name, phone, street, city, state, pincode, is_default)
VALUES 
  ('USER_UUID', 'John Doe', '+91 9876543210', '123 Main Street, Apt 4B', 'Mumbai', 'Maharashtra', '400001', true),
  ('USER_UUID', 'John Doe', '+91 9876543210', '456 Office Park', 'Pune', 'Maharashtra', '411001', false);

-- Sample Order
INSERT INTO orders (
  order_number, user_id, subtotal, shipping_cost, tax, total,
  payment_method, payment_status, order_status,
  shipping_name, shipping_phone, shipping_street, shipping_city, shipping_state, shipping_pincode
)
VALUES (
  'ATH1707738367890', 'USER_UUID', 12999.00, 100.00, 1300.00, 14399.00,
  'cod', 'pending', 'confirmed',
  'John Doe', '+91 9876543210', '123 Main Street, Apt 4B', 'Mumbai', 'Maharashtra', '400001'
);

-- Sample Order Items (replace ORDER_UUID with actual order ID)
-- SELECT id FROM orders WHERE order_number = 'ATH1707738367890';

INSERT INTO order_items (
  order_id, product_id, product_name, product_slug, product_image,
  selected_color, selected_size, unit_price, quantity, subtotal
)
VALUES 
  ('ORDER_UUID', 1, 'Pro Series Dumbbells Set', 'pro-series-dumbbells-set', 
   'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=600&h=600&fit=crop',
   'Black', '', 12999.00, 1, 12999.00);

-- ============================================
-- USEFUL QUERIES FOR DATABASE MANAGEMENT
-- ============================================

-- Get all users with their order count
SELECT 
  u.id, 
  u.email, 
  u.display_name,
  COUNT(o.id) as order_count,
  SUM(o.total) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.email, u.display_name
ORDER BY total_spent DESC NULLS LAST;

-- Get recent orders with items
SELECT 
  o.order_number,
  o.created_at,
  o.total,
  o.order_status,
  u.email,
  json_agg(
    json_build_object(
      'product_name', oi.product_name,
      'quantity', oi.quantity,
      'price', oi.unit_price
    )
  ) as items
FROM orders o
JOIN users u ON o.user_id = u.id
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id, o.order_number, o.created_at, o.total, o.order_status, u.email
ORDER BY o.created_at DESC
LIMIT 10;

-- Get user's complete profile with addresses and orders
SELECT 
  u.*,
  (SELECT json_agg(a.*) FROM addresses a WHERE a.user_id = u.id) as addresses,
  (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) as total_orders,
  (SELECT SUM(total) FROM orders o WHERE o.user_id = u.id) as lifetime_value
FROM users u
WHERE u.email = 'test@athletix.com';

-- Get product popularity (most ordered products)
SELECT 
  oi.product_id,
  oi.product_name,
  COUNT(*) as order_count,
  SUM(oi.quantity) as total_quantity_sold,
  SUM(oi.subtotal) as total_revenue
FROM order_items oi
GROUP BY oi.product_id, oi.product_name
ORDER BY total_revenue DESC
LIMIT 20;

-- Get orders by status
SELECT 
  order_status,
  COUNT(*) as count,
  SUM(total) as total_amount
FROM orders
GROUP BY order_status
ORDER BY count DESC;

-- Get user activity summary
SELECT 
  DATE(created_at) as date,
  COUNT(*) as new_users
FROM users
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- ============================================
-- DATABASE MAINTENANCE QUERIES
-- ============================================

-- Clean up abandoned carts (older than 30 days)
DELETE FROM cart
WHERE updated_at < CURRENT_TIMESTAMP - INTERVAL '30 days';

-- Find users with no orders
SELECT u.id, u.email, u.display_name, u.created_at
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL
ORDER BY u.created_at DESC;

-- Update order status (example)
UPDATE orders
SET order_status = 'shipped',
    shipped_at = CURRENT_TIMESTAMP,
    tracking_number = 'TRACK123456'
WHERE order_number = 'ATH1707738367890';

-- ============================================
-- ANALYTICS QUERIES
-- ============================================

-- Revenue by month
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as order_count,
  SUM(total) as revenue,
  AVG(total) as avg_order_value
FROM orders
WHERE order_status NOT IN ('cancelled')
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;

-- Top customers
SELECT 
  u.email,
  u.display_name,
  COUNT(o.id) as order_count,
  SUM(o.total) as total_spent,
  MAX(o.created_at) as last_order_date
FROM users u
JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.email, u.display_name
ORDER BY total_spent DESC
LIMIT 10;

-- Average delivery time (for completed orders)
SELECT 
  AVG(EXTRACT(EPOCH FROM (delivered_at - created_at))/86400) as avg_delivery_days
FROM orders
WHERE delivered_at IS NOT NULL;
