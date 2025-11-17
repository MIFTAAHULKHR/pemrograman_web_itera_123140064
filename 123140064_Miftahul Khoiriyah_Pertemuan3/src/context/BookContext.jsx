import React, { 
  useState, 
  createContext, 
  useContext, 
  useMemo, 
  useCallback 
} from 'react';

import { useLocalStorage } from '../hooks/useLocalStorage.jsx';

export const BOOK_STATUSES = {
  owned: 'Sudah Dimiliki',
  reading: 'Sedang Dibaca',
  tobuy: 'Ingin Dibeli',
};

const BookContext = createContext(null);

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        if (!filterStatus) return true;
        return book.status === filterStatus;
      })
      .filter((book) => {
        if (!searchTerm) return true;
        const lowerSearch = searchTerm.toLowerCase();
        return (
          book.title.toLowerCase().includes(lowerSearch) ||
          book.author.toLowerCase().includes(lowerSearch)
        );
      });
  }, [books, searchTerm, filterStatus]);

  const addBook = useCallback((bookData) => {
    const newBook = { ...bookData, id: Date.now() };
    setBooks((prevBooks) => [newBook, ...prevBooks]);
  }, [setBooks]);

  const updateBook = useCallback((id, updatedBookData) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, ...updatedBookData } : book
      )
    );
  }, [setBooks]);

  const deleteBook = useCallback((id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  }, [setBooks]);

  const value = {
    allBooks: books,
    filteredBooks,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    addBook,
    updateBook,
    deleteBook,
    BOOK_STATUSES,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
}