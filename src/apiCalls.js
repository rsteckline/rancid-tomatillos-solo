const getAllMovies = () => {
  return fetch("https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          throw new Error("Oopsie! Nothing to see here!");
        } else if (response.status >= 500) {
          throw new Error("Oopsie! Something went wrong, please try again later.");
        } else {
          throw new Error(`Unexpected error. Status: ${response.status}`);
        }
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        return { movies: data };
      }
      if (data && data.movies) {
        return data;
      }
      throw new Error("Invalid data format received");
    })
    .catch(error => {
      throw error;
    });
};

const getSelectedMovie = (id) => {
  return fetch(`https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          throw new Error("Oopsie! Nothing to see here!");
        } else if (response.status >= 500) {
          throw new Error("Oopsie! Something went wrong, please try again later.");
        } else {
          throw new Error(`Unexpected error. Status: ${response.status}`);
        }
      }
      return response.json();
    })
    .then(data => {
      if (data && data.movie) {
        return data;
      }
      if (data && data.id) {
        return { movie: data };
      }
      throw new Error("Invalid movie data format received");
    });
};

export { getAllMovies, getSelectedMovie };