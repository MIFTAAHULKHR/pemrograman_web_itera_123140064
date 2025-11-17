import React from 'react';
import { useBooks } from '../context/BookContext.jsx';
import { useBookStats } from '../hooks/useBookStats.jsx';
import StatsCard from '../components/StatsCard.jsx';

// ---- Penjelasan Impor ----
// '../context/BookContext.jsx' -> Naik satu (ke src) lalu masuk context
// '../hooks/useBookStats.jsx' -> Naik satu (ke src) lalu masuk hooks
// '../components/StatsCard.jsx' -> Naik satu (ke src) lalu masuk components

export default function StatsPage() {
  const { allBooks } = useBooks();
  const stats = useBookStats(allBooks); // Gunakan hook statistik kita

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Statistik</h1>
      </div>
      <div className="stats-grid">
        <StatsCard title="Total Buku" value={stats.total} />
        <StatsCard title="Sudah Dimiliki" value={stats.owned} />
        <StatsCard title="Sedang Dibaca" value={stats.reading} />
        <StatsCard title="Ingin Dibeli" value={stats.tobuy} />
      </div>
    </div>
  );
}