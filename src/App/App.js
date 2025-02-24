import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import NotFound from "../NotFound/NotFound";
import Movies from "../Movies/Movies";
import MovieDetail from "../MovieDetail/MovieDetail";
import { Routes, Route } from "react-router-dom";
import { getAllMovies } from "../apiCalls";
import "../Fonts/Fonts.css";
import { Link } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        if (data && data.movies) {
          setMovies(data.movies);
          setError(null);
        } else {
          throw new Error("Invalid data format received");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <main className="App">
      <header>
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <div className="logo">
            <img src="/tomatillo-icon.png" alt="Tomatillo Logo" />
          </div>
          <div className="header-title">
            <h1>Rancid Tomatillos</h1>
          </div>
        </Link>
      </header>
      {error && <div className="error-message">{error}</div>}
      <Routes>
        <Route
          path="/"
          element={<Movies movies={movies} />}
        />
        <Route
          path="/movies/:id"
          element={<MovieDetail />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;