import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingIndex = state.items.findIndex(
                item => item.id === action.payload.id &&
                    item.selectedColor === action.payload.selectedColor &&
                    item.selectedSize === action.payload.selectedSize
            );

            if (existingIndex >= 0) {
                const updatedItems = [...state.items];
                updatedItems[existingIndex].quantity += action.payload.quantity || 1;
                return { ...state, items: updatedItems };
            }

            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }]
            };
        }

        case 'REMOVE_FROM_CART': {
            return {
                ...state,
                items: state.items.filter((_, index) => index !== action.payload)
            };
        }

        case 'UPDATE_QUANTITY': {
            const updatedItems = [...state.items];
            if (action.payload.quantity < 1) {
                return {
                    ...state,
                    items: state.items.filter((_, index) => index !== action.payload.index)
                };
            }
            updatedItems[action.payload.index].quantity = action.payload.quantity;
            return { ...state, items: updatedItems };
        }

        case 'APPLY_COUPON': {
            const coupons = {
                'ATHLETIX10': { discount: 10, type: 'percentage' },
                'SAVE500': { discount: 500, type: 'fixed' },
                'FIRST20': { discount: 20, type: 'percentage' }
            };

            const coupon = coupons[action.payload.toUpperCase()];
            if (coupon) {
                return { ...state, coupon: { code: action.payload.toUpperCase(), ...coupon } };
            }
            return state;
        }

        case 'REMOVE_COUPON': {
            return { ...state, coupon: null };
        }

        case 'CLEAR_CART': {
            return { ...state, items: [], coupon: null };
        }

        case 'LOAD_CART': {
            return action.payload;
        }

        default:
            return state;
    }
};

const initialState = {
    items: [],
    coupon: null
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('athletix_cart');
        if (savedCart) {
            dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
        }
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        localStorage.setItem('athletix_cart', JSON.stringify(state));
    }, [state]);

    const addToCart = (product, selectedColor = '', selectedSize = '', quantity = 1) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: { ...product, selectedColor, selectedSize, quantity }
        });
    };

    const removeFromCart = (index) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: index });
    };

    const updateQuantity = (index, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { index, quantity } });
    };

    const applyCoupon = (code) => {
        dispatch({ type: 'APPLY_COUPON', payload: code });
        return !!state.coupon;
    };

    const removeCoupon = () => {
        dispatch({ type: 'REMOVE_COUPON' });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const getSubtotal = () => {
        return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getOriginalTotal = () => {
        return state.items.reduce((total, item) => total + (item.originalPrice * item.quantity), 0);
    };

    const getDiscount = () => {
        if (!state.coupon) return 0;
        const subtotal = getSubtotal();
        if (state.coupon.type === 'percentage') {
            return Math.round(subtotal * state.coupon.discount / 100);
        }
        return state.coupon.discount;
    };

    const getShipping = () => {
        const subtotal = getSubtotal();
        return subtotal >= 1000 ? 0 : 99;
    };

    const getTotal = () => {
        return getSubtotal() - getDiscount() + getShipping();
    };

    const getItemCount = () => {
        return state.items.reduce((count, item) => count + item.quantity, 0);
    };

    const value = {
        cart: state,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        clearCart,
        getSubtotal,
        getOriginalTotal,
        getDiscount,
        getShipping,
        getTotal,
        getItemCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
