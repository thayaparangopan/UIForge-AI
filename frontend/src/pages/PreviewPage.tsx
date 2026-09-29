import React from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  ChevronRight,
  RotateCcw,
  FileCode2,
  Zap,
  Copy,
  AlignLeft,
  RefreshCw,
  MonitorSmartphone,
  Wifi,
  BatteryMedium,
  Mail,
  Lock,
  EyeOff,
  ArrowRight,
  Fingerprint,
  ChevronLeft,
  Sparkles,
  Download,
  SplitSquareHorizontal,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

export default function App() {
  const steps = [
    { id: 1, label: 'Upload', state: 'completed' },
    { id: 2, label: 'Analyze', state: 'completed' },
    { id: 3, label: 'Generate', state: 'completed' },
    { id: 4, label: 'Preview', state: 'active' },
    { id: 5, label: 'Compare', state: 'pending' },
    { id: 6, label: 'Refine', state: 'pending' },
    { id: 7, label: 'Export', state: 'pending' },
  ];

  return (
    <div className="h-screen bg-[#F8FAFC] font-sans text-slate-800 flex flex-col overflow-hidden selection:bg-blue-100">
      
      {/* Top Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
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
                    step.state === 'active' ? 'text-white bg-blue-600 shadow-md shadow-blue-500/20' : 
                    'text-slate-300'}`
                }>
                  {step.state === 'completed' && <Check className="w-3.5 h-3.5 mr-1.5 stroke-[3]" />}
                  {step.state === 'active' && <div className="w-1.5 h-1.5 rounded-full bg-white mr-2" />}
                  <span className={`${step.state !== 'completed' && step.state !== 'active' ? 'mr-1.5' : ''}`}>
                    {step.id}.
                  </span>
                  {step.label}
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className={`w-4 h-4 mx-1 ${step.state === 'completed' ? 'text-emerald-300' : 'text-slate-200'}`} strokeWidth={2} />
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
      {/* Main Content Area */}
      <main className="flex-1 flex gap-4 p-4 min-h-0 overflow-hidden">
        
        {/* Left Pane - Code Editor */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden min-w-[500px]">
          
          {/* Editor Toolbar */}
          <div className="h-12 border-b border-slate-100 flex items-center justify-between px-3 bg-slate-50/50 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm">
                <FileCode2 className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-blue-700">LoginScreen.tsx</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-1"></div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm cursor-pointer hover:bg-slate-50">
                <Zap className="w-3.5 h-3.5 text-purple-500" />
                <span className="text-xs font-semibold text-slate-700">React Native (TSX)</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
                <Copy className="w-3.5 h-3.5" /> Copy Code
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
                <AlignLeft className="w-3.5 h-3.5" /> Format
              </button>
              <div className="w-px h-4 bg-slate-200 mx-1"></div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                <RefreshCw className="w-3.5 h-3.5" /> Regenerate
              </button>
            </div>
          </div>

          {}
          {/* Code Area */}
          <div className="flex-1 overflow-auto flex bg-white text-[13px] font-mono leading-relaxed p-4">
            {/* Line Numbers */}
            <div className="flex flex-col text-slate-300 select-none pr-4 text-right border-r border-slate-100 h-max">
              {[...Array(28)].map((_, i) => (
                <span key={i}>{String(i + 1).padStart(2, '0')}</span>
              ))}
            </div>
            {/* Syntax Highlighted Code */}
            <div className="pl-4 text-slate-600 whitespace-pre h-max">
              <div><span className="text-blue-600 font-semibold">import</span> React, {'{'} useState {'}'} <span className="text-blue-600 font-semibold">from</span> <span className="text-emerald-600">'react'</span>;</div>
              <div><span className="text-blue-600 font-semibold">import</span> {'{'} View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image {'}'} <span className="text-blue-600 font-semibold">from</span> <span className="text-emerald-600">'react-native'</span>;</div>
              <div><span className="text-blue-600 font-semibold">import</span> {'{'} Feather, MaterialCommunityIcons {'}'} <span className="text-blue-600 font-semibold">from</span> <span className="text-emerald-600">'@expo/vector-icons'</span>;</div>
              <br/>
              <div><span className="text-blue-600 font-semibold">export default function</span> <span className="text-indigo-600 font-semibold">LoginScreen</span>() {'{'}</div>
              <div>  <span className="text-blue-600 font-semibold">const</span> [email, setEmail] = <span className="text-indigo-500">useState</span>(<span className="text-emerald-600">'guest.paris@lumiere.fr'</span>);</div>
              <div>  <span className="text-blue-600 font-semibold">const</span> [password, setPassword] = <span className="text-indigo-500">useState</span>(<span className="text-emerald-600">''</span>);</div>
              <br/>
              <div>  <span className="text-blue-600 font-semibold">return</span> (</div>
              <div>    <span className="text-slate-400">&lt;</span><span className="text-indigo-600 font-semibold">SafeAreaView</span> <span className="text-sky-500">style</span>=<span className="text-slate-400">{'{'}</span>styles.<span className="text-slate-700">container</span><span className="text-slate-400">{'}'}&gt;</span></div>
              
              <div>      <span className="text-slate-400">&lt;</span><span className="text-indigo-600 font-semibold">View</span> <span className="text-sky-500">style</span>=<span className="text-slate-400">{'{'}</span>styles.<span className="text-slate-700">brandHeader</span><span className="text-slate-400">{'}'}&gt;</span></div>
              <div>        <span className="text-slate-400">&lt;</span><span className="text-indigo-600 font-semibold">Image</span> <span className="text-sky-500">source</span>=<span className="text-slate-400">{'{'}</span>require(<span className="text-emerald-600">'./assets/logo.png'</span>)<span className="text-slate-400">{'}'}</span> <span className="text-sky-500">style</span>=<span className="text-slate-400">{'{'}</span>styles.<span className="text-slate-700">logo</span><span className="text-slate-400">{'}'} /&gt;</span></div>
              <div>        <span className="text-slate-400">&lt;</span><span className="text-indigo-600 font-semibold">Text</span> <span className="text-sky-500">style</span>=<span className="text-slate-400">{'{'}</span>styles.<span className="text-slate-700">title</span><span className="text-slate-400">{'}'}&gt;</span>Bistrot Lumière<span className="text-slate-400">&lt;/</span><span className="text-indigo-600 font-semibold">Text</span><span className="text-slate-400">&gt;</span></div>
              <div>        <span className="text-slate-400">&lt;</span><span className="text-indigo-600 font-semibold">Text</span> <span className="text-sky-500">style</span>=<span className="text-slate-400">{'{'}</span>styles.<span className="text-slate-700">subtitle</span><span className="text-slate-400">{'}'}&gt;</span>Haute Cuisine • Paris 7e<span className="text-slate-400">&lt;/</span><span className="text-indigo-600 font-semibold">Text</span><span className="text-slate-400">&gt;</span></div>
              <div>      <span className="text-slate-400">&lt;/</span><span className="text-indigo-600 font-semibold">View</span><span className="text-slate-400">&gt;</span></div>
              <br/>
              <div>      <span className="text-slate-400">&lt;</span><span className="text-indigo-600 font-semibold">View</span> <span className="text-sky-500">style</span>=<span className="text-slate-400">{'{'}</span>styles.<span className="text-slate-700">formCard</span><span className="text-slate-400">{'}'}&gt;</span></div>
              <div>        <span className="text-slate-400">&lt;</span><span className="text-indigo-600 font-semibold">TextInput</span> </div>
              <div>          <span className="text-sky-500">value</span>=<span className="text-slate-400">{'{'}</span>email<span className="text-slate-400">{'}'}</span></div>
              <div>          <span className="text-sky-500">onChangeText</span>=<span className="text-slate-400">{'{'}</span>setEmail<span className="text-slate-400">{'}'}</span> </div>
              <div>          <span className="text-sky-500">style</span>=<span className="text-slate-400">{'{'}</span>styles.<span className="text-slate-700">input</span><span className="text-slate-400">{'}'}</span> </div>
              <div>        <span className="text-slate-400">/&gt;</span></div>
              <div>        <span className="text-slate-400">&lt;</span><span className="text-indigo-600 font-semibold">TextInput</span> </div>
              <div>          <span className="text-sky-500">secureTextEntry</span> </div>
              <div>          <span className="text-sky-500">placeholder</span>=<span className="text-emerald-600">"••••••••"</span> </div>
              <div>          <span className="text-sky-500">style</span>=<span className="text-slate-400">{'{'}</span>styles.<span className="text-slate-700">input</span><span className="text-slate-400">{'}'}</span></div>
              <div>        <span className="text-slate-400">/&gt;</span></div>
              <br/>
              <div>        <span className="text-slate-400">&lt;</span><span className="text-indigo-600 font-semibold">TouchableOpacity</span> <span className="text-sky-500">style</span>=<span className="text-slate-400">{'{'}</span>styles.<span className="text-slate-700">ctaButton</span><span className="text-slate-400">{'}'}&gt;</span></div>
              <div>          <span className="text-slate-400">&lt;</span><span className="text-indigo-600 font-semibold">Text</span> <span className="text-sky-500">style</span>=<span className="text-slate-400">{'{'}</span>styles.<span className="text-slate-700">ctaText</span><span className="text-slate-400">{'}'}&gt;</span>Sign In to Table<span className="text-slate-400">&lt;/</span><span className="text-indigo-600 font-semibold">Text</span><span className="text-slate-400">&gt;</span></div>
              <div>        <span className="text-slate-400">&lt;/</span><span className="text-indigo-600 font-semibold">TouchableOpacity</span><span className="text-slate-400">&gt;</span></div>
              <div>      <span className="text-slate-400">&lt;/</span><span className="text-indigo-600 font-semibold">View</span><span className="text-slate-400">&gt;</span></div>
              <div>    <span className="text-slate-400">&lt;/</span><span className="text-indigo-600 font-semibold">SafeAreaView</span><span className="text-slate-400">&gt;</span></div>
              <div>  );</div>
              <div>{'}'}</div>
            </div>
          </div>

          {/* Editor Footer */}
          <div className="h-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" /> TypeScript Checked
              </span>
              <span className="text-[10px] font-mono text-slate-400">UTF-8</span>
              <span className="text-[10px] font-mono text-slate-400">Tabs: 2</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Total Lines: 128 (Viewport Preview)</span>
          </div>
        </div>

        {}
        {/* Right Pane - Live Sandbox */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden min-w-[450px]">
          
          {/* Sandbox Toolbar */}
          <div className="h-12 border-b border-slate-100 flex items-center justify-between px-4 bg-slate-50/50 shrink-0">
            <div className="flex items-center gap-2">
              <MonitorSmartphone className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-800">Live Sandbox Preview</h2>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm">
                <MonitorSmartphone className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[11px] font-mono font-medium text-slate-600">iPhone 14 (390 × 844)</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm">
                <span className="text-[11px] font-mono font-medium text-slate-600 px-1">100%</span>
              </div>
              <button className="p-1.5 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 text-slate-600 transition-colors">
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Device Mockup Area */}
          <div className="flex-1 bg-[#F8FAFC] flex items-center justify-center p-8 overflow-y-auto relative">
            
            {/* Soft background glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="w-[300px] h-[600px] bg-blue-500/5 blur-[100px] rounded-full"></div>
            </div>

            {/* iPhone Frame */}
            <div className="w-[350px] h-[720px] bg-[#0A0F1C] rounded-[3.5rem] border-[12px] border-[#18181B] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col shrink-0 ring-1 ring-white/10">
              
              {/* Dynamic Island Notch */}
              <div className="absolute top-2 inset-x-0 mx-auto w-[110px] h-[30px] bg-black rounded-full z-20 flex items-center justify-between px-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] ring-1 ring-white/10"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a0a] ring-1 ring-white/5 relative overflow-hidden">
                   <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-[1px]"></div>
                </div>
              </div>

              {/* Status Bar */}
              <div className="flex items-center justify-between px-6 pt-3.5 pb-2 text-white z-10 text-[11px] font-semibold tracking-wide bg-gradient-to-b from-black/50 to-transparent">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5" />
                  <BatteryMedium className="w-4 h-4" />
                </div>
              </div>

              {}
              {/* App UI - Dark Mode Theme */}
              <div className="flex-1 flex flex-col px-6 pt-6 pb-8 overflow-y-auto custom-scrollbar">
                
                {/* Header Image & Titles */}
                <div className="flex flex-col items-center mt-2 mb-8 animate-fade-in-up">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden mb-4 ring-2 ring-white/10 shadow-xl shadow-black/50">
                    <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=150&q=80" alt="Restaurant Interior" className="w-full h-full object-cover" />
                  </div>
                  <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    🍽️ Bistrot Lumière
                  </h1>
                  <p className="text-[#94A3B8] text-[11px] mt-1 font-medium tracking-wide">
                    Haute Cuisine • Paris 7e Arrondissement
                  </p>
                  
                  <div className="mt-4 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Table Reservation & VIP Lounge</span>
                  </div>
                </div>

                {/* Main Form Content */}
                <div className="flex flex-col flex-1">
                  <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
                  <p className="text-[#94A3B8] text-xs mb-8">
                    Sign in to manage your bookings and sommelier menu
                  </p>

                  <div className="flex flex-col gap-5">
                    {/* Input Group 1 */}
                    <div>
                      <label className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider ml-1 mb-1.5 block">Reservation ID or Email</label>
                      <div className="bg-[#1E293B] border border-white/5 rounded-xl px-4 py-3.5 flex items-center gap-3 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all shadow-inner">
                        <Mail className="w-4 h-4 text-[#64748B]" />
                        <input 
                          type="text" 
                          value="guest.paris@lumiere.fr" 
                          readOnly
                          className="bg-transparent border-none outline-none text-sm text-white flex-1 font-medium"
                        />
                      </div>
                    </div>

                    {/* Input Group 2 */}
                    <div>
                      <div className="flex items-center justify-between ml-1 mb-1.5 block">
                         <label className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider">Concierge Passcode</label>
                         <span className="text-[10px] font-semibold text-cyan-400 cursor-pointer hover:text-cyan-300">Forgot?</span>
                      </div>
                      <div className="bg-[#1E293B] border border-white/5 rounded-xl px-4 py-3.5 flex items-center gap-3 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all shadow-inner">
                        <Lock className="w-4 h-4 text-[#64748B]" />
                        <input 
                          type="password" 
                          value="secretVIPpass" 
                          readOnly
                          className="bg-transparent border-none outline-none text-sm text-white flex-1 font-medium"
                        />
                        <EyeOff className="w-4 h-4 text-[#64748B] cursor-pointer hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Spacer to push buttons down */}
                  <div className="flex-1 min-h-[2rem]"></div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 mt-auto">
                    <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all">
                      Sign In to Table <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="w-full bg-[#1E293B] hover:bg-[#2A374E] text-white font-medium py-3.5 rounded-xl flex items-center justify-center gap-2 border border-white/5 transition-all">
                      <Fingerprint className="w-4 h-4 text-cyan-400" /> Use FaceID / Biometric
                    </button>
                  </div>
                  
                  <div className="text-center mt-6 mb-2">
                    <span className="text-[9px] text-[#475569] font-medium tracking-wide">
                      Protected by Michelin Luxe Concierge SDK
                    </span>
                  </div>
                  
                  {/* Home Indicator line */}
                  <div className="w-1/3 h-1 bg-white/20 rounded-full mx-auto mt-2"></div>
                  
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {}
      {/* Bottom Action Bar */}
      <footer className="h-20 bg-white border-t border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200">
          <ChevronLeft className="w-4 h-4" /> Back to Analysis
        </button>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors border border-purple-200">
            <Sparkles className="w-4 h-4" /> Refine with AI
          </button>
          
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm">
            <Download className="w-4 h-4" /> Download ZIP
          </button>
          
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20">
            Compare Designs <SplitSquareHorizontal className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* Extra CSS for custom scrollbar in the device mockup */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
}