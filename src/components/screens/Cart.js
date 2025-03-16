import React, { useState } from "react";
import { useCart, useDispatchCart } from "../ContextReducer";
import axios from "axios";
import "./cart.css"; // Ensure this file is updated for responsiveness

export default function Cart() {
  const cart = useCart();
  const dispatch = useDispatchCart();
  const [loading, setLoading] = useState(false);

  // Remove an item from cart
  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  // Send order to admin
  const handleSendOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/cart/send-cart", { cart });
      if (response.data.success) {
        alert("Order sent successfully to Admin!");
      } else {
        alert("Failed to send order.");
      }
    } catch (error) {
      console.error("Error sending order:", error);
      alert("Error sending order. Try again!");
    } finally {
      setLoading(false);
    }
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mt-5 cart-page">
      <h2 className="text-center text-success fw-bold">🛒 My Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center mt-4">
          <h4 className="text-muted">Your cart is empty 😢</h4>
        </div>
      ) : (
        <div className="cart-content">
          {/* Cart Items Section */}
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                {/* Item Image */}
                <img
                  src={item.img || "https://via.placeholder.com/80"}
                  alt={item.itemName}
                  className="cart-item-img"
                />

                {/* Item Details */}
                <div className="cart-item-details">
                  <h5>{item.itemName}</h5>
                  <p className="text-muted">Size: {item.size} | Qty: {item.quantity}</p>
                  <p className="fw-bold text-success">₹{item.price * item.quantity}</p>
                </div>

                {/* Delete Button */}
                <button className="btn btn-danger btn-sm remove-btn" onClick={() => handleRemove(item.id)}>❌</button>
              </div>
            ))}
          </div>

          {/* Order Summary Section */}
          <div className="order-summary">
            <h4 className="text-center fw-bold">Order Summary</h4>
            <hr />
            <p className="fw-bold text-dark">Total Price: <span className="text-success">₹{totalPrice}</span></p>
            <button className="btn btn-warning w-100 fw-bold">Proceed to Checkout 🛍️</button>
          </div>
        </div>
      )}

      {/* Buttons - Always Visible */}
      <div className="cart-actions">
        <a href="/" className="btn btn-primary">Back to Shopping 🛍️</a>
        <button
          className="btn btn-success ms-2"
          onClick={handleSendOrder}
          disabled={loading || cart.length === 0}
        >
          {loading ? "Sending..." : "Send Order to Admin 📩"}
        </button>
      </div>
    </div>
  );
  
}
