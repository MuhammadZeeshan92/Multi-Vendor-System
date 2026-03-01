import React from 'react';

const Footer = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

      .footer-root {
        font-family: 'Inter', sans-serif;
        background: #6d4aff;
        border-top: 1px solid rgba(255,255,255,0.12);
        margin-top: 48px;
      }

      .footer-inner {
        max-width: 1280px;
        margin: 0 auto;
        padding: 48px 32px 32px;
      }

      .footer-top {
        display: grid;
        grid-template-columns: 1.4fr 1fr 1fr 1fr;
        gap: 40px;
        padding-bottom: 40px;
        border-bottom: 1px solid rgba(255,255,255,0.15);
      }

      .footer-brand-logo {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 14px;
        text-decoration: none;
      }

      .footer-brand-icon {
        width: 34px;
        height: 34px;
        background: rgba(255,255,255,0.2);
        border: 1px solid rgba(255,255,255,0.3);
        border-radius: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.85rem;
        font-weight: 700;
        color: #fff;
        flex-shrink: 0;
      }

      .footer-brand-name {
        font-size: 1rem;
        font-weight: 600;
        color: #f8f8fb;
        letter-spacing: -0.01em;
      }

      .footer-brand-desc {
        font-size: 0.8rem;
        color: rgba(248,248,251,0.65);
        line-height: 1.6;
        margin: 0 0 20px 0;
        font-weight: 400;
        max-width: 200px;
      }

      .footer-badges {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .footer-badge {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        font-size: 0.72rem;
        color: rgba(248,248,251,0.75);
        font-weight: 500;
      }

      .footer-badge-dot {
        width: 6px;
        height: 6px;
        background: rgba(255,255,255,0.5);
        border-radius: 50%;
        opacity: 1;
        flex-shrink: 0;
      }

      .footer-nav-title {
        font-size: 0.72rem;
        font-weight: 600;
        color: #f8f8fb;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        margin: 0 0 16px 0;
      }

      .footer-nav-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .footer-nav-list a {
        font-size: 0.82rem;
        color: rgba(248,248,251,0.65);
        text-decoration: none;
        font-weight: 400;
        transition: color 0.15s ease;
      }

      .footer-nav-list a:hover { color: #f8f8fb; }

      .footer-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 24px;
        border-top: 1px solid rgba(255,255,255,0.15);
        flex-wrap: wrap;
        gap: 12px;
      }

      .footer-copy {
        font-size: 0.75rem;
        color: rgba(248,248,251,0.45);
        font-weight: 400;
      }

      .footer-stripe-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: rgba(255,255,255,0.12);
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 20px;
        padding: 4px 12px 4px 8px;
        font-size: 0.7rem;
        color: rgba(248,248,251,0.8);
        font-weight: 500;
      }

      .footer-stripe-badge svg {
        width: 14px;
        height: 14px;
        opacity: 0.6;
      }

      .footer-bottom-links {
        display: flex;
        gap: 20px;
      }

      .footer-bottom-links a {
        font-size: 0.75rem;
        color: rgba(248,248,251,0.45);
        text-decoration: none;
        font-weight: 400;
        transition: color 0.15s ease;
      }

      .footer-bottom-links a:hover { color: #f8f8fb; }

      @media (max-width: 768px) {
        .footer-top { grid-template-columns: 1fr 1fr; gap: 32px; }
        .footer-bottom { flex-direction: column; align-items: flex-start; }
      }

      @media (max-width: 480px) {
        .footer-top { grid-template-columns: 1fr; }
        .footer-inner { padding: 36px 20px 24px; }
      }
    `}</style>

    <footer className="footer-root">
      <div className="footer-inner">

        <div className="footer-top">
          <div>
            <a className="footer-brand-logo" href="#">
              <div className="footer-brand-icon">M</div>
              <span className="footer-brand-name">Marketplace</span>
            </a>
            <p className="footer-brand-desc">
              Shop curated collections from verified independent vendors worldwide.
            </p>
            <div className="footer-badges">
              <span className="footer-badge">
                <span className="footer-badge-dot" />
                Secure Stripe checkout
              </span>
              <span className="footer-badge">
                <span className="footer-badge-dot" />
                Cookie-based authentication
              </span>
              <span className="footer-badge">
                <span className="footer-badge-dot" />
                Role-based access for vendors & admins
              </span>
            </div>
          </div>

          <div>
            <p className="footer-nav-title">Shop</p>
            <ul className="footer-nav-list">
              <li><a href="#">All Products</a></li>
              <li><a href="#">Top-rated</a></li>
              <li><a href="#">New Arrivals</a></li>
              <li><a href="#">Categories</a></li>
              <li><a href="#">Cart</a></li>
            </ul>
          </div>

          <div>
            <p className="footer-nav-title">Vendors</p>
            <ul className="footer-nav-list">
              <li><a href="#">Browse Vendors</a></li>
              <li><a href="#">Become a Vendor</a></li>
              <li><a href="#">Vendor Dashboard</a></li>
              <li><a href="#">Commission Info</a></li>
            </ul>
          </div>

          <div>
            <p className="footer-nav-title">Company</p>
            <ul className="footer-nav-list">
              <li><a href="#">About</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">
            &copy; {new Date().getFullYear()} Marketplace. All rights reserved.
          </span>

          <div className="footer-stripe-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            Payments secured by Stripe
          </div>

          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  </>
);

export default Footer;