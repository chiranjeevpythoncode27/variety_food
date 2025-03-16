import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Carousel.css"; // Import custom styling

export default function Carousel({ setSearchQuery,searchQuery }) {
  console.log('searchQuery',searchQuery);
  return (
    <div className="carousel-container position-relative">
      {/* 🔍 Search Bar with Button */}
      <div className="search-wrapper">
        <input
          type="text"
          className="form-control search-bar"
          placeholder="Search for food..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button">Search</button>
      </div>

      {/* Carousel */}
    { searchQuery==="" && <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade custom-carousel"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://i.postimg.cc/CK52V4DZ/Home.png"
              alt="First slide" className="d-block w-100" />
          </div>

          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/id/922783734/photo/assorted-indian-recipes-food-various.jpg?s=612x612&w=0&k=20&c=p8DepvymWfC5j7c6En2UsQ6sUM794SQMwceeBW3yQ9M="
              className="d-block w-100 carousel-img"
              alt="Second slide"
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://static.toiimg.com/photo/94078477.cms"
              className="d-block w-100 carousel-img"
              alt="Third slide"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>} 
    </div>
  );
}
