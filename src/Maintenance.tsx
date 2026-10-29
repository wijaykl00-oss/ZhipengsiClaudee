import React, { useState } from 'react';
import {
  AlertTriangle,
  Lock,
  ShieldCheck,
  Server,
  Clock,
  RefreshCw,
  Activity,
  CheckCircle2
} from 'lucide-react';

interface MaintenanceProps {
  onAdminBypass?: () => void;
}

export default function Maintenance({ onAdminBypass }: MaintenanceProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null);
  const [adminClickCount, setAdminClickCount] = useState(0);

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setRefreshMessage('正在连接验证服务器检测状态...');

    setTimeout(() => {
      setIsRefreshing(false);
      setRefreshMessage('系统当前仍处于计划维护与合规核验阶段，服务将在核验完成后即时恢复。');
      setTimeout(() => {
        setRefreshMessage(null);
      }, 5000);
    }, 1200);
  };

  const handleSecretClick = () => {
    const next = adminClickCount + 1;
    setAdminClickCount(next);
    if (next >= 5) {
      if (onAdminBypass) {
        onAdminBypass();
      }
      setAdminClickCount(0);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden bg-[#070814] text-white selection:bg-purple-500/30">
      {/* Cosmic background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft cosmic glow blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] bg-gradient-to-tr from-purple-700/15 via-blue-600/15 to-indigo-500/10 rounded-full blur-[130px] opacity-70" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-600/15 rounded-full blur-[100px] opacity-60" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-[100px] opacity-60" />
        {/* Star dust / subtle radial mask */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#070814]/60 to-[#070814]" />
      </div>

      {/* Main Glass Card */}
      <div className="relative z-10 w-full max-w-3xl rounded-[28px] sm:rounded-[36px] bg-[#0d0f22]/85 border border-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.8),0_0_50px_rgba(147,51,234,0.15)] p-6 sm:p-10 md:p-12 text-center transition-all duration-300">
        
        {/* Top Warning & Lock Badge */}
        <div className="flex justify-center mb-6">
          <div 
            onClick={handleSecretClick}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-[#271f4c]/90 to-[#141229]/95 border border-purple-500/35 flex items-center justify-center relative shadow-[0_0_35px_rgba(168,85,247,0.3)] transition-transform hover:scale-105 select-none cursor-pointer"
            title="System Security Node"
          >
            <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
            
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0a0a18] border border-white/20 flex items-center justify-center absolute -bottom-1.5 -right-1.5 shadow-md">
              <Lock className="w-3 h-3 text-slate-300" />
            </div>
          </div>
        </div>

        {/* Official Status Notice Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-200 text-xs sm:text-sm font-medium mb-6 shadow-[0_0_15px_rgba(168,85,247,0.15)] backdrop-blur-md">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>官方维护与验证公告 / Official Status Notice</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-2">
          <span className="text-white block sm:inline">Website Temporary </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 drop-shadow-[0_0_20px_rgba(168,85,247,0.45)]">
            Unavailable
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-amber-400/95 font-semibold text-sm sm:text-base md:text-lg mb-6 tracking-wide">
          Under Scheduled Maintenance / Administrative Verification
        </p>

        {/* Explanatory Paragraph */}
        <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8 font-light italic">
          为了提升系统安全与服务稳定性，平台当前正在进行预定的系统维护与行政合规核验。所有用户数据及交易记录均已进行安全加密保存，服务将于核验完成后自动恢复正常运行。
        </p>

        {/* 3 Assurance / System Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-8 text-left">
          {/* Card 1: Data Security */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4.5 hover:bg-white/[0.05] hover:border-purple-500/30 transition-all duration-200">
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-emerald-400">数据安全保障</span>
            </div>
            <p className="text-xs text-slate-300/80 leading-relaxed">
              全站数据与用户资产受多层加密防护，安全不受影响。
            </p>
          </div>

          {/* Card 2: System Status Sync */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4.5 hover:bg-white/[0.05] hover:border-sky-500/30 transition-all duration-200">
            <div className="flex items-center gap-2 mb-1.5">
              <Server className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-sky-400">系统状态同步</span>
            </div>
            <p className="text-xs text-slate-300/80 leading-relaxed">
              核心节点进行健康检查与配置优化，确保高可用性。
            </p>
          </div>

          {/* Card 3: Auto Recovery */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4.5 hover:bg-white/[0.05] hover:border-purple-500/30 transition-all duration-200">
            <div className="flex items-center gap-2 mb-1.5">
              <Clock className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-purple-400">自动恢复服务</span>
            </div>
            <p className="text-xs text-slate-300/80 leading-relaxed">
              维护核验完成后，系统将无缝恢复所有产品及下单通道。
            </p>
          </div>
        </div>

        {/* Action Button & Active Indicator */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-500 hover:via-purple-600 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 transition-all active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? '正在检查...' : '刷新检查状态 / Refresh Status'}</span>
          </button>

          <div className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-slate-300 font-medium">
            <Activity className="w-4 h-4 text-emerald-400" />
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs sm:text-sm text-slate-300">
                Monitoring Server & Admin Check: <strong className="text-emerald-400 font-semibold">Active</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Status notification prompt */}
        {refreshMessage && (
          <div className="mt-4 p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 animate-in fade-in duration-200 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
            <span>{refreshMessage}</span>
          </div>
        )}

      </div>
    </div>
  );
}
