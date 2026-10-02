import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  RotateCcw,
  ImagePlus,
  CloudUpload,
  CheckCircle2,
  FileImage,
  Smartphone,
  Palette,
  Layers,
  RefreshCw,
  Sparkles,
  Box,
  MonitorPlay,
  Check,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function UploadAndConfigure() {
  const steps = [
    { id: 1, label: 'Upload', active: true },
    { id: 2, label: 'Analyze', active: false },
    { id: 3, label: 'Generate', active: false },
    { id: 4, label: 'Preview', active: false },
    { id: 5, label: 'Compare', active: false },
    { id: 6, label: 'Refine', active: false },
    { id: 7, label: 'Export', active: false },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col selection:bg-blue-200">
      
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img src="/logo.png" alt="UIForge AI Logo" className="h-10 md:h-11 w-auto object-contain transition-transform duration-200 hover:scale-105" />
        </Link>

        {/* Stepper */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex items-center bg-white border border-slate-200 rounded-full px-1 py-1 shadow-sm">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className={`flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  step.active 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}>
                  {step.active ? (
                    <span className="mr-1.5 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">
                      {step.id}
                    </span>
                  ) : (
                    <span className="mr-1.5 opacity-80">{step.id}.</span>
                  )}
                  {step.label}
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-300 mx-1" strokeWidth={2.5} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <div className="w-48 flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200 shadow-sm bg-slate-50">
            <RotateCcw className="w-4 h-4 text-red-500" strokeWidth={2.5} />
            Reset / Start New
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* Left Column: Upload Zone */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm relative">
            <div className="absolute top-8 right-8 text-blue-100 bg-blue-50 p-2 rounded-xl border border-blue-100/50">
               <ImagePlus className="w-6 h-6 text-blue-500" />
            </div>

            <h1 className="text-2xl font-bold text-slate-900 mb-2">Upload Your UI Design</h1>
            <p className="text-slate-500 text-sm mb-8">
              Feed high-fidelity raster mocks or screenshot captures to begin semantic AST synthesis.
            </p>

            <div className="border-2 border-dashed border-slate-300 rounded-3xl p-12 flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group min-h-[400px]">
              
              <div className="relative mb-6">
                <div className="bg-white p-4 rounded-full shadow-sm border border-slate-200 group-hover:scale-105 transition-transform">
                  <CloudUpload className="w-10 h-10 text-blue-500" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1 border-2 border-white">
                  <Zap className="w-3 h-3 fill-current" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-2">Drag & Drop Screenshot here</h3>
              <p className="text-slate-500 text-sm mb-6">
                Paste directly via <kbd className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-xs font-mono shadow-sm">Ctrl+V</kbd> or select an asset from your local filesystem
              </p>

              <button className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold py-2.5 px-6 rounded-xl flex items-center gap-2 mb-8 shadow-sm transition-all">
                <FileImage className="w-4 h-4 text-slate-500" />
                Choose Image
              </button>

              <div className="flex items-center gap-4 text-xs font-medium text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Supported: PNG, JPG, JPEG, WebP
                </span>
                <span className="w-px h-4 bg-slate-200"></span>
                <span className="flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-blue-400" />
                  Max 15MB
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: File State & Config */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col">
            
            {/* Header info */}
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="bg-green-50 p-2.5 rounded-xl border border-green-100">
                  <Check className="w-5 h-5 text-green-600 stroke-[3]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base font-mono">restaurant_login_mockup.png</h3>
                  <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">
                    Staged • Ready for Tokenization
                  </p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                Validated
              </div>
            </div>

            {/* Image Preview Area (CSS Mockup) */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 mb-8 flex justify-center relative overflow-hidden">
              {/* Phone Container */}
              <div className="w-[280px] h-[580px] bg-slate-900 rounded-[2.5rem] border-[6px] border-black p-4 relative shadow-xl overflow-hidden flex flex-col items-center">
                
                {/* Status Bar */}
                <div className="w-full flex justify-between items-center text-[10px] text-white/80 font-medium mb-12">
                  <span>9:41</span>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 bg-white/80 rounded-sm"></div>
                    <div className="w-3 h-3 bg-white/80 rounded-sm"></div>
                  </div>
                </div>

                {/* Mockup UI Content */}
                <div className="flex flex-col items-center w-full px-2 relative z-10">
                  {/* Fake Logo */}
                  <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center mb-4">
                     <span className="text-teal-400 font-serif italic font-bold text-xl">S</span>
                  </div>
                  <h2 className="text-white font-semibold text-lg mb-1">Welcome Back!</h2>
                  <p className="text-slate-400 text-xs text-center mb-8">Sign in to continue your culinary journey.</p>

                  {/* Highlighted Input 1 */}
                  <div className="w-full relative group mb-4">
                    <div className="absolute -inset-1 border-2 border-cyan-400/60 bg-cyan-400/10 rounded-xl z-20 pointer-events-none">
                      <div className="absolute -top-2.5 left-2 bg-cyan-900 border border-cyan-400 text-cyan-300 text-[8px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider">
                        INPUT:EMAILFIELD
                      </div>
                    </div>
                    <div className="w-full h-12 bg-white/5 border border-white/10 rounded-lg px-4 flex items-center text-white/40 text-sm">
                      <span className="opacity-50 mr-2">✉</span> email@restaurant.com
                    </div>
                  </div>

                  {/* Highlighted Input 2 */}
                  <div className="w-full relative group mb-6">
                    <div className="absolute -inset-1 border-2 border-cyan-400/60 bg-cyan-400/10 rounded-xl z-20 pointer-events-none">
                      <div className="absolute -top-2.5 left-2 bg-cyan-900 border border-cyan-400 text-cyan-300 text-[8px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider">
                        INPUT:PASSWORDFIELD
                      </div>
                    </div>
                    <div className="w-full h-12 bg-white/5 border border-white/10 rounded-lg px-4 flex items-center justify-between text-white/40 text-sm">
                      <div className="flex items-center"><span className="opacity-50 mr-2">🔒</span> ••••••••</div>
                      <span className="opacity-50">👁</span>
                    </div>
                  </div>
                  
                  <div className="w-full text-right mb-6">
                    <span className="text-[10px] text-teal-400">Forgot Password?</span>
                  </div>

                  <div className="w-full h-12 bg-teal-500 rounded-lg flex items-center justify-center text-white font-medium text-sm mb-6">
                    Sign In
                  </div>
                  
                  <div className="text-[10px] text-slate-400">
                    Don't have an account? <span className="text-teal-400">Sign Up</span>
                  </div>
                </div>

                {/* Abstract Background Blurs inside phone */}
                <div className="absolute top-20 -left-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
              </div>

              {/* Overlay Status Bar */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white rounded-full px-5 py-2.5 flex items-center gap-4 text-xs font-mono shadow-2xl">
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> 5 Form Components</span>
                <span className="text-blue-400 font-bold">100% Fidelity</span>
              </div>
            </div>

            {/* Asset Telemetry */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-slate-900">Asset Telemetry</h4>
                <span className="bg-green-50 border border-green-100 text-green-700 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded flex items-center gap-1.5">
                  <Check className="w-3 h-3" /> Ingestion Complete
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {/* Stats boxes */}
                <div className="border border-slate-200 rounded-xl p-3 bg-white">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1 font-medium">
                     <MonitorPlay className="w-3.5 h-3.5" /> Resolution
                  </div>
                  <div className="font-mono font-bold text-slate-800 text-sm">1080 × 1920 px</div>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-3 bg-white">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1 font-medium">
                     <Smartphone className="w-3.5 h-3.5" /> Aspect Ratio
                  </div>
                  <div className="font-mono font-bold text-slate-800 text-sm">9:16 <span className="text-slate-400 font-sans text-xs font-normal">(Portrait)</span></div>
                </div>

                <div className="border border-slate-200 rounded-xl p-3 bg-white">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1 font-medium">
                     <Layers className="w-3.5 h-3.5" /> Screen Density
                  </div>
                  <div className="font-mono font-bold text-slate-800 text-sm">3x Retina</div>
                </div>

                <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-500 font-mono">Color Profile: <strong className="text-slate-700">sRGB</strong></span>
                </div>

                <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50 flex items-center gap-2">
                  <Box className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-500 font-mono">Alpha Channel: <strong className="text-slate-700">Yes</strong></span>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50 flex items-center gap-2">
                  <FileImage className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-500 font-mono">Size: <strong className="text-slate-700">1.42 MB</strong></span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
              <button className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:border-slate-300 hover:bg-slate-50 transition-colors">
                <RefreshCw className="w-5 h-5" /> Replace Image
              </button>
              <Link 
                to="/analysis"
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
              >
                <Sparkles className="w-5 h-5" /> AI Analysis
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

          </div>
        </div>

        {/* Footer Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-4">
            <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600 border border-blue-100 shrink-0">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Atomic Token Extraction</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Colors, radii, font hierarchy, and margin scales are distilled directly into Tailwind classes.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-4">
            <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600 border border-emerald-100 shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Auto-Responsive Adaptation</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Synthesizes flex break layouts from pure mobile mockups into full tablet and desktop frames.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-4">
            <div className="bg-purple-50 p-2.5 rounded-xl text-purple-600 border border-purple-100 shrink-0">
              <MonitorPlay className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Interactive Preview & AST</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Immediate side-by-side comparison with instant visual diffs and editable JSX/HTML blocks.</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}