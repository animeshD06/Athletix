import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight, Zap, Play, Star,
    ChevronRight
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import {
    PersonalizedRecommendations,
    RecentlyViewed,
    TrendingProducts
} from '../components/RecommendationSection';
import {
    products, categories, getBestSellers, getNewArrivals, formatPrice
} from '../data/products';
import './Home.css';

// Generate random stars for background
const generateStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
        stars.push({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            size: Math.random() * 2 + 1
        });
    }
    return stars;
};

const Home = () => {
    const bestSellers = getBestSellers();
    const newArrivals = getNewArrivals();
    const featuredProducts = products.slice(0, 4);

    // Generate stars once
    const stars = useMemo(() => generateStars(100), []);
    const ctaStars = useMemo(() => generateStars(50), []);

    return (
        <main className="home">
            {/* ============================================
                1. HERO SECTION - Beyond Gravity
            ============================================ */}
            <section className="hero-galaxy">
                {/* Animated Stars Background */}
                <div className="stars-container">
                    {stars.map((star) => (
                        <div
                            key={star.id}
                            className="star"
                            style={{
                                left: star.left,
                                top: star.top,
                                animationDelay: star.animationDelay,
                                width: `${star.size}px`,
                                height: `${star.size}px`
                            }}
                        />
                    ))}
                </div>

                {/* Nebula Glow Effects */}
                <div className="nebula nebula-1" />
                <div className="nebula nebula-2" />
                <div className="nebula nebula-3" />

                {/* Floating Particles */}
                <div className="particles">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="particle" />
                    ))}
                </div>

                <div className="container">
                    {/* Hero Text Content */}
                    <div className="hero-text-content">
                        <span className="hero-galaxy-label">
                            <Zap size={14} />
                            Athletix Sports
                        </span>

                        <h1 className="hero-galaxy-title">
                            ATHLETIX
                        </h1>

                        <p className="hero-galaxy-subtitle">
                            Beyond Limits. Beyond Gravity.
                        </p>

                        <div className="hero-galaxy-buttons">
                            <Link to="/shop" className="btn-galaxy-primary">
                                Shop Collection
                                <ArrowRight size={18} />
                            </Link>
                            <button className="btn-galaxy-secondary">
                                <Play size={18} />
                                Watch Gear
                            </button>
                        </div>
                    </div>

                    {/* Floating 3D Product */}
                    <div className="hero-3d-product">
                        <div className="floating-product">
                            <img
                                src="hero-shoe.png"
                                alt="Featured Shoe"
                            />
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="scroll-indicator-galaxy">
                    <span>Scroll to Explore</span>
                    <div className="scroll-arrow" />
                </div>
            </section>






            {/* ============================================
                4. FEATURED PRODUCTS - Floating Cards
            ============================================ */}
            <section className="featured-galaxy">
                <div className="container">
                    <div className="section-header-galaxy">
                        <span className="section-label-galaxy">New Drops</span>
                        <h2 className="section-title-galaxy">Featured Products</h2>
                    </div>

                    <div className="products-grid-galaxy">
                        {featuredProducts.map((product, index) => (
                            <Link
                                to={`/product/${product.slug}`}
                                key={product.id}
                                className="product-card-galaxy"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="product-image-container">
                                    <img src={product.images[0]} alt={product.name} />
                                    <div className="product-glow" />
                                </div>
                                <div className="product-info-galaxy">
                                    <h3 className="product-name-galaxy">{product.name}</h3>
                                    <p className="product-price-galaxy">{formatPrice(product.price)}</p>
                                </div>
                                <div className="product-add-cart">
                                    Add to Cart
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
                        <Link to="/shop" className="btn-galaxy-primary">
                            View All Products
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ============================================
                5. CATEGORY EXPLORATION
            ============================================ */}
            <section className="categories-galaxy">
                <Link to="/shop?category=men" className="category-galaxy-card">
                    <div
                        className="category-galaxy-bg"
                        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800)' }}
                    />
                    <div className="category-galaxy-overlay" />
                    <div className="category-galaxy-content">
                        <h3 className="category-galaxy-title">Men</h3>
                        <span className="category-galaxy-btn">
                            Explore
                            <ChevronRight size={20} />
                        </span>
                    </div>
                </Link>

                <Link to="/shop?category=women" className="category-galaxy-card">
                    <div
                        className="category-galaxy-bg"
                        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800)' }}
                    />
                    <div className="category-galaxy-overlay" />
                    <div className="category-galaxy-content">
                        <h3 className="category-galaxy-title">Women</h3>
                        <span className="category-galaxy-btn">
                            Explore
                            <ChevronRight size={20} />
                        </span>
                    </div>
                </Link>
            </section>

            {/* ============================================
                6. SOCIAL PROOF / COMMUNITY
            ============================================ */}
            <section className="social-proof-galaxy">
                <div className="container">
                    <h2 className="proof-title">Trusted by Athletes Across India</h2>
                    <p className="proof-subtitle">Join thousands of athletes who choose Athletix</p>

                    <div className="rating-display">
                        <span className="rating-number">4.8</span>
                        <div>
                            <div className="rating-stars">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={24} fill={i < 4 ? '#fbbf24' : 'none'} />
                                ))}
                            </div>
                            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
                                Based on 10,000+ reviews
                            </span>
                        </div>
                    </div>

                    <div className="proof-stats">
                        <div className="proof-stat" data-aos="fade-up">
                            <div className="proof-stat-number">50K+</div>
                            <div className="proof-stat-label">Happy Athletes</div>
                        </div>
                        <div className="proof-stat" data-aos="fade-up" data-aos-delay="100">
                            <div className="proof-stat-number">100+</div>
                            <div className="proof-stat-label">Cities Delivered</div>
                        </div>
                        <div className="proof-stat" data-aos="fade-up" data-aos-delay="200">
                            <div className="proof-stat-number">4.8★</div>
                            <div className="proof-stat-label">Average Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================
                AI-Powered Recommendations
            ============================================ */}
            <section className="featured-galaxy">
                <div className="container">
                    <PersonalizedRecommendations limit={4} />
                    <div style={{ marginTop: 'var(--space-16)' }}>
                        <TrendingProducts limit={4} />
                    </div>
                </div>
            </section>

            {/* ============================================
                7. FINAL CTA
            ============================================ */}
            <section className="final-cta-galaxy">
                {/* Animated Stars Background */}
                <div className="stars-container">
                    {ctaStars.map((star) => (
                        <div
                            key={star.id}
                            className="star"
                            style={{
                                left: star.left,
                                top: star.top,
                                animationDelay: star.animationDelay,
                                width: `${star.size}px`,
                                height: `${star.size}px`
                            }}
                        />
                    ))}
                </div>

                <div className="cta-content">
                    <h2 className="cta-title">
                        Ready to Move
                        <span>Beyond Limits?</span>
                    </h2>
                    <Link to="/shop" className="btn-galaxy-primary" style={{ fontSize: '1.125rem', padding: '1.25rem 3rem' }}>
                        Shop Athletix Now
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            {/* Recently Viewed (if available) */}
            <section className="featured-galaxy">
                <div className="container">
                    <RecentlyViewed limit={4} />
                </div>
            </section>
        </main>
    );
};

export default Home;
