import React, { createContext, useContext, useState, useEffect } from 'react';
import type { TargetFramework } from '../services/projectService';
import type { UIIntermediateRepresentation, AnalysisResult } from '../services/analysisService';
import type { CodeFile, GenerationResult } from '../services/generationService';
import type { ComparisonResult } from '../services/comparisonService';
import type { RefinementResult } from '../services/refinementService';

export interface WorkflowState {
  projectId: string | null;
  projectName: string;
  framework: TargetFramework;
  screenshotId: string | null;
  screenshotUrl: string | null;
  screenshotFile: File | null;
  analysisId: string | null;
  analysisResult: AnalysisResult | null;
  intermediateRepresentation: UIIntermediateRepresentation | null;
  generationId: string | null;
  generationResult: GenerationResult | null;
  generatedFiles: CodeFile[];
  comparisonResult: ComparisonResult | null;
  refinementResult: RefinementResult | null;
}

interface WorkflowContextType {
  state: WorkflowState;
  setProject: (id: string, name: string, framework: TargetFramework) => void;
  setScreenshot: (id: string, url: string, file?: File) => void;
  setAnalysis: (result: AnalysisResult) => void;
  setGeneration: (result: GenerationResult) => void;
  setComparison: (result: ComparisonResult) => void;
  setRefinement: (result: RefinementResult) => void;
  resetWorkflow: () => void;
}

const STORAGE_KEY = 'uiforge_workflow_state';

const initialWorkflowState: WorkflowState = {
  projectId: null,
  projectName: 'Untitled Project',
  framework: 'react-native',
  screenshotId: null,
  screenshotUrl: null,
  screenshotFile: null,
  analysisId: null,
  analysisResult: null,
  intermediateRepresentation: null,
  generationId: null,
  generationResult: null,
  generatedFiles: [],
  comparisonResult: null,
  refinementResult: null,
};

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<WorkflowState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...initialWorkflowState, ...parsed, screenshotFile: null };
      }
    } catch (e) {
      console.warn('Failed to parse saved workflow state from localStorage:', e);
    }
    return initialWorkflowState;
  });

  useEffect(() => {
    try {
      const serializable = { ...state, screenshotFile: null };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
    } catch (e) {
      console.warn('Failed to save workflow state to localStorage:', e);
    }
  }, [state]);

  const setProject = (id: string, name: string, framework: TargetFramework) => {
    setState((prev) => ({
      ...prev,
      projectId: id,
      projectName: name,
      framework,
    }));
  };

  const setScreenshot = (id: string, url: string, file?: File) => {
    setState((prev) => ({
      ...prev,
      screenshotId: id,
      screenshotUrl: url,
      screenshotFile: file || prev.screenshotFile,
    }));
  };

  const setAnalysis = (result: AnalysisResult) => {
    setState((prev) => ({
      ...prev,
      analysisId: result.analysisId,
      analysisResult: result,
      intermediateRepresentation: result.intermediateRepresentation,
    }));
  };

  const setGeneration = (result: GenerationResult) => {
    setState((prev) => ({
      ...prev,
      generationId: result.generationId,
      generationResult: result,
      generatedFiles: result.files,
    }));
  };

  const setComparison = (result: ComparisonResult) => {
    setState((prev) => ({
      ...prev,
      comparisonResult: result,
    }));
  };

  const setRefinement = (result: RefinementResult) => {
    setState((prev) => ({
      ...prev,
      refinementResult: result,
      generatedFiles: result.latestUpdatedFiles?.length ? result.latestUpdatedFiles : prev.generatedFiles,
    }));
  };

  const resetWorkflow = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(initialWorkflowState);
  };

  return (
    <WorkflowContext.Provider
      value={{
        state,
        setProject,
        setScreenshot,
        setAnalysis,
        setGeneration,
        setComparison,
        setRefinement,
        resetWorkflow,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = (): WorkflowContextType => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};
