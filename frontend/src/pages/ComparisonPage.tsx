import React from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  ChevronRight,
  RotateCcw,
  Image as ImageIcon,
  FileCode2,
  SplitSquareHorizontal,
  Layers,
  Wifi,
  BatteryMedium,
  ChevronDown,
  ShoppingBag,
  Plus,
  Compass,
  Heart,
  Receipt,
  User,
  CheckCircle2,
  Layout,
  Box,
  Palette,
  Maximize,
  Type,
  Flag,
  Square,
  TextCursorInput,
  Wand2,
  RefreshCcw,
  ArrowRight
} from 'lucide-react';

interface ProgressBarProps {
  label: string;
  percentage: number;
  icon: React.ElementType;
  colorClass?: string;
  bgClass?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, percentage, icon: Icon, colorClass = "bg-blue-600", bgClass="bg-blue-100" }) => (
  <div className="mb-4 last:mb-0">
    <div className="flex justify-between text-xs font-mono mb-1.5">
      <span className="text-slate-600 flex items-center gap-1.5">
        <Icon className={`w-3.5 h-3.5 text-slate-400`} />
        {label}
      </span>
      <span className="font-bold text-slate-800">{percentage}%</span>
    </div>
    <div className={`w-full h-1.5 ${bgClass} rounded-full overflow-hidden`}>
      <div className={`h-full ${colorClass} rounded-full`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

export default function App() {
  const steps = [
    { id: 1, label: 'Upload', state: 'completed' },
    { id: 2, label: 'Analyze', state: 'completed' },
    { id: 3, label: 'Generate', state: 'completed' },
    { id: 4, label: 'Preview', state: 'completed' },
    { id: 5, label: 'Compare', state: 'active' },
    { id: 6, label: 'Refine', state: 'pending' },
    { id: 7, label: 'Export', state: 'pending' },
  ];

  const MobileFoodAppUI = ({ isGenerated = false }) => {
    return (
      <div className="w-full h-full bg-[#0F172A] flex flex-col font-sans text-white relative">
        {/* Status Bar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-2 text-[11px] font-semibold tracking-wide z-10">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5" />
            <BatteryMedium className="w-4 h-4" />
          </div>
        </div>

        {/* Dynamic Notch */}
        <div className="absolute top-2 inset-x-0 mx-auto w-[110px] h-[30px] bg-black rounded-full z-20"></div>

        <div className="flex-1 overflow-y-auto px-5 pb-20 custom-scrollbar">
          {/* Header */}
          <div className="mt-4 mb-6 relative">
             <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1 block">Deliver To</span>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 cursor-pointer">
                  <h2 className="text-base font-bold text-white relative">
                    742 Evergreen Terr
                    {/* Variance Tag 1 */}
                    {isGenerated && (
                      <div className="absolute -top-7 left-0 bg-red-100 text-red-600 text-[10px] font-mono px-2 py-1 rounded-md whitespace-nowrap flex items-center gap-1.5 border border-red-200 z-30 shadow-sm animate-pulse">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                        -0.2px letterSpacing
                      </div>
                    )}
                  </h2>
                  <ChevronDown className="w-4 h-4 text-blue-400" />
                </div>
                <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                  <ShoppingBag className="w-4 h-4 text-slate-300" />
                </div>
             </div>
          </div>

          {/* Hero Section */}
          <div className="relative rounded-2xl overflow-hidden h-40 mb-6 shadow-lg border border-slate-800">
            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80" alt="Pizza" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="bg-cyan-400 text-slate-900 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded mb-2 inline-block">
                20% Off First Order
              </span>
              <h1 className="text-xl font-bold text-white">Wood-Fired Pizzeria</h1>
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2 hide-scrollbar">
            <button className="px-4 py-1.5 rounded-full bg-cyan-400 text-slate-900 text-xs font-bold whitespace-nowrap">Popular</button>
            <button className="px-4 py-1.5 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold whitespace-nowrap border border-slate-700">Artisan Pies</button>
            <button className="px-4 py-1.5 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold whitespace-nowrap border border-slate-700">Pastas</button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-4">
            {/* Item 1 */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-800/50 border border-slate-800">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=200&q=80" alt="Pasta" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-white mb-0.5">Black Truffle Tagliatelle</h3>
                <p className="text-[10px] text-slate-400 leading-tight mb-2">Fresh hand-rolled pasta, butter</p>
                <div className="text-sm font-bold text-cyan-400">$24.00</div>
              </div>
              <button className="w-8 h-8 rounded-full bg-cyan-400 text-slate-900 flex items-center justify-center shrink-0">
                <Plus className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>

            {/* Item 2 with Variance */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-800/50 border border-slate-800 relative">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=200&q=80" alt="Drink" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-white mb-0.5">Smoked Rosemary Mezcal</h3>
                <p className="text-[10px] text-slate-400 leading-tight mb-2">Craft agave, charred herb essence</p>
                <div className="text-sm font-bold text-cyan-400">$16.50</div>
              </div>
              
              {/* The Button with styling variance */}
              <div className="relative">
                <button className={`w-8 h-8 bg-cyan-400 text-slate-900 flex items-center justify-center shrink-0 ${isGenerated ? 'rounded-lg ring-2 ring-red-400 ring-offset-2 ring-offset-slate-800' : 'rounded-full'}`}>
                  <Plus className="w-4 h-4" strokeWidth={3} />
                </button>
                
                {/* Variance Tag 2 */}
                {isGenerated && (
                  <div className="absolute top-10 right-0 bg-red-100 text-red-600 text-[10px] font-mono px-2 py-1 rounded-md whitespace-nowrap flex items-center gap-1.5 border border-red-200 z-30 shadow-sm animate-pulse">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                    Δ r: 12px vs 16px
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-[#0F172A]/90 backdrop-blur-md border-t border-slate-800 flex items-center justify-around px-2 z-20">
          <button className="p-2 text-cyan-400 flex flex-col items-center gap-1">
            <Compass className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-300 transition-colors flex flex-col items-center gap-1">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-300 transition-colors flex flex-col items-center gap-1">
            <Receipt className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-300 transition-colors flex flex-col items-center gap-1">
            <User className="w-5 h-5" />
          </button>
        </div>
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-slate-600 rounded-full z-30"></div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-slate-50 font-sans text-slate-800 flex flex-col overflow-hidden selection:bg-blue-100">
      
      {/* Top Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-20 relative">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img src="/logo.png" alt="UIForge AI Logo" className="h-10 md:h-11 w-auto object-contain transition-transform duration-200 hover:scale-105" />
        </Link>

        {/* Stepper */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex items-center space-x-1">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className={`flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-colors
                  ${step.state === 'completed' ? 'text-emerald-600 bg-transparent' : 
                    step.state === 'active' ? 'text-blue-700 bg-blue-50 border border-blue-200 shadow-sm' : 
                    'text-slate-400'}`
                }>
                  {step.state === 'completed' && <Check className="w-3.5 h-3.5 mr-1.5 stroke-[3]" />}
                  {step.state === 'active' && <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2" />}
                  <span className={`${step.state !== 'completed' && step.state !== 'active' ? 'mr-1.5' : ''}`}>
                    {step.id}.
                  </span>
                  {step.label}
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className={`w-3.5 h-3.5 mx-1 ${step.state === 'completed' ? 'text-emerald-300' : 'text-slate-200'}`} strokeWidth={2} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <div className="w-48 flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm bg-white">
            <RotateCcw className="w-3.5 h-3.5 text-red-500" strokeWidth={2.5} />
            Reset / Start New
          </button>
        </div>
      </header>

      {}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 z-10 shadow-sm relative">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center">
               <FileCode2 className="w-4 h-4 text-blue-600" />
             </div>
             <h1 className="text-xl font-bold text-slate-900 flex items-center gap-3">
               Compare Your Design
               <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded uppercase tracking-wider">Stage 05 / 07</span>
             </h1>
          </div>
          <p className="text-sm text-slate-500 ml-11">Automated computer vision comparison against compiled AST DOM tree</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 shadow-inner">
           <button className="flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-semibold text-slate-600 hover:bg-white hover:shadow-sm transition-all">
             <ImageIcon className="w-3.5 h-3.5" /> Original
           </button>
           <button className="flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-semibold text-slate-600 hover:bg-white hover:shadow-sm transition-all">
             <FileCode2 className="w-3.5 h-3.5" /> Generated
           </button>
           <button className="flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold text-blue-700 bg-white shadow-sm border border-slate-200 transition-all">
             <SplitSquareHorizontal className="w-3.5 h-3.5" /> Side-by-Side
           </button>
           <button className="flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-semibold text-slate-600 hover:bg-white hover:shadow-sm transition-all">
             <Layers className="w-3.5 h-3.5" /> Onion Skin
           </button>
        </div>
      </div>

      {}
      <main className="flex-1 overflow-hidden p-6">
        <div className="max-w-7xl mx-auto h-full flex flex-col lg:flex-row gap-6">
          
          {/* Left Pane: Visual Comparison Area */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex items-center justify-center relative overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            <div className="flex items-center justify-center gap-12 relative z-10 h-full w-full">
               
               {/* Original Mockup Container */}
               <div className="relative flex flex-col items-center h-full max-h-[700px] justify-center">
                 {/* Label */}
                 <div className="absolute -top-12 bg-white border border-slate-200 shadow-sm px-4 py-1.5 rounded-full flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                   <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Original Design</span>
                 </div>
                 
                 {/* Device Frame */}
                 <div className="w-[320px] h-full max-h-[680px] bg-[#0A0F1C] rounded-[2.5rem] border-[10px] border-slate-800 shadow-2xl relative overflow-hidden flex flex-col shrink-0 ring-1 ring-slate-900/50">
                    <MobileFoodAppUI isGenerated={false} />
                 </div>
               </div>

               {/* Center Divider styling */}
               <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center z-0 shadow-inner">
                 <div className="w-px h-full bg-slate-200 absolute"></div>
               </div>

               {/* Generated Mockup Container */}
               <div className="relative flex flex-col items-center h-full max-h-[700px] justify-center">
                 {/* Label */}
                 <div className="absolute -top-12 bg-blue-50 border border-blue-200 shadow-sm px-4 py-1.5 rounded-full flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                   <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Generated UI <br className="hidden"/> Implementation</span>
                 </div>
                 
                 {/* Device Frame */}
                 <div className="w-[320px] h-full max-h-[680px] bg-[#0A0F1C] rounded-[2.5rem] border-[10px] border-slate-800 shadow-2xl relative overflow-hidden flex flex-col shrink-0 ring-1 ring-slate-900/50">
                    <MobileFoodAppUI isGenerated={true} />
                 </div>
               </div>

            </div>
          </div>

          {}
          <div className="w-full lg:w-[420px] flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
            
            {/* Visual Diagnostics Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Layout className="w-4 h-4 text-blue-600" />
                  Visual Diagnostics
                </h3>
                <div className="w-6 h-6 rounded bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
              </div>

              {/* Match Score */}
              <div className="flex items-center gap-6 mb-8">
                {/* Circular Progress (SVG) */}
                <div className="relative w-24 h-24 shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#2563eb" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="22.6" className="transition-all duration-1000 ease-out" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-slate-900 leading-none">91<span className="text-sm">%</span></span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-1">Match</span>
                  </div>
                </div>
                
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1 block">Overall Fidelity</span>
                  <h4 className="text-xl font-bold text-slate-900 mb-1">High Precision</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Synthesized JSX matches master layout specs within 1.2px tolerance.
                  </p>
                </div>
              </div>

              {/* Dimension Breakdown */}
              <div>
                 <h4 className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Dimension Breakdown</h4>
                 <div className="flex flex-col gap-1">
                   <ProgressBar label="Layout Accuracy" percentage={94} icon={Layout} />
                   <ProgressBar label="Component Detection" percentage={92} icon={Box} />
                   <ProgressBar label="Color Fidelity" percentage={89} icon={Palette} colorClass="bg-emerald-500" bgClass="bg-emerald-100" />
                   <ProgressBar label="Spacing & Padding" percentage={88} icon={Maximize} colorClass="bg-emerald-500" bgClass="bg-emerald-100" />
                   <ProgressBar label="Typography Scale" percentage={90} icon={Type} />
                 </div>
              </div>
            </div>

            {/* Detected Variances Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                <Flag className="w-4 h-4 text-red-500" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Detected Variances (2)
                </h3>
              </div>

              <div className="flex flex-col gap-4 mb-6">
                {/* Variance 1 */}
                <div className="flex gap-3 items-start">
                   <div className="w-7 h-7 rounded bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5">
                     <Square className="w-3.5 h-3.5 text-red-500" />
                   </div>
                   <div>
                     <h4 className="text-xs font-bold text-slate-900 mb-1">Button Corner Radius</h4>
                     <p className="text-[11px] text-slate-500 leading-relaxed">
                       Button corner radius <span className="font-mono bg-slate-100 text-slate-600 px-1 py-0.5 rounded">12px</span> (rounded-lg) rendered instead of source spec <span className="font-mono bg-emerald-50 text-emerald-600 border border-emerald-100 px-1 py-0.5 rounded">16px</span>.
                     </p>
                   </div>
                </div>

                {/* Variance 2 */}
                <div className="flex gap-3 items-start">
                   <div className="w-7 h-7 rounded bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5">
                     <TextCursorInput className="w-3.5 h-3.5 text-red-500" />
                   </div>
                   <div>
                     <h4 className="text-xs font-bold text-slate-900 mb-1">Header Kerning Variance</h4>
                     <p className="text-[11px] text-slate-500 leading-relaxed">
                       Delivery address font tracking exhibits <span className="font-mono bg-blue-50 text-blue-600 border border-blue-100 px-1 py-0.5 rounded">-0.2px</span> offset compared to static typography layer.
                     </p>
                   </div>
                </div>
              </div>

              {/* AI Info Box */}
              <div className="mt-auto bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-3">
                <Wand2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-800 font-medium leading-snug">
                  AI Refine prompt already pre-populated with these 2 pixel precision adjustments.
                </p>
              </div>

            </div>
          </div>
        </div>
      </main>

      {}
      <footer className="h-20 bg-white border-t border-slate-200 px-8 flex items-center justify-end shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20 relative">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors border border-slate-200 bg-white shadow-sm">
            <RefreshCcw className="w-4 h-4 text-slate-400" /> Re-run Diff
          </button>
          
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20">
            Proceed to AI Refine <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* Add minimal custom styles for scrollbars if needed */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(148, 163, 184, 0.4); }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}