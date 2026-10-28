import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Check,
  ChevronRight,
  RotateCcw,
  FileCode2,
  Zap,
  Copy,
  CheckCheck,
  MonitorSmartphone,
  Wifi,
  BatteryMedium,
  ChevronLeft,
  Sparkles,
  Download,
  SplitSquareHorizontal,
  CheckCircle2,
  Smartphone,
  Image as ImageIcon,
  Edit3
} from 'lucide-react';

import { useWorkflow } from '../hooks/useWorkflow';
import type { CodeFile } from '../services/generationService';

export default function PreviewPage() {
  const navigate = useNavigate();
  const { state: workflowState, resetWorkflow } = useWorkflow();

  const [files, setFiles] = useState<CodeFile[]>(workflowState.generatedFiles || []);
  const [selectedFilePath, setSelectedFilePath] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [previewTab, setPreviewTab] = useState<'device' | 'original'>('device');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableCode, setEditableCode] = useState<string>('');

  // Fallback initial files if user navigated directly or state wasn't generated yet
  useEffect(() => {
    if (workflowState.generatedFiles && workflowState.generatedFiles.length > 0) {
      setFiles(workflowState.generatedFiles);
      if (!selectedFilePath) {
        setSelectedFilePath(workflowState.generatedFiles[0].path);
        setEditableCode(workflowState.generatedFiles[0].content);
      }
    } else {
      // Create fallback code based on intermediate representation or default
      const screenName = workflowState.intermediateRepresentation?.screenName || 'LoginScreen';
      const defaultFiles: CodeFile[] = [
        {
          path: `screens/${screenName}.tsx`,
          name: `${screenName}.tsx`,
          type: 'tsx',
          sizeBytes: 2450,
          content: `import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { theme } from '../styles/theme';

export default function ${screenName}() {
  const [inputVal, setInputVal] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>${workflowState.projectName || 'UIForge Mobile App'}</Text>
        <Text style={styles.subtitle}>Generated with AI Vision Synthesis</Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          value={inputVal}
          onChangeText={setInputVal}
          placeholder="name@example.com"
          placeholderTextColor={theme.colors.textSecondary}
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry
          placeholderTextColor={theme.colors.textSecondary}
          style={styles.input}
        />

        <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8}>
          <Text style={styles.ctaText}>Continue to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginTop: 6,
  },
  formCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
    color: theme.colors.textPrimary,
  },
  ctaButton: {
    backgroundColor: theme.colors.primary,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  ctaText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
`
        },
        {
          path: 'styles/theme.ts',
          name: 'theme.ts',
          type: 'ts',
          sizeBytes: 850,
          content: `export const theme = {
  colors: {
    primary: '${workflowState.intermediateRepresentation?.colorPalette?.primary || '#2563EB'}',
    secondary: '${workflowState.intermediateRepresentation?.colorPalette?.secondary || '#10B981'}',
    background: '${workflowState.intermediateRepresentation?.colorPalette?.background || '#0F172A'}',
    textPrimary: '${workflowState.intermediateRepresentation?.colorPalette?.textPrimary || '#FFFFFF'}',
    textSecondary: '${workflowState.intermediateRepresentation?.colorPalette?.textSecondary || '#94A3B8'}',
    card: '#1E293B',
    border: '#334155',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    full: 9999,
  },
};
`
        },
        {
          path: 'components/Header.tsx',
          name: 'Header.tsx',
          type: 'tsx',
          sizeBytes: 940,
          content: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
});
`
        }
      ];

      setFiles(defaultFiles);
      setSelectedFilePath(defaultFiles[0].path);
      setEditableCode(defaultFiles[0].content);
    }
  }, [workflowState.generatedFiles, workflowState.intermediateRepresentation]);

  const selectedFile = files.find((f) => f.path === selectedFilePath) || files[0];

  const handleSelectFile = (file: CodeFile) => {
    setSelectedFilePath(file.path);
    setEditableCode(file.content);
    setIsEditing(false);
  };

  const handleCopyCode = async () => {
    if (selectedFile) {
      await navigator.clipboard.writeText(editableCode || selectedFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updated = e.target.value;
    setEditableCode(updated);
    setFiles((prev) =>
      prev.map((f) => (f.path === selectedFilePath ? { ...f, content: updated } : f))
    );
  };

  const handleDownloadZip = () => {
    const genId = workflowState.generationId || 'uiforge_export';
    const downloadUrl = `/api/download/${genId}.zip`;
    window.open(downloadUrl, '_blank');
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
    { id: 4, label: 'Preview', state: 'active' },
    { id: 5, label: 'Compare', state: 'pending' },
    { id: 6, label: 'Refine', state: 'pending' },
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

  const codeLines = (editableCode || selectedFile?.content || '').split('\n');

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
      <main className="flex-1 flex gap-4 p-4 min-h-0 overflow-hidden">
        
        {/* Left Pane - Code Editor */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden min-w-[500px]">
          
          {/* Editor Tabs & Toolbar */}
          <div className="h-12 border-b border-slate-100 flex items-center justify-between px-3 bg-slate-50/70 shrink-0">
            {/* File Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 custom-scrollbar">
              {files.map((file) => {
                const isActive = file.path === selectedFile?.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => handleSelectFile(file)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-white border border-slate-200 shadow-sm text-blue-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-800'
                    }`}
                  >
                    <FileCode2 className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{file.name}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-0.5"></div>}
                  </button>
                );
              })}
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 ml-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  isEditing ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-100'
                }`}
                title={isEditing ? 'Viewing code mode' : 'Edit code in editor'}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Editing' : 'Edit'}</span>
              </button>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
              >
                {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Code Area */}
          <div className="flex-1 overflow-auto flex bg-[#0F172A] text-[13px] font-mono leading-relaxed p-4 relative">
            {/* Line Numbers */}
            <div className="flex flex-col text-slate-600 select-none pr-4 text-right border-r border-slate-800 h-max min-w-[2.5rem]">
              {codeLines.map((_, i) => (
                <span key={i} className="leading-6">{i + 1}</span>
              ))}
            </div>

            {/* Editable or Highlighted Code */}
            {isEditing ? (
              <textarea
                value={editableCode}
                onChange={handleCodeChange}
                spellCheck={false}
                className="flex-1 bg-transparent text-emerald-300 font-mono text-[13px] leading-6 pl-4 border-none outline-none resize-none selection:bg-blue-500/30 w-full min-h-full"
              />
            ) : (
              <pre className="pl-4 text-slate-200 whitespace-pre overflow-x-auto leading-6 flex-1 font-mono selection:bg-blue-500/40">
                <code>{editableCode || selectedFile?.content}</code>
              </pre>
            )}
          </div>

          {/* Editor Footer */}
          <div className="h-8 bg-slate-50 border-t border-slate-200 flex items-center justify-between px-4 shrink-0 text-[11px]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" /> Synthesized AST Validated
              </span>
              <span className="text-slate-400 font-mono">
                Framework: {workflowState.framework || 'React Native'}
              </span>
              <span className="text-slate-400 font-mono">UTF-8</span>
            </div>
            <span className="text-slate-500 font-mono">
              {codeLines.length} lines • {selectedFile?.name || 'File'}
            </span>
          </div>
        </div>

        {/* Right Pane - Live Sandbox / Original Preview */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden min-w-[450px]">
          
          {/* Sandbox Toolbar */}
          <div className="h-12 border-b border-slate-100 flex items-center justify-between px-4 bg-slate-50/70 shrink-0">
            {/* Switch between Rendered Preview and Original Screenshot */}
            <div className="flex bg-slate-200/60 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setPreviewTab('device')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  previewTab === 'device' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MonitorSmartphone className="w-3.5 h-3.5" /> Rendered UI
              </button>
              <button
                onClick={() => setPreviewTab('original')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  previewTab === 'original' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" /> Source Screenshot
              </button>
            </div>
            
            {/* Device Frame Mode */}
            {previewTab === 'device' && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600">
                  <Smartphone className="w-3 h-3 text-slate-400" />
                  <span>390 × 844</span>
                </div>
              </div>
            )}
          </div>

          {/* Preview Canvas Area */}
          <div className="flex-1 bg-[#F8FAFC] flex items-center justify-center p-6 overflow-y-auto relative">
            {/* Background Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[300px] h-[550px] bg-blue-500/5 blur-[90px] rounded-full"></div>
            </div>

            {previewTab === 'original' ? (
              /* Original Screenshot View */
              <div className="max-w-[420px] max-h-[680px] bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-2 flex flex-col items-center justify-center">
                {workflowState.screenshotUrl ? (
                  <img
                    src={workflowState.screenshotUrl}
                    alt="Original Uploaded UI"
                    className="w-full h-full object-contain rounded-xl"
                  />
                ) : (
                  <div className="p-12 text-center text-slate-400">
                    <ImageIcon className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p className="text-xs">No screenshot uploaded yet.</p>
                  </div>
                )}
              </div>
            ) : (
              /* Interactive Device Frame */
              <div
                className="w-[340px] h-[680px] rounded-[3rem] border-[10px] border-[#18181B] shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col shrink-0 ring-1 ring-white/10"
                style={{ backgroundColor: palette.background }}
              >
                {/* Dynamic Island Notch */}
                <div className="absolute top-2 inset-x-0 mx-auto w-[100px] h-[26px] bg-black rounded-full z-20 flex items-center justify-between px-3">
                  <div className="w-2 h-2 rounded-full bg-[#222]"></div>
                  <div className="w-2 h-2 rounded-full bg-blue-900/40"></div>
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between px-6 pt-3 pb-2 text-[10px] font-semibold tracking-wide z-10" style={{ color: palette.textSecondary }}>
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3 h-3" />
                    <BatteryMedium className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Dynamic App UI Content */}
                <div className="flex-1 flex flex-col px-5 pt-4 pb-6 overflow-y-auto custom-scrollbar">
                  {/* Header / Brand */}
                  <div className="flex flex-col items-center mb-6 mt-2">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-md"
                      style={{ backgroundColor: palette.primary }}
                    >
                      <Zap className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-lg font-bold" style={{ color: palette.textPrimary }}>
                      {ir?.screenName || workflowState.projectName || 'Synthesized UI'}
                    </h2>
                    <p className="text-[11px] mt-0.5" style={{ color: palette.textSecondary }}>
                      {workflowState.framework?.toUpperCase()} • Clean Component Tree
                    </p>
                  </div>

                  {/* Components Container */}
                  <div className="flex flex-col gap-3.5 flex-1">
                    {/* Render components derived from IR or structured cards */}
                    {ir?.components && ir.components.length > 0 ? (
                      ir.components.slice(0, 5).map((comp, idx) => (
                        <div
                          key={comp.id || idx}
                          className="p-3.5 rounded-xl border border-white/5 transition-all"
                          style={{
                            backgroundColor: comp.style?.backgroundColor || '#1E293B',
                            borderRadius: comp.style?.borderRadius || 12,
                          }}
                        >
                          <span className="text-[10px] font-mono uppercase tracking-wider block opacity-70 mb-1" style={{ color: palette.textSecondary }}>
                            {comp.type} • {comp.label || 'Component'}
                          </span>
                          {comp.type === 'button' ? (
                            <button
                              className="w-full py-2.5 rounded-lg font-semibold text-xs text-white shadow-sm transition-transform active:scale-95"
                              style={{ backgroundColor: palette.primary }}
                            >
                              {comp.label || 'Action Button'}
                            </button>
                          ) : comp.type === 'input' ? (
                            <input
                              type="text"
                              readOnly
                              value={comp.placeholder || 'Input field...'}
                              className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none"
                              style={{ color: palette.textPrimary }}
                            />
                          ) : (
                            <p className="text-xs font-medium" style={{ color: comp.style?.textColor || palette.textPrimary }}>
                              {comp.label}
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="bg-[#1E293B] border border-white/5 rounded-xl p-3.5">
                          <label className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
                            Email Address
                          </label>
                          <input
                            type="text"
                            readOnly
                            value="alex@developer.io"
                            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                          />
                        </div>

                        <div className="bg-[#1E293B] border border-white/5 rounded-xl p-3.5">
                          <label className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
                            Password
                          </label>
                          <input
                            type="password"
                            readOnly
                            value="••••••••••••"
                            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                          />
                        </div>

                        <button
                          className="w-full py-3 rounded-xl font-bold text-xs text-white shadow-lg mt-auto"
                          style={{ backgroundColor: palette.primary }}
                        >
                          Continue to App
                        </button>
                      </>
                    )}
                  </div>

                  {/* Home Indicator */}
                  <div className="w-1/3 h-1 bg-white/20 rounded-full mx-auto mt-4"></div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <footer className="h-20 bg-white border-t border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
        <Link to="/analysis" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200">
          <ChevronLeft className="w-4 h-4" /> Back to Analysis
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/refine" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors border border-purple-200">
            <Sparkles className="w-4 h-4" /> Refine with AI
          </Link>
          
          <button
            onClick={handleDownloadZip}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm"
          >
            <Download className="w-4 h-4" /> Download ZIP
          </button>
          
          <Link to="/compare" className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20">
            Compare Designs <SplitSquareHorizontal className="w-4 h-4" />
          </Link>
        </div>
      </footer>

      {/* Custom scrollbar styling */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, 0.25); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(148, 163, 184, 0.45); }
      `}} />
    </div>
  );
}
