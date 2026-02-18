import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dashboard-actions">
      <Link to="/vendor/products" className="action-card">
         My Products
      </Link>

      <Link to="/vendor/products/add" className="action-card">
         Add Product
      </Link>

      <Link to="/vendor/orders" className="action-card">
         Orders
      </Link>
    </div>
  );
};

export default DashboardActions;
