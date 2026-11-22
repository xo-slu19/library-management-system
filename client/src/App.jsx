
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import BookDetail from "./pages/BookDetail";

function App() {
  return (
    <Routes>
      {/* Home page - displays all books */}
      <Route path="/" element={<HomePage />} />

      {/* Book details page - displays one selected book */}
      <Route path="/books/:id" element={<BookDetail />} />
    </Routes>
  );
}

export default App;
