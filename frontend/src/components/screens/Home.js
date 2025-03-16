import React, { useEffect, useState } from "react";
import Carousel from "../Carousal";
import Footer from "../Footer";
import FoodList from "../FoodList";
import "./home.css";

export default function Home() {
    const [foodCat, setFoodCat] = useState([]); 
    const [foodItems, setFoodItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

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

    const filteredItems = foodItems?.filter((item) =>
        item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <div style={{ backgroundColor: "#fffacd", minHeight: "100vh", paddingBottom: "20px" }}>
            { !isLoaded ? (
                <h1>Loading items...</h1>
            ) : error ? (
                <h2 style={{ color: "red", textAlign: "center" }}>Error: {error}</h2>
            ) : (
                <>
                    <Carousel setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
                    <FoodList foodCat={foodCat} foodItems={filteredItems} searchQuery={searchQuery} />
                    <Footer />
                </>
            )}
        </div>
    );
}
