import React, { useState, useEffect } from "react";
import { useCart, useDispatchCart } from "../ContextReducer";
import axios from "axios";
import "./cart.css";

export default function Cart() {
  const cart = useCart();
  const dispatch = useDispatchCart();
  const [loading, setLoading] = useState(false);

  // ✅ Load cart from localStorage when page refreshes
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart && savedCart.length > 0) {
      savedCart.forEach((item) => {
        dispatch({ type: "ADD_FROM_STORAGE", payload: item });
      });
    }
  }, [dispatch]);

  // ✅ Save cart to localStorage whenever it updates
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart"); // Clear storage if cart is empty
    }
  }, [cart]);

  // Remove an item from cart
  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  // ✅ Clear cart (including localStorage)
  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("cart"); // Clear from storage
  };

  // ✅ Cash on Delivery (COD) Option
  const handleCOD = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/cart/cash-on-delivery", { cart });
      if (response.data.success) {
        alert("Order placed successfully via Cash on Delivery!");
        handleClearCart(); // Clear cart after successful order
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing COD order:", error);
      alert("Error placing COD order. Try again!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Razorpay Payment
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/api/payment/order", {
        amount: totalPrice, // Sending total price to backend
      });

      const options = {
        key: "rzp_test_5Ro3pYiCdJqkSs", // Your Razorpay Key ID
        amount: data.order.amount,
        currency: "INR",
        name: "Variety Sweets & Restaurant",
        description: "Order Payment",
        order_id: data.order.id,
        handler: async (response) => {
          const verifyRes = await axios.post("http://localhost:5000/api/payment/verify", response);
          if (verifyRes.data.success) {
            alert("Payment Successful!");
            handleClearCart(); // Clear cart after successful payment
          } else {
            alert("Payment Verification Failed!");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "7060988418",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in Razorpay Payment:", error);
      alert("Payment failed. Try again!");
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
            <button className="btn btn-warning w-100 fw-bold" onClick={handleCheckout}>Proceed to Payment 💳</button>
            <button className="btn btn-info w-100 fw-bold mt-2" onClick={handleCOD}>Cash on Delivery 🚚</button>
          </div>
        </div>
      )}

      {/* Buttons - Always Visible */}
      <div className="cart-actions mt-3">
        <a href="/" className="btn btn-primary">Back to Shopping 🛍️</a>
        <button className="btn btn-danger ms-2" onClick={handleClearCart} disabled={cart.length === 0}>
          Clear Cart ❌
        </button>
      </div>
    </div>
  );
}
