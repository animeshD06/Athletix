import { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_WISHLIST': {
            const exists = state.items.find(item => item.id === action.payload.id);
            if (exists) return state;
            return { ...state, items: [...state.items, action.payload] };
        }

        case 'REMOVE_FROM_WISHLIST': {
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
        }

        case 'CLEAR_WISHLIST': {
            return { ...state, items: [] };
        }

        case 'LOAD_WISHLIST': {
            return action.payload;
        }

        default:
            return state;
    }
};

const initialState = {
    items: []
};

export const WishlistProvider = ({ children }) => {
    const [state, dispatch] = useReducer(wishlistReducer, initialState);

    // Load wishlist from localStorage on mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem('athletix_wishlist');
        if (savedWishlist) {
            dispatch({ type: 'LOAD_WISHLIST', payload: JSON.parse(savedWishlist) });
        }
    }, []);

    // Save wishlist to localStorage on change
    useEffect(() => {
        localStorage.setItem('athletix_wishlist', JSON.stringify(state));
    }, [state]);

    const addToWishlist = (product) => {
        dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    };

    const removeFromWishlist = (productId) => {
        dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
    };

    const toggleWishlist = (product) => {
        const exists = state.items.find(item => item.id === product.id);
        if (exists) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const isInWishlist = (productId) => {
        return state.items.some(item => item.id === productId);
    };

    const clearWishlist = () => {
        dispatch({ type: 'CLEAR_WISHLIST' });
    };

    const getWishlistCount = () => {
        return state.items.length;
    };

    const value = {
        wishlist: state,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        getWishlistCount
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
