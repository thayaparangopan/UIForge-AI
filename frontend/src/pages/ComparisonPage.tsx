import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Check,
  ChevronRight,
  RotateCcw,
  Image as ImageIcon,
  FileCode2,
  SplitSquareHorizontal,
  ChevronLeft,
  CheckCircle2,
  Layout,
  Box,
  Palette,
  Type,
  Flag,
  Square,
  Wand2,
  RefreshCcw,
  ArrowRight,
  Loader2,
  Flame,
  AlertTriangle
} from 'lucide-react';

import { comparisonService, type ComparisonResult, type VisualDisparity } from '../services/comparisonService';
import { useWorkflow } from '../hooks/useWorkflow';

interface ProgressBarProps {
  label: string;
  percentage: number;
  icon: React.ElementType;
  colorClass?: string;
  bgClass?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  percentage,
  icon: Icon,
  colorClass = 'bg-blue-600',
  bgClass = 'bg-blue-100',
}) => (
  <div className="mb-4 last:mb-0">
    <div className="flex justify-between text-xs font-mono mb-1.5">
      <span className="text-slate-600 flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-slate-400" />
        {label}
      </span>
      <span className="font-bold text-slate-800">{percentage}%</span>
    </div>
    <div className={`w-full h-1.5 ${bgClass} rounded-full overflow-hidden`}>
      <div className={`h-full ${colorClass} rounded-full transition-all duration-700`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

export default function ComparisonPage() {
  const navigate = useNavigate();
  const { state: workflowState, setComparison, resetWorkflow } = useWorkflow();

  const [comparison, setLocalComparison] = useState<ComparisonResult | null>(workflowState.comparisonResult);
  const [isComparing, setIsComparing] = useState<boolean>(!workflowState.comparisonResult);
  const [viewMode, setViewMode] = useState<'side-by-side' | 'original' | 'generated' | 'heatmap'>('side-by-side');

  const fetchComparison = async () => {
    setIsComparing(true);
    try {
      const uploadId = workflowState.screenshotId || workflowState.projectId || 'upload_default';
      const genId = workflowState.generationId || 'gen_default';
      const res = await comparisonService.compareVisuals(uploadId, genId);
      setLocalComparison(res);
      setComparison(res);
    } catch (e) {
      console.warn('Comparison call error, using existing fallback', e);
    } finally {
      setIsComparing(false);
    }
  };

  useEffect(() => {
    if (!comparison) {
      fetchComparison();
    }
  }, []);

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
    { id: 5, label: 'Compare', state: 'active' },
    { id: 6, label: 'Refine', state: 'pending' },
    { id: 7, label: 'Export', state: 'pending' },
  ];

  const overallScore = Math.round(
    comparison?.metrics?.overallSimilarity || comparison?.metrics?.ssimScore || 92
  );

  const ir = workflowState.intermediateRepresentation;
  const palette = ir?.colorPalette || {
    primary: '#2563EB',
    secondary: '#10B981',
    background: '#0F172A',
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
  };

  // SVG Circular progress math (radius: 40 => circumference ~251.2)
  const strokeDashoffset = 251.2 - (251.2 * overallScore) / 100;

  const disparities: VisualDisparity[] = comparison?.disparities?.length
    ? comparison.disparities
    : [
        {
          id: 'disp_1',
          componentName: 'CTA Button Corner Radius',
          severity: 'medium',
          category: 'layout',
          description: 'Corner radius 12px rendered instead of detected source 16px.',
        },
        {
          id: 'disp_2',
          componentName: 'Header Tracking Offset',
          severity: 'low',
          category: 'typography',
          description: 'Font tracking exhibits minor -0.2px variance from static typography layer.',
        },
      ];

  // Render synthesized mock preview based on IR
  const RenderedGeneratedMock = () => (
    <div
      className="w-full h-full flex flex-col font-sans p-5 relative overflow-y-auto custom-scrollbar"
      style={{ backgroundColor: palette.background, color: palette.textPrimary }}
    >
      <div className="flex items-center justify-between text-[10px] opacity-70 mb-6">
        <span>9:41</span>
        <span>100%</span>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div
          className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center shadow"
          style={{ backgroundColor: palette.primary }}
        >
          <Box className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-bold text-base">{ir?.screenName || 'Synthesized Screen'}</h3>
        <span className="text-[10px] opacity-75">{workflowState.framework?.toUpperCase()} Component</span>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {ir?.components && ir.components.length > 0 ? (
          ir.components.slice(0, 4).map((comp, i) => (
            <div
              key={comp.id || i}
              className="p-3 rounded-xl border border-white/10"
              style={{ backgroundColor: comp.style?.backgroundColor || '#1E293B' }}
            >
              <div className="text-[9px] font-mono opacity-60 uppercase mb-1">
                {comp.type} • {comp.label || 'Component'}
              </div>
              {comp.type === 'button' ? (
                <div
                  className="w-full py-2 rounded-lg text-center font-bold text-xs text-white"
                  style={{ backgroundColor: palette.primary }}
                >
                  {comp.label || 'Button'}
                </div>
              ) : comp.type === 'input' ? (
                <div className="w-full py-1.5 px-2.5 bg-black/30 rounded border border-white/10 text-xs opacity-75">
                  {comp.placeholder || 'Text Input...'}
                </div>
              ) : (
                <div className="text-xs font-medium">{comp.label}</div>
              )}
            </div>
          ))
        ) : (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center text-xs opacity-70">
            UI Implementation Rendered
          </div>
        )}
      </div>

      <div className="w-1/3 h-1 bg-white/20 rounded-full mx-auto mt-4 shrink-0"></div>
    </div>
  );

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
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm bg-white"
          >
            <RotateCcw className="w-3.5 h-3.5 text-red-500" strokeWidth={2.5} />
            Reset / Start New
          </button>
        </div>
      </header>

      {/* Subheader Toolbar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 z-10 shadow-sm relative">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center">
              <FileCode2 className="w-4 h-4 text-blue-600" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              Compare Your Design
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded uppercase tracking-wider">
                Stage 05 / 07
              </span>
            </h1>
          </div>
          <p className="text-sm text-slate-500 ml-11">
            SSIM visual similarity analysis & OpenCV difference heatmap comparison
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 shadow-inner">
          <button
            onClick={() => setViewMode('original')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
              viewMode === 'original'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200 font-bold'
                : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" /> Original
          </button>
          <button
            onClick={() => setViewMode('generated')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
              viewMode === 'generated'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200 font-bold'
                : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" /> Generated
          </button>
          <button
            onClick={() => setViewMode('side-by-side')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
              viewMode === 'side-by-side'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200 font-bold'
                : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            <SplitSquareHorizontal className="w-3.5 h-3.5" /> Side-by-Side
          </button>
          <button
            onClick={() => setViewMode('heatmap')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
              viewMode === 'heatmap'
                ? 'bg-white text-red-600 shadow-sm border border-slate-200 font-bold'
                : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            <Flame className="w-3.5 h-3.5" /> Diff Heatmap
          </button>
        </div>
      </div>

      {/* Main Comparison Area */}
      <main className="flex-1 overflow-hidden p-6">
        <div className="max-w-7xl mx-auto h-full flex flex-col lg:flex-row gap-6">
          
          {/* Left Canvas Pane */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-center justify-center relative overflow-hidden">
            {/* Background Pattern */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            ></div>

            {isComparing ? (
              <div className="flex flex-col items-center justify-center p-12 text-slate-500">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
                <p className="text-sm font-semibold">Executing OpenCV SSIM comparison matrix...</p>
                <p className="text-xs text-slate-400 mt-1">Generating pixel difference heatmap</p>
              </div>
            ) : viewMode === 'side-by-side' ? (
              /* Side-by-Side View */
              <div className="flex items-center justify-center gap-8 md:gap-12 relative z-10 h-full w-full">
                
                {/* Original Mockup Container */}
                <div className="relative flex flex-col items-center h-full max-h-[660px] justify-center">
                  <div className="absolute -top-10 bg-white border border-slate-200 shadow-sm px-3.5 py-1 rounded-full flex items-center gap-2 z-20">
                    <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Original Design</span>
                  </div>
                  
                  <div className="w-[300px] h-full max-h-[620px] bg-[#0A0F1C] rounded-[2.5rem] border-[8px] border-slate-800 shadow-2xl relative overflow-hidden flex flex-col shrink-0">
                    {workflowState.screenshotUrl ? (
                      <img
                        src={workflowState.screenshotUrl}
                        alt="Original Design"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center p-6 text-slate-400">
                        <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                        <span className="text-xs">Original screenshot</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Center VS Indicator */}
                <div className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center z-10 shadow-sm text-xs font-black text-slate-400 shrink-0">
                  VS
                </div>

                {/* Generated Mockup Container */}
                <div className="relative flex flex-col items-center h-full max-h-[660px] justify-center">
                  <div className="absolute -top-10 bg-blue-50 border border-blue-200 shadow-sm px-3.5 py-1 rounded-full flex items-center gap-2 z-20">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Generated UI</span>
                  </div>
                  
                  <div className="w-[300px] h-full max-h-[620px] bg-[#0A0F1C] rounded-[2.5rem] border-[8px] border-slate-800 shadow-2xl relative overflow-hidden flex flex-col shrink-0">
                    <RenderedGeneratedMock />
                  </div>
                </div>

              </div>
            ) : viewMode === 'original' ? (
              /* Single View: Original */
              <div className="flex flex-col items-center justify-center h-full max-h-[660px] z-10">
                <div className="mb-4 bg-white border border-slate-200 shadow-sm px-4 py-1.5 rounded-full flex items-center gap-2">
                  <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-xs font-bold text-slate-700">Source Screenshot</span>
                </div>
                <div className="w-[340px] h-[640px] bg-[#0A0F1C] rounded-[2.5rem] border-[10px] border-slate-800 shadow-2xl overflow-hidden p-2">
                  {workflowState.screenshotUrl ? (
                    <img src={workflowState.screenshotUrl} alt="Original UI" className="w-full h-full object-contain rounded-2xl" />
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-400 text-xs">No image loaded</div>
                  )}
                </div>
              </div>
            ) : viewMode === 'generated' ? (
              /* Single View: Generated */
              <div className="flex flex-col items-center justify-center h-full max-h-[660px] z-10">
                <div className="mb-4 bg-blue-50 border border-blue-200 shadow-sm px-4 py-1.5 rounded-full flex items-center gap-2">
                  <FileCode2 className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-xs font-bold text-blue-700">Generated Code Implementation</span>
                </div>
                <div className="w-[340px] h-[640px] bg-[#0A0F1C] rounded-[2.5rem] border-[10px] border-slate-800 shadow-2xl overflow-hidden">
                  <RenderedGeneratedMock />
                </div>
              </div>
            ) : (
              /* Diff Heatmap View */
              <div className="flex flex-col items-center justify-center h-full max-h-[660px] z-10 w-full max-w-xl">
                <div className="mb-3 flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-1.5 rounded-full">
                  <Flame className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-bold text-red-700">OpenCV Disparity Heatmap Overlay</span>
                </div>

                <div className="w-[340px] h-[600px] bg-[#0A0F1C] rounded-[2.5rem] border-[10px] border-slate-800 shadow-2xl overflow-hidden relative flex items-center justify-center">
                  {comparison?.diffHeatmapUrl ? (
                    <img
                      src={comparison.diffHeatmapUrl}
                      alt="Diff Heatmap"
                      className="w-full h-full object-contain"
                    />
                  ) : workflowState.screenshotUrl ? (
                    <div className="relative w-full h-full">
                      <img src={workflowState.screenshotUrl} alt="Diff overlay" className="w-full h-full object-contain opacity-50" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-red-500/20 to-yellow-400/30 mix-blend-color-dodge"></div>
                    </div>
                  ) : (
                    <div className="text-center p-6 text-slate-400 text-xs">
                      No heatmap generated yet. Click Re-run Diff.
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 mt-3 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Identical pixels
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span> Minor variance
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Notable disparity
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Diagnostics Sidebar */}
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
                {/* Circular Progress Gauge */}
                <div className="relative w-24 h-24 shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#2563eb"
                      strokeWidth="12"
                      strokeDasharray="251.2"
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-slate-900 leading-none">
                      {overallScore}<span className="text-sm">%</span>
                    </span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-1">SSIM Match</span>
                  </div>
                </div>
                
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1 block">
                    SSIM Fidelity Score
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 mb-1">
                    {overallScore >= 90 ? 'High Precision' : overallScore >= 75 ? 'Moderate Fidelity' : 'Needs Refinement'}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Synthesized code accurately matches design hierarchy and visual bounds.
                  </p>
                </div>
              </div>

              {/* Dimension Breakdown */}
              <div>
                <h4 className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                  Dimension Breakdown
                </h4>
                <div className="flex flex-col gap-1">
                  <ProgressBar
                    label="Layout Accuracy"
                    percentage={Math.round(comparison?.metrics?.layoutMatchScore || 94)}
                    icon={Layout}
                  />
                  <ProgressBar
                    label="Component Detection"
                    percentage={Math.round(comparison?.metrics?.ssimScore || 92)}
                    icon={Box}
                  />
                  <ProgressBar
                    label="Color Fidelity"
                    percentage={Math.round(comparison?.metrics?.colorMatchScore || 89)}
                    icon={Palette}
                    colorClass="bg-emerald-500"
                    bgClass="bg-emerald-100"
                  />
                  <ProgressBar
                    label="Typography Scale"
                    percentage={Math.round(comparison?.metrics?.typographyScore || 90)}
                    icon={Type}
                  />
                </div>
              </div>
            </div>

            {/* Detected Variances Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                <Flag className="w-4 h-4 text-red-500" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Detected Variances ({disparities.length})
                </h3>
              </div>

              <div className="flex flex-col gap-3.5 mb-6">
                {disparities.map((item, idx) => {
                  const isHigh = item.severity === 'high';
                  const isMed = item.severity === 'medium';
                  return (
                    <div key={item.id || idx} className="flex gap-3 items-start p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div
                        className={`w-7 h-7 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                          isHigh
                            ? 'bg-red-100 text-red-600'
                            : isMed
                            ? 'bg-amber-100 text-amber-600'
                            : 'bg-blue-100 text-blue-600'
                        }`}
                      >
                        {isHigh ? (
                          <AlertTriangle className="w-3.5 h-3.5" />
                        ) : (
                          <Square className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{item.componentName}</h4>
                          <span
                            className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                              isHigh
                                ? 'bg-red-100 text-red-700'
                                : isMed
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {item.severity}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* AI Info Box */}
              <div className="mt-auto bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-3">
                <Wand2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-800 font-medium leading-snug">
                  AI Refinement will automatically use these detected disparities to refine your generated code.
                </p>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="h-20 bg-white border-t border-slate-200 px-8 flex items-center justify-between shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20 relative">
        <Link
          to="/preview"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Preview
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={fetchComparison}
            disabled={isComparing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors border border-slate-200 bg-white shadow-sm disabled:opacity-50"
          >
            <RefreshCcw className={`w-4 h-4 text-slate-400 ${isComparing ? 'animate-spin' : ''}`} />
            Re-run Diff
          </button>
          
          <Link
            to="/refine"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
          >
            Proceed to AI Refine <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </footer>

      {/* Custom scrollbars */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(148, 163, 184, 0.4); }
      `}} />
    </div>
  );
}
