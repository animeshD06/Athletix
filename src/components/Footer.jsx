import { Link } from 'react-router-dom';
import {
    Facebook, Twitter, Instagram, Youtube,
    Mail, Phone, MapPin, Send, CreditCard,
    Truck, RotateCcw, Shield
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        // Newsletter subscription logic
        alert('Thank you for subscribing!');
        e.target.reset();
    };

    return (
        <footer className="footer">
            {/* Trust Badges */}
            <div className="trust-badges">
                <div className="container">
                    <div className="trust-badges-grid">
                        <div className="trust-badge">
                            <div className="trust-icon">
                                <Truck size={28} />
                            </div>
                            <div className="trust-content">
                                <h4>Free Shipping</h4>
                                <p>On orders over ₹1000</p>
                            </div>
                        </div>

                        <div className="trust-badge">
                            <div className="trust-icon">
                                <RotateCcw size={28} />
                            </div>
                            <div className="trust-content">
                                <h4>Easy Returns</h4>
                                <p>30-day return policy</p>
                            </div>
                        </div>

                        <div className="trust-badge">
                            <div className="trust-icon">
                                <Shield size={28} />
                            </div>
                            <div className="trust-content">
                                <h4>Secure Payment</h4>
                                <p>100% secure checkout</p>
                            </div>
                        </div>

                        <div className="trust-badge">
                            <div className="trust-icon">
                                <CreditCard size={28} />
                            </div>
                            <div className="trust-content">
                                <h4>Multiple Payment Options</h4>
                                <p>UPI, Cards, Net Banking</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="newsletter-section">
                <div className="container">
                    <div className="newsletter-content">
                        <div className="newsletter-text">
                            <h3>Join the Athletix Community</h3>
                            <p>Subscribe for exclusive deals, training tips, and new product launches.</p>
                        </div>
                        <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                            <div className="newsletter-input-group">
                                <Mail size={20} />
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                <Send size={18} />
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="footer-main">
                <div className="container">
                    <div className="footer-grid">
                        {/* Brand Column */}
                        <div className="footer-column brand">
                            <Link to="/" className="footer-logo">
                                <span className="logo-icon">⚡</span>
                                <span>Athletix</span>
                            </Link>
                            <p className="footer-tagline">Unleash the Athlete in You</p>
                            <p className="footer-description">
                                Premium sports and fitness gear for athletes who demand the best.
                                From gym equipment to sportswear, we've got you covered.
                            </p>
                            <div className="social-links">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                    <Facebook size={20} />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                    <Twitter size={20} />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <Instagram size={20} />
                                </a>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                    <Youtube size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="footer-column">
                            <h4>Quick Links</h4>
                            <ul className="footer-links">
                                <li><Link to="/shop">Shop All</Link></li>
                                <li><Link to="/shop?filter=new">New Arrivals</Link></li>
                                <li><Link to="/shop?filter=bestseller">Best Sellers</Link></li>
                                <li><Link to="/shop?filter=sale">Sale</Link></li>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/contact">Contact Us</Link></li>
                            </ul>
                        </div>

                        {/* Categories */}
                        <div className="footer-column">
                            <h4>Categories</h4>
                            <ul className="footer-links">
                                <li><Link to="/shop?category=gym-fitness">Gym & Fitness</Link></li>
                                <li><Link to="/shop?category=cricket">Cricket</Link></li>
                                <li><Link to="/shop?category=football">Football</Link></li>
                                <li><Link to="/shop?category=running">Running</Link></li>
                                <li><Link to="/shop?category=sportswear">Sportswear</Link></li>
                                <li><Link to="/shop?category=accessories">Accessories</Link></li>
                            </ul>
                        </div>

                        {/* Customer Service */}
                        <div className="footer-column">
                            <h4>Customer Service</h4>
                            <ul className="footer-links">
                                <li><Link to="/account">My Account</Link></li>
                                <li><Link to="/account?tab=orders">Track Order</Link></li>
                                <li><Link to="/shipping-policy">Shipping Info</Link></li>
                                <li><Link to="/return-policy">Returns & Exchanges</Link></li>
                                <li><Link to="/faq">FAQs</Link></li>
                                <li><Link to="/size-guide">Size Guide</Link></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="footer-column">
                            <h4>Contact Us</h4>
                            <ul className="contact-info">
                                <li>
                                    <MapPin size={18} />
                                    <span>123 Sports Complex, Fitness Road<br />Mumbai, Maharashtra 400001</span>
                                </li>
                                <li>
                                    <Phone size={18} />
                                    <a href="tel:+919876543210">+91 98765 43210</a>
                                </li>
                                <li>
                                    <Mail size={18} />
                                    <a href="mailto:support@athletix.com">support@athletix.com</a>
                                </li>
                            </ul>
                            <div className="support-hours">
                                <strong>Support Hours:</strong>
                                <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
                                <p>Sun: 10:00 AM - 6:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-content">
                        <p>&copy; {currentYear} Athletix. All rights reserved.</p>
                        <div className="footer-legal">
                            <Link to="/privacy-policy">Privacy Policy</Link>
                            <Link to="/terms-conditions">Terms & Conditions</Link>
                            <Link to="/return-policy">Return Policy</Link>
                        </div>
                        <div className="payment-methods">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png"
                                alt="Visa"
                            />
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png"
                                alt="Mastercard"
                            />
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/200px-UPI-Logo-vector.svg.png"
                                alt="UPI"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
