import React from 'react';
import { ShieldCheck, Clock, RefreshCw, AlertCircle, Lock, Server } from 'lucide-react';

/**
 * =========================================================================
 *  MODE MAINTENANCE AKTIF (TEMPORARY MAINTENANCE / ADMINISTRATIVE VERIFICATION)
 * =========================================================================
 * 
 * CATATAN UNTUK DEVELOPER / ADMIN:
 * - Komponen & routing asli telah diamankan di: `src/App.backup.tsx`
 * - Database, schema backend, dan env tidak diubah sama sekali.
 * - Untuk menonaktifkan mode maintenance & kembali ke website normal:
 *   Ganti file ini kembali ke `src/App.backup.tsx` atau ekspor `AppBackup` dari file tersebut.
 */

// import AppOriginal from './App.backup'; // Uncomment jika ingin restore langsung

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 font-sans relative overflow-hidden">
      {/* Background Decorative Ambient Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-amber-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-24 right-10 w-96 h-96 bg-blue-500/5 blur-3xl pointer-events-none -z-10" />

      {/* Header Bar */}
      <header className="w-full max-w-5xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Server className="w-4 h-4" />
          </div>
          <span className="text-sm font-semibold tracking-wider text-slate-300 uppercase">System Status</span>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>Under Maintenance</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Icon Badge */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-amber-400/5 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/5">
                <AlertCircle className="w-10 h-10 text-amber-400" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-950 flex items-center justify-center text-amber-400">
                <Lock className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Core Announcement Message */}
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-md">
              Notice / Pemberitahuan
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-snug sm:leading-tight">
              Website Temporary Unavailable
            </h1>

            <p className="text-base sm:text-lg text-amber-200/90 font-medium max-w-xl mx-auto">
              Under Scheduled Maintenance / Administrative Verification
            </p>

            <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto leading-relaxed pt-2">
              Layanan kami saat ini sedang dalam proses pemeliharaan berkala dan verifikasi administrasi untuk meningkatkan stabilitas sistem serta keamanan platform.
            </p>
          </div>

          {/* Information & Security Assurances */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 text-sm font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Data & Keamanan Terjaga</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Seluruh data transaksi dan akun tetap aman terlindungi selama proses penyesuaian administratif berlangsung.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm space-y-2">
              <div className="flex items-center space-x-2 text-blue-400 text-sm font-semibold">
                <Clock className="w-4 h-4" />
                <span>Estimasi Pemulihan</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sistem akan segera kembali beroperasi normal setelah verifikasi selesai dilakukan oleh tim kami.
              </p>
            </div>
          </div>

          {/* Action / Refresh Button */}
          <div className="pt-2">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 active:scale-95 text-slate-200 hover:text-white border border-slate-700/70 text-sm font-medium transition-all duration-150 cursor-pointer shadow-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Cek Status / Muat Ulang Halaman</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-6 py-6 border-t border-slate-800/80 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} System Administration. All services will be restored automatically.</p>
      </footer>
    </div>
  );
}
