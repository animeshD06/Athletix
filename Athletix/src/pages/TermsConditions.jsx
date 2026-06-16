import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './TermsConditions.css';

const TermsConditions = () => {
  return (
    <main className="terms-page">
      <section className="terms-header">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <span>Terms &amp; Conditions</span>
          </nav>
          <h1>Terms &amp; Conditions</h1>
          <p className="terms-updated">Last updated: March 25, 2026</p>
        </div>
      </section>

      <section className="terms-content">
        <div className="container">
          <div className="terms-body">
            <div className="terms-section">
              <h2>1. Introduction</h2>
              <p>
                Welcome to Athletix. These Terms &amp; Conditions govern your use of our website
                and the purchase of products from our online store. By accessing or using our
                website, you agree to be bound by these terms. If you do not agree to these
                terms, please do not use our website.
              </p>
            </div>

            <div className="terms-section">
              <h2>2. Use of the Website</h2>
              <p>
                You may use our website for lawful purposes only. You agree not to use the
                website in any way that could damage, disable, or impair the website or
                interfere with any other party&rsquo;s use of the website. You must not attempt to
                gain unauthorized access to any part of the website.
              </p>
            </div>

            <div className="terms-section">
              <h2>3. Products and Pricing</h2>
              <p>
                We make every effort to display our products and their prices as accurately as
                possible. However, we do not guarantee that product descriptions, images, or
                prices are error-free. We reserve the right to correct any errors and to change
                or update information without prior notice.
              </p>
            </div>

            <div className="terms-section">
              <h2>4. Orders and Payment</h2>
              <p>
                By placing an order, you are making an offer to purchase a product. All orders
                are subject to acceptance and availability. We reserve the right to refuse or
                cancel any order for any reason. Payment must be made at the time of order
                through one of our accepted payment methods.
              </p>
            </div>

            <div className="terms-section">
              <h2>5. Shipping and Delivery</h2>
              <p>
                We aim to deliver your order within the estimated delivery time. However,
                delivery times are not guaranteed and may vary depending on your location and
                other factors. We are not responsible for delays caused by circumstances beyond
                our control.
              </p>
            </div>

            <div className="terms-section">
              <h2>6. Returns and Refunds</h2>
              <p>
                If you are not satisfied with your purchase, you may return the product within
                30 days of delivery for a full refund or exchange, provided the product is in
                its original condition with all tags attached. Please refer to our Return Policy
                for detailed instructions.
              </p>
            </div>

            <div className="terms-section">
              <h2>7. Privacy Policy</h2>
              <p>
                Your privacy is important to us. Our Privacy Policy explains how we collect,
                use, and protect your personal information when you use our website. By using
                our website, you consent to the collection and use of your data as described in
                our Privacy Policy.
              </p>
            </div>

            <div className="terms-section">
              <h2>8. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, images, and
                software, is the property of Athletix and is protected by intellectual property
                laws. You may not reproduce, distribute, or create derivative works from any
                content without our prior written consent.
              </p>
            </div>

            <div className="terms-section">
              <h2>9. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Athletix shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages arising from
                your use of the website or purchase of products. Our total liability shall not
                exceed the amount paid by you for the product giving rise to the claim.
              </p>
            </div>

            <div className="terms-section">
              <h2>10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms &amp; Conditions at any time. Changes
                will be effective immediately upon posting on the website. Your continued use of
                the website after any changes constitutes your acceptance of the new terms.
              </p>
            </div>

            <div className="terms-section">
              <h2>11. Contact Us</h2>
              <p>
                If you have any questions about these Terms &amp; Conditions, please contact us at{' '}
                <Link to="/contact">our contact page</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsConditions;
