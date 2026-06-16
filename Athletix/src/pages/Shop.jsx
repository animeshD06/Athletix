import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
    Filter, X, ChevronDown, Grid, List, SlidersHorizontal,
    Star, ArrowUpDown
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories, brands, colors } from '../data/products';
import './Shop.css';

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid');

    // Filters state
    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        priceRange: [0, 15000],
        brands: [],
        rating: 0,
        inStock: false,
        onSale: false
    });

    // Sort state
    const [sortBy, setSortBy] = useState('popular');

    // Get filter from URL params
    const urlFilter = searchParams.get('filter');
    const searchQuery = searchParams.get('search') || '';

    // Update category from URL
    useEffect(() => {
        const category = searchParams.get('category');
        if (category) {
            setFilters(prev => ({ ...prev, category }));
        }
    }, [searchParams]);

    // Filtered and sorted products
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // URL filter (new, bestseller, sale)
        if (urlFilter === 'new') {
            result = result.filter(p => p.isNew);
        } else if (urlFilter === 'bestseller') {
            result = result.filter(p => p.isBestSeller);
        } else if (urlFilter === 'sale') {
            result = result.filter(p => p.discount > 0);
        }

        // Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query) ||
                p.brand.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (filters.category) {
            result = result.filter(p => p.category === filters.category);
        }

        // Price filter
        result = result.filter(p =>
            p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
        );

        // Brand filter
        if (filters.brands.length > 0) {
            result = result.filter(p => filters.brands.includes(p.brand));
        }

        // Rating filter
        if (filters.rating > 0) {
            result = result.filter(p => p.rating >= filters.rating);
        }

        // In stock filter
        if (filters.inStock) {
            result = result.filter(p => p.inStock);
        }

        // On sale filter
        if (filters.onSale) {
            result = result.filter(p => p.discount > 0);
        }

        // Sorting
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'popular':
            default:
                result.sort((a, b) => b.reviews - a.reviews);
        }

        return result;
    }, [filters, sortBy, urlFilter, searchQuery]);

    const handleCategoryChange = (category) => {
        setFilters(prev => ({ ...prev, category }));
        if (category) {
            searchParams.set('category', category);
        } else {
            searchParams.delete('category');
        }
        setSearchParams(searchParams);
    };

    const handleBrandToggle = (brand) => {
        setFilters(prev => ({
            ...prev,
            brands: prev.brands.includes(brand)
                ? prev.brands.filter(b => b !== brand)
                : [...prev.brands, brand]
        }));
    };

    const handlePriceChange = (e, index) => {
        const value = parseInt(e.target.value);
        setFilters(prev => {
            const newRange = [...prev.priceRange];
            newRange[index] = value;
            return { ...prev, priceRange: newRange };
        });
    };

    const clearFilters = () => {
        setFilters({
            category: '',
            priceRange: [0, 15000],
            brands: [],
            rating: 0,
            inStock: false,
            onSale: false
        });
        setSearchParams({});
    };

    const activeFiltersCount = [
        filters.category,
        filters.brands.length > 0,
        filters.priceRange[0] > 0 || filters.priceRange[1] < 15000,
        filters.rating > 0,
        filters.inStock,
        filters.onSale
    ].filter(Boolean).length;

    const getPageTitle = () => {
        if (searchQuery) return `Search: "${searchQuery}"`;
        if (urlFilter === 'new') return 'New Arrivals';
        if (urlFilter === 'bestseller') return 'Best Sellers';
        if (urlFilter === 'sale') return 'Sale Items';
        if (filters.category) {
            const cat = categories.find(c => c.slug === filters.category);
            return cat?.name || 'Shop';
        }
        return 'All Products';
    };

    return (
        <main className="shop-page">
            {/* Breadcrumb & Header */}
            <section className="shop-header">
                <div className="container">
                    <nav className="breadcrumb">
                        <Link to="/">Home</Link>
                        <span>/</span>
                        <span>Shop</span>
                        {filters.category && (
                            <>
                                <span>/</span>
                                <span>{categories.find(c => c.slug === filters.category)?.name}</span>
                            </>
                        )}
                    </nav>

                    <div className="shop-title-row">
                        <div>
                            <h1 className="shop-title">{getPageTitle()}</h1>
                            <p className="shop-count">{filteredProducts.length} products found</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Bar */}
            <section className="categories-bar">
                <div className="container">
                    <div className="categories-scroll">
                        <button
                            className={`category-chip ${!filters.category ? 'active' : ''}`}
                            onClick={() => handleCategoryChange('')}
                        >
                            All Products
                        </button>
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`category-chip ${filters.category === category.slug ? 'active' : ''}`}
                                onClick={() => handleCategoryChange(category.slug)}
                            >
                                <span className="category-chip-icon">{category.icon}</span>
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <div className="shop-content">
                <div className="container">
                    <div className="shop-layout">
                        {/* Sidebar Filters */}
                        <aside className={`shop-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                            <div className="sidebar-header">
                                <h3>
                                    <SlidersHorizontal size={20} />
                                    Filters
                                </h3>
                                <button className="sidebar-close" onClick={() => setIsSidebarOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>

                            {activeFiltersCount > 0 && (
                                <button className="clear-filters" onClick={clearFilters}>
                                    Clear All Filters ({activeFiltersCount})
                                </button>
                            )}

                            {/* Price Range */}
                            <div className="filter-group">
                                <h4 className="filter-title">
                                    Price Range
                                    <ChevronDown size={18} />
                                </h4>
                                <div className="price-range">
                                    <div className="price-inputs">
                                        <div className="price-input">
                                            <span>₹</span>
                                            <input
                                                type="number"
                                                value={filters.priceRange[0]}
                                                onChange={(e) => handlePriceChange(e, 0)}
                                                min="0"
                                                max={filters.priceRange[1]}
                                            />
                                        </div>
                                        <span className="price-separator">to</span>
                                        <div className="price-input">
                                            <span>₹</span>
                                            <input
                                                type="number"
                                                value={filters.priceRange[1]}
                                                onChange={(e) => handlePriceChange(e, 1)}
                                                min={filters.priceRange[0]}
                                                max="15000"
                                            />
                                        </div>
                                    </div>
                                    <input
                                        type="range"
                                        className="price-slider"
                                        min="0"
                                        max="15000"
                                        value={filters.priceRange[1]}
                                        onChange={(e) => handlePriceChange(e, 1)}
                                    />
                                </div>
                            </div>

                            {/* Brands */}
                            <div className="filter-group">
                                <h4 className="filter-title">
                                    Brands
                                    <ChevronDown size={18} />
                                </h4>
                                <div className="filter-options">
                                    {brands.map(brand => (
                                        <label key={brand} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={filters.brands.includes(brand)}
                                                onChange={() => handleBrandToggle(brand)}
                                            />
                                            <span className="checkbox-custom" />
                                            {brand}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="filter-group">
                                <h4 className="filter-title">
                                    Rating
                                    <ChevronDown size={18} />
                                </h4>
                                <div className="rating-options">
                                    {[4, 3, 2, 1].map(rating => (
                                        <label key={rating} className="rating-label">
                                            <input
                                                type="radio"
                                                name="rating"
                                                checked={filters.rating === rating}
                                                onChange={() => setFilters(prev => ({ ...prev, rating }))}
                                            />
                                            <span className="radio-custom" />
                                            <div className="rating-stars">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={14}
                                                        fill={i < rating ? 'currentColor' : 'none'}
                                                        className={i < rating ? 'filled' : ''}
                                                    />
                                                ))}
                                            </div>
                                            <span>& Up</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Other Filters */}
                            <div className="filter-group">
                                <h4 className="filter-title">
                                    Availability
                                    <ChevronDown size={18} />
                                </h4>
                                <div className="filter-options">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={filters.inStock}
                                            onChange={() => setFilters(prev => ({ ...prev, inStock: !prev.inStock }))}
                                        />
                                        <span className="checkbox-custom" />
                                        In Stock Only
                                    </label>
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={filters.onSale}
                                            onChange={() => setFilters(prev => ({ ...prev, onSale: !prev.onSale }))}
                                        />
                                        <span className="checkbox-custom" />
                                        On Sale
                                    </label>
                                </div>
                            </div>
                        </aside>

                        {/* Products Grid */}
                        <div className="shop-main">
                            {/* Toolbar */}
                            <div className="shop-toolbar">
                                <button
                                    className="filter-toggle"
                                    onClick={() => setIsSidebarOpen(true)}
                                >
                                    <Filter size={18} />
                                    Filters
                                    {activeFiltersCount > 0 && (
                                        <span className="filter-count">{activeFiltersCount}</span>
                                    )}
                                </button>

                                <div className="toolbar-right">
                                    <div className="sort-dropdown">
                                        <ArrowUpDown size={16} />
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                        >
                                            <option value="popular">Most Popular</option>
                                            <option value="newest">Newest First</option>
                                            <option value="price-low">Price: Low to High</option>
                                            <option value="price-high">Price: High to Low</option>
                                            <option value="rating">Highest Rated</option>
                                        </select>
                                    </div>

                                    <div className="view-toggle">
                                        <button
                                            className={viewMode === 'grid' ? 'active' : ''}
                                            onClick={() => setViewMode('grid')}
                                        >
                                            <Grid size={18} />
                                        </button>
                                        <button
                                            className={viewMode === 'list' ? 'active' : ''}
                                            onClick={() => setViewMode('list')}
                                        >
                                            <List size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Active Filters Tags */}
                            {(filters.brands.length > 0 || filters.rating > 0) && (
                                <div className="active-filters">
                                    {filters.brands.map(brand => (
                                        <span key={brand} className="filter-tag">
                                            {brand}
                                            <button onClick={() => handleBrandToggle(brand)}>
                                                <X size={14} />
                                            </button>
                                        </span>
                                    ))}
                                    {filters.rating > 0 && (
                                        <span className="filter-tag">
                                            {filters.rating}+ Stars
                                            <button onClick={() => setFilters(prev => ({ ...prev, rating: 0 }))}>
                                                <X size={14} />
                                            </button>
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Products */}
                            {filteredProducts.length > 0 ? (
                                <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                                    {filteredProducts.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="no-products">
                                    <div className="no-products-icon">🔍</div>
                                    <h3>No products found</h3>
                                    <p>Try adjusting your filters or search terms</p>
                                    <button className="btn btn-primary" onClick={clearFilters}>
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
            )}
        </main>
    );
};

export default Shop;
