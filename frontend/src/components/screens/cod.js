import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./cod.css"; // ✅ Optional: Add styling

export default function COD() {
  const location = useLocation();
  const navigate = useNavigate();

  const cart = location.state?.cart || []; // ✅ Get selected cart items from navigation state

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.address || !formData.phone) {
      alert("Please fill out all fields!");
      return;
    }

    if (formData.phone.length < 10) {
      alert("Please enter a valid phone number!");
      return;
    }

    alert("Order placed successfully! 🎉");
    navigate("/"); // ✅ Redirect back to home or orders page
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-success">📦 Cash on Delivery</h2>
      <p className="text-center text-muted">Please provide your details to confirm the order.</p>

      {/* ✅ Display Selected Cart Items */}
      {cart.length > 0 ? (
        <div className="selected-cart">
          <h4 className="fw-bold text-center">🛒 Your Order Summary</h4>
          <div className="cart-list">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.img || "https://via.placeholder.com/80"} alt={item.itemName} className="cart-item-img" />
                <div className="cart-item-details">
                  <h6>{item.itemName}</h6>
                  <p>Size: {item.size} | Qty: {item.quantity}</p>
                  <p className="fw-bold text-success">₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <hr />
        </div>
      ) : (
        <p className="text-center text-danger">No items selected! 😢</p>
      )}

      {/* ✅ Order Form */}
      <form onSubmit={handleSubmit} className="cod-form">
        <div className="mb-3">
          <label className="form-label fw-bold">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Address</label>
          <textarea
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your full address"
            rows="3"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100 fw-bold">
          ✅ Confirm Order
        </button>
      </form>
    </div>
  );
}
