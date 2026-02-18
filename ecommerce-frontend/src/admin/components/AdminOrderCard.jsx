const AdminOrderCard = ({ order }) => {
  return (
    <div className="admin-order-card">
      <div className="order-header">
        <strong>Order #{order.orderId}</strong>
        <span className={`status ${order.status.toLowerCase()}`}>
          {order.status}
        </span>
      </div>

      <p>Customer: {order.customerEmail}</p>
      <p>Total: ₹{order.totalAmount}</p>

      <div className="order-items">
        {order.items.map((item, idx) => (
          <div key={idx} className="order-item">
            <span>{item.productName}</span>
            <span>Qty: {item.quantity}</span>
            <span>₹{item.price}</span>
            <span>Vendor: {item.vendorShop}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrderCard;
