import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Circle,
  ShieldCheck,
  ArrowRight,
  Atom,
  AppWindow,
  Layers,
  Loader2
} from 'lucide-react';
import { projectService } from '../services/projectService';

export default function CreateProject() {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('Restaurant Mobile App');
  const [selectedFramework, setSelectedFramework] = useState('react-native');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { id: 1, label: 'Upload', active: true },
    { id: 2, label: 'Analyze', active: false },
    { id: 3, label: 'Generate', active: false },
    { id: 4, label: 'Preview', active: false },
    { id: 5, label: 'Compare', active: false },
    { id: 6, label: 'Refine', active: false },
    { id: 7, label: 'Export', active: false },
  ];

  const frameworks = [
    {
      id: 'react-native',
      title: 'React Native',
      description: 'iOS & Android StyleSheet components with native primitives and bridge exports.',
      icon: <Atom className="w-6 h-6 text-blue-600" />,
      badge1: { text: 'MOBILE NATIVE', style: 'bg-blue-100 text-blue-700 font-bold' },
      badge2: { text: 'TSX / JSX', style: 'text-slate-400 font-medium' },
    },
    {
      id: 'react-js',
      title: 'React.js',
      description: 'Vite + Tailwind CSS responsive UI ready for web deployment or PWA wrapping.',
      icon: <AppWindow className="w-6 h-6 text-slate-700" />,
      badge1: { text: 'WEB & PWA', style: 'bg-slate-100 text-slate-500 font-bold' },
      badge2: { text: 'Tailwind 3.4', style: 'text-slate-400 font-medium' },
    },
    {
      id: 'flutter',
      title: 'Flutter',
      description: 'Dart widgets with Material 3 styling and cross-platform multi-target output.',
      icon: <Layers className="w-6 h-6 text-slate-700" />,
      badge1: { text: 'CROSS-PLATFORM', style: 'bg-slate-100 text-slate-500 font-bold' },
      badge2: { text: 'Dart 3.x', style: 'text-slate-400 font-medium' },
    }
  ];

  const handleCreateProject = async () => {
    if (!projectName.trim()) return;
    setIsSubmitting(true);
    try {
      const project = await projectService.createProject({
        project_name: projectName,
        framework: selectedFramework,
      });
      localStorage.setItem('activeProjectId', project.id);
      navigate(`/upload?projectId=${project.id}`);
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col selection:bg-blue-200">
      
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img src="/logo.png" alt="UIForge AI Logo" className="h-10 md:h-11 w-auto object-contain transition-transform duration-200 hover:scale-105" />
        </Link>

        {/* Stepper */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center bg-white border border-slate-200 rounded-full px-1 py-1 shadow-sm">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className={`flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  step.active 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}>
                  <span className="mr-1.5 opacity-80">{step.id}.</span>
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

      <main className="flex-1 flex justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-[900px] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 p-8 md:p-12">
          
          {/* Title Section */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">Create Your Project</h1>
            <p className="text-slate-500 text-lg">
              Configure your temporary workspace session in one step. No login or signup required.
            </p>
          </div>

          <div className="mb-10">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-widest mb-3">
              <span className="text-blue-600">01.</span> Project Identifier
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-blue-600 font-bold text-lg select-none">
                ›
              </div>
              <input 
                type="text" 
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full h-14 pl-10 pr-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-700 font-mono text-sm shadow-sm"
                placeholder="Enter project name..."
              />
            </div>
          </div>

          <div className="mb-10">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-widest mb-3">
              <span className="text-blue-600">02.</span> Choose Target Framework
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {frameworks.map((fw) => {
                const isSelected = selectedFramework === fw.id;
                return (
                  <div 
                    key={fw.id}
                    onClick={() => setSelectedFramework(fw.id)}
                    className={`relative rounded-2xl border-2 p-6 cursor-pointer transition-all duration-200 flex flex-col h-full ${
                      isSelected 
                        ? 'border-blue-600 bg-[#F4F8FF] shadow-sm' 
                        : 'border-slate-100 hover:border-slate-300 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-5">
                      <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-blue-100' : 'bg-slate-100'}`}>
                        {fw.icon}
                      </div>
                      {isSelected ? (
                        <CheckCircle2 className="w-6 h-6 text-blue-600 fill-white" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-300" />
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{fw.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                      {fw.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200/60">
                      <span className={`text-[10px] tracking-wider uppercase px-2 py-1 rounded ${fw.badge1.style}`}>
                        {fw.badge1.text}
                      </span>
                      <span className={`text-[10px] tracking-wider uppercase ${fw.badge2.style}`}>
                        {fw.badge2.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-slate-600">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">Temporary workspace — projects persist in session memory & PostgreSQL.</span>
            </div>
            <button
              onClick={handleCreateProject}
              disabled={isSubmitting || !projectName.trim()}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors shadow-lg shadow-blue-600/20 active:scale-[0.98] cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Project...
                </>
              ) : (
                <>
                  Continue to Upload
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}