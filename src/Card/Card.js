import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

function Card({ poster, title, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img
        className="movie-poster"
        src={poster}
        alt={`Movie Poster for ${title}`}
      />
      <div className="movie-title-overlay">
        <h3>{title}</h3>
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  release: PropTypes.string.isRequired
};

export default Card;