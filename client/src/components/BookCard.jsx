
import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <div className="book-card">
      <div className="book-cover">
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

      <div className="book-info">
        <h3>{book.title}</h3>

        <p className="book-author">
          By {book.author}
        </p>

        {book.genre && (
          <p className="book-genre">
            {typeof book.genre === "object"
              ? book.genre.name
              : book.genre}
          </p>
        )}

        <Link
          to={`/books/${book.id}`}
          className="view-book-btn"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default BookCard;
