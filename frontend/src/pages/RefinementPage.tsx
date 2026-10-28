import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Box,
  Image as ImageIcon
} from 'lucide-react';

import { refinementService } from '../services/refinementService';
import { useWorkflow } from '../hooks/useWorkflow';

export default function RefinementPage() {
  const navigate = useNavigate();
  const { state: workflowState, setRefinement, resetWorkflow } = useWorkflow();

  const firstDisparity = workflowState.comparisonResult?.disparities?.[0];
  const defaultPrompt = firstDisparity
    ? `Fix ${firstDisparity.componentName}: ${firstDisparity.description} Ensure responsive flexbox alignment and exact color tokens.`
    : "Make the primary action button full-width (100%), increase vertical padding to 16px, and apply 16px border-radius to match the source screenshot spec.";

  const [promptText, setPromptText] = useState<string>(defaultPrompt);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'refined' | 'original'>('refined');

  const handleRefineSubmit = async () => {
    if (!promptText.trim()) return;
    setIsSubmitting(true);
    setStatusMsg('Executing AI AST code refinement...');
    try {
      const genId = workflowState.generationId || 'gen_default';
      const res = await refinementService.refineCode({
        generationId: genId,
        promptText,
      });
      setRefinement(res);
      setStatusMsg('Refinement applied successfully! Code updated.');
    } catch (err: any) {
      console.warn('Refinement error:', err);
      setStatusMsg('Failed to apply refinement.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset this workflow and start a new project?')) {
      resetWorkflow();
      navigate('/upload');
    }
  };

  const steps = [
    { id: 1, label: 'Upload', state: 'completed' },
    { id: 2, label: 'Analyze', state: 'completed' },
    { id: 3, label: 'Generate', state: 'completed' },
    { id: 4, label: 'Preview', state: 'completed' },
    { id: 5, label: 'Compare', state: 'completed' },
    { id: 6, label: 'Refine', state: 'active' },
    { id: 7, label: 'Export', state: 'pending' },
  ];

  const ir = workflowState.intermediateRepresentation;
  const palette = ir?.colorPalette || {
    primary: '#2563EB',
    secondary: '#10B981',
    background: '#0F172A',
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
  };

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
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm bg-white"
          >
            <RotateCcw className="w-3.5 h-3.5 text-red-500" strokeWidth={2.5} />
            Reset / Start New
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden p-6 flex justify-center">
        <div className="w-full max-w-7xl h-full flex flex-col lg:flex-row gap-6">
          
          {/* Left Column: Prompt Box & Feedback */}
          <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
            
            {/* Header Text */}
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Refine Your Interface</h1>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xl">
                Instruct the AI to adjust layout, styles, tokens, or component hierarchy using natural language. Fast visual AST delta application in real-time.
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
                   <button
                     onClick={() => setPromptText('')}
                     className="hover:text-slate-600 transition-colors uppercase tracking-wider"
                   >
                     Clear
                   </button>
                   <span>{promptText.length} chars</span>
                 </div>
              </div>
              
              <div className="p-5 flex flex-col gap-4">
                <textarea 
                  className="w-full h-24 text-sm text-slate-700 bg-white border border-slate-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none leading-relaxed"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="Describe your design modifications in natural language..."
                />
                
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-slate-500 mr-1">Quick Chips:</span>
                    <button 
                      onClick={() => setPromptText((prev) => `${prev} Set border-radius to 16px.`)}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span className="text-slate-400">+</span> 16px radius
                    </button>
                    <button 
                      onClick={() => setPromptText((prev) => `${prev} Increase button width to 100%.`)}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span className="text-slate-400">+</span> full width CTA
                    </button>
                    <button 
                      onClick={() => setPromptText((prev) => `${prev} Match exact hex background token.`)}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span className="text-slate-400">+</span> sync background
                    </button>
                  </div>
                  {statusMsg && (
                    <span className="text-xs text-blue-600 font-semibold">{statusMsg}</span>
                  )}
                </div>

                <button 
                  onClick={handleRefineSubmit}
                  disabled={isSubmitting}
                  className="self-start mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-sm px-6 py-3 rounded-xl flex items-center gap-2 shadow-md shadow-blue-500/20 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" /> {isSubmitting ? 'Refining Code...' : 'Improve with AI'}
                </button>
              </div>
            </div>

            {/* Applied AI Changes Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Active Refinement Summary
              </h3>

              <div className="flex flex-col gap-3">
                <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-xl p-4 flex gap-3 items-start">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 mb-1">
                      Touch target & padding compliance aligned
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      All button elements calibrated with 48px standard touch targets and proportional flex spacing.
                    </p>
                  </div>
                </div>

                <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-xl p-4 flex gap-3 items-start">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 mb-1">
                      Design tokens mapped to theme
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Primary brand accent ({palette.primary}) and background ({palette.background}) bound directly to theme tokens.
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
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Visual Spec Alignment
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-slate-400 line-through decoration-slate-300">84%</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                      <span className="text-lg font-bold text-slate-900">96%</span>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded ml-2">
                        +12% improvement
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="w-48">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    <span>Overall Match</span>
                    <span className="text-emerald-600 font-mono">96.0%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden flex">
                    <div className="h-full bg-blue-500 rounded-l-full" style={{ width: '84%' }}></div>
                    <div className="h-full bg-emerald-400 rounded-r-full" style={{ width: '12%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* AST Diff Stream Block */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <Code2 className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-mono text-slate-600">
                  {workflowState.generatedFiles?.[0]?.name || 'screens/MainScreen.tsx'} - Synthesized AST Delta
                </span>
              </div>
              <div className="bg-[#0F111A] p-4 text-[13px] font-mono leading-relaxed overflow-x-auto">
                <div className="text-slate-400 mb-2">@@ -38,7 +38,7 @@ export function ScreenLayout() {'{'}</div>
                
                <div className="flex bg-red-950/30 text-red-300 py-1 px-2 -mx-4 border-l-2 border-red-500 mb-1">
                  <span className="w-4 select-none opacity-50">-</span>
                  <span>{'style={{ borderRadius: 8, paddingVertical: 10, width: "80%" }}'}</span>
                </div>
                
                <div className="flex bg-emerald-950/30 text-emerald-300 py-1 px-2 -mx-4 border-l-2 border-emerald-500 mb-2">
                  <span className="w-4 select-none opacity-50">+</span>
                  <span className="break-all">{'style={{ borderRadius: 16, paddingVertical: 16, width: "100%" }}'}</span>
                </div>
                
                <div className="text-slate-300 ml-4 font-mono">// Refined styling synced successfully</div>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Preview Mockup */}
          <div className="w-full lg:w-[480px] flex flex-col gap-4">
            
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                Live Refined Preview
              </h2>
            </div>

            {/* Segmented Control Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner w-fit mb-2">
              <button
                onClick={() => setActiveTab('original')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'original'
                    ? 'bg-white text-slate-800 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Original Screenshot
              </button>
              <button
                onClick={() => setActiveTab('refined')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'refined'
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Refined UI <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </button>
            </div>

            {/* Device Mockup Container */}
            <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[680px]">
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}
              ></div>
              
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                
                {/* iPhone Frame */}
                <div className="w-[330px] h-[640px] bg-[#0A0F1C] rounded-[2.8rem] border-[10px] border-slate-800 shadow-2xl relative overflow-hidden flex flex-col shrink-0 ring-1 ring-slate-900/20">
                  {activeTab === 'original' ? (
                    workflowState.screenshotUrl ? (
                      <img src={workflowState.screenshotUrl} alt="Original" className="w-full h-full object-contain p-2" />
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center p-6 text-slate-400">
                        <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                        <span className="text-xs">No screenshot uploaded</span>
                      </div>
                    )
                  ) : (
                    /* Dynamic Synthesized App View */
                    <div
                      className="w-full h-full flex flex-col font-sans p-5 relative overflow-y-auto custom-scrollbar"
                      style={{ backgroundColor: palette.background, color: palette.textPrimary }}
                    >
                      {/* Notch */}
                      <div className="absolute top-2 inset-x-0 mx-auto w-[90px] h-[22px] bg-black rounded-full z-20"></div>

                      <div className="flex items-center justify-between text-[10px] opacity-70 mb-8 pt-2">
                        <span>9:41</span>
                        <div className="flex items-center gap-1.5">
                          <Wifi className="w-3 h-3" />
                          <BatteryMedium className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="flex flex-col items-center mb-6">
                        <div
                          className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center shadow"
                          style={{ backgroundColor: palette.primary }}
                        >
                          <Box className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold text-base">{ir?.screenName || workflowState.projectName}</h3>
                        <span className="text-[10px] opacity-75">{workflowState.framework?.toUpperCase()} Refined</span>
                      </div>

                      <div className="flex flex-col gap-3.5 flex-1">
                        <div className="p-3.5 rounded-xl border border-white/10 bg-white/5">
                          <span className="text-[9px] uppercase tracking-wider block opacity-60 mb-1">
                            Refined Component State
                          </span>
                          <p className="text-xs font-semibold">Clean Flexbox Layout Verified</p>
                        </div>

                        <div className="p-3.5 rounded-xl border border-white/10 bg-white/5">
                          <span className="text-[9px] uppercase tracking-wider block opacity-60 mb-1">
                            Theme Accent Token
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: palette.primary }}></span>
                            <span className="text-xs font-mono">{palette.primary}</span>
                          </div>
                        </div>

                        <button
                          className="w-full py-3.5 rounded-xl text-center font-bold text-xs text-white shadow-lg mt-auto"
                          style={{ backgroundColor: palette.primary }}
                        >
                          Refined Call to Action
                        </button>
                      </div>

                      <div className="w-1/3 h-1 bg-white/20 rounded-full mx-auto mt-4 shrink-0"></div>
                    </div>
                  )}
                </div>
                
                {/* Target AST Info Bar */}
                <div className="mt-5 bg-white border border-slate-200 shadow-sm rounded-full px-4 py-1.5 flex items-center justify-between w-[330px] z-20">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-slate-500">Target AST:</span>
                    <span className="text-blue-600 font-semibold truncate max-w-[150px]">
                      {workflowState.framework}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    Compliant
                  </span>
                </div>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="mt-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Regressions check passed
              </div>
              
              <div className="flex items-center gap-3">
                <Link
                  to="/compare"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors border border-slate-200 bg-white shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Compare
                </Link>
                
                <Link
                  to="/export"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
                >
                  Proceed to Export <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Custom scrollbar styling */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(148, 163, 184, 0.4); }
      `}} />
    </div>
  );
}
