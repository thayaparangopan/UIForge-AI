import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Focus,
  BrainCircuit,
  Network,
  Layout,
  Palette,
  Code,
  ArrowRight,
  Layers,
  CircleDot
} from 'lucide-react';

interface BoundingBoxProps {
  top: string;
  left: string;
  width: string;
  height: string;
  label: string;
  color: 'blue' | 'purple' | 'emerald' | 'cyan' | string;
  labelPos?: 'top' | 'bottom';
}

// Reusable component for the bounding box overlays on the mock phone
const BoundingBox: React.FC<BoundingBoxProps> = ({ top, left, width, height, label, color, labelPos = 'top' }) => {
  const colorMap: Record<string, { border: string; bg: string; text: string; labelBg: string }> = {
    blue: { border: 'border-blue-400', bg: 'bg-blue-500/20', text: 'text-blue-100', labelBg: 'bg-blue-600' },
    purple: { border: 'border-purple-400', bg: 'bg-purple-500/20', text: 'text-purple-100', labelBg: 'bg-purple-600' },
    emerald: { border: 'border-emerald-400', bg: 'bg-emerald-500/20', text: 'text-emerald-100', labelBg: 'bg-emerald-600' },
    cyan: { border: 'border-cyan-400', bg: 'bg-cyan-500/20', text: 'text-cyan-100', labelBg: 'bg-cyan-600' },
  };

  const theme = colorMap[color] || colorMap.blue;

  return (
    <div
      className={`absolute border-2 border-dashed ${theme.border} ${theme.bg} rounded flex items-start z-20 pointer-events-none transition-all duration-300 hover:bg-opacity-40`}
      style={{ top, left, width, height }}
    >
      <div 
        className={`absolute px-1.5 py-0.5 text-[8px] font-mono font-bold tracking-wider rounded ${theme.labelBg} ${theme.text} whitespace-nowrap`}
        style={{
          top: labelPos === 'top' ? '-10px' : 'auto',
          bottom: labelPos === 'bottom' ? '-10px' : 'auto',
          left: '-2px',
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default function AIAnalysisPage() {
  const steps = [
    { id: 1, label: 'Upload', state: 'completed' },
    { id: 2, label: 'Analyze', state: 'active' },
    { id: 3, label: 'Generate', state: 'pending' },
    { id: 4, label: 'Preview', state: 'pending' },
    { id: 5, label: 'Compare', state: 'pending' },
    { id: 6, label: 'Refine', state: 'pending' },
    { id: 7, label: 'Export', state: 'pending' },
  ];

  const analysisChecks = [
    'Header detected', 'Logo detected', 'Text elements detected',
    'Input fields detected', 'Button detected', 'Navigation detected'
  ];

  const hierarchyData = [
    { dot: 'bg-purple-500', name: 'Logo', id: '#BrandLogo', desc: 'Image component & Badge', type: 'FastImage' },
    { dot: 'bg-blue-500', name: "Heading 'Welcome Back'", id: '#Title', desc: 'Typography • Semibold 22px', type: 'Text.H1' },
    { dot: 'bg-emerald-500', name: 'Email Field', id: '#EmailInput', desc: 'TextInput with placeholder', type: 'Input.Email' },
    { dot: 'bg-emerald-500', name: 'Password Field', id: '#PasswordInput', desc: 'Secure TextInput', type: 'Input.Password' },
    { dot: 'bg-blue-500', name: 'Login Button', id: '#PrimaryCTA', desc: 'TouchableOpacity / Primary Button', type: 'Button.Primary' },
  ];

  const colorData = [
    { hex: '#06B6D4', name: 'Cyan accent', bgClass: 'bg-[#06B6D4]' },
    { hex: '#0F172A', name: 'Slate background', bgClass: 'bg-[#0F172A]' },
    { hex: '#334155', name: 'Borders', bgClass: 'bg-[#334155]' },
    { hex: '#FFFFFF', name: 'Text primary', bgClass: 'bg-[#FFFFFF]', borderClass: 'border border-slate-200' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col text-slate-800 selection:bg-blue-100">
      
      {}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img src="/logo.png" alt="UIForge AI Logo" className="h-10 md:h-11 w-auto object-contain transition-transform duration-200 hover:scale-105" />
        </Link>

        {/* Stepper */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex items-center bg-white border border-slate-200 rounded-full px-2 py-1 shadow-sm">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className={`flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-colors
                  ${step.state === 'completed' ? 'text-green-600 bg-green-50' : 
                    step.state === 'active' ? 'text-blue-600 bg-blue-50' : 
                    'text-slate-400'}`
                }>
                  {step.state === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 mr-1" />}
                  {step.state === 'active' && <CircleDot className="w-3.5 h-3.5 mr-1" />}
                  <span className={`${step.state !== 'completed' && step.state !== 'active' ? 'mr-1' : ''}`}>
                    {step.state === 'pending' ? `${step.id}.` : ''}
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

      {}
      <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col">
              
              <div className="flex items-center gap-2 mb-6">
                <Focus className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-bold text-slate-900">Original Screenshot & Bounding Boxes</h2>
              </div>

              {/* Mock Device Container */}
              <div className="flex justify-center bg-slate-50 p-6 rounded-2xl border border-slate-100 relative overflow-hidden">
                <div className="w-[300px] h-[600px] bg-[#0F172A] rounded-[2.5rem] border-[8px] border-slate-800 p-4 relative shadow-2xl overflow-hidden flex flex-col font-sans">
                  
                  {/* Phone UI Background Details */}
                  <div className="absolute top-20 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="absolute bottom-20 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                  {/* Top Bar */}
                  <div className="w-full flex justify-between items-center text-[10px] text-slate-300 font-medium mb-10 z-10">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-300 rounded-sm"></div>
                      <div className="w-2 h-2 bg-slate-300 rounded-sm"></div>
                    </div>
                  </div>

                  {/* Fake UI Content */}
                  <div className="flex flex-col w-full z-10">
                    {/* Header Area */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-slate-400 text-xs">BISTROT LUMIÈRE</div>
                      <div className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 text-[10px]">i</div>
                    </div>

                    {/* Logo Area */}
                    <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-4 self-center relative">
                      <span className="text-cyan-400 font-serif italic font-bold text-3xl">S</span>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border border-slate-900"></div>
                    </div>

                    <h1 className="text-white font-semibold text-xl mb-1 text-center">Welcome Back</h1>
                    <p className="text-slate-400 text-xs text-center mb-8">Artisan dining at your fingertips.</p>

                    {/* Inputs */}
                    <div className="space-y-4 mb-2">
                       <div className="text-[10px] text-slate-400">Work or Personal Email</div>
                       <div className="w-full h-12 bg-slate-800/50 border border-slate-700 rounded-lg px-4 flex items-center text-slate-300 text-sm">
                        <span className="text-cyan-400 mr-2">@</span> justin.mercier@gourmet.io
                       </div>
                       
                       <div className="flex justify-between items-center mt-4">
                         <div className="text-[10px] text-slate-400">Passkey / Password</div>
                         <div className="text-[10px] text-cyan-400">Forgot?</div>
                       </div>
                       <div className="w-full h-12 bg-slate-800/50 border border-slate-700 rounded-lg px-4 flex items-center justify-between text-slate-300 text-sm">
                        <div className="flex items-center"><span className="text-slate-500 mr-2">🔒</span> ••••••••••••</div>
                        <span className="text-slate-500">👁</span>
                       </div>
                    </div>

                    {/* Button */}
                    <div className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-medium text-sm mt-8 shadow-lg shadow-blue-500/20">
                      Sign In to Table →
                    </div>

                    <div className="text-center text-[10px] text-slate-500 mt-4">Fast authentication</div>

                    {/* Social */}
                    <div className="flex gap-4 mt-6">
                      <div className="flex-1 h-10 bg-slate-800/50 border border-slate-700 rounded-lg flex items-center justify-center text-slate-300 text-xs gap-2">
                        <span>👆</span> Biometric
                      </div>
                      <div className="flex-1 h-10 bg-slate-800/50 border border-slate-700 rounded-lg flex items-center justify-center text-slate-300 text-xs gap-2">
                        <span>🍎</span> Apple Key
                      </div>
                    </div>
                  </div>

                  {/* OVERLAY: AI Bounding Boxes */}
                  {/* These coordinates are visually estimated percentages relative to the phone container */}
                  <BoundingBox top="12%" left="6%" width="88%" height="6%" label="#Header" color="blue" />
                  <BoundingBox top="20%" left="35%" width="30%" height="11%" label="#BrandLogo" color="purple" />
                  <BoundingBox top="34%" left="15%" width="70%" height="8%" label="#Title" color="blue" />
                  <BoundingBox top="44%" left="6%" width="88%" height="14%" label="#EmailInput" color="emerald" />
                  <BoundingBox top="61%" left="6%" width="88%" height="14%" label="#PasswordInput" color="emerald" />
                  <BoundingBox top="78%" left="6%" width="88%" height="9%" label="#PrimaryCTA" color="blue" labelPos="bottom" />
                  <BoundingBox top="90%" left="6%" width="88%" height="7%" label="#SocialLogin" color="purple" labelPos="bottom" />
                  
                </div>
              </div>
            </div>

            {/* Status Bar Component */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="font-semibold text-sm text-slate-800">Multi-pass Object Localization</span>
              </div>
              <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold flex flex-col items-end leading-tight">
                <span>100%</span>
                <span>Calibrated</span>
              </div>
            </div>
          </div>

          {}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Engine Status Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
                <div className="bg-blue-50 p-2 rounded-xl border border-blue-100">
                  <BrainCircuit className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">AI UI Analysis Engine</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {analysisChecks.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-xs font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Component Hierarchy Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
               <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
                <Network className="w-4 h-4 text-slate-500" />
                <h3 className="font-bold text-slate-900 text-xs tracking-wider uppercase font-mono">STRUCTURED COMPONENT HIERARCHY</h3>
              </div>

              <div className="space-y-1">
                {hierarchyData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100 group">
                    <div className="flex items-center gap-4 w-1/2">
                      <div className={`w-2.5 h-2.5 rounded-full ${item.dot} shadow-sm shrink-0`}></div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <span className="font-bold text-sm text-slate-800">{item.name}</span>
                        <span className="bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider">
                          {item.id}
                        </span>
                      </div>
                    </div>
                    
                    <div className="hidden md:block text-xs text-slate-500 w-1/3 truncate">
                      {item.desc}
                    </div>

                    <div className="flex justify-end w-auto md:w-1/6">
                      <span className="bg-purple-50 text-purple-700 border border-purple-100 px-2 py-1 rounded-md text-[10px] font-mono whitespace-nowrap">
                        {item.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Layout & Colors Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Layout Breakdown */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
                  <Layout className="w-4 h-4 text-blue-500" />
                  <h3 className="font-bold text-slate-900 text-xs tracking-wider uppercase font-mono">LAYOUT STRUCTURE BREAKDOWN</h3>
                </div>

                <div className="space-y-3 flex-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-mono">Flow Model:</span>
                    <span className="font-bold text-blue-600">Vertical Flexbox (column)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-mono">Alignment:</span>
                    <span className="font-bold text-emerald-600">Center-aligned (items-center)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-mono">Padding:</span>
                    <span className="font-bold text-purple-600">24px horizontal padding (px-6)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-mono">Gap Rhythm:</span>
                    <span className="font-bold text-slate-700 text-right">12px between inputs, 16px actions</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    Responsive Box Model Confirmed
                  </span>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Flex 1 / Screen</span>
                </div>
              </div>

              {/* Estimated Colors */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
                  <Palette className="w-4 h-4 text-purple-500" />
                  <h3 className="font-bold text-slate-900 text-xs tracking-wider uppercase font-mono">ESTIMATED COLORS</h3>
                </div>

                <div className="space-y-3 flex-1">
                  {colorData.map((color, i) => (
                    <div key={i} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-md shadow-sm ${color.bgClass} ${color.borderClass || ''}`}></div>
                        <span className="text-xs font-mono font-bold text-slate-800">{color.hex}</span>
                      </div>
                      <span className="text-xs text-slate-500">{color.name}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 text-right">
                  <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center justify-end w-full gap-1">
                    Export to Tailwind theme <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {}
      <div className="w-full bg-[#F8FAFC] border-t border-slate-200 p-4 sm:p-6 pb-8 sticky bottom-0 z-40">
        <div className="max-w-[1400px] mx-auto bg-white rounded-2xl border border-slate-200 p-6 shadow-lg shadow-slate-200/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="max-w-xl">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to transform visual AST to clean code?</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Generates fully typed React Native components, accessible elements, and exact Tailwind CSS classes.
            </p>
          </div>

          <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all active:scale-95 whitespace-nowrap">
            <Code className="w-5 h-5" />
            Generate Code <ArrowRight className="w-5 h-5" />
          </button>

        </div>
      </div>

    </div>
  );
}