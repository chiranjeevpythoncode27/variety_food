import React, { createContext, useContext, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import Cart from "./components/screens/Cart";
import Navbar from "./components/Navbar";
import SpinGame from "./components/SpinGame"; // 🎰 Spin & Win Page
import Myaccount from "./components/screens/Myaccount";

import { CartProvider } from "./components/ContextReducer";
import MyOrders from "./components/screens/Myorders";


// ✅ Create Theme Context for Dark Mode
const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <CartProvider>
        <Router>
          <div className={`app-container ${darkMode ? "dark-mode" : "light-mode"}`}>
            <ConditionalNavbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

            {/* Page Animations */}
            <div className="page-transition">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/createuser" element={<Signup />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/spin" element={<SpinGame />} />
                <Route path="/orders" element={<MyOrders />} />
                <Route path="/account" element={<Myaccount />} />
              </Routes>
            </div>
          </div>
        </Router>
      </CartProvider>
    </ThemeContext.Provider>
  );
}

// ✅ Function to conditionally render Navbar with Dark Mode Toggle
function ConditionalNavbar({ toggleDarkMode, darkMode }) {
  const location = useLocation();
  const showNavbar = ["/", "/cart", "/spin"].includes(location.pathname);

  return showNavbar ? <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} /> : null;
}

export default App;
