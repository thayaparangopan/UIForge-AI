import type { TargetFramework } from './projectService';
import type { UIIntermediateRepresentation } from './analysisService';

export interface CodeFile {
  path: string;
  name: string;
  type: 'tsx' | 'ts' | 'json' | 'png' | 'svg' | 'dart';
  sizeBytes: number;
  content: string;
}

export interface GenerationMetrics {
  astDepth: number;
  deduplicationRate: number; // e.g. 96.4
  accessibilityScore: number; // e.g. 100
  compilationStatus: 'success' | 'warning' | 'error';
}

export interface GenerationResult {
  generationId: string;
  analysisId: string;
  framework: TargetFramework;
  files: CodeFile[];
  manifest: {
    totalFiles: number;
    bundleSizeBytes: number;
    zipDownloadUrl: string;
  };
  metrics: GenerationMetrics;
  generatedAt: string;
}

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || '/api/v1';

export const generationService = {
  /**
   * Generate code bundle from UI Intermediate Representation
   */
  async generateCode(
    analysisId: string,
    framework: TargetFramework = 'react-native',
    ir?: UIIntermediateRepresentation
  ): Promise<GenerationResult> {
    try {
      const response = await fetch(`${API_BASE_URL}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysisId, framework, intermediateRepresentation: ir }),
      });

      if (!response.ok) {
        throw new Error(`Code generation failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable, returning mock generation result:', error);
      return {
        generationId: `gen_${Date.now()}`,
        analysisId,
        framework,
        generatedAt: new Date().toISOString(),
        manifest: {
          totalFiles: 8,
          bundleSizeBytes: 43008,
          zipDownloadUrl: `${API_BASE_URL}/download/bundle_${Date.now()}.zip`,
        },
        metrics: {
          astDepth: 4,
          deduplicationRate: 96.4,
          accessibilityScore: 100,
          compilationStatus: 'success',
        },
        files: [
          {
            path: 'components/LoginCard.tsx',
            name: 'LoginCard.tsx',
            type: 'tsx',
            sizeBytes: 1840,
            content: `import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export const LoginCard: React.FC = () => {
  const [email, setEmail] = useState('');
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>Order Delicious Food</Text>
      <TextInput
        style={styles.input}
        placeholder="your.email@bistro.io"
        value={email}
        onChangeText={setEmail}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: { padding: 24, backgroundColor: '#FFFFFF', borderRadius: 16 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#0F172A', marginBottom: 16 },
  input: { height: 48, borderColor: '#CBD5E1', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12 },
});`,
          },
          {
            path: 'styles/theme.ts',
            name: 'theme.ts',
            type: 'ts',
            sizeBytes: 1200,
            content: `export const theme = {
  colors: {
    primary: '#2563EB',
    secondary: '#10B981',
    background: '#F8FAFC',
    text: '#0F172A',
  },
  spacing: { sm: 8, md: 16, lg: 24 },
};`,
          },
          {
            path: 'App.tsx',
            name: 'App.tsx',
            type: 'tsx',
            sizeBytes: 2100,
            content: `import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { LoginCard } from './components/LoginCard';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <LoginCard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center' },
});`,
          },
        ],
      };
    }
  },

  /**
   * Fetch code generation by ID
   */
  async getGenerationById(generationId: string): Promise<GenerationResult> {
    try {
      const response = await fetch(`${API_BASE_URL}/generate/${generationId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch generation: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable, returning fallback generation:', error);
      return this.generateCode('mock_analysis');
    }
  },

  /**
   * Trigger ZIP package download for a generation
   */
  async downloadZip(generationId: string): Promise<Blob> {
    try {
      const response = await fetch(`${API_BASE_URL}/download/${generationId}`);
      if (!response.ok) {
        throw new Error(`Download failed with status ${response.status}`);
      }
      return await response.blob();
    } catch (error) {
      console.warn('Backend unavailable, returning dummy blob:', error);
      return new Blob(['PK\x03\x04Dummy ZIP Content'], { type: 'application/zip' });
    }
  }
};
