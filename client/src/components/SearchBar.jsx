
import { useEffect, useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Wait 500ms before performing the search
    const delaySearch = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    // Clear the previous timeout when input changes
    return () => {
      clearTimeout(delaySearch);
    };
  }, [searchTerm, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search books by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm && (
        <button
          type="button"
          onClick={() => setSearchTerm("")}
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchBar;
