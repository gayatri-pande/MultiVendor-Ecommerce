import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminOrderCard from "../components/AdminOrderCard";
import "../styles/adminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/orders")
      .then(res => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="container">Loading orders...</p>;

  if (orders.length === 0) {
    return <h3 className="container">No orders found</h3>;
  }

  return (
    <div className="admin-orders-page">
      <h2>All Orders</h2>

      {orders.map(order => (
        <AdminOrderCard key={order.orderId} order={order} />
      ))}
    </div>
  );
};

export default AdminOrders;
