import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Clock,
  RefreshCw,
  Activity,
  CheckCircle2,
  Mail,
  AlertCircle,
  Cpu,
  Lock
} from 'lucide-react';

export default function Maintenance() {
  const [lastChecked, setLastChecked] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    updateTime();
  }, []);

  const updateTime = () => {
    const now = new Date();
    setLastChecked(
      now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      })
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    updateTime();
    setTimeout(() => {
      setIsRefreshing(false);
      window.location.reload();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0a0c16] text-white flex flex-col justify-between selection:bg-purple-500/30 relative overflow-hidden font-sans">
      {/* Background ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/15 rounded-full blur-[140px]"></div>
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-60"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full border-b border-white/10 bg-[#0a0c16]/70 backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 border border-white/10 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/5">
              <Cpu className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white">
                Nexus <span className="text-purple-400">open-AI</span>
              </span>
              <CheckCircle2 className="w-4 h-4 text-blue-500 ml-1" />
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            MAINTENANCE ACTIVE
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 lg:px-8 py-12 lg:py-16 flex-1 flex items-center justify-center">
        <div className="max-w-3xl w-full">
          {/* Card Container */}
          <div className="relative rounded-3xl bg-[#111424]/85 border border-white/10 p-8 sm:p-12 lg:p-14 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.6)] text-center">
            {/* Top Glowing Icon Badge */}
            <div className="mx-auto mb-8 w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 via-purple-500/20 to-blue-500/20 border border-amber-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.2)]">
              <ShieldAlert className="w-10 h-10 text-amber-400 animate-pulse" />
            </div>

            {/* Primary Status Badges */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium tracking-wide mb-6">
              <Lock className="w-3.5 h-3.5 text-purple-400" />
              Administrative System Verification
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Website Temporary Unavailable
            </h1>

            {/* Exact Required Sub-message */}
            <p className="text-lg sm:text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-300 to-purple-300 mb-6">
              Under Scheduled Maintenance / Administrative Verification
            </p>

            {/* Detailed Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-10 text-slate-300/90 font-light">
              We are currently performing routine administrative verification and essential system
              maintenance to enhance platform security, stability, and service quality.
              Access to storefront features, purchasing, and account services are temporarily paused.
            </p>

            {/* Status Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1.5">
                  <Activity className="w-4 h-4 text-purple-400" />
                  System State
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  Verification in Progress
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1.5">
                  <Clock className="w-4 h-4 text-blue-400" />
                  Estimated Duration
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  Temporary / Ongoing
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  Data Security
                </div>
                <div className="text-sm font-semibold text-emerald-400">
                  100% Safe & Intact
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-medium text-sm transition-all duration-200 shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Checking Status...' : 'Check Again / Refresh'}
              </button>

              <a
                href="mailto:support@nexus-ai.com"
                className="w-full sm:w-auto px-8 py-3.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl font-medium text-sm transition-all duration-200 border border-white/10 backdrop-blur-md flex items-center justify-center gap-2 hover:border-white/20"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                Contact Administration
              </a>
            </div>

            {/* Last checked indicator */}
            {lastChecked && (
              <p className="text-xs text-slate-500 mt-8">
                Last checked at {lastChecked} • Auto-verification enabled
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-white/5 bg-[#0a0c16]/50 py-6 text-center text-xs text-slate-500">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Nexus open-AI. All rights reserved.</p>
          <p className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Server Infrastructure Healthy
          </p>
        </div>
      </footer>
    </div>
  );
}
