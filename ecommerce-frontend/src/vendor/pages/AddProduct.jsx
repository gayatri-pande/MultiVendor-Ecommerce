import { useEffect, useState } from "react";
import api from "../../services/api";
import ImageUpload from "../components/ImageUpload";
import "../styles/AddProduct.css";
import { useNavigate } from "react-router-dom";
import { useVendor } from "../../context/VendorContext";

const AddProduct = () => {
  const navigate = useNavigate();
  const { vendor } = useVendor(); 

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  useEffect(() => {
    api.get("/api/categories")
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !stock || !categoryId || !image) {
      setError("All fields are required");
      return;
    }

    if (!vendor) {
      setError("Vendor not found");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("categoryId", categoryId);
    formData.append("image", image);
    formData.append("vendorId", vendor.id); 

    try {
      setLoading(true);
      setError("");

      await api.post("/api/products/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/vendor/dashboard/products");
    } catch (err) {
      setError("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product">
      <h2>Add New Product</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Product Name</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />

        <label>Stock</label>
        <input
          type="number"
          value={stock}
          onChange={e => setStock(e.target.value)}
        />

        <label>Category</label>
        <select
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <ImageUpload onSelect={setImage} />

        <button disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
