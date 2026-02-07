import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { toast } from './MicroInteractions';
import { formatPrice } from '../data/products';
import './ProductCard.css';

const ProductCard = ({ product, compact = false }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const inWishlist = isInWishlist(product.id);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAddingToCart(true);

        setTimeout(() => {
            addToCart(product, product.colors?.[0] || '', product.sizes?.[0] || '', 1);
            toast.cart(product.name);
            setIsAddingToCart(false);
        }, 300);
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const wasInWishlist = inWishlist;
        toggleWishlist(product);
        toast.wishlist(product.name, !wasInWishlist);
    };

    return (
        <Link
            to={`/product/${product.slug}`}
            className="product-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="product-image-container">
                {/* Skeleton loader */}
                {!imageLoaded && <div className="product-image-skeleton skeleton" />}

                {/* Product Image */}
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className={`product-image ${imageLoaded ? 'loaded' : ''}`}
                    onLoad={() => setImageLoaded(true)}
                />

                {/* Second image on hover */}
                {product.images[1] && (
                    <img
                        src={product.images[1]}
                        alt={product.name}
                        className={`product-image-hover ${isHovered ? 'visible' : ''}`}
                    />
                )}

                {/* Badges */}
                <div className="product-badges">
                    {product.isNew && (
                        <span className="badge badge-new">New</span>
                    )}
                    {product.discount > 0 && (
                        <span className="badge badge-sale">-{product.discount}%</span>
                    )}
                    {product.isBestSeller && !product.isNew && (
                        <span className="badge badge-bestseller">Best Seller</span>
                    )}
                </div>

                {/* Quick Actions */}
                <div className={`product-actions ${isHovered ? 'visible' : ''}`}>
                    <button
                        className={`action-btn ${inWishlist ? 'active' : ''}`}
                        onClick={handleWishlist}
                        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                        <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
                    </button>
                    <button
                        className="action-btn"
                        onClick={handleAddToCart}
                        aria-label="Add to cart"
                    >
                        <ShoppingCart size={18} />
                    </button>
                    <span
                        className="action-btn"
                        aria-label="Quick view"
                    >
                        <Eye size={18} />
                    </span>
                </div>

                {/* Add to Cart Button (Mobile) */}
                <button
                    className={`quick-add-btn ${isHovered ? 'visible' : ''}`}
                    onClick={handleAddToCart}
                >
                    <ShoppingCart size={16} />
                    Add to Cart
                </button>
            </div>

            {/* Product Info */}
            <div className="product-info">
                <span className="product-category">{product.category.replace('-', ' ')}</span>

                <h3 className="product-name">{product.name}</h3>

                {/* Rating */}
                <div className="product-rating">
                    <div className="stars">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                                className={i < Math.floor(product.rating) ? 'filled' : ''}
                            />
                        ))}
                    </div>
                    <span className="rating-value">{product.rating}</span>
                    <span className="review-count">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="product-price">
                    <span className="current-price">{formatPrice(product.price)}</span>
                    {product.originalPrice > product.price && (
                        <>
                            <span className="original-price">{formatPrice(product.originalPrice)}</span>
                            <span className="discount-badge">Save {product.discount}%</span>
                        </>
                    )}
                </div>

                {/* Colors */}
                {product.colors && product.colors.length > 1 && (
                    <div className="product-colors">
                        {product.colors.slice(0, 4).map((color, index) => (
                            <span
                                key={index}
                                className="color-dot"
                                style={{
                                    backgroundColor: color.toLowerCase() === 'multi' ? 'transparent' : color.toLowerCase(),
                                    background: color.toLowerCase() === 'multi' ? 'linear-gradient(135deg, red, yellow, blue, green)' : undefined
                                }}
                                title={color}
                            />
                        ))}
                        {product.colors.length > 4 && (
                            <span className="more-colors">+{product.colors.length - 4}</span>
                        )}
                    </div>
                )}
            </div>
        </Link>
    );
};

export default ProductCard;
