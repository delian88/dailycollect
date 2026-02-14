
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Zap, 
  CheckCircle2, 
  Smartphone, 
  Globe, 
  Building2, 
  ArrowRight, 
  QrCode, 
  Lock, 
  Percent, 
  Coins, 
  TrendingUp,
  Menu,
  X,
  Star as StarIcon,
  ChevronLeft,
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  MessageSquare
} from 'lucide-react';
import USSDSimulator from './components/USSDSimulator';
import BusinessAdvisor from './components/BusinessAdvisor';

type View = 'home' | 'features' | 'how-it-works' | 'pricing' | 'advisor';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    
    const revealElements = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, { threshold: 0.15 });

      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      return observer;
    };

    let observer: IntersectionObserver | null = null;
    if (!isLoading) {
      observer = revealElements();
    }

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [isLoading, currentView]);

  const renderStars = (count: number = 40) => {
    return Array.from({ length: count }).map((_, i) => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const duration = 3 + Math.random() * 4;
      const delay = Math.random() * 5;
      const size = 1 + Math.random() * 2;
      return (
        <div 
          key={i} 
          className="star" 
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDuration: `${duration}s`,
            animationDelay: `${-delay}s`
          } as React.CSSProperties}
        />
      );
    });
  };

  const LogoComponent = ({ className = "w-12 h-12" }: { className?: string }) => (
    <div className={`${className} bg-[#1a2e2e] rounded-xl flex items-center justify-center shadow-lg overflow-hidden relative group`}>
      {!logoError ? (
        <img 
          src="logo.png" 
          alt="Daily Collect" 
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
          onError={() => setLogoError(true)}
        />
      ) : (
        <div className="bg-emerald-600 w-full h-full flex items-center justify-center">
          <Coins size={className.includes('w-24') ? 48 : 24} className="text-yellow-400" />
        </div>
      )}
    </div>
  );

  const navigateTo = (view: View) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#1a2e2e] z-[100] flex flex-col items-center justify-center overflow-hidden">
        <div className="stars-container">{renderStars(60)}</div>
        <div className="relative mb-8 animate-bounce">
           <div className="p-4 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl">
              <LogoComponent className="w-24 h-24 md:w-32 md:h-32" />
           </div>
           <div className="absolute -top-4 -right-4 bg-emerald-500 rounded-full p-2 border-4 border-[#1a2e2e]">
              <TrendingUp size={24} className="text-[#1a2e2e]" />
           </div>
        </div>
        <div className="text-center px-4">
          <h2 className="text-white text-3xl md:text-4xl font-black tracking-tighter shining-text mb-2">DAILY COLLECT</h2>
          <p className="text-emerald-400/60 font-bold tracking-widest text-[10px] uppercase">Empowering Nigeria's Hustle</p>
          <div className="w-48 h-1.5 bg-white/10 rounded-full mx-auto mt-10 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 bg-emerald-500 loading-bar-animate"></div>
          </div>
        </div>
        <style>{`
          .loading-bar-animate {
            width: 30%;
            animation: moveLoadingBar 1.5s infinite ease-in-out;
          }
          @keyframes moveLoadingBar {
            0% { left: -30%; }
            100% { left: 100%; }
          }
        `}</style>
      </div>
    );
  }

  const Header = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <button onClick={() => navigateTo('home')} className="flex items-center gap-3">
          <LogoComponent className="w-10 h-10" />
          <div className="flex flex-col text-left">
            <span className="text-lg font-black text-slate-900 leading-none tracking-tight">Daily Collect</span>
            <span className="text-[10px] font-bold text-emerald-600 tracking-widest uppercase">Wallet</span>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-10">
          {[
            { id: 'features', label: 'Features' },
            { id: 'how-it-works', label: 'How it Works' },
            { id: 'pricing', label: 'Pricing' },
            { id: 'advisor', label: 'Advisor' }
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => navigateTo(item.id as View)}
              className={`text-sm font-bold transition-colors ${currentView === item.id ? 'text-emerald-600 underline underline-offset-4' : 'text-slate-600 hover:text-emerald-600'}`}
            >
              {item.label}
            </button>
          ))}
          <button onClick={() => navigateTo('home')} className="bg-emerald-600 text-white px-7 py-3 rounded-full font-black text-sm hover:bg-emerald-700 shadow-xl shadow-emerald-100 active:scale-95 transition-all">
            Join the Hustle
          </button>
        </div>

        <button 
          className="lg:hidden p-2 text-slate-900 bg-slate-50 rounded-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-6 shadow-2xl">
          {[
            { id: 'features', label: 'Features' },
            { id: 'how-it-works', label: 'How it Works' },
            { id: 'pricing', label: 'Pricing' },
            { id: 'advisor', label: 'Advisor' }
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => navigateTo(item.id as View)}
              className="text-lg font-bold text-slate-900 flex items-center justify-between group"
            >
              {item.label} <ArrowRight className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
            </button>
          ))}
          <button className="bg-emerald-600 text-white py-5 rounded-2xl font-black text-xl shadow-lg">
            Get Started Now
          </button>
        </div>
      )}
    </nav>
  );

  const SubPageHero = ({ title, highlight, description }: { title: string, highlight: string, description: string }) => (
    <section className="relative pt-32 lg:pt-48 pb-16 bg-[#1a2e2e] overflow-hidden">
      <div className="stars-container">{renderStars(60)}</div>
      <div className="container mx-auto px-4 relative z-10">
        <button onClick={() => navigateTo('home')} className="inline-flex items-center gap-2 text-emerald-400 font-bold mb-8 hover:text-emerald-300 transition-colors">
          <ArrowLeft size={18} /> Back to Home
        </button>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
          {title} <br />
          <span className="shining-text">{highlight}.</span>
        </h1>
        <p className="text-xl text-emerald-100/60 max-w-2xl font-medium leading-relaxed">
          {description}
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  );

  const HomeView = () => (
    <div className="animate-in fade-in duration-700">
      <section className="relative pt-32 lg:pt-52 pb-24 lg:pb-40 bg-[#1a2e2e] overflow-hidden">
        <div className="stars-container">{renderStars(70)}</div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-emerald-500/20 reveal">
                <StarIcon size={14} className="fill-emerald-400 animate-pulse" />
                <span>Smart Revenue Tracking</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.95] tracking-tighter reveal">
                Nigeria's Most <br />
                <span className="shining-text">Trusted Wallet.</span>
              </h1>
              <p className="text-xl text-emerald-100/60 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium reveal">
                Build your professional financial trail. From Sabon Gari to Balogun Market, Daily Collect secures every kobo through simple USSD access.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start reveal">
                <button onClick={() => navigateTo('how-it-works')} className="bg-emerald-500 text-[#1a2e2e] px-12 py-5 rounded-2xl font-black text-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/30 active:scale-95">
                  Register Now <ArrowRight size={24} />
                </button>
                <button className="bg-white/5 border-2 border-white/10 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/10 transition-all active:scale-95">
                  Dial *555#
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 w-full max-w-lg mx-auto reveal relative">
              <div className="simulator-wrapper">
                <div className="absolute -inset-10 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <USSDSimulator />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-50"></div>
      </section>

      <section className="py-24 md:py-32 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
           {[
             { title: "Features", id: 'features', icon: <Zap /> },
             { title: "How it Works", id: 'how-it-works', icon: <Smartphone /> },
             { title: "Pricing", id: 'pricing', icon: <Percent /> }
           ].map(item => (
             <button key={item.id} onClick={() => navigateTo(item.id as View)} className="reveal group p-10 bg-white rounded-[3rem] border border-slate-100 hover:border-emerald-200 hover:shadow-2xl transition-all text-left">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 font-medium">Explore the full details of our professional wallet solution.</p>
                <div className="mt-6 flex items-center gap-2 text-emerald-600 font-black">
                   Read Full Details <ArrowRight size={18} />
                </div>
             </button>
           ))}
        </div>
      </section>
    </div>
  );

  const FeaturesView = () => (
    <div className="bg-gray-50 min-h-screen animate-in slide-in-from-right duration-500">
      <SubPageHero 
        title="Professional"
        highlight="Financial Tools"
        description="Every feature of Daily Collect is designed to solve the real-world problems of Nigeria's bustling market sectors."
      />
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {[
            { 
              icon: <Smartphone />, 
              title: "USSD-First Architecture", 
              desc: "Engineered to work on any 2G/3G feature phone. Dial *555# to access banking without needing data, airtime, or a smartphone. Reliable in high-density areas where 4G signals fail." 
            },
            { 
              icon: <QrCode />, 
              title: "Dual Identifier System", 
              desc: "Every merchant gets a unique WR (Wallet Reference) code and a Merchant ID. Customers can pay via Bank Transfer to your phone number or scan your printable QR code." 
            },
            { 
              icon: <Coins />, 
              title: "Smart Cash Logging", 
              desc: "Unlike standard bank accounts, we allow you to manually log your cash-on-hand sales. This creates a 100% complete business trail, unlocking larger loans from our partners." 
            },
            { 
              icon: <Building2 />, 
              title: "Automated Levy Portal", 
              desc: "Stop worrying about manual receipts. Link your wallet to the market association or state agency (like KIRS) for automatic, transparent daily remittances." 
            },
            { 
              icon: <ShieldCheck />, 
              title: "Zero-Reversal Guarantee", 
              desc: "Once a payment is confirmed via PIN on our system, it cannot be reversed by the customer without your approval. Protect your inventory from fraud." 
            },
            { 
              icon: <Zap />, 
              title: "Instant Credit Scoring", 
              desc: "Our aggregator model shares your history with Moniepoint and OPay, giving you access to micro-loans within 48 hours based on your daily collection volume." 
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 reveal">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-600 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const HowItWorksView = () => (
    <div className="bg-gray-50 min-h-screen animate-in slide-in-from-right duration-500">
      <SubPageHero 
        title="The Path"
        highlight="To Scale"
        description="Starting with Daily Collect is easier than opening a physical stall. Follow these steps to digitize your revenue today."
      />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-16">
          {[
            { 
              step: "01", 
              title: "Self-Onboarding (*555#)", 
              desc: "Dial *555# on your phone. You'll need your Name, Phone Number, and NIN or BVN for basic KYC. No paperwork required.",
              action: "Dial *555# now"
            },
            { 
              step: "02", 
              title: "Link Your Partners", 
              desc: "Select your preferred settlement partner (OPay, Moniepoint, or PalmPay). Your wallet is instantly connected to their regulated banking infrastructure.",
              action: "Choose Partner"
            },
            { 
              step: "03", 
              title: "Start Collecting", 
              desc: "Display your Merchant ID at your shop. Customers pay via USSD, App, or Bank Transfer. You receive an instant SMS confirmation.",
              action: "View WR Code"
            },
            { 
              step: "04", 
              title: "Daily Cash Settlement", 
              desc: "At the end of your market day, log any physical cash sales via the *555# menu. This ensures your financial history represents 100% of your business.",
              action: "Log Sales"
            },
            { 
              step: "05", 
              title: "Automated Compliance", 
              desc: "Enable 'Auto-Levy'. Your daily association dues (₦200-₦500) are automatically deducted and sent to the authority portal with zero effort.",
              action: "Manage Levies"
            },
            { 
              step: "06", 
              title: "Unlock Growth", 
              desc: "After 30 days of consistent usage, you become eligible for loan referrals. Use your transaction history to secure the capital needed to restock.",
              action: "Apply for Loan"
            }
          ].map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-8 reveal">
              <div className="flex-shrink-0">
                 <div className="w-20 h-20 bg-emerald-600 text-white rounded-[2rem] flex items-center justify-center text-3xl font-black shadow-lg">
                    {item.step}
                 </div>
              </div>
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 flex-grow shadow-sm">
                <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed mb-6">{item.desc}</p>
                <button className="text-emerald-600 font-black flex items-center gap-2 hover:gap-3 transition-all">
                  {item.action} <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PricingView = () => (
    <div className="bg-gray-50 min-h-screen animate-in slide-in-from-right duration-500">
      <SubPageHero 
        title="Zero"
        highlight="Hidden Costs"
        description="Transparent pricing designed to empower informal traders. No monthly fees, no minimum balance, just fair transaction-based costs."
      />
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { 
              title: "Registration", 
              price: "₦0", 
              subtitle: "Forever Free", 
              features: ["Instant Wallet ID", "USSD Access", "Basic KYC", "SMS Receipts"] 
            },
            { 
              title: "Digital Payments", 
              price: "0.5%", 
              subtitle: "Max ₦500 cap", 
              features: ["Bank Transfers", "QR Payments", "WR Code Payments", "Instant Settlement"] 
            },
            { 
              title: "Levy Processing", 
              price: "₦10", 
              subtitle: "Per Remittance", 
              features: ["Auto-Deduction", "Digital Receipts", "Agency Reports", "Audit Trail"] 
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm text-center reveal">
               <h3 className="text-xl font-black text-slate-500 mb-4">{item.title}</h3>
               <div className="text-6xl font-black text-slate-900 mb-2">{item.price}</div>
               <div className="text-emerald-600 font-bold mb-8 uppercase tracking-widest text-xs">{item.subtitle}</div>
               <div className="space-y-4 mb-8">
                  {item.features.map(f => (
                    <div key={f} className="flex items-center gap-2 justify-center text-slate-600 font-medium">
                      <CheckCircle2 size={16} className="text-emerald-500" /> {f}
                    </div>
                  ))}
               </div>
               <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition shadow-lg shadow-emerald-100">
                  Select Plan
               </button>
            </div>
          ))}
        </div>

        <div className="bg-[#1a2e2e] rounded-[3.5rem] p-12 text-white relative overflow-hidden reveal">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
             <div className="lg:w-2/3">
                <h3 className="text-3xl font-black mb-4">The Aggregator Advantage</h3>
                <p className="text-emerald-100/60 text-lg leading-relaxed font-medium">
                  We don't hold your money—our licensed partners (OPay, Moniepoint) do. This means your funds are NDIC insured and regulated by the CBN, while you enjoy the specialized features of Daily Collect.
                </p>
             </div>
             <div className="flex gap-4">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                   <div className="font-black text-4xl mb-1">0</div>
                   <div className="text-xs uppercase tracking-widest font-bold text-emerald-400">Monthly Fees</div>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                   <div className="font-black text-4xl mb-1">₦0</div>
                   <div className="text-xs uppercase tracking-widest font-bold text-emerald-400">Opening Balance</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AdvisorView = () => (
    <div className="bg-[#f9fafb] min-h-screen animate-in slide-in-from-right duration-500 pt-20">
      <div className="container mx-auto px-4 py-20">
        <BusinessAdvisor />
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'features': return <FeaturesView />;
      case 'how-it-works': return <HowItWorksView />;
      case 'pricing': return <PricingView />;
      case 'advisor': return <AdvisorView />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {renderCurrentView()}
      
      {/* Footer (Always Visible) */}
      <footer className="bg-[#1a2e2e] text-white pt-24 pb-12 overflow-hidden relative">
        <div className="stars-container opacity-10">{renderStars(30)}</div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <LogoComponent className="w-12 h-12" />
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tight leading-none">Daily Collect</span>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Wallet</span>
                </div>
              </div>
              <p className="text-emerald-100/40 font-medium leading-relaxed max-w-xs mb-8">
                Providing financial infrastructure for the informal heartbeat of Nigeria.
              </p>
              <div className="flex gap-4">
                <button onClick={() => navigateTo('home')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-emerald-600 transition">
                  <Globe size={18} className="text-emerald-400" />
                </button>
              </div>
            </div>
            
            {['Services', 'Resources', 'Support'].map((title, idx) => (
              <div key={idx}>
                <h5 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-500 mb-10">{title}</h5>
                <ul className="space-y-5 text-emerald-100/40 font-bold">
                  {title === 'Services' && ['USSD Banking', 'Revenue Collection', 'Levy Automation', 'Micro Loans'].map(l => (
                    <li key={l}><button onClick={() => navigateTo('features')} className="hover:text-emerald-400 transition-colors text-left">{l}</button></li>
                  ))}
                  {title === 'Resources' && ['Market News', 'Safety Tips', 'Success Stories', 'Agent Map'].map(l => (
                    <li key={l}><button onClick={() => navigateTo('how-it-works')} className="hover:text-emerald-400 transition-colors text-left">{l}</button></li>
                  ))}
                  {title === 'Support' && ['Help Center', 'WhatsApp Help', 'Privacy Policy', 'Terms of Service'].map(l => (
                    <li key={l}><button className="hover:text-emerald-400 transition-colors text-left">{l}</button></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-emerald-100/20 text-[10px] font-black uppercase tracking-[0.3em] text-center md:text-left">
              © 2024 DAILY COLLECT WALLET. LICENSED AGGREGATOR.
            </div>
            <div className="flex gap-10 text-[9px] font-black tracking-[0.2em] text-emerald-500/40 uppercase">
              <span>Verified Identity</span>
              <span>CBN Guidelines</span>
              <span>NDIC Protected</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
