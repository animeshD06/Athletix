import { Link } from 'react-router-dom';
import {
    ChevronRight, Award, Target, Heart, Zap,
    Users, Trophy, Globe
} from 'lucide-react';
import './About.css';

const About = () => {
    const values = [
        {
            icon: Award,
            title: 'Premium Quality',
            description: 'We source only the finest materials and partner with top manufacturers to deliver products that meet professional standards.'
        },
        {
            icon: Target,
            title: 'Performance Driven',
            description: 'Every product is tested by athletes and designed to enhance your performance, whether you\'re a beginner or a pro.'
        },
        {
            icon: Heart,
            title: 'Customer First',
            description: 'Your satisfaction is our priority. We offer hassle-free returns, responsive support, and a satisfaction guarantee.'
        },
        {
            icon: Zap,
            title: 'Innovation',
            description: 'We stay ahead of trends and continuously update our collection with the latest sports technology and design.'
        }
    ];

    const stats = [
        { number: '50K+', label: 'Happy Customers' },
        { number: '1000+', label: 'Products' },
        { number: '98%', label: 'Satisfaction Rate' },
        { number: '15+', label: 'Years Experience' }
    ];

    const team = [
        {
            name: 'Rajesh Kumar',
            role: 'Founder & CEO',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
            quote: 'Sports changed my life, and I want to help others experience that transformation.'
        },
        {
            name: 'Priya Sharma',
            role: 'Head of Product',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
            quote: 'Quality isn\'t just a goal; it\'s our standard.'
        },
        {
            name: 'Amit Patel',
            role: 'Sports Director',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
            quote: 'Every athlete deserves equipment that matches their ambition.'
        }
    ];

    return (
        <main className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="hero-bg">
                    <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&h=800&fit=crop" alt="Athletes training" />
                    <div className="hero-overlay" />
                </div>
                <div className="container">
                    <nav className="breadcrumb">
                        <Link to="/">Home</Link>
                        <ChevronRight size={14} />
                        <span>About Us</span>
                    </nav>
                    <div className="hero-content">
                        <h1>Fueling Champions <span>Since 2009</span></h1>
                        <p>
                            Athletix is more than just a sports equipment store. We're a community
                            of athletes, dreamers, and achievers dedicated to helping you reach
                            your full potential.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission-section section">
                <div className="container">
                    <div className="mission-grid">
                        <div className="mission-content">
                            <span className="section-label">Our Mission</span>
                            <h2 className="section-title">Empowering Athletes at Every Level</h2>
                            <p>
                                At Athletix, we believe that everyone deserves access to high-quality
                                sports equipment. Whether you're a weekend warrior, a dedicated amateur,
                                or a professional athlete, we provide the tools you need to succeed.
                            </p>
                            <p>
                                Our mission is simple: to inspire and equip athletes across India with
                                premium gear that doesn't break the bank. We carefully curate our
                                collection to ensure every product meets our exacting standards for
                                quality, durability, and performance.
                            </p>
                            <div className="mission-highlights">
                                <div className="highlight">
                                    <Trophy size={24} />
                                    <span>Official partner of 50+ sports clubs</span>
                                </div>
                                <div className="highlight">
                                    <Globe size={24} />
                                    <span>Shipping to all 28 states</span>
                                </div>
                                <div className="highlight">
                                    <Users size={24} />
                                    <span>Community of 50,000+ athletes</span>
                                </div>
                            </div>
                        </div>
                        <div className="mission-image">
                            <img
                                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=800&fit=crop"
                                alt="Athlete stretching"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-item">
                                <span className="stat-number">{stat.number}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section section">
                <div className="container">
                    <div className="section-header center">
                        <span className="section-label">Our Values</span>
                        <h2 className="section-title">What We Stand For</h2>
                    </div>

                    <div className="values-grid">
                        {values.map((value, index) => (
                            <div key={index} className="value-card">
                                <div className="value-icon">
                                    <value.icon size={28} />
                                </div>
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="story-section section">
                <div className="container">
                    <div className="story-grid">
                        <div className="story-images">
                            <div className="story-image main">
                                <img
                                    src="https://images.unsplash.com/photo-1526676037777-05a232554f77?w=400&h=500&fit=crop"
                                    alt="Athletix store"
                                />
                            </div>
                            <div className="story-image secondary">
                                <img
                                    src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&h=400&fit=crop"
                                    alt="Athletes using equipment"
                                />
                            </div>
                        </div>
                        <div className="story-content">
                            <span className="section-label">Our Story</span>
                            <h2 className="section-title">From Passion to Purpose</h2>
                            <p>
                                Athletix was born in 2009 from a simple frustration: quality sports
                                equipment was either too expensive or too hard to find. Our founder,
                                Rajesh Kumar, a former national-level cricketer, decided to change that.
                            </p>
                            <p>
                                Starting with a small shop in Mumbai, we began curating the best equipment
                                from around the world. Word spread quickly among athletes about our
                                commitment to quality and fair pricing.
                            </p>
                            <p>
                                Today, Athletix is one of India's leading sports equipment retailers,
                                but our core values remain unchanged. We still test every product ourselves,
                                still obsess over quality, and still believe that great gear should be
                                accessible to everyone.
                            </p>
                            <Link to="/shop" className="btn btn-primary">
                                Explore Our Collection
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section section">
                <div className="container">
                    <div className="section-header center">
                        <span className="section-label">Our Team</span>
                        <h2 className="section-title">Meet the People Behind Athletix</h2>
                    </div>

                    <div className="team-grid">
                        {team.map((member, index) => (
                            <div key={index} className="team-card">
                                <div className="team-image">
                                    <img src={member.image} alt={member.name} />
                                </div>
                                <div className="team-info">
                                    <h3>{member.name}</h3>
                                    <span className="team-role">{member.role}</span>
                                    <p className="team-quote">"{member.quote}"</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Elevate Your Game?</h2>
                        <p>
                            Join thousands of athletes who trust Athletix for their sporting needs.
                            Experience the difference quality makes.
                        </p>
                        <div className="cta-buttons">
                            <Link to="/shop" className="btn btn-primary btn-lg">
                                Shop Now
                            </Link>
                            <Link to="/contact" className="btn btn-outline btn-lg">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;
