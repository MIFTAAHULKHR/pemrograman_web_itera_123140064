import React, { useState } from 'react';
import BookFilter from '../components/BookFilter.jsx';
import BookList from '../components/BookList.jsx';
import BookForm from '../components/BookForm.jsx';
import Modal from '../components/Modal.jsx';

// ---- Penjelasan Impor ----
// '../components/BookFilter.jsx'
// Kita ada di: src/pages/
// Kita 'naik satu' (../) ke src/
// Lalu 'masuk' ke components/
// Lalu 'pilih' filenya.

export default function HomePage() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Koleksi Bukuku</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
        >
          + Tambah Buku Baru
        </button>
      </div>

      <BookFilter />
      <BookList />

      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
          <BookForm onClose={() => setShowAddModal(false)} />
        </Modal>
      )}
    </div>
  );
}