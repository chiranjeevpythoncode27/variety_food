import React, { useEffect } from "react";
import Card from "../components/Card";

export default function FoodList({ foodCat, foodItems, searchQuery }) {
  useEffect(() => {
    console.log("Food Categories:", foodCat);
    console.log("Food Items:", foodItems);
  }, [foodCat, foodItems]);

  return (
    <div className="container mt-4">
      {foodCat.length > 0 ? (
        foodCat.map((category) => (
          <div key={category._id} className="my-4">
            {/* 🎨 Styled Food Category Name */}
            {searchQuery === "" && <h2
              className="category-title text-center p-2 mb-3"
              style={{
                backgroundColor: "#FF4500",
                color: "white",
                borderRadius: "10px",
                fontSize: "22px",
                fontWeight: "bold",
                textTransform: "uppercase",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                width: "60%",
                margin: "auto",
              }}
            >
              {category?.CategoryName}
            </h2>}

            {/* 🛒 Food Items Row */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {foodItems
                ?.filter((item) => item?.CategoryName === category?.CategoryName)
                ?.map((item) => <Card key={item._id} item={item} />)}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center fs-4 text-muted">Loading categories...</p>
      )}
    </div>
  );
}
