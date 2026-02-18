import "../styles/VendorDashboard.css";

const VendorHeader = () => {
  return (
    <div className="vendor-header">
      <div>
        <h1>Vendor Dashboard</h1>
        <p className="subtitle">Manage your store & products</p>
      </div>

      <div className="vendor-status">
        <span className="status approved">Approved Vendor</span>
      </div>
    </div>
  );
};

export default VendorHeader;
