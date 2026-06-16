import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Clock, TrendingUp, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRecommendations } from '../context/RecommendationContext';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import './RecommendationSection.css';

// AI Personalized Recommendations
export const PersonalizedRecommendations = ({ limit = 8 }) => {
    const { getRecommendations, viewHistory } = useRecommendations();
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const recs = getRecommendations(products, null, limit);
        setRecommendations(recs);
    }, [viewHistory, limit]);

    if (recommendations.length === 0) return null;

    return (
        <section className="section recommendation-section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div>
                        <span className="section-label ai-label">
                            <Sparkles size={14} className="sparkle-icon" />
                            AI Powered
                        </span>
                        <h2 className="section-title">Recommended For You</h2>
                        <p className="section-subtitle">
                            Personalized picks based on your browsing history
                        </p>
                    </div>
                    <Link to="/shop" className="view-all-link">
                        View All
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>

                <motion.div
                    className="products-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 }
                        }
                    }}
                >
                    {recommendations.map((product, index) => (
                        <motion.div
                            key={product.id}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.4 }
                                }
                            }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

// Recently Viewed Products
export const RecentlyViewed = ({ limit = 4 }) => {
    const { getRecentlyViewed } = useRecommendations();
    const [recentProducts, setRecentProducts] = useState([]);

    useEffect(() => {
        const recent = getRecentlyViewed(products, limit);
        setRecentProducts(recent);
    }, [limit]);

    if (recentProducts.length === 0) return null;

    return (
        <section className="section recently-viewed-section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div>
                        <span className="section-label history-label">
                            <Clock size={14} />
                            Your History
                        </span>
                        <h2 className="section-title">Recently Viewed</h2>
                    </div>
                    <Link to="/shop" className="view-all-link">
                        Continue Shopping
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>

                <motion.div
                    className="products-grid grid-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.08 }
                        }
                    }}
                >
                    {recentProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={{
                                hidden: { opacity: 0, scale: 0.95 },
                                visible: {
                                    opacity: 1,
                                    scale: 1,
                                    transition: { duration: 0.3 }
                                }
                            }}
                        >
                            <ProductCard product={product} compact />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

// Trending Products (based on user behavior + best sellers)
export const TrendingProducts = ({ limit = 4 }) => {
    const { getTrendingProducts } = useRecommendations();
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        const trendingProducts = getTrendingProducts(products, limit);
        setTrending(trendingProducts);
    }, [limit]);

    if (trending.length === 0) return null;

    return (
        <section className="section trending-section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div>
                        <span className="section-label trending-label">
                            <TrendingUp size={14} />
                            Hot Right Now
                        </span>
                        <h2 className="section-title">Trending For You</h2>
                    </div>
                </motion.div>

                <div className="trending-grid">
                    {trending.map((product, index) => (
                        <motion.div
                            key={product.id}
                            className={`trending-card ${index === 0 ? 'featured' : ''}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <Link to={`/product/${product.id}`} className="trending-link">
                                <div className="trending-image">
                                    <img src={product.images[0]} alt={product.name} />
                                    <div className="trending-overlay">
                                        <span className="trending-rank">#{index + 1}</span>
                                    </div>
                                </div>
                                <div className="trending-info">
                                    <span className="trending-brand">{product.brand}</span>
                                    <h3 className="trending-name">{product.name}</h3>
                                    <span className="trending-price">₹{product.price.toLocaleString()}</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Similar Products (for Product Detail page)
export const SimilarProducts = ({ currentProduct, limit = 4 }) => {
    const { getSimilarProducts } = useRecommendations();
    const [similar, setSimilar] = useState([]);

    useEffect(() => {
        if (currentProduct) {
            const similarProducts = getSimilarProducts(products, currentProduct, limit);
            setSimilar(similarProducts);
        }
    }, [currentProduct, limit]);

    if (similar.length === 0) return null;

    return (
        <section className="section similar-products-section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div>
                        <span className="section-label">
                            <Eye size={14} />
                            You May Also Like
                        </span>
                        <h2 className="section-title">Similar Products</h2>
                    </div>
                </motion.div>

                <motion.div
                    className="products-grid grid-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 }
                        }
                    }}
                >
                    {similar.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.4 }
                                }
                            }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

// Complete My Look (complementary products)
export const CompleteMyLook = ({ currentProduct }) => {
    const [complementary, setComplementary] = useState([]);

    useEffect(() => {
        if (!currentProduct) return;

        // Find products from different categories that complement
        const complementaryCategories = {
            'running': ['gym-fitness', 'sportswear'],
            'gym-fitness': ['running', 'sportswear'],
            'sportswear': ['running', 'gym-fitness'],
            'football': ['sportswear'],
            'cricket': ['sportswear'],
            'basketball': ['sportswear', 'gym-fitness']
        };

        const targetCategories = complementaryCategories[currentProduct.category] || [];

        const complementaryProducts = products
            .filter(p =>
                targetCategories.includes(p.category) &&
                p.id !== currentProduct.id
            )
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        setComplementary(complementaryProducts);
    }, [currentProduct]);

    if (complementary.length === 0) return null;

    return (
        <section className="complete-look-section">
            <div className="container">
                <motion.div
                    className="complete-look-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Sparkles size={20} className="sparkle-icon" />
                    <h3>Complete Your Look</h3>
                </motion.div>

                <div className="complete-look-grid">
                    {complementary.map((product, index) => (
                        <motion.div
                            key={product.id}
                            className="complete-look-item"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link to={`/product/${product.id}`}>
                                <img src={product.images[0]} alt={product.name} />
                                <div className="complete-look-info">
                                    <span className="brand">{product.brand}</span>
                                    <span className="name">{product.name}</span>
                                    <span className="price">₹{product.price.toLocaleString()}</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
