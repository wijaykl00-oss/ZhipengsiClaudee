// Trigger redeploy for environment variables update
import React, { useState, useEffect } from 'react';
import { cn } from './lib/utils';
import {
  Bot,
  CheckCircle2,
  ChevronDown,
  Menu,
  X,
  Minus,
  Plus,
  ShieldCheck,
  Zap,
  Clock,
  Send,
  Headphones,
  Star,
  Terminal,
  BrainCircuit,
  MessageSquare,
  Lock,
  Globe2,
  ShoppingCart,
  Upload,
  Activity
} from 'lucide-react';

import { supabase } from './lib/supabase';

import geminiImg from '../foto/gemini.jpg';
import claudeImg from '../foto/claudes.jpeg';
import cursorImg from '../foto/cursor.jpg';
import gptImg from '../foto/gpt.png';
import backgroundImg from '../foto/Background.png';
import qrisImg from '../foto/qriszhangxi.jpeg';
import backgroundpbImg from '../foto/backgroundpb.jpeg';

const products = [
  {
    id: 'gemini-ultra',
    name: 'Gemini Ultra',
    desc: '可邀请5位家庭成员，账号为个人专属',
    price: 180,
    unit: '/月',
    sales: '1,243',
    badge: '热门',
    badgeColor: 'bg-amber-400 text-amber-900',
    icon: <Bot className="w-8 h-8 text-blue-500" />,
    features: [
      '完整访问 Gemini Ultra API',
      '多模态 (文字、图片、音频)',
      '2.5M tokens 上下文窗口'
    ],
    buttonColor: 'bg-blue-500 hover:bg-blue-600',
    image: geminiImg
  },
  {
    id: 'claude-5x',
    name: 'Claude 5 x',
    desc: 'Anthropic Claude 深度思考与推理能力',
    price: 250,
    unit: '/月',
    sales: '2,891',
    badge: '最畅销',
    badgeColor: 'bg-orange-500 text-white',
    icon: <BrainCircuit className="w-8 h-8 text-orange-500" />,
    features: [
      '深度思考模式',
      '20万 tokens 上下文窗口',
      '高级推理与编程'
    ],
    buttonColor: 'bg-orange-500 hover:bg-orange-600',
    image: claudeImg
  },
  {
    id: 'claude-20x',
    name: 'Claude 20 x',
    desc: '面向企业和专业用户的最强 Claude',
    price: 475,
    unit: '/月',
    sales: '678',
    badge: '专业版',
    badgeColor: 'bg-slate-800 text-white',
    icon: <BrainCircuit className="w-8 h-8 text-slate-800" />,
    features: [
      '无限深度思考',
      '50万 tokens 上下文窗口',
      '企业级安全防护'
    ],
    buttonColor: 'bg-slate-900 hover:bg-slate-800',
    image: claudeImg
  },
  {
    id: 'cursor-ultra',
    name: 'Cursor Ultra',
    desc: '无限功能的 AI 代码编辑器，专为开发者打造',
    price: 341,
    unit: '/月',
    sales: '4,572',
    badge: '本周最畅销',
    badgeColor: 'bg-rose-500 text-white',
    icon: <Terminal className="w-8 h-8 text-emerald-500" />,
    features: [
      '无限 AI 代码补全',
      '无限慢速请求',
      '500 次/月快速请求'
    ],
    buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
    highlighted: true,
    image: cursorImg
  },
  {
    id: 'gpt-pro-5x',
    name: 'Gpt Pro 5 x',
    desc: 'OpenAI 旗舰模型，极速响应',
    price: 160,
    unit: '/月',
    sales: '1,102',
    badge: '超值',
    badgeColor: 'bg-purple-500 text-white',
    icon: <MessageSquare className="w-8 h-8 text-purple-600" />,
    features: [
      '无限 GPT-4 & GPT-5 访问',
      '128K tokens 上下文窗口',
      '高级联网与代码执行',
      'DALL·E 3 图像生成',
      '自定义 GPT 商店'
    ],
    buttonColor: 'bg-purple-600 hover:bg-purple-700',
    image: gptImg
  },
  {
    id: 'gpt-pro-20x',
    name: 'Gpt Pro 20 x',
    desc: 'OpenAI 最高权限，适合高频使用者',
    price: 240,
    unit: '/月',
    sales: '430',
    badge: '旗舰',
    badgeColor: 'bg-indigo-600 text-white',
    icon: <MessageSquare className="w-8 h-8 text-indigo-700" />,
    features: [
      '无限 GPT-4 & GPT-5 访问',
      '128K tokens 上下文窗口',
      '高级联网与代码执行',
      'DALL·E 3 图像生成',
      '自定义 GPT 商店'
    ],
    buttonColor: 'bg-indigo-600 hover:bg-indigo-700',
    image: gptImg
  }
];

export type Transaction = {
  id: string;
  name: string;
  product: string;
  qty: number;
  amount: string;
  date: string;
  status: string;
  proof_url?: string;
};

const getTodayDate = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ product: any, quantity: number } | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeView, setActiveView] = useState<'home' | 'transactions' | 'admin'>('home');
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    fetchTransactions();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }, [transactions]);

  const fetchTransactions = async () => {
    if (!supabase) {
      console.warn('Supabase not connected. Using local data only.');
      return;
    }
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setTransactions(data as Transaction[]);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addTransaction = async (trx: Transaction) => {
    setTransactions([trx, ...transactions]);

    if (supabase) {
      try {
        await supabase.from('transactions').insert([{
          id: trx.id,
          name: trx.name,
          product: trx.product,
          qty: trx.qty,
          amount: trx.amount,
          date: trx.date,
          status: trx.status,
          proof_url: trx.proof_url
        }]);
      } catch (err) {
        console.error('Failed to save transaction to database:', err);
      }
    }
  };

  const confirmTransaction = async (id: string) => {
    setTransactions(prev => prev.map(trx => trx.id === id ? { ...trx, status: 'Sukses' } : trx));

    if (supabase) {
      try {
        const { error } = await supabase
          .from('transactions')
          .update({ status: 'Sukses' })
          .eq('id', id);

        if (error) throw error;
      } catch (err) {
        console.error('Failed to update transaction status:', err);
      }
    }
  };

  const [secretCount, setSecretCount] = useState(0);
  const handleSecretClick = () => {
    const newCount = secretCount + 1;
    setSecretCount(newCount);
    if (newCount >= 5) {
      setActiveView('admin');
      setSecretCount(0);
    }
  };

  return (
    <div className="font-sans text-slate-900 bg-white min-h-screen">
      <Navbar
        isScrolled={isScrolled}
        user={username}
        onLoginClick={() => setShowLoginModal(true)}
        onLogoClick={handleSecretClick}
        onViewChange={setActiveView}
        activeView={activeView}
      />

      {activeView === 'home' ? (
        <>
          <Hero />
          <Products onSelectProduct={(product, quantity) => setSelectedProduct({ product, quantity })} />
          <Payment />
          <About />
          <Testimonials />
          <Contact />
        </>
      ) : activeView === 'transactions' ? (
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
          <TransactionsView transactions={transactions} />
        </div>
      ) : (
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
          <AdminView transactions={transactions} confirmTransaction={confirmTransaction} />
        </div>
      )}

      <Footer
        transactionCount={
          transactions.filter(t => {
            const today = getTodayDate();
            const todayOld = new Date().toLocaleDateString('zh-CN');
            return t.date === today || t.date === todayOld;
          }).length
        }
      />

      {selectedProduct && (
        <CheckoutModal
          product={selectedProduct.product}
          initialQuantity={selectedProduct.quantity}
          onClose={() => setSelectedProduct(null)}
          onTransaction={addTransaction}
          username={username}
        />
      )}

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={(name) => {
            setUsername(name);
            setShowLoginModal(false);
          }}
        />
      )}

      <button className="fixed bottom-6 right-6 bg-slate-900 hover:bg-slate-800 text-white rounded-full py-3 px-6 shadow-xl flex items-center gap-2 transition-all hover:scale-105 z-50">
        <Headphones className="w-5 h-5 text-rose-500" />
        <span className="font-medium">Talk with Us</span>
      </button>
    </div>
  );
}

function LoginModal({ onClose, onLogin }: { onClose: () => void, onLogin: (name: string) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && password.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">登录账号</h2>
            <button type="button" onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer">
              <X className="w-6 h-6 text-slate-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">用户名</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入您的用户名"
                className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all"
                autoFocus
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">邮箱</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入您的密码"
                className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg shadow-md hover:shadow-xl hover:shadow-rose-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              继续
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Navbar({
  isScrolled,
  user,
  onLoginClick,
  onLogoClick,
  onViewChange,
  activeView
}: {
  isScrolled: boolean,
  user: string | null,
  onLoginClick: () => void,
  onLogoClick: () => void,
  onViewChange: (view: 'home' | 'transactions' | 'admin') => void,
  activeView: string
}) {
  const [activeMenu, setActiveMenu] = useState('home');

  useEffect(() => {
    if (activeView !== 'home') {
      setActiveMenu('');
    } else if (!activeMenu) {
      setActiveMenu('home');
    }
  }, [activeView]);

  return (
    <nav className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-300",
      isScrolled || activeView !== 'home' ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
    )}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer select-none" onClick={onLogoClick}>
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className={cn("text-xl font-bold transition-colors", isScrolled || activeView !== 'home' ? "text-slate-900" : "text-white")}>
              Zangxhi-Ai
            </span>
            <CheckCircle2 className="w-5 h-5 text-blue-500 fill-white/10 ml-1" />
          </div>

          <div className={cn(
            "flex items-center gap-3 sm:gap-6 lg:gap-8 font-medium transition-colors text-xs sm:text-sm lg:text-base",
            isScrolled || activeView !== 'home' ? "text-slate-600" : "text-white/90"
          )}>
            <button onClick={() => { onViewChange('home'); setActiveMenu('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className={cn("transition-all duration-300 hover:text-blue-500 hover:[text-shadow:0_0_12px_rgba(59,130,246,0.9)]", activeMenu === 'home' && activeView === 'home' ? "text-blue-600 font-bold [text-shadow:0_0_12px_rgba(59,130,246,0.5)]" : "")}>首页</button>
            <a href="#products" onClick={() => { onViewChange('home'); setActiveMenu('products'); }} className={cn("transition-all duration-300 hover:text-blue-500 hover:[text-shadow:0_0_12px_rgba(59,130,246,0.9)]", activeMenu === 'products' && activeView === 'home' ? "text-blue-600 font-bold [text-shadow:0_0_12px_rgba(59,130,246,0.5)]" : "")}>产品</a>
            <a href="#payment" onClick={() => { onViewChange('home'); setActiveMenu('payment'); }} className={cn("transition-all duration-300 hover:text-blue-500 hover:[text-shadow:0_0_12px_rgba(59,130,246,0.9)]", activeMenu === 'payment' && activeView === 'home' ? "text-blue-600 font-bold [text-shadow:0_0_12px_rgba(59,130,246,0.5)]" : "")}>支付</a>
            <a href="#contact" onClick={() => { onViewChange('home'); setActiveMenu('contact'); }} className={cn("transition-all duration-300 hover:text-blue-500 hover:[text-shadow:0_0_12px_rgba(59,130,246,0.9)]", activeMenu === 'contact' && activeView === 'home' ? "text-blue-600 font-bold [text-shadow:0_0_12px_rgba(59,130,246,0.5)]" : "")}>联系</a>
          </div>

          <div className="flex items-center gap-4">
            <button className={cn(
              "hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border text-sm transition-colors",
              isScrolled || activeView !== 'home' ? "border-slate-200 text-slate-700 bg-slate-50" : "border-white/20 text-white bg-white/10"
            )}>
              <Globe2 className="w-4 h-4" /> CN ZH <ChevronDown className="w-4 h-4" />
            </button>
            {user ? (
              <div className={cn("font-medium transition-colors flex items-center gap-2", isScrolled || activeView !== 'home' ? "text-slate-900" : "text-white")}>
                <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                  {user.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:block">{user}</span>
              </div>
            ) : (
              <button type="button" onClick={onLoginClick} className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2.5 rounded-lg font-bold transition-colors cursor-pointer shadow-md">
                登录
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <div className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-[#0c0e1a] text-white selection:bg-rose-500/30">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen opacity-50 transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[100px] mix-blend-screen opacity-50 transform -translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay" style={{ backgroundImage: `url(${backgroundImg})` }}></div>
        {/* Network connections simulation base overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e1a] to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 text-blue-200 text-sm font-medium mb-8 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              可信赖的高级 AI 平台
            </div>
            <h1 className="text-5xl lg:text-[5.5rem] font-bold font-sans tracking-tight leading-[1.1] mb-8">
              以实惠价格
              <br />
              使用 <span className="text-rose-500 drop-shadow-sm">高级 AI</span>
              <br />
              工具
            </h1>
            <p className="text-xl text-slate-300/90 mb-10 max-w-2xl font-light leading-relaxed">
              购买 Gemini Ultra、Claude 5x/20x 和 Cursor Ultra 的访问权限，价格实惠。即时激活，全天候支持。
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a href="#products" className="w-full sm:w-auto px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-medium transition-transform hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25">
                查看套餐 <ChevronDown className="w-5 h-5" />
              </a>
              <a href="#payment" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-all border border-white/10 backdrop-blur-md inline-flex items-center justify-center shadow-lg hover:border-white/20">
                支付方式
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative z-10 bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <div className="space-y-4">
                {products.map((p) => (
                  <div key={p.id} className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center border border-white/5 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-semibold text-lg tracking-wide">{p.name}</span>
                    </div>
                    <span className="font-bold text-xl drop-shadow-sm">¥{p.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative glowing orbs behind cards */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Products({ onSelectProduct }: { onSelectProduct: (product: any, quantity: number) => void }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const getQty = (id: string) => quantities[id] || 1;
  const updateQty = (id: string, delta: number) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) + delta) }));
  };

  return (
    <div id="products" className="py-24 bg-[#0c0e1a]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-sm font-semibold tracking-wide mb-6">
            产品目录
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            选择你的 <span className="text-rose-500">常用 AI 工具</span>
          </h2>
          <p className="text-lg text-slate-300/90 mb-8">
            以实惠价格完整访问高级 AI 工具。所有套餐包含支持和更新。
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium shadow-sm">
            <ShieldCheck className="w-5 h-5" />
            所有产品 30 天退款保证
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <div key={p.id} className={cn(
              "rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer relative flex flex-col group",
              p.highlighted ? "ring-2 ring-rose-500 shadow-lg shadow-rose-500/20" : "border border-white/10 shadow-sm"
            )}
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(21, 24, 43, 0.4), rgba(21, 24, 43, 0.8)), url(${backgroundpbImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
              {/* Badge */}
              <div className={cn(
                "absolute top-0 right-8 -translate-y-1/2 px-4 py-1.5 rounded-full text-sm font-bold shadow-md flex items-center gap-1",
                p.badgeColor
              )}>
                {p.highlighted && <Zap className="w-4 h-4 fill-white" />}
                {p.badge}
              </div>

              <div className="mb-6 aspect-square rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply group-hover:opacity-0 transition-opacity z-10 pointer-events-none"></div>
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 text-white">{p.name}</h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2 h-10">{p.desc}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-white">¥{p.price}</span>
                  <span className="text-slate-400 font-medium">{p.unit}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-300 mb-8 bg-white/5 px-3 py-2 rounded-lg border border-white/10 backdrop-blur-sm">
                  <Clock className="w-4 h-4 text-slate-400" />
                  已售 {p.sales} 件
                </div>

                <ul className="space-y-4 mb-8">
                  {p.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="font-medium text-slate-300">数量</span>
                  <div className="flex items-center justify-between border border-white/10 rounded-full w-24 bg-white/5 p-0.5 backdrop-blur-sm">
                    <button
                      onClick={(e) => { e.stopPropagation(); updateQty(p.id, -1); }}
                      className="w-7 h-7 rounded-full bg-transparent flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold text-white">{getQty(p.id)}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); updateQty(p.id, 1); }}
                      className={cn("w-7 h-7 rounded-full flex items-center justify-center text-white transition-colors", p.buttonColor)}>
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mb-4">
                  <ShieldCheck className="w-4 h-4" /> 30 天退款保证
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); onSelectProduct(p, getQty(p.id)); }}
                  className={cn("w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0", p.buttonColor)}
                >
                  立即购买
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Payment() {
  const [activeTab, setActiveTab] = useState<'alipay' | 'bep20'>('alipay');

  return (
    <div id="payment" className="py-24 bg-[#141624] text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-medium mb-6">
              / 支付方式
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              支付方式
              <br />
              <span className="text-rose-500">简单安全</span>
            </h2>
            <p className="text-lg text-slate-400 mb-10 max-w-lg">
              我们支持支付宝付款，处理快速、安全可靠，扫码即可完成支付。
            </p>

            <div className="space-y-4">
              <div className="bg-[#1c1f33] border border-blue-500/50 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-2xl"></div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-7 h-7 text-white fill-current" viewBox="0 0 24 24"><path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm1.91,15.11a7.485,7.485,0,0,1-3.82,0V16.5H8v-1.6h2.09V13.3H7.5V11.7h2.59V10H7v-1.6h3.09V6.3h1.6V8.4H14.8v1.6H11.69v1.7h2.61V13.3H11.69v1.6H16.5v1.6H13.91Z" /></svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">Alipay 支付宝 <CheckCircle2 className="w-5 h-5 text-blue-400" /></h3>
                    <p className="text-slate-400 text-sm">扫描二维码，安全快速完成支付</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                    <ShieldCheck className="w-3.5 h-3.5" /> 安全认证
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                    <Zap className="w-3.5 h-3.5" /> 即时到账
                  </span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">BEP20 (USDT)</h3>
                    <p className="text-slate-400 text-sm break-all font-mono mt-1">0x36152b220b1b1b3b436124d21847d9f89fba7118</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-5 flex items-start gap-4">
                <Send className="w-6 h-6 text-orange-400 mt-0.5 shrink-0" />
                <p className="text-orange-200 text-sm leading-relaxed">
                  如果无法完成付款，请直接联系下方 Telegram 客服获取帮助。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10">
              <div className="text-center p-4 bg-white/5 rounded-xl border border-white/5">
                <Clock className="w-6 h-6 text-rose-400 mx-auto mb-2" />
                <div className="font-bold text-lg">&lt; 5 分钟</div>
                <div className="text-sm text-slate-400">支付处理</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl border border-white/5">
                <Zap className="w-6 h-6 text-rose-400 mx-auto mb-2" />
                <div className="font-bold text-lg">即时</div>
                <div className="text-sm text-slate-400">账号激活</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl border border-white/5">
                <ShieldCheck className="w-6 h-6 text-rose-400 mx-auto mb-2" />
                <div className="font-bold text-lg">100%</div>
                <div className="text-sm text-slate-400">交易安全</div>
              </div>
            </div>
          </div>

          <div className="bg-[#1c1f33] rounded-3xl p-8 lg:p-12 border border-white/10 shadow-2xl relative min-h-[500px]">
            <div className="bg-[#141624] p-1.5 rounded-full inline-flex w-full mb-10">
              <button onClick={() => setActiveTab('alipay')} className={cn("flex-1 py-3 rounded-full font-medium text-sm transition-all", activeTab === 'alipay' ? "bg-blue-500 text-white shadow-md" : "text-slate-400 hover:text-white")}>
                Alipay
              </button>
              <button onClick={() => setActiveTab('bep20')} className={cn("flex-1 py-3 rounded-full font-medium text-sm transition-all", activeTab === 'bep20' ? "bg-amber-500 text-white shadow-md" : "text-slate-400 hover:text-white")}>
                BEP20
              </button>
            </div>

            {activeTab === 'alipay' && (
              <div className="animate-in fade-in duration-300">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium border border-blue-500/20 mb-4 gap-2">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm1.91,15.11a7.485,7.485,0,0,1-3.82,0V16.5H8v-1.6h2.09V13.3H7.5V11.7h2.59V10H7v-1.6h3.09V6.3h1.6V8.4H14.8v1.6H11.69v1.7h2.61V13.3H11.69v1.6H16.5v1.6H13.91Z" /></svg>
                    支付宝/Qris & bep20
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">扫码付款</h3>
                  <p className="text-slate-400 text-sm">使用支付宝或扫描 QRIS 二维码</p>
                </div>

                <div className="bg-white p-6 rounded-2xl mx-auto w-64 h-64 flex items-center justify-center mb-8 shadow-inner shadow-slate-200/50 relative group">
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 bg-cover bg-center rounded-lg opacity-100 transition-opacity" style={{ backgroundImage: `url(${qrisImg})` }}></div>
                    <div className="absolute inset-0 border-4 border-blue-500/20 rounded-lg pointer-events-none"></div>
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-blue-500 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-blue-500 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-blue-500 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-blue-500 rounded-br-lg"></div>
                  </div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-emerald-200/80 text-sm">如商品与描述不符、损坏或丢失，请联系在线客服申请售后保障。</p>
                </div>
              </div>
            )}

            {activeTab === 'bep20' && (
              <div className="animate-in fade-in duration-300">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center px-4 py-2 bg-amber-500/10 text-amber-500 rounded-full text-sm font-medium border border-amber-500/20 mb-4 gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                    BEP20 Binance
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">通过 BEP20 支付</h3>
                  <p className="text-slate-400 text-sm">联系客服获取钱包地址后转账</p>
                </div>

                <div className="bg-[#2a2b36] border border-white/5 rounded-3xl p-6 mx-auto w-48 h-48 flex flex-col items-center justify-center mb-8 shadow-inner shadow-black/20">
                  <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                  </div>
                  <div className="text-amber-500 font-bold tracking-wider">USDT / BEP20</div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                    <span className="text-slate-400 text-sm">网络</span>
                    <span className="text-amber-500 font-bold text-sm">Binance Smart Chain (BEP20)</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                    <span className="text-slate-400 text-sm">代币</span>
                    <span className="text-white font-bold text-sm">USDT</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Address</span>
                    <span className="text-white font-mono text-xs break-all ml-4">0x36152b220b1b1b3b436124d21847d9f89fba7118</span>
                  </div>
                </div>

                <a href="https://t.me/Zangxhi88" target="_blank" className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/25">
                  <Send className="w-5 h-5" />
                  联系 Telegram 获取地址
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function About() {
  return (
    <div id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-4 bg-rose-50 rounded-[2.5rem] transform -rotate-2 -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800&h=600"
              alt="Programmer working with AI"
              className="rounded-3xl shadow-2xl object-cover w-full h-[500px]"
            />
          </div>
          <div className="order-1 lg:order-2">
            <div className="inline-flex py-1.5 px-4 rounded-full bg-rose-50 text-rose-600 text-sm font-semibold mb-6">
              关于我们
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              可信赖的平台 <br />
              提供 <span className="text-rose-500">高级 AI</span>
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Zangxhi-Ai 是一个以实惠价格提供高级 AI 工具访问权限的平台。我们致力提供最佳服务，即时激活，全天候支持。
            </p>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              凭借超过2年的行业经验，我们已服务数千名来自不同背景的用户——开发者、内容创作者、研究人员及各行业专业人士。
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="text-rose-500 mb-2">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">2,500+</div>
                <div className="text-slate-500">活跃用户</div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="text-rose-500 mb-2">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">6</div>
                <div className="text-slate-500">AI 工具可选</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Testimonials() {
  const reviews = [
    {
      name: "李建国",
      role: "软件开发工程师",
      content: "在这里购买了 Cursor Ultra，价格比官方便宜很多。即时激活，马上就能写代码！",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      name: "王晓燕",
      role: "内容创作者",
      content: "Gemini Ultra 真的很棒！多模态功能帮我同时制作图文内容。强烈推荐！",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      name: "陈志远",
      role: "数据分析师",
      content: "Claude X20 适合企业级使用，非常稳定。上下文窗口大，轻松处理大数据集。",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
    }
  ];

  return (
    <div className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex py-1.5 px-4 rounded-full bg-rose-100 text-rose-600 text-sm font-semibold mb-4">
            用户评价
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            深受 <span className="text-rose-500">数千用户信赖</span>
          </h2>
          <p className="text-lg text-slate-600">
            看看已使用我们服务的用户怎么说。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <img src={r.avatar} alt={r.name} className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900">{r.name}</h4>
                  <span className="text-sm text-slate-500">{r.role}</span>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed">"{r.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Contact() {
  return (
    <div id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-100 to-transparent"></div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="lg:pr-8">
            <div className="inline-flex py-1.5 px-4 rounded-full bg-rose-50 text-rose-600 text-sm font-semibold mb-6">
              联系我们
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              有问题？<br />
              <span className="text-rose-500">联系我们</span>
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              我们的客服团队全天候就绪。可通过右侧表单或以下联系方式直接联系我们。
            </p>

            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 mb-8 flex gap-4">
              <div className="bg-amber-100 p-2 text-amber-600 rounded-lg h-fit">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-amber-900 mb-1">批发优惠</h4>
                <p className="text-amber-700/80 text-sm">大量购买可享批发价，请联系下方客服洽谈。</p>
              </div>
            </div>

            <div className="space-y-6">
              <a href="#" className="flex items-center gap-4 group">
                <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                  <Send className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">电报</h4>
                  <p className="text-rose-500 group-hover:underline">@Zangxhi88</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-4 group">
                <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 4 10 8 10-8" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Email</h4>
                  <p className="text-slate-500 group-hover:underline">support@zangxhi-ai.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer({ transactionCount }: { transactionCount: number }) {
  return (
    <footer className="bg-[#0f111e] pt-24 pb-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            现在就开始使用
            <br />
            <span className="text-rose-500">高级 AI 工具</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            不要错过提升生产力的机会。价格实惠，即时激活。
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="#products" className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold transition-colors inline-flex items-center gap-2 shadow-lg shadow-rose-500/20">
              选择套餐 <ChevronDown className="w-5 h-5 -rotate-90" />
            </a>
            <a href="#" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all border border-white/10 backdrop-blur-sm">
              免费注册
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-t border-white/10 pt-16 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Zangxhi-Ai
              </span>
              <CheckCircle2 className="w-5 h-5 text-blue-500 fill-white/10 ml-1" />
            </div>
            <p className="text-slate-400 mb-6 max-w-sm leading-relaxed">
              可信赖的高级 AI 工具访问平台。价格实惠，即时激活，全天候支持。
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">产品</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Gemini Ultra</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Claude 5x</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Claude 20x</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Cursor Ultra</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Gpt Pro</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">支付方式</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Alipay</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">WeChat Pay</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Crypto (USDT)</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Transfer Bank</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">帮助</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">教程</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">联系我们</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">服务条款</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">隐私政策</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center text-slate-500 border-t border-white/5 pt-8 relative">
          <p>© 2026 Zangxhi-Ai. All rights reserved.</p>
          <div className="absolute bottom-0 left-4 text-[11px] text-slate-400 font-mono opacity-60 select-none pb-2">
            {`{ ${transactionCount} }`}
          </div>
        </div>
      </div>
    </footer>
  )
}

function CheckoutModal({ product, initialQuantity, onClose, onTransaction, username }: { product: any, initialQuantity: number, onClose: () => void, onTransaction: (trx: Transaction) => void, username: string | null }) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'bep20'>('qris');
  const [isSuccess, setIsSuccess] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [transactionCode] = useState(() => 'TRX-' + Math.random().toString(36).substring(2, 11).toUpperCase());
  const EXCHANGE_RATE = 2532;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!proofFile) {
      alert('请先上传付款凭证！');
      return;
    }
    setIsSuccess(true);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const idrPrice = product.price * EXCHANGE_RATE;
  const totalPrice = product.price * quantity;
  const totalIdr = totalPrice * EXCHANGE_RATE;

  const formatIdr = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  const themeColor = paymentMethod === 'bep20' ? 'bg-amber-500' : 'bg-[#1ea1f1]';
  const textColor = paymentMethod === 'bep20' ? 'text-amber-500' : 'text-[#1ea1f1]';

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={handleOverlayClick}>
        <div className="bg-white rounded-3xl p-10 flex flex-col items-center justify-center animate-in zoom-in duration-300 max-w-sm w-full text-center shadow-2xl relative">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">订单成功</h2>
          <p className="text-slate-500 mb-4">请前往 Telegram 确认付款并发送凭证。</p>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-6 w-full text-left">
            <p className="text-xs text-slate-500 mb-1">交易编号</p>
            <p className="font-mono font-bold text-slate-800">{transactionCode}</p>
          </div>
          <a
            href={`https://t.me/Zangxhi88?text=${encodeURIComponent(`交易编号: ${transactionCode}\n我已完成付款，这是我的付款凭证：`)}`}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              const totalPriceVal = product.price * quantity;
              const newTrx: Transaction = {
                id: transactionCode,
                name: username || "Customer",
                product: product.name,
                qty: quantity,
                amount: `¥${totalPriceVal}`,
                date: getTodayDate(),
                status: 'Pending',
                proof_url: ''
              };
              onTransaction(newTrx);
              onClose();
            }}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors block"
          >
            前往 Telegram 并发送凭证
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={handleOverlayClick}>
      <div className="w-full max-w-md bg-slate-50 sm:rounded-3xl rounded-t-3xl overflow-hidden relative shadow-2xl transition-all">

        <div className={cn("pt-10 pb-20 px-6 text-center text-white relative transition-colors duration-500", themeColor)}>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-sm">
            <ShoppingCart className={cn("w-8 h-8 transition-colors duration-500", textColor)} />
          </div>
          <h2 className="text-2xl font-bold mb-1 tracking-wide">确认订单</h2>
          <p className="text-sm text-white/90">核对信息后前往 Telegram 付款</p>
        </div>

        <div className="relative -mt-12 px-4 pb-8 max-h-[75vh] overflow-y-auto">

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-xs text-slate-500 mb-1">购买产品</div>
                <div className="font-bold text-slate-900 text-lg">{product.name}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500 mb-1">单价</div>
                <div className="font-bold text-slate-900 text-lg leading-none">¥{product.price}</div>
                <div className="text-xs text-slate-400 mt-1">≈ IDR {formatIdr(idrPrice)}</div>
              </div>
            </div>

            <div className="h-px bg-slate-100 my-4"></div>

            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-slate-600 font-medium">购买数量</div>
              <div className="flex items-center gap-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-lg w-4 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className={cn("w-7 h-7 rounded-full flex items-center justify-center text-white shadow-sm transition-colors duration-500", themeColor)}>
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="h-px bg-slate-100 my-4"></div>

            <div className="flex justify-between items-end">
              <div className="text-sm text-slate-600 font-medium">总金额</div>
              <div className="text-right">
                <div className={cn("font-bold text-2xl leading-none mb-1 transition-colors duration-500", textColor)}>¥{totalPrice}</div>
                <div className="text-xs text-slate-400">≈ IDR {formatIdr(totalIdr)} <span className="text-amber-500">*</span></div>
              </div>
            </div>
          </div>

          <div className="mt-4 mb-4 grid grid-cols-2 gap-3">
            <div
              onClick={() => setPaymentMethod('qris')}
              className={cn(
                "p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 hover:shadow-md",
                paymentMethod === 'qris' ? "border-[#1ea1f1] bg-blue-50" : "border-slate-200 bg-white"
              )}
            >
              <div className="flex items-center gap-2 relative z-10">
                <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center transition-colors", paymentMethod === 'qris' ? "border-[#1ea1f1]" : "border-slate-300")}>
                  {paymentMethod === 'qris' && <div className="w-2 h-2 rounded-full bg-[#1ea1f1]"></div>}
                </div>
                <span className={cn("font-bold text-sm transition-colors", paymentMethod === 'qris' ? "text-[#1ea1f1]" : "text-slate-600")}>QRIS / Alipay</span>
              </div>
            </div>

            <div
              onClick={() => setPaymentMethod('bep20')}
              className={cn(
                "p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 hover:shadow-md",
                paymentMethod === 'bep20' ? "border-amber-500 bg-amber-50" : "border-slate-200 bg-white"
              )}
            >
              <div className="flex items-center gap-2 relative z-10">
                <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center transition-colors", paymentMethod === 'bep20' ? "border-amber-500" : "border-slate-300")}>
                  {paymentMethod === 'bep20' && <div className="w-2 h-2 rounded-full bg-amber-500"></div>}
                </div>
                <span className={cn("font-bold text-sm transition-colors", paymentMethod === 'bep20' ? "text-amber-500" : "text-slate-600")}>BEP20 (USDT)</span>
              </div>
            </div>
          </div>

          <div className={cn("bg-white rounded-2xl p-5 mt-4 shadow-sm border-2 text-center transition-colors duration-500", paymentMethod === 'bep20' ? 'border-amber-100' : 'border-blue-50')}>
            {paymentMethod === 'qris' ? (
              <div className="bg-slate-50 p-2 rounded-xl mb-4 border border-slate-100 inline-block">
                <img src={qrisImg} alt="QRIS Payment" className="w-[200px] h-auto rounded-lg" />
              </div>
            ) : (
              <div className="bg-slate-50 p-4 rounded-xl mb-4 border border-slate-100">
                <div className="w-16 h-16 bg-amber-500 rounded-2xl mx-auto flex items-center justify-center mb-3 shadow-md shadow-amber-500/20">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                </div>
                <div className="text-sm font-bold text-amber-600 mb-1">USDT (BEP20)</div>
                <div className="text-xs text-slate-500 font-mono bg-white p-2 rounded border break-all select-all">0x36152b220b1b1b3b436124d21847d9f89fba7118</div>
              </div>
            )}

            <div className="mb-4">
              <label className={cn(
                "flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl cursor-pointer transition-colors",
                proofFile ? "border-emerald-500 bg-emerald-50" : (paymentMethod === 'bep20' ? "border-amber-300 hover:bg-amber-50" : "border-blue-300 hover:bg-blue-50")
              )}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                  {proofFile ? (
                    <>
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-1" />
                      <p className="text-sm text-emerald-600 font-bold truncate max-w-full">已上传: {proofFile.name}</p>
                    </>
                  ) : (
                    <>
                      <Upload className={cn("w-6 h-6 mb-1", paymentMethod === 'bep20' ? "text-amber-500" : "text-[#1ea1f1]")} />
                      <p className={cn("text-sm font-bold", paymentMethod === 'bep20' ? "text-amber-600" : "text-[#1ea1f1]")}>上传付款凭证</p>
                      <p className="text-xs text-slate-400 mt-1">支持 JPG, PNG</p>
                    </>
                  )}
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
              </label>
            </div>

            <button
              onClick={handleSubmit}
              className={cn(
                "w-full py-3.5 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors",
                paymentMethod === 'bep20' ? "bg-amber-500 hover:bg-amber-600" : "bg-[#1ea1f1] hover:bg-blue-500"
              )}
            >
              <Send className="w-4 h-4" />
              如果您已付款，请继续。
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

function TransactionsView({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="container mx-auto px-4 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-slate-900">Riwayat Pembelian</h2>
          <p className="text-slate-500">Daftar pembelian yang dilakukan secara global.</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
          <Activity className="w-6 h-6 text-blue-500" />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="p-4 text-sm font-semibold text-slate-600">ID</th>
                <th className="p-4 text-sm font-semibold text-slate-600">PRODUK</th>
                <th className="p-4 text-sm font-semibold text-slate-600">JUMLAH</th>
                <th className="p-4 text-sm font-semibold text-slate-600">HARGA</th>
                <th className="p-4 text-sm font-semibold text-slate-600">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx) => (
                <tr key={trx.id} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors">
                  <td className="p-4 text-sm font-mono text-slate-500">{trx.id}</td>
                  <td className="p-4 text-sm font-medium text-slate-900">{trx.product}</td>
                  <td className="p-4 text-sm text-slate-600">{trx.qty}</td>
                  <td className="p-4 text-sm font-bold text-blue-600">{trx.amount}</td>
                  <td className="p-4 text-sm">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold",
                      trx.status === 'Sukses' ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                    )}>
                      {trx.status}
                    </span>
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">Belum ada riwayat transaksi.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminView({ transactions, confirmTransaction }: { transactions: Transaction[], confirmTransaction: (id: string) => void }) {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (pin === 'Zerotoher0') setIsAuthenticated(true);
    else setError('Password Salah!');
  };

  return (
    <div className="container mx-auto px-4 lg:px-8">
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white border border-slate-200 rounded-3xl shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Login Admin</h2>
          <input
            type="password"
            value={pin}
            onChange={e => setPin(e.target.value)}
            className="w-full border border-slate-200 rounded-xl py-3 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest"
            placeholder="Password"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button onClick={handleLogin} className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors">
            Masuk
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Panel Admin</h2>
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto p-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="p-4 text-sm font-semibold text-slate-600">ID</th>
                    <th className="p-4 text-sm font-semibold text-slate-600">PESANAN</th>
                    <th className="p-4 text-sm font-semibold text-slate-600">STATUS</th>
                    <th className="p-4 text-sm font-semibold text-slate-600">AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(trx => (
                    <tr key={trx.id} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors">
                      <td className="p-4 text-sm font-mono text-slate-500">{trx.id}</td>
                      <td className="p-4 text-sm">
                        <div className="font-bold text-slate-900">{trx.name}</div>
                        <div className="text-slate-500 text-xs">{trx.qty}x {trx.product} - {trx.amount}</div>
                      </td>
                      <td className="p-4 text-sm">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-bold",
                          trx.status === 'Sukses' ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                        )}>
                          {trx.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm">
                        {trx.status !== 'Sukses' && (
                          <button onClick={() => confirmTransaction(trx.id)} className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-600 transition-colors shadow-sm">
                            Sukseskan
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

