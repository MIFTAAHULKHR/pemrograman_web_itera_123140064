import React from 'react';
import { useBooks } from '../context/BookContext.jsx';
import BookItem from './BookItem.jsx';

export default function BookList() {
  const { filteredBooks } = useBooks();

  if (filteredBooks.length === 0) {
    return (
      <div className="book-list-empty">
        <p>Tidak ada buku yang ditemukan.</p>
        <p>Coba tambahkan buku baru atau ubah filter Anda.</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {filteredBooks.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
}