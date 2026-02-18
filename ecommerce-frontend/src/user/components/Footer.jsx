import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        
        <div className="footer-section">
          <h2 className="footer-logo">MultiVendor</h2>
          <p className="footer-desc">
            A trusted multi-vendor marketplace connecting customers with
            verified sellers across categories.
          </p>
        </div>


        <div className="footer-section">
          <h4>For Customers</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/orders">My Orders</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>For Vendors</h4>
          <ul>
            <li><Link to="/vendor/register">Become a Vendor</Link></li>
            <li><Link to="/vendor/dashboard">Vendor Dashboard</Link></li>
            <li><Link to="/">Sell Products</Link></li>
          </ul>
        </div>

        
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><Link to="/">Help Center</Link></li>
            <li><Link to="/">Privacy Policy</Link></li>
            <li><Link to="/">Terms & Conditions</Link></li>
          </ul>
        </div>

      </div>

     
      <div className="footer-bottom">
        © {new Date().getFullYear()} MultiVendor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
