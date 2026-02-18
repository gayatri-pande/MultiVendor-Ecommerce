import { NavLink } from "react-router-dom";
import "../styles/VendorTabs.css";

const VendorTabs = () => {
  return (
    <div className="vendor-tabs">
      <NavLink
        to="/vendor/dashboard/products"
        className={({ isActive }) =>
          isActive ? "tab active" : "tab"
        }
      >
        My Products
      </NavLink>

      <NavLink
        to="/vendor/dashboard/add-product"
        className={({ isActive }) =>
          isActive ? "tab active" : "tab"
        }
      >
        Add Product
      </NavLink>
    </div>
  );
};

export default VendorTabs;
