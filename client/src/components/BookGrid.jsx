
import { useEffect, useState } from "react";
import BookCard from "./BookCard";

function BookGrid({ search, genreId }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("title");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        if (genreId) {
          params.append("genreId", genreId);
        }

        if (search) {
          params.append("search", search);
        }

        const apiUrl = import.meta.env.VITE_API_URL;
        const queryString = params.toString();

        const response = await fetch(
          `${apiUrl}/books${queryString ? `?${queryString}` : ""}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books. Please try again.");
        }

        const data = await response.json();

        setBooks(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [search, genreId]);

  const sortedBooks = [...books].sort((a, b) => {
    const valueA = String(a[sortBy] || "").toLowerCase();
    const valueB = String(b[sortBy] || "").toLowerCase();

    return valueA.localeCompare(valueB);
  });

  if (loading) {
    return (
      <div className="book-grid">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div className="skeleton-card" key={item}>
            <div className="skeleton-image"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  if (sortedBooks.length === 0) {
    return (
      <div className="empty-message">
        <h2>No books found</h2>
        <p>Try another search term or select a different genre.</p>
      </div>
    );
  }

  return (
    <section className="books-section">
      <div className="books-toolbar">
        <h2>Available Books ({sortedBooks.length})</h2>

        <div className="sort-control">
          <label htmlFor="sort">Sort by:</label>

          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>
        </div>
      </div>

      <div className="book-grid">
        {sortedBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}

export default BookGrid;
