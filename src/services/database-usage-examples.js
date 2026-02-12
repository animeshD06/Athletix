/**
 * Example of how to integrate the database service with your React components
 * This file shows common usage patterns for the database services
 */

import { UserService, AddressService, OrderService, WishlistService } from '../services/database';

// ============================================
// USER PROFILE EXAMPLES
// ============================================

/**
 * Example: Create/Update user after Firebase authentication
 */
export async function handleUserLogin(firebaseUser) {
  try {
    // Upsert user in database
    const dbUser = await UserService.upsertUser({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      authProvider: 'google'
    });

    console.log('User saved to database:', dbUser);
    return dbUser;
  } catch (error) {
    console.error('Failed to save user:', error);
    throw error;
  }
}

/**
 * Example: Update user profile
 */
export async function updateUserProfile(userId, updates) {
  try {
    const updatedUser = await UserService.updateUser(userId, {
      name: updates.name,
      phone: updates.phone
    });

    console.log('Profile updated:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Failed to update profile:', error);
    throw error;
  }
}

// ============================================
// ADDRESS MANAGEMENT EXAMPLES
// ============================================

/**
 * Example: Load user addresses
 */
export async function loadUserAddresses(userId) {
  try {
    const addresses = await AddressService.getUserAddresses(userId);
    console.log('User addresses:', addresses);
    return addresses;
  } catch (error) {
    console.error('Failed to load addresses:', error);
    return [];
  }
}

/**
 * Example: Add a new address
 */
export async function addNewAddress(userId, addressData) {
  try {
    const newAddress = await AddressService.addAddress(userId, {
      name: addressData.name,
      phone: addressData.phone,
      street: addressData.street,
      city: addressData.city,
      state: addressData.state,
      pincode: addressData.pincode,
      isDefault: addressData.isDefault || false
    });

    console.log('Address added:', newAddress);
    return newAddress;
  } catch (error) {
    console.error('Failed to add address:', error);
    throw error;
  }
}

/**
 * Example: Set default address
 */
export async function makeDefaultAddress(addressId) {
  try {
    const updatedAddress = await AddressService.setDefaultAddress(addressId);
    console.log('Default address set:', updatedAddress);
    return updatedAddress;
  } catch (error) {
    console.error('Failed to set default address:', error);
    throw error;
  }
}

// ============================================
// ORDER MANAGEMENT EXAMPLES
// ============================================

/**
 * Example: Place a new order
 */
export async function placeOrder(userId, orderData) {
  try {
    const order = await OrderService.createOrder(userId, {
      items: orderData.cartItems, // Array of cart items
      subtotal: orderData.subtotal,
      shipping: orderData.shippingCost,
      tax: orderData.tax,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod,
      shippingAddress: orderData.shippingAddress,
      notes: orderData.notes
    });

    console.log('Order placed:', order);
    return order;
  } catch (error) {
    console.error('Failed to place order:', error);
    throw error;
  }
}

/**
 * Example: Load user's order history
 */
export async function loadOrderHistory(userId) {
  try {
    const orders = await OrderService.getUserOrders(userId);
    console.log('Order history:', orders);
    return orders;
  } catch (error) {
    console.error('Failed to load order history:', error);
    return [];
  }
}

/**
 * Example: Get specific order details
 */
export async function getOrderDetails(orderId) {
  try {
    const order = await OrderService.getOrderById(orderId);
    console.log('Order details:', order);
    return order;
  } catch (error) {
    console.error('Failed to load order details:', error);
    return null;
  }
}

// ============================================
// WISHLIST EXAMPLES
// ============================================

/**
 * Example: Load user's wishlist
 */
export async function loadWishlist(userId) {
  try {
    const productIds = await WishlistService.getUserWishlist(userId);
    console.log('Wishlist product IDs:', productIds);
    return productIds;
  } catch (error) {
    console.error('Failed to load wishlist:', error);
    return [];
  }
}

/**
 * Example: Add product to wishlist
 */
export async function addToWishlist(userId, productId) {
  try {
    await WishlistService.addToWishlist(userId, productId);
    console.log('Product added to wishlist:', productId);
    return true;
  } catch (error) {
    console.error('Failed to add to wishlist:', error);
    return false;
  }
}

/**
 * Example: Remove product from wishlist
 */
export async function removeFromWishlist(userId, productId) {
  try {
    await WishlistService.removeFromWishlist(userId, productId);
    console.log('Product removed from wishlist:', productId);
    return true;
  } catch (error) {
    console.error('Failed to remove from wishlist:', error);
    return false;
  }
}

// ============================================
// INTEGRATION WITH REACT CONTEXT
// ============================================

/**
 * Example: How to integrate with AuthContext
 * 
 * In your AuthContext.jsx, after Firebase login:
 */
export const exampleAuthContextIntegration = `
// Inside loginWithGoogle function in AuthContext.jsx

const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUser = result.user;

    // Save user to database
    const dbUser = await UserService.upsertUser({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      authProvider: 'google'
    });

    // Load user's addresses
    const addresses = await AddressService.getUserAddresses(dbUser.id);

    // Load user's orders
    const orders = await OrderService.getUserOrders(dbUser.id);

    // Create user object with database data
    const user = {
      id: dbUser.id, // Use database ID
      firebase_uid: firebaseUser.uid,
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      photoURL: firebaseUser.photoURL,
      addresses: addresses,
      orders: orders,
      authProvider: 'google'
    };

    dispatch({ type: 'LOGIN', payload: user });
    return { success: true, user };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};
`;

/**
 * Example: How to integrate order creation in checkout
 * 
 * In your Checkout component:
 */
export const exampleCheckoutIntegration = `
// Inside handlePlaceOrder function in Checkout.jsx

const handlePlaceOrder = async () => {
  try {
    // Create order in database
    const order = await OrderService.createOrder(user.id, {
      items: cartItems,
      subtotal: subtotal,
      shipping: shippingCost,
      tax: taxAmount,
      total: total,
      paymentMethod: selectedPaymentMethod,
      shippingAddress: selectedAddress,
      notes: deliveryNotes
    });

    // Update context
    addOrder(order);

    // Clear cart
    clearCart();

    // Show success message
    toast.success('Order placed successfully!');

    // Redirect to order confirmation
    navigate(\`/order-confirmation/\${order.id}\`);
  } catch (error) {
    console.error('Order placement failed:', error);
    toast.error('Failed to place order. Please try again.');
  }
};
`;
