import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'; 

const { mockBooks, mockSetBooks } = vi.hoisted(() => {
  return {
    mockBooks: [
      { id: 1, title: 'Buku A', author: 'Penulis A', status: 'owned' },
      { id: 2, title: 'Buku B', author: 'Penulis B', status: 'owned' },
      { id: 3, title: 'Buku C', author: 'Penulis C', status: 'reading' },
    ],
    mockSetBooks: vi.fn()
  };
});

vi.mock('./hooks/useLocalStorage.jsx', () => ({
  useLocalStorage: () => [
    mockBooks,
    mockSetBooks
  ]
}));

import * as BookContext from './context/BookContext.jsx';
import BookFilter from './components/BookFilter.jsx';
import BookForm from './components/BookForm.jsx';
import StatsPage from './pages/StatsPage.jsx';


// =================================================================
// TES 1 & 2: Menguji Komponen BookFilter
// =================================================================
describe('BookFilter Component', () => {
  beforeEach(() => {
    vi.spyOn(BookContext, 'useBooks').mockReturnValue({
      searchTerm: '',
      setSearchTerm: vi.fn(),
      filterStatus: '',
      setFilterStatus: vi.fn(),
      BOOK_STATUSES: { owned: 'Dimiliki', reading: 'Dibaca', tobuy: 'Dibeli' }
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // TES 1: Memastikan komponen render dengan benar
  it('seharusnya merender input pencarian dan filter status', () => {
    render(
      <BookContext.BookProvider>
        <BookFilter />
      </BookContext.BookProvider>
    );

    expect(screen.getByPlaceholderText('Cari (Judul/Penulis)...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument(); 
  });

  // TES 2: Memastikan interaksi pengguna (mengetik) berfungsi
  it('seharusnya memperbarui nilai input saat pengguna mengetik', async () => {
    const user = userEvent.setup();
    const mockSetSearchTerm = vi.fn();

    vi.spyOn(BookContext, 'useBooks').mockReturnValue({
      searchTerm: '',
      setSearchTerm: mockSetSearchTerm, 
      filterStatus: '',
      setFilterStatus: vi.fn(),
      BOOK_STATUSES: { owned: 'Dimiliki', reading: 'Dibaca', tobuy: 'Dibeli' }
    });

    render(
      <BookContext.BookProvider>
        <BookFilter />
      </BookContext.BookProvider>
    );

    const searchInput = screen.getByPlaceholderText('Cari (Judul/Penulis)...');
    await user.type(searchInput, 'Bumi');
    
    expect(mockSetSearchTerm).toHaveBeenCalledWith('B');
    expect(mockSetSearchTerm).toHaveBeenCalledWith('u');
    expect(mockSetSearchTerm).toHaveBeenCalledWith('m');
    expect(mockSetSearchTerm).toHaveBeenCalledWith('i');
  });
});

// =================================================================
// TES 3 & 4: Menguji Komponen BookForm
// =================================================================
describe('BookForm Component', () => {

  beforeEach(() => {
    vi.spyOn(BookContext, 'useBooks').mockReturnValue({
      addBook: vi.fn(),
      updateBook: vi.fn(),
      BOOK_STATUSES: { owned: 'Dimiliki', reading: 'Dibaca', tobuy: 'Dibeli' }
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // TES 3: Memastikan validasi error handling berfungsi
  it('seharusnya menampilkan error jika judul dan penulis kosong', async () => {
    const user = userEvent.setup();
    const mockOnClose = vi.fn(); 

    render(
      <BookForm onClose={mockOnClose} />
    );

    const saveButton = screen.getByRole('button', { name: /simpan/i });
    await user.click(saveButton);

    expect(screen.getByText('Judul tidak boleh kosong')).toBeInTheDocument();
    expect(screen.getByText('Penulis tidak boleh kosong')).toBeInTheDocument();
    expect(mockOnClose).not.toHaveBeenCalled();
  });


  // TES 4: Memastikan submit form yang sukses
  it('seharusnya memanggil addBook dan onClose saat submit valid', async () => {
    const user = userEvent.setup();
    const mockAddBook = vi.fn();
    const mockOnClose = vi.fn();

    vi.spyOn(BookContext, 'useBooks').mockReturnValue({
      addBook: mockAddBook, 
      updateBook: vi.fn(),
      BOOK_STATUSES: { owned: 'Dimiliki', reading: 'Dibaca', tobuy: 'Dibeli' }
    });

    render(
      <BookForm onClose={mockOnClose} />
    );

    await user.type(screen.getByLabelText(/judul/i), 'Laskar Pelangi');
    await user.type(screen.getByLabelText(/penulis/i), 'Andrea Hirata');
    await user.click(screen.getByRole('button', { name: /simpan/i }));

    expect(mockAddBook).toHaveBeenCalledTimes(1);
    expect(mockAddBook).toHaveBeenCalledWith({
      title: 'Laskar Pelangi',
      author: 'Andrea Hirata',
      status: 'owned' 
    });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});

// =================================================================
// TES 5: Menguji Halaman StatsPage
// =================================================================

describe('StatsPage Component', () => {

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // TES 5: Memastikan statistik dihitung dengan benar
  it('seharusnya menampilkan statistik yang benar dari data context', () => {
    render(
      <BookContext.BookProvider>
        <StatsPage />
      </BookContext.BookProvider>
    );

    expect(screen.getByText('Total Buku').nextSibling.textContent).toBe('3');
    expect(screen.getByText('Sudah Dimiliki').nextSibling.textContent).toBe('2');
    expect(screen.getByText('Sedang Dibaca').nextSibling.textContent).toBe('1');
    expect(screen.getByText('Ingin Dibeli').nextSibling.textContent).toBe('0');
  });
});