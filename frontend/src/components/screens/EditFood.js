import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EditFood() {
    const { id } = useParams();
    const [food, setFood] = useState({ name: "", category: "", price: "", description: "" });

    useEffect(() => {
        fetch(`http://https://variety-food.onrender.com//api/foodData`)
            .then((res) => res.json())
            .then((data) => {
                const foundFood = data.foodItems.find((item) => item._id === id);
                if (foundFood) setFood(foundFood);
            })
            .catch((error) => console.error("Error fetching food data:", error));
    }, [id]);

    const handleChange = (e) => {
        setFood({...food, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://https://variety-food.onrender.com//api/food/update/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(food),
            });
            const data = await res.json();
            alert(data.message || "Food item updated successfully!");
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    return ( <
        div className = "container" >
        <
        h2 > Edit Food Item < /h2> <
        form onSubmit = { handleSubmit } >
        <
        input type = "text"
        name = "name"
        value = { food.name }
        onChange = { handleChange }
        placeholder = "Name"
        className = "form-control"
        required /
        >
        <
        input type = "text"
        name = "category"
        value = { food.category }
        onChange = { handleChange }
        placeholder = "Category"
        className = "form-control"
        required /
        >
        <
        input type = "number"
        name = "price"
        value = { food.price }
        onChange = { handleChange }
        placeholder = "Price"
        className = "form-control"
        required /
        >
        <
        textarea name = "description"
        value = { food.description }
        onChange = { handleChange }
        placeholder = "Description"
        className = "form-control"
        required /
        >
        <
        button type = "submit"
        className = "btn btn-primary" > Update < /button> < /
        form > <
        /div>
    );
}