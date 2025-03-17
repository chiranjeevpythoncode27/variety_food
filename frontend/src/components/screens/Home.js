import React, { useEffect, useState } from "react";
import Carousel from "../Carousal";
import Footer from "../Footer";
import FoodList from "../FoodList";
import { FaArrowUp } from "react-icons/fa"; // Import arrow icon
import "./home.css";

export default function Home() {
    const [foodCat, setFoodCat] = useState([]); 
    const [foodItems, setFoodItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [showBackToTop, setShowBackToTop] = useState(false); // State for Back to Top button

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch("https://variety-food.onrender.com//api/foodData");

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setFoodCat(data?.foodCategories ?? []);
                setFoodItems(data?.foodItems ?? []);
            } catch (err) {
                console.error("Failed to fetch data:", err.message);
                setError(err.message);
            } finally {
                setIsLoaded(true);
            }
        };

        loadData();
    }, []);

    // Show Back to Top button when scrolling down
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Function to scroll to the top
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const filteredItems = foodItems?.filter((item) =>
        item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <div style={{ backgroundColor: "#fffacd", minHeight: "100vh", paddingBottom: "20px" }}>
            {/* ✅ Show "Welcome to Variety" Only During Loading */}
            {!isLoaded ? (
                <div className="loading-container">
                    <h1 className="welcome-text">🎉 Welcome to Variety Sweets & Restaurant 🎉</h1>
                    <div className="loading-spinner"></div>
                </div>
            ) : error ? (
                <h2 style={{ color: "red", textAlign: "center" }}>Error: {error}</h2>
            ) : (
                <>
                    <Carousel setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
                    <FoodList foodCat={foodCat} foodItems={filteredItems} searchQuery={searchQuery} />
                    <Footer />
                </>
            )}

            {/* 🔼 Back to Top Button */}
            {showBackToTop && (
                <button className="back-to-top" onClick={scrollToTop}>
                    <FaArrowUp />
                </button>
            )}
        </div>
    );
}
