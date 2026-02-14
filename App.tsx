import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  ChevronRight as ChevronRightIcon,
  Store,
  CreditCard,
  History,
  FileText,
  Target,
  Rocket,
  Heart,
  Search,
  PieChart,
  Shield
} from 'lucide-react';
import USSDSimulator from './components/USSDSimulator';
import BusinessAdvisor from './components/BusinessAdvisor';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { User } from './types';

type View = 'home' | 'features' | 'how-it-works' | 'pricing' | 'advisor' | 'about' | 'login' | 'register' | 'dashboard';
type Language = 'English' | 'Hausa' | 'Yoruba' | 'Igbo';

// --- Static Data Moved Outside for Stability ---

const TRANSLATIONS = {
  English: {
    nav: { features: "Features", process: "Process", fees: "Fees", advisor: "AI Advisor", register: "Register Now", about: "About Us", dashboard: "Dashboard", login: "Login" },
    hero: {
      title: "Nigeria's Most Trusted Wallet.",
      sub: "From Sabon Gari to Balogun Market, Daily Collect secures every kobo through simple USSD access.",
      cta: "Start Registration",
      ussdLabel: "Dial *555#",
      badge: "Digitizing Nigeria's Market Hustle"
    },
    benefits: {
      title: "Why Choose Daily Collect?",
      sub: "Financial tools built for the realities of Nigerian trade.",
      items: [
        { icon: <Smartphone size={32} />, title: "No Data Needed", desc: "Access everything via *555#. Works on 'small' phones without internet." },
        { icon: <Lock size={32} />, title: "Theft Protection", desc: "Stop carrying bulk cash. Your daily sales are stored safely in a digital wallet." },
        { icon: <TrendingUp size={32} />, title: "Credit Builder", desc: "Every transaction builds a digital trail that helps you secure loans from partners." },
        { icon: <ShieldCheck size={32} />, title: "CBN Partners", desc: "Regulated by licensed partners including OPay, Moniepoint, and PalmPay." }
      ]
    },
    trust: {
      simulator: "Try the *555# Simulator",
      title: "No Internet? No Problem.",
      sub: "Daily Collect works on any phone, anywhere in Nigeria. From feature phones to smartphones, your business stays digital.",
      features: ["Works on all networks", "Fast USSD Gateway", "Instant SMS Alerts"],
      more: "See All Features"
    },
    levy: {
      title: "Hassle-Free Levies",
      sub: "Pay association dues and government taxes without leaving your stall.",
      items: [
        { icon: <Store size={24} />, title: "Market Association Dues", desc: "Auto-deduct or manually pay daily/weekly association fees." },
        { icon: <Building2 size={24} />, title: "Government Taxes (KIRS/LIRS)", desc: "Directly remit to state agencies like Kano Internal Revenue Service." },
        { icon: <FileText size={24} />, title: "Instant Receipts", desc: "Get SMS confirmation codes that serve as proof of payment." }
      ]
    },
    agent: {
      title: "Cash In, Cash Out Anywhere",
      sub: "Withdraw your funds through our massive partner network of agents.",
      desc: "Turn your digital earnings into physical cash instantly at any Moniepoint or OPay agent shop in the market. No need for a long bank queue."
    },
    stories: {
      title: "Stories from the Market",
      sub: "Real impact on real traders across Nigeria.",
      items: [
        { name: "Malam Yusuf", role: "Tomato Wholesaler, Kano", text: "Daily Collect has saved me from the fear of carrying cash home after a long day in Sabon Gari market." },
        { name: "Mrs. Adebayo", role: "Artisan, Lagos", text: "Paying my market dues is now so easy. I just dial *555# and I am compliant. No more harassment." }
      ]
    },
    footer: {
      desc: "Leading USSD revenue aggregator for Nigeria's informal heartbeat. From markets to banks.",
      copyright: "© 2024 DAILY COLLECT WALLET. DRIVING FINANCIAL INCLUSION ACROSS NIGERIA."
    }
  },
  Hausa: {
    nav: { features: "Siffofi", process: "Tsari", fees: "Kudade", advisor: "Mashawarcin AI", register: "Yi Rajista Yanzu", about: "Game da Mu", dashboard: "Dashboard", login: "Shiga" },
    hero: {
      title: "Aljihun Digital Mafi Amintacciya.",
      sub: "Daga Sabon Gari zuwa Kasuwar Balogun, Daily Collect yana kiyaye kowane kobo ta hanyar USSD mai sauki.",
      cta: "Fara Rajista",
      ussdLabel: "Kira *555#",
      badge: "Inganta Kasuwannin Najeriya"
    },
    benefits: {
      title: "Me ya sa za ku zabi Daily Collect?",
      sub: "Kayan aikin kudi da aka gina don kasuwancin Najeriya.",
      items: [
        { icon: <Smartphone size={32} />, title: "Babu Bukatar Data", desc: "Sami komai ta *555#. Yana aiki akan kowace irin waya." },
        { icon: <Lock size={32} />, title: "Kariya daga Sata", desc: "Daina yawo da kudi da yawa. Kudaden ka suna nan lafiya a digital wallet." },
        { icon: <TrendingUp size={32} />, title: "Samun Lamuni", desc: "Dukkan kasuwancin ka yana taimaka maka wajen samun bashi daga bankuna." },
        { icon: <ShieldCheck size={32} />, title: "Amintattun Abokan Hulda", desc: "OPay, Moniepoint, da PalmPay suna kiyaye kudaden ku." }
      ]
    },
    trust: {
      simulator: "Gwada *555# Simulator",
      title: "Babu Internet? Babu Matsala.",
      sub: "Daily Collect yana aiki akan kowace waya, ko'ina a Najeriya. Kasuwancin ku zai cigaba da kasancewa a matakin digital.",
      features: ["Yana aiki akan kowane network", "USSD mai sauri", "Sakon SMS nan take"],
      more: "Duba dukkan Siffofin"
    },
    levy: {
      title: "Biyan Kudade Cikin Sauki",
      sub: "Biya kudaden kungiya da harajin gwamnati ba tare da ka bar shagon ka ba.",
      items: [
        { icon: <Store size={24} />, title: "Kudaden Kungiyar Kasuwa", desc: "Biya kudaden kungiya na yau da kullun ko na mako-mako." },
        { icon: <Building2 size={24} />, title: "Harajin Gwamnati", desc: "Tura haraji kai tsaye zuwa ga hukumomi kamar KIRS." },
        { icon: <FileText size={24} />, title: "Rasit Nan Take", desc: "Sami sakon SMS a matsayin shedar biya." }
      ]
    },
    agent: {
      title: "Cire Kudi Ko'ina",
      sub: "Cire kudaden ka ta hanyar abokan huldan mu.",
      desc: "Canza kudaden ka na digital zuwa tsaba nan take a kowane shagon Moniepoint ko OPay a kasuwa."
    },
    stories: {
      title: "Labarai daga Kasuwa",
      sub: "Tasiri na gaske akan yan kasuwa a fadin Najeriya.",
      items: [
        { name: "Malam Yusuf", role: "Me sayar da Tumatir, Kano", text: "Daily Collect ya taba taimaka mini sosai wajen kiyaye kudadena daga barayi." },
        { name: "Mrs. Adebayo", role: "Mai sana'ar hannu, Lagos", text: "Biyan kudaden kungiya ya zama abu mai sauki yanzu." }
      ]
    },
    footer: {
      desc: "Babban mai tara kudaden shiga na USSD ga zuciyar Najeriya. Daga kasuwanni zuwa bankuna.",
      copyright: "© 2024 DAILY COLLECT WALLET. KYAUTATA HARKAR KUDI A NAJERIYA."
    }
  },
  Yoruba: {
    nav: { features: "Àwọn Àwòrán", process: "Ìlànà", fees: "Àwọn Owó", advisor: "Olùdámọ̀ràn AI", register: "Forúkọsílẹ̀ Nísinsìnyí", about: "Nípa Wa", dashboard: "Dashboard", login: "Wọlé" },
    hero: {
      title: "Àpò Digital Tí Ó Jẹ́ Amúyẹ Jùlọ.",
      sub: "Láti Ọjà Balogun dé ibikíbi, Daily Collect ń sọ́ gbogbo kóbò rẹ pẹ̀lú kòòdù USSD tó rọrùn.",
      cta: "Bẹ̀rẹ̀ Ìforúkọsílẹ̀",
      ussdLabel: "Tẹ *555#",
      badge: "Sísọ Ọjà Nàìjíríà di Digital"
    },
    benefits: {
      title: "Èéṣe tí ẹ ó fi yan Daily Collect?",
      sub: "Àwọn irinṣẹ́ ìṣúná tí a kọ́ fún iṣẹ́-òwò ní Nàìjíríà.",
      items: [
        { icon: <Smartphone size={32} />, title: "Kò sí Íńtánẹ́ẹ̀tì", desc: "Lo gbogbo rẹ̀ nípasẹ̀ *555#. Ó ń ṣiṣẹ́ lórí fónù kékeré." },
        { icon: <Lock size={32} />, title: "Ìdáàbòbò lọ́wọ́ Olè", desc: "Dẹ́kun gbigbe owó púpọ̀ dání. Owó rẹ wà ní àpò digital." },
        { icon: <TrendingUp size={32} />, title: "Ìdàgbàsókè Ìwìn Owó", desc: "Ìtàn ìṣòwò rẹ yóò ràn ọ́ lọ́wọ́ láti gba awin lọ́wọ́ àwọn báńkì." },
        { icon: <ShieldCheck size={32} />, title: "Àwọn Alábàáṣiṣẹ́ CBN", desc: "OPay, Moniepoint, àti PalmPay ni wọ́n ń ṣọ́ owó rẹ." }
      ]
    },
    trust: {
      simulator: "Dán *555# Simulator wò",
      title: "Kò sí Íńtánẹ́ẹ̀tì? Kò sí ìṣòro.",
      sub: "Daily Collect ń ṣiṣẹ́ lórí fónù èyíkéyìí, níbikíbi ní Nàìjíríà. Iṣẹ́ rẹ yóò di digital pẹ̀lú wa.",
      features: ["Ó ń ṣiṣẹ́ lórí gbogbo nẹ́tíwọ́ọ̀kì", "USSD tó yá", "SMS lẹ́sẹ̀kẹsẹ̀"],
      more: "Wo gbogbo Àwòrán"
    },
    levy: {
      title: "Ìsanwó láìsí Ìṣòro",
      sub: "San owó ẹgbẹ́ àti owó-orí ìjọba láì kúrò níbi iṣẹ́ rẹ.",
      items: [
        { icon: <Store size={24} />, title: "Owó Ẹgbẹ́ Ọjà", desc: "San owó ẹgbẹ́ rẹ ní ojoojúmọ́ tàbí lọ́sẹ̀ọ̀sẹ̀." },
        { icon: <Building2 size={24} />, title: "Owó-Orí Ìjọba", desc: "San owó-orí rẹ ní tààràtà sí àwọn iléeṣẹ́ ìjọba." },
        { icon: <FileText size={24} />, title: "Ìfọwọ́sowọ́pọ̀ Lẹ́sẹ̀kẹsẹ̀", desc: "Gba SMS tó jẹ́ ẹ̀rí ìsanwó rẹ lẹ́sẹ̀kẹsẹ̀." }
      ]
    },
    agent: {
      title: "Gba Owó níbikíbi",
      sub: "Gba owó rẹ nípasẹ̀ nẹ́tíwọ́ọ̀kì àwọn aṣojú wa.",
      desc: "Yí owó digital rẹ padà sí owó tsaba ní tààràtà ní ṣọ́ọ̀bù Moniepoint tàbí OPay èyíkéyìí."
    },
    stories: {
      title: "Àwọn Ìtàn láti Ọjà",
      sub: "Ìpa gidi lórí àwọn oníṣòwò kárí Nàìjíríà.",
      items: [
        { name: "Malam Yusuf", role: "Tomato Wholesaler, Kano", text: "Daily Collect has saved me from the fear of carrying cash." },
        { name: "Mrs. Adebayo", role: "Artisan, Lagos", text: "Paying my market dues is now so easy." }
      ]
    },
    footer: {
      desc: "Olùkójọ kudaden shiga USSD tó jà fáfá fún Nàìjíríà. Láti ọjà sí báńkì.",
      copyright: "© 2024 DAILY COLLECT WALLET. ÌGBÉGA ÌRÒNÙ ÌṢÚNÁ NÍ NÀÌJÍRÍÀ."
    }
  },
  Igbo: {
    nav: { features: "Atụmatụ", process: "Usoro", fees: "Ego", advisor: "Onye Ndụmọdụ AI", register: "Debanye aha ugbu a", about: "Gbasara Anyị", dashboard: "Dashboard", login: "Nbanye" },
    hero: {
      title: "Akpa Ego Digital Kasị Tụnyere.",
      sub: "Site n'ahịa Onitsha gaa Balogun, Daily Collect na-echekwa ego gị niile site na koodu USSD dị mfe.",
      cta: "Malite Ndebanye aha",
      ussdLabel: "Pịa *555#",
      badge: "Ịme ka Azụmaahịa Naịjirịa gaa n'ihu"
    },
    benefits: {
      title: "Gịnị kpatara ị ga-eji họrọ Daily Collect?",
      sub: "Ngwá ọrụ ego e wuru maka azụmaahịa Naịjirịa.",
      items: [
        { icon: <Smartphone size={32} />, title: "Enweghị Bukatar Data", desc: "Nweta ihe niile site na *555#. Ọ na-arụ ọrụ na obere ekwentị." },
        { icon: <Lock size={32} />, title: "Nchedo pụọ n'Aka n'Aka", desc: "Kwụsị ibu ego n'aka. Ego gị dị mma na akpa digital." },
        { icon: <TrendingUp size={32} />, title: "Inweta mbinye ego", desc: "Akụkọ azụmaahịa gị ga-enyere gị aka inweta mbinye ego n'aka ụlọ akụ." },
        { icon: <ShieldCheck size={32} />, title: "Ndị mmekọ CBN", desc: "OPay, Moniepoint, na PalmPay na-echekwa ego gị." }
      ]
    },
    trust: {
      simulator: "Nwaa *555# Simulator",
      title: "Enweghị Interneti? Enweghị nsogbu.",
      sub: "Daily Collect na-arụ ọrụ na ekwentị ọ bụla, ebe ọ bụla na Naịjirịa. Azụmaahịa gị ga-adị mma.",
      features: ["Ọ na-arụ ọrụ na netwọk niile", "USSD dị ngwa", "Sakon SMS ozugbo"],
      more: "Hụ Atụmatụ niile"
    },
    levy: {
      title: "Ịkwụ Ụgwọ n'Enweghị Nsogbu",
      sub: "Kwụọ ụgwọ otu na ụtụ isi gọọmentị n'ebughị ụzọ pụọ n'ụlọ ahịa gị.",
      items: [
        { icon: <Store size={24} />, title: "Ụgwọ Otu Ahịa", desc: "Kwụọ ụgwọ otu gị kwa ụbọchị ma ọ bụ kwa izu." },
        { icon: <Building2 size={24} />, title: "Utu Isi Gọọmentị", desc: "Zipụ ụtụ isi gị ozugbo na gọọmentị." },
        { icon: <FileText size={24} />, title: "Nkwenye ozugbo", desc: "Nweta SMS nkwenye ozugbo dị ka ihe akaebe." }
      ]
    },
    agent: {
      title: "Wepụ Ego ebe ọ bụla",
      sub: "Wepụ ego gị site na ndị nnọchi anya anyị.",
      desc: "Gbanwee ego digital gị ka ọ bụrụ ego n'aka ozugbo na ụlọ ahịa Moniepoint ma ọ bụ OPay ọ bụla."
    },
    stories: {
      title: "Akụkọ si n'Ahịa",
      sub: "Ezigbo mmetụta n'ahụ ndị ahịa na Naịjirịa niile.",
      items: [
        { name: "Malam Yusuf", role: "Tomato Wholesaler, Kano", text: "Daily Collect has saved me from the fear of carrying cash." },
        { name: "Mrs. Adebayo", role: "Artisan, Lagos", text: "Paying my market dues is now so easy." }
      ]
    },
    footer: {
      desc: "Onye ndu na nchịkọta kudaden shiga USSD maka Naịjirịa. Site n'ahịa gaa n'ụlọ akụ.",
      copyright: "© 2024 DAILY COLLECT WALLET. ỊKWALITE ỊGỤNAYE MMADỤ NIILE N'AZỤMAAHỊA NA NAỊJỊRỊA."
    }
  }
};

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

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = useMemo(() => [
    {
      url: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=1200",
      title: "Bustling Market Life",
      caption: "Secure your daily trade in Kano's Kurmi Market."
    },
    {
      url: "https://images.unsplash.com/photo-1603513346479-79a8e0300625?auto=format&fit=crop&q=80&w=1200",
      title: "Digital Payments",
      caption: "Modernize your collections with QR and USSD."
    },
    {
      url: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&q=80&w=1200",
      title: "Empowered Entrepreneurs",
      caption: "Join thousands of traders building a credit history."
    },
    {
      url: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&q=80&w=1200",
      title: "Community Inclusion",
      caption: "Financial tools for every street vendor and artisan."
    }
  ], []);

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
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronLeft size={24} />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRightIcon size={24} />
      </button>
    </div>
  );
};

// --- App Component ---

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');
  const [currentLang, setCurrentLang] = useState<Language>('English');
  const [user, setUser] = useState<User | null>(null);

  const t = TRANSLATIONS[currentLang];

  useEffect(() => {
    const savedUser = localStorage.getItem('daily_collect_current_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setCurrentView('dashboard');
      } catch (e) {
        localStorage.removeItem('daily_collect_current_user');
      }
    }
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [currentView, isLoading]);

  const navigateTo = (view: View) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    localStorage.setItem('daily_collect_current_user', JSON.stringify(authenticatedUser));
    navigateTo('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('daily_collect_current_user');
    navigateTo('home');
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

  const Header = () => (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isMenuOpen ? 'bg-[#1a2e2e]' : 'bg-[#1a2e2e]/80 backdrop-blur-lg border-b border-white/5'}`}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div onClick={() => navigateTo('home')} className="flex items-center gap-3 cursor-pointer">
          <LogoComponent />
          <div className="flex flex-col">
            <span className="text-xl font-black text-white leading-none">Daily Collect</span>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Wallet</span>
          </div>
        </div>
        <nav className="hidden lg:flex items-center gap-6">
          <button onClick={() => navigateTo('features')} className={`text-sm font-bold uppercase tracking-widest transition-colors ${currentView === 'features' ? 'text-emerald-400' : 'text-white/60 hover:text-white'}`}>{t.nav.features}</button>
          <button onClick={() => navigateTo('how-it-works')} className={`text-sm font-bold uppercase tracking-widest transition-colors ${currentView === 'how-it-works' ? 'text-emerald-400' : 'text-white/60 hover:text-white'}`}>{t.nav.process}</button>
          <button onClick={() => navigateTo('about')} className={`text-sm font-bold uppercase tracking-widest transition-colors ${currentView === 'about' ? 'text-emerald-400' : 'text-white/60 hover:text-white'}`}>{t.nav.about}</button>
          <button onClick={() => navigateTo('advisor')} className={`text-sm font-bold uppercase tracking-widest transition-colors ${currentView === 'advisor' ? 'text-emerald-400' : 'text-white/60 hover:text-white'}`}>{t.nav.advisor}</button>
        </nav>
        <div className="hidden lg:flex items-center gap-6">
          <div className="relative group">
            <button className="flex items-center gap-2 text-white font-bold text-sm bg-white/5 px-4 py-2 rounded-xl border border-white/10">
              <Languages size={16} className="text-emerald-400" /> {currentLang} <ChevronDown size={14} />
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-[#1a2e2e] border border-white/10 rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2">
              {(['English', 'Hausa', 'Yoruba', 'Igbo'] as Language[]).map(lang => (
                <button key={lang} onClick={() => setCurrentLang(lang)} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${currentLang === lang ? 'bg-emerald-500 text-[#1a2e2e]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>{lang}</button>
              ))}
            </div>
          </div>
          {user ? (
            <button onClick={() => navigateTo('dashboard')} className="bg-emerald-500 text-[#1a2e2e] px-6 py-3 rounded-xl font-black text-sm">{t.nav.dashboard}</button>
          ) : (
            <div className="flex gap-4 items-center">
              <button onClick={() => navigateTo('login')} className="text-white font-black text-sm hover:text-emerald-400">{t.nav.login}</button>
              <button onClick={() => navigateTo('register')} className="bg-emerald-500 text-[#1a2e2e] px-6 py-3 rounded-xl font-black text-sm">{t.nav.register}</button>
            </div>
          )}
        </div>
        <button className="lg:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
      </div>
    </header>
  );

  const HomeView = () => (
    <main className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-48 pb-24 lg:pb-32 bg-[#1a2e2e] overflow-hidden">
        <div className="stars-container">{renderStars(70)}</div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-emerald-500/20 reveal">
              <StarIcon size={14} className="fill-emerald-400 animate-pulse" /> <span>{t.hero.badge}</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
              {t.hero.title.split('.').map((part, i) => (
                <React.Fragment key={i}>
                  {i === 1 ? <span className="shining-text">{part}</span> : part}
                </React.Fragment>
              ))}
            </h1>
            <p className="text-xl text-emerald-100/60 mb-10 max-w-2xl mx-auto lg:mx-0 font-medium">{t.hero.sub}</p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start reveal mb-12">
              <button onClick={() => navigateTo('register')} className="bg-emerald-500 text-[#1a2e2e] px-12 py-5 rounded-2xl font-black text-xl hover:bg-emerald-400 flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-emerald-500/30">
                {t.hero.cta} <ArrowRight size={24} />
              </button>
              <div className="bg-white/5 border-2 border-white/10 text-white px-12 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-2">
                 {t.hero.ussdLabel}
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full reveal"><HeroSlider /></div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">{t.benefits.title}</h2>
            <p className="text-xl text-slate-500 font-medium">{t.benefits.sub}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.benefits.items.map((item, idx) => (
              <div key={idx} className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:bg-emerald-50 transition-all group reveal">
                <div className="text-emerald-600 mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-xl font-black text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Levy Automation Section - RESTORED */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 reveal">
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">{t.levy.title}</h2>
              <p className="text-xl text-slate-400 mb-12 font-medium">{t.levy.sub}</p>
              <div className="space-y-8">
                {t.levy.items.map((item, idx) => (
                  <div key={idx} className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white mb-2">{item.title}</h4>
                      <p className="text-slate-400 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 reveal">
              <div className="bg-emerald-500/10 p-12 rounded-[4rem] border border-emerald-500/20 backdrop-blur-xl">
                 <div className="text-emerald-400 text-6xl font-black mb-4">₦10-50</div>
                 <p className="text-emerald-100/60 font-black uppercase tracking-[0.2em] text-sm">Processing Fee</p>
                 <div className="h-px bg-white/10 my-10"></div>
                 <p className="text-lg text-emerald-100/40 leading-relaxed italic">
                   "Automating our daily stall fees has reduced leakages by 40% and improved our association's budget for market cleaning."
                 </p>
                 <div className="mt-8 flex items-center gap-4">
                   <div className="w-12 h-12 bg-white/10 rounded-full"></div>
                   <div>
                     <div className="font-black text-white">Chief Okafor</div>
                     <div className="text-xs text-emerald-400 font-bold">Market Association Chairman</div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </section>

      {/* Trust & Simulator Section */}
      <section className="py-24 bg-gray-50 border-y border-slate-100 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 reveal">
            <div className="inline-flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-xs mb-4">
              <Smartphone size={16} /> <span>{t.trust.simulator}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">{t.trust.title}</h2>
            <p className="text-xl text-slate-500 mb-8 font-medium">{t.trust.sub}</p>
            <ul className="space-y-4 mb-10">
               {t.trust.features.map(item => (
                 <li key={item} className="flex items-center gap-3 font-bold text-slate-700">
                   <CheckCircle2 className="text-emerald-500" size={20} /> {item}
                 </li>
               ))}
            </ul>
            <button onClick={() => navigateTo('how-it-works')} className="inline-flex items-center gap-2 text-emerald-600 font-black group">
              Learn the full process <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
          <div className="lg:w-1/2 w-full max-w-lg mx-auto reveal"><USSDSimulator /></div>
        </div>
      </section>

      {/* Agent Network Section - RESTORED */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 order-2 lg:order-1 reveal">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-xl rotate-[-2deg]" alt="POS Agent" />
                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-xl rotate-[2deg] translate-y-12" alt="Market POS" />
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 reveal">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">{t.agent.title}</h2>
              <p className="text-xl text-emerald-600 font-black mb-6 uppercase tracking-widest text-sm">{t.agent.sub}</p>
              <p className="text-xl text-slate-500 mb-10 font-medium leading-relaxed">{t.agent.desc}</p>
              <div className="flex items-center gap-8 grayscale opacity-50">
                <span className="font-black text-slate-400 text-2xl tracking-tighter uppercase">Moniepoint</span>
                <span className="font-black text-slate-400 text-2xl tracking-tighter uppercase">OPay</span>
                <span className="font-black text-slate-400 text-2xl tracking-tighter uppercase">PalmPay</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Section - RESTORED */}
      <section className="py-24 bg-emerald-50">
        <div className="container mx-auto px-4 text-center">
           <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">{t.stories.title}</h2>
           <p className="text-xl text-slate-500 font-medium mb-20">{t.stories.sub}</p>
           <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             {t.stories.items.map((item, idx) => (
               <div key={idx} className="bg-white p-10 rounded-[3rem] text-left border border-slate-100 shadow-sm reveal">
                 <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 bg-emerald-500 rounded-2xl"></div>
                   <div>
                     <div className="font-black text-slate-900">{item.name}</div>
                     <div className="text-xs text-emerald-600 font-bold uppercase">{item.role}</div>
                   </div>
                 </div>
                 <p className="text-slate-600 font-medium italic leading-relaxed">"{item.text}"</p>
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
        <button onClick={() => navigateTo('home')} className="inline-flex items-center gap-2 text-emerald-400 font-bold mb-8 hover:text-emerald-300">
          <ArrowLeft size={18} /> Back to Home
        </button>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
          {title} <br /> <span className="shining-text">{highlight}.</span>
        </h1>
        <p className="text-xl text-emerald-100/60 max-w-2xl font-medium leading-relaxed">{description}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  );

  const AboutView = () => (
    <div className="bg-gray-50 min-h-screen animate-in slide-in-from-right duration-500">
      <SubPageHero title="Our Mission &" highlight="Commitment" description="Daily Collect is dedicated to bringing digital financial dignity to Nigeria's informal heartbeat." />
      <div className="container mx-auto px-4 py-24 max-w-4xl space-y-24">
        <div className="grid md:grid-cols-2 gap-16 items-center reveal">
          <div>
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-8"><Target size={32} /></div>
            <h2 className="text-3xl font-black text-slate-900 mb-6">Our Vision</h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed">We envision a Nigeria where every street vendor, from Lagos to Kano, has access to the same financial tools as a major corporation.</p>
          </div>
          <div className="bg-white p-4 rounded-[3rem] shadow-xl border border-slate-100 rotate-2 hover:rotate-0 transition-transform">
             <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800" className="rounded-[2.5rem]" alt="Market" />
          </div>
        </div>
      </div>
    </div>
  );

  const FeaturesView = () => (
    <div className="bg-gray-50 min-h-screen animate-in slide-in-from-right duration-500">
      <SubPageHero 
        title="Comprehensive" 
        highlight="Business Tools" 
        description="Daily Collect isn't just a wallet; it's a complete operating system for the informal economy." 
      />
      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              icon: <Smartphone className="text-blue-500" />, 
              title: "Unified USSD Gateway", 
              desc: "Dial *555# on any network (MTN, Glo, Airtel, 9mobile). Register, check balance, and pay levies in seconds without needing a smartphone." 
            },
            { 
              icon: <QrCode className="text-emerald-500" />, 
              title: "Smart Merchant IDs", 
              desc: "Every trader receives a unique Wallet Reference (WR) code. Display it at your stall for customers to pay via QR or bank transfer." 
            },
            { 
              icon: <Coins className="text-amber-500" />, 
              title: "Hybrid Revenue Tracking", 
              desc: "Digital payments are logged automatically. Log your daily physical cash sales via USSD to get a 100% view of your business health." 
            },
            { 
              icon: <ShieldCheck className="text-purple-500" />, 
              title: "Association Dues Automation", 
              desc: "Set and forget. Auto-remit your weekly market association dues and stall fees directly from your digital balance." 
            },
            { 
              icon: <PieChart className="text-rose-500" />, 
              title: "Digital Credit Scoring", 
              desc: "Your consistent transaction history builds a digital profile. We partner with banks to offer micro-loans based on your real performance." 
            },
            { 
              icon: <Building2 className="text-cyan-500" />, 
              title: "Government Tax Portal", 
              desc: "Pay your state income taxes (KIRS, LIRS, etc.) through our verified government links. Get instant SMS proof of payment." 
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all reveal group">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {currentView === 'home' && <HomeView />}
      {currentView === 'features' && <FeaturesView />}
      {currentView === 'about' && <AboutView />}
      {currentView === 'how-it-works' && <div className="bg-gray-50 min-h-screen"><SubPageHero title="Seamless" highlight="Process" description="Registration to growth in four easy steps." /></div>}
      {currentView === 'login' && <Auth mode="login" onAuthSuccess={handleAuthSuccess} onToggleMode={() => navigateTo('register')} />}
      {currentView === 'register' && <Auth mode="register" onAuthSuccess={handleAuthSuccess} onToggleMode={() => navigateTo('login')} />}
      {currentView === 'advisor' && <div className="pt-24"><BusinessAdvisor /></div>}
      {currentView === 'dashboard' && user && <div className="pt-24"><Dashboard user={user} onLogout={handleLogout} /></div>}
      
      <footer className="bg-[#1a2e2e] text-white pt-24 pb-12 overflow-hidden relative">
        <div className="stars-container opacity-10">{renderStars(30)}</div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <LogoComponent />
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tight leading-none">Daily Collect</span>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Wallet</span>
                </div>
              </div>
              <p className="text-emerald-100/40 font-medium leading-relaxed">{t.footer.desc}</p>
            </div>
            {['Services', 'Company', 'Legal'].map((title, idx) => (
              <div key={idx}>
                <h5 className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-10">{title}</h5>
                <ul className="space-y-4 text-emerald-100/40 font-bold">
                  {title === 'Services' && ['USSD *555#', 'Aggregator', 'Levy Pay'].map(l => <li key={l} className="cursor-pointer hover:text-white" onClick={() => navigateTo('features')}>{l}</li>)}
                  {title === 'Company' && ['About Us', 'Success Stories'].map(l => <li key={l} className="cursor-pointer hover:text-white" onClick={() => navigateTo(l === 'About Us' ? 'about' : 'home')}>{l}</li>)}
                  {title === 'Legal' && ['Privacy', 'Compliance'].map(l => <li key={l}>{l}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-12 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-emerald-100/20 text-[10px] font-black uppercase">{t.footer.copyright}</div>
            <div className="flex gap-10 text-[9px] font-black text-emerald-500/40 uppercase">
               <span><ShieldCheck size={12} className="inline mr-1" /> NDIC Insured</span>
               <span><Lock size={12} className="inline mr-1" /> SSL Encrypted</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
