import api from "../../services/api";

const VendorOrderRow = ({ item, refreshOrders }) => {
  const getNextStatus = () => {
    if (item.status === "CREATED") return "SHIPPED";
    if (item.status === "SHIPPED") return "DELIVERED";
    return null;
  };

  const updateStatus = async () => {
    const nextStatus = getNextStatus();
    if (!nextStatus) return;

    try {
      await api.put(
        `/vendor/orders/${item.orderItemId}/status`,
        { status: nextStatus }
      );
      refreshOrders(); // 🔄 reload list
    } catch (err) {
      alert("Failed to update order status");
    }
  };

  return (
    <div className="vendor-order-row">
      <div>
        <p className="order-id">Order #{item.orderId}</p>
        <strong>{item.productName}</strong>
        <p>Qty: {item.quantity}</p>
        <p>Price: ₹{item.price}</p>
      </div>

      <div className="status-section">
        <span className={`status-badge ${item.status.toLowerCase()}`}>
          {item.status}
        </span>

        {getNextStatus() && (
          <button className="status-btn" onClick={updateStatus}>
            Mark as {getNextStatus()}
          </button>
        )}
      </div>
    </div>
  );
};

export default VendorOrderRow;
