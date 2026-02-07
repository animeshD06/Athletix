import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight, ChevronLeft, ChevronRight, Star,
    Zap, Target, Award, TrendingUp
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import {
    products, categories, reviews, bannerSlides,
    getBestSellers, getNewArrivals, formatPrice
} from '../data/products';
import './Home.css';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const bestSellers = getBestSellers();
    const newArrivals = getNewArrivals();

    // Auto-advance hero slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
    };

    return (
        <main className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-slider">
                    {bannerSlides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="hero-overlay" />
                            <div className="container">
                                <div className="hero-content">
                                    <span className="hero-label animate-fade-in-down">
                                        <Zap size={16} />
                                        Athletix Sports
                                    </span>
                                    <h1 className="hero-title">
                                        <span className="animate-fade-in-left stagger-1">{slide.title}</span>
                                        <span className="animate-fade-in-left stagger-2">{slide.subtitle}</span>
                                        <span className="highlight animate-fade-in-left stagger-3">{slide.highlight}</span>
                                    </h1>
                                    <p className="hero-description animate-fade-in-up stagger-4">
                                        {slide.description}
                                    </p>
                                    <div className="hero-buttons animate-fade-in-up stagger-5">
                                        <Link to="/shop" className="btn btn-primary btn-lg">
                                            {slide.cta}
                                            <ArrowRight size={20} />
                                        </Link>
                                        <Link to="/shop" className="btn btn-white btn-lg">
                                            Explore Categories
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Slider Controls */}
                <div className="hero-controls">
                    <button className="hero-nav prev" onClick={prevSlide}>
                        <ChevronLeft size={24} />
                    </button>
                    <div className="hero-dots">
                        {bannerSlides.map((_, index) => (
                            <button
                                key={index}
                                className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(index)}
                            />
                        ))}
                    </div>
                    <button className="hero-nav next" onClick={nextSlide}>
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Scroll Indicator */}
                <div className="scroll-indicator">
                    <span>Scroll to explore</span>
                    <div className="scroll-line">
                        <div className="scroll-dot" />
                    </div>
                </div>
            </section>

            {/* Features Strip */}
            <section className="features-strip">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon">
                                <Zap size={24} />
                            </div>
                            <div className="feature-text">
                                <strong>Premium Quality</strong>
                                <span>Top-grade materials</span>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">
                                <Target size={24} />
                            </div>
                            <div className="feature-text">
                                <strong>Performance Tested</strong>
                                <span>By pro athletes</span>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">
                                <Award size={24} />
                            </div>
                            <div className="feature-text">
                                <strong>Award Winning</strong>
                                <span>Trusted brand</span>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">
                                <TrendingUp size={24} />
                            </div>
                            <div className="feature-text">
                                <strong>Performance Boost</strong>
                                <span>Level up your game</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="section categories-section">
                <div className="container">
                    <div className="section-header">
                        <div>
                            <span className="section-label">Browse By Sport</span>
                            <h2 className="section-title">Shop by Category</h2>
                        </div>
                        <Link to="/shop" className="view-all-link">
                            View All Categories
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="categories-grid">
                        {categories.map((category, index) => (
                            <Link
                                key={category.id}
                                to={`/shop?category=${category.slug}`}
                                className="category-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="category-image">
                                    <img src={category.image} alt={category.name} />
                                    <div className="category-overlay" />
                                </div>
                                <div className="category-content">
                                    <span className="category-icon">{category.icon}</span>
                                    <h3 className="category-name">{category.name}</h3>
                                    <p className="category-desc">{category.description}</p>
                                    <span className="category-cta">
                                        Shop Now <ArrowRight size={16} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Best Sellers Section */}
            <section className="section bestsellers-section">
                <div className="container">
                    <div className="section-header">
                        <div>
                            <span className="section-label">Top Picks</span>
                            <h2 className="section-title">Best Sellers</h2>
                        </div>
                        <Link to="/shop?filter=bestseller" className="view-all-link">
                            View All
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="products-grid">
                        {bestSellers.slice(0, 8).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Promo Banner */}
            <section className="promo-banner">
                <div className="promo-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1920&h=600&fit=crop)' }} />
                <div className="promo-overlay" />
                <div className="container">
                    <div className="promo-content">
                        <span className="promo-label">Limited Time Offer</span>
                        <h2 className="promo-title">Up to 40% Off Running Gear</h2>
                        <p className="promo-text">
                            Get ready for the season with professional running equipment designed for performance.
                        </p>
                        <div className="promo-buttons">
                            <Link to="/shop?category=running" className="btn btn-primary btn-lg">
                                Shop Running
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Arrivals Section */}
            <section className="section new-arrivals-section">
                <div className="container">
                    <div className="section-header">
                        <div>
                            <span className="section-label">Fresh Drops</span>
                            <h2 className="section-title">New Arrivals</h2>
                        </div>
                        <Link to="/shop?filter=new" className="view-all-link">
                            View All
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="products-grid">
                        {newArrivals.slice(0, 4).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Dual Promo */}
            <section className="section dual-promo">
                <div className="container">
                    <div className="dual-promo-grid">
                        <div
                            className="promo-card"
                            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=500&fit=crop)' }}
                        >
                            <div className="promo-card-overlay" />
                            <div className="promo-card-content">
                                <span className="promo-card-label">Gym & Fitness</span>
                                <h3 className="promo-card-title">Build Your Home Gym</h3>
                                <p>Professional equipment at best prices</p>
                                <Link to="/shop?category=gym-fitness" className="btn btn-white">
                                    Shop Now <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>

                        <div
                            className="promo-card"
                            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=500&fit=crop)' }}
                        >
                            <div className="promo-card-overlay" />
                            <div className="promo-card-content">
                                <span className="promo-card-label">Sportswear</span>
                                <h3 className="promo-card-title">New Athleisure Collection</h3>
                                <p>Style meets performance</p>
                                <Link to="/shop?category=sportswear" className="btn btn-white">
                                    Shop Now <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="section reviews-section">
                <div className="container">
                    <div className="section-header center">
                        <span className="section-label">Customer Love</span>
                        <h2 className="section-title">What Athletes Say</h2>
                    </div>

                    <div className="reviews-grid">
                        {reviews.map((review) => (
                            <div key={review.id} className="review-card">
                                <div className="review-rating">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            fill={i < review.rating ? 'currentColor' : 'none'}
                                            className={i < review.rating ? 'filled' : ''}
                                        />
                                    ))}
                                </div>
                                <h4 className="review-title">{review.title}</h4>
                                <p className="review-comment">{review.comment}</p>
                                <div className="review-author">
                                    <img src={review.avatar} alt={review.name} />
                                    <div>
                                        <span className="author-name">{review.name}</span>
                                        {review.verified && (
                                            <span className="verified-badge">Verified Purchase</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brand Story */}
            <section className="brand-story-section">
                <div className="container">
                    <div className="brand-story-grid">
                        <div className="brand-story-images">
                            <div className="brand-image main">
                                <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=600&fit=crop" alt="Athletes training" />
                            </div>
                            <div className="brand-image secondary">
                                <img src="https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=300&h=350&fit=crop" alt="Sports equipment" />
                            </div>
                            <div className="brand-stats">
                                <div className="stat">
                                    <span className="stat-number">50K+</span>
                                    <span className="stat-label">Happy Athletes</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">100+</span>
                                    <span className="stat-label">Premium Products</span>
                                </div>
                            </div>
                        </div>

                        <div className="brand-story-content">
                            <span className="section-label">Our Story</span>
                            <h2 className="section-title">Unleash the Athlete in You</h2>
                            <p className="brand-story-text">
                                At Athletix, we believe every person has an athlete within. Our mission is to provide
                                premium sports gear that helps you unlock your full potential, whether you're a
                                professional athlete or just starting your fitness journey.
                            </p>
                            <p className="brand-story-text">
                                Each product is designed with precision, tested by professionals, and built to
                                withstand the demands of intense training. We don't just sell sports gear – we
                                empower champions.
                            </p>
                            <div className="brand-values">
                                <div className="value">
                                    <span className="value-icon">💪</span>
                                    <span>Premium Quality</span>
                                </div>
                                <div className="value">
                                    <span className="value-icon">🏆</span>
                                    <span>Professional Grade</span>
                                </div>
                                <div className="value">
                                    <span className="value-icon">🌟</span>
                                    <span>Athlete Approved</span>
                                </div>
                            </div>
                            <Link to="/about" className="btn btn-primary">
                                Learn More About Us
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Instagram Feed Placeholder */}
            <section className="section instagram-section">
                <div className="container">
                    <div className="section-header center">
                        <span className="section-label">@athletix</span>
                        <h2 className="section-title">Follow Us on Instagram</h2>
                    </div>

                    <div className="instagram-grid">
                        {[
                            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop',
                            'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=300&fit=crop',
                            'https://images.unsplash.com/photo-1461896836934- voices.png?w=300&h=300&fit=crop',
                            'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=300&h=300&fit=crop',
                            'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=300&h=300&fit=crop',
                            'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=300&h=300&fit=crop'
                        ].map((img, index) => (
                            <a
                                key={index}
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="instagram-item"
                            >
                                <img src={img} alt={`Instagram post ${index + 1}`} />
                                <div className="instagram-overlay">
                                    <span>@athletix</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
