import React from "react";
import PropTypes from "prop-types";
import "./Movies.css";
import { Link } from "react-router-dom";
import Card from "../Card/Card";

function Movies({ movies }) {
  if (!movies || movies.length === 0) {
    return <div>Loading movies...</div>;
  }

  const movieCards = movies.map(movie => {
    return (
      <Link className="movie-card-link" key={movie.id} to={`/movies/${movie.id}`}>
        <Card
          id={movie.id}
          key={movie.id}
          title={movie.title}
          poster={movie.poster_path}
          rating={Number(movie.average_rating).toFixed(1)}
          release={movie.release_date}
        />
      </Link>
    );
  });

  return (
    <div className="movies-container">
      {movieCards}
    </div>
  );
}

Movies.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string.isRequired,
      average_rating: PropTypes.number.isRequired,
      release_date: PropTypes.string.isRequired
    })
  )
};

export default Movies;