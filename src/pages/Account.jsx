import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
    User, Package, MapPin, Heart, Settings, LogOut,
    ChevronRight, Edit2, Trash2, Plus, Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../data/products';
import './Account.css';

const Account = () => {
    const { isAuthenticated, user, logout, updateProfile, addAddress, removeAddress, setDefaultAddress } = useAuth();
    const { wishlist } = useWishlist();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
    const [isEditing, setIsEditing] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);

    const [profileForm, setProfileForm] = useState({
        name: '',
        email: '',
        phone: ''
    });

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
            navigate('/login');
            return;
        }

        if (user) {
            setProfileForm({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || ''
            });
        }
    }, [isAuthenticated, user, navigate]);

    useEffect(() => {
        setSearchParams({ tab: activeTab });
    }, [activeTab, setSearchParams]);

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        updateProfile(profileForm);
        setIsEditing(false);
    };

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

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!isAuthenticated) {
        return null;
    }

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'orders', label: 'Orders', icon: Package },
        { id: 'addresses', label: 'Addresses', icon: MapPin },
        { id: 'wishlist', label: 'Wishlist', icon: Heart },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <main className="account-page">
            {/* Header */}
            <section className="account-header">
                <div className="container">
                    <nav className="breadcrumb">
                        <Link to="/">Home</Link>
                        <ChevronRight size={14} />
                        <span>My Account</span>
                    </nav>
                    <div className="account-welcome">
                        <div className="account-avatar">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="account-info">
                            <h1>Welcome, {user?.name?.split(' ')[0] || 'User'}!</h1>
                            <p>{user?.email}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="account-content">
                <div className="container">
                    <div className="account-layout">
                        {/* Sidebar */}
                        <aside className="account-sidebar">
                            <nav className="account-nav">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        <tab.icon size={18} />
                                        {tab.label}
                                    </button>
                                ))}
                                <button className="nav-item logout" onClick={handleLogout}>
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </nav>
                        </aside>

                        {/* Main Content */}
                        <div className="account-main">
                            {/* Profile Tab */}
                            {activeTab === 'profile' && (
                                <div className="tab-content">
                                    <div className="tab-header">
                                        <h2>Profile Information</h2>
                                        {!isEditing && (
                                            <button className="edit-btn" onClick={() => setIsEditing(true)}>
                                                <Edit2 size={16} />
                                                Edit Profile
                                            </button>
                                        )}
                                    </div>

                                    {isEditing ? (
                                        <form onSubmit={handleProfileUpdate} className="profile-form">
                                            <div className="form-group">
                                                <label>Full Name</label>
                                                <input
                                                    type="text"
                                                    value={profileForm.name}
                                                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input
                                                    type="email"
                                                    value={profileForm.email}
                                                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Phone Number</label>
                                                <input
                                                    type="tel"
                                                    value={profileForm.phone}
                                                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-actions">
                                                <button type="submit" className="btn btn-primary">Save Changes</button>
                                                <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="profile-info">
                                            <div className="info-row">
                                                <span className="info-label">Full Name</span>
                                                <span className="info-value">{user?.name || 'Not set'}</span>
                                            </div>
                                            <div className="info-row">
                                                <span className="info-label">Email</span>
                                                <span className="info-value">{user?.email || 'Not set'}</span>
                                            </div>
                                            <div className="info-row">
                                                <span className="info-label">Phone</span>
                                                <span className="info-value">{user?.phone || 'Not set'}</span>
                                            </div>
                                            <div className="info-row">
                                                <span className="info-label">Member Since</span>
                                                <span className="info-value">
                                                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Orders Tab */}
                            {activeTab === 'orders' && (
                                <div className="tab-content">
                                    <div className="tab-header">
                                        <h2>My Orders</h2>
                                    </div>

                                    {user?.orders?.length > 0 ? (
                                        <div className="orders-list">
                                            {user.orders.map(order => (
                                                <div key={order.id} className="order-card">
                                                    <div className="order-header">
                                                        <div>
                                                            <span className="order-id">Order #{order.id}</span>
                                                            <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
                                                        </div>
                                                        <span className={`order-status status-${order.status.toLowerCase()}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <div className="order-items">
                                                        {order.items.map((item, index) => (
                                                            <div key={index} className="order-item">
                                                                <img src={item.images[0]} alt={item.name} />
                                                                <div className="order-item-info">
                                                                    <p className="item-name">{item.name}</p>
                                                                    <p className="item-meta">Qty: {item.quantity}</p>
                                                                </div>
                                                                <span className="item-price">{formatPrice(item.price * item.quantity)}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="order-footer">
                                                        <span className="order-total">Total: <strong>{formatPrice(order.total)}</strong></span>
                                                        <Link to={`/order/${order.id}`} className="btn btn-outline btn-sm">
                                                            View Details
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="empty-state">
                                            <Package size={60} />
                                            <h3>No orders yet</h3>
                                            <p>When you make your first order, it will appear here.</p>
                                            <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Addresses Tab */}
                            {activeTab === 'addresses' && (
                                <div className="tab-content">
                                    <div className="tab-header">
                                        <h2>Saved Addresses</h2>
                                        <button
                                            className="add-btn"
                                            onClick={() => setShowAddressForm(true)}
                                        >
                                            <Plus size={16} />
                                            Add New
                                        </button>
                                    </div>

                                    {showAddressForm && (
                                        <form onSubmit={handleAddressSubmit} className="address-form">
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
                                    )}

                                    {user?.addresses?.length > 0 ? (
                                        <div className="addresses-grid">
                                            {user.addresses.map(address => (
                                                <div key={address.id} className="address-card">
                                                    <div className="address-content">
                                                        <strong>{address.name}</strong>
                                                        <p>{address.street}</p>
                                                        <p>{address.city}, {address.state} {address.pincode}</p>
                                                        <p>Phone: {address.phone}</p>
                                                    </div>
                                                    {address.isDefault && (
                                                        <span className="default-badge">
                                                            <Check size={14} />
                                                            Default
                                                        </span>
                                                    )}
                                                    <div className="address-actions">
                                                        {!address.isDefault && (
                                                            <button onClick={() => setDefaultAddress(address.id)}>
                                                                Set as Default
                                                            </button>
                                                        )}
                                                        <button
                                                            className="delete-btn"
                                                            onClick={() => removeAddress(address.id)}
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        !showAddressForm && (
                                            <div className="empty-state">
                                                <MapPin size={60} />
                                                <h3>No addresses saved</h3>
                                                <p>Add your addresses for faster checkout.</p>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}

                            {/* Wishlist Tab */}
                            {activeTab === 'wishlist' && (
                                <div className="tab-content">
                                    <div className="tab-header">
                                        <h2>My Wishlist</h2>
                                    </div>

                                    {wishlist.items.length > 0 ? (
                                        <div className="products-grid">
                                            {wishlist.items.map(product => (
                                                <ProductCard key={product.id} product={product} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="empty-state">
                                            <Heart size={60} />
                                            <h3>Your wishlist is empty</h3>
                                            <p>Save items you like by clicking the heart icon.</p>
                                            <Link to="/shop" className="btn btn-primary">Browse Products</Link>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Settings Tab */}
                            {activeTab === 'settings' && (
                                <div className="tab-content">
                                    <div className="tab-header">
                                        <h2>Account Settings</h2>
                                    </div>

                                    <div className="settings-section">
                                        <h3>Email Preferences</h3>
                                        <div className="settings-options">
                                            <label className="toggle-option">
                                                <span>Order updates</span>
                                                <input type="checkbox" defaultChecked />
                                                <span className="toggle-slider" />
                                            </label>
                                            <label className="toggle-option">
                                                <span>Promotional emails</span>
                                                <input type="checkbox" defaultChecked />
                                                <span className="toggle-slider" />
                                            </label>
                                            <label className="toggle-option">
                                                <span>Product recommendations</span>
                                                <input type="checkbox" />
                                                <span className="toggle-slider" />
                                            </label>
                                        </div>
                                    </div>

                                    <div className="settings-section">
                                        <h3>Security</h3>
                                        <button className="btn btn-outline">Change Password</button>
                                    </div>

                                    <div className="settings-section danger">
                                        <h3>Danger Zone</h3>
                                        <p>Once you delete your account, there is no going back.</p>
                                        <button className="btn btn-danger">Delete Account</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Account;
