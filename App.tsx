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
  ShieldAlert,
  MessageCircle,
  Award,
  ChevronDown,
  ChevronUp,
  Briefcase
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
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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
          alt="Daily Collect Logo" 
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
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
          <button onClick={() => navigateTo('how-it-works')} className="bg-[#1a2e2e] text-white px-7 py-3 rounded-full font-black text-sm hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition-all">
            {translations[currentLang].cta}
          </button>
        </div>

        <button 
          className="lg:hidden p-2 text-slate-900 bg-slate-50 rounded-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

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
    </header>
  );

  const HomeView = () => (
    <main className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-52 pb-24 lg:pb-40 bg-[#1a2e2e] overflow-hidden">
        <div className="stars-container">{renderStars(70)}</div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-emerald-500/20 reveal">
                <StarIcon size={14} className="fill-emerald-400 animate-pulse" />
                <span>Digitizing {currentLang === 'English' ? 'Nigeria' : translations[currentLang].dialect}'s Informal Sector</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.95] tracking-tighter reveal">
                {translations[currentLang].heroTitle.split('.').map((part, i) => (
                  <React.Fragment key={i}>
                    {i === 1 ? <span className="shining-text">{part}</span> : part}
                  </React.Fragment>
                ))}
              </h1>
              <p className="text-xl text-emerald-100/60 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium reveal">
                {translations[currentLang].heroSub} Secure, cashless payments via *555#. Built for street vendors, market traders, and artisans.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start reveal">
                <button onClick={() => navigateTo('how-it-works')} className="bg-emerald-500 text-[#1a2e2e] px-12 py-5 rounded-2xl font-black text-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/30 active:scale-95">
                  Start Registration <ArrowRight size={24} />
                </button>
                <div className="bg-white/5 border-2 border-white/10 text-white px-12 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-2">
                   Dial <span className="text-emerald-400">*555#</span>
                </div>
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

      {/* Partner Trust Section */}
      <section className="py-12 bg-gray-50 border-y border-slate-100">
         <div className="container mx-auto px-4">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">POWERED BY LICENSED NIGERIAN PARTNERS</p>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 grayscale opacity-60">
               <div className="flex items-center gap-2 font-black text-2xl text-slate-900">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg"></div> Moniepoint
               </div>
               <div className="flex items-center gap-2 font-black text-2xl text-slate-900">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg"></div> OPay
               </div>
               <div className="flex items-center gap-2 font-black text-2xl text-slate-900">
                  <div className="w-8 h-8 bg-yellow-400 rounded-lg"></div> MTN MoMo
               </div>
               <div className="flex items-center gap-2 font-black text-2xl text-slate-900">
                  <div className="w-8 h-8 bg-red-600 rounded-lg"></div> PalmPay
               </div>
            </div>
         </div>
      </section>

      {/* Regional Focus Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
           <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="lg:w-1/2 reveal">
                 <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">Serving the Heart <br /> of <span className="text-emerald-600">Nigerian Commerce.</span></h2>
                 <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium">Daily Collect is designed for the reality of Nigeria's informal sector. We bridge the gap between cash-based trade and digital financial growth.</p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                       { city: "Lagos", market: "Balogun & Alaba", feature: "Fast QR Settlements" },
                       { city: "Kano", market: "Sabon Gari & Kurmi", feature: "Offline USSD Access" },
                       { city: "Abuja", market: "Wuse & Garki", feature: "Levy Compliance" },
                       { city: "Onitsha", market: "Main Market", feature: "Bulk Collection" }
                    ].map((item, i) => (
                       <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-emerald-600 hover:border-emerald-600 transition-all">
                          <MapPin className="text-emerald-500 mb-4 group-hover:text-white" />
                          <h4 className="font-black text-slate-900 group-hover:text-white text-lg">{item.city}</h4>
                          <p className="text-slate-500 group-hover:text-emerald-100 text-sm">{item.market}</p>
                          <div className="mt-4 text-[10px] font-black uppercase tracking-widest text-emerald-600 group-hover:text-white">{item.feature}</div>
                       </div>
                    ))}
                 </div>
              </div>
              <div className="lg:w-1/2 relative reveal">
                 <div className="relative z-10 bg-[#1a2e2e] p-12 rounded-[4rem] text-white shadow-3xl">
                    <Award className="text-yellow-400 mb-8" size={64} />
                    <h3 className="text-3xl font-black mb-6 leading-tight">Driving Inclusion at Scale</h3>
                    <div className="space-y-6">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-black text-emerald-400">80%</div>
                          <p className="font-medium text-emerald-100/60">Informal workforce contribution to GDP</p>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-black text-emerald-400">1M+</div>
                          <p className="font-medium text-emerald-100/60">Targeted merchants by 2026</p>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-black text-emerald-400">0%</div>
                          <p className="font-medium text-emerald-100/60">Monthly maintenance fees for traders</p>
                       </div>
                    </div>
                 </div>
                 <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
              </div>
           </div>
        </div>
      </section>

      {/* Testimonials / Success Stories */}
      <section className="py-24 bg-gray-50">
         <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16 reveal">
               <h2 className="text-4xl font-black text-slate-900 mb-4">Stories from the Market</h2>
               <p className="text-slate-500 font-medium">Real impact on real traders across Nigeria.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
               {[
                  { name: "Oga Ibrahim", role: "Tomato Wholesaler, Kano", text: "Before Daily Collect, I struggled with counting cash at 5 PM. Now, my collections are digital, and I applied for my first Moniepoint loan via the app!" },
                  { name: "Madam Chidimma", role: "Textiles, Onitsha", text: "I like that I can pay my market association dues (*555#) directly. No more manual receipts or losing paper records. Everything is clear." },
                  { name: "Ayo", role: "Shoemaker, Mushin", text: "My customers just dial the code and pay. I get an SMS immediately. It has saved me from thieves who target cash in the evening." }
               ].map((story, i) => (
                  <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm reveal flex flex-col justify-between">
                     <div>
                        <MessageCircle className="text-emerald-500 mb-6" size={32} />
                        <p className="text-slate-600 font-medium italic leading-relaxed mb-8">"{story.text}"</p>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-black text-emerald-600">{story.name[0]}</div>
                        <div>
                           <div className="font-black text-slate-900">{story.name}</div>
                           <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">{story.role}</div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-black text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
               {[
                  { q: "Do I need internet to use Daily Collect?", a: "No. You can access all business features including registration, collections, and withdrawals via the USSD code *555# on any phone." },
                  { q: "Is my money safe?", a: "Daily Collect is an intermediary aggregator. Your funds are held by licensed partners like OPay and Moniepoint, which are regulated by the CBN and insured by NDIC." },
                  { q: "How much are the transaction fees?", a: "Registration is free. Digital collection fees range from 0.5% to 1%, capped at ₦500. Levy processing is a flat ₦10-₦50 fee." },
                  { q: "How do I get my cash out?", a: "Generate a withdrawal code via *555# and visit any OPay or Moniepoint agent, or any partnered market shop to get your cash." },
                  { q: "Can I use it in Hausa or Yoruba?", a: "Yes. Our USSD menu and App support English, Hausa, Yoruba, and Igbo to ensure every trader feels at home." }
               ].map((faq, i) => (
                  <div key={i} className="reveal border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                     <button 
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                     >
                        <span className="font-black text-slate-900">{faq.q}</span>
                        {activeFaq === i ? <ChevronUp className="text-emerald-500" /> : <ChevronDown className="text-emerald-500" />}
                     </button>
                     {activeFaq === i && (
                        <div className="p-6 pt-0 bg-slate-50 text-slate-600 font-medium leading-relaxed animate-in slide-in-from-top-4 duration-300">
                           {faq.a}
                        </div>
                     )}
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#1a2e2e] relative overflow-hidden">
         <div className="stars-container opacity-20">{renderStars(50)}</div>
         <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">Ready to Scale Your <br /> <span className="shining-text">Market Hustle?</span></h2>
            <p className="text-xl text-emerald-100/60 mb-12 max-w-2xl mx-auto font-medium">Join 100,000+ traders already using Daily Collect to build a digital trail for loans and secure revenue.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
               <button onClick={() => navigateTo('how-it-works')} className="bg-emerald-500 text-[#1a2e2e] px-12 py-5 rounded-2xl font-black text-xl hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/30">Get Started Today</button>
               <button className="bg-white/5 border-2 border-white/10 text-white px-12 py-5 rounded-2xl font-black text-xl">Dial *555#</button>
            </div>
         </div>
      </section>
    </main>
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
              <p className="text-amber-800 font-medium leading-relaxed">Daily Collect is a regulated intermediary. We use CBN-compliant encryption and partner exclusively with licensed deposit-taking institutions. Your funds are never at risk.</p>
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

  const HeaderWrap = () => <Header />;

  return (
    <div className="min-h-screen bg-white">
      <HeaderWrap />
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
                Leading USSD revenue aggregator for Nigeria's informal heartbeat. From markets to banks.
              </p>
              <div className="flex gap-4">
                 {[Globe, Briefcase, TrendingUp].map((Icon, idx) => (
                    <div key={idx} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                       <Icon size={18} className="text-emerald-400" />
                    </div>
                 ))}
              </div>
            </div>
            
            {['Services', 'Regional', 'Legal'].map((title, idx) => (
              <div key={idx}>
                <h5 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-500 mb-10">{title}</h5>
                <ul className="space-y-5 text-emerald-100/40 font-bold">
                  {title === 'Services' && ['USSD *555# Gateway', 'Revenue Aggregator', 'Levy Remittance', 'Partner Credit Referrals'].map(l => (
                    <li key={l}><button onClick={() => navigateTo('features')} className="hover:text-emerald-400 text-left transition-colors">{l}</button></li>
                  ))}
                  {title === 'Regional' && ['Lagos Balogun Hub', 'Kano Sabon Gari Network', 'Abuja Central Markets', 'Port Harcourt Operations'].map(l => (
                    <li key={l}><button onClick={() => navigateTo('home')} className="hover:text-emerald-400 text-left transition-colors">{l}</button></li>
                  ))}
                  {title === 'Legal' && ['Privacy Policy', 'KYC & Compliance', 'Terms of Service', 'Security Protocols'].map(l => (
                    <li key={l}><button className="hover:text-emerald-400 text-left transition-colors">{l}</button></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-emerald-100/20 text-[10px] font-black uppercase tracking-[0.3em] text-center md:text-left">
              © 2024 DAILY COLLECT WALLET. DRIVING FINANCIAL INCLUSION ACROSS NIGERIA.
            </div>
            <div className="flex gap-10 text-[9px] font-black tracking-[0.2em] text-emerald-500/40 uppercase">
               <span className="flex items-center gap-2"><ShieldCheck size={12} /> NDIC Insured</span>
               <span className="flex items-center gap-2"><Lock size={12} /> SSL Encrypted</span>
               <span className="flex items-center gap-2"><Building2 size={12} /> CBN Registered</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default App;