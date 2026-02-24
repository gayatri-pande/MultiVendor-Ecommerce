import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "../styles/productDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  const backendUrl = "http://localhost:8080";

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container">Loading product...</div>;
  if (!product) return <div className="container">Product not found</div>;

  const imageSrc =
    !imgError && product.imageUrl
      ? `${backendUrl}${product.imageUrl}`
      : "/placeholder.png";

  return (
    <div className="container product-page">
      {/* LEFT: IMAGE */}
      <div className="product-image-section">
        <img
          src={imageSrc}
          alt={product.name}
          onError={() => setImgError(true)}
        />
      </div>

      {/* RIGHT: DETAILS */}
      <div className="product-info-section">
        <h1>{product.name}</h1>

        <p className="vendor">
          Sold by <strong>{product.shopName}</strong>
        </p>

        <div className="price">₹{product.price}</div>

        <p className="stock">
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        <p className="description">
          {product.description || "No description available."}
        </p>

        <div className="actions">
          <button className="add-cart">Add to Cart</button>
          <button className="buy-now">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
