import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://variety-food-front-end.onrender.com/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
    } else {
      alert("Invalid Credentials. Try Again!");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">🔐 Login to Variety</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" className="login-input" name="email" value={credentials.email} onChange={onChange} />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" className="login-input" name="password" value={credentials.password} onChange={onChange} />
          </div>

          <button type="submit" className="btn neon-btn">Login</button>
          <Link to="/createuser" className="btn ghost-btn">Create Account</Link>
        </form>
      </div>
    </div>
  );
}
