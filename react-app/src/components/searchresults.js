import React, { useState, useEffect } from 'react';
import BookCard from './bookcard';
import '../css/main.css';

const SearchResults = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      let url = 'https://openlibrary.org/subjects/james_bond.json?limit=10';
      if (searchQuery.length >= 3 && isSearching) {
        url = `https://openlibrary.org/search.json?title=${searchQuery}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setBooks(data.works || data.docs);
    };

    fetchBooks();
  }, [searchQuery, isSearching]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length >= 3) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  return (
    <div>
      <div className="search-bar-container">
        <input
          id="search-bar"
          type="text"
          placeholder="Enter Search terms"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button id="search-button">Search</button>
      </div>
      <div className="book-list-container">
        <h2>{isSearching ? 'Search Results' : 'James Bond Books'}</h2>
        <div>
          {books.map((book) => (
            <div className="book-card" key={book.key || book.id}>
              <BookCard book={book} />
              <a
                href={`https://www.amazon.com/s?k=${book.amazon_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Search on Amazon
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;