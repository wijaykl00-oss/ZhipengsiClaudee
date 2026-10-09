import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldCheck,
  Lock,
  RefreshCw,
  Activity,
  Server,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { cn } from './lib/utils';
import backgroundVideo from '../foto/Background1.mp4';

export default function MaintenancePage() {
  const [isChecking, setIsChecking] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleRefresh = () => {
    if (isChecking) return;
    setIsChecking(true);
    setStatusMessage('正在检测服务器节点与核验状态 / Checking server status...');

    setTimeout(() => {
      setIsChecking(false);
      setStatusMessage('当前状态：维护与行政合规核验进行中 (Status: Maintenance in progress)');
      setTimeout(() => {
        setStatusMessage(null);
      }, 4000);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#070913] text-white overflow-hidden selection:bg-purple-500/30 font-sans">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Glow ambient spots */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] mix-blend-screen" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-700/10 rounded-full blur-[160px] mix-blend-screen" />

        {/* Background video overlay if available */}
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-screen"
          src={backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Vignette & radial gradient */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#070913]/70 to-[#070913]" />
      </div>

      {/* Centered Modal / Card */}
      <div className="relative z-10 w-full max-w-2xl bg-[#0d1222]/85 backdrop-blur-2xl rounded-3xl border border-white/10 p-6 sm:p-10 md:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.8),0_0_60px_rgba(88,28,135,0.15)] text-center flex flex-col items-center">
        
        {/* Warning Icon Box with Lock Badge */}
        <div className="relative mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-[#1c2340] to-[#0e1428] border border-purple-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.35)]">
            <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 stroke-[2.2]" />
          </div>
          {/* Small Lock Badge */}
          <div className="absolute -bottom-1 -right-1 bg-[#090e1c] border border-purple-500/60 p-1.5 rounded-full text-purple-300 shadow-md">
            <Lock className="w-3.5 h-3.5 text-purple-300" />
          </div>
        </div>

        {/* Pill Notice Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-200 text-xs sm:text-sm font-medium tracking-wide shadow-[0_0_20px_rgba(168,85,247,0.2)] mb-6">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>官方维护与验证公告 / Official Status Notice</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 leading-tight">
          Website Temporary{' '}
          <span className="block sm:inline bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text text-transparent">
            Unavailable
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-amber-300/95 font-medium text-xs sm:text-sm md:text-base tracking-wide mb-6">
          Under Scheduled Maintenance / Administrative Verification
        </p>

        {/* Description */}
        <div className="max-w-xl mx-auto space-y-2 mb-8">
          <p className="text-slate-300/90 text-xs sm:text-sm leading-relaxed font-normal">
            为了提升系统安全与服务稳定性，平台当前正在进行预定的系统维护与行政合规核验。所有用户数据及交易记录均已进行安全加密保存，服务将于核验完成后自动恢复正常运行。
          </p>
          <p className="text-slate-400/80 text-[11px] sm:text-xs leading-relaxed">
            To ensure optimal security and administrative compliance, the platform is currently undergoing scheduled verification. All data and account states remain protected. Normal service will resume automatically once completed.
          </p>
        </div>

        {/* 3 Status / Assurance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 w-full mb-8">
          {/* Card 1 */}
          <div className="bg-[#12182b]/80 border border-white/5 hover:border-white/10 rounded-2xl p-4 text-left backdrop-blur-sm transition-all duration-300">
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide">
                数据安全保障
              </span>
            </div>
            <p className="text-slate-400 text-[11px] sm:text-xs leading-relaxed">
              全站数据与用户资产受多层加密防护，安全不受影响。
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#12182b]/80 border border-white/5 hover:border-white/10 rounded-2xl p-4 text-left backdrop-blur-sm transition-all duration-300">
            <div className="flex items-center gap-2 mb-1.5">
              <Server className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="text-sky-400 text-xs sm:text-sm font-semibold tracking-wide">
                系统状态同步
              </span>
            </div>
            <p className="text-slate-400 text-[11px] sm:text-xs leading-relaxed">
              核心节点进行健康检查与配置优化，确保高可用性。
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#12182b]/80 border border-white/5 hover:border-white/10 rounded-2xl p-4 text-left backdrop-blur-sm transition-all duration-300">
            <div className="flex items-center gap-2 mb-1.5">
              <Clock className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="text-purple-400 text-xs sm:text-sm font-semibold tracking-wide">
                自动恢复服务
              </span>
            </div>
            <p className="text-slate-400 text-[11px] sm:text-xs leading-relaxed">
              维护核验完成后，系统将无缝恢复所有产品及下单通道。
            </p>
          </div>
        </div>

        {/* Status notification toast (interactive feedback) */}
        {statusMessage && (
          <div className="w-full mb-5 px-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-200 text-xs flex items-center justify-center gap-2 animate-fadeIn transition-all">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Bottom Actions Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full pt-2 border-t border-white/5">
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isChecking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-95 text-white font-medium text-xs sm:text-sm shadow-lg shadow-purple-600/30 transition-all duration-200 disabled:opacity-70 cursor-pointer"
          >
            <RefreshCw className={cn("w-4 h-4", isChecking && "animate-spin")} />
            <span>刷新检查状态 / Refresh Status</span>
          </button>

          {/* Monitoring Status Badge */}
          <div className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#101528] border border-white/10 text-[11px] sm:text-xs text-slate-300 shadow-inner">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse shrink-0" />
            <span>Monitoring Server & Admin Check: Active</span>
          </div>
        </div>

      </div>

      {/* Footer copyright note */}
      <div className="absolute bottom-3 text-center text-slate-500 text-[11px] pointer-events-none">
        &copy; {new Date().getFullYear()} Official Verification System &bull; All Rights Reserved
      </div>
    </div>
  );
}
