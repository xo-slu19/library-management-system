
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function BookDetail() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError("");

        const apiUrl = import.meta.env.VITE_API_URL;

        const response = await fetch(`${apiUrl}/books/${id}`);

        if (!response.ok) {
          throw new Error("Book not found or failed to load.");
        }

        const data = await response.json();

        setBook(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-message">
        <h2>Loading book details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <h2>Unable to load book</h2>
        <p>{error}</p>

        <Link to="/">Back to Library</Link>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="empty-message">
        <h2>Book not found</h2>
        <Link to="/">Back to Library</Link>
      </div>
    );
  }

  return (
    <div className="book-detail-page">
      <Link to="/" className="back-link">
        ← Back to Library
      </Link>

      <div className="book-detail">
        <div className="detail-cover">
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={book.title}
            />
          ) : (
            <div className="book-placeholder">
              <span>📚</span>
              <p>No Cover Available</p>
            </div>
          )}
        </div>

        <div className="detail-info">
          <h1>{book.title}</h1>

          <p><strong>Author:</strong> {book.author}</p>

          <p>
            <strong>Genre:</strong>{" "}
            {typeof book.genre === "object"
              ? book.genre?.name
              : book.genre || "Not specified"}
          </p>

          <p>
            <strong>ISBN:</strong> {book.isbn || "Not available"}
          </p>

          <p>
            <strong>Publisher:</strong>{" "}
            {book.publisher || "Not specified"}
          </p>

          <p>
            <strong>Publication Year:</strong>{" "}
            {book.publishedYear || "Not specified"}
          </p>

          <p>
            <strong>Available Copies:</strong>{" "}
            {book.availableCopies ?? "Not specified"}
          </p>

          <div className="book-description">
            <h3>Description</h3>
            <p>
              {book.description || "No description available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
