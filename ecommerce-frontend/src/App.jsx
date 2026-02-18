import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./user/components/Navbar";
import Footer from "./user/components/Footer";

import Home from "./user/pages/Home";
import Cart from "./user/pages/Cart";
import Orders from "./user/pages/Orders";
import ProductDetails from "./user/pages/ProductDetails";

import Login from "./auth/Login";
import Register from "./auth/Register";

import VendorRegister from "./vendor/pages/VendorRegister";
import VendorPending from "./vendor/pages/VendorPending";
import VendorDashboard from "./vendor/pages/VendorDashboard";
import VendorProducts from "./vendor/pages/VendorProducts";
import AddProduct from "./vendor/pages/AddProduct";

import ProtectedRoute from "./routes/ProtectedRoute";
import AuthProtectedRoute from "./routes/AuthProtectedRoute";
import VendorOrders from "./vendor/pages/VendorOrders";
import Checkout from "./user/pages/Checkout";
import OrderDetails from "./user/pages/OrderDetails";
import AdminVendors from "./admin/pages/AdminVendors";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminOrders from "./admin/pages/AdminOrders";
import AdminProducts from "./admin/pages/AdminProducts";
import EditProduct from "./vendor/pages/EditProduct";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* ================= USER ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        



        {/* ================= AUTH ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= VENDOR REGISTRATION ================= */}
        <Route
          path="/vendor/register"
          element={
            <AuthProtectedRoute>
              <VendorRegister />
            </AuthProtectedRoute>
          }
        />

        <Route
          path="/vendor/pending"
          element={
            <AuthProtectedRoute>
              <VendorPending />
            </AuthProtectedRoute>
          }
        />

        {/* ================= VENDOR DASHBOARD ================= */}
        <Route
          path="/vendor/dashboard"
          element={
            <ProtectedRoute allowedRoles={["VENDOR"]}>
              <VendorDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<VendorProducts />} />
          <Route path="products" element={<VendorProducts />} />
          <Route path="add-product" element={<AddProduct />} />
            <Route path="orders" element={<VendorOrders />} /> {/* ✅ ADD THIS */}
            <Route
  path="products/:id/edit"
  element={<EditProduct />}
/>


        </Route>
        <Route
  path="/admin/vendors"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminVendors />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/orders"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminOrders />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/products"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminProducts />
    </ProtectedRoute>
  }
/>



      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
