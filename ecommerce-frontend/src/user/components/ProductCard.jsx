
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "../styles/product.css";

const ProductCard = ({ product }) => {
  const backendUrl = "http://localhost:8080";
  const { addToCart } = useCart();

  const [loaded, setLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const imageSrc =
    !imgError && product.imageUrl
      ? `${backendUrl}${product.imageUrl}`
      : "/placeholder.png";

  return (
    <div className="product-card">
      
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="image-wrapper">
          {!loaded && (
            <img
              src="/placeholder.png"
              alt="loading"
              className="product-image placeholder"
            />
          )}

          <img
            src={imageSrc}
            alt={product.name}
            className={`product-image ${loaded ? "show" : "hide"}`}
            onLoad={() => setLoaded(true)}
            onError={() => {
              setImgError(true);
              setLoaded(true);
            }}
          />
        </div>
      </Link>

      
      <div className="product-info">
        <h3>{product.name}</h3>

        <p className="vendor">
          Sold by {product.shopName || "Vendor"}
        </p>

        <div className="bottom">
          <span className="price">₹{product.price}</span>

          
          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
