import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { BookProvider } from './context/BookContext.jsx';

function MainApp() {
  const location = useLocation();
  const page = location.pathname;

  return (
    <div className="app-container">
      <header>
        <nav className="navbar">
          <div className="nav-brand">Manajer Buku Pribadi</div>
          <div className="nav-links">
            <Link
              to="/"
              className={page === '/' ? 'nav-link active' : 'nav-link'}
            >
              Beranda
            </Link>
            <Link
              to="/stats"
              className={page === '/stats' ? 'nav-link active' : 'nav-link'}
            >
              Statistik
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BookProvider>
      <MainApp />
    </BookProvider>
  );
}
