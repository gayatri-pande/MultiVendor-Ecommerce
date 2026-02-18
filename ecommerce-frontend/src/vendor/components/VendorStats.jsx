import "../styles/VendorStats.css";

const VendorStats = () => {
  return (
    <div className="vendor-stats">
      <div className="stat-card">
        <h4>Total Products</h4>
        <p>0</p>
      </div>

      <div className="stat-card">
        <h4>Total Orders</h4>
        <p>0</p>
      </div>

      <div className="stat-card">
        <h4>Revenue</h4>
        <p>₹0</p>
      </div>
    </div>
  );
};

export default VendorStats;
