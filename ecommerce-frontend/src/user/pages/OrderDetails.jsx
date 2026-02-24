import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "../styles/orderdetails.css";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/orders/${id}`)
      .then(res => setOrder(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="container">Loading order...</p>;

  if (!order) {
    return <h2 className="container">Order not found ❌</h2>;
  }

  return (
    <div className="container order-details">
      <h2>Order #{order.orderId}</h2>

      <span className={`status-badge ${order.status.toLowerCase()}`}>
        {order.status}
      </span>

      <div className="order-items">
        {order.items.map((item, index) => (
          <div key={index} className="order-item">
            <div>
              <h4>{item.productName}</h4>
              <p>Quantity: {item.quantity}</p>
            </div>

            <div className="price">
              ₹{item.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

      <div className="order-total">
        <h3>Total: ₹{order.totalAmount}</h3>
      </div>
    </div>
  );
};

export default OrderDetails;
