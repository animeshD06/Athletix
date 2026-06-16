import { createContext, useContext, useReducer, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { UserService, AddressService, OrderService } from '../services/database';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': {
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                loading: false
            };
        }

        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false
            };
        }

        case 'UPDATE_PROFILE': {
            return {
                ...state,
                user: { ...state.user, ...action.payload }
            };
        }

        case 'SET_ADDRESSES': {
            return {
                ...state,
                user: { ...state.user, addresses: action.payload }
            };
        }

        case 'ADD_ADDRESS': {
            const addresses = [...(state.user?.addresses || []), action.payload];
            return {
                ...state,
                user: { ...state.user, addresses }
            };
        }

        case 'REMOVE_ADDRESS_ID': {
            const addresses = state.user?.addresses?.filter((a) => a._id !== action.payload) || [];
            return {
                ...state,
                user: { ...state.user, addresses }
            };
        }

        case 'SET_DEFAULT_ADDRESS_ID': {
            const addresses = state.user?.addresses?.map((addr) => ({
                ...addr,
                isDefault: addr._id === action.payload
            })) || [];
            return {
                ...state,
                user: { ...state.user, addresses }
            };
        }

        case 'SET_ORDERS': {
            return {
                ...state,
                user: { ...state.user, orders: action.payload }
            };
        }

        case 'ADD_ORDER': {
            const orders = [action.payload, ...(state.user?.orders || [])];
            return {
                ...state,
                user: { ...state.user, orders }
            };
        }

        case 'SET_LOADING': {
            return { ...state, loading: action.payload };
        }

        case 'LOAD_USER': {
            return action.payload;
        }

        default:
            return state;
    }
};

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: true
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load user from localStorage on mount & Sync with backend
    useEffect(() => {
        const savedUser = localStorage.getItem('athletix_user');
        
        const syncWithDb = async (parsedUser) => {
            if (parsedUser?.user?.id) {
                try {
                    const dbUser = await UserService.getUserByFirebaseUid(parsedUser.user.id);
                    if (dbUser) {
                        const addresses = await AddressService.getUserAddresses(dbUser.id) || [];
                        const orders = await OrderService.getUserOrders(dbUser.id) || [];
                        dispatch({ 
                            type: 'LOGIN', 
                            payload: { ...parsedUser.user, addresses, orders } 
                        });
                    }
                } catch (err) {
                    console.error('Initial DB sync failed', err);
                }
            }
        };

        if (savedUser) {
            const parsed = JSON.parse(savedUser);
            dispatch({ type: 'LOAD_USER', payload: parsed });
            syncWithDb(parsed); // Rehydrate completely from MongoDB in background
        } else {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    // Save user to localStorage across sessions
    useEffect(() => {
        if (!state.loading) {
            localStorage.setItem('athletix_user', JSON.stringify(state));
        }
    }, [state]);

    const register = (userData) => {
        // Mock register for Demo
        const user = {
            id: Date.now().toString(),
            ...userData,
            addresses: [],
            orders: [],
            createdAt: new Date().toISOString()
        };
        dispatch({ type: 'LOGIN', payload: user });
        return true;
    };

    const login = (email, password) => {
        const savedState = localStorage.getItem('athletix_user');
        if (savedState) {
            const parsed = JSON.parse(savedState);
            if (parsed.user?.email === email) {
                dispatch({ type: 'LOGIN', payload: parsed.user });
                return true;
            }
        }

        // Demo login for testing
        if (email === 'demo@athletix.com' && password === 'demo123') {
            const demoUser = {
                id: 'dummyFirebaseUid123',
                name: 'John Doe',
                email: 'testuser@athletix.com',
                phone: '+1 234 567 8900',
                addresses: [
                    {
                        _id: 'sample_addr',
                        name: 'Demo User',
                        phone: '+91 9876543210',
                        street: '123 Sports Complex',
                        city: 'Mumbai',
                        state: 'Maharashtra',
                        pincode: '400001',
                        isDefault: true
                    }
                ],
                orders: [],
                createdAt: new Date().toISOString()
            };
            dispatch({ type: 'LOGIN', payload: demoUser });
            return true;
        }

        return false;
    };

    // Google Sign-In with MongoDB backend integration
    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const firebaseUser = result.user;

            // Save to MongoDB Backend
            const dbUser = await UserService.upsertUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                name: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                phone: firebaseUser.phoneNumber || '',
                authProvider: 'google'
            });

            // Fetch live data directly from DB
            const dbAddresses = await AddressService.getUserAddresses(dbUser.id) || [];
            const dbOrders = await OrderService.getUserOrders(dbUser.id) || [];

            // Shape standard state object
            const user = {
                id: dbUser.id,
                name: dbUser.displayName || firebaseUser.displayName || 'User',
                email: dbUser.email,
                phone: dbUser.phone || '',
                photoURL: dbUser.photoUrl,
                addresses: dbAddresses,
                orders: dbOrders,
                authProvider: 'google',
                createdAt: dbUser.createdAt
            };

            dispatch({ type: 'LOGIN', payload: user });
            return { success: true, user };
        } catch (error) {
            console.error('Google & DB login error:', error);
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            if (state.user?.authProvider === 'google') {
                await signOut(auth);
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('athletix_user');
    };

    const updateProfile = async (data) => {
        try {
            if (state.user?.id) {
                await UserService.updateUser(state.user.id, data);
            }
            dispatch({ type: 'UPDATE_PROFILE', payload: data });
        } catch(e) {
            console.error(e);
        }
    };

    const addAddress = async (address) => {
        try {
            if (state.user?.id) {
                const addedAddr = await AddressService.addAddress(state.user.id, address);
                dispatch({ type: 'ADD_ADDRESS', payload: addedAddr });
            } else {
                // Fallback offline
                dispatch({ type: 'ADD_ADDRESS', payload: { ...address, _id: Date.now().toString() } });
            }
        } catch(e) { console.error('Error adding address', e); }
    };

    const removeAddress = async (addressId) => {
        try {
            if (state.user?.id) {
                await AddressService.deleteAddress(state.user.id, addressId);
            }
            dispatch({ type: 'REMOVE_ADDRESS_ID', payload: addressId });
        } catch(e) { console.error('Error deleting address', e); }
    };

    const setDefaultAddress = async (addressId) => {
        try {
            if (state.user?.id) {
                await AddressService.setDefaultAddress(state.user.id, addressId);
            }
            dispatch({ type: 'SET_DEFAULT_ADDRESS_ID', payload: addressId });
        } catch(e) { console.error('Error setting default addr', e); }
    };

    const addOrder = async (orderData) => {
        try {
            if (state.user?.id) {
                const newOrder = await OrderService.createOrder(state.user.id, orderData);
                dispatch({ type: 'ADD_ORDER', payload: newOrder });
                return newOrder;
            }
            return null;
        } catch(e) {
            console.error('Error placing order', e);
            throw e;
        }
    };

    const getDefaultAddress = () => {
        return state.user?.addresses?.find(addr => addr.isDefault) || state.user?.addresses?.[0];
    };

    const value = {
        ...state,
        register,
        login,
        loginWithGoogle,
        logout,
        updateProfile,
        addAddress,
        removeAddress,
        setDefaultAddress,
        addOrder,
        getDefaultAddress
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
