import React from 'react'

const BookCard = ({book}) => {
    const {title, authors, first_publish_year } = book;

return(
    <div>
        <h3>{title}</h3>
        <p>Author(s): {authors && authors.map((author) => author.name).join(', ')}</p>
        <p>First Published: {first_publish_year}</p>
    </div>
);
};


export default BookCard;