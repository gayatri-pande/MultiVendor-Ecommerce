import { useEffect, useState } from "react";
import api from "../../services/api";
import "../styles/VendorProducts.css";
import { Link, useNavigate } from "react-router-dom";


const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products/my");
      setProducts(res.data);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  if (loading) return <p className="vendor-loading">Loading products...</p>;
  if (error) return <p className="vendor-error">{error}</p>;

  return (
    <div className="vendor-products">
      <div className="vendor-products-header">
        <h2>My Products</h2>
        {/* <Link to="/vendor/dashboard/add-product" className="add-product-btn">
          + Add Product
        </Link> */}
      </div>

      {products.length === 0 ? (
        <p className="no-products">No products added yet.</p>
      ) : (
        <table className="vendor-product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={`http://localhost:8080${product.imageUrl}`}
                    alt={product.name}
                    className="vendor-product-img"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.categoryName}</td>
                <td>₹{product.price}</td>
                <td>{product.stock}</td>
                
                <td>
                   <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(`/vendor/dashboard/products/${product.id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VendorProducts;
