import React from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Download,
  Copy,
  ExternalLink,
  Layers,
  Code2,
  ShieldCheck,
  Image as ImageIcon,
  Activity,
  AlertCircle,
  RefreshCw,
  Folder,
  FileCode2,
  FileJson,
  FileImage,
  Terminal,
  FileText
} from 'lucide-react';

export default function App() {
  const steps = [
    { id: 1, label: 'Upload', state: 'completed' },
    { id: 2, label: 'Analyze', state: 'completed' },
    { id: 3, label: 'Generate', state: 'completed' },
    { id: 4, label: 'Preview', state: 'completed' },
    { id: 5, label: 'Compare', state: 'completed' },
    { id: 6, label: 'Refine', state: 'completed' },
    { id: 7, label: 'Export', state: 'active' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col overflow-hidden selection:bg-blue-100 pb-12">
      
      {/* Top Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-20 sticky top-0">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img src="/logo.png" alt="UIForge AI Logo" className="h-10 md:h-11 w-auto object-contain transition-transform duration-200 hover:scale-105" />
        </Link>

        {/* Stepper */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex items-center space-x-1">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className={`flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-colors
                  ${step.state === 'completed' ? 'text-emerald-600 bg-emerald-50/50' : 
                    step.state === 'active' ? 'text-blue-700 bg-blue-50 border border-blue-100 shadow-sm' : 
                    'text-slate-400'}`
                }>
                  {step.state === 'completed' && <Check className="w-3.5 h-3.5 mr-1.5 stroke-[3]" />}
                  {step.state === 'active' && <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>}
                  <span className={`${step.state === 'pending' ? 'mr-1.5' : ''}`}>
                    {step.state === 'pending' ? `${step.id}.` : ''}
                  </span>
                  {step.label}
                  {step.state === 'active' && <CheckCircle2 className="w-3.5 h-3.5 ml-1.5 text-blue-600" />}
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

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 pt-8 flex flex-col gap-6">
        
        {/* Hero Section */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
               <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight flex items-center gap-2">
            <span role="img" aria-label="party popper" className="text-2xl">🎉</span> Your UI is Ready to Ship
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto mb-8 leading-relaxed">
            Your generated React Native code bundle is fully compiled, linted, and ready for your production repository.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <button className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-bold shadow-md shadow-blue-500/20 transition-all">
              <Download className="w-5 h-5" />
              Download ZIP Bundle
              <span className="bg-blue-800/50 text-blue-100 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ml-1 font-semibold">.zip (42 KB)</span>
            </button>
            <button className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-6 py-3.5 rounded-xl font-bold shadow-sm transition-all">
              <Copy className="w-5 h-5 text-slate-400" />
              Copy All Code
            </button>
          </div>

          <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg">
            <ExternalLink className="w-4 h-4" />
            Open in CodeSandbox / Snack
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (1/3) */}
          <div className="flex flex-col gap-6">
            
            {/* Target Stack Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-4">
                <Layers className="w-3.5 h-3.5 text-blue-500" /> Target Stack
              </h3>
              
              <div className="flex flex-col">
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Code2 className="w-4 h-4 text-slate-400" /> Framework
                  </div>
                  <span className="text-sm font-mono text-slate-500">React Native</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <div className="w-4 h-4 flex items-center justify-center rounded bg-emerald-100">
                       <span className="text-[10px] font-bold text-emerald-600">S</span>
                    </div>
                    Styling Engine
                  </div>
                  <span className="text-sm font-mono text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">StyleSheet.create</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-blue-500" /> Type Safety
                  </div>
                  <span className="text-sm font-mono text-blue-600 font-semibold">TypeScript (Strict)</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <ImageIcon className="w-4 h-4 text-slate-400" /> Asset Scale
                  </div>
                  <span className="text-sm font-mono text-slate-500">@2x, @3x SVGs</span>
                </div>
              </div>
            </div>

            {/* Bundle Quality Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-5">
                <Activity className="w-3.5 h-3.5 text-emerald-500" /> Bundle Quality Metrology
              </h3>

              <div className="flex flex-col gap-5">
                <div>
                  <div className="flex justify-between items-end mb-2 text-xs font-mono">
                    <span className="text-slate-500">AST Component Depth:</span>
                    <span className="font-bold text-slate-900">4 levels</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2 text-xs font-mono">
                    <span className="text-slate-500">StyleSheet Deduplication:</span>
                    <span className="font-bold text-slate-900">96.4%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '96.4%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2 text-xs font-mono">
                    <span className="text-slate-500">Accessibility Attributes (A11y):</span>
                    <span className="font-bold text-slate-900">100% compliant</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ephemeral Notice Card */}
            <div className="bg-red-50 rounded-2xl border border-red-100 shadow-sm p-6">
               <h3 className="text-sm font-bold text-red-700 flex items-center gap-2 mb-3">
                 <AlertCircle className="w-4 h-4" /> Ephemeral Session Notice
               </h3>
               <p className="text-xs text-red-800/80 leading-relaxed mb-4">
                 This zero-auth session does not persist in the cloud. To keep your work secure, download the package now before closing or resetting your workspace.
               </p>
               <button className="w-full bg-red-100/50 hover:bg-red-100 border border-red-200 text-red-700 font-semibold text-xs py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
                 <RefreshCw className="w-3.5 h-3.5" /> Start New Project (Reset Workspace)
               </button>
            </div>

          </div>

          {/* Right Column (2/3) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Archive Manifest Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden h-[540px]">
              
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" /> Generated Archive Manifest
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded">8 files</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded uppercase tracking-wider">Ready to unpack</span>
                </div>
              </div>

              {/* Split Content */}
              <div className="flex-1 flex overflow-hidden">
                
                {/* File Tree (Left Pane) */}
                <div className="w-64 border-r border-slate-100 bg-slate-50/30 overflow-y-auto p-4 flex flex-col font-mono text-xs">
                  <div className="text-[10px] font-bold text-slate-400 mb-3 ml-2">PROJECT FILE TREE</div>
                  
                  <div className="flex items-center gap-2 text-slate-700 py-1 font-medium">
                    <Folder className="w-4 h-4 text-blue-400 fill-blue-100" /> restaurant-mobile-ui/
                  </div>
                  
                  <div className="ml-4 border-l border-slate-200 pl-2 flex flex-col">
                    <div className="flex items-center gap-2 text-slate-600 py-1.5 mt-1">
                      <Folder className="w-4 h-4 text-slate-400 fill-slate-100" /> components/
                    </div>
                    <div className="ml-4 flex flex-col">
                       <div className="flex items-center justify-between bg-blue-50 text-blue-700 border border-blue-100 rounded py-1 px-2 -ml-2 mb-1 cursor-pointer">
                         <div className="flex items-center gap-2">
                           <FileCode2 className="w-3.5 h-3.5 text-blue-500" /> LoginCard.tsx
                         </div>
                         <span className="text-[9px] text-blue-400">1.8 KB</span>
                       </div>
                       <div className="flex items-center justify-between text-slate-500 hover:bg-slate-100 rounded py-1 px-2 -ml-2 cursor-pointer transition-colors">
                         <div className="flex items-center gap-2">
                           <FileCode2 className="w-3.5 h-3.5" /> SocialButtons.tsx
                         </div>
                         <span className="text-[9px] text-slate-400">940 B</span>
                       </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-600 py-1.5 mt-2">
                      <Folder className="w-4 h-4 text-slate-400 fill-slate-100" /> styles/
                    </div>
                    <div className="ml-4 flex flex-col">
                       <div className="flex items-center justify-between text-slate-500 hover:bg-slate-100 rounded py-1 px-2 -ml-2 cursor-pointer transition-colors">
                         <div className="flex items-center gap-2">
                           <FileCode2 className="w-3.5 h-3.5" /> theme.ts
                         </div>
                         <span className="text-[9px] text-slate-400">1.2 KB</span>
                       </div>
                       <div className="flex items-center justify-between text-slate-500 hover:bg-slate-100 rounded py-1 px-2 -ml-2 cursor-pointer transition-colors">
                         <div className="flex items-center gap-2">
                           <FileJson className="w-3.5 h-3.5 text-amber-500" /> tokens.json
                         </div>
                         <span className="text-[9px] text-slate-400">3.4 KB</span>
                       </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-600 py-1.5 mt-2">
                      <Folder className="w-4 h-4 text-slate-400 fill-slate-100" /> assets/
                    </div>
                    <div className="ml-4 flex flex-col">
                       <div className="flex items-center justify-between text-slate-500 hover:bg-slate-100 rounded py-1 px-2 -ml-2 cursor-pointer transition-colors">
                         <div className="flex items-center gap-2">
                           <FileImage className="w-3.5 h-3.5 text-purple-500" /> logo.png
                         </div>
                         <span className="text-[9px] text-slate-400">12 KB</span>
                       </div>
                       <div className="flex items-center justify-between text-slate-500 hover:bg-slate-100 rounded py-1 px-2 -ml-2 cursor-pointer transition-colors">
                         <div className="flex items-center gap-2">
                           <FileImage className="w-3.5 h-3.5 text-purple-500" /> icons.svg
                         </div>
                         <span className="text-[9px] text-slate-400">8.1 KB</span>
                       </div>
                    </div>

                    <div className="flex items-center justify-between text-slate-600 hover:bg-slate-100 rounded py-1.5 px-2 -ml-2 mt-2 cursor-pointer transition-colors">
                      <div className="flex items-center gap-2">
                        <FileCode2 className="w-3.5 h-3.5 text-blue-500" /> App.tsx
                      </div>
                      <span className="text-[9px] text-slate-400">2.1 KB</span>
                    </div>
                  </div>
                </div>

                {/* Code Viewer (Right Pane) */}
                <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
                  
                  {/* File Header Tab */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-slate-50">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-blue-600 font-medium">components/LoginCard.tsx</span>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded">TSX Component</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                      <Check className="w-3.5 h-3.5" /> Valid
                    </div>
                  </div>

                  {/* Code Area */}
                  <div className="flex-1 overflow-auto p-4 text-[13px] font-mono leading-relaxed bg-[#FAFAFA]">
                    <div className="text-slate-400 italic mb-2">// Synthesized by DesignFlow AI Engine v3.2</div>
                    <div>
                      <span className="text-blue-600 font-medium">import</span> <span className="text-slate-700">React, {'{'} useState {'}'}</span> <span className="text-blue-600 font-medium">from</span> <span className="text-emerald-600">'react'</span><span className="text-slate-500">;</span>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">import</span> <span className="text-slate-700">{'{'} View, Text, TextInput, TouchableOpacity, StyleSheet {'}'}</span> <span className="text-blue-600 font-medium">from</span> <span className="text-emerald-600">'react-native'</span><span className="text-slate-500">;</span>
                    </div>
                    <div className="mb-4">
                      <span className="text-blue-600 font-medium">import</span> <span className="text-slate-700">{'{'} theme {'}'}</span> <span className="text-blue-600 font-medium">from</span> <span className="text-emerald-600">'../styles/theme'</span><span className="text-slate-500">;</span>
                    </div>

                    <div>
                      <span className="text-blue-600 font-medium">export const</span> <span className="text-indigo-600 font-semibold">LoginCard</span><span className="text-slate-700">: React.FC = () {'=>'} {'{'}</span>
                    </div>
                    <div className="ml-4">
                      <span className="text-blue-600 font-medium">const</span> <span className="text-slate-700">[email, setEmail] = useState(</span><span className="text-emerald-600">''</span><span className="text-slate-700">)</span><span className="text-slate-500">;</span>
                    </div>
                    <div className="ml-4 text-slate-700">return (</div>
                    <div className="ml-8">
                      <span className="text-slate-700">{'<'}</span><span className="text-teal-600 font-medium">View</span> <span className="text-sky-600">style</span><span className="text-slate-700">={'{'}styles.cardContainer{'}'}{'>'}</span>
                    </div>
                    <div className="ml-12">
                      <span className="text-slate-700">{'<'}</span><span className="text-teal-600 font-medium">Text</span> <span className="text-sky-600">style</span><span className="text-slate-700">={'{'}styles.title{'}'}{'>'}</span>Order Delicious Food<span className="text-slate-700">{'</'}</span><span className="text-teal-600 font-medium">Text</span><span className="text-slate-700">{'>'}</span>
                    </div>
                    <div className="ml-12">
                      <span className="text-slate-700">{'<'}</span><span className="text-teal-600 font-medium">TextInput</span>
                    </div>
                    <div className="ml-16">
                      <span className="text-sky-600">style</span><span className="text-slate-700">={'{'}styles.input{'}'}</span>
                    </div>
                    <div className="ml-16 mb-1">
                      <span className="text-sky-600">placeholder</span><span className="text-slate-700">=</span><span className="text-emerald-600">"your.email@bistro.io"</span>
                    </div>
                    <div className="ml-12 text-slate-700">{'/>'}</div>
                    <div className="ml-8">
                      <span className="text-slate-700">{'</'}</span><span className="text-teal-600 font-medium">View</span><span className="text-slate-700">{'>'}</span>
                    </div>
                    <div className="ml-4 text-slate-700">);</div>
                    <div className="text-slate-700">{'};'}</div>
                  </div>

                  {/* Code Footer */}
                  <div className="h-10 bg-white border-t border-slate-100 flex items-center justify-between px-4 shrink-0 absolute bottom-0 left-0 right-0">
                    <span className="text-[10px] text-slate-400 font-medium">Formatted via Prettier & ESLint</span>
                    <button className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 hover:text-blue-700 transition-colors">
                      <Copy className="w-3 h-3" /> Copy snippet
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Run Commands Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
               <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4">
                 <Terminal className="w-4 h-4 text-blue-600" /> Quick Unpack & Run Commands
               </h3>
               
               <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-sm leading-loose">
                  <div className="flex">
                    <span className="text-slate-400 mr-3 select-none">{'>'}</span>
                    <span className="text-slate-700">mkdir restaurant-app && cd restaurant-app</span>
                  </div>
                  <div className="flex">
                    <span className="text-slate-400 mr-3 select-none">{'>'}</span>
                    <span className="text-slate-700">unzip ~/Downloads/restaurant-mobile-ui.zip -d .</span>
                  </div>
                  <div className="flex">
                    <span className="text-slate-400 mr-3 select-none">{'>'}</span>
                    <span className="text-slate-700 font-semibold">npm install && npx react-native run-ios</span>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}