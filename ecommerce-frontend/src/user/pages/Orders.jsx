import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "../styles/orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/api/orders/my");
        setOrders(res.data || []);
      } catch (err) {
        console.error("Failed to load orders", err);
        setError("Failed to load orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="container">Loading orders...</p>;
  }

  if (error) {
    return <p className="container error">{error}</p>;
  }

  if (orders.length === 0) {
    return <h2 className="container">No orders yet 📦</h2>;
  }

  return (
    <div className="container orders-page">
      <h2 className="page-title">My Orders</h2>

      <div className="orders-list">
        {orders.map((order) => (
          <Link
            to={`/orders/${order.orderId}`}
            key={order.orderId}
            className="order-card"
          >
            <div className="order-header">
              <span>Order #{order.orderId}</span>
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>

            <div className="order-body">
              <p>Total Amount</p>
              <h3>₹{order.totalAmount}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Orders;
