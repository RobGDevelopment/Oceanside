import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Lock, MapPin, Building2, ShieldCheck, Presentation, Leaf, TrendingUp, BedDouble, BarChart3 } from 'lucide-react';

const DigitalFlipbook = () => {
  const [flippedCount, setFlippedCount] = useState(0);
  const totalSheets = 10;
  
  // When flippedCount is 0, the book is considered "closed"
  const isClosed = flippedCount === 0;

  const handlePageClick = (index) => {
    if (index === flippedCount) {
      setFlippedCount(prev => Math.min(prev + 1, totalSheets));
    } else if (index === flippedCount - 1) {
      setFlippedCount(prev => Math.max(prev - 1, 0));
    }
  };

  const sheets = [
    {
      // Sheet 0: Executive Cover / Table of Contents
      front: (
        <div className="w-full h-full relative flex flex-col items-center justify-center text-center shadow-[inset_60px_0_120px_rgba(0,0,0,0.95)] overflow-hidden bg-[#04060a]">
          {/* Institutional Texture - Highly subdued image acting as a leather/slate texture */}
          <img src="/Images/page10-sunset-render.jpg" alt="Cover Texture" className="absolute inset-0 w-full h-full object-cover scale-[1.05] opacity-[0.15] mix-blend-screen grayscale" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#020305]/80 via-transparent to-[#020305]/80"></div>
          
          <div className="relative z-10 p-24 flex flex-col items-center w-full">
            <h3 className="uppercase tracking-[0.6em] text-[10px] text-[#8a8a8a] mb-10 font-mono font-light">Capital Markets</h3>
            <h1 className="font-serif text-[100px] leading-[0.9] mb-8 font-medium tracking-tighter text-[#f4f3ef] drop-shadow-2xl">
              EXECUTIVE<br/>SUMMARY
            </h1>
            <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-10 opacity-60"></div>
            <h2 className="font-serif text-[14px] tracking-[0.5em] uppercase text-[#d4af37] flex items-center gap-4">
               1816 Maxwell
            </h2>
          </div>

          <div className="absolute bottom-16 flex flex-col items-center">
            <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-[#5a5a5a]">Strictly Confidential</span>
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#f4f3ef] text-[#1a1a1a] p-24 flex flex-col justify-center shadow-[inset_-60px_0_80px_rgba(0,0,0,0.08)] relative border-r border-[#d1cec5]">
          <h3 className="font-serif text-[16px] mb-16 border-b border-[#d1cec5] pb-8 tracking-[0.3em] uppercase text-center text-[#4a4a4a]">Table of Contents</h3>
          <div className="flex-1 flex flex-col gap-8 font-mono text-[11px] uppercase tracking-[0.1em] px-8">
            {[
              { num: 'I.', title: 'Executive Summary', page: '03' },
              { num: 'II.', title: 'Environmental Design', page: '05' },
              { num: 'III.', title: 'Market Fundamentals', page: '07' },
              { num: 'IV.', title: 'Competitive Set Analysis', page: '09' },
              { num: 'V.', title: 'Master Plan & Layouts', page: '11' },
              { num: 'VI.', title: 'Pro Forma Economics', page: '15' },
              { num: 'VII.', title: 'Target Returns & Capital', page: '17' },
            ].map((item, i) => (
              <div key={i} className="flex items-end w-full group cursor-default">
                <span className="text-[#a0a0a0] w-10">{item.num}</span>
                <span className="text-[#1a1a1a] tracking-[0.2em]">{item.title}</span>
                <div className="flex-1 border-b border-dotted border-[#a0a0a0] mx-6 opacity-30 group-hover:opacity-100 transition-opacity"></div>
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
        <div className="w-full h-full bg-[#f4f3ef] text-[#1a1a1a] p-20 flex flex-col justify-center shadow-[inset_60px_0_80px_rgba(0,0,0,0.08)] relative">
          <h2 className="font-serif text-[32px] mb-16 tracking-[0.1em] text-center">Generational Asset</h2>
          <div className="grid grid-cols-2 gap-10 mb-12">
            <div className="flex flex-col items-center justify-center p-8 bg-white border border-[#e2dfd5] shadow-sm">
              <BedDouble size={24} className="text-[#d4af37] mb-4" />
              <span className="font-serif text-[28px] text-[#1a1a1a] mb-2">24</span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#7a7a7a]">Luxury Rooms</span>
            </div>
            <div className="flex flex-col items-center justify-center p-8 bg-white border border-[#e2dfd5] shadow-sm">
              <Building2 size={24} className="text-[#d4af37] mb-4" />
              <span className="font-serif text-[28px] text-[#1a1a1a] mb-2">40,000</span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#7a7a7a]">Total SF Build</span>
            </div>
          </div>
          <div className="px-8 border-l border-[#d4af37]">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#4a4a4a] mb-6">World-Class Amenities</h4>
            <p className="font-serif text-[13px] leading-loose text-[#5a5a5a]">
              Restaurant & Rooftop Bar • Conference Center • Luxury Spa • High-Performance Gym
            </p>
          </div>
          <div className="mt-auto border-t border-[#e2dfd5] pt-10 flex justify-between px-8">
             <div className="flex flex-col">
               <span className="text-[9px] uppercase tracking-[0.3em] text-[#7a7a7a] mb-2">Total Budget</span>
               <span className="font-serif text-[20px] tracking-wider text-[#1a1a1a]">$22,000,000</span>
             </div>
             <div className="flex flex-col text-right">
               <span className="text-[9px] uppercase tracking-[0.3em] text-[#7a7a7a] mb-2">Target Equity</span>
               <span className="font-serif text-[20px] tracking-wider text-[#d4af37]">$8M - $10M</span>
             </div>
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#050810] shadow-[inset_-60px_0_100px_rgba(0,0,0,0.7)] relative p-0 overflow-hidden">
          <img src="/Images/OCEANSIDE%20-%20AERIAL%20VIEW.jpg" alt="Aerial View" className="w-full h-full object-cover opacity-90 scale-105" />
        </div>
      )
    },
    {
      // Sheet 2: Environmental / Mighty Buildings
      front: (
        <div className="w-full h-full bg-[#f4f3ef] text-[#1a1a1a] p-20 flex flex-col justify-center shadow-[inset_60px_0_80px_rgba(0,0,0,0.08)] relative">
          <h2 className="font-serif text-[32px] mb-12 tracking-[0.1em] text-center flex items-center justify-center gap-4">
             <Leaf className="text-[#d4af37]" size={28}/> Environmental Design
          </h2>
          <p className="text-[12px] leading-[2.5] text-[#5a5a5a] mb-12 font-serif text-justify px-4">
            Setting a new benchmark for sustainable luxury on the Pacific coastline. The project seamlessly integrates cutting-edge engineering with ecological stewardship. We have invested over 16 months and $500,000 in comprehensive pre-development to pioneer a truly resilient hospitality asset.
          </p>
          <div className="space-y-6 px-4">
            <div className="border border-[#e2dfd5] bg-white p-6 flex items-center justify-between">
              <span className="font-serif text-[14px] text-[#1a1a1a] tracking-wide">First-of-its-kind 3D Printed Facade</span>
            </div>
            <div className="border border-[#e2dfd5] bg-white p-6 flex items-center justify-between">
              <span className="font-serif text-[14px] text-[#1a1a1a] tracking-wide">Advanced Heavy Timber Framing</span>
            </div>
            <div className="border border-[#e2dfd5] bg-white p-6 flex items-center justify-between">
              <span className="font-serif text-[14px] text-[#1a1a1a] tracking-wide">Integrated Green Roofs & Water Retention</span>
            </div>
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#f4f3ef] shadow-[inset_-60px_0_100px_rgba(0,0,0,0.7)] relative p-0 overflow-hidden">
          <img src="/Images/page31-mighty-buildings.jpg.png" alt="Mighty Buildings" className="w-full h-full object-cover grayscale-[30%] scale-105" />
          <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur px-8 py-4 shadow-xl">
             <span className="text-[9px] uppercase tracking-[0.3em] text-[#1a1a1a]">Proprietary Panel System</span>
          </div>
        </div>
      )
    },
    {
      // Sheet 3: Market Fundamentals / Target Flag
      front: (
        <div className="w-full h-full bg-[#f4f3ef] text-[#1a1a1a] p-24 flex flex-col justify-center shadow-[inset_60px_0_80px_rgba(0,0,0,0.08)] relative">
          <h2 className="font-serif text-[32px] mb-12 tracking-[0.1em] text-center">Market Fundamentals</h2>
          <p className="text-[12px] leading-[2.5] text-[#5a5a5a] mb-16 font-serif text-justify">
            The Northern Oregon Coast currently experiences a profound and enduring supply-demand imbalance, creating a highly lucrative, high-barrier-to-entry environment. With over 5.5 million annual affluent travelers converging on the region, the market remains drastically underserved, possessing fewer than 100 true luxury keys.
          </p>
          <div className="border-t border-[#e2dfd5] pt-12">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#4a4a4a] mb-10 text-center">Primary Drive Markets</h4>
            <div className="grid grid-cols-2 gap-8 text-center">
              <div>
                <div className="font-serif text-[24px] text-[#1a1a1a] mb-2">Portland, OR</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37]">1.5 Hours</div>
              </div>
              <div>
                <div className="font-serif text-[24px] text-[#1a1a1a] mb-2">Seattle, WA</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37]">3.5 Hours</div>
              </div>
            </div>
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#050810] text-[#eaeaea] p-24 flex flex-col items-center justify-center text-center shadow-[inset_-60px_0_100px_rgba(0,0,0,0.9)] relative">
          <ShieldCheck size={36} strokeWidth={1} className="text-[#d4af37] mb-10" />
          <h2 className="font-serif text-[32px] tracking-[0.2em] mb-6">Target Flag: LHW</h2>
          <h3 className="uppercase tracking-[0.4em] text-[10px] text-[#7a7a7a] mb-14">Leading Hotels of the World</h3>
          <p className="text-[12px] leading-[2.5] text-[#8a8a8a] max-w-sm font-serif text-justify">
            Positioned to tap into a highly affluent, global guest network by meeting the rigorous physical, architectural, and bespoke service standards required for elite inclusion.
          </p>
          <div className="mt-20 w-full border-t border-b border-[#222] py-12">
             <div className="text-[36px] font-serif text-[#d4af37] mb-4 tracking-widest">4.5 Million</div>
             <div className="text-[9px] uppercase tracking-[0.4em] text-[#7a7a7a]">Active Network Members</div>
          </div>
        </div>
      )
    },
    {
      // Sheet 4: Comps / Target ADR
      front: (
        <div className="w-full h-full bg-[#f4f3ef] text-[#1a1a1a] p-20 flex flex-col justify-center shadow-[inset_60px_0_80px_rgba(0,0,0,0.08)] relative">
          <h2 className="font-serif text-[28px] mb-16 tracking-[0.1em] border-b border-[#e2dfd5] pb-8 text-center">Competitive Set</h2>
          <div className="space-y-12 px-6">
            <div className="flex flex-col border-l border-[#d4af37] pl-8">
              <h3 className="font-serif text-[22px] text-[#1a1a1a] mb-4">The Stephanie Inn</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#7a7a7a] mb-4">Cannon Beach, OR</p>
              <div className="flex gap-12 font-serif text-[16px]">
                <div><span className="text-[#a0a0a0]">Keys:</span> 41</div>
                <div><span className="text-[#a0a0a0]">Est. ADR:</span> ~$1,100</div>
              </div>
            </div>
            <div className="flex flex-col border-l border-[#a0a0a0] pl-8">
              <h3 className="font-serif text-[22px] text-[#1a1a1a] mb-4">Headlands Lodge</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#7a7a7a] mb-4">Pacific City, OR</p>
              <div className="flex gap-12 font-serif text-[16px]">
                <div><span className="text-[#a0a0a0]">Keys:</span> 51</div>
                <div><span className="text-[#a0a0a0]">Est. ADR:</span> ~$950</div>
              </div>
            </div>
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#050810] text-[#eaeaea] p-24 flex flex-col items-center justify-center text-center shadow-[inset_-60px_0_100px_rgba(0,0,0,0.9)] relative">
          <TrendingUp size={36} strokeWidth={1} className="text-[#d4af37] mb-10" />
          <h2 className="font-serif text-[24px] tracking-[0.3em] mb-16 uppercase text-[#a0a0a0]">Underwriting Projections</h2>
          
          <div className="bg-[#080c17] border border-[#222] p-16 w-full relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#d4af37]"></div>
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#7a7a7a] mb-6">Target Stabilized ADR</h3>
            <div className="text-[64px] font-serif text-white mb-6 tracking-wide">$1,038</div>
            <div className="text-[12px] font-serif text-[#d4af37] italic">Conservative Baseline</div>
          </div>

          <p className="text-[11px] leading-[2.5] text-[#7a7a7a] mt-16 font-serif max-w-sm">
            High season projections indicate potential peak rates exceeding <strong className="text-white font-normal">$2,000/night</strong>, aligning with ultra-luxury coastal comparables.
          </p>
        </div>
      )
    },
    {
      // Sheet 5: Master Plan / Buildings Details
      front: (
        <div className="w-full h-full bg-[#f4f3ef] shadow-[inset_60px_0_80px_rgba(0,0,0,0.08)] p-20 flex flex-col relative">
          <h2 className="font-serif text-[16px] mb-10 tracking-[0.4em] text-[#4a4a4a] uppercase text-center">Site Architecture</h2>
          <div className="flex-1 bg-white p-6 shadow-sm border border-[#e2dfd5] flex items-center justify-center">
            <img src="/Images/page5-site-plan.jpg" alt="Master Plan" className="max-w-full max-h-full object-contain mix-blend-multiply" />
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#f4f3ef] text-[#1a1a1a] p-24 flex flex-col justify-center shadow-[inset_-60px_0_80px_rgba(0,0,0,0.08)] relative">
          <h2 className="font-serif text-[28px] mb-16 tracking-[0.1em] border-b border-[#e2dfd5] pb-8 text-center">Structural Layout</h2>
          <div className="space-y-12 px-8">
            <div className="flex flex-col">
              <h3 className="font-serif text-[20px] text-[#d4af37] mb-3">Building 1: Core</h3>
              <p className="text-[11px] leading-[2] font-serif text-[#5a5a5a] text-justify">
                Houses the primary arrival experience, grand lobby, signature restaurant, conference center, and the world-class Sin-At Yoga spa.
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="font-serif text-[20px] text-[#1a1a1a] mb-3">Building 2: Suites</h3>
              <p className="text-[11px] leading-[2] font-serif text-[#5a5a5a] text-justify">
                Features multi-story luxury key units, designed with unobstructed coastal views and ultra-premium interior finishes.
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="font-serif text-[20px] text-[#1a1a1a] mb-3">Building 3: Penthouses</h3>
              <p className="text-[11px] leading-[2] font-serif text-[#5a5a5a] text-justify">
                The apex of the property, offering sprawling penthouse layouts, rooftop amenities, and absolute privacy for elite clientele.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      // Sheet 6: Schematic Layouts (Floorplans)
      front: (
        <div className="w-full h-full bg-[#f4f3ef] text-[#1a1a1a] p-24 flex flex-col shadow-[inset_60px_0_80px_rgba(0,0,0,0.08)] relative">
          <h2 className="font-serif text-[16px] mb-12 tracking-[0.4em] text-[#4a4a4a] uppercase text-center border-b border-[#e2dfd5] pb-8">Building One Layout</h2>
          <div className="flex-1 bg-white border border-[#e2dfd5] p-10 flex flex-col justify-center relative shadow-sm">
            <span className="absolute top-8 left-8 text-[9px] font-serif uppercase tracking-[0.3em] text-[#a0a0a0]">First Floor</span>
            <img src="/Images/Building%20One%20First%20Floor.png" alt="Building 1 First Floor" className="w-full h-full object-contain mix-blend-multiply opacity-80" />
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#f4f3ef] text-[#1a1a1a] p-24 flex flex-col shadow-[inset_-60px_0_80px_rgba(0,0,0,0.08)] relative">
          <h2 className="font-serif text-[16px] mb-12 tracking-[0.4em] text-[#4a4a4a] uppercase text-center border-b border-[#e2dfd5] pb-8">Building Three Layout</h2>
          <div className="flex-1 bg-white border border-[#e2dfd5] p-10 flex flex-col justify-center relative shadow-sm">
            <span className="absolute top-8 left-8 text-[9px] font-serif uppercase tracking-[0.3em] text-[#a0a0a0]">Lower Floor One</span>
            <img src="/Images/Building%20Three%20Lower%20Floor%20One.png" alt="Building 3 Lower Floor" className="w-full h-full object-contain mix-blend-multiply opacity-80" />
          </div>
        </div>
      )
    },
    {
      // Sheet 7: Pro Forma Economics (Spread Design)
      front: (
        <div className="w-full h-full bg-[#f4f3ef] text-[#1a1a1a] p-20 flex flex-col justify-center shadow-[inset_60px_0_80px_rgba(0,0,0,0.08)] relative border-r border-[#d1cec5]">
          <h2 className="font-serif text-[28px] mb-16 tracking-[0.1em] text-center text-[#d4af37]">Pro Forma Economics</h2>
          <div className="px-6">
             <h4 className="text-[9px] uppercase tracking-[0.4em] text-[#7a7a7a] mb-10 border-b border-[#e2dfd5] pb-4">Year 3 Revenues (Stabilized)</h4>
             <table className="w-full font-serif text-[14px]">
               <tbody>
                 <tr className="border-b border-[#e2dfd5]">
                   <td className="py-6 text-[#5a5a5a]">Occupancy</td>
                   <td className="py-6 text-right tracking-wider">66.0%</td>
                 </tr>
                 <tr className="border-b border-[#e2dfd5]">
                   <td className="py-6 text-[#5a5a5a]">Average Daily Rate (ADR)</td>
                   <td className="py-6 text-right tracking-wider">$1,101</td>
                 </tr>
                 <tr className="border-b border-[#e2dfd5]">
                   <td className="py-6 text-[#1a1a1a] font-medium">Gross Revenue</td>
                   <td className="py-6 text-right tracking-wider text-[#1a1a1a]">$9,160,000</td>
                 </tr>
               </tbody>
             </table>
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#f4f3ef] text-[#1a1a1a] p-20 flex flex-col justify-center shadow-[inset_-60px_0_80px_rgba(0,0,0,0.08)] relative border-l border-white/50">
          <h2 className="font-serif text-[28px] mb-16 tracking-[0.1em] text-center opacity-0">Economics cont.</h2>
          <div className="px-6">
             <h4 className="text-[9px] uppercase tracking-[0.4em] text-[#7a7a7a] mb-10 border-b border-[#e2dfd5] pb-4">Year 3 Margins (Stabilized)</h4>
             <table className="w-full font-serif text-[14px]">
               <tbody>
                 <tr className="border-b border-[#e2dfd5]">
                   <td className="py-6 text-[#5a5a5a]">Departmental Margins</td>
                   <td className="py-6 text-right tracking-wider">49.8%</td>
                 </tr>
                 <tr>
                   <td className="py-10 text-[#1a1a1a] font-medium text-[18px]">Net Operating Income</td>
                   <td className="py-10 text-right tracking-wider text-[18px] text-[#d4af37] font-bold">$1,980,000</td>
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
        <div className="w-full h-full bg-[#f4f3ef] text-[#1a1a1a] p-20 flex flex-col justify-center shadow-[inset_60px_0_80px_rgba(0,0,0,0.08)] relative">
          <h2 className="font-serif text-[32px] mb-16 tracking-[0.1em] text-center">Target Returns</h2>
          <div className="space-y-10 px-10">
            <div className="flex justify-between items-end border-b border-[#e2dfd5] pb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#7a7a7a]">Levered IRR</span>
              <span className="font-serif text-[36px] tracking-widest text-[#1a1a1a] leading-none">21.5%</span>
            </div>
            <div className="flex justify-between items-end border-b border-[#e2dfd5] pb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#7a7a7a]">Equity Multiple</span>
              <span className="font-serif text-[36px] tracking-widest text-[#1a1a1a] leading-none">2.60x</span>
            </div>
            <div className="flex justify-between items-end border-b border-[#e2dfd5] pb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#7a7a7a]">Unlevered IRR</span>
              <span className="font-serif text-[24px] tracking-widest text-[#5a5a5a] leading-none">14.8%</span>
            </div>
            <div className="flex justify-between items-end border-b border-[#e2dfd5] pb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#7a7a7a]">Exit Cap Rate</span>
              <span className="font-serif text-[24px] tracking-widest text-[#5a5a5a] leading-none">7.00%</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#7a7a7a]">Stabilized YOC</span>
              <span className="font-serif text-[24px] tracking-widest text-[#5a5a5a] leading-none">9.03%</span>
            </div>
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#f4f3ef] text-[#1a1a1a] p-24 flex flex-col justify-center shadow-[inset_-60px_0_80px_rgba(0,0,0,0.08)] relative">
          <h2 className="font-serif text-[28px] mb-20 tracking-[0.1em] border-b border-[#e2dfd5] pb-8 text-center">Sponsorship</h2>
          <div className="flex flex-col gap-12 flex-1 justify-center px-10">
            <div className="text-center">
              <h3 className="font-serif text-[22px] text-[#1a1a1a] mb-4 tracking-widest">Walker Templeton</h3>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37]">Sponsor / Developer</p>
            </div>
            <div className="w-20 h-[1px] bg-[#d1cec5] mx-auto"></div>
            <div className="text-center">
              <h3 className="font-serif text-[22px] text-[#1a1a1a] mb-4 tracking-widest">Robert Gutierrez</h3>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37]">Capital Markets / Finance</p>
            </div>
          </div>
        </div>
      )
    },
    {
      // Sheet 9: Full Bleed Image / Back Cover
      front: (
        <div className="w-full h-full bg-[#050810] shadow-[inset_60px_0_100px_rgba(0,0,0,0.7)] relative p-0 overflow-hidden">
          <img src="/Images/OCEANSIDE%20-%20BUILDING%2003.jpg" alt="Building 3 Render" className="w-full h-full object-cover scale-105" />
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#050810] text-white flex flex-col items-center justify-center p-24 text-center shadow-[inset_-60px_0_100px_rgba(0,0,0,0.95)] relative">
          <Lock size={32} strokeWidth={1} className="text-[#d4af37] mb-12 opacity-80" />
          <h2 className="font-serif text-[32px] mb-10 tracking-[0.2em] text-[#eaeaea] uppercase">Secure Data Room</h2>
          <p className="text-[12px] font-serif text-[#8a8a8a] mb-20 max-w-[300px] leading-[2.5] text-center">
            Full construction drawings, detailed pro forma, environmental reports, and geotechnical studies available upon NDA execution.
          </p>
          <div className="w-full space-y-6">
            <button className="w-full py-6 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#050810] transition-all duration-700 tracking-[0.4em] uppercase text-[10px] flex items-center justify-center gap-4">
              <Presentation size={14} /> Request Access
            </button>
            <button className="w-full py-6 border border-[#222] text-[#8a8a8a] hover:border-[#a0a0a0] transition-all duration-700 tracking-[0.4em] uppercase text-[10px]">
              Contact Sponsorship
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#111318] flex flex-col items-center justify-center py-20 overflow-hidden font-sans selection:bg-[#d4af37] selection:text-white relative">
      
      {/* 3D Styles, Beam Animation & Dog-Ear Physics */}
      <style dangerouslySetInnerHTML={{__html: `
        .flipbook-viewport {
          perspective: 4000px;
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
        
        /* Ultra-Heavy Book Shadow */
        .book-stack-shadow {
          box-shadow: 
            0 50px 100px rgba(0,0,0,0.4),
            0 80px 160px rgba(0,0,0,0.3),
            0 20px 40px rgba(0,0,0,0.5);
        }

        /* Dog Ear - Front Right */
        .dog-ear-recto {
          position: absolute;
          top: 0;
          right: 0;
          width: 40px;
          height: 40px;
          background: linear-gradient(-135deg, transparent 50%, rgba(0,0,0,0.15) 50%, #ffffff 52%);
          z-index: 50;
          transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1), height 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          pointer-events: none;
          box-shadow: -2px 2px 5px rgba(0,0,0,0.05);
        }
        
        /* Dog Ear - Back Left (When flipped) */
        .dog-ear-verso {
          position: absolute;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.15) 50%, #ffffff 52%);
          z-index: 50;
          transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1), height 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          pointer-events: none;
          box-shadow: 2px 2px 5px rgba(0,0,0,0.05);
        }

        /* Hover Physics */
        .sheet-unflipped:hover {
          transform: rotateY(-3deg);
        }
        .sheet-flipped:hover {
          transform: rotateY(-177deg);
        }
        .sheet-unflipped:hover .dog-ear-recto {
          width: 56px;
          height: 56px;
        }
        .sheet-flipped:hover .dog-ear-verso {
          width: 56px;
          height: 56px;
        }

        /* Glossy Sheen Overlay */
        .glare-overlay {
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.04) 20%, rgba(255,255,255,0) 100%);
          opacity: 0;
          transition: opacity 1s ease;
          pointer-events: none;
        }
        .sheet-unflipped:hover .glare-overlay,
        .sheet-flipped:hover .glare-overlay {
          opacity: 1;
        }

        /* Continuous Gold Beam Animation */
        @keyframes goldBeam {
            0% { transform: translateX(-150%); }
            100% { transform: translateX(150%); }
        }
        .animate-gold-beam {
            animation: goldBeam 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}} />

      {/* Elegant Return to Portal Button */}
      <button className="fixed top-8 left-8 z-50 flex items-center gap-4 group px-4 py-3 hover:bg-white/5 transition-colors duration-500 rounded-sm overflow-hidden cursor-pointer">
        <ChevronLeft size={16} strokeWidth={1} className="text-[#d4af37] group-hover:-translate-x-1 transition-transform duration-500" />
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#a0a0a0] group-hover:text-white transition-colors duration-500">
          Return to Portal
        </span>
        {/* The thin gold beam line acting as an active indicator */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#222]">
          <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent animate-gold-beam opacity-80"></div>
        </div>
      </button>

      {/* 1200x675 Widescreen (16:9) Book Container */}
      {/* Physics: Container translates -25% (moves left to center the right half) when closed (flippedCount === 0) */}
      <div className={`relative w-[1200px] h-[675px] flipbook-viewport book-stack-shadow flex bg-[#030508] transition-transform duration-[1.2s] ease-[cubic-bezier(0.64,0.04,0.35,1)] ${isClosed ? '-translate-x-1/4' : 'translate-x-0'}`}>
        
        {/* Left Base Page (Hardcover backing) - Fades out when closed to prevent awkward overlapping */}
        <div className={`w-1/2 h-full bg-[#050810] border-l border-[#1a1a1a] shadow-[inset_-40px_0_80px_rgba(0,0,0,0.95)] transition-opacity duration-1000 ${isClosed ? 'opacity-0' : 'opacity-100'}`}></div>
        
        {/* Right Base Page (Hardcover backing) */}
        <div className="w-1/2 h-full bg-[#050810] border-r border-[#1a1a1a] shadow-[inset_40px_0_80px_rgba(0,0,0,0.95)]"></div>

        {/* Thick Center Spine Shadow - Fades out when closed */}
        <div className={`absolute left-1/2 top-0 bottom-0 w-32 -ml-16 z-40 pointer-events-none mix-blend-multiply flex transition-opacity duration-1000 ${isClosed ? 'opacity-0' : 'opacity-100'}`}>
           <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-black/80"></div>
           <div className="w-1/2 h-full bg-gradient-to-l from-transparent to-black/80"></div>
        </div>

        {/* Dynamic Sheets */}
        <div className="absolute right-0 w-1/2 h-full z-10">
          {sheets.map((sheet, index) => {
            const isFlipped = index < flippedCount;
            const zIndex = isFlipped ? index + 1 : totalSheets - index;
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
                {/* Recto (Front) */}
                <div className="absolute inset-0 w-full h-full flipbook-page bg-[#f4f3ef] border-r border-black/5 overflow-hidden">
                  {sheet.front}
                  <div className="absolute inset-0 glare-overlay z-30"></div>
                  {/* Render Dog Ear on top interactive pages, hide on cover if closed for cleaner look */}
                  {index === flippedCount && index < totalSheets - 1 && (!isClosed || index !== 0) && (
                    <div className="dog-ear-recto"></div>
                  )}
                </div>

                {/* Verso (Back) */}
                <div className="absolute inset-0 w-full h-full flipbook-page flipbook-page-back bg-[#f4f3ef] border-l border-black/5 overflow-hidden">
                  {sheet.back}
                  <div className="absolute inset-0 glare-overlay z-30 transform scale-x-[-1]"></div>
                  {/* Render Dog Ear on top interactive flipped pages */}
                  {index === flippedCount - 1 && index >= 0 && (
                    <div className="dog-ear-verso"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Elegant Editorial Nav Controls */}
      <div className={`mt-20 flex items-center gap-16 text-[#a0a0a0] transition-opacity duration-1000 delay-300 ${isClosed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <button 
          onClick={() => setFlippedCount(Math.max(0, flippedCount - 1))}
          disabled={flippedCount === 0}
          className="p-4 transition-all duration-300 disabled:opacity-10 hover:-translate-x-2 hover:text-[#d4af37]"
        >
          <ChevronLeft size={24} strokeWidth={1} />
        </button>
        
        <div className="flex flex-col items-center gap-5">
          <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#7a7a7a]">
            Spread {Math.max(1, flippedCount)} / {totalSheets}
          </span>
          <div className="flex gap-3">
            {Array.from({ length: totalSheets }).map((_, i) => (
              <div 
                key={i} 
                className={`h-[1px] w-8 transition-colors duration-700 ${
                  i < flippedCount ? 'bg-[#d4af37]' : i === flippedCount ? 'bg-[#eaeaea]' : 'bg-[#333]'
                }`} 
              />
            ))}
          </div>
        </div>

        <button 
          onClick={() => setFlippedCount(Math.min(totalSheets, flippedCount + 1))}
          disabled={flippedCount === totalSheets}
          className="p-4 transition-all duration-300 disabled:opacity-10 hover:translate-x-2 hover:text-[#d4af37]"
        >
          <ChevronRight size={24} strokeWidth={1} />
        </button>
      </div>

    </div>
  );
};

export default DigitalFlipbook;