import React, { useState } from 'react';
import { useBooks } from '../context/BookContext.jsx';
import Modal from './Modal.jsx';
import BookForm from './BookForm.jsx';

export default function BookItem({ book }) {
  const { deleteBook, BOOK_STATUSES } = useBooks();
  const [isEditing, setIsEditing] = useState(false);

  const getStatusClass = (status) => {
    return `status-badge status-${status}`; // misal: status-owned
  };

  return (
    <>
      <div className="book-item">
        <div className="book-info">
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
        <div className="book-actions">
          <span className={getStatusClass(book.status)}>
            {BOOK_STATUSES[book.status] || '...'}
          </span>
          <button onClick={() => setIsEditing(true)} className="btn-edit">
            Edit
          </button>
          <button onClick={() => deleteBook(book.id)} className="btn-delete">
            Hapus
          </button>
        </div>
      </div>
      
      {isEditing && (
        <Modal onClose={() => setIsEditing(false)}>
          <BookForm bookToEdit={book} onClose={() => setIsEditing(false)} />
        </Modal>
      )}
    </>
  );
}