import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Check,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Download,
  Copy,
  Layers,
  Code2,
  ShieldCheck,
  Activity,
  Folder,
  FileCode2,
  FileJson,
  Terminal,
  CheckCheck
} from 'lucide-react';

import { useWorkflow } from '../hooks/useWorkflow';
import type { CodeFile } from '../services/generationService';

export default function ExportPage() {
  const navigate = useNavigate();
  const { state: workflowState, resetWorkflow } = useWorkflow();

  const generationId = workflowState.generationId || 'demo_gen';
  const downloadUrl = `/api/download/${generationId}.zip`;

  const fallbackFiles: CodeFile[] = [
    {
      path: 'screens/MainScreen.tsx',
      name: 'MainScreen.tsx',
      type: 'tsx',
      sizeBytes: 2450,
      content: `// UIForge AI - Generated Screen Component\nimport React from 'react';\nimport { View, Text, StyleSheet } from 'react-native';\nimport { theme } from '../styles/theme';\n\nexport default function MainScreen() {\n  return (\n    <View style={styles.container}>\n      <Text style={styles.title}>Welcome</Text>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, backgroundColor: theme.colors.background },\n  title: { fontSize: 24, color: theme.colors.textPrimary },\n});`
    },
    {
      path: 'styles/theme.ts',
      name: 'theme.ts',
      type: 'ts',
      sizeBytes: 850,
      content: `export const theme = {\n  colors: {\n    primary: '#2563EB',\n    secondary: '#10B981',\n    background: '#0F172A',\n    textPrimary: '#FFFFFF',\n    textSecondary: '#94A3B8',\n  },\n};`
    },
    {
      path: 'package.json',
      name: 'package.json',
      type: 'json',
      sizeBytes: 520,
      content: `{\n  "name": "uiforge-generated-app",\n  "version": "1.0.0",\n  "private": true\n}`
    }
  ];

  const files: CodeFile[] = workflowState.generatedFiles?.length
    ? workflowState.generatedFiles
    : fallbackFiles;

  const [selectedFilePath, setSelectedFilePath] = useState<string>(files[0]?.path || '');
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  const selectedFile = files.find((f) => f.path === selectedFilePath) || files[0];

  const handleDownload = () => {
    window.open(downloadUrl, '_blank');
  };

  const handleCopySnippet = async () => {
    if (selectedFile) {
      await navigator.clipboard.writeText(selectedFile.content);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    }
  };

  const handleCopyAll = async () => {
    const allCode = files.map((f) => `// ================= ${f.path} =================\n${f.content}\n`).join('\n\n');
    await navigator.clipboard.writeText(allCode);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
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
    { id: 6, label: 'Refine', state: 'completed' },
    { id: 7, label: 'Export', state: 'active' },
  ];

  const frameworkName = workflowState.framework?.toUpperCase() || 'REACT NATIVE';
  const projectName = workflowState.projectName || 'uiforge-app';

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
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm bg-white"
          >
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
            Your generated {frameworkName} code bundle is fully synthesized, refined, and packaged ready for your project.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={handleDownload}
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Download className="w-5 h-5" />
              Download ZIP Bundle
              <span className="bg-blue-800/50 text-blue-100 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ml-1 font-semibold">.zip</span>
            </button>
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-6 py-3.5 rounded-xl font-bold shadow-sm transition-all cursor-pointer"
            >
              {copiedAll ? <CheckCheck className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5 text-slate-400" />}
              <span>{copiedAll ? 'All Code Copied!' : 'Copy All Code'}</span>
            </button>
          </div>
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
                  <span className="text-sm font-mono text-slate-700 font-semibold">{frameworkName}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-slate-400" /> Code Quality
                  </div>
                  <span className="text-sm font-semibold text-emerald-600">Verified Strict</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Activity className="w-4 h-4 text-slate-400" /> Total Files
                  </div>
                  <span className="text-sm font-mono text-slate-500">{files.length} source files</span>
                </div>
              </div>
            </div>

            {/* Quick Unpack & Run Commands Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Terminal className="w-4 h-4 text-blue-600" /> Quick Unpack & Run
              </h3>
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs leading-loose overflow-x-auto">
                <div className="flex">
                  <span className="text-slate-400 mr-2 select-none">&gt;</span>
                  <span className="text-slate-700">mkdir {projectName} && cd {projectName}</span>
                </div>
                <div className="flex">
                  <span className="text-slate-400 mr-2 select-none">&gt;</span>
                  <span className="text-slate-700">unzip ~/Downloads/uiforge_export.zip -d .</span>
                </div>
                <div className="flex">
                  <span className="text-slate-400 mr-2 select-none">&gt;</span>
                  <span className="text-blue-700 font-semibold">
                    {workflowState.framework === 'react-native'
                      ? 'npm install && npx expo start'
                      : workflowState.framework === 'flutter'
                      ? 'flutter pub get && flutter run'
                      : 'npm install && npm run dev'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (2/3) - File Tree & Interactive Viewer */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[520px] overflow-hidden">
              
              {/* Header */}
              <div className="h-12 border-b border-slate-100 flex items-center justify-between px-6 bg-slate-50/50 shrink-0">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Generated Project Bundle ({files.length} Files)
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {selectedFile?.name || 'File Preview'}
                </span>
              </div>

              <div className="flex-1 flex overflow-hidden">
                {/* File Tree Left Bar */}
                <div className="w-56 border-r border-slate-100 bg-slate-50/40 overflow-y-auto p-3 flex flex-col font-mono text-xs custom-scrollbar">
                  <div className="text-[10px] font-bold text-slate-400 mb-2 ml-1">SOURCE BUNDLE</div>
                  
                  <div className="flex items-center gap-2 text-slate-700 py-1 font-semibold truncate">
                    <Folder className="w-4 h-4 text-blue-500 fill-blue-100 shrink-0" />
                    <span className="truncate">{projectName}</span>
                  </div>
                  
                  <div className="ml-3 border-l border-slate-200 pl-2 flex flex-col gap-1 mt-1">
                    {files.map((file) => {
                      const isActive = file.path === selectedFile?.path;
                      return (
                        <button
                          key={file.path}
                          onClick={() => setSelectedFilePath(file.path)}
                          className={`flex items-center justify-between text-left py-1.5 px-2 rounded transition-colors ${
                            isActive
                              ? 'bg-blue-50 text-blue-700 font-bold border border-blue-100'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {file.name.endsWith('.json') ? (
                              <FileJson className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            ) : (
                              <FileCode2 className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                            )}
                            <span className="truncate">{file.name}</span>
                          </div>
                          <span className="text-[9px] text-slate-400 ml-1 shrink-0 font-mono">
                            {Math.round(file.sizeBytes / 1024) || 1}KB
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Code Viewer Right Pane */}
                <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
                  {/* File Header Tab */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 bg-slate-50">
                    <div className="flex items-center gap-2">
                      <FileCode2 className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-xs font-mono text-blue-700 font-semibold">{selectedFile?.path}</span>
                    </div>
                    <button
                      onClick={handleCopySnippet}
                      className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      {copiedSnippet ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSnippet ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Code Area */}
                  <div className="flex-1 overflow-auto p-4 text-[13px] font-mono leading-relaxed bg-[#0F172A] text-slate-200">
                    <pre className="whitespace-pre overflow-x-auto selection:bg-blue-500/40">
                      <code>{selectedFile?.content}</code>
                    </pre>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
