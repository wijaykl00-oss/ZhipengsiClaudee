import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldCheck,
  Server,
  Clock,
  RefreshCw,
  Lock,
  Activity,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import backgroundVideo from '../foto/Background1.mp4';
import backgroundImg from '../foto/Background.png';

interface MaintenancePageProps {
  onAdminUnlock?: () => void;
}

export default function MaintenancePage({ onAdminUnlock }: MaintenancePageProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [checkMessage, setCheckMessage] = useState<string | null>(null);
  const [secretClicks, setSecretClicks] = useState(0);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [adminError, setAdminError] = useState('');

  const handleRefreshStatus = () => {
    setIsChecking(true);
    setCheckMessage(null);

    setTimeout(() => {
      setIsChecking(false);
      setCheckMessage('核心节点正常运行。行政合规与系统维护核验仍在进行中，暂未对外开放 / Core nodes operational. Administrative verification in progress.');
      
      // Auto clear message after 6 seconds
      setTimeout(() => {
        setCheckMessage(null);
      }, 6000);
    }, 1200);
  };

  const handleLockClick = () => {
    const next = secretClicks + 1;
    setSecretClicks(next);
    if (next >= 3) {
      setShowAdminPrompt(true);
      setSecretClicks(0);
    }
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPass === 'admin888' || adminPass === 'superadmin' || adminPass === 'admin') {
      if (onAdminUnlock) {
        onAdminUnlock();
      } else {
        window.location.search = '?preview=true';
      }
    } else {
      setAdminError('密码不正确 / Incorrect bypass key');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-[#070913] text-slate-100 font-sans select-none">
      {/* Background Video / Static Fallback with Cosmic Gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-35 scale-105 filter blur-[0.5px]"
          poster={backgroundImg}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-radial from-transparent via-[#070913]/70 to-[#070913] mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090b17]/80 via-transparent to-[#070913]" />

        {/* Subtle decorative glowing cosmic lights */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 right-1/4 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Main Glassmorphic Notice Card */}
      <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-[#0f1424]/85 backdrop-blur-2xl border border-slate-700/50 shadow-[0_20px_70px_rgba(0,0,0,0.65)] p-6 sm:p-10 text-center transition-all duration-300 hover:border-slate-600/70">
        
        {/* Glow ambient around card header */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-20 bg-amber-500/10 blur-2xl rounded-full pointer-events-none" />

        {/* Warning Icon with lock badge */}
        <div className="flex justify-center mb-5">
          <div
            onClick={handleLockClick}
            title="Security Verification Active"
            className="group relative cursor-pointer p-4 rounded-2xl bg-gradient-to-b from-amber-500/15 via-purple-500/10 to-indigo-950/40 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-transform duration-200 active:scale-95"
          >
            <AlertTriangle className="w-10 h-10 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
            <div className="absolute -bottom-1 -right-1 bg-[#0b0e1b] border border-slate-700 rounded-full p-1 shadow-md">
              <Lock className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300 transition-colors" />
            </div>
          </div>
        </div>

        {/* Official Status Notice Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-medium tracking-wide mb-6 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>官方维护与验证公告 / Official Status Notice</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 leading-tight">
          Website Temporary <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-indigo-200 to-purple-400 drop-shadow-[0_0_15px_rgba(192,132,252,0.4)]">Unavailable</span>
        </h1>

        {/* Subtitle */}
        <h2 className="text-amber-300 font-semibold text-sm sm:text-base tracking-wide mb-5">
          Under Scheduled Maintenance / Administrative Verification
        </h2>

        {/* Detailed Explanation */}
        <div className="space-y-2 mb-8 max-w-xl mx-auto">
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">
            为了提升系统安全与服务稳定性，平台当前正在进行预定的系统维护与行政合规核验。所有用户数据及交易记录均已进行安全加密保存，服务将于核验完成后自动恢复正常运行。
          </p>
          <p className="text-slate-400/80 text-[11px] sm:text-xs leading-relaxed">
            In order to enhance platform security and regulatory compliance, scheduled maintenance and administrative verification are currently underway. All data is safely preserved. Services will resume automatically upon completion.
          </p>
        </div>

        {/* 3 Status / Guarantee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-8 text-left">
          {/* Card 1 */}
          <div className="bg-[#141b30]/70 border border-slate-700/50 rounded-2xl p-4 transition-all duration-200 hover:bg-[#18213b]/80 hover:border-emerald-500/30">
            <div className="flex items-center gap-2 mb-2 text-emerald-400 font-semibold text-xs sm:text-sm">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>数据安全保障</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              全站数据与用户资产受多层加密防护，安全不受影响。
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#141b30]/70 border border-slate-700/50 rounded-2xl p-4 transition-all duration-200 hover:bg-[#18213b]/80 hover:border-sky-500/30">
            <div className="flex items-center gap-2 mb-2 text-sky-400 font-semibold text-xs sm:text-sm">
              <Server className="w-4 h-4 shrink-0" />
              <span>系统状态同步</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              核心节点进行健康检查与配置优化，确保高可用性。
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#141b30]/70 border border-slate-700/50 rounded-2xl p-4 transition-all duration-200 hover:bg-[#18213b]/80 hover:border-purple-500/30">
            <div className="flex items-center gap-2 mb-2 text-purple-400 font-semibold text-xs sm:text-sm">
              <Clock className="w-4 h-4 shrink-0" />
              <span>自动恢复服务</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              维护核验完成后，系统将无缝恢复所有产品及下单通道。
            </p>
          </div>
        </div>

        {/* Check notification banner if clicked */}
        {checkMessage && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-purple-950/50 border border-purple-500/40 text-purple-200 text-xs flex items-center justify-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
            <span>{checkMessage}</span>
          </div>
        )}

        {/* Bottom Actions Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
          {/* Refresh Button */}
          <button
            onClick={handleRefreshStatus}
            disabled={isChecking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-95 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-purple-600/30 transition-all cursor-pointer disabled:opacity-75 disabled:cursor-wait"
          >
            <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
            <span>{isChecking ? '正在检查状态... / Checking...' : '刷新检查状态 / Refresh Status'}</span>
          </button>

          {/* Status Indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141b30]/80 border border-slate-700/60 text-slate-300 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-300 font-medium">Monitoring Server & Admin Check: <span className="text-emerald-400 font-bold">Active</span></span>
          </div>
        </div>

      </div>

      {/* Secret Admin Verification Modal */}
      {showAdminPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-purple-500/40 p-6 shadow-2xl text-left">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                <Lock className="w-4 h-4" />
                <span>管理员通道 / Admin Bypass</span>
              </div>
              <button
                onClick={() => setShowAdminPrompt(false)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-300 text-xs mb-4">
              输入验证密钥以临时预览完整网站或进入管理后台：
            </p>
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <input
                type="password"
                value={adminPass}
                onChange={(e) => {
                  setAdminPass(e.target.value);
                  setAdminError('');
                }}
                placeholder="验证密钥 / Password"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500"
                autoFocus
              />
              {adminError && (
                <p className="text-rose-400 text-xs font-medium">{adminError}</p>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdminPrompt(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md cursor-pointer"
                >
                  确认进入
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer copyright note */}
      <div className="absolute bottom-3 text-center text-slate-500 text-[11px] tracking-wider">
        Official Status System &copy; {new Date().getFullYear()} &bull; Administrative Protection Protocol
      </div>
    </div>
  );
}
