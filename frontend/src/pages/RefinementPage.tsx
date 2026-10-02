import React from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  ChevronRight,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Code2,
  Wifi,
  BatteryMedium,
  ArrowLeft,
  ArrowRight,
  ChevronRight as ChevronRightIcon,
  Search,
  CheckSquare
} from 'lucide-react';

export default function App() {
  const steps = [
    { id: 1, label: 'Upload', state: 'completed' },
    { id: 2, label: 'Analyze', state: 'completed' },
    { id: 3, label: 'Generate', state: 'completed' },
    { id: 4, label: 'Preview', state: 'completed' },
    { id: 5, label: 'Compare', state: 'completed' },
    { id: 6, label: 'Refine', state: 'active' },
    { id: 7, label: 'Export', state: 'pending' },
  ];

  const MobileMockup = () => (
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

      {/* App Content */}
      <div className="flex-1 flex flex-col overflow-y-auto hide-scrollbar">
        {/* Header Image Area */}
        <div className="relative h-48 w-full shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80" 
            alt="Restaurant" 
            className="w-full h-full object-cover opacity-60" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent"></div>
          <div className="absolute bottom-4 left-5 right-5">
            <span className="text-[9px] font-bold tracking-widest text-cyan-400 uppercase mb-1 block">Gastronomy App</span>
            <h1 className="text-2xl font-bold text-white tracking-tight">DineNow Bistro</h1>
          </div>
        </div>

        <div className="px-5 pb-8 flex flex-col gap-4 flex-1">
          {/* Table Card */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-900/40 border border-cyan-800/50 flex items-center justify-center">
                <Search className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-lg font-bold text-white">Table #14</span>
            </div>
            <span className="bg-slate-700 text-slate-300 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
              Active Now
            </span>
          </div>

          {/* Details List */}
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 flex flex-col gap-3 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Selected Experience</span>
              <span className="text-xs font-semibold text-cyan-400">Chef's Tasting Menu</span>
            </div>
            <div className="w-full h-px bg-slate-700/50"></div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Party Size</span>
              <span className="text-xs font-semibold text-white">2 Guests • Indoor Patio</span>
            </div>
            <div className="w-full h-px bg-slate-700/50"></div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Instant Access</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">Pass #TMP-8492</span>
            </div>
          </div>

          <div className="mt-auto pt-6">
            <div className="flex items-center gap-2 mb-4 px-1">
              <CheckSquare className="w-4 h-4 text-cyan-500" />
              <span className="text-xs text-slate-300">Ephemeral guest order session initialized</span>
            </div>
            
            {/* The Refined Button */}
            <button className="w-full py-4 mt-6 bg-cyan-400 hover:bg-cyan-300 transition-colors text-slate-900 font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)] flex items-center justify-center gap-2">
              Start Guest Order <ArrowRight className="w-5 h-5" />
            </button>
            
            <p className="text-center text-[11px] text-slate-500 mt-4 leading-relaxed">
              No account or login required • <span className="text-cyan-500 cursor-pointer">Ephemeral Guest Session</span>
            </p>
          </div>
        </div>
      </div>
      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-slate-600 rounded-full z-30"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col overflow-hidden selection:bg-blue-100">
      
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
                    step.state === 'active' ? 'text-white bg-blue-600 shadow-sm' : 
                    'text-slate-400'}`
                }>
                  {step.state === 'completed' && <Check className="w-3.5 h-3.5 mr-1.5 stroke-[3]" />}
                  <span className={`${step.state !== 'completed' ? 'mr-1.5' : ''}`}>
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

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden p-6 flex justify-center">
        <div className="w-full max-w-7xl h-full flex flex-col lg:flex-row gap-6">
          
          {}
          <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
            
            {/* Header Text */}
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Refine Your Interface</h1>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xl">
                Instruct AI to adjust layout, styles, tokens, or component hierarchy using natural language. Fast visual AST delta application in real-time.
              </p>
            </div>

            {/* Prompt Box Section */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                 <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                   <ChevronRightIcon className="w-3.5 h-3.5 text-blue-500" />
                   intent_refinement.prompt
                 </div>
                 <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium">
                   <button className="hover:text-slate-600 transition-colors uppercase tracking-wider">Clear</button>
                   <span>167 chars</span>
                 </div>
              </div>
              
              <div className="p-5 flex flex-col gap-4">
                <textarea 
                  className="w-full h-24 text-sm text-slate-700 bg-white border border-slate-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none leading-relaxed"
                  defaultValue="Make the 'Start Guest Order' button wider (full width 100%), increase the vertical padding to 16px, and move it slightly lower with 24px top margin for easier one-tap ordering."
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500 mr-1">Quick Chips:</span>
                    <button className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1">
                      <span className="text-slate-400">+</span> rounded-2xl
                    </button>
                    <button className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1">
                      <span className="text-slate-400">+</span> cyan glow
                    </button>
                    <button className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1">
                      <span className="text-slate-400">+</span> bold center
                    </button>
                  </div>
                </div>

                <button className="self-start mt-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-sm px-6 py-3 rounded-xl flex items-center gap-2 shadow-md shadow-blue-500/20 hover:opacity-90 transition-opacity">
                  <Sparkles className="w-4 h-4" /> Improve with AI
                </button>
              </div>
            </div>

            {/* Applied AI Changes Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
               <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                 <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                 Applied AI Changes
               </h3>

               <div className="flex flex-col gap-3">
                 <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-xl p-4 flex gap-3 items-start">
                   <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                     <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                   </div>
                   <div>
                     <h4 className="text-sm font-semibold text-slate-800 mb-1">
                       Vertical padding increased to <code className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 mx-1">16px (py-4)</code>
                     </h4>
                     <p className="text-xs text-slate-500 leading-relaxed">
                       Updated touch-target compliance from 36px to standard 48px hit area
                     </p>
                   </div>
                 </div>

                 <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-xl p-4 flex gap-3 items-start">
                   <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                     <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                   </div>
                   <div>
                     <h4 className="text-sm font-semibold text-slate-800 mb-1">
                       Top margin adjusted to <code className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 mx-1">24px (mt-6)</code>
                     </h4>
                     <p className="text-xs text-slate-500 leading-relaxed">
                       Decoupled from order summary cluster to establish definitive call-to-action anchor
                     </p>
                   </div>
                 </div>
               </div>

               {/* Similarity Progression */}
               <div className="mt-4 border border-slate-100 bg-slate-50 rounded-xl p-4 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
                     <Search className="w-5 h-5 text-blue-600" />
                   </div>
                   <div>
                     <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Visual & Spec Similarity Progression</div>
                     <div className="flex items-center gap-2">
                       <span className="text-lg font-bold text-slate-400 line-through decoration-slate-300">82%</span>
                       <ArrowRight className="w-4 h-4 text-slate-400" />
                       <span className="text-lg font-bold text-slate-900">94%</span>
                       <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded ml-2">+12% improvement</span>
                     </div>
                   </div>
                 </div>
                 
                 <div className="w-48">
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                     <span>Spec Alignment</span>
                     <span className="text-emerald-600">94.2%</span>
                   </div>
                   <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden flex">
                     <div className="h-full bg-blue-500 rounded-l-full" style={{ width: '82%' }}></div>
                     <div className="h-full bg-emerald-400 rounded-r-full" style={{ width: '12%' }}></div>
                   </div>
                 </div>
               </div>
            </div>

            {/* Diff Stream Code Block */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                 <Code2 className="w-4 h-4 text-blue-500" />
                 <span className="text-xs font-mono text-slate-600">components/GuestOrderScreen.tsx - Diff Stream</span>
              </div>
              <div className="bg-[#0F111A] p-4 text-[13px] font-mono leading-relaxed overflow-x-auto">
                <div className="text-slate-400 mb-2">@@ -42,7 +42,7 @@ export function GuestOrderForm() {'{'}</div>
                
                {/* Removed Lines */}
                <div className="flex bg-red-950/30 text-red-300 py-1 px-2 -mx-4 border-l-2 border-red-500 mb-1">
                  <span className="w-4 select-none opacity-50">-</span>
                  <span>{'<button className="w-48 py-2 mt-3 bg-cyan-500 font-medium text-slate-900 rounded-lg">'}</span>
                </div>
                
                {/* Added Lines */}
                <div className="flex bg-emerald-950/30 text-emerald-300 py-1 px-2 -mx-4 border-l-2 border-emerald-500 mb-2">
                  <span className="w-4 select-none opacity-50">+</span>
                  <span className="break-all">{'<button className="w-full py-4 mt-6 bg-cyan-400 font-bold text-slate-950 rounded-xl shadow-cyan-glow">'}</span>
                </div>
                
                <div className="text-slate-300 ml-4">Start Guest Order</div>
              </div>
            </div>

          </div>

          {}
          <div className="w-full lg:w-[480px] flex flex-col gap-4">
            
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                Live Refined Preview
              </h2>
            </div>

            {/* Segmented Control Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner w-fit mb-2">
               <button className="px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors">
                 Original (82%)
               </button>
               <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-blue-700 bg-white shadow-sm border border-slate-200 transition-all flex items-center gap-1.5">
                 Refined with Diff <Sparkles className="w-3.5 h-3.5 text-amber-400" />
               </button>
            </div>

            {/* Device Mockup Container */}
            <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[740px]">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
              
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                
                {/* iPhone Frame */}
                <div className="w-[340px] h-[720px] bg-[#0A0F1C] rounded-[3rem] border-[12px] border-slate-800 shadow-2xl relative overflow-hidden flex flex-col shrink-0 ring-1 ring-slate-900/20">
                   <MobileMockup />
                </div>
                
                {/* CSS Info Bar */}
                <div className="mt-6 bg-white border border-slate-200 shadow-sm rounded-full px-4 py-2 flex items-center justify-between w-[340px] z-20">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-slate-500">Target CSS:</span>
                    <span className="text-blue-600 font-semibold truncate max-w-[150px]">flex-1 py-4 mt-6 shadow-cyan-glow</span>
                  </div>
                  <button className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-full transition-colors border border-slate-200">
                    Copy AST
                  </button>
                </div>
              </div>
            </div>
            
            {}
            <div className="mt-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center justify-between">
               <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                 <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                 All layout regressions passed (3/3 zero conflict)
               </div>
               
               <div className="flex items-center gap-3">
                 <Link to="/compare" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors border border-slate-200 bg-white shadow-sm">
                   <ArrowLeft className="w-4 h-4" /> Back to Compare
                 </Link>
                 
                 <Link to="/export" className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20">
                   Proceed to Export <ArrowRight className="w-4 h-4" />
                 </Link>
               </div>
            </div>

          </div>
        </div>
      </main>

      {/* Global minimal styles for scrollbars */}
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