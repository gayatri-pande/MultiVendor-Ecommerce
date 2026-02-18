import { useEffect, useState } from "react";
import api from "../../services/api";
import VendorApprovalRow from "../components/VendorApprovalRow";
import "../styles/adminVendors.css";

const AdminVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVendors = async () => {
    try {
      const res = await api.get("/vendors/all");
      setVendors(res.data);
    } catch (err) {
      console.error("Failed to load vendors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  if (loading) return <p className="container">Loading vendors...</p>;

  return (
    <div className="admin-vendors-page container">
      <h2>Vendor Management</h2>

      {vendors.length === 0 ? (
        <p>No vendors found</p>
      ) : (
        <div className="vendor-table">
          {vendors.map(vendor => (
            <VendorApprovalRow
              key={vendor.id}
              vendor={vendor}
              refreshVendors={fetchVendors}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminVendors;
