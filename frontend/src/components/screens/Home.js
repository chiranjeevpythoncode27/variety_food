import React, { useEffect, useState } from "react";
import Carousel from "../Carousal";
import Footer from "../Footer";
import FoodList from "../FoodList";
import { FaArrowUp } from "react-icons/fa";
import "./home.css";

export default function Home() {
    const [foodCat, setFoodCat] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch("https://variety-food.onrender.com/api/foodData");

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

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const filteredItems = foodItems?.filter((item) =>
        item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <div style={{ backgroundColor: "#fffacd", minHeight: "100vh", paddingBottom: "20px" }}>
            {/* ✅ Show Loading Spinner with Logo Instead of Text */}
            {!isLoaded ? (
                <div className="loading-container">
                    <img 
                        src="https://i.postimg.cc/02DXQszV/Whats-App-Image-2025-03-18-at-14-40-25-1.jpg" 
                        alt="Variety Sweets Logo"
                        className="loading-logo"
                    />
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
