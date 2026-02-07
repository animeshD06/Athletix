import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    Heart, ShoppingCart, Minus, Plus, Star, Check,
    Truck, RotateCcw, Shield, Share2, ChevronRight,
    ZoomIn
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import {
    getProductBySlug, getProductsByCategory,
    formatPrice, colors as colorOptions, reviews as allReviews
} from '../data/products';
import './ProductDetails.css';

const ProductDetails = () => {
    const { slug } = useParams();
    const product = getProductBySlug(slug);
    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [isZoomed, setIsZoomed] = useState(false);

    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const inWishlist = product ? isInWishlist(product.id) : false;

    // Related products
    const relatedProducts = product
        ? getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4)
        : [];

    useEffect(() => {
        window.scrollTo(0, 0);
        if (product) {
            setSelectedColor(product.colors?.[0] || '');
            setSelectedSize(product.sizes?.[0] || '');
            setSelectedImage(0);
            setQuantity(1);
        }
    }, [slug, product]);

    if (!product) {
        return (
            <div className="product-not-found">
                <div className="container">
                    <h1>Product Not Found</h1>
                    <p>The product you're looking for doesn't exist or has been removed.</p>
                    <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, selectedColor, selectedSize, quantity);
    };

    const handleBuyNow = () => {
        addToCart(product, selectedColor, selectedSize, quantity);
        navigate('/checkout');
    };

    const getColorHex = (colorName) => {
        const color = colorOptions.find(c => c.name.toLowerCase() === colorName.toLowerCase());
        return color?.hex || colorName.toLowerCase();
    };

    return (
        <main className="product-details-page">
            {/* Breadcrumb */}
            <section className="product-breadcrumb">
                <div className="container">
                    <nav className="breadcrumb">
                        <Link to="/">Home</Link>
                        <ChevronRight size={14} />
                        <Link to="/shop">Shop</Link>
                        <ChevronRight size={14} />
                        <Link to={`/shop?category=${product.category}`}>
                            {product.category.replace('-', ' ')}
                        </Link>
                        <ChevronRight size={14} />
                        <span>{product.name}</span>
                    </nav>
                </div>
            </section>

            {/* Product Main Section */}
            <section className="product-main">
                <div className="container">
                    <div className="product-grid">
                        {/* Image Gallery */}
                        <div className="product-gallery">
                            <div className="gallery-thumbnails">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img src={image} alt={`${product.name} view ${index + 1}`} />
                                    </button>
                                ))}
                            </div>

                            <div
                                className={`gallery-main ${isZoomed ? 'zoomed' : ''}`}
                                onClick={() => setIsZoomed(!isZoomed)}
                            >
                                <img src={product.images[selectedImage]} alt={product.name} />
                                <button className="zoom-btn">
                                    <ZoomIn size={20} />
                                </button>

                                {/* Badges */}
                                <div className="product-badges">
                                    {product.isNew && (
                                        <span className="badge badge-new">New</span>
                                    )}
                                    {product.discount > 0 && (
                                        <span className="badge badge-sale">-{product.discount}%</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="product-info">
                            <div className="product-meta">
                                <span className="product-brand">{product.brand}</span>
                                <div className="product-rating">
                                    <div className="stars">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                                                className={i < Math.floor(product.rating) ? 'filled' : ''}
                                            />
                                        ))}
                                    </div>
                                    <span className="rating-value">{product.rating}</span>
                                    <span className="rating-count">({product.reviews} reviews)</span>
                                </div>
                            </div>

                            <h1 className="product-title">{product.name}</h1>

                            <div className="product-price">
                                <span className="current-price">{formatPrice(product.price)}</span>
                                {product.originalPrice > product.price && (
                                    <>
                                        <span className="original-price">{formatPrice(product.originalPrice)}</span>
                                        <span className="discount">Save {formatPrice(product.originalPrice - product.price)}</span>
                                    </>
                                )}
                            </div>

                            <p className="product-description">{product.description}</p>

                            {/* Color Selector */}
                            {product.colors && product.colors.length > 0 && (
                                <div className="option-group">
                                    <label className="option-label">
                                        Color: <span>{selectedColor}</span>
                                    </label>
                                    <div className="color-options">
                                        {product.colors.map(color => (
                                            <button
                                                key={color}
                                                className={`color-option ${selectedColor === color ? 'active' : ''}`}
                                                onClick={() => setSelectedColor(color)}
                                                title={color}
                                            >
                                                <span
                                                    className="color-swatch"
                                                    style={{
                                                        backgroundColor: color.toLowerCase() === 'multi'
                                                            ? 'transparent'
                                                            : getColorHex(color),
                                                        background: color.toLowerCase() === 'multi'
                                                            ? 'linear-gradient(135deg, red, yellow, blue, green)'
                                                            : undefined
                                                    }}
                                                />
                                                {selectedColor === color && <Check size={14} />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Size Selector */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div className="option-group">
                                    <label className="option-label">
                                        Size: <span>{selectedSize}</span>
                                    </label>
                                    <div className="size-options">
                                        {product.sizes.map(size => (
                                            <button
                                                key={size}
                                                className={`size-option ${selectedSize === size ? 'active' : ''}`}
                                                onClick={() => setSelectedSize(size)}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity Selector */}
                            <div className="option-group">
                                <label className="option-label">Quantity</label>
                                <div className="quantity-selector">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        disabled={quantity <= 1}
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="quantity-value">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)}>
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Stock Status */}
                            <div className="stock-status">
                                {product.inStock ? (
                                    <span className="in-stock">
                                        <Check size={16} />
                                        In Stock - Ready to Ship
                                    </span>
                                ) : (
                                    <span className="out-of-stock">Out of Stock</span>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="action-buttons">
                                <button
                                    className="btn btn-primary btn-lg add-to-cart-btn"
                                    onClick={handleAddToCart}
                                    disabled={!product.inStock}
                                >
                                    <ShoppingCart size={20} />
                                    Add to Cart
                                </button>
                                <button
                                    className="btn btn-secondary btn-lg buy-now-btn"
                                    onClick={handleBuyNow}
                                    disabled={!product.inStock}
                                >
                                    Buy Now
                                </button>
                                <button
                                    className={`btn-icon wishlist-btn ${inWishlist ? 'active' : ''}`}
                                    onClick={() => toggleWishlist(product)}
                                >
                                    <Heart size={22} fill={inWishlist ? 'currentColor' : 'none'} />
                                </button>
                                <button className="btn-icon share-btn">
                                    <Share2 size={22} />
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="trust-features">
                                <div className="trust-feature">
                                    <Truck size={20} />
                                    <div>
                                        <strong>Free Delivery</strong>
                                        <span>On orders over ₹1000</span>
                                    </div>
                                </div>
                                <div className="trust-feature">
                                    <RotateCcw size={20} />
                                    <div>
                                        <strong>Easy Returns</strong>
                                        <span>30-day return policy</span>
                                    </div>
                                </div>
                                <div className="trust-feature">
                                    <Shield size={20} />
                                    <div>
                                        <strong>Secure Payment</strong>
                                        <span>100% secure checkout</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Tabs */}
            <section className="product-tabs-section">
                <div className="container">
                    <div className="tabs-header">
                        <button
                            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                            onClick={() => setActiveTab('description')}
                        >
                            Description
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
                            onClick={() => setActiveTab('specifications')}
                        >
                            Specifications
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Reviews ({product.reviews})
                        </button>
                    </div>

                    <div className="tabs-content">
                        {activeTab === 'description' && (
                            <div className="tab-panel">
                                <h3>Product Description</h3>
                                <p>{product.description}</p>

                                {product.features && (
                                    <div className="features-list">
                                        <h4>Key Features</h4>
                                        <ul>
                                            {product.features.map((feature, index) => (
                                                <li key={index}>
                                                    <Check size={16} />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'specifications' && (
                            <div className="tab-panel">
                                <h3>Product Specifications</h3>
                                {product.specifications && (
                                    <table className="specs-table">
                                        <tbody>
                                            {Object.entries(product.specifications).map(([key, value]) => (
                                                <tr key={key}>
                                                    <th>{key}</th>
                                                    <td>{value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="tab-panel reviews-panel">
                                <div className="reviews-summary">
                                    <div className="rating-big">
                                        <span className="rating-number">{product.rating}</span>
                                        <div className="rating-stars">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={24}
                                                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                                                    className={i < Math.floor(product.rating) ? 'filled' : ''}
                                                />
                                            ))}
                                        </div>
                                        <span className="rating-text">Based on {product.reviews} reviews</span>
                                    </div>
                                </div>

                                <div className="reviews-list">
                                    {allReviews.slice(0, 3).map(review => (
                                        <div key={review.id} className="review-item">
                                            <div className="review-header">
                                                <img src={review.avatar} alt={review.name} />
                                                <div>
                                                    <span className="reviewer-name">{review.name}</span>
                                                    {review.verified && (
                                                        <span className="verified">Verified Purchase</span>
                                                    )}
                                                </div>
                                                <div className="review-rating">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={14}
                                                            fill={i < review.rating ? 'currentColor' : 'none'}
                                                            className={i < review.rating ? 'filled' : ''}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <h4 className="review-title">{review.title}</h4>
                                            <p className="review-text">{review.comment}</p>
                                            <span className="review-date">{review.date}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="related-section section">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">You May Also Like</h2>
                            <Link to={`/shop?category=${product.category}`} className="view-all-link">
                                View All <ChevronRight size={18} />
                            </Link>
                        </div>

                        <div className="products-grid">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
};

export default ProductDetails;
