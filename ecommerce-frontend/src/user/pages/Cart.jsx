import { useCart } from "../../context/CartContext";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

import "../styles/Cart.css";

const Cart = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();


  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return <h2 className="container">Your cart is empty 🛒</h2>;
  }

  return (
    <div className="container cart-page">
      <h2>Your Cart</h2>

      {cart.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

     <div className="cart-summary">
  <h3>Total: ₹{total}</h3>

  <div className="cart-actions">
    <button onClick={() => navigate("/checkout")}>
      Proceed to Checkout
    </button>

    <button className="clear-btn" onClick={clearCart}>
      Clear Cart
    </button>
  </div>
</div>

    </div>
  );
};

export default Cart;
