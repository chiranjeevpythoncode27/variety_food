import React, { useEffect, useState } from "react";
import axios from "axios";


export default function MyAccount() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming JWT authentication
        if (!token) {
          throw new Error("User not logged in");
        }

        const res = await axios.get("https://your-api.com/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user);
        setOrders(res.data.orders); // Assuming API returns user's orders
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <h2 className="text-center">Loading your account...</h2>;
  if (error) return <h2 className="text-danger text-center">{error}</h2>;

  return (
    <div className="account-container">
      <h2 className="text-center text-success">👤 My Account</h2>

      <div className="user-details">
        <h4>Name: {user?.name}</h4>
        <p>Email: {user?.email}</p>
        <p>Phone: {user?.phone || "N/A"}</p>
      </div>

      <h3 className="mt-4">📦 Order History</h3>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order, index) => (
            <li key={index}>
              <strong>Order #{order._id}</strong> - ₹{order.totalAmount}
              <br />
              <span>{new Date(order.date).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}

      <button className="btn btn-danger mt-3" onClick={() => localStorage.clear()}>
        Logout
      </button>
    </div>
  );
}
