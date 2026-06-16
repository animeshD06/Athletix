import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Trash2, Minus, Plus, ShoppingBag, Tag,
    ChevronRight, Truck, Shield, ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../data/products';
import './Cart.css';

const Cart = () => {
    const {
        cart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        getSubtotal,
        getOriginalTotal,
        getDiscount,
        getShipping,
        getTotal
    } = useCart();

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [couponCode, setCouponCode] = useState('');
    const [couponError, setCouponError] = useState('');
    const [couponSuccess, setCouponSuccess] = useState('');

    const handleApplyCoupon = () => {
        if (!couponCode.trim()) {
            setCouponError('Please enter a coupon code');
            return;
        }

        const validCoupons = ['ATHLETIX10', 'SAVE500', 'FIRST20'];
        if (validCoupons.includes(couponCode.toUpperCase())) {
            applyCoupon(couponCode);
            setCouponSuccess('Coupon applied successfully!');
            setCouponError('');
            setCouponCode('');
        } else {
            setCouponError('Invalid coupon code');
            setCouponSuccess('');
        }
    };

    const handleRemoveCoupon = () => {
        removeCoupon();
        setCouponSuccess('');
        setCouponError('');
    };

    const handleCheckout = () => {
        if (isAuthenticated) {
            navigate('/checkout');
        } else {
            navigate('/login?redirect=/checkout');
        }
    };

    if (cart.items.length === 0) {
        return (
            <main className="cart-page">
                <div className="container">
                    <div className="empty-cart">
                        <div className="empty-cart-icon">
                            <ShoppingBag size={80} />
                        </div>
                        <h1>Your cart is empty</h1>
                        <p>Looks like you haven't added anything to your cart yet.</p>
                        <Link to="/shop" className="btn btn-primary btn-lg">
                            Start Shopping
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="cart-page">
            {/* Breadcrumb */}
            <section className="cart-header">
                <div className="container">
                    <nav className="breadcrumb">
                        <Link to="/">Home</Link>
                        <ChevronRight size={14} />
                        <span>Shopping Cart</span>
                    </nav>
                    <h1>Shopping Cart</h1>
                    <p>{cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your cart</p>
                </div>
            </section>

            <section className="cart-content">
                <div className="container">
                    <div className="cart-layout">
                        {/* Cart Items */}
                        <div className="cart-items">
                            {/* Desktop Table Header */}
                            <div className="cart-table-header">
                                <span className="col-product">Product</span>
                                <span className="col-price">Price</span>
                                <span className="col-quantity">Quantity</span>
                                <span className="col-total">Total</span>
                                <span className="col-action"></span>
                            </div>

                            {/* Cart Items List */}
                            {cart.items.map((item, index) => (
                                <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="cart-item">
                                    <div className="col-product">
                                        <Link to={`/product/${item.slug}`} className="item-image">
                                            <img src={item.images[0]} alt={item.name} />
                                        </Link>
                                        <div className="item-details">
                                            <Link to={`/product/${item.slug}`} className="item-name">
                                                {item.name}
                                            </Link>
                                            <div className="item-meta">
                                                {item.selectedColor && (
                                                    <span>Color: {item.selectedColor}</span>
                                                )}
                                                {item.selectedSize && (
                                                    <span>Size: {item.selectedSize}</span>
                                                )}
                                            </div>
                                            <span className="item-brand">{item.brand}</span>
                                        </div>
                                    </div>

                                    <div className="col-price">
                                        <span className="price-label">Price:</span>
                                        <div className="price-display">
                                            <span className="item-price">{formatPrice(item.price)}</span>
                                            {item.originalPrice > item.price && (
                                                <span className="item-original-price">
                                                    {formatPrice(item.originalPrice)}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-quantity">
                                        <span className="quantity-label">Quantity:</span>
                                        <div className="quantity-selector">
                                            <button
                                                onClick={() => updateQuantity(index, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(index, item.quantity + 1)}>
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-total">
                                        <span className="total-label">Total:</span>
                                        <span className="item-total">{formatPrice(item.price * item.quantity)}</span>
                                    </div>

                                    <div className="col-action">
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeFromCart(index)}
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Continue Shopping */}
                            <div className="cart-actions">
                                <Link to="/shop" className="continue-shopping">
                                    <ShoppingBag size={18} />
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>

                        {/* Cart Summary */}
                        <div className="cart-summary">
                            <div className="summary-card">
                                <h2>Order Summary</h2>

                                {/* Coupon Input */}
                                <div className="coupon-section">
                                    {cart.coupon ? (
                                        <div className="coupon-applied">
                                            <div className="coupon-info">
                                                <Tag size={16} />
                                                <span>{cart.coupon.code}</span>
                                                <span className="coupon-discount">
                                                    {cart.coupon.type === 'percentage'
                                                        ? `-${cart.coupon.discount}%`
                                                        : `-${formatPrice(cart.coupon.discount)}`
                                                    }
                                                </span>
                                            </div>
                                            <button onClick={handleRemoveCoupon}>Remove</button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="coupon-input-group">
                                                <Tag size={18} />
                                                <input
                                                    type="text"
                                                    placeholder="Enter coupon code"
                                                    value={couponCode}
                                                    onChange={(e) => setCouponCode(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                                                />
                                                <button onClick={handleApplyCoupon}>Apply</button>
                                            </div>
                                            {couponError && <p className="coupon-error">{couponError}</p>}
                                            {couponSuccess && <p className="coupon-success">{couponSuccess}</p>}
                                            <p className="coupon-hint">Try: ATHLETIX10, SAVE500, FIRST20</p>
                                        </>
                                    )}
                                </div>

                                {/* Price Breakdown */}
                                <div className="price-breakdown">
                                    <div className="breakdown-row">
                                        <span>Subtotal</span>
                                        <span>{formatPrice(getSubtotal())}</span>
                                    </div>

                                    {getOriginalTotal() > getSubtotal() && (
                                        <div className="breakdown-row discount">
                                            <span>Product Discount</span>
                                            <span>-{formatPrice(getOriginalTotal() - getSubtotal())}</span>
                                        </div>
                                    )}

                                    {cart.coupon && (
                                        <div className="breakdown-row discount">
                                            <span>Coupon ({cart.coupon.code})</span>
                                            <span>-{formatPrice(getDiscount())}</span>
                                        </div>
                                    )}

                                    <div className="breakdown-row">
                                        <span>Shipping</span>
                                        <span>
                                            {getShipping() === 0 ? (
                                                <span className="free-shipping">FREE</span>
                                            ) : (
                                                formatPrice(getShipping())
                                            )}
                                        </span>
                                    </div>

                                    {getSubtotal() < 1000 && (
                                        <p className="shipping-note">
                                            Add {formatPrice(1000 - getSubtotal())} more for free shipping!
                                        </p>
                                    )}

                                    <div className="breakdown-row total">
                                        <span>Total</span>
                                        <span>{formatPrice(getTotal())}</span>
                                    </div>

                                    {getOriginalTotal() > getTotal() && (
                                        <p className="savings">
                                            You're saving {formatPrice(getOriginalTotal() - getTotal())} on this order!
                                        </p>
                                    )}
                                </div>

                                {/* Checkout Button */}
                                <button
                                    className="btn btn-primary btn-lg checkout-btn"
                                    onClick={handleCheckout}
                                >
                                    Proceed to Checkout
                                    <ArrowRight size={20} />
                                </button>

                                {/* Trust Badges */}
                                <div className="summary-trust">
                                    <div className="trust-item">
                                        <Truck size={18} />
                                        <span>Free delivery on ₹1000+</span>
                                    </div>
                                    <div className="trust-item">
                                        <Shield size={18} />
                                        <span>Secure checkout</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Cart;
