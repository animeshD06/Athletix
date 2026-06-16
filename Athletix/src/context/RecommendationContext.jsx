import { createContext, useContext, useReducer, useEffect } from 'react';

const RecommendationContext = createContext();

const recommendationReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_HISTORY': {
            const productId = action.payload;
            // Remove if already exists, add to front
            const filtered = state.viewHistory.filter(id => id !== productId);
            const newHistory = [productId, ...filtered].slice(0, 20); // Keep last 20
            return { ...state, viewHistory: newHistory };
        }

        case 'ADD_TO_SEARCH_HISTORY': {
            const term = action.payload.toLowerCase();
            const filtered = state.searchHistory.filter(t => t !== term);
            const newSearchHistory = [term, ...filtered].slice(0, 10);
            return { ...state, searchHistory: newSearchHistory };
        }

        case 'TRACK_CATEGORY': {
            const category = action.payload;
            const currentCount = state.categoryPreferences[category] || 0;
            return {
                ...state,
                categoryPreferences: {
                    ...state.categoryPreferences,
                    [category]: currentCount + 1
                }
            };
        }

        case 'TRACK_PURCHASE': {
            const productIds = action.payload;
            return {
                ...state,
                purchaseHistory: [...productIds, ...state.purchaseHistory].slice(0, 50)
            };
        }

        case 'LOAD_STATE': {
            return { ...state, ...action.payload };
        }

        default:
            return state;
    }
};

const initialState = {
    viewHistory: [],
    searchHistory: [],
    categoryPreferences: {},
    purchaseHistory: []
};

export const RecommendationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(recommendationReducer, initialState);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('athletix_recommendations');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                dispatch({ type: 'LOAD_STATE', payload: parsed });
            } catch (e) {
                console.error('Failed to load recommendation data', e);
            }
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem('athletix_recommendations', JSON.stringify(state));
    }, [state]);

    // Track product view
    const trackProductView = (productId, category) => {
        dispatch({ type: 'ADD_TO_HISTORY', payload: productId });
        if (category) {
            dispatch({ type: 'TRACK_CATEGORY', payload: category });
        }
    };

    // Track search
    const trackSearch = (term) => {
        if (term && term.trim()) {
            dispatch({ type: 'ADD_TO_SEARCH_HISTORY', payload: term.trim() });
        }
    };

    // Track purchase
    const trackPurchase = (productIds) => {
        dispatch({ type: 'TRACK_PURCHASE', payload: productIds });
    };

    // Get AI-powered recommendations based on user behavior
    const getRecommendations = (allProducts, currentProductId = null, limit = 8) => {
        const { viewHistory, categoryPreferences, purchaseHistory } = state;

        // Score each product based on user preferences
        const scoredProducts = allProducts
            .filter(p => p.id !== currentProductId) // Exclude current product
            .map(product => {
                let score = 0;

                // Higher score for preferred categories
                const categoryScore = categoryPreferences[product.category] || 0;
                score += categoryScore * 10;

                // Boost new arrivals
                if (product.isNew) score += 5;

                // Boost best sellers
                if (product.isBestSeller) score += 8;

                // Boost products with good ratings
                score += (product.rating || 0) * 2;

                // Boost products on sale
                if (product.originalPrice) score += 3;

                // Reduce score if already viewed (for diversity)
                if (viewHistory.includes(product.id)) score -= 2;

                // Reduce score if already purchased
                if (purchaseHistory.includes(product.id)) score -= 10;

                // Add some randomness for variety
                score += Math.random() * 3;

                return { ...product, score };
            });

        // Sort by score and return top recommendations
        return scoredProducts
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    };

    // Get "You May Also Like" recommendations based on current product
    const getSimilarProducts = (allProducts, currentProduct, limit = 4) => {
        if (!currentProduct) return [];

        const scoredProducts = allProducts
            .filter(p => p.id !== currentProduct.id)
            .map(product => {
                let score = 0;

                // Same category = high score
                if (product.category === currentProduct.category) score += 20;

                // Same brand = medium score
                if (product.brand === currentProduct.brand) score += 10;

                // Similar price range (within 30%)
                const priceDiff = Math.abs(product.price - currentProduct.price) / currentProduct.price;
                if (priceDiff < 0.3) score += 5;

                // Boost best sellers
                if (product.isBestSeller) score += 5;

                // Add randomness
                score += Math.random() * 3;

                return { ...product, score };
            });

        return scoredProducts
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    };

    // Get recently viewed products
    const getRecentlyViewed = (allProducts, limit = 4) => {
        const { viewHistory } = state;
        return viewHistory
            .slice(0, limit)
            .map(id => allProducts.find(p => p.id === id))
            .filter(Boolean);
    };

    // Get trending products (most viewed categories + best sellers)
    const getTrendingProducts = (allProducts, limit = 8) => {
        const { categoryPreferences } = state;

        // Get top 3 categories user is interested in
        const topCategories = Object.entries(categoryPreferences)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([cat]) => cat);

        const scoredProducts = allProducts.map(product => {
            let score = 0;

            // Boost if in top categories
            if (topCategories.includes(product.category)) score += 15;

            // Best sellers get priority
            if (product.isBestSeller) score += 10;

            // New arrivals
            if (product.isNew) score += 5;

            // High ratings
            score += (product.rating || 0) * 2;

            // Randomness
            score += Math.random() * 5;

            return { ...product, score };
        });

        return scoredProducts
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    };

    const value = {
        ...state,
        trackProductView,
        trackSearch,
        trackPurchase,
        getRecommendations,
        getSimilarProducts,
        getRecentlyViewed,
        getTrendingProducts
    };

    return (
        <RecommendationContext.Provider value={value}>
            {children}
        </RecommendationContext.Provider>
    );
};

export const useRecommendations = () => {
    const context = useContext(RecommendationContext);
    if (!context) {
        throw new Error('useRecommendations must be used within a RecommendationProvider');
    }
    return context;
};
