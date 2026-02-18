import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { useAuth } from "../../context/AuthContext";
import { useVendor } from "../../context/VendorContext";
import { useCart } from "../../context/CartContext";
import "../styles/navbar.css";

const Navbar = () => {
  const { searchTerm, setSearchTerm } = useProducts();
  const { token, role, logout } = useAuth(); 
  const { cart } = useCart();

  
  const { vendor, loading } =
    role === "VENDOR" || role === "CUSTOMER"
      ? useVendor()
      : { vendor: null, loading: false };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <Link to="/" className="logo">
          MultiVendor
        </Link>

        
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn">🔍</button>
        </div>

        
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cart">Cart ({cart.length})</Link></li>
          <li><Link to="/orders">Orders</Link></li>

          {!token ? (
            <>
              <li>
                <Link to="/login" className="vendor-btn">
                  Become a Vendor
                </Link>
              </li>
              <li><Link to="/login">Login</Link></li>
              <li className="signup-btn">
                <Link to="/register">Sign Up</Link>
              </li>
            </>
          ) : (
            <>
             
              {role === "ADMIN" && (
                <li>
                  <Link to="/admin/dashboard" className="admin-btn">
                    Admin Dashboard
                  </Link>
                </li>
              )}

             
              {role !== "ADMIN" && !loading && (
                <>
                  {!vendor && (
                    <li>
                      <Link to="/vendor/register" className="vendor-btn">
                        Become a Vendor
                      </Link>
                    </li>
                  )}

                  {vendor && !vendor.approved && (
                    <li>
                      <Link to="/vendor/pending" className="vendor-btn">
                        Vendor Pending
                      </Link>
                    </li>
                  )}

                  {vendor && vendor.approved && (
                    <li>
                      <Link to="/vendor/dashboard" className="vendor-btn">
                        Vendor Dashboard
                      </Link>
                    </li>
                  )}
                </>
              )}

              <li>
                <button onClick={logout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
