import React, { useState, useEffect, useRef, useTransition } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
  ArrowRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { uploadService, type UploadResult } from '../services/uploadService';
import { createProject } from '../services/projectApi';

export default function UploadAndConfigure() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [, startTransition] = useTransition();

  const [projectId, setProjectId] = useState<string | null>(
    () => searchParams.get('projectId') || localStorage.getItem('activeProjectId')
  );

  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedScreenshot, setUploadedScreenshot] = useState<UploadResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { id: 1, label: 'Upload', active: true },
    { id: 2, label: 'Analyze', active: false },
    { id: 3, label: 'Generate', active: false },
    { id: 4, label: 'Preview', active: false },
    { id: 5, label: 'Compare', active: false },
    { id: 6, label: 'Refine', active: false },
    { id: 7, label: 'Export', active: false },
  ];

  // Attempt to restore existing screenshot if project is known
  useEffect(() => {
    let active = true;
    if (projectId) {
      uploadService
        .getLatestScreenshot(projectId)
        .then((screenshot) => {
          if (active && screenshot) {
            setUploadedScreenshot(screenshot);
            setPreviewUrl(screenshot.url);
          }
        })
        .catch(() => {
          // No screenshot uploaded yet for this project, ignore
        });
    }
    return () => {
      active = false;
    };
  }, [projectId]);

  // Handle clipboard paste (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      const items = e.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            handleFileUpload(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, [projectId]);

  const handleFileUpload = async (file: File) => {
    setErrorMessage(null);

    const validation = uploadService.validateFile(file);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Invalid file');
      return;
    }

    // Instant local preview
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setIsUploading(true);

    try {
      let activeId = projectId;
      // If user landed on /upload directly without creating a project, auto-create one
      if (!activeId) {
        const newProj = await createProject({
          title: file.name.replace(/\.[^/.]+$/, ''),
          project_name: file.name.replace(/\.[^/.]+$/, ''),
          framework: 'react-native'
        });
        activeId = newProj.id;
        setProjectId(activeId);
        startTransition(() => {
          setSearchParams({ projectId: newProj.id }, { replace: true });
        });
      }

      if (!activeId) {
        throw new Error('Failed to obtain a valid project ID.');
      }

      localStorage.setItem('activeProjectId', activeId);

      const result = await uploadService.uploadScreenshot(file, activeId);
      setUploadedScreenshot(result);
      setPreviewUrl(result.url);
    } catch (err: unknown) {
      console.error('Upload failed:', err);
      const message = err instanceof Error ? err.message : 'Upload failed. Please try again.';
      setErrorMessage(message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleReset = () => {
    localStorage.removeItem('activeProjectId');
    navigate('/create');
  };

  const calculateAspectRatio = () => {
    if (!uploadedScreenshot?.width || !uploadedScreenshot?.height) return '9:16 (Portrait)';
    const ratio = uploadedScreenshot.width / uploadedScreenshot.height;
    if (ratio < 0.8) return '9:16 (Portrait)';
    if (ratio > 1.2) return '16:9 (Landscape)';
    return '1:1 (Square)';
  };

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
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200 shadow-sm bg-slate-50 cursor-pointer"
          >
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
            <p className="text-slate-500 text-sm mb-6">
              Feed high-fidelity raster mocks or screenshot captures to begin semantic AST synthesis.
            </p>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <span className="flex-1">{errorMessage}</span>
              </div>
            )}

            {/* Hidden Input File */}
            <input 
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleInputChange}
              className="hidden"
            />

            {/* Dropzone */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center transition-all cursor-pointer group min-h-[400px] ${
                isDragOver 
                  ? 'border-blue-500 bg-blue-50/60 scale-[1.01]' 
                  : 'border-slate-300 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-400'
              }`}
            >
              
              <div className="relative mb-6">
                <div className={`p-4 rounded-full shadow-sm border border-slate-200 group-hover:scale-105 transition-transform ${isUploading ? 'bg-blue-50' : 'bg-white'}`}>
                  {isUploading ? (
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                  ) : (
                    <CloudUpload className="w-10 h-10 text-blue-500" />
                  )}
                </div>
                {!isUploading && (
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1 border-2 border-white">
                    <Zap className="w-3 h-3 fill-current" />
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {isUploading ? 'Uploading & Processing Screenshot...' : 'Drag & Drop Screenshot here'}
              </h3>
              <p className="text-slate-500 text-sm mb-6 max-w-sm">
                Paste directly via <kbd className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-xs font-mono shadow-sm">Ctrl+V</kbd> or select an asset from your local filesystem
              </p>

              <button 
                type="button"
                disabled={isUploading}
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold py-2.5 px-6 rounded-xl flex items-center gap-2 mb-8 shadow-sm transition-all cursor-pointer"
              >
                <FileImage className="w-4 h-4 text-slate-500" />
                {uploadedScreenshot ? 'Choose Different Image' : 'Choose Image'}
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

          {/* Right Column: File State & Live Preview */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col">
            
            {/* Header info */}
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl border ${uploadedScreenshot ? 'bg-green-50 border-green-100' : 'bg-slate-100 border-slate-200'}`}>
                  {uploadedScreenshot ? (
                    <Check className="w-5 h-5 text-green-600 stroke-[3]" />
                  ) : (
                    <Smartphone className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base font-mono truncate max-w-[280px]">
                    {uploadedScreenshot?.file_name || 'No screenshot uploaded'}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">
                    {uploadedScreenshot ? 'Staged • Stored in Database' : 'Awaiting Design Ingestion'}
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide border ${
                uploadedScreenshot 
                  ? 'bg-green-50 border-green-200 text-green-700' 
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                {uploadedScreenshot ? 'Validated' : 'Pending'}
              </div>
            </div>

            {/* Image Preview Area */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 mb-8 flex justify-center items-center relative overflow-hidden min-h-[460px]">
              {previewUrl ? (
                /* Real Uploaded Image inside phone mockup frame */
                <div className="w-[300px] max-h-[580px] bg-slate-900 rounded-[2.5rem] border-[6px] border-black p-3 relative shadow-2xl overflow-hidden flex flex-col items-center">
                  
                  {/* Status Bar */}
                  <div className="w-full flex justify-between items-center text-[10px] text-white/80 font-medium mb-3 px-2">
                    <span>9:41</span>
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 bg-white/80 rounded-sm"></div>
                      <div className="w-2.5 h-2.5 bg-white/80 rounded-sm"></div>
                    </div>
                  </div>

                  {/* Rendered Upload Image */}
                  <div className="w-full flex-1 rounded-2xl overflow-hidden bg-slate-800 flex items-center justify-center">
                    <img 
                      src={previewUrl} 
                      alt="Uploaded UI screenshot" 
                      className="w-full h-full object-contain rounded-2xl" 
                    />
                  </div>
                </div>
              ) : (
                /* Empty state waiting for upload */
                <div className="flex flex-col items-center justify-center text-center p-8 text-slate-400">
                  <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-300">
                    <FileImage className="w-10 h-10" />
                  </div>
                  <h4 className="font-semibold text-slate-600 mb-1">Preview Awaiting Upload</h4>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Upload or paste an image to inspect live aspect ratio, resolution tokens, and layout hierarchy.
                  </p>
                </div>
              )}

              {/* Overlay Status Bar */}
              {uploadedScreenshot && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white rounded-full px-5 py-2 flex items-center gap-4 text-xs font-mono shadow-2xl">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div> 
                    File Ingested
                  </span>
                  <span className="text-blue-400 font-bold">PostgreSQL Ready</span>
                </div>
              )}
            </div>

            {/* Asset Telemetry */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-slate-900">Asset Telemetry</h4>
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded flex items-center gap-1.5 border ${
                  uploadedScreenshot 
                    ? 'bg-green-50 border-green-100 text-green-700' 
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}>
                  <Check className="w-3 h-3" /> {uploadedScreenshot ? 'Ingestion Complete' : 'Waiting'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {/* Resolution */}
                <div className="border border-slate-200 rounded-xl p-3 bg-white">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1 font-medium">
                     <MonitorPlay className="w-3.5 h-3.5" /> Resolution
                  </div>
                  <div className="font-mono font-bold text-slate-800 text-sm">
                    {uploadedScreenshot?.width && uploadedScreenshot?.height 
                      ? `${uploadedScreenshot.width} × ${uploadedScreenshot.height} px` 
                      : '—'}
                  </div>
                </div>
                
                {/* Aspect Ratio */}
                <div className="border border-slate-200 rounded-xl p-3 bg-white">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1 font-medium">
                     <Smartphone className="w-3.5 h-3.5" /> Aspect Ratio
                  </div>
                  <div className="font-mono font-bold text-slate-800 text-sm">
                    {uploadedScreenshot ? calculateAspectRatio() : '—'}
                  </div>
                </div>

                {/* Screen Density */}
                <div className="border border-slate-200 rounded-xl p-3 bg-white">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1 font-medium">
                     <Layers className="w-3.5 h-3.5" /> Screen Density
                  </div>
                  <div className="font-mono font-bold text-slate-800 text-sm">
                    {uploadedScreenshot ? '3x Retina' : '—'}
                  </div>
                </div>

                {/* Color Profile */}
                <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-500 font-mono">
                    Color Profile: <strong className="text-slate-700">{uploadedScreenshot ? 'sRGB' : '—'}</strong>
                  </span>
                </div>

                {/* Format */}
                <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50 flex items-center gap-2">
                  <Box className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-500 font-mono">
                    Format: <strong className="text-slate-700">{uploadedScreenshot?.file_type?.replace('image/', '').toUpperCase() || '—'}</strong>
                  </span>
                </div>
                
                {/* Size */}
                <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50 flex items-center gap-2">
                  <FileImage className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-500 font-mono">
                    Size: <strong className="text-slate-700">
                      {uploadedScreenshot ? `${(uploadedScreenshot.file_size / (1024 * 1024)).toFixed(2)} MB` : '—'}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-5 h-5" /> Replace Image
              </button>
              
              <Link 
                to={uploadedScreenshot ? `/analysis?projectId=${projectId}&screenshotId=${uploadedScreenshot.id}` : '#'}
                onClick={(e) => {
                  if (!uploadedScreenshot) {
                    e.preventDefault();
                    setErrorMessage('Please upload a screenshot before continuing to AI Analysis.');
                  }
                }}
                className={`w-full sm:w-1/2 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold shadow-lg transition-all active:scale-[0.98] ${
                  uploadedScreenshot 
                    ? 'bg-[#0284C7] hover:bg-[#0369A1] text-white shadow-blue-500/20 cursor-pointer' 
                    : 'bg-slate-200 text-slate-400 shadow-none cursor-not-allowed'
                }`}
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