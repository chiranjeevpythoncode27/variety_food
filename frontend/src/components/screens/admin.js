import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://variety-food.onrender.com/api/admin/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`https://variety-food.onrender.com/api/admin/orders/${id}`, { status });
      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`https://variety-food.onrender.com/api/admin/orders/${id}`);
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.customer}</td>
              <td>{order.items.map((item) => `${item.name} x${item.quantity}`).join(", ")}</td>
              <td>₹{order.total}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="form-select"
                >
                  <option value="Pending">Pending</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteOrder(order._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
