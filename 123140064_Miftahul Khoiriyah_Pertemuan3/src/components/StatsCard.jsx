import React from 'react';

export default function StatsCard({ title, value }) {
  return (
    <div className="stats-card">
      <p>{title}</p>
      <span>{value}</span>
    </div>
  );
}