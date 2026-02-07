import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    Search, ShoppingCart, Heart, User, Menu, X,
    ChevronDown, LogOut, Package, MapPin
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { categories, products } from '../data/products';
import './Header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const userDropdownRef = useRef(null);

    const { getItemCount } = useCart();
    const { getWishlistCount } = useWishlist();
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
        setIsUserMenuOpen(false);
    }, [location]);

    // Close user dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };

        if (isUserMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isUserMenuOpen]);

    useEffect(() => {
        if (searchQuery.trim()) {
            const results = products.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchQuery.toLowerCase())
            ).slice(0, 5);
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    const handleLogout = () => {
        logout();
        setIsUserMenuOpen(false);
        navigate('/');
    };

    return (
        <>
            {/* Top Bar */}
            <div className="top-bar">
                <div className="container">
                    <div className="top-bar-content">
                        <span>🚚 Free Shipping on Orders Over ₹1000</span>
                        <div className="top-bar-links">
                            <Link to="/about">About Us</Link>
                            <Link to="/contact">Contact</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
                <div className="container">
                    <div className="header-content">
                        {/* Logo */}
                        <Link to="/" className="logo">
                            <span className="logo-icon">⚡</span>
                            <span className="logo-text">Athletix</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="nav-desktop">
                            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                                Home
                            </Link>

                            <div className="nav-dropdown">
                                <span className="nav-link">
                                    Categories <ChevronDown size={16} />
                                </span>
                                <div className="dropdown-menu">
                                    {categories.map(category => (
                                        <Link
                                            key={category.id}
                                            to={`/shop?category=${category.slug}`}
                                            className="dropdown-item"
                                        >
                                            <span className="dropdown-icon">{category.icon}</span>
                                            <div>
                                                <span className="dropdown-title">{category.name}</span>
                                                <span className="dropdown-desc">{category.description}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <Link to="/shop" className={`nav-link ${location.pathname === '/shop' ? 'active' : ''}`}>
                                Shop
                            </Link>

                            <Link to="/shop?filter=new" className="nav-link nav-badge">
                                New Arrivals
                                <span className="badge-dot"></span>
                            </Link>

                            <Link to="/shop?filter=bestseller" className="nav-link">
                                Best Sellers
                            </Link>
                        </nav>

                        {/* Actions */}
                        <div className="header-actions">
                            {/* Search */}
                            <button
                                className="action-btn"
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                aria-label="Search"
                            >
                                <Search size={22} />
                            </button>

                            {/* Wishlist */}
                            <Link to="/account?tab=wishlist" className="action-btn">
                                <Heart size={22} />
                                {getWishlistCount() > 0 && (
                                    <span className="action-badge">{getWishlistCount()}</span>
                                )}
                            </Link>

                            {/* Cart */}
                            <Link to="/cart" className="action-btn">
                                <ShoppingCart size={22} />
                                {getItemCount() > 0 && (
                                    <span className="action-badge">{getItemCount()}</span>
                                )}
                            </Link>

                            {/* User */}
                            <div className="user-dropdown" ref={userDropdownRef}>
                                <button
                                    className="action-btn"
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    aria-label="User menu"
                                >
                                    <User size={22} />
                                </button>

                                {isUserMenuOpen && (
                                    <div className="user-menu">
                                        {isAuthenticated ? (
                                            <>
                                                <div className="user-menu-header">
                                                    <span className="user-greeting">Hello, {user?.name?.split(' ')[0]}</span>
                                                    <span className="user-email">{user?.email}</span>
                                                </div>
                                                <Link to="/account" className="user-menu-item">
                                                    <User size={18} />
                                                    My Account
                                                </Link>
                                                <Link to="/account?tab=orders" className="user-menu-item">
                                                    <Package size={18} />
                                                    Orders
                                                </Link>
                                                <Link to="/account?tab=addresses" className="user-menu-item">
                                                    <MapPin size={18} />
                                                    Addresses
                                                </Link>
                                                <Link to="/account?tab=wishlist" className="user-menu-item">
                                                    <Heart size={18} />
                                                    Wishlist
                                                </Link>
                                                <button onClick={handleLogout} className="user-menu-item logout">
                                                    <LogOut size={18} />
                                                    Logout
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <Link to="/login" className="user-menu-btn primary">
                                                    Login
                                                </Link>
                                                <Link to="/register" className="user-menu-btn secondary">
                                                    Create Account
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Mobile Menu Toggle */}
                            <button
                                className="action-btn mobile-toggle"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search Overlay */}
                <div className={`search-overlay ${isSearchOpen ? 'open' : ''}`}>
                    <div className="container">
                        <form onSubmit={handleSearch} className="search-form">
                            <Search size={24} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search for products, categories, brands..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                            <button type="button" onClick={() => setIsSearchOpen(false)}>
                                <X size={24} />
                            </button>
                        </form>

                        {searchResults.length > 0 && (
                            <div className="search-results">
                                {searchResults.map(product => (
                                    <Link
                                        key={product.id}
                                        to={`/product/${product.slug}`}
                                        className="search-result-item"
                                        onClick={() => {
                                            setIsSearchOpen(false);
                                            setSearchQuery('');
                                        }}
                                    >
                                        <img src={product.images[0]} alt={product.name} />
                                        <div>
                                            <span className="result-name">{product.name}</span>
                                            <span className="result-category">{product.category}</span>
                                        </div>
                                        <span className="result-price">₹{product.price.toLocaleString()}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-content">
                    <nav className="mobile-nav">
                        <Link to="/" className="mobile-nav-link">Home</Link>
                        <Link to="/shop" className="mobile-nav-link">Shop All</Link>

                        <div className="mobile-nav-divider">Categories</div>
                        {categories.map(category => (
                            <Link
                                key={category.id}
                                to={`/shop?category=${category.slug}`}
                                className="mobile-nav-link category"
                            >
                                <span>{category.icon}</span>
                                {category.name}
                            </Link>
                        ))}

                        <div className="mobile-nav-divider">Quick Links</div>
                        <Link to="/shop?filter=new" className="mobile-nav-link">New Arrivals</Link>
                        <Link to="/shop?filter=bestseller" className="mobile-nav-link">Best Sellers</Link>
                        <Link to="/about" className="mobile-nav-link">About Us</Link>
                        <Link to="/contact" className="mobile-nav-link">Contact</Link>
                    </nav>

                    <div className="mobile-menu-footer">
                        {isAuthenticated ? (
                            <button onClick={handleLogout} className="btn btn-outline">Logout</button>
                        ) : (
                            <div className="mobile-auth-btns">
                                <Link to="/login" className="btn btn-primary">Login</Link>
                                <Link to="/register" className="btn btn-outline">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div
                    className="overlay"
                    onClick={() => {
                        setIsMobileMenuOpen(false);
                    }}
                />
            )}
        </>
    );
};

export default Header;
