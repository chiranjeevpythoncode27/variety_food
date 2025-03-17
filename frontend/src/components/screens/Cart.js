import React, { useEffect } from "react";
import { useCart, useDispatchCart } from "../ContextReducer";
import { useNavigate } from "react-router-dom";
import "./cart.css";

export default function Cart() {
  const cart = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();

  // Load cart from localStorage on first render
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (savedCart.length > 0) {
      dispatch({ type: "SET_CART", payload: savedCart }); // ✅ Set cart at once
    }
  }, [dispatch]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("cart");
  };

  const handleCOD = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/cod", { state: { cart } });
  };

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
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.img || "https://via.placeholder.com/80"}
                  alt={item.itemName}
                  className="cart-item-img"
                />

                <div className="cart-item-details">
                  <h5>{item.itemName}</h5>
                  <p className="text-muted">Size: {item.size} | Qty: {item.quantity}</p>
                  <p className="fw-bold text-success">₹{item.price * item.quantity}</p>
                </div>

                <button className="btn btn-danger btn-sm remove-btn" onClick={() => handleRemove(item.id)}>❌</button>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <h4 className="text-center fw-bold">Order Summary</h4>
            <hr />
            <p className="fw-bold text-dark">Total Price: <span className="text-success">₹{totalPrice}</span></p>

            <button className="btn btn-info w-100 fw-bold mt-2" onClick={handleCOD}>
              Cash on Delivery 🚚
            </button>
          </div>
        </div>
      )}

      <div className="cart-actions mt-3">
        <button className="btn custom-orange" onClick={() => navigate("/")}>Back to Shopping 🛍️</button>
        <button className="btn custom-red ms-2" onClick={handleClearCart} disabled={cart.length === 0}>
          Clear Cart ❌
        </button>
      </div>
    </div>
  );
}
