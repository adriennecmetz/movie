import React, { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();

    const apiKey = "f37a3761";
    const url = `https://www.omdbapi.com/?s=${search}&apikey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.Search) {
        setResults(data.Search);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search for a movie"
        />
        <button type="submit">Search</button>
      </form>

      {results.map((result) => (
        <div key={result.imdbID}>
          <h2>{result.Title}</h2>
          <img src={result.Poster} alt={result.Title} />
        </div>
      ))}
    </div>
  );
}

export default App;
