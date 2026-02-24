import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { addToCart, decreaseQty, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <img
        src={`http://localhost:8080${item.imageUrl}`}
        alt={item.name}
      />

      <div className="cart-info">
        <h4>{item.name}</h4>
        <p>₹{item.price}</p>

        <div className="qty-controls">
          <button onClick={() => decreaseQty(item.id)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => addToCart(item)}>+</button>
        </div>

        <button onClick={() => removeFromCart(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
