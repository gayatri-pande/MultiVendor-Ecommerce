import { useEffect, useState } from "react";
import api from "../../services/api";
import VendorOrderRow from "../components/VendorOrderRow";
import "../styles/VendorOrders.css";

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVendorOrders = async () => {
    try {
      // const res = await api.get("/vendor");
       const res = await api.get("/api/vendor/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to load vendor orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorOrders();
  }, []);

  if (loading) return <p className="container">Loading orders...</p>;

  if (orders.length === 0) {
    return <h3 className="container">No orders yet 📦</h3>;
  }

  return (
    <div className="vendor-orders-page">
      <h2>Orders Received</h2>

      <div className="vendor-orders-table">
        {orders.map(item => (
          <VendorOrderRow
            key={item.orderItemId}
            item={item}
            refreshOrders={fetchVendorOrders}
          />
        ))}
      </div>
    </div>
  );
};

export default VendorOrders;
