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
  ArrowLeft,
  ShieldCheck,
  Languages,
  MapPin,
  ShieldAlert
} from 'lucide-react';
import USSDSimulator from './components/USSDSimulator';
import BusinessAdvisor from './components/BusinessAdvisor';

type View = 'home' | 'features' | 'how-it-works' | 'pricing' | 'advisor';
type Language = 'English' | 'Hausa' | 'Yoruba' | 'Igbo';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');
  const [currentLang, setCurrentLang] = useState<Language>('English');

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

  const translations = {
    English: {
      heroTitle: "Nigeria's Most Trusted Wallet.",
      heroSub: "From Sabon Gari to Balogun Market, Daily Collect secures every kobo through simple USSD access.",
      cta: "Join the Hustle",
      dialect: "English"
    },
    Hausa: {
      heroTitle: "Aljihun Digital Mafi Amintacciya.",
      heroSub: "Daga Sabon Gari zuwa Kurmi, Daily Collect na kiyaye kowane kobo ta hanyar USSD mai sauki.",
      cta: "Shiga cikin Kasuwancin",
      dialect: "Hausa"
    },
    Yoruba: {
      heroTitle: "Apò Digital Tí Ó Jẹ́ Amúyẹ Jùlọ.",
      heroSub: "Láti Ọjà Balogun dé ibikíbi, Daily Collect ń sọ́ gbogbo kóbò rẹ pẹ̀lú kòòdù USSD tó rọrùn.",
      cta: "Darapọ̀ mọ́ Iṣẹ́ Àpọ̀nlé",
      dialect: "Yoruba"
    },
    Igbo: {
      heroTitle: "Akpa Ego Digital Kasị Tụnyere.",
      heroSub: "Site n'ahịa Onitsha gaa Balogun, Daily Collect na-echekwa ego gị niile site na koodu USSD dị mfe.",
      cta: "Soro na Azụmaahịa",
      dialect: "Igbo"
    }
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
          .loading-bar-animate { width: 30%; animation: moveLoadingBar 1.5s infinite ease-in-out; }
          @keyframes moveLoadingBar { 0% { left: -30%; } 100% { left: 100%; } }
        `}</style>
      </div>
    );
  }

  const Header = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <button onClick={() => navigateTo('home')} className="flex items-center gap-3">
          <LogoComponent className="w-10 h-10" />
          <div className="flex flex-col text-left">
            <span className="text-lg font-black text-slate-900 leading-none tracking-tight">Daily Collect</span>
            <span className="text-[10px] font-bold text-emerald-600 tracking-widest uppercase">Wallet</span>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {[
            { id: 'features', label: 'Features' },
            { id: 'how-it-works', label: 'How it Works' },
            { id: 'pricing', label: 'Pricing' },
            { id: 'advisor', label: 'Advisor' }
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => navigateTo(item.id as View)}
              className={`text-sm font-bold transition-colors ${currentView === item.id ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600'}`}
            >
              {item.label}
            </button>
          ))}
          <div className="h-6 w-px bg-slate-200 mx-2"></div>
          <div className="flex items-center gap-2">
            <Languages size={16} className="text-emerald-600" />
            <select 
              className="bg-transparent text-xs font-bold text-slate-600 focus:outline-none cursor-pointer"
              value={currentLang}
              onChange={(e) => setCurrentLang(e.target.value as Language)}
            >
              <option value="English">ENG</option>
              <option value="Hausa">HAU</option>
              <option value="Yoruba">YOR</option>
              <option value="Igbo">IGB</option>
            </select>
          </div>
          <button onClick={() => navigateTo('home')} className="bg-[#1a2e2e] text-white px-7 py-3 rounded-full font-black text-sm hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition-all">
            {translations[currentLang].cta}
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
           <div className="flex justify-between items-center pb-4 border-b border-slate-50">
             <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Select Language</span>
             <div className="flex gap-4">
                {['English', 'Hausa', 'Yoruba', 'Igbo'].map(lang => (
                  <button 
                    key={lang}
                    onClick={() => setCurrentLang(lang as Language)}
                    className={`text-xs font-bold ${currentLang === lang ? 'text-emerald-600' : 'text-slate-400'}`}
                  >
                    {lang.slice(0,3).toUpperCase()}
                  </button>
                ))}
             </div>
           </div>
          {[
            { id: 'features', label: 'Features' },
            { id: 'how-it-works', label: 'How it Works' },
            { id: 'pricing', label: 'Pricing' },
            { id: 'advisor', label: 'Advisor' }
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => navigateTo(item.id as View)}
              className="text-lg font-bold text-slate-900 flex items-center justify-between"
            >
              {item.label} <ArrowRight className="text-emerald-500" size={20} />
            </button>
          ))}
          <button className="bg-emerald-600 text-white py-5 rounded-2xl font-black text-xl">
            {translations[currentLang].cta}
          </button>
        </div>
      )}
    </nav>
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
                <span>Modern Banking for {currentLang === 'English' ? 'Markets' : translations[currentLang].dialect}</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.95] tracking-tighter reveal">
                {translations[currentLang].heroTitle.split('.').map((part, i) => (
                  <React.Fragment key={i}>
                    {i === 1 ? <span className="shining-text">{part}</span> : part}
                  </React.Fragment>
                ))}
              </h1>
              <p className="text-xl text-emerald-100/60 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium reveal">
                {translations[currentLang].heroSub}
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start reveal">
                <button onClick={() => navigateTo('how-it-works')} className="bg-emerald-500 text-[#1a2e2e] px-12 py-5 rounded-2xl font-black text-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/30 active:scale-95">
                  Start Collection <ArrowRight size={24} />
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
      </section>

      {/* Trust & Impact Stats */}
      <section className="py-20 bg-gray-50 border-y border-slate-100">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: "Target Potential", val: "30M+", sub: "Informal Traders" },
                { label: "Theft Reduction", val: "50%", sub: "Cash Safety" },
                { label: "Partner Speed", val: "48h", sub: "Loan Approvals" },
                { label: "Digital Growth", val: "25%", sub: "Monthly Increase" }
              ].map((stat, i) => (
                <div key={i} className="text-center reveal">
                   <div className="text-4xl font-black text-slate-900 mb-1">{stat.val}</div>
                   <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">{stat.label}</div>
                   <div className="text-[10px] font-medium text-slate-400 uppercase">{stat.sub}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Location Focused Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
           <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="lg:w-1/2 reveal">
                 <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">Serving the Heart <br /> of <span className="text-emerald-600">Nigerian Commerce.</span></h2>
                 <p className="text-xl text-slate-500 mb-10 leading-relaxed">Whether you're in the busy Kurmi market of Kano, the fashion hubs of Lagos Balogun, or the bustling streets of Abuja, Daily Collect is your digital partner.</p>
                 <div className="space-y-6">
                    {['Lagos (Balogun Market)', 'Kano (Sabon Gari, Kurmi)', 'Abuja (Wuse, Garki)', 'Rivers (Oil Mill Market)'].map(loc => (
                      <div key={loc} className="flex items-center gap-4 text-lg font-bold text-slate-700">
                         <MapPin className="text-emerald-500" /> {loc}
                      </div>
                    ))}
                 </div>
              </div>
              <div className="lg:w-1/2 grid grid-cols-2 gap-4 reveal">
                 <div className="bg-emerald-50 p-8 rounded-[3rem] aspect-square flex flex-col justify-end">
                    <Building2 className="text-emerald-600 mb-4" size={40} />
                    <h4 className="font-black text-xl">Market Stalls</h4>
                 </div>
                 <div className="bg-blue-50 p-8 rounded-[3rem] aspect-square flex flex-col justify-end mt-12">
                    <Users className="text-blue-600 mb-4" size={40} />
                    <h4 className="font-black text-xl">Artisans</h4>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Floating CTA */}
      <div className="fixed bottom-8 right-8 z-40 lg:hidden">
         <button onClick={() => navigateTo('advisor')} className="bg-emerald-600 text-white p-4 rounded-full shadow-2xl border-4 border-white">
            <Languages size={24} />
         </button>
      </div>
    </div>
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

  const FeaturesView = () => (
    <div className="bg-gray-50 min-h-screen animate-in slide-in-from-right duration-500">
      <SubPageHero 
        title="Production Ready"
        highlight="Financial Infrastructure"
        description="Daily Collect isn't just a wallet; it's a bridge to credit, compliance, and growth for over 80% of Nigeria's workforce."
      />
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              icon: <Smartphone />, 
              title: "USSD *555# Gateway", 
              desc: "Optimized for feature phones. Dial *555# to collect, remit, and withdraw without an internet connection." 
            },
            { 
              icon: <QrCode />, 
              title: "WR Merchant IDs", 
              desc: "Every trader gets a unique Wallet Reference (WR) code for quick payments and association identification." 
            },
            { 
              icon: <Coins />, 
              title: "Hybrid Cash Logging", 
              desc: "Track both digital transfers and physical cash sales to build a 100% complete credit history for loans." 
            },
            { 
              icon: <ShieldCheck />, 
              title: "Partner Integration", 
              desc: "Direct API links to Moniepoint, OPay, and PalmPay ensure your funds are held in regulated, insured accounts." 
            },
            { 
              icon: <Building2 />, 
              title: "Levy Automation", 
              desc: "Direct remittance to Market Associations and State Agencies (like KIRS) with digital audit trails." 
            },
            { 
              icon: <Zap />, 
              title: "Credit Scoring", 
              desc: "Our transaction data flows into credit models, helping you secure capital to restock and expand." 
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 reveal transition-transform hover:scale-[1.02]">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight">{item.title}</h3>
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
        title="Scalable"
        highlight="Workflows"
        description="Daily Collect is designed for the high-frequency nature of Nigerian market trade. Here is how your money moves."
      />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {[
            { 
              step: "01", 
              title: "Trader Registration", 
              desc: "Dial *555#, enter your NIN or BVN for basic KYC, and set your secure transaction PIN. No complex paperwork required.",
              icon: <Users />
            },
            { 
              step: "02", 
              title: "Collection & Identifier", 
              desc: "Receive payments via your phone number or WR merchant ID. Customers pay via USSD from any bank or a quick transfer.",
              icon: <QrCode />
            },
            { 
              step: "03", 
              title: "End-of-Day Logging", 
              desc: "Review your digital total and log any cash sales. This manual entry is cross-referenced for data-driven credit scoring.",
              icon: <Coins />
            },
            { 
              step: "04", 
              title: "Levy Remittance", 
              desc: "System prompts for association/state levies (e.g., ₦200 daily). Confirm with your PIN; funds remit instantly to the authority.",
              icon: <Building2 />
            }
          ].map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-8 reveal">
              <div className="flex-shrink-0">
                 <div className="w-16 h-16 bg-emerald-600 text-white rounded-[1.5rem] flex items-center justify-center text-2xl font-black shadow-lg">
                    {item.step}
                 </div>
              </div>
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 flex-grow shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                   <div className="text-emerald-500">{item.icon}</div>
                   <h3 className="text-2xl font-black text-slate-900 leading-none">{item.title}</h3>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed">{item.desc}</p>
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
        highlight="Entry Barrier"
        description="Our revenue model is based on volume and growth. We only win when you grow. Transparent, shared transaction fees."
      />
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-3 gap-8">
           {[
             { title: "Merchant", price: "₦0", desc: "No monthly account maintenance fees. NDIC Insured.", label: "Standard" },
             { title: "Digital Payments", price: "0.5%", desc: "Capped at ₦500 per transaction. Instant settlement.", label: "Volume" },
             { title: "Levy Processing", price: "₦10", desc: "Flat fee per automated remittance to associations.", label: "Compliance" }
           ].map((item, i) => (
             <div key={i} className="bg-white p-12 rounded-[3.5rem] border border-slate-100 reveal text-center">
                <div className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-6">{item.label}</div>
                <div className="text-7xl font-black text-slate-900 mb-4">{item.price}</div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-500 font-medium mb-10">{item.desc}</p>
                <button className="w-full bg-[#1a2e2e] text-white py-5 rounded-2xl font-black hover:bg-emerald-600 transition-colors">Select Plan</button>
             </div>
           ))}
        </div>
        
        <div className="mt-20 bg-amber-50 p-10 rounded-[3rem] border border-amber-100 flex flex-col md:flex-row items-center gap-8 reveal">
           <div className="bg-amber-100 p-6 rounded-2xl text-amber-600">
              <ShieldAlert size={48} />
           </div>
           <div>
              <h4 className="text-2xl font-black text-amber-900 mb-2">Security & Risk Mitigation</h4>
              <p className="text-amber-800 font-medium leading-relaxed">Daily Collect is a regulated intermediary. We use CBN-compliant encryption and partner exclusively with licensed deposit-taking institutions. Your funds are never at risk from software failure.</p>
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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {currentView === 'features' && <FeaturesView />}
      {currentView === 'how-it-works' && <HowItWorksView />}
      {currentView === 'pricing' && <PricingView />}
      {currentView === 'advisor' && <AdvisorView />}
      {currentView === 'home' && <HomeView />}
      
      {/* Universal Footer */}
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
                The intermediary platform driving financial inclusion for Nigeria's informal heartbeat.
              </p>
            </div>
            
            {['Services', 'Resources', 'Legal'].map((title, idx) => (
              <div key={idx}>
                <h5 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-500 mb-10">{title}</h5>
                <ul className="space-y-5 text-emerald-100/40 font-bold">
                  {title === 'Services' && ['USSD *555#', 'Revenue Aggregator', 'Levy Remittance', 'Partner Referrals'].map(l => (
                    <li key={l}><button onClick={() => navigateTo('features')} className="hover:text-emerald-400 text-left">{l}</button></li>
                  ))}
                  {title === 'Resources' && ['Kano Operations', 'Lagos Hubs', 'Abuja Network', 'Market Associations'].map(l => (
                    <li key={l}><button onClick={() => navigateTo('how-it-works')} className="hover:text-emerald-400 text-left">{l}</button></li>
                  ))}
                  {title === 'Legal' && ['Privacy Policy', 'KYC Guidelines', 'Partner Terms', 'Safety Protocols'].map(l => (
                    <li key={l}><button className="hover:text-emerald-400 text-left">{l}</button></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-emerald-100/20 text-[10px] font-black uppercase tracking-[0.3em] text-center md:text-left">
              © 2024 DAILY COLLECT WALLET. BUILT FOR NIGERIA.
            </div>
            <div className="flex gap-10 text-[9px] font-black tracking-[0.2em] text-emerald-500/40 uppercase">
              <span>NDIC Insured Partners</span>
              <span>CBN Compliant Gateway</span>
              <span>NIN Verified Merchants</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;