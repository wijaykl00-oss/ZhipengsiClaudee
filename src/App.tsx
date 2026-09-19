import React from 'react';
import {
  Bot,
  CheckCircle2,
  ShieldCheck,
  Clock,
  RefreshCw,
  AlertTriangle,
  Lock,
  Server,
  Activity,
  Zap
} from 'lucide-react';
import backgroundVideo from '../foto/Background1.mp4';

/**
 * =========================================================================
 *  MODE MAINTENANCE AKTIF (TEMPORARY MAINTENANCE / ADMINISTRATIVE VERIFICATION)
 * =========================================================================
 * 
 * CATATAN UNTUK DEVELOPER / ADMIN:
 * - Komponen & routing asli tersimpan aman di: `src/App.backup.tsx`
 * - Database, schema backend, dan env tidak diubah sama sekali.
 * - Desain maintenance ini disesuaikan persis dengan tema & estetika Nexus open-AI sebelumnya.
 */

// import AppOriginal from './App.backup'; // Uncomment jika ingin restore langsung

export default function App() {
  return (
    <div className="min-h-screen bg-[#0c0e1a] text-white flex flex-col justify-between selection:bg-purple-500/30 font-sans relative overflow-hidden">
      {/* Background Animated Video & Ambient Glowing Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/15 rounded-full blur-[140px] mix-blend-screen opacity-60 transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[120px] mix-blend-screen opacity-60 transform -translate-x-1/4 translate-y-1/4" />
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
          src={backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e1a] via-[#0c0e1a]/70 to-[#0c0e1a]/40" />
      </div>

      {/* Navbar (Same branding as original website) */}
      <nav className="relative z-20 w-full bg-slate-900/40 backdrop-blur-xl border-b border-white/10 py-4 lg:py-5">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 select-none">
            <div className="w-10 h-10 bg-slate-900 border border-white/10 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.25)]">
              <Bot className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">
              Nexus open-AI
            </span>
            <CheckCircle2 className="w-5 h-5 text-blue-400 fill-white/10 ml-0.5" />
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.15)]">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>系统维护 / System Maintenance</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero / Main Maintenance Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-12 lg:py-16">
        <div className="max-w-3xl w-full">
          {/* Main Card with Original Glassmorphic Aesthetic */}
          <div className="relative bg-slate-900/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Ambient inner glow */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center space-y-6">
              {/* Badge Icon */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-purple-600/30 via-slate-800 to-indigo-600/20 border border-purple-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.35)]">
                    <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400" />
                  </div>
                  <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-slate-900 border-2 border-slate-950 flex items-center justify-center text-purple-400 shadow-md">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Tag Notice */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-300 text-xs sm:text-sm font-medium border border-purple-500/20 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>官方维护与验证公告 / Official Status Notice</span>
              </div>

              {/* Main Headline with Original Glowing Text Style */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight sm:leading-tight">
                  <span className="text-glow-white block sm:inline">Website Temporary </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 text-glow-color">
                    Unavailable
                  </span>
                </h1>

                <p className="text-base sm:text-xl font-semibold text-amber-300/95 tracking-wide">
                  Under Scheduled Maintenance / Administrative Verification
                </p>
              </div>

              {/* Description with Aesthetic font and gentle float */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed aesthetic-desc">
                为了提升系统安全与服务稳定性，平台当前正在进行预定的系统维护与行政合规核验。所有用户数据及交易记录均已进行安全加密保存，服务将于核验完成后自动恢复正常运行。
              </p>

              {/* Highlights / Security Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 text-left">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-purple-500/30 transition-colors">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold mb-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>数据安全保障</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    全站数据与用户资产受多层加密防护，安全不受影响。
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-purple-500/30 transition-colors">
                  <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold mb-1.5">
                    <Server className="w-4 h-4" />
                    <span>系统状态同步</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    核心节点进行健康检查与配置优化，确保高可用性。
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-purple-500/30 transition-colors">
                  <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold mb-1.5">
                    <Clock className="w-4 h-4" />
                    <span>自动恢复服务</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    维护核验完成后，系统将无缝恢复所有产品及下单通道。
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="w-full sm:w-auto px-7 py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 cursor-pointer text-sm"
                >
                  <RefreshCw className="w-4 h-4 animate-spin-slow" />
                  <span>刷新检查状态 / Refresh Status</span>
                </button>

                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400">
                  <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>Monitoring Server & Admin Check: Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer (Same Nexus open-AI footer style) */}
      <footer className="relative z-10 w-full border-t border-white/10 bg-slate-950/80 backdrop-blur-xl py-6 text-center text-xs text-slate-500">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <Zap className="w-4 h-4 text-purple-400" />
            <span>Nexus open-AI Administrative & Maintenance System</span>
          </div>
          <p>© {new Date().getFullYear()} Nexus open-AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
