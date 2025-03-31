const init = () => {
    // Fetch movies from db.json and display them
    fetchMovies();
  
    // Handle search form submission
    const searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent page reload
      searchMovieByID();
    });
  };
  
  // Fetch movies and display in the list
  const fetchMovies = () => {
    fetch("http://localhost:3000/movies") // Ensure JSON server is running!
      .then((response) => response.json())
      .then((movies) => displayMovies(movies))
      .catch((error) => console.error("Error fetching movies:", error));
  };
  
  // Display movies in the list
  const displayMovies = (movies) => {
    const moviesList = document.getElementById("moviesList");
    moviesList.innerHTML = ""; // Clear previous content
  
    movies.forEach((movie) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <h3>${movie.title}</h3>
        <div>ID: ${movie.id}</div>
      `;
      moviesList.appendChild(li);
    });
  };
  
  // Search movie by ID and display details
  const searchMovieByID = () => {
    const movieID = document.getElementById("searchByID").value;
  
    if (!movieID) {
      alert("Please enter a movie ID!");
      return;
    }
  
    fetch(`http://localhost:3000/movies/${movieID}`)
      .then((response) => {
        if (!response.ok) throw new Error("Movie not found");
        return response.json();
      })
      .then((movie) => {
        const movieDetails = document.getElementById("movieDetails");
        movieDetails.innerHTML = `
          <h4>${movie.title}</h4>
          <p>${movie.summary || "No summary available."}</p>
        `;
      })
      .catch((error) => {
        console.error("Error fetching movie:", error);
        alert("Movie not found!");
      });
  };
  
  // Run the script when the page loads
  document.addEventListener("DOMContentLoaded", init);
  