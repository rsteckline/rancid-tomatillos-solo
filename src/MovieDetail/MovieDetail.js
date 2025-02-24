import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSelectedMovie } from "../apiCalls";
import "./MovieDetail.css";

function MovieDetail() {
  const { id } = useParams();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      getSelectedMovie(id)
        .then((data) => {
          if (!data || !data.movie) {
            throw new Error("Movie data not found");
          }
          setSelectedMovie(data.movie);
          setError(null);
        })
        .catch((error) => {
          console.error("Error fetching movie:", error);
          setError(error.message);
        });
    }
  }, [id]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!selectedMovie) {
    return <div>Loading movie details...</div>;
  }

  const formattedDate = selectedMovie.release_date
    ? new Date(selectedMovie.release_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    : '';

  const movieYear = selectedMovie.release_date
    ? `(${new Date(selectedMovie.release_date).getFullYear()})`
    : "";

  const genres = selectedMovie.genres ? selectedMovie.genres.join(", ") : "";
  const runtime = selectedMovie.runtime ? `${selectedMovie.runtime} mins` : "";
  const genreAndRuntime = [genres, runtime].filter(Boolean).join(" • ");

  return (
    <div
      className="movie-detail show-selected"
      style={{
        backgroundImage: `url(${selectedMovie.backdrop_path})`
      }}
    >
      <div className="left-side">
        <img
          className="poster"
          src={selectedMovie.poster_path}
          alt={`Movie poster for ${selectedMovie.title}`}
        />
      </div>
      <div className="right-side">
        <h3>{selectedMovie.title} {movieYear}</h3>
        <h2>{selectedMovie.tagline || ""}</h2>
        {genreAndRuntime && <p>{genreAndRuntime}</p>}
        {selectedMovie.overview && (
          <div className="synopsis-container">
            <h1>Synopsis</h1>
            <p>{selectedMovie.overview}</p>
          </div>
        )}
        <p>Release Date: {formattedDate}</p>
      </div>
    </div>
  );
}

export default MovieDetail;