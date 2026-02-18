import { useAuth } from "../../context/AuthContext";

const AdminHeader = () => {
  const { logout } = useAuth();

  return (
    <header className="admin-header">
      <span>Admin Panel</span>
      <button onClick={logout}>Logout</button>
    </header>
  );
};

export default AdminHeader;
