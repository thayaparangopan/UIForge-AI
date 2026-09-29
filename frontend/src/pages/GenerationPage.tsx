import React from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Loader2,
  PlayCircle,
  ArrowRight,
  Sparkles,
  BrainCircuit
} from 'lucide-react';

export default function AICodeGenerationPage() {
  const steps = [
    { id: 1, label: 'Upload', state: 'completed' },
    { id: 2, label: 'Analyze', state: 'completed' },
    { id: 3, label: 'Generate', state: 'active' },
    { id: 4, label: 'Preview', state: 'pending' },
    { id: 5, label: 'Compare', state: 'pending' },
    { id: 6, label: 'Refine', state: 'pending' },
    { id: 7, label: 'Export', state: 'pending' },
  ];

  const milestones = [
    {
      status: 'completed',
      title: 'Screenshot analyzed & OCR extracted',
      desc: '1,240 text vectors identified • 140ms'
    },
    {
      status: 'completed',
      title: 'UI components & bounding boxes identified',
      desc: '42 discrete elements segmented'
    },
    {
      status: 'completed',
      title: 'Layout hierarchy & flexbox trees created',
      desc: 'Mobile column flow resolved • Yoga layout'
    },
    {
      status: 'completed',
      title: 'Color palette & design tokens extracted',
      desc: 'Hex #06b6d4, #4edea3 mapped to tokens'
    },
    {
      status: 'active',
      title: 'Synthesizing React Native StyleSheet code',
      desc: 'Writing styles.heroHeader & touchable cards'
    },
    {
      status: 'pending',
      title: 'Preparing interactive live sandbox preview',
      desc: 'Awaiting bundle compilation'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 flex flex-col items-center pb-12 selection:bg-blue-100">
      
      {/* Header */}
      <header className="w-full h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img src="/logo.png" alt="UIForge AI Logo" className="h-10 md:h-11 w-auto object-contain transition-transform duration-200 hover:scale-105" />
        </Link>

        {/* Stepper */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex items-center bg-white border border-slate-200 rounded-full px-2 py-1 shadow-sm">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className={`flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-colors
                  ${step.state === 'completed' ? 'text-emerald-600' : 
                    step.state === 'active' ? 'text-blue-600 bg-blue-50' : 
                    'text-slate-400'}`
                }>
                  {step.state === 'completed' && <Check className="w-3.5 h-3.5 mr-1 stroke-[3]" />}
                  {step.state === 'active' && <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1.5" />}
                  <span className={`${step.state !== 'completed' && step.state !== 'active' ? 'mr-1' : ''}`}>
                    {step.id}.
                  </span>
                  {step.label}
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 mx-0.5" strokeWidth={2.5} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <div className="w-48 flex justify-end">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200 shadow-sm bg-slate-50">
            <RotateCcw className="w-3.5 h-3.5 text-red-500" strokeWidth={2.5} />
            Reset / Start New
          </button>
        </div>
      </header>

      <main className="max-w-[1100px] w-full mt-8 px-4 flex flex-col gap-6">
        
        {/* Main Card */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-10 flex flex-col items-center w-full">
          
          {/* Hero Animation Area */}
          <div className="relative w-40 h-40 flex items-center justify-center mb-6">
            {/* Pulsing rings */}
            <div className="absolute w-full h-full border-2 border-cyan-100 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute w-[80%] h-[80%] border-2 border-dashed border-cyan-200 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
            <div className="absolute w-[60%] h-[60%] bg-cyan-50 rounded-full flex items-center justify-center shadow-inner">
               <div className="w-14 h-14 bg-[#0F172A] rounded-full flex items-center justify-center shadow-lg relative">
                 <BrainCircuit className="w-7 h-7 text-white" />
                 {/* Little decorative dots on the brain */}
                 <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-[#0F172A]"></div>
                 <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-[#0F172A]"></div>
               </div>
            </div>
            {/* Sparkles */}
            <Sparkles className="absolute top-0 right-0 w-5 h-5 text-emerald-400" />
            <div className="absolute bottom-4 right-2 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Generating Your Interface</h1>
          <p className="text-slate-500 text-center max-w-lg mb-10 text-sm leading-relaxed">
            Transforming visual bounding boxes and detected hierarchy into production-grade 
            React Native StyleSheet components and clean JSX primitives.
          </p>

          {/* Progress Section */}
          <div className="w-full max-w-3xl mb-12">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md uppercase tracking-wider border border-blue-100">
                Step 4/6 Active
              </span>
              <span className="text-sm font-bold text-blue-600 tracking-tight">
                87% completed
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ width: '87%' }}
              >
                {/* Shimmer effect inside progress bar */}
                <div className="absolute inset-0 bg-white/20 skew-x-[-20deg] animate-[translate_2s_infinite]"></div>
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Left Column: Pipeline Milestones */}
            <div className="flex flex-col border border-slate-100 bg-slate-50/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/60">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-blue-600" />
                  <h3 className="font-bold text-slate-800 text-sm">Pipeline Milestones</h3>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 tracking-widest uppercase font-mono">4 / 6 Finished</span>
              </div>

              <div className="flex flex-col gap-3">
                {milestones.map((item, i) => (
                  <div key={i} className={`flex items-start gap-4 p-3 rounded-xl border ${
                    item.status === 'completed' ? 'bg-white border-slate-200/60 shadow-sm' :
                    item.status === 'active' ? 'bg-blue-50 border-blue-200 shadow-sm shadow-blue-100 ring-1 ring-blue-100' :
                    'border-transparent opacity-60'
                  }`}>
                    <div className="mt-0.5 shrink-0">
                      {item.status === 'completed' && <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-200"><CheckCircle2 className="w-3.5 h-3.5" /></div>}
                      {item.status === 'active' && <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />}
                      {item.status === 'pending' && <div className="w-2 h-2 rounded-full bg-slate-300 m-1.5" />}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                         <span className={`text-sm font-semibold ${item.status === 'active' ? 'text-blue-900' : 'text-slate-700'}`}>
                          {item.title}
                        </span>
                        {item.status === 'active' && (
                           <span className="text-[9px] font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded uppercase tracking-wider ml-2">Active</span>
                        )}
                      </div>
                      <span className={`text-xs mt-0.5 ${item.status === 'active' ? 'text-blue-600/80 font-mono' : 'text-slate-400 font-mono'}`}>
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Terminal & Stats */}
            <div className="flex flex-col gap-4">
              
              {/* Terminal Window */}
              <div className="bg-[#0F172A] rounded-2xl flex flex-col overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-800">
                {/* Terminal Header */}
                <div className="h-10 bg-[#1E293B] border-b border-slate-700/50 flex items-center justify-between px-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">terminal.synth.live - React Native</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                    <span className="text-[9px] font-bold text-blue-400 tracking-wider">LIVE STREAM</span>
                  </div>
                </div>
                {/* Terminal Content */}
                <div className="p-4 text-[10px] sm:text-xs font-mono leading-relaxed h-[240px] overflow-y-auto">
                  <div className="text-slate-500 mb-2"># INIT PROCESS...</div>
                  <div className="text-slate-300 mb-2"><span className="text-emerald-400">[00:04.35]</span> <span className="text-blue-400">SYNTH:</span> Outputting React Native TouchableOpacity handlers...</div>
                  <div className="text-slate-300 mb-2"><span className="text-emerald-400">[00:04.80]</span> <span className="text-purple-400">AST_COMPLETE:</span> AST compilation verified with 0 syntax errors</div>
                  <div className="text-slate-300 mb-2"><span className="text-emerald-400">[00:05.10]</span> <span className="text-cyan-400">SANDBOX:</span> Generating React Native web bundle & mounting hot preview...</div>
                  <div className="text-slate-300 mb-2"><span className="text-emerald-400">[00:04.10]</span> <span className="text-orange-400">RESOLVE:</span> Extracting typography tokens to Inter & JetBrains Mono...</div>
                  <div className="text-slate-300 mb-2"><span className="text-emerald-400">[00:04.35]</span> <span className="text-blue-400">SYNTH:</span> Outputting React Native TouchableOpacity handlers...</div>
                  <div className="text-slate-300"><span className="text-emerald-400">[00:04.80]</span> <span className="text-purple-400">AST_COMPLETE:</span> AST compilation verified with 0 syntax errors</div>
                  {/* Blinking cursor */}
                  <div className="w-2 h-4 bg-slate-400 mt-2 animate-pulse"></div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex flex-col justify-center">
                  <span className="text-[10px] text-slate-500 font-mono mb-1">Component Tree</span>
                  <span className="text-xs font-bold text-slate-800">14 Nested Nodes</span>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex flex-col justify-center">
                  <span className="text-[10px] text-slate-500 font-mono mb-1">Tailwind / Native</span>
                  <span className="text-xs font-bold text-blue-600">Nativewind v4</span>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex flex-col justify-center">
                  <span className="text-[10px] text-slate-500 font-mono mb-1">Quality Score</span>
                  <span className="text-xs font-bold text-emerald-600">98.4% Match</span>
                </div>
              </div>

            </div>
          </div>

          <div className="w-full mt-auto pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-[11px] text-slate-500">Target Workspace:</span>
              <span className="text-[11px] font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">Restaurant-App/screens/MenuOverview.tsx</span>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 border border-slate-200 transition-colors">
                Cancel & Reconfigure
              </button>
              <button className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
                <PlayCircle className="w-4 h-4" />
                View Live Preview <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
        
      </main>

      <div className="max-w-[1100px] w-full px-4 mt-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* File Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0F172A] rounded-lg border border-slate-800 flex items-center justify-center shadow-sm relative overflow-hidden">
               {/* Tiny mockup representation inside the icon box */}
               <div className="w-6 h-8 border border-slate-700 rounded-sm flex flex-col opacity-50 p-0.5 gap-0.5">
                  <div className="w-full h-1 bg-slate-600 rounded-sm"></div>
                  <div className="w-1/2 h-1 bg-slate-600 rounded-sm"></div>
                  <div className="w-full h-3 bg-cyan-900/50 rounded-sm mt-1"></div>
               </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800 font-mono">input_restaurant_mockup.png</span>
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <span className="text-emerald-500">Uploaded</span> • 1170 x 2532 px
              </span>
            </div>
          </div>

          {/* Palette extraction */}
          <div className="flex items-center gap-4 bg-emerald-50/50 px-4 py-2 rounded-lg border border-emerald-100/50">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Palette Extraction</span>
              <span className="text-[10px] text-slate-500">5 Brand Accents Cached</span>
            </div>
            <div className="flex items-center gap-1.5 ml-2">
              <div className="w-4 h-4 rounded-full bg-[#3B82F6] shadow-sm"></div>
              <div className="w-4 h-4 rounded-full bg-[#10B981] shadow-sm"></div>
              <div className="w-4 h-4 rounded-full bg-[#06B6D4] shadow-sm"></div>
              <div className="w-4 h-4 rounded-full bg-[#0F172A] shadow-sm"></div>
            </div>
          </div>

          {/* Jump action */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Step 4 Target</span>
              <span className="text-[10px] text-slate-500">Ready to compile bundle</span>
            </div>
            <button className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md text-[10px] font-bold transition-colors">
              Jump to Step 4 <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}