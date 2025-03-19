import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./cod.css"; // ✅ Optional: Add styling

export default function COD() {
    const location = useLocation();
    const navigate = useNavigate();
    const cart = location.state?.cart || [];


    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
    });

    // Handle form input change
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    // Convert form data to JSON format
    const convertToJson = (formData) => {
            const totalAmount = cart.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            return {
                phone: `+917060988418`,
                message: `
📦 *New Order Received* 🚀

👤 *Customer Name:* ${formData.name}
🏠 *Address:* ${formData.address}
📞 *Contact Number:* ${formData.phone}

🛒 *Order Summary:*
${cart
  .map(
    (item) =>
      `• ${item.itemName} (Size: ${item.size}, Qty: ${item.quantity}) - ₹${
        item.price * item.quantity
      }`
  )
  .join("\n")}

✅ *Total Items:* ${cart.length}
💰 *Total Amount:* ₹${totalAmount}

Please process the order accordingly. 📩
      `,
    };
  };

  // Function to send COD confirmation via WhatsApp
  const confirmCOD = async (formData) => {
    try {
      const finalData = convertToJson(formData);
      const response = await axios.post(
        "https://variety-food.onrender.com/api/send-sms",
        finalData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        console.log("WhatsApp Message Sent Successfully:", response.data);
        alert("Order placed successfully! 🎉");
        navigate("/"); // ✅ Redirect after success
      } else {
        throw new Error("Failed to send WhatsApp message");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send confirmation via WhatsApp. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
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

    await confirmCOD(formData);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-success">📦 Cash on Delivery</h2>
      <p className="text-center text-muted">
        Please provide your details to confirm the order.
      </p>

      {/* ✅ Display Selected Cart Items */}
      {cart.length > 0 ? (
        <div className="selected-cart">
          <h4 className="fw-bold text-center">🛒 Your Order Summary</h4>
          <div className="cart-list">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={item.img || "https://via.placeholder.com/80"}
                  alt={item.itemName}
                  className="cart-item-img"
                />
                <div className="cart-item-details">
                  <h6>{item.itemName}</h6>
                  <p>
                    Size: {item.size} | Qty: {item.quantity}
                  </p>
                  <p className="fw-bold text-success">
                    ₹{item.price * item.quantity}
                  </p>
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