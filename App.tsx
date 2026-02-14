import React, { useState, useEffect, useCallback } from 'react';
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
  Briefcase,
  ChevronLeft,
  ChevronRight as ChevronRightIcon
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

  const Header = () => (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isMenuOpen ? 'bg-[#1a2e2e]' : 'bg-[#1a2e2e]/80 backdrop-blur-lg border-b border-white/5'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-3 group cursor-pointer"
          >
            <LogoComponent />
            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-tight leading-none">Daily Collect</span>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Wallet</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => navigateTo('features')} className={`text-sm font-bold uppercase tracking-widest transition-colors ${currentView === 'features' ? 'text-emerald-400' : 'text-white/60 hover:text-white'}`}>Features</button>
            <button onClick={() => navigateTo('how-it-works')} className={`text-sm font-bold uppercase tracking-widest transition-colors ${currentView === 'how-it-works' ? 'text-emerald-400' : 'text-white/60 hover:text-white'}`}>Process</button>
            <button onClick={() => navigateTo('pricing')} className={`text-sm font-bold uppercase tracking-widest transition-colors ${currentView === 'pricing' ? 'text-emerald-400' : 'text-white/60 hover:text-white'}`}>Fees</button>
            <button onClick={() => navigateTo('advisor')} className={`text-sm font-bold uppercase tracking-widest transition-colors ${currentView === 'advisor' ? 'text-emerald-400' : 'text-white/60 hover:text-white'}`}>AI Advisor</button>
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <div className="relative group">
              <button className="flex items-center gap-2 text-white font-bold text-sm bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                <Languages size={16} className="text-emerald-400" />
                {currentLang}
                <ChevronDown size={14} />
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-[#1a2e2e] border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 z-50">
                {(['English', 'Hausa', 'Yoruba', 'Igbo'] as Language[]).map(lang => (
                  <button 
                    key={lang}
                    onClick={() => setCurrentLang(lang)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${currentLang === lang ? 'bg-emerald-500 text-[#1a2e2e]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => navigateTo('how-it-works')} className="bg-emerald-500 text-[#1a2e2e] px-6 py-3 rounded-xl font-black text-sm hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
              Register Now
            </button>
          </div>

          <button 
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div className={`lg:hidden absolute top-20 left-0 right-0 bg-[#1a2e2e] border-b border-white/10 transition-all duration-500 overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-6 flex flex-col gap-6">
          <button onClick={() => navigateTo('features')} className="text-xl font-black text-white text-left">Features</button>
          <button onClick={() => navigateTo('how-it-works')} className="text-xl font-black text-white text-left">Process</button>
          <button onClick={() => navigateTo('pricing')} className="text-xl font-black text-white text-left">Fees</button>
          <button onClick={() => navigateTo('advisor')} className="text-xl font-black text-white text-left text-emerald-400">AI Advisor</button>
          
          <div className="h-px bg-white/5 my-2"></div>
          
          <div className="flex flex-wrap gap-2">
            {(['English', 'Hausa', 'Yoruba', 'Igbo'] as Language[]).map(lang => (
              <button 
                key={lang}
                onClick={() => setCurrentLang(lang)}
                className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${currentLang === lang ? 'bg-emerald-500 border-emerald-500 text-[#1a2e2e]' : 'border-white/10 text-white/60'}`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button onClick={() => navigateTo('how-it-works')} className="w-full bg-emerald-500 text-[#1a2e2e] py-4 rounded-2xl font-black text-lg mt-4 shadow-xl shadow-emerald-500/20">
            Start Registration
          </button>
        </div>
      </div>
    </header>
  );

  const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
      {
        url: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=1200",
        title: "Bustling Market Life",
        caption: "Secure your daily trade in Kano's Kurmi Market."
      },
      {
        url: "https://images.unsplash.com/photo-1563013544-824ae14f4826?auto=format&fit=crop&q=80&w=1200",
        title: "Digital Payments",
        caption: "Modernize your collections with QR and USSD."
      },
      {
        url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200",
        title: "Empowered Entrepreneurs",
        caption: "Join thousands of traders building a credit history."
      },
      {
        url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200",
        title: "Community Inclusion",
        caption: "Financial tools for every street vendor and artisan."
      },
      {
        url: "https://images.unsplash.com/photo-1556742049-13da73367575?auto=format&fit=crop&q=80&w=1200",
        title: "Success Stories",
        caption: "From local stalls to verified merchant success."
      }
    ];

    const nextSlide = useCallback(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }, [nextSlide]);

    return (
      <div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl group border-4 border-white/10">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={slide.url} alt={slide.title} className="w-full h-full object-cover brightness-[0.7]" />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white font-black text-xl mb-1">{slide.title}</h3>
              <p className="text-emerald-400 font-bold text-sm tracking-wide">{slide.caption}</p>
            </div>
          </div>
        ))}
        
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRightIcon size={24} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-emerald-500 w-6' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  const HomeView = () => (
    <main className="animate-in fade-in duration-700">
      <section className="relative pt-32 lg:pt-48 pb-24 lg:pb-32 bg-[#1a2e2e] overflow-hidden">
        <div className="stars-container">{renderStars(70)}</div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-emerald-500/20 reveal">
                <StarIcon size={14} className="fill-emerald-400 animate-pulse" />
                <span>Digitizing {currentLang === 'English' ? 'Nigeria' : translations[currentLang].dialect}'s Market Hustle</span>
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
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start reveal mb-12">
                <button onClick={() => navigateTo('how-it-works')} className="bg-emerald-500 text-[#1a2e2e] px-12 py-5 rounded-2xl font-black text-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/30 active:scale-95">
                  Start Registration <ArrowRight size={24} />
                </button>
                <div className="bg-white/5 border-2 border-white/10 text-white px-12 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-2">
                   Dial <span className="text-emerald-400">*555#</span>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-8 opacity-40 reveal grayscale text-xs font-bold text-white uppercase tracking-widest">
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> CBN Approved</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> NDIC Insured</div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full reveal">
              <HeroSlider />
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Simulation Section */}
      <section className="py-24 bg-gray-50 border-y border-slate-100">
        <div className="container mx-auto px-4">
           <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-xs mb-4">
                  <Smartphone size={16} /> <span>Try it yourself</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">No Internet? <br /> <span className="text-emerald-600">No Problem.</span></h2>
                <p className="text-xl text-slate-500 mb-8 leading-relaxed font-medium">Daily Collect works on any phone, anywhere in Nigeria. From feature phones to smartphones, your business stays digital.</p>
                <ul className="space-y-4 mb-10">
                   {['Works on all networks (MTN, Glo, Airtel, 9mobile)', 'Fast, reliable and secure USSD *555#', 'Instant SMS confirmation for every trade'].map(item => (
                     <li key={item} className="flex items-center gap-3 font-bold text-slate-700">
                       <CheckCircle2 className="text-emerald-500" size={20} /> {item}
                     </li>
                   ))}
                </ul>
                <button onClick={() => navigateTo('features')} className="text-emerald-600 font-black flex items-center gap-2 group">
                  See All Features <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
              <div className="lg:w-1/2 w-full max-w-lg mx-auto">
                 <USSDSimulator />
              </div>
           </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
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
                  <div key={i} className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-sm reveal flex flex-col justify-between">
                     <div>
                        <MessageCircle className="text-emerald-500 mb-6" size={32} />
                        <p className="text-slate-600 font-medium italic leading-relaxed mb-8">"{story.text}"</p>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-black text-emerald-600 shadow-sm">{story.name[0]}</div>
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
      {currentView === 'home' && <HomeView />}
      {currentView === 'features' && <FeaturesView />}
      {currentView === 'how-it-works' && <HowItWorksView />}
      {currentView === 'pricing' && <PricingView />}
      {currentView === 'advisor' && <AdvisorView />}
      
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
            </div>
            
            {['Services', 'Regional', 'Legal'].map((title, idx) => (
              <div key={idx}>
                <h5 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-500 mb-10">{title}</h5>
                <ul className="space-y-5 text-emerald-100/40 font-bold">
                  {title === 'Services' && ['USSD *555#', 'Revenue Aggregator', 'Levy Remittance', 'Credit Referrals'].map(l => (
                    <li key={l}><button onClick={() => navigateTo('features')} className="hover:text-emerald-400 text-left transition-colors">{l}</button></li>
                  ))}
                  {title === 'Regional' && ['Lagos Hub', 'Kano Network', 'Abuja Markets', 'Port Harcourt'].map(l => (
                    <li key={l}><button onClick={() => navigateTo('home')} className="hover:text-emerald-400 text-left transition-colors">{l}</button></li>
                  ))}
                  {title === 'Legal' && ['Privacy Policy', 'KYC Guidelines', 'Terms', 'Security'].map(l => (
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
    </div>
  );
};

export default App;