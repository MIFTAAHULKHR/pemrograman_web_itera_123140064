import React, { useState } from 'react';
// Impor 'otak' kita
import { useBooks } from '../context/BookContext.jsx';

export default function BookForm({ bookToEdit, onClose }) {
  const { addBook, updateBook, BOOK_STATUSES } = useBooks();
  
  const [formData, setFormData] = useState({
    title: bookToEdit?.title || '',
    author: bookToEdit?.author || '',
    status: bookToEdit?.status || 'owned',
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Judul tidak boleh kosong';
    if (!formData.author.trim()) newErrors.author = 'Penulis tidak boleh kosong';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (bookToEdit) {
      updateBook(bookToEdit.id, formData);
    } else {
      addBook(formData);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h3>{bookToEdit ? 'Edit Buku' : 'Tambah Buku Baru'}</h3>
      <div className="form-group">
        <label htmlFor="title">Judul</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p className="error-text">{errors.title}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="author">Penulis</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
        {errors.author && <p className="error-text">{errors.author}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          {Object.entries(BOOK_STATUSES).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onClose}>
          Batal
        </button>
        <button type="submit" className="btn-primary">
          Simpan
        </button>
      </div>
    </form>
  );
}