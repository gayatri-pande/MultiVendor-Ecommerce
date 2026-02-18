import { NavLink } from "react-router-dom";
import "../styles/VendorSidebar.css";

const VendorSidebar = () => {
  return (
    <aside className="vendor-sidebar">
      <h2 className="vendor-logo">Vendor Panel</h2>

      <nav className="vendor-nav">
        <NavLink
          to="/vendor/dashboard"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/vendor/dashboard/products"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          My Products
        </NavLink>

        <NavLink
          to="/vendor/dashboard/add-product"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Add Product
        </NavLink>

        <li>
  <NavLink to="/vendor/dashboard/orders"
      className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
  >
    Orders
  </NavLink>
</li>

      </nav>
    </aside>
  );
};

export default VendorSidebar;
