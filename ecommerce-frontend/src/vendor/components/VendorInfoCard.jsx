import { useVendor } from "../../context/VendorContext";

const VendorInfoCard = () => {
  const { vendor } = useVendor();

  if (!vendor) return null;

  return (
    <div className="vendor-info-card">
      <h3>{vendor.shopName}</h3>
      <p>
        Status:{" "}
        <span className={vendor.approved ? "approved" : "pending"}>
          {vendor.approved ? "Approved" : "Pending Approval"}
        </span>
      </p>
    </div>
  );
};

export default VendorInfoCard;
