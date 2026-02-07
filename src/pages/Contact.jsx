import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ChevronRight, MapPin, Phone, Mail, Clock,
    Send, MessageCircle, CheckCircle
} from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setSubmitted(true);
        setLoading(false);
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: 'Visit Us',
            details: [
                'Athletix Sports Hub',
                '123 Sports Avenue, Andheri West',
                'Mumbai, Maharashtra 400053'
            ]
        },
        {
            icon: Phone,
            title: 'Call Us',
            details: [
                '+91 98765 43210',
                '+91 22 4567 8900',
                'Toll Free: 1800-123-4567'
            ]
        },
        {
            icon: Mail,
            title: 'Email Us',
            details: [
                'support@athletix.com',
                'sales@athletix.com',
                'careers@athletix.com'
            ]
        },
        {
            icon: Clock,
            title: 'Working Hours',
            details: [
                'Mon - Fri: 9:00 AM - 8:00 PM',
                'Saturday: 10:00 AM - 6:00 PM',
                'Sunday: 11:00 AM - 5:00 PM'
            ]
        }
    ];

    const faqs = [
        {
            question: 'What is your return policy?',
            answer: 'We offer a 30-day hassle-free return policy. Items must be unused and in original packaging.'
        },
        {
            question: 'How long does shipping take?',
            answer: 'Standard shipping takes 3-7 business days. Express shipping (1-2 days) is available for select locations.'
        },
        {
            question: 'Do you offer bulk discounts?',
            answer: 'Yes! Contact our sales team for special pricing on bulk orders for teams, clubs, and organizations.'
        },
        {
            question: 'Are your products genuine?',
            answer: 'Absolutely. We are authorized dealers for all brands we carry, with full warranty support.'
        }
    ];

    return (
        <main className="contact-page">
            {/* Header */}
            <section className="contact-header">
                <div className="container">
                    <nav className="breadcrumb">
                        <Link to="/">Home</Link>
                        <ChevronRight size={14} />
                        <span>Contact Us</span>
                    </nav>
                    <h1>Get in Touch</h1>
                    <p>Have a question or need help? We're here for you.</p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="contact-info-section">
                <div className="container">
                    <div className="contact-info-grid">
                        {contactInfo.map((item, index) => (
                            <div key={index} className="contact-info-card">
                                <div className="info-icon">
                                    <item.icon size={24} />
                                </div>
                                <h3>{item.title}</h3>
                                {item.details.map((detail, i) => (
                                    <p key={i}>{detail}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Map */}
            <section className="contact-main section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Form */}
                        <div className="contact-form-container">
                            <div className="form-header">
                                <MessageCircle size={24} />
                                <h2>Send Us a Message</h2>
                                <p>Fill out the form below and we'll get back to you within 24 hours.</p>
                            </div>

                            {submitted ? (
                                <div className="form-success">
                                    <div className="success-icon">
                                        <CheckCircle size={60} />
                                    </div>
                                    <h3>Message Sent!</h3>
                                    <p>Thank you for reaching out! We'll get back to you shortly.</p>
                                    <button
                                        className="btn btn-outline"
                                        onClick={() => {
                                            setSubmitted(false);
                                            setFormData({
                                                name: '',
                                                email: '',
                                                phone: '',
                                                subject: '',
                                                message: ''
                                            });
                                        }}
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Full Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Enter your name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email Address *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Enter your phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Subject *</label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="order">Order Support</option>
                                                <option value="returns">Returns & Refunds</option>
                                                <option value="bulk">Bulk Orders</option>
                                                <option value="feedback">Feedback</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Your Message *</label>
                                        <textarea
                                            name="message"
                                            placeholder="Tell us how we can help..."
                                            rows="5"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className={`btn btn-primary btn-lg submit-btn ${loading ? 'loading' : ''}`}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="spinner" />
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Map */}
                        <div className="contact-map-container">
                            <div className="map-wrapper">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60334.74934401282!2d72.82169285!3d19.1334335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7c327c98519%3A0x3b5d67abe4c47f08!2sAndheri%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1698765432100!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Athletix Store Location"
                                />
                            </div>
                            <div className="map-overlay">
                                <div className="store-info">
                                    <h4>Athletix Flagship Store</h4>
                                    <p>123 Sports Avenue, Andheri West</p>
                                    <a
                                        href="https://maps.google.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-sm btn-outline"
                                    >
                                        Get Directions
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq-section section">
                <div className="container">
                    <div className="section-header center">
                        <span className="section-label">FAQ</span>
                        <h2 className="section-title">Frequently Asked Questions</h2>
                    </div>

                    <div className="faq-grid">
                        {faqs.map((faq, index) => (
                            <div key={index} className="faq-item">
                                <h3>{faq.question}</h3>
                                <p>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Contact;
