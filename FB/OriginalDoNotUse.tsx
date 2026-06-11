import React, { useState } from 'react';
import { Lock, MapPin, Building, Droplets, TrendingUp, Key, ChevronRight, ChevronLeft } from 'lucide-react';

const DigitalFlipbook = () => {
  const [flippedCount, setFlippedCount] = useState(0);
  const totalSheets = 7;

  const handlePageClick = (index) => {
    if (index === flippedCount) {
      setFlippedCount(prev => Math.min(prev + 1, totalSheets));
    } else if (index === flippedCount - 1) {
      setFlippedCount(prev => Math.max(prev - 1, 0));
    }
  };

  const sheets = [
    {
      // Sheet 0: Cover / Disclaimer
      front: (
        <div className="w-full h-full bg-[#0b101f] text-[#d4af37] flex flex-col items-center justify-center p-12 text-center border-l-8 border-[#080d19] shadow-[inset_20px_0_40px_rgba(0,0,0,0.8)] relative">
          <div className="absolute top-8 right-8"><Building size={24} className="opacity-50" /></div>
          <h3 className="uppercase tracking-widest text-sm mb-4 opacity-80">Confidential Institutional Offering Memorandum</h3>
          <h1 className="font-serif text-6xl mb-2 font-bold tracking-tight">1816 Maxwell</h1>
          <div className="w-24 h-1 bg-[#d4af37] my-8 opacity-70"></div>
          <h2 className="font-serif text-3xl tracking-wide flex items-center gap-3">
            <MapPin size={28} /> Oceanside, Oregon
          </h2>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#f8f9fa] text-slate-600 p-16 flex flex-col justify-center shadow-[inset_-20px_0_40px_rgba(0,0,0,0.05)]">
          <h3 className="font-serif text-xl mb-6 text-[#0b101f] border-b pb-4">Confidentiality & Disclaimer</h3>
          <p className="text-xs leading-relaxed text-justify mb-4">
            This confidential Offering Memorandum ("OM") has been prepared solely for informational purposes and does not constitute an offer to sell or a solicitation of an offer to buy the Property described herein. The information contained in this OM has been obtained from sources believed to be reliable; however, no representation or warranty, express or implied, is made as to its accuracy or completeness.
          </p>
          <p className="text-xs leading-relaxed text-justify mb-4">
            Prospective purchasers should make their own investigations, projections, and conclusions regarding the Property. The Owner expressly reserves the right, at its sole discretion, to reject any or all expressions of interest or offers to purchase the Property and/or to terminate discussions with any party at any time with or without notice.
          </p>
          <p className="text-xs leading-relaxed text-justify">
            By accepting this OM, you agree to treat the information contained herein strictly confidential.
          </p>
        </div>
      )
    },
    {
      // Sheet 1: Vision / Aerial Image
      front: (
        <div className="w-full h-full bg-[#f8f9fa] text-[#0b101f] p-16 flex flex-col justify-center shadow-[inset_20px_0_40px_rgba(0,0,0,0.05)]">
          <h2 className="font-serif text-4xl mb-8 tracking-tight">The Vision</h2>
          <p className="text-base leading-loose mb-6 text-slate-700">
            1816 Maxwell represents a generational opportunity to acquire a fully-entitled, shovel-ready luxury hospitality asset on the highly constrained Oregon Coast. Over the past three years, the sponsorship team has invested heavily to eliminate execution risk.
          </p>
          <div className="bg-white p-8 border border-slate-200 shadow-sm mt-4">
            <h4 className="font-serif text-xl mb-4 text-[#d4af37] flex items-center gap-2">
              <Key size={20} /> Pre-Development Milestones
            </h4>
            <ul className="space-y-4 text-sm text-slate-700">
              <li className="flex justify-between border-b pb-2"><span>Pre-development Capital Deployed</span> <strong>$500,000+</strong></li>
              <li className="flex justify-between border-b pb-2"><span>Geotechnical Studies</span> <strong>Completed & Approved</strong></li>
              <li className="flex justify-between border-b pb-2"><span>Zoning Status</span> <strong>Grandfathered Commercial</strong></li>
              <li className="flex justify-between"><span>Coastal Commission</span> <strong>Fully Permitted</strong></li>
            </ul>
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full relative bg-slate-900 shadow-[inset_-20px_0_40px_rgba(0,0,0,0.5)]">
          <img src="/Images/OCEANSIDE - AERIAL VIEW.jpg" alt="Aerial View" className="w-full h-full object-cover opacity-90 mix-blend-luminosity" />
          <div className="absolute bottom-8 left-8 bg-[#0b101f]/80 backdrop-blur px-6 py-4 border-l-4 border-[#d4af37]">
            <p className="text-white font-serif text-lg">Oceanside Peninsula</p>
            <p className="text-[#d4af37] text-sm uppercase tracking-wide">Aerial Perspective</p>
          </div>
        </div>
      )
    },
    {
      // Sheet 2: Market Fundamentals / LHW
      front: (
        <div className="w-full h-full bg-[#f8f9fa] text-[#0b101f] p-16 flex flex-col justify-center shadow-[inset_20px_0_40px_rgba(0,0,0,0.05)]">
          <h2 className="font-serif text-4xl mb-8 tracking-tight">Market Fundamentals</h2>
          <p className="text-base leading-loose mb-8 text-slate-700">
            The Northern Oregon Coast experiences massive supply-demand imbalances, creating a highly lucrative environment for ultra-luxury keys.
          </p>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="bg-slate-100 p-6 rounded-sm text-center">
              <div className="text-4xl font-serif text-[#0b101f] mb-2">5.5M</div>
              <div className="text-xs uppercase tracking-widest text-slate-500">Annual Travelers</div>
            </div>
            <div className="bg-slate-100 p-6 rounded-sm text-center">
              <div className="text-4xl font-serif text-[#0b101f] mb-2">&lt; 100</div>
              <div className="text-xs uppercase tracking-widest text-slate-500">Luxury Keys in Market</div>
            </div>
          </div>
          <h4 className="font-serif text-2xl mb-4 border-b pb-2">Primary Drive Markets</h4>
          <ul className="space-y-4 text-slate-700 text-sm">
            <li className="flex justify-between items-center"><span className="flex items-center gap-2"><MapPin size={16} className="text-[#d4af37]"/> Portland, OR</span> <strong>1.5 Hours</strong></li>
            <li className="flex justify-between items-center"><span className="flex items-center gap-2"><MapPin size={16} className="text-[#d4af37]"/> Seattle, WA</span> <strong>3.5 Hours</strong></li>
          </ul>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#f8f9fa] text-[#0b101f] p-16 flex flex-col justify-center shadow-[inset_-20px_0_40px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-24 h-24 border-2 border-[#d4af37] rounded-full flex items-center justify-center mb-4">
              <Building size={40} className="text-[#0b101f]" />
            </div>
            <h2 className="font-serif text-4xl tracking-tight">Target Flag: LHW</h2>
            <h3 className="uppercase tracking-widest text-sm text-slate-500">Leading Hotels of the World</h3>
            <p className="text-base leading-loose text-slate-700 mt-6 text-justify">
              The asset is being designed to meet the rigorous physical and service standards required for inclusion in The Leading Hotels of the World collection. This strategic positioning taps into a highly affluent, global guest network.
            </p>
            <div className="w-full bg-[#0b101f] text-white p-6 mt-8">
              <div className="text-3xl font-serif text-[#d4af37] mb-1">4.5 Million</div>
              <div className="text-sm uppercase tracking-wider">Active Leaders Club Members</div>
            </div>
          </div>
        </div>
      )
    },
    {
      // Sheet 3: Master Plan / Floorplans Grid
      front: (
        <div className="w-full h-full relative bg-[#e9ecef] shadow-[inset_20px_0_40px_rgba(0,0,0,0.1)] p-8 flex flex-col">
          <h2 className="font-serif text-3xl mb-6 tracking-tight text-[#0b101f]">Master Plan</h2>
          <div className="flex-1 bg-white border border-slate-300 shadow-inner overflow-hidden relative">
            <img src="/Images/page5-site-plan.jpg" alt="Site Plan" className="w-full h-full object-cover" />
          </div>
          <div className="mt-6 flex justify-between text-sm font-serif text-slate-700">
            <span>Building 1: Lobby & Spa</span>
            <span>Building 2: Suites</span>
            <span>Building 3: Penthouses</span>
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#f8f9fa] text-[#0b101f] p-12 flex flex-col shadow-[inset_-20px_0_40px_rgba(0,0,0,0.05)]">
          <h2 className="font-serif text-3xl mb-8 tracking-tight border-b pb-4">Schematic Floorplans</h2>
          <div className="flex-1 grid grid-rows-2 gap-8">
            <div className="bg-white border border-slate-200 p-4 shadow-sm flex flex-col items-center">
              <img src="/Images/Building One First Floor.png" alt="Building 1" className="flex-1 object-contain w-full h-48 opacity-80" />
              <p className="text-xs uppercase tracking-widest mt-2 text-slate-500">Building 1 - First Floor</p>
            </div>
            <div className="bg-white border border-slate-200 p-4 shadow-sm flex flex-col items-center">
              <img src="/Images/Building Three Lower Floor One.png" alt="Building 3" className="flex-1 object-contain w-full h-48 opacity-80" />
              <p className="text-xs uppercase tracking-widest mt-2 text-slate-500">Building 3 - Lower Level</p>
            </div>
          </div>
        </div>
      )
    },
    {
      // Sheet 4: Mighty Buildings / Financials Table
      front: (
        <div className="w-full h-full bg-[#0b101f] text-white p-12 flex flex-col shadow-[inset_20px_0_40px_rgba(0,0,0,0.8)]">
          <h2 className="font-serif text-3xl mb-6 tracking-tight text-[#d4af37]">3D Printed Innovation</h2>
          <p className="text-sm leading-relaxed mb-8 text-slate-300">
            Partnering with Mighty Buildings to utilize proprietary 3D printed, zero-waste stone composite panels. This accelerates construction timelines by 30% while delivering unparalleled structural integrity for coastal wind sheer.
          </p>
          <div className="flex-1 bg-slate-800 border border-slate-700 overflow-hidden relative">
            <img src="/Images/page31-mighty-buildings.jpg.png" alt="Mighty Buildings" className="w-full h-full object-cover mix-blend-overlay opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
               <Droplets size={48} className="text-[#d4af37] opacity-50" />
            </div>
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#f8f9fa] text-[#0b101f] p-12 flex flex-col justify-center shadow-[inset_-20px_0_40px_rgba(0,0,0,0.05)]">
          <h2 className="font-serif text-3xl mb-8 tracking-tight">Verified Pro Forma</h2>
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-[#0b101f]">
                <th className="py-3 font-serif uppercase text-xs tracking-wider">Metric (Stabilized)</th>
                <th className="py-3 font-serif uppercase text-xs tracking-wider text-right">Value</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr className="border-b border-slate-200">
                <td className="py-4">Stabilized Occupancy</td>
                <td className="py-4 text-right font-medium">66.0%</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-4">Average Daily Rate (ADR)</td>
                <td className="py-4 text-right font-medium">$1,101</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-4">RevPAR</td>
                <td className="py-4 text-right font-medium">$726</td>
              </tr>
              <tr className="border-b border-slate-200 bg-slate-50">
                <td className="py-4 pl-2 font-medium">Gross Revenue</td>
                <td className="py-4 text-right font-bold text-[#0b101f]">$9,160,000</td>
              </tr>
              <tr className="border-b-2 border-[#0b101f] bg-[#e9ecef]">
                <td className="py-4 pl-2 font-serif text-lg">Net Operating Income (NOI)</td>
                <td className="py-4 text-right font-serif text-lg font-bold text-[#d4af37]">$1,980,000</td>
              </tr>
            </tbody>
          </table>
          <p className="text-[10px] text-slate-400 mt-4 italic">*Projections based on Columbia Hospitality underwriting.</p>
        </div>
      )
    },
    {
      // Sheet 5: Target Returns / Sponsorship
      front: (
        <div className="w-full h-full bg-[#f8f9fa] text-[#0b101f] p-16 flex flex-col justify-center shadow-[inset_20px_0_40px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp size={32} className="text-[#d4af37]" />
            <h2 className="font-serif text-4xl tracking-tight">Target Returns</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-8 border-l-4 border-[#0b101f] shadow-sm flex flex-col">
              <span className="text-xs uppercase tracking-widest text-slate-500 mb-1">Levered IRR</span>
              <span className="font-serif text-5xl text-[#0b101f]">21.5%</span>
            </div>
            <div className="bg-white p-8 border-l-4 border-[#d4af37] shadow-sm flex flex-col">
              <span className="text-xs uppercase tracking-widest text-slate-500 mb-1">Equity Multiple</span>
              <span className="font-serif text-5xl text-[#0b101f]">2.60x</span>
            </div>
            <div className="bg-white p-8 border-l-4 border-slate-400 shadow-sm flex flex-col">
              <span className="text-xs uppercase tracking-widest text-slate-500 mb-1">Unlevered IRR</span>
              <span className="font-serif text-4xl text-slate-700">14.8%</span>
            </div>
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#0b101f] text-white p-16 flex flex-col shadow-[inset_-20px_0_40px_rgba(0,0,0,0.8)]">
          <h2 className="font-serif text-3xl mb-10 tracking-tight border-b border-slate-700 pb-4">Sponsorship</h2>
          <div className="space-y-10">
            <div>
              <h3 className="font-serif text-xl text-[#d4af37] mb-2">Walker Templeton</h3>
              <p className="text-xs text-slate-300 leading-relaxed text-justify">
                Over 20 years of experience in high-barrier-to-entry luxury coastal development. Proven track record of navigating complex entitlements, Coastal Commission approvals, and delivering award-winning hospitality assets across the Pacific Northwest.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-[#d4af37] mb-2">Robert Gutierrez</h3>
              <p className="text-xs text-slate-300 leading-relaxed text-justify">
                Institutional finance background specializing in structured equity and debt for ground-up hospitality. Previously managed $500M+ in deployment for tier-one private equity sponsors.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      // Sheet 6: Back Cover / Blank
      front: (
        <div className="w-full h-full bg-[#0b101f] text-white flex flex-col items-center justify-center p-12 text-center border-r-8 border-[#080d19] shadow-[inset_20px_0_40px_rgba(0,0,0,0.8)] relative">
          <Lock size={48} className="text-[#d4af37] mb-6 opacity-80" />
          <h2 className="font-serif text-4xl mb-4 tracking-tight">Secure Data Room</h2>
          <p className="text-sm text-slate-400 mb-8 max-w-[80%]">
            Full construction drawings, detailed pro forma, environmental reports, and geotechnical studies are available upon execution of NDA.
          </p>
          <button className="px-8 py-3 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0b101f] transition-colors tracking-widest uppercase text-xs">
            Request Access
          </button>
          <div className="absolute bottom-12 text-xs text-slate-600 tracking-widest">CONFIDENTIAL & PROPRIETARY</div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#080d19] border-r-8 border-[#04070a] shadow-[inset_-20px_0_40px_rgba(0,0,0,0.9)]">
           {/* True Back Cover - Blank interior */}
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-stone-200 flex flex-col items-center justify-center py-12">
      
      {/* Inline 3D Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .flipbook-viewport {
          perspective: 2500px;
        }
        .flipbook-sheet {
          transform-style: preserve-3d;
          transition: transform 1.2s cubic-bezier(0.64, 0.04, 0.35, 1);
          transform-origin: left center;
        }
        .flipbook-page {
          backface-visibility: hidden;
        }
        .flipbook-page-back {
          transform: rotateY(180deg);
        }
        /* Subtly invite interaction with hover */
        .sheet-unflipped:hover {
          transform: rotateY(-3deg);
          box-shadow: -10px 10px 20px rgba(0,0,0,0.2);
        }
        .sheet-flipped:hover {
          transform: rotateY(-177deg);
          box-shadow: 10px 10px 20px rgba(0,0,0,0.2);
        }
      `}} />

      {/* Book Container */}
      <div className="relative w-[1000px] h-[600px] flipbook-viewport drop-shadow-2xl flex">
        
        {/* Left Side Base (Appears when first page flips) */}
        <div className="w-1/2 h-full bg-[#080d19] rounded-l-md shadow-inner hidden"></div>

        {/* Center Spine Graphic */}
        <div className="absolute left-1/2 top-0 bottom-0 w-8 -ml-4 z-0 bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.2)] to-transparent rounded-full pointer-events-none"></div>

        {/* Sheets Container - Positioned on the right half initially */}
        <div className="absolute right-0 w-1/2 h-full z-10">
          {sheets.map((sheet, index) => {
            const isFlipped = index < flippedCount;
            // Manage Z-Index so stacked pages look correct on both sides
            const zIndex = isFlipped ? index + 1 : totalSheets - index;
            // Only allow interaction on the currently accessible top pages
            const isInteractive = index === flippedCount || index === flippedCount - 1;

            return (
              <div
                key={index}
                onClick={() => isInteractive && handlePageClick(index)}
                className={`absolute inset-0 w-full h-full flipbook-sheet cursor-pointer ${
                  isFlipped ? 'sheet-flipped' : 'sheet-unflipped'
                }`}
                style={{
                  transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                  zIndex: zIndex,
                  pointerEvents: isInteractive ? 'auto' : 'none'
                }}
              >
                {/* Front Page (Recto) */}
                <div className="absolute inset-0 w-full h-full flipbook-page bg-white overflow-hidden rounded-r-md">
                  {sheet.front}
                  
                  {/* Subtle next page indicator */}
                  {index === flippedCount && index < totalSheets - 1 && (
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-16 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-slate-400 bg-white/50 backdrop-blur rounded-l-xl pointer-events-none">
                       <ChevronRight size={24} />
                     </div>
                  )}
                </div>

                {/* Back Page (Verso) */}
                <div className="absolute inset-0 w-full h-full flipbook-page flipbook-page-back bg-white overflow-hidden rounded-l-md">
                  {sheet.back}

                  {/* Subtle prev page indicator */}
                  {index === flippedCount - 1 && (
                     <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-16 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-slate-400 bg-white/50 backdrop-blur rounded-r-xl pointer-events-none">
                       <ChevronLeft size={24} />
                     </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* External Controls */}
      <div className="mt-12 flex items-center gap-8">
        <button 
          onClick={() => setFlippedCount(Math.max(0, flippedCount - 1))}
          disabled={flippedCount === 0}
          className="p-3 rounded-full bg-white text-slate-800 shadow hover:shadow-md disabled:opacity-30 disabled:hover:shadow-none transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="font-serif text-slate-600 text-sm tracking-widest">
          SPREAD {flippedCount} / {totalSheets}
        </span>
        <button 
          onClick={() => setFlippedCount(Math.min(totalSheets, flippedCount + 1))}
          disabled={flippedCount === totalSheets}
          className="p-3 rounded-full bg-white text-slate-800 shadow hover:shadow-md disabled:opacity-30 disabled:hover:shadow-none transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>

    </div>
  );
};

export default DigitalFlipbook;