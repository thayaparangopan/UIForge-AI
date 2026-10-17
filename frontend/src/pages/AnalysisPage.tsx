import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
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
  CircleDot,
  Loader2,
  AlertCircle,
  Sparkles,
  Zap,
  Clock,
  Layers3,
} from 'lucide-react';
import { analysisService, type AnalysisResult, type UIComponentIR } from '../services/analysisService';
import { uploadService } from '../services/uploadService';

interface BoundingBoxProps {
  top: string;
  left: string;
  width: string;
  height: string;
  label: string;
  color: 'blue' | 'purple' | 'emerald' | 'cyan' | string;
  labelPos?: 'top' | 'bottom';
}

const BoundingBox: React.FC<BoundingBoxProps> = ({
  top,
  left,
  width,
  height,
  label,
  color,
  labelPos = 'top',
}) => {
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
        className={`absolute px-1.5 py-0.5 text-[8px] font-mono font-bold tracking-wider rounded ${theme.labelBg} ${theme.text} whitespace-nowrap shadow-sm`}
        style={{
          top: labelPos === 'top' ? '-12px' : 'auto',
          bottom: labelPos === 'bottom' ? '-12px' : 'auto',
          left: '-2px',
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default function AIAnalysisPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const projectId = searchParams.get('projectId') || '';
  const screenshotId = searchParams.get('screenshotId') || '';

  const [screenshotUrl, setScreenshotUrl] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const steps = [
    { id: 1, label: 'Upload', state: 'completed' },
    { id: 2, label: 'Analyze', state: 'active' },
    { id: 3, label: 'Generate', state: 'pending' },
    { id: 4, label: 'Preview', state: 'pending' },
    { id: 5, label: 'Compare', state: 'pending' },
    { id: 6, label: 'Refine', state: 'pending' },
    { id: 7, label: 'Export', state: 'pending' },
  ];

  // Perform Analysis and Load Screenshot on Mount
  useEffect(() => {
    let isMounted = true;

    async function loadDataAndAnalyze() {
      if (!projectId) {
        setIsLoading(false);
        setErrorMessage('No project ID found in query parameters. Please upload a screenshot first.');
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);

      try {
        // 1. Fetch screenshot metadata to get image URL
        try {
          const screenshot = await uploadService.getLatestScreenshot(projectId);
          if (isMounted && screenshot?.url) {
            setScreenshotUrl(screenshot.url);
          }
        } catch (err) {
          console.warn('Could not load latest screenshot metadata:', err);
        }

        // 2. Perform or fetch AI analysis
        const result = await analysisService.analyzeScreenshot(projectId, screenshotId || undefined);
        if (isMounted) {
          setAnalysisResult(result);
        }
      } catch (err: any) {
        if (isMounted) {
          setErrorMessage(err.message || 'Failed to analyze UI screenshot with Gemini AI.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDataAndAnalyze();

    return () => {
      isMounted = false;
    };
  }, [projectId, screenshotId]);

  const components: UIComponentIR[] = analysisResult?.intermediateRepresentation?.components || [];
  const colorPalette = analysisResult?.intermediateRepresentation?.colorPalette || {
    primary: '#0284C7',
    secondary: '#10B981',
    background: '#0F172A',
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
  };
  const dimensions = analysisResult?.intermediateRepresentation?.dimensions || { width: 800, height: 1200 };
  const layoutType = analysisResult?.intermediateRepresentation?.layoutType || 'flex-column';
  const typography = analysisResult?.intermediateRepresentation?.typography || { fontFamily: 'Inter', baseFontSize: 16 };

  // Color mapping helper for component badges
  const getComponentColor = (type: string): 'blue' | 'purple' | 'emerald' | 'cyan' => {
    switch (type.toLowerCase()) {
      case 'button':
        return 'blue';
      case 'input':
        return 'emerald';
      case 'image':
      case 'logo':
        return 'purple';
      case 'navbar':
      case 'header':
        return 'cyan';
      default:
        return 'blue';
    }
  };

  const getDotClass = (type: string): string => {
    switch (type.toLowerCase()) {
      case 'button':
        return 'bg-blue-500';
      case 'input':
        return 'bg-emerald-500';
      case 'image':
      case 'logo':
        return 'bg-purple-500';
      case 'navbar':
        return 'bg-cyan-500';
      default:
        return 'bg-slate-400';
    }
  };

  const colorItems = [
    { label: 'Primary Brand', hex: colorPalette.primary },
    { label: 'Secondary Accent', hex: colorPalette.secondary },
    { label: 'Background', hex: colorPalette.background },
    { label: 'Primary Text', hex: colorPalette.textPrimary },
    { label: 'Secondary Text', hex: colorPalette.textSecondary },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col text-slate-800 selection:bg-blue-100">
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img src="/logo.png" alt="UIForge AI Logo" className="h-10 md:h-11 w-auto object-contain transition-transform duration-200 hover:scale-105" />
        </Link>

        {/* Stepper */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex items-center bg-white border border-slate-200 rounded-full px-2 py-1 shadow-sm">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div
                  className={`flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-colors
                  ${
                    step.state === 'completed'
                      ? 'text-green-600 bg-green-50'
                      : step.state === 'active'
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-400'
                  }`}
                >
                  {step.state === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 mr-1" />}
                  {step.state === 'active' && <CircleDot className="w-3.5 h-3.5 mr-1 animate-pulse" />}
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

        {/* Reset / Start New */}
        <div className="w-48 flex justify-end">
          <button
            onClick={() => navigate(projectId ? `/upload?projectId=${projectId}` : '/create-project')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200 shadow-sm bg-slate-50 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-red-500" strokeWidth={2.5} />
            Re-Upload / Reset
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* Error Notification */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl flex items-center justify-between text-sm shadow-sm">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            {projectId && (
              <button
                onClick={() => window.location.reload()}
                className="text-xs font-bold bg-white text-red-600 px-3 py-1 rounded-lg border border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
              >
                Retry
              </button>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Screenshot & Bounding Boxes Preview */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Focus className="w-5 h-5 text-blue-500" />
                  <h2 className="text-base font-bold text-slate-900">Visual Localization & Bounding Boxes</h2>
                </div>
                {isLoading && (
                  <span className="text-[11px] font-mono bg-blue-50 text-blue-600 border border-blue-200 px-2.5 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
                    <Loader2 className="w-3 h-3 animate-spin" /> Gemini Analyzing...
                  </span>
                )}
              </div>

              {/* Preview Device Frame */}
              <div className="flex justify-center bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-800 relative overflow-hidden min-h-[480px]">
                {/* Scanning Light Beam (Active when loading) */}
                {isLoading && (
                  <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-bounce" />
                    <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-[1px] flex items-center justify-center flex-col gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-cyan-500/40 flex items-center justify-center shadow-xl">
                        <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
                      </div>
                      <span className="text-white text-xs font-mono font-bold tracking-wide">
                        Gemini Vision Ingesting UI Elements...
                      </span>
                    </div>
                  </div>
                )}

                {/* Screenshot Image Container */}
                <div className="relative max-w-[340px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-950 flex flex-col items-center justify-center">
                  {screenshotUrl ? (
                    <img
                      src={screenshotUrl}
                      alt="Uploaded UI Design"
                      className="w-full h-auto object-contain block select-none pointer-events-none"
                    />
                  ) : (
                    <div className="w-full h-[520px] flex flex-col items-center justify-center text-slate-500 text-xs gap-3 p-6 text-center">
                      <Layout className="w-10 h-10 text-slate-600 animate-pulse" />
                      <span>Screenshot preview awaiting server response...</span>
                    </div>
                  )}

                  {/* Dynamic Bounding Boxes Overlay */}
                  {!isLoading &&
                    components.map((comp, idx) => {
                      const box = comp.bounding_box || {
                        x: 8,
                        y: 8 + idx * 12,
                        width: 84,
                        height: 8,
                      };
                      return (
                        <BoundingBox
                          key={comp.id || idx}
                          top={`${box.y}%`}
                          left={`${box.x}%`}
                          width={`${box.width}%`}
                          height={`${box.height}%`}
                          label={`#${comp.label || comp.type}`}
                          color={getComponentColor(comp.type)}
                          labelPos={box.y < 15 ? 'bottom' : 'top'}
                        />
                      );
                    })}
                </div>
              </div>

              {/* Status footer pill */}
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-mono">
                  <Layers3 className="w-3.5 h-3.5 text-blue-500" />
                  {components.length} components localized
                </span>
                <span className="font-mono text-[11px] text-slate-400">
                  {dimensions.width}x{dimensions.height} px
                </span>
              </div>
            </div>

            {/* Quick Engine Telemetry */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-slate-50 rounded-xl">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Confidence</div>
                <div className="font-bold text-sm text-emerald-600 mt-0.5">
                  {analysisResult ? `${analysisResult.confidenceScore.toFixed(1)}%` : '--'}
                </div>
              </div>
              <div className="p-2 bg-slate-50 rounded-xl">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Components</div>
                <div className="font-bold text-sm text-blue-600 mt-0.5">
                  {analysisResult ? analysisResult.detectedComponentCount : '--'}
                </div>
              </div>
              <div className="p-2 bg-slate-50 rounded-xl">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Latency</div>
                <div className="font-bold text-sm text-purple-600 mt-0.5">
                  {analysisResult ? `${analysisResult.processingTimeMs}ms` : '--'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: AI Analysis Engine Telemetry & Structure */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Engine Status Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <div className="bg-blue-50 p-2.5 rounded-2xl border border-blue-100 text-blue-600">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Gemini Vision AI Pipeline</h3>
                    <p className="text-xs text-slate-400">Multi-modal visual reasoning & design-to-code parser</p>
                  </div>
                </div>
                <Link
                  to={`/generate?projectId=${projectId}&analysisId=${analysisResult?.analysisId || ''}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all active:scale-95 text-xs sm:text-sm cursor-pointer"
                >
                  <Code className="w-4 h-4" />
                  Generate React Code <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Status badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Layout Model</span>
                    <span className="font-bold text-slate-700 capitalize">{layoutType}</span>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Screen Title</span>
                    <span className="font-bold text-slate-700 truncate max-w-[100px] block">
                      {analysisResult?.intermediateRepresentation?.screenName || 'MainScreen'}
                    </span>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-500 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Base Font</span>
                    <span className="font-bold text-slate-700">{typography.fontFamily}</span>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-blue-500 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Brand Tint</span>
                    <span className="font-bold text-slate-700 uppercase">{colorPalette.primary}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Structured Component Hierarchy Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-slate-500" />
                  <h3 className="font-bold text-slate-900 text-xs tracking-wider uppercase font-mono">
                    STRUCTURED COMPONENT HIERARCHY ({components.length})
                  </h3>
                </div>
                <span className="text-[11px] text-blue-600 font-mono bg-blue-50 px-2.5 py-0.5 rounded-full font-semibold">
                  AST Ready
                </span>
              </div>

              {isLoading ? (
                <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  <span className="text-xs font-mono">Extracting DOM tree and bounding coordinates...</span>
                </div>
              ) : components.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs font-mono">
                  No components detected. Click Retry above to re-analyze.
                </div>
              ) : (
                <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
                  {components.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100 group"
                    >
                      <div className="flex items-center gap-3.5 w-1/2">
                        <div className={`w-2.5 h-2.5 rounded-full ${getDotClass(item.type)} shadow-sm shrink-0`} />
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5">
                          <span className="font-bold text-xs sm:text-sm text-slate-800">
                            {item.label || item.placeholder || item.type}
                          </span>
                          <span className="bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider">
                            #{item.id}
                          </span>
                        </div>
                      </div>

                      <div className="hidden md:block text-[11px] text-slate-400 w-1/3 truncate font-mono">
                        {item.bounding_box
                          ? `x:${item.bounding_box.x.toFixed(0)}% y:${item.bounding_box.y.toFixed(0)}% w:${item.bounding_box.width.toFixed(0)}%`
                          : 'Inherited layout'}
                      </div>

                      <div className="flex justify-end w-auto md:w-1/6">
                        <span className="bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded-md text-[10px] font-mono whitespace-nowrap capitalize">
                          {item.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Layout Breakdown & Color Tokens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Layout Structure */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
                    <Layout className="w-4 h-4 text-blue-500" />
                    <h3 className="font-bold text-slate-900 text-xs tracking-wider uppercase font-mono">
                      LAYOUT BREAKDOWN
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-mono">Flow Model:</span>
                      <span className="font-bold text-blue-600 capitalize">{layoutType}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-mono">Detected Resolution:</span>
                      <span className="font-bold text-slate-700">{dimensions.width} x {dimensions.height}px</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-mono">Primary Typography:</span>
                      <span className="font-bold text-purple-600">{typography.fontFamily} ({typography.baseFontSize}px)</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-mono">Component Density:</span>
                      <span className="font-bold text-emerald-600">{components.length} UI Nodes</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    Responsive Box Model Confirmed
                  </span>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded font-mono">
                    Tailwind Ready
                  </span>
                </div>
              </div>

              {/* Extracted Color Palette */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
                    <Palette className="w-4 h-4 text-purple-500" />
                    <h3 className="font-bold text-slate-900 text-xs tracking-wider uppercase font-mono">
                      EXTRACTED COLOR PALETTE
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    {colorItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-5 h-5 rounded-md shadow-sm border border-slate-200"
                            style={{ backgroundColor: item.hex }}
                          />
                          <span className="text-slate-500 text-[11px]">{item.label}</span>
                        </div>
                        <span className="font-mono font-bold text-slate-800 text-[11px] uppercase">
                          {item.hex}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">Normalized WCAG Hex</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Auto-Mapped
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="flex justify-end pt-4 border-t border-slate-200/80">
          <Link
            to={`/generate?projectId=${projectId}&analysisId=${analysisResult?.analysisId || ''}`}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95 text-sm cursor-pointer"
          >
            <Code className="w-5 h-5" />
            Proceed to Code Generation <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>
    </div>
  );
}