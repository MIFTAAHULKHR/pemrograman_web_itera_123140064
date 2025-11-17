import React from 'react';
import { useBooks } from '../context/BookContext.jsx';

export default function BookFilter() {
  const {
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    BOOK_STATUSES,
  } = useBooks();

  return (
    <div className="book-filter">
      <input
        type="text"
        placeholder="Cari (Judul/Penulis)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="filter-search"
      />
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="filter-status"
      >
        <option value="">Semua Status</option>
        {Object.entries(BOOK_STATUSES).map(([key, value]) => (
          <option key={key} value={key}>{value}</option>
        ))}
      </select>
    </div>
  );
}