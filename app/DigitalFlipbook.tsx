import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, Lock, MapPin, Building2, 
  ShieldCheck, Presentation, Leaf, TrendingUp, BedDouble, 
  BarChart3, ArrowLeft, MessageSquare, Send, X, Loader2
} from 'lucide-react';

interface Message {
  role: string;
  text: string;
}

const DigitalFlipbook: React.FC = () => {
  const [flippedCount, setFlippedCount] = useState<number>(0);
  const [mounted, setMounted] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Welcome to the 1816 Maxwell Data Room. I am the AI Investment Analyst. How can I assist you with the pro forma, market fundamentals, or architectural details?' }
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [isAILoading, setIsAILoading] = useState<boolean>(false);
  
  const totalSheets = 10;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePageClick = (index: number) => {
    if (index === flippedCount) {
      setFlippedCount(prev => Math.min(prev + 1, totalSheets));
    } else if (index === flippedCount - 1) {
      setFlippedCount(prev => Math.max(prev - 1, 0));
    }
  };

  const turnNext = () => setFlippedCount(prev => Math.min(prev + 1, totalSheets));
  const turnPrev = () => setFlippedCount(prev => Math.max(prev - 1, 0));

  const minSwipeDistance = 40;
  
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) turnNext(); // Swipe Left
    if (distance < -minSwipeDistance) turnPrev(); // Swipe Right
  };

  const handleSendMessage = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!userInput.trim() || isAILoading) return;

    const newMessages = [...messages, { role: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsAILoading(true);

    try {
      const apiKey = ""; // Canvas handles API Key automatically
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const systemPrompt = `You are an elite AI Investment Analyst for '1816 Maxwell', an ultra-luxury real estate development in Oceanside, Oregon. 
      You are speaking to institutional investors, private equity analysts, and high-net-worth family offices. Maintain a sophisticated, concise, and professional tone.
      
      Project Data:
      - Asset: 24 ultra-luxury keys, 40,000 SF build. Irreplaceable coastal promontory.
      - Budget: $22M Total Capitalization. Target Equity: $8M - $10M.
      - Financials (Stabilized Year 3): 66% Occupancy, $1,101 ADR, $9.16M Gross Revenue, 49.8% Dept Margins, $1.98M NOI.
      - Target Returns: 21.5% Levered IRR, 2.60x Equity Multiple, 14.8% Unlevered IRR, 7.00% Exit Cap Rate, 9.03% Stabilized YOC.
      - Architecture: Proprietary 3D printed zero-waste stone composite panels by Mighty Buildings (150+ MPH wind tolerance).
      - Market: 5.5M annual travelers, <100 luxury keys. Drive markets: Portland (1.5hr), Seattle (3.5hr). Target Flag: Leading Hotels of the World (LHW - 4.5M members).
      - Comps: The Stephanie Inn (~$1,100 ADR), Headlands Lodge (~$950 ADR). Peak target rates: >$2,000/night.
      - Sponsors: Walker Templeton (Developer) and Robert Gutierrez (Capital Markets).
      
      Answer the user's question accurately based ONLY on this provided data. Do not make up financial figures. If a detail is missing, state it is available in the secure data room.`;

      const formattedHistory = newMessages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const payload = {
        contents: formattedHistory,
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      
      if (result.candidates && result.candidates[0]?.content?.parts?.[0]?.text) {
        setMessages(prev => [...prev, { role: 'model', text: result.candidates[0].content.parts[0].text }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: 'I apologize, I am currently unable to process that request. Please review the specific pages of the Offering Memorandum.' }]);
      }
    } catch (error) {
      console.error('AI Analyst Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Connection to the data room analytics server was interrupted. Please try again.' }]);
    } finally {
      setIsAILoading(false);
    }
  };

  if (!mounted) return null;

  const sheets = [
    {
      // Sheet 0: Cover / Table of Contents
      front: (
        <div className="w-full h-full relative flex flex-col items-center justify-center text-center shadow-[inset_40px_0_80px_rgba(0,0,0,0.9)] overflow-hidden bg-[#050810]">
          {/* Changed cover image to object-cover to act as full-bleed background without distortion */}
          <img src="/Images/page10-sunset-render.jpg" alt="Cover" className="absolute inset-0 w-full h-full object-cover scale-[1.02]" />
          <div className="absolute inset-0 bg-[#02050a]/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#02050a] via-[#02050a]/60 to-transparent"></div>
          
          <div className="relative z-10 p-6 md:p-20 flex flex-col items-center w-full mt-auto">
            <h3 className="uppercase tracking-[0.3em] md:tracking-[0.5em] text-[8px] md:text-[10px] text-[#d4af37] mb-4 md:mb-8 font-light drop-shadow-md">Institutional Offering Memorandum</h3>
            <h1 className="font-serif text-[40px] md:text-[80px] lg:text-[100px] leading-none mb-4 md:mb-8 font-medium tracking-tighter text-white drop-shadow-2xl">
              1816 MAXWELL
            </h1>
            <div className="w-16 md:w-32 h-[1px] bg-[#d4af37] mb-4 md:mb-8 opacity-70"></div>
            <h2 className="font-mono text-[7px] md:text-[10px] tracking-[0.2em] md:tracking-[0.4em] uppercase text-[#a0a0a0] flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-8 md:mb-12">
               <span>Oceanside, Oregon</span> 
               <span className="hidden md:block w-1 h-1 bg-[#d4af37] rounded-full"></span> 
               <span>$22M Target Capitalization</span>
            </h2>
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#f2f0e9] text-[#111] p-6 md:p-16 flex flex-col shadow-[inset_-30px_0_60px_rgba(0,0,0,0.06)] relative border-r border-[#d4d0c5]">
          <h3 className="font-serif text-[14px] md:text-[18px] mb-6 md:mb-12 border-b border-[#111] pb-4 md:pb-6 tracking-[0.2em] uppercase text-[#111]">Table of Contents</h3>
          <div className="flex-1 flex flex-col justify-center gap-4 md:gap-6 font-mono text-[8px] md:text-[11px] uppercase tracking-[0.1em]">
            {[
              { num: 'I.', title: 'Executive Summary', page: '03' },
              { num: 'II.', title: 'Engineering & ESG', page: '05' },
              { num: 'III.', title: 'Market Fundamentals', page: '07' },
              { num: 'IV.', title: 'Competitive Set Analysis', page: '09' },
              { num: 'V.', title: 'Site Architecture', page: '11' },
              { num: 'VI.', title: 'Schematic Layouts', page: '13' },
              { num: 'VII.', title: 'Pro Forma Economics', page: '15' },
              { num: 'VIII.', title: 'Target Returns & Capital', page: '17' },
            ].map((item, i) => (
              <div key={`toc-${i}`} className="flex items-end w-full group cursor-default">
                <span className="text-[#a0a0a0] w-6 md:w-8">{item.num}</span>
                <span className="text-[#111] tracking-[0.1em] md:tracking-[0.2em]">{item.title}</span>
                <div className="flex-1 border-b border-dotted border-[#a0a0a0] mx-2 md:mx-4 opacity-30"></div>
                <span className="text-[#d4af37]">{item.page}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      // Sheet 1: Executive Summary / Aerial
      front: (
        <div className="w-full h-full bg-[#f2f0e9] text-[#111] p-6 md:p-16 flex flex-col shadow-[inset_30px_0_60px_rgba(0,0,0,0.06)] relative">
          <div className="flex justify-between items-end border-b border-[#111] pb-4 md:pb-6 mb-6 md:mb-10">
            <h2 className="font-serif text-[20px] md:text-[36px] tracking-tight leading-none">Generational Asset</h2>
            <span className="font-mono text-[7px] md:text-[9px] uppercase tracking-[0.3em] text-[#7a7a7a]">Section I.</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 flex-1">
            <div className="flex flex-col items-center justify-center p-4 md:p-8 bg-white border border-[#e2dfd5] shadow-sm">
              <BedDouble size={20} className="text-[#d4af37] mb-2 md:mb-4" />
              <span className="font-serif text-[24px] md:text-[32px] text-[#1a1a1a] mb-1">24</span>
              <span className="text-[7px] md:text-[9px] uppercase tracking-[0.2em] text-[#7a7a7a] text-center">Ultra-Luxury Keys</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 md:p-8 bg-white border border-[#e2dfd5] shadow-sm">
              <Building2 size={20} className="text-[#d4af37] mb-2 md:mb-4" />
              <span className="font-serif text-[24px] md:text-[32px] text-[#1a1a1a] mb-1">40,000</span>
              <span className="text-[7px] md:text-[9px] uppercase tracking-[0.2em] text-[#7a7a7a] text-center">Total SF Build</span>
            </div>
          </div>
          
          <div className="mt-6 md:mt-10 border-t border-[#e2dfd5] pt-6 md:pt-10 flex justify-between">
             <div className="flex flex-col">
               <span className="text-[7px] md:text-[9px] uppercase tracking-[0.2em] text-[#7a7a7a] mb-1 md:mb-2">Total Budget</span>
               <span className="font-serif text-[16px] md:text-[24px] tracking-wider text-[#1a1a1a]">$22,000,000</span>
             </div>
             <div className="flex flex-col text-right">
               <span className="text-[7px] md:text-[9px] uppercase tracking-[0.2em] text-[#7a7a7a] mb-1 md:mb-2">Target Equity</span>
               <span className="font-serif text-[16px] md:text-[24px] tracking-wider text-[#d4af37]">$8M - $10M</span>
             </div>
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#02050a] shadow-[inset_-30px_0_80px_rgba(0,0,0,0.8)] relative p-0 overflow-hidden">
          {/* Changed aerial image to object-cover */}
          <img src="/Images/OCEANSIDE%20-%20AERIAL%20VIEW.jpg" alt="Aerial View" className="w-full h-full object-cover opacity-80" />
          <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-6 max-w-[80%] md:max-w-sm">
            <h4 className="font-serif text-white text-[12px] md:text-[16px] mb-1 md:mb-2">Irreplaceable Coastal Promontory</h4>
            <p className="font-mono text-[6px] md:text-[9px] text-[#d4d0c5] tracking-widest uppercase leading-loose">
              Grandfathered zoning securing unobstructed Pacific sightlines.
            </p>
          </div>
        </div>
      )
    },
    {
      // Sheet 2: Innovation / Mighty Buildings
      front: (
        <div className="w-full h-full bg-[#f2f0e9] text-[#111] p-6 md:p-16 flex flex-col shadow-[inset_30px_0_60px_rgba(0,0,0,0.06)] relative border-r border-[#d4d0c5]">
          <div className="flex justify-between items-end border-b border-[#111] pb-4 md:pb-6 mb-6 md:mb-10">
            <h2 className="font-serif text-[20px] md:text-[36px] tracking-tight leading-none">Engineering & ESG</h2>
            <Leaf className="text-[#d4af37]" size={20}/>
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-[10px] md:text-[12px] leading-[1.8] md:leading-[2.2] font-serif text-[#5a5a5a] text-justify mb-6 md:mb-8">
              Integrating proprietary 3D printed, zero-waste stone composite panels engineered by Mighty Buildings. This methodology accelerates project timelines by over 30%, drastically mitigating carry costs and construction loan interest, while delivering wind shear tolerance exceeding 150+ MPH.
            </p>
            <ul className="space-y-3 md:space-y-4 border-t border-[#d4d0c5] pt-4 md:pt-6 font-mono text-[7px] md:text-[9px] uppercase tracking-[0.1em] text-[#333]">
              <li className="flex justify-between"><span>Material Waste Reduction</span> <span className="font-bold text-[#d4af37]">99%</span></li>
              <li className="flex justify-between"><span>Wind Shear Tolerance</span> <span className="font-bold text-[#111]">150+ MPH</span></li>
              <li className="flex justify-between"><span>Timeline Compression</span> <span className="font-bold text-[#111]">~4 Months</span></li>
            </ul>
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#111] shadow-[inset_-30px_0_80px_rgba(0,0,0,0.7)] relative p-0 overflow-hidden">
          <img src="/Images/page31-mighty-buildings.jpg.png" alt="Mighty Buildings" className="w-full h-full object-cover grayscale-[40%]" />
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 bg-white/90 backdrop-blur px-4 py-2 md:px-8 md:py-4 shadow-xl">
             <span className="font-mono text-[6px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#1a1a1a]">Proprietary Panel System</span>
          </div>
        </div>
      )
    },
    {
      // Sheet 3: Market Fundamentals / LHW Target
      front: (
        <div className="w-full h-full bg-[#f2f0e9] text-[#111] p-6 md:p-16 flex flex-col shadow-[inset_30px_0_60px_rgba(0,0,0,0.06)] relative border-r border-[#d4d0c5]">
          <div className="flex justify-between items-end border-b border-[#111] pb-4 md:pb-6 mb-6 md:mb-10">
            <h2 className="font-serif text-[20px] md:text-[36px] tracking-tight leading-none">Market Fundamentals</h2>
            <span className="font-mono text-[7px] md:text-[9px] uppercase tracking-[0.3em] text-[#7a7a7a]">Section III.</span>
          </div>

          <div className="flex flex-col flex-1">
            <p className="text-[10px] md:text-[12px] leading-[1.8] md:leading-[2.2] font-serif text-[#5a5a5a] text-justify mb-6 md:mb-8">
              The Northern Oregon Coast experiences a profound, structural supply-demand imbalance. With over 5.5 million annual affluent travelers converging on the region, the market remains drastically underserved with fewer than 100 true luxury keys.
            </p>
            
            <div className="bg-white border border-[#e2dfd5] p-4 md:p-6 shadow-sm flex flex-col flex-1">
              <span className="font-mono text-[7px] md:text-[9px] uppercase tracking-[0.2em] text-[#111] mb-4 md:mb-6 block border-b border-[#d4d0c5] pb-2 md:pb-4">Supply vs Demand Delta</span>
              <div className="flex-1 flex items-end gap-4 md:gap-6 px-2 md:px-4">
                <div className="w-1/2 flex flex-col items-center gap-2">
                  <div className="w-full bg-[#111] h-[90%] relative flex items-start justify-center pt-2 md:pt-4">
                    <span className="text-white font-mono text-[8px] md:text-[10px]">5.5M</span>
                  </div>
                  <span className="font-mono text-[5px] md:text-[7px] uppercase text-[#7a7a7a] tracking-widest text-center">Annual<br/>Travelers</span>
                </div>
                <div className="w-1/2 flex flex-col items-center gap-2">
                  <div className="w-full bg-[#d4af37] h-[15%] relative flex items-start justify-center pt-1 md:pt-2">
                    <span className="text-[#111] font-mono text-[8px] md:text-[10px]">&lt;100</span>
                  </div>
                  <span className="font-mono text-[5px] md:text-[7px] uppercase text-[#7a7a7a] tracking-widest text-center">Luxury<br/>Keys</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#02050a] text-[#eaeaea] p-6 md:p-16 flex flex-col shadow-[inset_-30px_0_80px_rgba(0,0,0,0.9)] relative">
          <div className="flex justify-between items-end border-b border-[#333] pb-4 md:pb-6 mb-10 md:mb-16">
            <h2 className="font-serif text-[20px] md:text-[36px] tracking-tight leading-none text-white">Target Affiliation</h2>
            <ShieldCheck size={20} className="text-[#d4af37]" />
          </div>

          <div className="flex flex-col items-center justify-center flex-1 text-center max-w-md mx-auto">
            <h3 className="font-serif text-[24px] md:text-[32px] tracking-[0.2em] mb-2 md:mb-4 text-white">LHW</h3>
            <h4 className="font-mono text-[7px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] text-[#a0a0a0] mb-6 md:mb-8">Leading Hotels of the World</h4>
            
            <p className="hidden md:block text-[11px] leading-[2.2] text-[#8a8a8a] font-serif text-justify mb-12">
              Positioned to tap into a highly affluent, global guest network by meeting rigorous physical, architectural, and bespoke service standards. LHW drives massive direct booking revenue, bypassing OTA commissions.
            </p>

            <div className="w-full border border-[#222] bg-[#050810] py-6 md:py-10 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-30"></div>
               <div className="text-[28px] md:text-[42px] font-serif text-[#d4af37] mb-1 md:mb-2 tracking-tight">4.5 Million</div>
               <div className="font-mono text-[6px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#7a7a7a]">Active Network Members</div>
            </div>
          </div>
        </div>
      )
    },
    {
      // Sheet 4: Comp Set / Economics
      front: (
        <div className="w-full h-full bg-[#f2f0e9] text-[#111] p-6 md:p-16 flex flex-col shadow-[inset_30px_0_60px_rgba(0,0,0,0.06)] relative border-r border-[#d4d0c5]">
          <div className="flex justify-between items-end border-b border-[#111] pb-4 md:pb-6 mb-6 md:mb-10">
            <h2 className="font-serif text-[20px] md:text-[36px] tracking-tight leading-none">Competitive Set</h2>
            <span className="font-mono text-[7px] md:text-[9px] uppercase tracking-[0.3em] text-[#7a7a7a]">Section IV.</span>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="w-full font-mono text-[8px] md:text-[10px] text-left">
                <thead>
                  <tr className="border-b-2 border-[#111] text-[#7a7a7a] uppercase tracking-[0.1em]">
                    <th className="py-2 md:py-3 font-normal">Property</th>
                    <th className="py-2 md:py-3 font-normal text-right hidden md:table-cell">Keys</th>
                    <th className="py-2 md:py-3 font-normal text-right">Est. ADR</th>
                  </tr>
                </thead>
                <tbody className="text-[#111]">
                  <tr className="border-b border-[#d4d0c5]">
                    <td className="py-3 md:py-5 font-serif text-[12px] md:text-[14px]">The Stephanie Inn<br/><span className="font-mono text-[6px] text-gray-400">Cannon Beach, OR</span></td>
                    <td className="py-3 md:py-5 text-right hidden md:table-cell">41</td>
                    <td className="py-3 md:py-5 text-right font-bold">~$1,100</td>
                  </tr>
                  <tr className="border-b border-[#d4d0c5]">
                    <td className="py-3 md:py-5 font-serif text-[12px] md:text-[14px]">Headlands Lodge<br/><span className="font-mono text-[6px] text-gray-400">Pacific City, OR</span></td>
                    <td className="py-3 md:py-5 text-right hidden md:table-cell">51</td>
                    <td className="py-3 md:py-5 text-right font-bold">~$950</td>
                  </tr>
                  <tr className="bg-[#111] text-white">
                    <td className="py-3 md:py-5 px-2 md:px-4 font-serif text-[12px] md:text-[14px] text-[#d4af37]">1816 Maxwell</td>
                    <td className="py-3 md:py-5 text-right hidden md:table-cell">24</td>
                    <td className="py-3 md:py-5 px-2 md:px-4 text-right font-bold text-[#d4af37]">$1,038</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#f2f0e9] text-[#111] p-6 md:p-16 flex flex-col shadow-[inset_-30px_0_60px_rgba(0,0,0,0.06)] relative">
          <div className="flex justify-between items-end border-b border-[#111] pb-4 md:pb-6 mb-6 md:mb-10">
            <h2 className="font-serif text-[20px] md:text-[36px] tracking-tight leading-none text-right w-full">Underwriting</h2>
          </div>

          <div className="flex-1 bg-white border border-[#e2dfd5] p-4 md:p-8 shadow-sm flex flex-col justify-center text-center">
            <TrendingUp size={24} className="text-[#d4af37] mx-auto mb-4 md:mb-8" />
            <h3 className="font-mono text-[7px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] text-[#7a7a7a] mb-2 md:mb-4">Target Stabilized ADR</h3>
            <div className="text-[40px] md:text-[64px] font-serif text-[#111] mb-2 md:mb-4 tracking-wide">$1,038</div>
            <div className="text-[9px] md:text-[12px] font-serif text-[#d4af37] italic">Conservative Baseline</div>
            <p className="mt-6 md:mt-10 font-serif text-[9px] md:text-[11px] text-[#7a7a7a]">
              High season projections indicate potential peak rates exceeding <strong className="text-[#111] font-normal">$2,000/night</strong>.
            </p>
          </div>
        </div>
      )
    },
    {
      // Sheet 5: Site Architecture
      front: (
        <div className="w-full h-full bg-[#f2f0e9] shadow-[inset_30px_0_60px_rgba(0,0,0,0.06)] p-6 md:p-16 flex flex-col relative border-r border-[#d4d0c5]">
          <h2 className="font-serif text-[16px] md:text-[24px] mb-6 md:mb-10 tracking-[0.1em] text-center border-b border-[#111] pb-4">Site Architecture</h2>
          <div className="flex-1 bg-white p-2 md:p-6 shadow-sm border border-[#e2dfd5] flex items-center justify-center overflow-hidden">
            {/* Added object-contain to structural drawings to prevent vertical stretching */}
            <img src="/Images/page5-site-plan.jpg" alt="Master Plan" className="w-full h-full object-contain mix-blend-multiply" />
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#f2f0e9] text-[#111] p-6 md:p-16 flex flex-col justify-center shadow-[inset_-30px_0_60px_rgba(0,0,0,0.06)] relative">
          <h2 className="font-serif text-[16px] md:text-[24px] mb-8 md:mb-16 tracking-[0.1em] border-b border-[#e2dfd5] pb-4 md:pb-8 text-center">Structural Layout</h2>
          <div className="space-y-6 md:space-y-12 px-2 md:px-8">
            <div className="flex flex-col">
              <h3 className="font-serif text-[14px] md:text-[20px] text-[#d4af37] mb-1 md:mb-3">Building 1: Core</h3>
              <p className="text-[9px] md:text-[11px] leading-[1.8] md:leading-[2] font-serif text-[#5a5a5a] text-justify">
                Primary arrival experience, grand lobby, signature restaurant, conference center, and world-class spa.
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="font-serif text-[14px] md:text-[20px] text-[#1a1a1a] mb-1 md:mb-3">Building 2: Suites</h3>
              <p className="text-[9px] md:text-[11px] leading-[1.8] md:leading-[2] font-serif text-[#5a5a5a] text-justify">
                Multi-story luxury key units, designed with unobstructed coastal views and ultra-premium finishes.
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="font-serif text-[14px] md:text-[20px] text-[#1a1a1a] mb-1 md:mb-3">Building 3: Penthouses</h3>
              <p className="text-[9px] md:text-[11px] leading-[1.8] md:leading-[2] font-serif text-[#5a5a5a] text-justify">
                The apex of the property, offering sprawling layouts and absolute privacy for elite clientele.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      // Sheet 6: Schematic Layouts
      front: (
        <div className="w-full h-full bg-[#f2f0e9] text-[#111] p-6 md:p-16 flex flex-col shadow-[inset_30px_0_60px_rgba(0,0,0,0.06)] relative border-r border-[#d4d0c5]">
          <h2 className="font-serif text-[12px] md:text-[16px] mb-6 md:mb-12 tracking-[0.2em] md:tracking-[0.4em] text-[#4a4a4a] uppercase text-center border-b border-[#e2dfd5] pb-4 md:pb-8">Building One Layout</h2>
          <div className="flex-1 bg-white border border-[#e2dfd5] p-4 md:p-10 flex flex-col justify-center relative shadow-sm overflow-hidden">
            <span className="absolute top-4 left-4 md:top-8 md:left-8 text-[6px] md:text-[9px] font-serif uppercase tracking-[0.3em] text-[#a0a0a0] z-10">First Floor</span>
            {/* Added object-contain */}
            <img src="/Images/Building%20One%20First%20Floor.png" alt="Building 1 First Floor" className="w-full h-full object-contain mix-blend-multiply opacity-90" />
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#f2f0e9] text-[#111] p-6 md:p-16 flex flex-col shadow-[inset_-30px_0_60px_rgba(0,0,0,0.06)] relative">
          <h2 className="font-serif text-[12px] md:text-[16px] mb-6 md:mb-12 tracking-[0.2em] md:tracking-[0.4em] text-[#4a4a4a] uppercase text-center border-b border-[#e2dfd5] pb-4 md:pb-8">Building Three Layout</h2>
          <div className="flex-1 bg-white border border-[#e2dfd5] p-4 md:p-10 flex flex-col justify-center relative shadow-sm overflow-hidden">
            <span className="absolute top-4 left-4 md:top-8 md:left-8 text-[6px] md:text-[9px] font-serif uppercase tracking-[0.3em] text-[#a0a0a0] z-10">Lower Floor One</span>
            {/* Added object-contain */}
            <img src="/Images/Building%20Three%20Lower%20Floor%20One.png" alt="Building 3 Lower Floor" className="w-full h-full object-contain mix-blend-multiply opacity-90" />
          </div>
        </div>
      )
    },
    {
      // Sheet 7: Pro Forma Economics
      front: (
        <div className="w-full h-full bg-[#f2f0e9] text-[#111] p-6 md:p-16 flex flex-col justify-center shadow-[inset_30px_0_60px_rgba(0,0,0,0.06)] relative border-r border-[#d4d0c5]">
          <h2 className="font-serif text-[20px] md:text-[28px] mb-8 md:mb-16 tracking-[0.1em] text-center text-[#111] border-b border-[#111] pb-4">Pro Forma Economics</h2>
          <div className="px-2 md:px-6">
             <h4 className="text-[7px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.4em] text-[#7a7a7a] mb-6 md:mb-10 border-b border-[#e2dfd5] pb-2 md:pb-4">Year 3 Revenues (Stabilized)</h4>
             <table className="w-full font-mono text-[9px] md:text-[14px]">
               <tbody>
                 <tr className="border-b border-[#e2dfd5]">
                   <td className="py-3 md:py-6 text-[#5a5a5a]">Occupancy</td>
                   <td className="py-3 md:py-6 text-right tracking-wider font-bold">66.0%</td>
                 </tr>
                 <tr className="border-b border-[#e2dfd5]">
                   <td className="py-3 md:py-6 text-[#5a5a5a]">Average Daily Rate (ADR)</td>
                   <td className="py-3 md:py-6 text-right tracking-wider font-bold">$1,101</td>
                 </tr>
                 <tr className="border-b border-[#e2dfd5]">
                   <td className="py-3 md:py-6 text-[#1a1a1a] font-medium">Gross Revenue</td>
                   <td className="py-3 md:py-6 text-right tracking-wider text-[#1a1a1a] font-bold">$9,160,000</td>
                 </tr>
               </tbody>
             </table>
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#f2f0e9] text-[#111] p-6 md:p-16 flex flex-col justify-center shadow-[inset_-30px_0_60px_rgba(0,0,0,0.06)] relative">
          <div className="px-2 md:px-6 mt-8 md:mt-16">
             <h4 className="text-[7px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.4em] text-[#7a7a7a] mb-6 md:mb-10 border-b border-[#e2dfd5] pb-2 md:pb-4">Year 3 Margins (Stabilized)</h4>
             <table className="w-full font-mono text-[9px] md:text-[14px]">
               <tbody>
                 <tr className="border-b border-[#e2dfd5]">
                   <td className="py-3 md:py-6 text-[#5a5a5a]">Departmental Margins</td>
                   <td className="py-3 md:py-6 text-right tracking-wider font-bold">49.8%</td>
                 </tr>
                 <tr className="border-b border-[#e2dfd5]">
                   <td className="py-3 md:py-6 text-[#5a5a5a]">Undistributed OpEx</td>
                   <td className="py-3 md:py-6 text-right tracking-wider font-bold text-[#c43a3a]">(22.4%)</td>
                 </tr>
                 <tr>
                   <td className="py-6 md:py-10 text-[#1a1a1a] font-medium text-[12px] md:text-[18px]">Net Operating Income</td>
                   <td className="py-6 md:py-10 text-right tracking-wider text-[12px] md:text-[18px] text-[#d4af37] font-bold">$1,980,000</td>
                 </tr>
               </tbody>
             </table>
          </div>
        </div>
      )
    },
    {
      // Sheet 8: Target Returns / Sponsorship
      front: (
        <div className="w-full h-full bg-[#02050a] text-white p-6 md:p-16 flex flex-col shadow-[inset_30px_0_60px_rgba(0,0,0,0.9)] relative border-r border-[#333]">
          <div className="flex justify-between items-end border-b border-[#333] pb-4 md:pb-6 mb-8 md:mb-12">
            <h2 className="font-serif text-[20px] md:text-[36px] tracking-tight leading-none text-[#d4af37]">Target Returns</h2>
            <BarChart3 size={16} className="text-[#7a7a7a]" />
          </div>

          <div className="flex flex-col gap-6 md:gap-8 flex-1 justify-center px-2 md:px-4">
            <div className="flex justify-between items-end border-b border-[#222] pb-4 md:pb-6">
              <span className="font-mono text-[7px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#7a7a7a]">Levered IRR</span>
              <span className="font-serif text-[28px] md:text-[42px] tracking-widest text-white leading-none">21.5%</span>
            </div>
            <div className="flex justify-between items-end border-b border-[#222] pb-4 md:pb-6">
              <span className="font-mono text-[7px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#7a7a7a]">Equity Multiple</span>
              <span className="font-serif text-[28px] md:text-[42px] tracking-widest text-white leading-none">2.60x</span>
            </div>
            <div className="flex justify-between items-end border-b border-[#222] pb-4 md:pb-6">
              <span className="font-mono text-[7px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#7a7a7a]">Unlevered IRR</span>
              <span className="font-serif text-[16px] md:text-[24px] tracking-widest text-[#a0a0a0] leading-none">14.8%</span>
            </div>
            <div className="flex justify-between items-end border-b border-[#222] pb-4 md:pb-6">
              <span className="font-mono text-[7px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#7a7a7a]">Exit Cap Rate</span>
              <span className="font-serif text-[16px] md:text-[24px] tracking-widest text-[#a0a0a0] leading-none">7.00%</span>
            </div>
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#f2f0e9] text-[#111] p-6 md:p-16 flex flex-col shadow-[inset_-30px_0_60px_rgba(0,0,0,0.06)] relative">
          <div className="flex justify-between items-end border-b border-[#111] pb-4 md:pb-6 mb-8 md:mb-12">
            <h2 className="font-serif text-[20px] md:text-[36px] tracking-tight leading-none">Sponsorship</h2>
          </div>

          <div className="flex flex-col gap-6 md:gap-10 flex-1">
            <div className="bg-white border border-[#e2dfd5] p-4 md:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#d4d0c5] pb-2 md:pb-4 mb-2 md:mb-4">
                <h3 className="font-serif text-[16px] md:text-[24px] text-[#111]">Walker Templeton</h3>
                <span className="font-mono text-[6px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#d4af37] bg-[#111] text-white px-2 py-1 mt-2 md:mt-0">Sponsor / Developer</span>
              </div>
              <p className="font-serif text-[9px] md:text-[11px] leading-[1.8] md:leading-[2] text-[#5a5a5a] text-justify">
                Over two decades navigating complex regulatory environments of Pacific Northwest coastal development. Track record includes mastering Coastal Commission entitlements and luxury hospitality deliveries.
              </p>
            </div>

            <div className="bg-white border border-[#e2dfd5] p-4 md:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#d4d0c5] pb-2 md:pb-4 mb-2 md:mb-4">
                <h3 className="font-serif text-[16px] md:text-[24px] text-[#111]">Robert Gutierrez</h3>
                <span className="font-mono text-[6px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#111] border border-[#111] px-2 py-1 mt-2 md:mt-0">Capital Markets</span>
              </div>
              <p className="font-serif text-[9px] md:text-[11px] leading-[1.8] md:leading-[2] text-[#5a5a5a] text-justify">
                Institutional finance background specializing in structured equity and debt. Extensive experience architecting complex capital stacks and managing deployment for tier-one private equity sponsors.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      // Sheet 9: Full Bleed Back Image / Secure Data Room
      front: (
        <div className="w-full h-full bg-[#02050a] shadow-[inset_30px_0_80px_rgba(0,0,0,0.8)] relative p-0 overflow-hidden">
          <img src="/Images/OCEANSIDE%20-%20BUILDING%2003.jpg" alt="Building 3 Render" className="w-full h-full object-cover opacity-90 scale-105" />
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#02050a] text-white flex flex-col p-6 md:p-16 shadow-[inset_-30px_0_80px_rgba(0,0,0,0.95)] relative">
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto">
            <Lock size={24} strokeWidth={1} className="text-[#d4af37] mb-6 md:mb-10 opacity-90" />
            <h2 className="font-serif text-[24px] md:text-[36px] mb-4 md:mb-8 tracking-tight text-white">Secure Data Room</h2>
            <div className="w-12 md:w-16 h-[1px] bg-[#333] mb-4 md:mb-8"></div>
            <p className="text-[9px] md:text-[12px] font-serif text-[#8a8a8a] mb-8 md:mb-16 leading-[2] md:leading-[2.2] text-center">
              Access to the comprehensive due diligence repository, including full construction drawings, dynamic pro forma models, and environmental reports, is available upon execution of an NDA.
            </p>
            
            <button className="w-full py-4 md:py-5 border border-[#d4af37] bg-[#d4af37]/5 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#02050a] transition-colors duration-500 font-mono text-[7px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] flex items-center justify-center gap-3 md:gap-4 group">
              <Presentation size={12} className="group-hover:scale-110 transition-transform" /> Request Access
            </button>
          </div>
          <div className="mt-auto border-t border-[#333] pt-6 md:pt-8 flex justify-between items-center text-[#7a7a7a] font-mono text-[6px] md:text-[8px] uppercase tracking-[0.1em] md:tracking-[0.2em]">
            <span>Confidential & Proprietary</span>
            <span>Oceanside, OR</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#0d0f12] flex flex-col items-center justify-center p-2 md:py-12 lg:py-20 overflow-hidden font-sans selection:bg-[#d4af37] selection:text-white"
         onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEndHandler}>
      
      {/* Return to Portal Button - Enhanced Prominence */}
      <button className="fixed top-4 left-4 md:top-8 md:left-8 z-[100] px-4 py-2 md:px-6 md:py-3 bg-[#08090a]/90 backdrop-blur-sm border-2 border-[#d4af37] text-[#eaeaea] font-mono text-[9px] md:text-[11px] uppercase tracking-[0.2em] flex items-center gap-2 md:gap-3 overflow-hidden group hover:bg-[#d4af37] hover:text-[#02050a] transition-all duration-300 shadow-lg">
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
        <span className="hidden sm:inline font-semibold">Return to Portal</span>
        <span className="inline sm:hidden font-semibold">Back</span>
        <div className="absolute bottom-0 left-0 h-[2px] w-[200%] bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-gold-sweep" />
      </button>

      {/* 3D Styles, Mobile Safari Fixes, & Dog-Ear Physics */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gold-sweep { 0% { transform: translateX(-100%); } 100% { transform: translateX(50%); } }
        .animate-gold-sweep { animation: gold-sweep 4s linear infinite; }
        
        .flipbook-viewport {
          perspective: 2500px;
        }
        @media (min-width: 768px) { .flipbook-viewport { perspective: 4500px; } }
        
        /* Mobile Hardware Acceleration fixes */
        .flipbook-sheet {
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.64, 0.04, 0.35, 1);
          transform-origin: left center;
          will-change: transform;
        }
        @media (min-width: 768px) {
          .flipbook-sheet { transition: transform 1.2s cubic-bezier(0.64, 0.04, 0.35, 1); }
        }
        
        .flipbook-page {
          backface-visibility: hidden;
          /* Force Safari to layer correctly */
          transform: translateZ(1px); 
        }
        .flipbook-page-back {
          transform: rotateY(180deg) translateZ(1px);
        }
        
        .book-stack-shadow {
          box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 30px 60px rgba(0,0,0,0.4);
        }
        @media (min-width: 768px) {
          .book-stack-shadow { box-shadow: 0 60px 120px rgba(0,0,0,0.5), 0 100px 200px rgba(0,0,0,0.4), 0 20px 50px rgba(0,0,0,0.6); }
        }

        /* Dog Ear - Hidden on touch devices to avoid sticky states, shown on hover/desktop */
        .dog-ear-recto, .dog-ear-verso { display: none; }
        .glare-overlay { display: none; }

        @media (hover: hover) and (pointer: fine) {
          .dog-ear-recto {
            display: block; position: absolute; top: 0; right: 0; width: 48px; height: 48px;
            background: linear-gradient(-135deg, transparent 50%, rgba(0,0,0,0.15) 50%, #ffffff 52%);
            z-index: 50; transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1), height 0.4s cubic-bezier(0.25, 1, 0.5, 1);
            pointer-events: none; box-shadow: -2px 2px 8px rgba(0,0,0,0.08);
          }
          .dog-ear-verso {
            display: block; position: absolute; top: 0; left: 0; width: 48px; height: 48px;
            background: linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.15) 50%, #ffffff 52%);
            z-index: 50; transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1), height 0.4s cubic-bezier(0.25, 1, 0.5, 1);
            pointer-events: none; box-shadow: 2px 2px 8px rgba(0,0,0,0.08);
          }
          .sheet-unflipped:hover { transform: rotateY(-3deg); }
          .sheet-flipped:hover { transform: rotateY(-177deg); }
          .sheet-unflipped:hover .dog-ear-recto { width: 64px; height: 64px; }
          .sheet-flipped:hover .dog-ear-verso { width: 64px; height: 64px; }
          
          .glare-overlay {
            display: block; background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.03) 15%, rgba(255,255,255,0) 100%);
            opacity: 0; transition: opacity 1s ease; pointer-events: none;
          }
          .sheet-unflipped:hover .glare-overlay, .sheet-flipped:hover .glare-overlay { opacity: 1; }
        }
      `}} />

      {/* Responsive Aspect Ratio Book Container - Enforcing Strict 16:9 Landscape Aspect Ratio */}
      <div className="relative w-[95vw] md:w-[90vw] max-w-[1400px] aspect-video flipbook-viewport book-stack-shadow flex bg-[#010203] mt-8 md:mt-0">
        
        {/* Left Base Page (Closed Book Logic) */}
        {flippedCount > 0 && (
          <div className="w-1/2 h-full bg-[#02050a] border-l border-[#1a1a1a] shadow-[inset_-20px_0_50px_rgba(0,0,0,0.95)] md:shadow-[inset_-40px_0_100px_rgba(0,0,0,0.95)]"></div>
        )}
        
        {/* Right Base Page (Closed Book Logic) */}
        {flippedCount < totalSheets && (
          <div className={`w-1/2 h-full bg-[#02050a] border-r border-[#1a1a1a] shadow-[inset_20px_0_50px_rgba(0,0,0,0.95)] md:shadow-[inset_40px_0_100px_rgba(0,0,0,0.95)] ${flippedCount === 0 ? 'ml-auto' : ''}`}></div>
        )}

        {/* Deep Central Spine Shadow (Only shown when book is open) */}
        {flippedCount > 0 && flippedCount < totalSheets && (
          <div className="absolute left-1/2 top-0 bottom-0 w-16 md:w-32 -ml-8 md:-ml-16 z-40 pointer-events-none mix-blend-multiply flex">
             <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-black/30 to-black/80"></div>
             <div className="w-1/2 h-full bg-gradient-to-l from-transparent via-black/30 to-black/80"></div>
          </div>
        )}

        {/* Dynamic Sheets Container */}
        <div className={`absolute right-0 w-1/2 h-full z-10 ${flippedCount === 0 ? 'w-full md:w-1/2' : ''}`}>
          {sheets.map((sheet, index) => {
            const isFlipped = index < flippedCount;
            const zIndex = isFlipped ? index + 1 : totalSheets - index;
            const isInteractive = index === flippedCount || index === flippedCount - 1;

            return (
              <div
                key={`sheet-${index}`}
                onClick={() => isInteractive && handlePageClick(index)}
                className={`absolute inset-0 w-full h-full flipbook-sheet cursor-pointer ${
                  isFlipped ? 'sheet-flipped' : 'sheet-unflipped'
                }`}
                style={{
                  transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                  zIndex: zIndex,
                  pointerEvents: isInteractive ? 'auto' : 'none',
                  // Prevent touch actions from breaking the transform during swipe
                  touchAction: 'pan-y'
                }}
              >
                {/* Recto (Front Page) */}
                <div className="absolute inset-0 w-full h-full flipbook-page bg-[#f2f0e9] border-r border-[#111]/10 overflow-hidden shadow-[-2px_0_10px_rgba(0,0,0,0.05)]">
                  {sheet.front}
                  <div className="absolute inset-0 glare-overlay z-30"></div>
                  {index === flippedCount && index < totalSheets - 1 && (
                    <div className="dog-ear-recto"></div>
                  )}
                </div>

                {/* Verso (Back Page) */}
                <div className="absolute inset-0 w-full h-full flipbook-page flipbook-page-back bg-[#f2f0e9] border-l border-[#111]/10 overflow-hidden shadow-[2px_0_10px_rgba(0,0,0,0.05)]">
                  {sheet.back}
                  <div className="absolute inset-0 glare-overlay z-30 transform scale-x-[-1]"></div>
                  {index === flippedCount - 1 && index >= 0 && (
                    <div className="dog-ear-verso"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Terminal Navigation - Perfectly Centered & Accessible */}
      <div className="mx-auto mt-8 md:mt-12 flex items-center justify-center gap-6 md:gap-12 text-[#7a7a7a] bg-[#08090a] px-6 md:px-10 py-3 md:py-4 border border-[#222] shadow-xl rounded-sm">
        <button 
          onClick={turnPrev}
          disabled={flippedCount === 0}
          className="p-3 transition-all duration-300 disabled:opacity-20 hover:-translate-x-1 hover:text-[#d4af37] bg-[#111] rounded-full"
          aria-label="Previous Page"
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
        
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-8">
          <span className="font-mono text-[9px] md:text-[11px] tracking-[0.2em] md:tracking-[0.4em] uppercase text-[#a0a0a0]">
            Spread 0{Math.max(1, flippedCount)} / 0{totalSheets}
          </span>
          <div className="flex gap-[3px]">
            {Array.from({ length: totalSheets }).map((_, i) => (
              <div 
                key={`dot-${i}`} 
                className={`h-[10px] md:h-[14px] w-[3px] md:w-[4px] transition-colors duration-500 rounded-sm ${
                  i < flippedCount ? 'bg-[#d4af37]' : i === flippedCount ? 'bg-[#eaeaea]' : 'bg-[#333]'
                }`} 
              />
            ))}
          </div>
        </div>

        <button 
          onClick={turnNext}
          disabled={flippedCount === totalSheets}
          className="p-3 transition-all duration-300 disabled:opacity-20 hover:translate-x-1 hover:text-[#d4af37] bg-[#111] rounded-full"
          aria-label="Next Page"
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>
      </div>

      {}
      {/* AI Assistant Floating Button */}
      <button 
        onClick={() => setIsChatOpen(true)}
        className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[90] w-12 h-12 md:w-16 md:h-16 bg-[#111] border border-[#d4af37] text-[#d4af37] rounded-full shadow-[0_0_20px_rgba(212,175,55,0.2)] flex items-center justify-center hover:scale-110 transition-all duration-300 ${isChatOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare size={20} className="md:w-6 md:h-6" />
      </button>

      {/* AI Assistant Chat Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#05080f] border-l border-[#222] shadow-2xl z-[100] transform transition-transform duration-500 ease-[cubic-bezier(0.64,0.04,0.35,1)] flex flex-col ${isChatOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#222] bg-[#020305]">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></div>
            <div>
              <h3 className="font-serif text-[#eaeaea] tracking-widest text-[14px]">AI Analyst</h3>
              <p className="font-mono text-[#7a7a7a] text-[8px] uppercase tracking-[0.2em]">1816 Maxwell Data Room</p>
            </div>
          </div>
          <button onClick={() => setIsChatOpen(false)} className="text-[#7a7a7a] hover:text-[#eaeaea] transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-[#222] scrollbar-track-transparent">
          {messages.map((msg, idx) => (
            <div key={`msg-${idx}`} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-sm ${msg.role === 'user' ? 'bg-[#1a1a1a] border border-[#333] text-[#eaeaea]' : 'bg-transparent border-l-2 border-[#d4af37] text-[#a0a0a0]'}`}>
                <p className="font-serif text-[11px] leading-[1.8]">{msg.text}</p>
              </div>
              <span className="font-mono text-[7px] text-[#5a5a5a] uppercase tracking-widest mt-2 px-1">
                {msg.role === 'user' ? 'Investor' : 'System'}
              </span>
            </div>
          ))}
          {isAILoading && (
            <div className="flex flex-col items-start">
              <div className="max-w-[85%] p-4 bg-transparent border-l-2 border-[#d4af37] text-[#d4af37]">
                <Loader2 size={16} className="animate-spin" />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-[#222] bg-[#020305]">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <input 
              type="text" 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about returns, specs, or market..."
              className="flex-1 bg-[#111] border border-[#333] text-[#eaeaea] p-3 md:p-4 font-mono text-[10px] focus:outline-none focus:border-[#d4af37] transition-colors placeholder:text-[#5a5a5a]"
            />
            <button 
              type="submit" 
              disabled={isAILoading || !userInput.trim()}
              className="bg-[#d4af37] text-[#05080f] p-3 md:p-4 hover:bg-[#b8952b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default DigitalFlipbook;