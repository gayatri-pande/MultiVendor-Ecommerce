import "../styles/VendorPending.css";
import { useVendor } from "../../context/VendorContext";

const VendorPending = () => {

  const { vendor } = useVendor();

if (vendor?.approved) {
  return <Navigate to="/vendor/dashboard" />;
}

  return (
    <div className="vendor-pending">
      <div className="pending-card">
        <h2>⏳ Approval Pending</h2>
        <p>
          Your vendor request has been submitted successfully.
        </p>
        <p>
          Our admin team is reviewing your application.
        </p>
        <p className="note">
          You will get access to the Vendor Dashboard once approved.
        </p>
      </div>
    </div>
  );
};

export default VendorPending;
