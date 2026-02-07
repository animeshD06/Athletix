import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    ChevronRight, MapPin, CreditCard, Truck, Check,
    Plus, Building, Smartphone, Wallet, ArrowLeft
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../data/products';
import './Checkout.css';

const Checkout = () => {
    const {
        cart,
        getSubtotal,
        getDiscount,
        getShipping,
        getTotal,
        clearCart
    } = useCart();

    const { isAuthenticated, user, addOrder, addAddress, getDefaultAddress } = useAuth();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState('');

    // Address form state
    const [addressForm, setAddressForm] = useState({
        name: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        pincode: ''
    });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login?redirect=/checkout');
            return;
        }

        if (cart.items.length === 0 && !orderPlaced) {
            navigate('/cart');
            return;
        }

        // Set default address
        const defaultAddr = getDefaultAddress();
        if (defaultAddr) {
            setSelectedAddress(defaultAddr.id);
        }
    }, [isAuthenticated, cart.items, navigate, getDefaultAddress, orderPlaced]);

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        addAddress(addressForm);
        setShowAddressForm(false);
        setAddressForm({
            name: '',
            phone: '',
            street: '',
            city: '',
            state: '',
            pincode: ''
        });
    };

    const handlePlaceOrder = () => {
        const order = {
            items: cart.items,
            address: user.addresses.find(a => a.id === selectedAddress),
            paymentMethod,
            subtotal: getSubtotal(),
            discount: getDiscount(),
            shipping: getShipping(),
            total: getTotal()
        };

        const newOrder = addOrder(order);
        setOrderId(newOrder.id);
        setOrderPlaced(true);
        clearCart();
    };

    if (orderPlaced) {
        return (
            <main className="checkout-page">
                <div className="container">
                    <div className="order-success">
                        <div className="success-icon">
                            <Check size={60} />
                        </div>
                        <h1>Order Placed Successfully!</h1>
                        <p>Thank you for shopping with Athletix</p>
                        <div className="order-id">
                            Order ID: <strong>{orderId}</strong>
                        </div>
                        <p className="success-message">
                            We've sent a confirmation email to <strong>{user?.email}</strong>
                        </p>
                        <div className="success-actions">
                            <Link to="/account?tab=orders" className="btn btn-primary">
                                View Order
                            </Link>
                            <Link to="/shop" className="btn btn-outline">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="checkout-page">
            {/* Breadcrumb */}
            <section className="checkout-header">
                <div className="container">
                    <nav className="breadcrumb">
                        <Link to="/">Home</Link>
                        <ChevronRight size={14} />
                        <Link to="/cart">Cart</Link>
                        <ChevronRight size={14} />
                        <span>Checkout</span>
                    </nav>
                    <h1>Checkout</h1>
                </div>
            </section>

            {/* Checkout Steps */}
            <section className="checkout-steps">
                <div className="container">
                    <div className="steps-indicator">
                        <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                            <div className="step-number">
                                {step > 1 ? <Check size={16} /> : '1'}
                            </div>
                            <span>Shipping</span>
                        </div>
                        <div className="step-line" />
                        <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                            <div className="step-number">
                                {step > 2 ? <Check size={16} /> : '2'}
                            </div>
                            <span>Payment</span>
                        </div>
                        <div className="step-line" />
                        <div className={`step ${step >= 3 ? 'active' : ''}`}>
                            <div className="step-number">3</div>
                            <span>Review</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="checkout-content">
                <div className="container">
                    <div className="checkout-layout">
                        {/* Main Content */}
                        <div className="checkout-main">
                            {/* Step 1: Shipping Address */}
                            {step === 1 && (
                                <div className="checkout-section">
                                    <h2>
                                        <MapPin size={20} />
                                        Shipping Address
                                    </h2>

                                    {/* Saved Addresses */}
                                    {user?.addresses?.length > 0 && (
                                        <div className="saved-addresses">
                                            {user.addresses.map(address => (
                                                <label
                                                    key={address.id}
                                                    className={`address-card ${selectedAddress === address.id ? 'selected' : ''}`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="address"
                                                        checked={selectedAddress === address.id}
                                                        onChange={() => setSelectedAddress(address.id)}
                                                    />
                                                    <div className="address-content">
                                                        <strong>{address.name}</strong>
                                                        <p>{address.street}</p>
                                                        <p>{address.city}, {address.state} {address.pincode}</p>
                                                        <p>Phone: {address.phone}</p>
                                                        {address.isDefault && (
                                                            <span className="default-badge">Default</span>
                                                        )}
                                                    </div>
                                                    <div className="address-check">
                                                        <Check size={16} />
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    )}

                                    {/* Add New Address */}
                                    {showAddressForm ? (
                                        <form className="address-form" onSubmit={handleAddressSubmit}>
                                            <h3>Add New Address</h3>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label>Full Name</label>
                                                    <input
                                                        type="text"
                                                        value={addressForm.name}
                                                        onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        value={addressForm.phone}
                                                        onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Street Address</label>
                                                <input
                                                    type="text"
                                                    value={addressForm.street}
                                                    onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label>City</label>
                                                    <input
                                                        type="text"
                                                        value={addressForm.city}
                                                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>State</label>
                                                    <input
                                                        type="text"
                                                        value={addressForm.state}
                                                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>PIN Code</label>
                                                    <input
                                                        type="text"
                                                        value={addressForm.pincode}
                                                        onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-actions">
                                                <button type="submit" className="btn btn-primary">Save Address</button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline"
                                                    onClick={() => setShowAddressForm(false)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <button
                                            className="add-address-btn"
                                            onClick={() => setShowAddressForm(true)}
                                        >
                                            <Plus size={18} />
                                            Add New Address
                                        </button>
                                    )}

                                    <div className="step-actions">
                                        <Link to="/cart" className="btn btn-outline">
                                            <ArrowLeft size={18} />
                                            Back to Cart
                                        </Link>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => setStep(2)}
                                            disabled={!selectedAddress}
                                        >
                                            Continue to Payment
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Payment Method */}
                            {step === 2 && (
                                <div className="checkout-section">
                                    <h2>
                                        <CreditCard size={20} />
                                        Payment Method
                                    </h2>

                                    <div className="payment-methods">
                                        <label className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="upi"
                                                checked={paymentMethod === 'upi'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                            <div className="payment-icon">
                                                <Smartphone size={24} />
                                            </div>
                                            <div className="payment-info">
                                                <strong>UPI</strong>
                                                <span>Pay using Google Pay, PhonePe, or any UPI app</span>
                                            </div>
                                            <div className="payment-check">
                                                <Check size={16} />
                                            </div>
                                        </label>

                                        <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="card"
                                                checked={paymentMethod === 'card'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                            <div className="payment-icon">
                                                <CreditCard size={24} />
                                            </div>
                                            <div className="payment-info">
                                                <strong>Credit / Debit Card</strong>
                                                <span>Visa, Mastercard, RuPay accepted</span>
                                            </div>
                                            <div className="payment-check">
                                                <Check size={16} />
                                            </div>
                                        </label>

                                        <label className={`payment-option ${paymentMethod === 'netbanking' ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="netbanking"
                                                checked={paymentMethod === 'netbanking'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                            <div className="payment-icon">
                                                <Building size={24} />
                                            </div>
                                            <div className="payment-info">
                                                <strong>Net Banking</strong>
                                                <span>All major banks supported</span>
                                            </div>
                                            <div className="payment-check">
                                                <Check size={16} />
                                            </div>
                                        </label>

                                        <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="cod"
                                                checked={paymentMethod === 'cod'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                            <div className="payment-icon">
                                                <Wallet size={24} />
                                            </div>
                                            <div className="payment-info">
                                                <strong>Cash on Delivery</strong>
                                                <span>Pay when your order arrives</span>
                                            </div>
                                            <div className="payment-check">
                                                <Check size={16} />
                                            </div>
                                        </label>
                                    </div>

                                    <div className="step-actions">
                                        <button className="btn btn-outline" onClick={() => setStep(1)}>
                                            <ArrowLeft size={18} />
                                            Back
                                        </button>
                                        <button className="btn btn-primary" onClick={() => setStep(3)}>
                                            Review Order
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Review Order */}
                            {step === 3 && (
                                <div className="checkout-section">
                                    <h2>
                                        <Truck size={20} />
                                        Review Your Order
                                    </h2>

                                    {/* Shipping Address Review */}
                                    <div className="review-section">
                                        <div className="review-header">
                                            <h3>Shipping Address</h3>
                                            <button onClick={() => setStep(1)}>Change</button>
                                        </div>
                                        {user?.addresses?.find(a => a.id === selectedAddress) && (
                                            <div className="review-content">
                                                <p><strong>{user.addresses.find(a => a.id === selectedAddress).name}</strong></p>
                                                <p>{user.addresses.find(a => a.id === selectedAddress).street}</p>
                                                <p>
                                                    {user.addresses.find(a => a.id === selectedAddress).city},
                                                    {user.addresses.find(a => a.id === selectedAddress).state}
                                                    {user.addresses.find(a => a.id === selectedAddress).pincode}
                                                </p>
                                                <p>Phone: {user.addresses.find(a => a.id === selectedAddress).phone}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Payment Method Review */}
                                    <div className="review-section">
                                        <div className="review-header">
                                            <h3>Payment Method</h3>
                                            <button onClick={() => setStep(2)}>Change</button>
                                        </div>
                                        <div className="review-content">
                                            <p>
                                                {paymentMethod === 'upi' && 'UPI Payment'}
                                                {paymentMethod === 'card' && 'Credit/Debit Card'}
                                                {paymentMethod === 'netbanking' && 'Net Banking'}
                                                {paymentMethod === 'cod' && 'Cash on Delivery'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Order Items Review */}
                                    <div className="review-section">
                                        <div className="review-header">
                                            <h3>Order Items ({cart.items.length})</h3>
                                        </div>
                                        <div className="order-items-review">
                                            {cart.items.map((item, index) => (
                                                <div key={index} className="review-item">
                                                    <img src={item.images[0]} alt={item.name} />
                                                    <div className="review-item-info">
                                                        <p className="item-name">{item.name}</p>
                                                        <p className="item-meta">
                                                            {item.selectedColor && `Color: ${item.selectedColor}`}
                                                            {item.selectedColor && item.selectedSize && ' | '}
                                                            {item.selectedSize && `Size: ${item.selectedSize}`}
                                                        </p>
                                                        <p className="item-qty">Qty: {item.quantity}</p>
                                                    </div>
                                                    <span className="item-price">{formatPrice(item.price * item.quantity)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="step-actions">
                                        <button className="btn btn-outline" onClick={() => setStep(2)}>
                                            <ArrowLeft size={18} />
                                            Back
                                        </button>
                                        <button className="btn btn-primary btn-lg" onClick={handlePlaceOrder}>
                                            Place Order • {formatPrice(getTotal())}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="checkout-sidebar">
                            <div className="summary-card">
                                <h3>Order Summary</h3>

                                <div className="summary-items">
                                    {cart.items.map((item, index) => (
                                        <div key={index} className="summary-item">
                                            <div className="item-image">
                                                <img src={item.images[0]} alt={item.name} />
                                                <span className="item-qty">{item.quantity}</span>
                                            </div>
                                            <div className="item-info">
                                                <p>{item.name}</p>
                                                <span>{formatPrice(item.price)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="price-breakdown">
                                    <div className="breakdown-row">
                                        <span>Subtotal</span>
                                        <span>{formatPrice(getSubtotal())}</span>
                                    </div>
                                    {cart.coupon && (
                                        <div className="breakdown-row discount">
                                            <span>Discount ({cart.coupon.code})</span>
                                            <span>-{formatPrice(getDiscount())}</span>
                                        </div>
                                    )}
                                    <div className="breakdown-row">
                                        <span>Shipping</span>
                                        <span>{getShipping() === 0 ? 'FREE' : formatPrice(getShipping())}</span>
                                    </div>
                                    <div className="breakdown-row total">
                                        <span>Total</span>
                                        <span>{formatPrice(getTotal())}</span>
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

export default Checkout;
