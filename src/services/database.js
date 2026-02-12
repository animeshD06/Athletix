import { supabase, isSupabaseConfigured } from '../config/supabase';

/**
 * Database Service for User Profile Operations
 */
export class UserService {
  /**
   * Create or update user profile in database
   * @param {Object} userData - User data from Firebase Auth
   * @returns {Promise<Object>} User profile
   */
  static async upsertUser(userData) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, using localStorage');
      return userData;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .upsert({
          firebase_uid: userData.uid || userData.id,
          email: userData.email,
          display_name: userData.name || userData.displayName,
          phone: userData.phone || '',
          photo_url: userData.photoURL || '',
          auth_provider: userData.authProvider || 'email',
          last_login: new Date().toISOString()
        }, {
          onConflict: 'firebase_uid',
          returning: 'representation'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error upserting user:', error);
      throw error;
    }
  }

  /**
   * Get user profile by Firebase UID
   * @param {string} firebaseUid - Firebase user ID
   * @returns {Promise<Object>} User profile
   */
  static async getUserByFirebaseUid(firebaseUid) {
    if (!isSupabaseConfigured()) return null;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('firebase_uid', firebaseUid)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  /**
   * Update user profile
   * @param {string} userId - Database user ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} Updated user profile
   */
  static async updateUser(userId, updates) {
    if (!isSupabaseConfigured()) return updates;

    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          display_name: updates.name || updates.display_name,
          phone: updates.phone,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}

/**
 * Database Service for Address Operations
 */
export class AddressService {
  /**
   * Get all addresses for a user
   * @param {string} userId - Database user ID
   * @returns {Promise<Array>} User addresses
   */
  static async getUserAddresses(userId) {
    if (!isSupabaseConfigured()) return [];

    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching addresses:', error);
      return [];
    }
  }

  /**
   * Add a new address
   * @param {string} userId - Database user ID
   * @param {Object} addressData - Address details
   * @returns {Promise<Object>} Created address
   */
  static async addAddress(userId, addressData) {
    if (!isSupabaseConfigured()) return addressData;

    try {
      const { data, error } = await supabase
        .from('addresses')
        .insert({
          user_id: userId,
          name: addressData.name,
          phone: addressData.phone,
          street: addressData.street,
          city: addressData.city,
          state: addressData.state,
          pincode: addressData.pincode,
          is_default: addressData.isDefault || false
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding address:', error);
      throw error;
    }
  }

  /**
   * Update an address
   * @param {string} addressId - Address ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} Updated address
   */
  static async updateAddress(addressId, updates) {
    if (!isSupabaseConfigured()) return updates;

    try {
      const { data, error } = await supabase
        .from('addresses')
        .update({
          name: updates.name,
          phone: updates.phone,
          street: updates.street,
          city: updates.city,
          state: updates.state,
          pincode: updates.pincode,
          is_default: updates.isDefault,
          updated_at: new Date().toISOString()
        })
        .eq('id', addressId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  }

  /**
   * Delete an address
   * @param {string} addressId - Address ID
   * @returns {Promise<boolean>} Success status
   */
  static async deleteAddress(addressId) {
    if (!isSupabaseConfigured()) return true;

    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', addressId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting address:', error);
      throw error;
    }
  }

  /**
   * Set an address as default
   * @param {string} addressId - Address ID
   * @returns {Promise<Object>} Updated address
   */
  static async setDefaultAddress(addressId) {
    if (!isSupabaseConfigured()) return { id: addressId, isDefault: true };

    try {
      const { data, error } = await supabase
        .from('addresses')
        .update({ is_default: true })
        .eq('id', addressId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error setting default address:', error);
      throw error;
    }
  }
}

/**
 * Database Service for Order Operations
 */
export class OrderService {
  /**
   * Create a new order
   * @param {string} userId - Database user ID
   * @param {Object} orderData - Order details
   * @returns {Promise<Object>} Created order with items
   */
  static async createOrder(userId, orderData) {
    if (!isSupabaseConfigured()) {
      return { ...orderData, id: `ATH${Date.now()}` };
    }

    try {
      // Generate unique order number
      const orderNumber = `ATH${Date.now()}`;

      // Insert order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          user_id: userId,
          subtotal: orderData.subtotal,
          shipping_cost: orderData.shipping || 0,
          tax: orderData.tax || 0,
          total: orderData.total,
          payment_method: orderData.paymentMethod,
          payment_status: orderData.paymentMethod === 'cod' ? 'pending' : 'paid',
          shipping_name: orderData.shippingAddress.name,
          shipping_phone: orderData.shippingAddress.phone,
          shipping_street: orderData.shippingAddress.street,
          shipping_city: orderData.shippingAddress.city,
          shipping_state: orderData.shippingAddress.state,
          shipping_pincode: orderData.shippingAddress.pincode,
          order_status: 'confirmed',
          notes: orderData.notes || ''
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Insert order items
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        product_slug: item.slug,
        product_image: item.images?.[0] || '',
        selected_color: item.selectedColor || '',
        selected_size: item.selectedSize || '',
        unit_price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return { ...order, items: orderItems };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  /**
   * Get all orders for a user
   * @param {string} userId - Database user ID
   * @returns {Promise<Array>} User orders with items
   */
  static async getUserOrders(userId) {
    if (!isSupabaseConfigured()) return [];

    try {
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;
      return orders || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }

  /**
   * Get a single order by ID
   * @param {string} orderId - Order ID
   * @returns {Promise<Object>} Order with items
   */
  static async getOrderById(orderId) {
    if (!isSupabaseConfigured()) return null;

    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('id', orderId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  }

  /**
   * Update order status
   * @param {string} orderId - Order ID
   * @param {string} status - New status
   * @returns {Promise<Object>} Updated order
   */
  static async updateOrderStatus(orderId, status) {
    if (!isSupabaseConfigured()) return { id: orderId, status };

    try {
      const updates = {
        order_status: status,
        updated_at: new Date().toISOString()
      };

      // Add timestamp for specific statuses
      if (status === 'shipped') updates.shipped_at = new Date().toISOString();
      if (status === 'delivered') updates.delivered_at = new Date().toISOString();
      if (status === 'cancelled') updates.cancelled_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }
}

/**
 * Database Service for Wishlist Operations
 */
export class WishlistService {
  /**
   * Get user's wishlist
   * @param {string} userId - Database user ID
   * @returns {Promise<Array>} Product IDs in wishlist
   */
  static async getUserWishlist(userId) {
    if (!isSupabaseConfigured()) return [];

    try {
      const { data, error } = await supabase
        .from('wishlist')
        .select('product_id')
        .eq('user_id', userId);

      if (error) throw error;
      return data?.map(item => item.product_id) || [];
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      return [];
    }
  }

  /**
   * Add item to wishlist
   * @param {string} userId - Database user ID
   * @param {number} productId - Product ID
   * @returns {Promise<Object>} Created wishlist item
   */
  static async addToWishlist(userId, productId) {
    if (!isSupabaseConfigured()) return { userId, productId };

    try {
      const { data, error } = await supabase
        .from('wishlist')
        .insert({
          user_id: userId,
          product_id: productId
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  }

  /**
   * Remove item from wishlist
   * @param {string} userId - Database user ID
   * @param {number} productId - Product ID
   * @returns {Promise<boolean>} Success status
   */
  static async removeFromWishlist(userId, productId) {
    if (!isSupabaseConfigured()) return true;

    try {
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  }
}
