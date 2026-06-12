'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import DigitalFlipbook from './DigitalFlipbook';
import { 
  MapPin, 
  Building, 
  Leaf, 
  TrendingUp, 
  Download, 
  Users, 
  ArrowRight,
  ShieldCheck,
  Waves,
  LayoutTemplate,
  Briefcase,
  PieChart,
  Settings,
  Image as ImageIcon,
  Compass,
  Sliders,
  DollarSign,
  Calculator,
  Flame,
  ArrowDownRight,
  X,
  Mail,
  Copy,
  Check,
  Printer,
  FileText,
  Activity,
  Layers,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Lock,
  RefreshCw
} from 'lucide-react';

// Dynamic import for 3D viewer to prevent SSR issues with Three.js
const ArchitectureViewer = dynamic(() => import('./ArchitectureViewer'), { ssr: false });

// Static path mappings
const IMAGES = {
  heroSunset: '/Images/page10-sunset-render.jpg',
  aerialView: '/Images/OCEANSIDE%20-%20AERIAL%20VIEW.jpg', 
  building03: '/Images/OCEANSIDE%20-%20BUILDING%2003.jpg', 
  scenic1: '/Images/Oceanside.webp',
  scenic2: '/Images/Oceanside2.webp',
  scenic3: '/Images/Oceanside3.webp',
  sitePlan: '/Images/page5-site-plan.jpg',
  mightyBuildings: '/Images/page31-mighty-buildings.jpg.png',
  b1Floor1: '/Images/Building%20One%20First%20Floor.png',
  b2Floor1: '/Images/Building%20Two%20First%20Floor.png',
  b3Lower: '/Images/Building%20Three%20Lower%20Floor%20One.png',
};

const COMPARATIVE_SET = [
  {
    name: "The Stephanie Inn",
    location: "Cannon Beach, OR",
    keys: 41,
    adr: 1100,
    maxAdr: 1419,
    occupancy: "95-100%",
    notable: "Named #1 Resort in the West by Travel + Leisure, 2025."
  },
  {
    name: "Headlands Coastal Lodge & Spa",
    location: "Pacific City, OR",
    keys: 51,
    adr: 950,
    maxAdr: 1250,
    occupancy: "95-100%",
    notable: "Features luxury spa-integrated architectural programming."
  }
];

const PRE_DEV_TIMELINE = [
  { milestone: "Geotechnical & Soil Stability Studies", status: "Completed", cost: "$120k" },
  { milestone: "Civil Engineering & Site Runoff Design", status: "Completed", cost: "$95k" },
  { milestone: "Environmental & Coastal Impact Reports", status: "Completed", cost: "$80k" },
  { milestone: "Community & Land Use Planning Presentation", status: "100% Approved", cost: "$60k" },
  { milestone: "Schematic Structural Drafting (Mighty Buildings)", status: "Completed", cost: "$145k" }
];

interface TabButtonProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ active, label, onClick }) => (
  <button
    onClick={onClick}
    className={`px-8 py-5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border-b-2 whitespace-nowrap select-none active:scale-95 ${
      active 
        ? 'border-blue-500 text-blue-400 bg-transparent shadow-[0_10px_20px_-10px_rgba(59,130,246,0.5)]' 
        : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-800'
    }`}
  >
    {label}
  </button>
);

interface SliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (val: number) => void;
  format: (val: number) => string;
  isBaseline: boolean;
}

const CustomSlider: React.FC<SliderProps> = ({ label, min, max, step, value, onChange, format, isBaseline }) => (
  <div className="space-y-1.5 transition-opacity duration-300 w-full select-none">
    <div className="flex justify-between items-center">
      <span className="text-slate-400 font-semibold uppercase tracking-widest text-[9px] flex items-center">
        {isBaseline && <Lock size={8} className="mr-1.5 text-blue-500" />}
        {label}
      </span>
      <span className={`${isBaseline ? 'text-blue-400' : 'text-emerald-400'} font-mono font-bold drop-shadow-md text-[11px] transition-colors`}>
        {format(value)}
      </span>
    </div>
    <div className="py-2"> {/* Touch padding for mobile slider interaction */}
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value} 
        onChange={(e) => onChange(parseFloat(e.target.value))} 
        className={`w-full h-1 rounded-lg cursor-pointer transition-all ${isBaseline ? 'bg-slate-700 accent-blue-500 hover:accent-blue-400' : 'bg-slate-700 accent-emerald-500 hover:accent-emerald-400'}`}
      />
    </div>
  </div>
);

// Cinematic Gold Light Beam Components
const GoldBeamX = ({ className = "" }) => (
  <div className={`w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent relative overflow-hidden my-6 ${className}`}>
    <div 
      className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent blur-[1px]"
      style={{ animation: 'beam-slide-x 25s linear infinite' }}
    />
  </div>
);

const GoldBeamY = ({ className = "" }) => (
  <div className={`w-px h-full bg-gradient-to-b from-transparent via-slate-800 to-transparent relative overflow-hidden mx-auto ${className}`}>
    <div 
      className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent via-[#d4af37]/70 to-transparent blur-[1px]"
      style={{ animation: 'beam-slide-y 25s linear infinite' }}
    />
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'plan' | 'comps' | 'financials' | 'team' | 'deck' | '3dmodel'>('financials');
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  
  // "Source of Truth" Toggle State
  const [isBaseline, setIsBaseline] = useState(true);

  // Advanced Interactive Financial Simulator variables (9 Variables)
  const [userCommitment, setUserCommitment] = useState(1000000);
  const [simulatedADR, setSimulatedADR] = useState(1101); // Locked to Y3 Stabilized CSV
  const [simulatedOcc, setSimulatedOccupancy] = useState(66);
  const [simulatedKeys, setSimulatedKeys] = useState(24);
  const [simulatedRoomSqft, setSimulatedRoomSqft] = useState(800);
  const [simulatedAmenitySqft, setSimulatedAmenitySqft] = useState(20800); 
  const [simulatedCostPsf, setSimulatedCostPsf] = useState(550);
  const [simulatedExitCap, setSimulatedExitCap] = useState(7.0);
  const [simulatedInterestRate, setSimulatedInterestRate] = useState(8.0); 

  // Reset function to snap back to the CSV Source of Truth
  const handleResetToBaseline = () => {
    setIsBaseline(true);
    setUserCommitment(1000000);
    setSimulatedADR(1101);
    setSimulatedOccupancy(66);
    setSimulatedKeys(24);
    setSimulatedRoomSqft(800);
    setSimulatedAmenitySqft(20800);
    setSimulatedCostPsf(550);
    setSimulatedExitCap(7.0);
    setSimulatedInterestRate(8.0);
  };

  // Wrapper for sliders to auto-unlock when user drags them
  const handleSliderChange = (setter: any) => (value: number) => {
    if (isBaseline) setIsBaseline(false);
    setter(value);
  };

  // Aggressive Override for Next.js Tab Title
  useEffect(() => {
    document.title = "1816 Maxwell | Investor Portal";
    const observer = new MutationObserver(() => {
      if (document.title !== "1816 Maxwell | Investor Portal") {
        document.title = "1816 Maxwell | Investor Portal";
      }
    });
    const titleNode = document.querySelector('title');
    if (titleNode) observer.observe(titleNode, { subtree: true, characterData: true, childList: true });
    return () => observer.disconnect();
  }, []);

  // Hero Slider Timer
  const heroSlides = [
    { img: IMAGES.heroSunset, title: "Redefining Luxury", subtitle: "Unmatched Cliffside Masterpiece", desc: "Perched on Oceanside's grandfathered cliffside zone, utilizing unmitigated sunset vistas." },
    { img: IMAGES.aerialView, title: "Generational Scale", subtitle: "Irreplaceable Geography", desc: "A breathtaking coastal headland compared only to Big Sur, Amalfi Coast, and Cinque Terre." },
    { img: IMAGES.building03, title: "Architectural Precision", subtitle: "Building Three & Infinity Pools", desc: "The programmatic heart of the hotel holding the signature dining, lobby, wellness center, and rooftop views." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Core Math Engine
  const totalGsf = (simulatedKeys * simulatedRoomSqft) + simulatedAmenitySqft;
  const totalProjectCost = totalGsf * simulatedCostPsf;
  
  const debtAmount = totalProjectCost * 0.59;
  const gpEquityPool = totalProjectCost * 0.05;
  const lpEquityPool = totalProjectCost - debtAmount - gpEquityPool;
  const LPShareFraction = Math.min(userCommitment / lpEquityPool, 1);
  
  const daysInYear = 365;
  const rawRoomNights = simulatedKeys * daysInYear * (simulatedOcc / 100);
  const simulatedRoomRevenue = rawRoomNights * simulatedADR;
  
  const amenityRatio = simulatedAmenitySqft / 20800; 
  const nonRoomRevRatio = 0.30535 * Math.min(amenityRatio, 1.5); 
  const totalSimulatedRevenue = simulatedRoomRevenue / (1 - nonRoomRevRatio); 
  
  const simulatedDepartmentExpenses = totalSimulatedRevenue * 0.502;
  const baseUndistributed = 2013238;
  const simulatedUndistributedExpenses = baseUndistributed * (totalGsf / 40000); 
  const simulatedGrossOperatingProfit = totalSimulatedRevenue - (simulatedDepartmentExpenses + simulatedUndistributedExpenses);
  
  const simulatedTaxes = 106090 * (totalGsf / 40000);
  const simulatedInsurance = 90177 * (totalGsf / 40000);
  const simulatedMgmtFee = totalSimulatedRevenue * 0.04;
  const simulatedNOI = simulatedGrossOperatingProfit - (simulatedTaxes + simulatedInsurance + simulatedMgmtFee);
  
  const simulatedCapExReserve = totalSimulatedRevenue * 0.04; 
  
  const annualDebtService = debtAmount * (simulatedInterestRate / 100);
  const dscr = simulatedNOI / annualDebtService;
  const isDSCRSafe = dscr >= 1.25;

  const simulatedYieldOnCost = (simulatedNOI / totalProjectCost) * 100;
  const developmentYieldSpread = simulatedYieldOnCost - simulatedExitCap; 
  
  const leveredCashFlow = simulatedNOI - simulatedCapExReserve - annualDebtService;
  const userProjectedCashFlow = leveredCashFlow * LPShareFraction;

  const exitValue = simulatedNOI / (simulatedExitCap / 100);
  const loanPayoff = debtAmount; 
  const netProceeds = exitValue - loanPayoff;
  const lpExitProceeds = netProceeds * LPShareFraction;
  const fiveYearCashFlow = userProjectedCashFlow * 5; 
  const equityMultiple = (lpExitProceeds + fiveYearCashFlow) / userCommitment;

  const totalOpEx = simulatedDepartmentExpenses + simulatedUndistributedExpenses + simulatedTaxes + simulatedInsurance + simulatedMgmtFee;
  const deptPercent = (simulatedDepartmentExpenses / totalSimulatedRevenue) * 100;
  const fixedPercent = ((simulatedUndistributedExpenses + simulatedTaxes + simulatedInsurance + simulatedMgmtFee) / totalSimulatedRevenue) * 100;
  const noiPercent = (simulatedNOI / totalSimulatedRevenue) * 100;

  const generateTableData = () => {
    return [1, 2, 3, 4, 5].map(year => {
      const occ = year === 1 ? simulatedOcc - 4 : year === 2 ? simulatedOcc - 2 : simulatedOcc;
      const adr = simulatedADR * Math.pow(1.03, year - 3);
      
      const nights = simulatedKeys * 365 * (occ / 100);
      const roomRev = nights * adr;
      const totalRev = roomRev / (1 - nonRoomRevRatio);
      
      const deptExp = totalRev * 0.502;
      const undistributedExp = simulatedUndistributedExpenses;
      const gop = totalRev - (deptExp + undistributedExp);
      
      const fixedExp = simulatedTaxes + simulatedInsurance + (totalRev * 0.04);
      const noi = gop - fixedExp;
      const reserve = totalRev * 0.04; 
      
      return { 
        year, 
        occ, 
        adr, 
        rev: totalRev, 
        deptExp: deptExp + undistributedExp, 
        gop, 
        fixedExp, 
        noi, 
        reserve,
        noiAfter: noi - reserve 
      };
    });
  };

  const tableData = generateTableData();

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId as any);
    if (tabId !== 'deck' && tabId !== '3dmodel') {
      setTimeout(() => {
        const element = document.getElementById('main-content');
        if (element) {
          const navHeight = window.innerWidth < 1024 ? 120 : 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 50); 
    }
  };

  return (
    <div className="min-h-screen bg-[#050810] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden antialiased pb-safe">
      
      <style>{`
        @keyframes beam-slide-x {
          0% { transform: translateX(-200%); }
          100% { transform: translateX(400%); }
        }
        @keyframes beam-slide-y {
          0% { transform: translateY(-200%); }
          100% { transform: translateY(400%); }
        }
        /* Mobile App Optimizations */
        * {
          -webkit-tap-highlight-color: transparent;
        }
        body {
          overscroll-behavior-y: none; /* Stops pull-to-refresh bounce on mobile */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch; /* Smooth momentum scrolling */
        }
        /* Safe area handling for notched phones */
        .pt-safe { padding-top: env(safe-area-inset-top, 0px); }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 0px); }
      `}</style>

      {/* TERNARY LEVEL 1: Check if Flipbook is active */}
      {activeTab === 'deck' ? (
        <DigitalFlipbook />
      ) : (
      <>
        {/* Premium Header Navigation (Mobile App Optimized) */}
        <nav className="fixed top-0 w-full bg-[#050810]/90 backdrop-blur-xl border-b border-slate-800/60 z-50 transition-all duration-300 shadow-xl pt-safe select-none">
          <div className="max-w-[100rem] mx-auto px-4 md:px-6 min-h-[80px] flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-4 py-2 lg:py-0">
            
            {/* Top Row: Logo & Mobile Action Button */}
            <div className="flex items-center justify-between w-full lg:w-auto">
              <div className="flex items-center space-x-3 sm:space-x-5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] shrink-0">
                  <Compass size={18} className="text-white sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="font-extrabold tracking-widest text-white leading-none text-sm sm:text-lg">1816 MAXWELL</div>
                  <div className="text-[8px] sm:text-[10px] text-blue-400 uppercase tracking-widest font-semibold mt-1">Oceanside, Oregon • Grandfathered</div>
                </div>
              </div>
              
              {/* Mobile Data Room Button */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="lg:hidden flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-[9px] uppercase tracking-widest active:scale-95 transition-all duration-300"
              >
                Data Room <ArrowRight size={12} className="ml-1.5" />
              </button>
            </div>
            
            {/* Scrollable Tabs Row (Desktop & Mobile App Style) */}
            <div className="flex items-center overflow-x-auto hide-scrollbar w-full lg:w-auto bg-slate-900/40 lg:p-1 rounded-xl border border-transparent lg:border-slate-800/50 backdrop-blur-md snap-x lg:mb-0 mb-2">
              {['overview', 'plan', 'comps', 'financials', 'team', 'deck', '3dmodel'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 sm:px-5 py-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-lg shrink-0 snap-center active:scale-95 ${
                    activeTab === tab 
                      ? 'bg-blue-500/20 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)] border border-blue-500/30' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  {tab === 'overview' ? 'Executive Summary' : tab === 'plan' ? 'Master Plan' : tab === 'comps' ? 'Market & Comps' : tab === 'financials' ? 'Pro Forma' : tab === 'deck' ? 'Digital Deck' : tab === '3dmodel' ? '3D Model' : tab}
                </button>
              ))}
            </div>

            {/* Desktop Data Room Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="hidden lg:flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] active:scale-95 transition-all duration-300"
            >
              Request Data Room <ArrowRight size={14} className="ml-2" />
            </button>
          </div>
        </nav>

        {/* TERNARY LEVEL 2: Check if 3D Viewer is active */}
        {activeTab === '3dmodel' ? (
          <div className="w-full h-screen relative pt-20">
            <ArchitectureViewer />
          </div>
        ) : (
        <>
          {/* Hero Animated Sliding Panels */}
          <div className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center pt-28 lg:pt-20 overflow-hidden">
            <div className="absolute inset-0 z-0">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentHeroSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img 
                    src={slide.img} 
                    alt={slide.title} 
                    className="w-full h-full object-cover scale-105 transition-transform duration-[7000ms] ease-out filter brightness-[0.4]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#050810]/40 to-[#050810]/80"></div>
                </div>
              ))}
            </div>

            <div className="relative z-20 max-w-[100rem] mx-auto px-4 md:px-6 w-full grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-safe">
              <div className="lg:col-span-8 space-y-5 lg:space-y-6">
                <span className="inline-flex items-center px-3 py-1.5 sm:px-4 bg-blue-500/10 text-blue-300 rounded-full text-[9px] sm:text-[10px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(59,130,246,0.2)] select-none">
                  <Flame size={12} className="mr-1.5 sm:mr-2 text-blue-400 animate-pulse" /> Confidential LP Presentation
                </span>
                <div className="space-y-2 lg:space-y-3">
                  <h2 className="text-sm sm:text-xl font-mono text-blue-400 tracking-widest uppercase font-semibold">
                    {heroSlides[currentHeroSlide].subtitle}
                  </h2>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight">
                    Redefining <span className="font-serif italic text-blue-200 drop-shadow-[0_0_15px_rgba(191,219,254,0.3)] block sm:inline">Luxury</span>
                  </h1>
                </div>
                <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
                  {heroSlides[currentHeroSlide].desc}
                </p>
                
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4 lg:pt-6">
                  <button 
                    onClick={() => handleTabClick('deck')}
                    className="w-full sm:w-auto justify-center px-6 lg:px-8 py-3.5 sm:py-3 bg-white text-slate-950 font-bold rounded-xl text-[10px] lg:text-[11px] uppercase tracking-widest active:scale-95 transition-all duration-300 flex items-center shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    Deep-Dive Portfolio <ArrowDownRight size={16} className="ml-3" />
                  </button>
                  <div className="flex justify-center sm:justify-start items-center space-x-3 px-6 py-2">
                    {heroSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentHeroSlide(i)}
                        className={`w-2 h-2 rounded-full transition-all active:scale-50 ${
                          i === currentHeroSlide ? 'bg-blue-400 w-8 shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'bg-slate-600 hover:bg-slate-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-transparent space-y-6 lg:space-y-8 relative mt-8 lg:mt-0 select-none">
                <h3 className="text-white font-bold uppercase tracking-widest text-[10px] lg:text-[11px] flex justify-between items-center">
                  <span>Financial Foundation</span>
                  <span className="text-blue-400 font-mono">1816 Maxwell</span>
                </h3>
                
                <GoldBeamX className="my-0 mb-6 lg:mb-8 opacity-50" />

                <div className="space-y-5 lg:space-y-6">
                  {[
                    { label: "Fully Capitalized Budget", val: "$22.00M", desc: "Hard & soft cost contingency included" },
                    { label: "Required Equity Pool", val: "$8M - $10M", desc: "Available for programmatic LP entry" },
                    { label: "Stabilized Yield On Cost", val: "9.03%", desc: "Based on Columbia Hospitality model" },
                    { label: "Total Gross Build", val: "40,000 GSF", desc: "Spanning three distinct guest layouts" }
                  ].map((m, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-800/30 sm:border-0">
                      <div className="mb-2 sm:mb-0">
                        <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest font-medium">{m.label}</p>
                        <p className="text-[9px] sm:text-[10px] text-slate-500 mt-1 leading-relaxed hidden sm:block">{m.desc}</p>
                      </div>
                      <div className="text-lg sm:text-xl font-mono font-bold text-white text-left sm:text-right drop-shadow-md">{m.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <GoldBeamX />

          <main id="main-content" className="max-w-[100rem] mx-auto px-4 md:px-6 py-8 lg:py-12 relative scroll-mt-32">
            
            {/* Executive Summary */}
            {activeTab === 'overview' && (
              <div className="space-y-12 lg:space-y-20 animate-in fade-in duration-700">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                  <div className="lg:col-span-7 space-y-6 lg:space-y-8">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight tracking-tight">Pre-Development Progress</h3>
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                      With over 16 months of intense pre-development execution and <strong className="text-white font-medium">$500,000.00 spent on comprehensive due diligence</strong>, Project 1816 Maxwell represents a significantly de-risked development pipeline.
                    </p>
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                      A welcoming community presentation has cleared the baseline municipal expectations, and local zoning status allows immediate reinitiation of structural approvals. 
                    </p>

                    <GoldBeamX className="my-8 lg:my-10 opacity-30" />

                    <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 pt-2">
                      {PRE_DEV_TIMELINE.map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-4 pt-2 sm:pt-4">
                          <ShieldCheck className="text-emerald-400 shrink-0 mt-1" size={20} />
                          <div>
                            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">{item.milestone}</p>
                            <p className="text-[10px] sm:text-xs text-emerald-400/80 uppercase mt-1 sm:mt-2 tracking-widest font-bold font-mono">{item.status} • {item.cost}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative h-full flex items-center">
                    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden border border-slate-700/50 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                      <img 
                        src={IMAGES.scenic2} 
                        alt="Landscape Rendering" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#050810]/30 to-transparent pointer-events-none"></div>
                      <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8 bg-slate-900/70 backdrop-blur-xl border border-slate-700 p-5 lg:p-8 rounded-2xl pointer-events-none select-none">
                        <h4 className="text-white font-bold text-base sm:text-lg mb-2 sm:mb-3 flex items-center tracking-wide">
                          <Waves size={18} className="mr-2 sm:mr-3 text-blue-400" /> Irreplaceable Real Estate
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Grandfathered site for premium hotel development. Current state of local zoning on Oregon Coast makes repeating this designation impossible.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Master Plan Tab */}
            {activeTab === 'plan' && (
              <div className="space-y-12 lg:space-y-20 animate-in fade-in duration-700">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                  <div className="lg:col-span-7 space-y-8 lg:space-y-10">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">Three Structures, Integrated Luxury</h3>
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                      The 40,000 square feet structural layout features three individual custom buildings. This minimizes programmatic block footprint while maximizing privacy, ventilation, and sightlines.
                    </p>

                    <GoldBeamX className="my-8 lg:my-10 opacity-30" />

                    <div className="space-y-8 lg:space-y-12">
                      {[
                        { num: "01", name: "Building One", details: "[6] 3-Story Luxury Units averaging 1,200 SQ FT each. Built for private premium group packages." },
                        { num: "02", name: "Building Two", details: "[6] 3-Story Luxury Units averaging 1,200 SQ FT each. Spaced for perfect coastline angles." },
                        { num: "03", name: "Building Three & Amenities", details: "[12] Luxury Rooms averaging 400 SQ FT each. Combines the Grand Lobby, Signature Restaurant, Rooftop Bar, Executive Conference Center, and Wellness Spa with Weight Room & Yoga facility." }
                      ].map((b, idx) => (
                        <div key={idx} className="relative group flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-6">
                          <span className="text-4xl sm:text-3xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-400 drop-shadow-md select-none">{b.num}</span>
                          <div>
                            <h4 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 tracking-wide">{b.name}</h4>
                            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{b.details}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-12 lg:space-y-16">
                    <div className="relative group">
                      <div className="relative h-[250px] sm:h-[380px] rounded-2xl overflow-hidden border border-slate-700/50 mb-4 sm:mb-6 bg-slate-200">
                        <img 
                          src={IMAGES.sitePlan} 
                          alt="Proposed Site Plan Diagram" 
                          className="w-full h-full object-contain p-2 sm:p-4 mix-blend-multiply"
                        />
                      </div>
                      <div className="space-y-2 select-none">
                        <h4 className="text-white font-bold text-[11px] sm:text-sm uppercase tracking-widest flex items-center">
                          <LayoutTemplate size={16} className="mr-2 sm:mr-3 text-blue-400" /> Page 5 Site Layout Profile
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Details structural alignments for Building 1, 2, and 3 directly to Chinook Avenue.</p>
                      </div>
                    </div>

                    <GoldBeamX className="opacity-30 my-6 lg:my-8" />

                    <div className="relative group select-none">
                      <div className="relative h-[180px] sm:h-[260px] rounded-2xl overflow-hidden border border-slate-700/50 mb-4 sm:mb-6">
                        <img 
                          src={IMAGES.mightyBuildings} 
                          alt="Mighty Buildings panel" 
                          className="w-full h-full object-cover filter brightness-[0.8]"
                        />
                      </div>
                      <h4 className="text-white font-bold text-[11px] sm:text-sm uppercase tracking-widest flex items-center">
                        <Leaf size={16} className="mr-2 sm:mr-3 text-emerald-400" /> First-Of-Its-Kind 3D Prefabrication
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 mt-3 sm:mt-4 leading-relaxed">
                        Sponsor has established a formal engineering partnership with Mighty Buildings to utilize custom structural panels. Shrinks local construction logistics by months and reduces structural weight parameters on cliffside.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Market & Comps Tab */}
            {activeTab === 'comps' && (
              <div className="space-y-12 lg:space-y-20 animate-in fade-in duration-700">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                  <div className="lg:col-span-7 space-y-6 lg:space-y-8">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">Oregon's High-Yield Elite Comps</h3>
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                      Fewer than <strong className="text-white font-medium">100 luxury hotel rooms</strong> serve the entire 5.5 Million annual traveler volume on the Oregon Coast. This dramatic imbalance drives extreme occupancies and pricing power.
                    </p>
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                      By coordinating directly with Columbia Hospitality (who actively manages premium assets across the region), the financial pro forma targets highly realistic operational benchmarks.
                    </p>

                    <GoldBeamX className="my-8 lg:my-10 opacity-30" />

                    <div className="grid sm:grid-cols-2 gap-8 lg:gap-12 pt-4 lg:pt-6">
                      {COMPARATIVE_SET.map((comp, idx) => (
                        <div key={idx} className="space-y-4 sm:space-y-6 select-none">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-lg sm:text-xl text-white leading-tight tracking-wide">{comp.name}</h4>
                          </div>
                          <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm uppercase tracking-widest font-semibold">
                            <div className="flex justify-between pb-2 sm:pb-3 text-slate-400 border-b border-slate-800/50 sm:border-0">
                              <span>Keys</span>
                              <span className="text-white font-mono">{comp.keys}</span>
                            </div>
                            <div className="flex justify-between pb-2 sm:pb-3 text-slate-400 border-b border-slate-800/50 sm:border-0">
                              <span>Avg ADR</span>
                              <span className="text-emerald-400 font-mono font-bold drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">${comp.adr}</span>
                            </div>
                            <div className="flex justify-between pb-2 sm:pb-3 text-slate-400 border-b border-slate-800/50 sm:border-0">
                              <span>Peak Rate</span>
                              <span className="text-white font-mono">${comp.maxAdr}</span>
                            </div>
                            <div className="flex justify-between text-slate-400">
                              <span>Summer Occ.</span>
                              <span className="text-blue-400 font-mono font-bold">{comp.occupancy}</span>
                            </div>
                          </div>
                          <GoldBeamX className="my-4 sm:my-6 opacity-20" />
                          <p className="text-[11px] sm:text-sm text-slate-500 italic leading-relaxed pt-1 sm:pt-3">{comp.notable}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-12 lg:space-y-16 pl-0 lg:pl-10 relative">
                    <GoldBeamY className="hidden lg:block absolute left-0 top-0 opacity-30" />
                    <GoldBeamX className="block lg:hidden my-8 opacity-30" />
                    
                    <div className="space-y-6 lg:space-y-8 relative">
                      <h4 className="text-white font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] pb-2 sm:pb-4 flex justify-between items-center relative z-10 select-none">
                        <span>Operator Assessment</span>
                        <span className="text-blue-400 font-bold drop-shadow-md">LHW Flag Option</span>
                      </h4>
                      <GoldBeamX className="my-3 sm:my-4 opacity-30 hidden sm:block" />
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed relative z-10">
                        Sponsorship is in active negotiations with <strong className="text-white">Leading Hotels of the World (LHW)</strong> to add 1816 Maxwell to their exclusive global portfolio.
                      </p>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed relative z-10">
                        Aligning with LHW's elite infrastructure provides the asset instant access to their <strong className="text-white">4.5 million Leaders Club members</strong>, significantly lowering client acquisition costs and maximizing distribution reach compared to traditional hard brands.
                      </p>
                      <div className="p-6 sm:p-8 bg-slate-900/30 sm:bg-transparent rounded-xl sm:rounded-none text-center relative z-10 select-none">
                        <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-slate-400 font-semibold">Underwritten Baseline ADR</p>
                        <p className="text-3xl sm:text-4xl font-mono font-black text-emerald-400 mt-3 sm:mt-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">$1,038</p>
                        <p className="text-xs sm:text-sm text-slate-500 mt-3 sm:mt-4 leading-relaxed">Sponsor believes peak summer rates will exceed $2,000/night.</p>
                      </div>
                    </div>
                    
                    <GoldBeamX className="my-6 lg:my-8 opacity-30" />

                    <div className="relative select-none">
                       <h4 className="text-white font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] pb-3 sm:pb-4 mb-4 sm:mb-6 flex items-center">
                         <MapPin size={16} className="mr-2 sm:mr-3 text-blue-400" /> Drive-Market Demographics
                       </h4>
                       <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                         Oceanside accesses a highly affluent drive-market constrained by the Oregon Land Conservation and Development Commission (LCDC), which strictly caps new luxury coastal developments. 
                       </p>
                       <ul className="text-xs sm:text-sm text-slate-300 mt-6 sm:mt-8 space-y-3 sm:space-y-4 font-mono tracking-wide">
                         <li className="flex justify-between pb-2 sm:pb-3 items-center border-b border-slate-800/40 sm:border-0">
                           <span className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-slate-500 mr-2 sm:mr-3"></div>Portland MSA</span> 
                           <span className="text-blue-400 font-bold">1.5 Hr Drive</span>
                         </li>
                         <li className="flex justify-between pb-2 sm:pb-3 items-center border-b border-slate-800/40 sm:border-0">
                           <span className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-slate-500 mr-2 sm:mr-3"></div>Seattle MSA</span> 
                           <span className="text-blue-400 font-bold">3.5 Hr Drive</span>
                         </li>
                         <li className="flex justify-between items-center pt-1">
                           <span className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-slate-500 mr-2 sm:mr-3"></div>Silicon Valley (PDX)</span> 
                           <span className="text-blue-400 font-bold">1.5 Hr Flight</span>
                         </li>
                       </ul>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {}
            {activeTab === 'financials' && (
              <div className="animate-in fade-in duration-700 relative pt-2 flex flex-col gap-4 sm:gap-6">
                
                {/* HEADER & TOGGLE */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 sm:pb-2 relative z-10 gap-4 sm:gap-0">
                  <div className="select-none">
                    <h4 className="text-white font-bold text-[10px] sm:text-[11px] tracking-[0.2em] uppercase flex items-center mb-1">
                      <Calculator size={12} className="mr-2 text-blue-500" /> Financial Engine Control
                    </h4>
                    <p className="text-[9px] sm:text-[11px] text-slate-400">Total Project GSF: <span className="text-white font-mono">{totalGsf.toLocaleString()}</span> <span className="hidden sm:inline">|</span><span className="sm:hidden block mt-0.5"></span> Capitalization: <span className="text-white font-mono">${(totalProjectCost / 1000000).toFixed(2)}M</span></p>
                  </div>
                  
                  <div className="flex w-full sm:w-auto bg-slate-900/80 rounded-full p-1 border border-slate-700 shadow-xl backdrop-blur-md select-none">
                     <button 
                       onClick={handleResetToBaseline}
                       className={`flex-1 sm:flex-none justify-center flex items-center px-4 py-2 sm:py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest active:scale-95 transition-all ${isBaseline ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'text-slate-400 hover:text-slate-200'}`}
                     >
                        <Lock size={10} className="mr-1.5 sm:mr-1.5"/> Source of Truth
                     </button>
                     <button 
                       onClick={() => setIsBaseline(false)}
                       className={`flex-1 sm:flex-none justify-center flex items-center px-4 py-2 sm:py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest active:scale-95 transition-all ${!isBaseline ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'text-slate-400 hover:text-slate-200'}`}
                     >
                        <Sliders size={10} className="mr-1.5 sm:mr-1.5"/> Simulator
                     </button>
                  </div>
                </div>

                {/* TOP ROW: KPI OUTPUT CARDS */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-6 gap-x-4 bg-slate-900/40 p-4 sm:p-5 rounded-xl border border-slate-800/60 shadow-lg relative z-10 select-none">
                  <div className="border-r border-slate-800/50 pr-2 sm:pr-4">
                    <p className="text-[8px] sm:text-[9px] text-slate-400 font-mono uppercase tracking-widest mb-1 font-bold">Your LP Stake</p>
                    <p className="text-xl sm:text-2xl font-light text-white drop-shadow-lg">{(LPShareFraction * 100).toFixed(2)}<span className="text-xs sm:text-sm text-slate-500 ml-1">%</span></p>
                  </div>
                  <div className="lg:border-r border-slate-800/50 pl-2 lg:pr-4">
                    <p className="text-[8px] sm:text-[9px] text-blue-400 font-mono uppercase tracking-widest mb-1 font-bold">Yield Spread</p>
                    <p className="text-xl sm:text-2xl font-light text-blue-300 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">{developmentYieldSpread.toFixed(2)}<span className="text-xs sm:text-sm text-blue-500/50 ml-1">%</span></p>
                  </div>
                  <div className="border-r border-slate-800/50 pr-2 sm:pr-4 lg:pl-2">
                    <p className="text-[8px] sm:text-[9px] text-slate-400 font-mono uppercase tracking-widest mb-1 font-bold">DSCR Covenant</p>
                    <p className={`text-xl sm:text-2xl font-light drop-shadow-lg ${isDSCRSafe ? 'text-emerald-400' : 'text-red-500'}`}>{dscr.toFixed(2)}<span className="text-xs sm:text-sm text-slate-500 ml-1">x</span></p>
                  </div>
                  <div className="lg:border-r border-slate-800/50 pl-2 lg:pr-4">
                    <p className="text-[8px] sm:text-[9px] text-emerald-400 font-mono uppercase tracking-widest mb-1 font-bold">Levered CF</p>
                    <p className="text-xl sm:text-2xl font-light text-emerald-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">${Math.round(userProjectedCashFlow).toLocaleString()}</p>
                  </div>
                  <div className="col-span-2 lg:col-span-1 lg:pl-2 pt-4 lg:pt-0 border-t border-slate-800/50 lg:border-t-0 text-center lg:text-left">
                    <p className="text-[8px] sm:text-[9px] text-purple-400 font-mono uppercase tracking-widest mb-1 font-bold">Equity Multiple</p>
                    <p className="text-xl sm:text-2xl font-light text-purple-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">{equityMultiple.toFixed(2)}<span className="text-xs sm:text-sm text-purple-500/50 ml-1">x</span></p>
                  </div>
                </div>

                {/* MIDDLE ROW: SLIDERS | STACK | WATERFALL */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
                  
                  {/* Sliders (Utility Belt) */}
                  <div className="lg:col-span-4 bg-slate-900/40 border border-slate-800/60 p-4 sm:p-5 rounded-xl shadow-lg flex flex-col justify-between">
                    <p className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] font-bold flex items-center mb-4 sm:mb-6 select-none ${isBaseline ? 'text-blue-400' : 'text-emerald-400'}`}>
                      <Sliders size={12} className="mr-2" /> Variables
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 sm:gap-y-4">
                      <CustomSlider label="Keys" min={12} max={60} step={1} value={simulatedKeys} onChange={handleSliderChange(setSimulatedKeys)} format={(v) => v.toString()} isBaseline={isBaseline} />
                      <CustomSlider label="Rm Size" min={300} max={1500} step={50} value={simulatedRoomSqft} onChange={handleSliderChange(setSimulatedRoomSqft)} format={(v) => `${v} SF`} isBaseline={isBaseline} />
                      <CustomSlider label="Amenity SF" min={0} max={40000} step={1000} value={simulatedAmenitySqft} onChange={handleSliderChange(setSimulatedAmenitySqft)} format={(v) => `${(v/1000).toFixed(1)}k`} isBaseline={isBaseline} />
                      <CustomSlider label="Cost PSF" min={300} max={1200} step={25} value={simulatedCostPsf} onChange={handleSliderChange(setSimulatedCostPsf)} format={(v) => `$${v}`} isBaseline={isBaseline} />
                      <CustomSlider label="Occ %" min={40} max={90} step={1} value={simulatedOcc} onChange={handleSliderChange(setSimulatedOccupancy)} format={(v) => `${v}%`} isBaseline={isBaseline} />
                      <CustomSlider label="LP Eq" min={250000} max={10000000} step={250000} value={userCommitment} onChange={handleSliderChange(setUserCommitment)} format={(v) => `$${(v / 1000000).toFixed(2)}M`} isBaseline={isBaseline} />
                      <CustomSlider label="Exit Cap" min={4.0} max={10.0} step={0.25} value={simulatedExitCap} onChange={handleSliderChange(setSimulatedExitCap)} format={(v) => `${v.toFixed(2)}%`} isBaseline={isBaseline} />
                      <CustomSlider label="Debt Rate" min={5.0} max={12.0} step={0.25} value={simulatedInterestRate} onChange={handleSliderChange(setSimulatedInterestRate)} format={(v) => `${v.toFixed(2)}%`} isBaseline={isBaseline} />
                    </div>
                  </div>

                  {/* Capital Stack */}
                  <div className="lg:col-span-4 bg-slate-900/40 border border-slate-800/60 p-4 sm:p-5 rounded-xl shadow-lg flex flex-col justify-between select-none">
                    <p className="text-[9px] sm:text-[10px] text-slate-400 font-mono uppercase tracking-[0.2em] font-bold mb-4 flex items-center">
                      <Building size={12} className="mr-2 text-slate-500" /> Capital Stack
                    </p>
                    <div className="h-2 w-full rounded-full flex overflow-hidden bg-transparent mb-5 sm:mb-6 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                        <div className="bg-cyan-400" style={{width: `${(debtAmount / totalProjectCost) * 100}%`}}></div>
                        <div className="bg-teal-400" style={{width: `${(lpEquityPool / totalProjectCost) * 100}%`}}></div>
                        <div className="bg-fuchsia-400" style={{width: `${(gpEquityPool / totalProjectCost) * 100}%`}}></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-[10px] sm:text-xs">
                        <div className="space-y-3 sm:space-y-4">
                            <p className="text-cyan-400 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest font-bold border-b border-slate-700/50 pb-1 sm:pb-2">Sources</p>
                            <div className="flex justify-between items-center"><span className="text-slate-400 text-[9px] sm:text-[10px]">Sr. Debt</span><span className="font-mono text-white font-bold">${(debtAmount / 1000000).toFixed(2)}M</span></div>
                            <div className="flex justify-between items-center"><span className="text-slate-400 text-[9px] sm:text-[10px]">LP Equity</span><span className="font-mono text-white font-bold">${(lpEquityPool / 1000000).toFixed(2)}M</span></div>
                            <div className="flex justify-between items-center"><span className="text-slate-400 text-[9px] sm:text-[10px]">Sponsor</span><span className="font-mono text-white font-bold">${(gpEquityPool / 1000000).toFixed(2)}M</span></div>
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                            <p className="text-slate-400 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest font-bold border-b border-slate-700/50 pb-1 sm:pb-2">Uses</p>
                            <div className="flex justify-between items-center"><span className="text-slate-400 text-[9px] sm:text-[10px]">Hard Costs</span><span className="font-mono text-white font-bold">${(totalProjectCost * 0.65 / 1000000).toFixed(2)}M</span></div>
                            <div className="flex justify-between items-center"><span className="text-slate-400 text-[9px] sm:text-[10px]">Soft/Arch</span><span className="font-mono text-white font-bold">${(totalProjectCost * 0.122 / 1000000).toFixed(2)}M</span></div>
                            <div className="flex justify-between items-center"><span className="text-slate-400 text-[9px] sm:text-[10px]">FF&E / Pre</span><span className="font-mono text-white font-bold">${(totalProjectCost * 0.228 / 1000000).toFixed(2)}M</span></div>
                        </div>
                    </div>
                  </div>

                  {/* Revenue Waterfall */}
                  <div className="lg:col-span-4 bg-slate-900/40 border border-slate-800/60 p-4 sm:p-5 rounded-xl shadow-lg flex flex-col justify-between select-none">
                    <p className="text-[9px] sm:text-[10px] text-slate-400 font-mono uppercase tracking-[0.2em] font-bold mb-4 flex items-center">
                      <TrendingUp size={12} className="mr-2 text-slate-500" /> Revenue Waterfall
                    </p>
                    <div className="w-full flex gap-1.5 h-2 items-center mb-5 sm:mb-6">
                        <div className="bg-red-500 h-full rounded-full" style={{width: `${deptPercent}%`}}></div>
                        <div className="bg-orange-500 h-full rounded-full" style={{width: `${fixedPercent}%`}}></div>
                        <div className="bg-emerald-400 h-full rounded-full" style={{width: `${noiPercent}%`}}></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-4">
                      <div>
                        <span className="block text-blue-400/80 text-[8px] sm:text-[9px] uppercase font-mono font-bold mb-1 sm:mb-2 border-b border-slate-700/50 pb-1 sm:pb-2">Gross Rev</span>
                        <span className="text-white font-light text-lg sm:text-xl">${(totalSimulatedRevenue / 1000000).toFixed(2)}<span className="text-[9px] sm:text-[10px] text-slate-500 ml-0.5">M</span></span>
                      </div>
                      <div className="border-l border-slate-800/80 pl-2 sm:pl-4">
                        <span className="block text-red-400/80 text-[8px] sm:text-[9px] uppercase font-mono font-bold mb-1 sm:mb-2 border-b border-slate-700/50 pb-1 sm:pb-2">Total Exp</span>
                        <span className="text-white font-light text-lg sm:text-xl">${(totalOpEx / 1000000).toFixed(2)}<span className="text-[9px] sm:text-[10px] text-slate-500 ml-0.5">M</span></span>
                      </div>
                      <div className="border-l border-slate-800/80 pl-2 sm:pl-4">
                        <span className="block text-emerald-400 text-[8px] sm:text-[9px] uppercase font-mono font-bold mb-1 sm:mb-2 border-b border-slate-700/50 pb-1 sm:pb-2">Net Income</span>
                        <span className="text-white font-light text-lg sm:text-xl drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]">${(simulatedNOI / 1000000).toFixed(2)}<span className="text-[9px] sm:text-[10px] text-emerald-500/50 ml-0.5">M</span></span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* BOTTOM ROW: Detailed 5-Year Table */}
                <div className="bg-slate-900/40 p-4 sm:p-5 rounded-xl border border-slate-800/60 shadow-lg relative z-10 w-full overflow-x-auto hide-scrollbar select-none">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 gap-2 sm:gap-0">
                    <h4 className="text-white font-light text-lg sm:text-xl tracking-tight">
                      {isBaseline ? 'Verified Columbia Pro Forma Snapshot' : 'Dynamic Operating Projection'}
                    </h4>
                    {!isBaseline && (
                       <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] sm:text-[9px] uppercase tracking-widest font-bold rounded-full">
                          Live Simulation Active
                       </span>
                    )}
                  </div>
                  
                  <table className="w-full text-left border-collapse min-w-[700px] sm:min-w-[800px]">
                    <thead>
                      <tr className="text-slate-400 uppercase tracking-widest font-bold font-mono text-[8px] sm:text-[9px] border-b border-slate-800/80">
                        <th className="py-2 sm:py-3 px-3 sm:px-4">Operating Metric</th>
                        <th className="py-2 sm:py-3 px-3 sm:px-4 text-right">Year 1</th>
                        <th className="py-2 sm:py-3 px-3 sm:px-4 text-right">Year 2</th>
                        <th className={`py-2 sm:py-3 px-3 sm:px-4 text-right font-bold border-b-2 relative ${isBaseline ? 'text-blue-400 border-blue-500' : 'text-emerald-400 border-emerald-500'}`}>
                            Year 3 (Stab)
                        </th>
                        <th className="py-2 sm:py-3 px-3 sm:px-4 text-right">Year 4</th>
                        <th className="py-2 sm:py-3 px-3 sm:px-4 text-right">Year 5</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300 text-[10px] sm:text-[11px]">
                      <tr className="border-b border-slate-800/40 hover:bg-slate-800/40">
                        <td className="py-2 sm:py-2.5 px-3 sm:px-4">Underwritten Occupancy</td>
                        {tableData.map(d => <td key={d.year} className={`py-2 sm:py-2.5 px-3 sm:px-4 text-right font-mono ${d.year === 3 ? (isBaseline ? 'text-blue-300 bg-blue-500/5' : 'text-emerald-300 bg-emerald-500/5') : ''}`}>{d.occ.toFixed(1)}%</td>)}
                      </tr>
                      <tr className="border-b border-slate-800/40 hover:bg-slate-800/40">
                        <td className="py-2 sm:py-2.5 px-3 sm:px-4">Average Daily Rate (ADR)</td>
                        {tableData.map(d => <td key={d.year} className={`py-2 sm:py-2.5 px-3 sm:px-4 text-right font-mono ${d.year === 3 ? (isBaseline ? 'text-blue-300 bg-blue-500/5' : 'text-emerald-300 bg-emerald-500/5') : ''}`}>${Math.round(d.adr).toLocaleString()}</td>)}
                      </tr>
                      <tr className="border-b border-slate-800/80 hover:bg-slate-800/40 font-bold bg-slate-800/20">
                        <td className="py-2 sm:py-2.5 px-3 sm:px-4 text-white">Total Gross Revenues</td>
                        {tableData.map(d => <td key={d.year} className={`py-2 sm:py-2.5 px-3 sm:px-4 text-right font-mono ${d.year === 3 ? (isBaseline ? 'text-blue-400 bg-blue-500/10' : 'text-emerald-400 bg-emerald-500/10') : 'text-white'}`}>${Math.round(d.rev).toLocaleString()}</td>)}
                      </tr>
                      <tr className="border-b border-slate-800/40 hover:bg-slate-800/40">
                        <td className="py-2 sm:py-2.5 px-3 sm:px-4 text-slate-400 pl-6 sm:pl-8">Less: Departmental & Undistributed Exp</td>
                        {tableData.map(d => <td key={d.year} className={`py-2 sm:py-2.5 px-3 sm:px-4 text-right font-mono text-slate-400 ${d.year === 3 ? (isBaseline ? 'bg-blue-500/5' : 'bg-emerald-500/5') : ''}`}>${Math.round(d.deptExp).toLocaleString()}</td>)}
                      </tr>
                      <tr className="border-b border-slate-800/80 hover:bg-slate-800/40 font-bold bg-slate-800/20">
                        <td className="py-2 sm:py-2.5 px-3 sm:px-4 text-slate-200">Gross Operating Profit (GOP)</td>
                        {tableData.map(d => <td key={d.year} className={`py-2 sm:py-2.5 px-3 sm:px-4 text-right font-mono ${d.year === 3 ? (isBaseline ? 'text-blue-300 bg-blue-500/10' : 'text-emerald-300 bg-emerald-500/10') : 'text-slate-200'}`}>${Math.round(d.gop).toLocaleString()}</td>)}
                      </tr>
                      <tr className="border-b border-slate-800/40 hover:bg-slate-800/40">
                        <td className="py-2 sm:py-2.5 px-3 sm:px-4 text-slate-400 pl-6 sm:pl-8">Less: Fixed Exp (Taxes, Ins, Mgmt)</td>
                        {tableData.map(d => <td key={d.year} className={`py-2 sm:py-2.5 px-3 sm:px-4 text-right font-mono text-slate-400 ${d.year === 3 ? (isBaseline ? 'bg-blue-500/5' : 'bg-emerald-500/5') : ''}`}>${Math.round(d.fixedExp).toLocaleString()}</td>)}
                      </tr>
                      <tr className="border-b border-slate-800/80 hover:bg-slate-800/40 font-bold text-white bg-slate-800/40">
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-[11px] sm:text-[12px]">Net Operating Income (NOI)</td>
                        {tableData.map(d => <td key={d.year} className={`py-2.5 sm:py-3 px-3 sm:px-4 text-right font-mono text-[11px] sm:text-[12px] ${d.year === 3 ? (isBaseline ? 'text-blue-400 bg-blue-500/20 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'text-emerald-400 bg-emerald-500/20 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]') : 'text-white'}`}>${Math.round(d.noi).toLocaleString()}</td>)}
                      </tr>
                      <tr className="border-b border-slate-800/40 hover:bg-slate-800/40">
                        <td className="py-2 sm:py-2.5 px-3 sm:px-4 text-slate-400 pl-6 sm:pl-8">Less: CapEx Reserve</td>
                        {tableData.map(d => <td key={d.year} className={`py-2 sm:py-2.5 px-3 sm:px-4 text-right font-mono text-slate-400 ${d.year === 3 ? (isBaseline ? 'bg-blue-500/5' : 'bg-emerald-500/5') : ''}`}>${Math.round(d.reserve).toLocaleString()}</td>)}
                      </tr>
                      <tr className="hover:bg-slate-800/40 font-bold text-emerald-400">
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 flex items-center"><Leaf size={12} className="mr-2 opacity-60"/> NOI After Reserve</td>
                        {tableData.map(d => <td key={d.year} className={`py-2.5 sm:py-3 px-3 sm:px-4 text-right font-mono ${d.year === 3 ? (isBaseline ? 'text-blue-300 bg-blue-500/5' : 'text-emerald-300 bg-emerald-500/5') : ''}`}>${Math.round(d.noiAfter).toLocaleString()}</td>)}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sponsorship Team Tab */}
            {activeTab === 'team' && (
              <div className="space-y-12 lg:space-y-20 animate-in fade-in duration-700">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
                  
                  {/* Walker Profile */}
                  <div className="relative group p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/50 select-none">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6 border border-blue-500/20">
                        <Users className="text-blue-400 sm:w-7 sm:h-7" size={24} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Walker Templeton</h3>
                    <p className="text-blue-400 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] mt-1 sm:mt-2 mb-4 sm:mb-6 font-bold">Lead Developer / Sponsor</p>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                      Designer and Entrepreneur building sustainable business ventures. Over 25 years of experience working with global companies (Nike, Google), college athletics, hospitality, and designing world-class commercial/residential buildings.
                    </p>
                  </div>

                  {/* Robert Gutierrez Profile */}
                  <div className="relative group p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/50 select-none">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6 border border-emerald-500/20">
                        <Briefcase className="text-emerald-400 sm:w-7 sm:h-7" size={24} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Robert Gutierrez</h3>
                    <p className="text-emerald-400 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] mt-1 sm:mt-2 mb-4 sm:mb-6 font-bold">Capital Markets</p>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                      Specializing in structured finance and institutional equity syndication for premium real estate assets. Bringing extensive relationships across private equity, family offices, and high-net-worth investor networks.
                    </p>
                  </div>

                  {/* Placeholder / Ops Profile */}
                  <div className="relative group p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/50 md:col-span-2 lg:col-span-1 select-none">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6 border border-purple-500/20">
                        <Layers className="text-purple-400 sm:w-7 sm:h-7" size={24} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">To Be Announced</h3>
                    <p className="text-purple-400 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] mt-1 sm:mt-2 mb-4 sm:mb-6 font-bold">Director of Operations</p>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                      Executive oversight parameter placeholder for pre-opening hiring phase. Will act as the direct liaison between ownership and the Columbia Hospitality management team.
                    </p>
                  </div>

                </div>

                <GoldBeamX className="my-10 lg:my-16" />

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                  <div className="relative group lg:pr-10 border-b lg:border-b-0 lg:border-r border-slate-800/50 pb-12 lg:pb-0 select-none">
                    <div className="flex items-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <Building className="text-emerald-400 sm:w-7 sm:h-7" size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Columbia Hospitality</h3>
                        <p className="text-emerald-400 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest mt-1 sm:mt-2 font-bold">Management Partner</p>
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      Universally acknowledged as the premier high-end boutique hospitality operator in the Pacific Northwest. Handled complete pro forma modeling and staffing parameters to ensure flawless operations across all three structures.
                    </p>
                  </div>

                  <div className="relative select-none">
                    <h4 className="text-white font-bold text-xl sm:text-2xl flex items-center relative z-10 tracking-tight mb-4 sm:mb-6">
                      Target Luxury Brand: LHW
                    </h4>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed relative z-10">
                      Sponsorship is in active negotiations to align 1816 Maxwell with the infrastructure of <strong className="text-white">Leading Hotels of the World (LHW)</strong>. This partnership will officially add the property to LHW's exclusive global portfolio, securing instant access to 4.5 million highly affluent Leaders Club members and maximizing the baseline $1,038 ADR model through elite direct-booking advantages.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </main>
          
          {}
          {/* Institutional Call-to-Action Footer */}
          <footer className="bg-[#030408] border-t border-slate-800/60 py-20 sm:py-32 relative overflow-hidden select-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>
            <div className="max-w-[100rem] mx-auto px-4 sm:px-6 text-center relative z-10">
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 sm:mb-8 tracking-tight">Ready to review the full package?</h2>
              <p className="text-slate-400 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed text-sm sm:text-lg">
                Access the complete data room including the $500k due diligence package (civil, geo-technical, traffic, environmental), full Columbia Hospitality pro forma, and Mighty Buildings schematic architecture.
              </p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-[10px] sm:text-[11px] uppercase tracking-widest hover:from-blue-500 hover:to-indigo-500 transition-all shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] active:scale-95"
              >
                <Download size={18} className="mr-2 sm:mr-3" /> Secure Institutional Access
              </button>
              <div className="mt-16 sm:mt-24 text-slate-600 text-[8px] sm:text-[10px] font-mono font-bold tracking-widest uppercase px-4 pb-safe">
                © 2026 Drive Equity Partners. All rights reserved. Confidential Offering Memorandum.
              </div>
            </div>
          </footer>
        </>
      )}

      {}
      {/* Secure Contact Modal (Responsive App fixes) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pb-safe">
          <div className="absolute inset-0 bg-[#050810]/95 backdrop-blur-xl" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-[#0b101f] border border-slate-800/80 rounded-2xl sm:rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start sm:items-center p-6 sm:p-8 border-b border-slate-800/60 gap-4">
              <div className="select-none">
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center tracking-tight">
                  <ShieldCheck className="text-emerald-400 mr-2 sm:mr-3 shrink-0" size={20} /> Secure Data Room Access
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2">Contact the sponsorship team to request the password.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white transition-colors p-1 sm:p-0 active:scale-90">
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>
            
            <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
              <div className="bg-transparent border border-slate-700/50 p-4 sm:p-5 rounded-xl sm:rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center group hover:bg-slate-900/40 transition-colors shadow-lg gap-4 sm:gap-0">
                <div className="flex items-center w-full sm:w-auto select-none">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/10 rounded-full flex items-center justify-center mr-4 sm:mr-5 border border-blue-500/20 shrink-0">
                    <Users className="text-blue-400 sm:w-5 sm:h-5" size={18} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm sm:text-base">Walker Templeton</p>
                    <p className="text-slate-400 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] mt-1">Sponsor / Developer</p>
                  </div>
                </div>
                <button onClick={() => handleCopy('walktempleton@gmail.com')} className="w-full sm:w-auto flex justify-center p-3 rounded-lg sm:rounded-xl bg-slate-800 text-slate-300 hover:text-white shadow-md active:scale-95 transition-transform">
                  {copiedEmail === 'walktempleton@gmail.com' ? <Check size={16} className="text-emerald-400 sm:w-[18px] sm:h-[18px]" /> : <Copy size={16} className="sm:w-[18px] sm:h-[18px]" />}
                  <span className="sm:hidden ml-2 text-xs font-bold">COPY EMAIL</span>
                </button>
              </div>

              <div className="bg-transparent border border-slate-700/50 p-4 sm:p-5 rounded-xl sm:rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center group hover:bg-slate-900/40 transition-colors shadow-lg gap-4 sm:gap-0">
                <div className="flex items-center w-full sm:w-auto select-none">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/10 rounded-full flex items-center justify-center mr-4 sm:mr-5 border border-blue-500/20 shrink-0">
                    <Briefcase className="text-blue-400 sm:w-5 sm:h-5" size={18} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm sm:text-base">Robert Gutierrez</p>
                    <p className="text-slate-400 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] mt-1">Capital Markets</p>
                  </div>
                </div>
                <button onClick={() => handleCopy('rjg.cal@gmail.com')} className="w-full sm:w-auto flex justify-center p-3 rounded-lg sm:rounded-xl bg-slate-800 text-slate-300 hover:text-white shadow-md active:scale-95 transition-transform">
                  {copiedEmail === 'rjg.cal@gmail.com' ? <Check size={16} className="text-emerald-400 sm:w-[18px] sm:h-[18px]" /> : <Copy size={16} className="sm:w-[18px] sm:h-[18px]" />}
                  <span className="sm:hidden ml-2 text-xs font-bold">COPY EMAIL</span>
                </button>
              </div>

              <a href="mailto:walktempleton@gmail.com,rjg.cal@gmail.com?subject=1816%20Maxwell%20-%20Secure%20Institutional%20Access%20Request" className="w-full flex items-center justify-center py-3.5 sm:py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] mt-4 active:scale-95">
                <Mail size={16} className="mr-2 sm:mr-3 sm:w-[18px] sm:h-[18px]" /> Open Default Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}