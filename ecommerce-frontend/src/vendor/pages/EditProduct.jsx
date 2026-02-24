import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "../styles/AddProduct.css"; 

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const loadData = async () => {
      const [productRes, categoryRes] = await Promise.all([
        api.get(`/api/products/${id}`),
        api.get("/api/categories"),
      ]);

      const product = productRes.data;

      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setCategoryId(product.categoryId);
      setCategories(categoryRes.data);
    };

    loadData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await api.put(`/api/products/${id}`, {
        name,
        price,
        stock,
        categoryId,
      });

      navigate("/vendor/dashboard/products");
    } catch (err) {
      alert("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product">
      <h2>Edit Product</h2>

      <form onSubmit={handleUpdate}>
        <label>Product Name</label>
        <input value={name} onChange={e => setName(e.target.value)} />

        <label>Price</label>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} />

        <label>Stock</label>
        <input type="number" value={stock} onChange={e => setStock(e.target.value)} />

        <label>Category</label>
        <select value={categoryId} onChange={e => setCategoryId(e.target.value)}>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <button disabled={loading}>
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
