import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useVendor } from "../../context/VendorContext";
import "../styles/VendorRegister.css";

const VendorRegister = () => {
  const [shopName, setShopName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false); 

  const { vendor, loading } = useVendor(); 
  const { token } = useAuth();
  const navigate = useNavigate();

  
  if (loading) return null;

  
  if (vendor) {
    return vendor.approved ? (
      <Navigate to="/vendor/dashboard" />
    ) : (
      <Navigate to="/vendor/pending" />
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!shopName.trim()) {
      setError("Shop name is required");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await api.post(
        "/vendors/register",
        { shopName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/vendor/pending");
    } catch (err) {
      setError(err.response?.data?.message || "Vendor registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="vendor-register">
      <div className="vendor-card">
        <h2>Become a Vendor</h2>
        <p className="subtitle">
          Submit your store details for admin approval
        </p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Shop Name</label>
          <input
            type="text"
            placeholder="Enter your shop name"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
          />

          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit for Approval"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendorRegister;
