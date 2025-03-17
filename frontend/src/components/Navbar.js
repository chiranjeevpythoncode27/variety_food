import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./ContextReducer";
import "./Carousel.css";
import "./Navbar.css";

export default function Navbar() {
  const isLoggedIn = localStorage.getItem("authToken");
  const isAdmin = localStorage.getItem("isAdmin") === "true"; 
  const cart = useCart();
  const cartItemCount = cart.length;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAdmin"); 
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg sexy-navbar">
      <div className="container-fluid">
        {/* Logo Image Instead of 'Variety' Text */}
        <Link className="navbar-brand fs-1" to="/">
          <img 
            src="https://i.ibb.co/Ps0frrDP/Whats-App-Image-2025-03-14-at-22-23-30.jpg"  
            alt="Logo" 
            className="nav-logo"
          />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <Link className="nav-link sexy-link" to="/">Home</Link>
          </div>

          <div className="ms-auto">
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <Link className="btn sexy-btn" to="/additem">
                    ➕ Add Items
                  </Link>
                )}

                <Link className="btn sexy-btn" to="/orders">
                  📦 My Orders
                </Link>

                <Link className="btn sexy-btn position-relative" to="/cart">
                  🛒 My Cart
                  {cartItemCount > 0 && (
                    <span className="cart-badge">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

    

                <button className="btn logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="btn sexy-btn" to="/login">Login</Link>
                <Link className="btn sexy-btn" to="/createuser">SignUp</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
  
}

