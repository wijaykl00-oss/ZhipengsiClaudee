/**
 * =========================================================================
 * ⚠️ MODE MAINTENANCE SEMENTARA (ADMINISTRATIVE VERIFICATION)
 * =========================================================================
 * Kode asli halaman utama dan routing telah dicadangkan secara aman di:
 * -> src/App.original.tsx
 *
 * Untuk menonaktifkan mode maintenance dan kembali ke website normal:
 * 1. Ubah variabel MAINTENANCE_MODE di bawah menjadi `false`, ATAU
 * 2. Restore file `src/App.original.tsx` kembali menjadi `src/App.tsx`.
 *
 * Admin bypass sementara juga dapat diakses melalui parameter URL:
 * - /?preview=true  atau  /?admin=true
 * =========================================================================
 */

import React, { useState, useEffect } from 'react';
import MaintenancePage from './MaintenancePage';

// Import backup halaman utama asli (kode asli 100% aman dan tidak dihapus)
import OriginalApp from './App.original';

// Ganti ke `false` jika ingin langsung mematikan mode maintenance
const MAINTENANCE_MODE = true;

export default function App() {
  const [isAdminPreview, setIsAdminPreview] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('preview') === 'true' || params.get('admin') === 'true';
    }
    return false;
  });

  // Jika maintenance mode dimatikan atau admin mengaktifkan preview bypass
  if (!MAINTENANCE_MODE || isAdminPreview) {
    return <OriginalApp />;
  }

  // Tampilkan halaman maintenance di halaman utama (/)
  return <MaintenancePage onAdminUnlock={() => setIsAdminPreview(true)} />;
}
