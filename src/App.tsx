import React from 'react';
import MaintenancePage from './MaintenancePage';
// Kode asli aplikasi tersimpan dan diamankan di App.backup.tsx
import OriginalApp from './App.backup';

/**
 * =======================================================================
 * MODE PEMELIHARAAN / MAINTENANCE MODE
 * =======================================================================
 * Status: AKTIF (true)
 * 
 * Cara mengembalikan website ke normal:
 * Ubah 'MAINTENANCE_MODE = false' atau kembalikan isi file dari 'src/App.backup.tsx'.
 * Seluruh kode asli, state, komponen, dan fungsionalitas tersimpan utuh di:
 * -> src/App.backup.tsx
 * =======================================================================
 */
export const MAINTENANCE_MODE = true;

export default function App() {
  if (MAINTENANCE_MODE) {
    return <MaintenancePage />;
  }

  return <OriginalApp />;
}
