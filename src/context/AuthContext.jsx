import { createContext, useContext, useReducer, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';

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

        case 'ADD_ADDRESS': {
            const addresses = [...(state.user?.addresses || []), action.payload];
            return {
                ...state,
                user: { ...state.user, addresses }
            };
        }

        case 'REMOVE_ADDRESS': {
            const addresses = state.user?.addresses?.filter((_, i) => i !== action.payload) || [];
            return {
                ...state,
                user: { ...state.user, addresses }
            };
        }

        case 'SET_DEFAULT_ADDRESS': {
            const addresses = state.user?.addresses?.map((addr, i) => ({
                ...addr,
                isDefault: i === action.payload
            })) || [];
            return {
                ...state,
                user: { ...state.user, addresses }
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

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('athletix_user');
        if (savedUser) {
            dispatch({ type: 'LOAD_USER', payload: JSON.parse(savedUser) });
        } else {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    // Save user to localStorage on change
    useEffect(() => {
        if (!state.loading) {
            localStorage.setItem('athletix_user', JSON.stringify(state));
        }
    }, [state]);

    const register = (userData) => {
        const user = {
            id: Date.now(),
            ...userData,
            addresses: [],
            orders: [],
            createdAt: new Date().toISOString()
        };
        dispatch({ type: 'LOGIN', payload: user });
        return true;
    };

    const login = (email, password) => {
        // In a real app, this would validate against a backend
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
                id: 1,
                name: 'Demo User',
                email: 'demo@athletix.com',
                phone: '+91 9876543210',
                addresses: [
                    {
                        id: 1,
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

    // Google Sign-In
    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const firebaseUser = result.user;

            // Check if user data exists in localStorage
            const savedState = localStorage.getItem('athletix_user');
            let existingUserData = null;

            if (savedState) {
                const parsed = JSON.parse(savedState);
                if (parsed.user?.email === firebaseUser.email) {
                    existingUserData = parsed.user;
                }
            }

            // Create user object, preserving existing addresses and orders if any
            const user = {
                id: firebaseUser.uid,
                name: firebaseUser.displayName || 'User',
                email: firebaseUser.email,
                phone: firebaseUser.phoneNumber || existingUserData?.phone || '',
                photoURL: firebaseUser.photoURL,
                addresses: existingUserData?.addresses || [],
                orders: existingUserData?.orders || [],
                authProvider: 'google',
                createdAt: existingUserData?.createdAt || new Date().toISOString()
            };

            dispatch({ type: 'LOGIN', payload: user });
            return { success: true, user };
        } catch (error) {
            console.error('Google login error:', error);
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            // Sign out from Firebase if logged in with Google
            if (state.user?.authProvider === 'google') {
                await signOut(auth);
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('athletix_user');
    };

    const updateProfile = (data) => {
        dispatch({ type: 'UPDATE_PROFILE', payload: data });
    };

    const addAddress = (address) => {
        const newAddress = {
            id: Date.now(),
            ...address,
            isDefault: state.user?.addresses?.length === 0
        };
        dispatch({ type: 'ADD_ADDRESS', payload: newAddress });
    };

    const removeAddress = (index) => {
        dispatch({ type: 'REMOVE_ADDRESS', payload: index });
    };

    const setDefaultAddress = (index) => {
        dispatch({ type: 'SET_DEFAULT_ADDRESS', payload: index });
    };

    const addOrder = (order) => {
        const newOrder = {
            id: `ATH${Date.now()}`,
            ...order,
            status: 'confirmed',
            createdAt: new Date().toISOString()
        };
        dispatch({ type: 'ADD_ORDER', payload: newOrder });
        return newOrder;
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
