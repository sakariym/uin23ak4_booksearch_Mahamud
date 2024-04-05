import React, { useState, useEffect } from 'react';

import BookCard from './bookcard';


const SearchResults = () => {
    const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
        try{
            const response = await fetch(`http://openlibrary.org/subjects/james_bond.json?limit=5`);
            const data = await response.json();
            setBooks(data.works);

            } catch (error) {
                console.error('Error finding books:', error);
            }
        };

        fetchBooks();

    }, []);

    return (
        <div>
            <h2>James Bond Bøker</h2>
            <div>
            {books.map((book) => (
                <BookCard key={book.key} book={book} />
            ))}
            </div>
        </div>
    );
};

export default SearchResults;