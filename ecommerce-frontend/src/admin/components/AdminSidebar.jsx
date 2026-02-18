import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <h2 className="logo">Admin</h2>

      <nav>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/vendors">Vendors</Link>
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/categories">Categories</Link>
        <Link to="/admin/orders">Orders</Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
