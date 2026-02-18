import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";
import { VendorProvider } from "./context/VendorContext";
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductProvider>
  <CartProvider>
    <AuthProvider>
      <VendorProvider>
        <App />
      </VendorProvider>
    </AuthProvider>
  </CartProvider>
</ProductProvider>


  </React.StrictMode>,
);
