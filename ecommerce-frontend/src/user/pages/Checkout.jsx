import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";
import "../styles/checkout.css";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return <h2 className="container">Your cart is empty 🛒</h2>;
  }

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name required";

    if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Enter valid 10 digit phone";

    if (!form.street.trim()) newErrors.street = "Street required";

    if (!form.city.trim()) newErrors.city = "City required";

    if (!/^\d{6}$/.test(form.pincode))
      newErrors.pincode = "Enter valid 6 digit pincode";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const placeOrder = async () => {
    if (!validate()) return; 

    try {
      const payload = {
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      await api.post("/orders", payload);

      clearCart();
      navigate("/orders");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className="checkout-page container">
      <h2>Checkout</h2>

      <div className="checkout-layout">
        {/* ADDRESS */}
        <div className="checkout-address">
          <h3>Delivery Address</h3>

          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <input
            name="street"
            placeholder="Street Address"
            value={form.street}
            onChange={handleChange}
          />
          {errors.street && <p className="error">{errors.street}</p>}

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />
          {errors.city && <p className="error">{errors.city}</p>}

          <input
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
          />
          {errors.pincode && <p className="error">{errors.pincode}</p>}
        </div>

        
        <div className="checkout-summary">
          <h3>Order Summary</h3>

          {cart.map(item => (
            <div key={item.id} className="summary-item">
              <span>{item.name} × {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <hr />
          <h4>Total: ₹{total}</h4>

          <button
            className="place-order-btn"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
