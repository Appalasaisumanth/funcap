import React from "react";
import "./starRating.css"; // Add custom styles here

const StarRating = ({ rating }) => {
  const fullStar = "★"; // Full star
  const halfStar = "⭒"; // Half or fractional star
  const emptyStar = "☆"; // Empty star

  // Generate the stars based on the rating
  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<span key={i} className="star full">{fullStar}</span>);
      } else if (rating > i - 1 && rating < i) {
        stars.push(<span key={i} className="star half">{halfStar}</span>);
      } else {
        stars.push(<span key={i} className="star empty">{emptyStar}</span>);
      }
    }
    return stars;
  };

  return <div className="stars">{renderStars()}</div>;
};

export default StarRating;
