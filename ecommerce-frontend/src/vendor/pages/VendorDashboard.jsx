import VendorSidebar from "../components/VendorSidebar";
import VendorHeader from "../components/VendorHeader";
import VendorStats from "../components/VendorStats";
import { Outlet } from "react-router-dom";
import "../styles/VendorDashboard.css";

const VendorDashboard = () => {
  return (
    <div className="vendor-dashboard-scope">
      <div className="vendor-layout">
        <VendorSidebar />

        <main className="vendor-content">
          <VendorHeader />
          <VendorStats />

         
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VendorDashboard;
