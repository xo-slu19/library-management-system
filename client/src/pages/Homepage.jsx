
import { useState } from "react";
import BookGrid from "../components/BookGrid";
import SearchBar from "../components/SearchBar";

function HomePage() {
  const [search, setSearch] = useState("");
  const [genreId, setGenreId] = useState("");

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Library Management System</h1>
        <p>Discover and explore books in our library collection.</p>
      </header>

      <section className="catalog-controls">
        {/* Search books by title or author */}
        <SearchBar onSearch={setSearch} />

        {/* Filter books by genre */}
        <div className="genre-filter">
          <label htmlFor="genre">Filter by Genre:</label>

          <select
            id="genre"
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
          >
            <option value="">All Genres</option>
            <option value="1">Fiction</option>
            <option value="2">Non-Fiction</option>
            <option value="3">Science</option>
            <option value="4">Technology</option>
            <option value="5">History</option>
            <option value="6">Fantasy</option>
            <option value="7">Romance</option>
          </select>
        </div>
      </section>

      {/* Display filtered and searched books */}
      <BookGrid
        search={search}
        genreId={genreId}
      />
    </div>
  );
}

export default HomePage;
