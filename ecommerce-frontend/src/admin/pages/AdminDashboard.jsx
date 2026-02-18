import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
// import AdminStats from "../components/AdminStats";
// import VendorApprovalTable from "../components/VendorApprovalTable";
import "../styles/admin.css";

const AdminDashboard = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">
        <AdminHeader />
        {/* <AdminStats /> */}
        {/* <VendorApprovalTable /> */}
      </main>
    </div>
  );
};

export default AdminDashboard;