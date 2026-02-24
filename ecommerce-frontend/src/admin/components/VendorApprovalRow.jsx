import api from "../../services/api";

const VendorApprovalRow = ({ vendor, refreshVendors }) => {
  const approveVendor = async () => {
    try {
      await api.put(`/api/admin/vendors/${vendor.id}/approve`);
      refreshVendors(); 
    } catch (err) {
      alert("Failed to approve vendor");
    }
  };

  return (
    <div className="vendor-row">
      <div className="vendor-info">
        <h4>{vendor.shopName}</h4>
        <p>Email: {vendor.user.email}</p>
      </div>

      <div className="vendor-status">
        {vendor.approved ? (
          <span className="status approved">Approved</span>
        ) : (
          <>
            <span className="status pending">Pending</span>
            <button onClick={approveVendor} className="approve-btn">
              Approve
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VendorApprovalRow;
