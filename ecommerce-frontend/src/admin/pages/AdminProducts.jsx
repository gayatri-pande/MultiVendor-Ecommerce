import { useEffect, useState } from "react";
import api from "../../services/api";
import "../styles/adminProducts.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="container">Loading products...</p>;
  }

  return (
    <div className="admin-products-page">
      <h2>All Products</h2>

      <div className="admin-products-table">
        <div className="table-header">
          <span>Product</span>
          <span>Vendor</span>
          <span>Category</span>
          <span>Price</span>
          <span>Stock</span>
        </div>

        {products.map(product => (
          <div className="table-row" key={product.id}>
            <span>{product.name}</span>
            <span>{product.shopName}</span>
            <span>{product.categoryName}</span>
            <span>₹{product.price}</span>
            <span>{product.stock}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
