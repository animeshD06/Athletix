import { auth } from '../firebase/config';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Get the current user's Firebase ID token for authenticated requests.
 * Returns null if the user is not signed in via Firebase.
 */
const getAuthToken = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Build headers with optional auth token
 */
const getHeaders = async () => {
  const headers = { 'Content-Type': 'application/json' };
  const token = await getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

/**
 * Helper to handle fetch responses
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API Error');
  }
  return response.json();
};

/**
 * Database Service for User Profile Operations
 */
export class UserService {
  static async upsertUser(userData) {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify({
          firebaseUid: userData.uid || userData.id || userData.firebaseUid,
          email: userData.email,
          displayName: userData.name || userData.displayName,
          phone: userData.phone || '',
          photoUrl: userData.photoURL || '',
          authProvider: userData.authProvider || 'email'
        })
      });
      const data = await handleResponse(response);
      return { ...data, id: data.firebaseUid }; // Map id to firebaseUid for frontend compatibility
    } catch (error) {
      console.error('Error upserting user:', error);
      throw error;
    }
  }

  static async getUserByFirebaseUid(firebaseUid) {
    try {
      const response = await fetch(`${API_URL}/users/${firebaseUid}`, {
        headers: await getHeaders()
      });
      if (response.status === 404) return null;
      const data = await handleResponse(response);
      return { ...data, id: data.firebaseUid };
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  static async updateUser(firebaseUid, updates) {
    try {
      const response = await fetch(`${API_URL}/users/${firebaseUid}`, {
        method: 'PUT',
        headers: await getHeaders(),
        body: JSON.stringify(updates)
      });
      const data = await handleResponse(response);
      return { ...data, id: data.firebaseUid };
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
  static async getUserAddresses(firebaseUid) {
    try {
      const response = await fetch(`${API_URL}/users/${firebaseUid}/addresses`, {
        headers: await getHeaders()
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      return [];
    }
  }

  static async addAddress(firebaseUid, addressData) {
    try {
      const response = await fetch(`${API_URL}/users/${firebaseUid}/addresses`, {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify(addressData)
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error adding address:', error);
      throw error;
    }
  }

  static async updateAddress(firebaseUid, addressId, updates) {
    try {
      const response = await fetch(`${API_URL}/users/${firebaseUid}/addresses/${addressId}`, {
        method: 'PUT',
        headers: await getHeaders(),
        body: JSON.stringify(updates)
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  }

  static async deleteAddress(firebaseUid, addressId) {
    try {
      const response = await fetch(`${API_URL}/users/${firebaseUid}/addresses/${addressId}`, {
        method: 'DELETE',
        headers: await getHeaders()
      });
      await handleResponse(response);
      return true;
    } catch (error) {
      console.error('Error deleting address:', error);
      throw error;
    }
  }

  static async setDefaultAddress(firebaseUid, addressId) {
    try {
      const response = await fetch(`${API_URL}/users/${firebaseUid}/addresses/${addressId}/default`, {
        method: 'PUT',
        headers: await getHeaders()
      });
      return await handleResponse(response);
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
  static async createOrder(firebaseUid, orderData) {
    try {
      const payload = {
        firebaseUid,
        ...orderData
      };

      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify(payload)
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  static async getUserOrders(firebaseUid) {
    try {
      const response = await fetch(`${API_URL}/orders/myorders/${firebaseUid}`, {
        headers: await getHeaders()
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }

  static async getOrderById(orderId) {
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        headers: await getHeaders()
      });
      if (response.status === 404) return null;
      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  }

  static async updateOrderStatus(orderId, status) {
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: await getHeaders(),
        body: JSON.stringify({ status })
      });
      return await handleResponse(response);
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
  static async getUserWishlist(firebaseUid) {
    try {
      const response = await fetch(`${API_URL}/wishlist/${firebaseUid}`, {
        headers: await getHeaders()
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      return [];
    }
  }

  static async addToWishlist(firebaseUid, productId) {
    try {
      const response = await fetch(`${API_URL}/wishlist`, {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify({ firebaseUid, productId })
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  }

  static async removeFromWishlist(firebaseUid, productId) {
    try {
      const response = await fetch(`${API_URL}/wishlist/${firebaseUid}/${productId}`, {
        method: 'DELETE',
        headers: await getHeaders()
      });
      await handleResponse(response);
      return true;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  }
}

/**
 * Database Service for Payment Operations
 */
export class PaymentService {
  static async createRazorpayOrder(amount) {
    try {
      const response = await fetch(`${API_URL}/payment/create-order`, {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify({ amount })
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error creating razorpay order:', error);
      throw error;
    }
  }

  static async verifyPayment(paymentData) {
    try {
      const response = await fetch(`${API_URL}/payment/verify`, {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify(paymentData)
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  }
}
