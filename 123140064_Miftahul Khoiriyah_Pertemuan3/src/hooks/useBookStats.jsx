import { useMemo } from 'react';

export function useBookStats(books) {
  const stats = useMemo(() => {
    if (!books || books.length === 0) {
      return { total: 0, owned: 0, reading: 0, tobuy: 0 };
    }
    return {
      total: books.length,
      owned: books.filter((b) => b.status === 'owned').length,
      reading: books.filter((b) => b.status === 'reading').length,
      tobuy: books.filter((b) => b.status === 'tobuy').length,
    };
  }, [books]);

  return stats;
}