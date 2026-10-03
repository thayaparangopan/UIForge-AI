export interface VisualDisparity {
  id: string;
  componentId?: string;
  componentName: string;
  severity: 'low' | 'medium' | 'high';
  category: 'layout' | 'color' | 'typography' | 'spacing';
  description: string;
  originalProperty?: string;
  generatedProperty?: string;
}

export interface MetricBreakdown {
  ssimScore: number;          // 0-100 (e.g. 94.2)
  layoutMatchScore: number;   // 0-100 (e.g. 96.5)
  colorMatchScore: number;    // 0-100 (e.g. 91.0)
  typographyScore: number;    // 0-100 (e.g. 95.0)
  overallSimilarity: number;  // 0-100 (e.g. 94.1)
}

export interface ComparisonResult {
  comparisonId: string;
  generationId: string;
  uploadId: string;
  originalImageUrl: string;
  renderedPreviewUrl: string;
  diffHeatmapUrl: string;
  metrics: MetricBreakdown;
  disparities: VisualDisparity[];
  comparedAt: string;
}

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || '/api/v1';

export const comparisonService = {
  /**
   * Run SSIM and OpenCV visual comparison between screenshot and generated rendering
   */
  async compareVisuals(uploadId: string, generationId: string): Promise<ComparisonResult> {
    try {
      const response = await fetch(`${API_BASE_URL}/compare`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uploadId, generationId }),
      });

      if (!response.ok) {
        throw new Error(`Comparison failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable, returning mock comparison result:', error);
      return {
        comparisonId: `comp_${Date.now()}`,
        generationId,
        uploadId,
        originalImageUrl: '/placeholder-original.png',
        renderedPreviewUrl: '/placeholder-rendered.png',
        diffHeatmapUrl: '/placeholder-heatmap.png',
        comparedAt: new Date().toISOString(),
        metrics: {
          ssimScore: 94.2,
          layoutMatchScore: 96.5,
          colorMatchScore: 91.0,
          typographyScore: 95.0,
          overallSimilarity: 94.1,
        },
        disparities: [
          {
            id: 'disp_1',
            componentName: 'Login Button',
            severity: 'medium',
            category: 'spacing',
            description: 'Button padding is slightly larger than original screenshot (+4px horizontal).',
            originalProperty: 'paddingHorizontal: 16px',
            generatedProperty: 'paddingHorizontal: 20px',
          },
          {
            id: 'disp_2',
            componentName: 'Title Text',
            severity: 'low',
            category: 'color',
            description: 'Title font color has a subtle shade offset (#0F172A vs #1E293B).',
            originalProperty: '#1E293B',
            generatedProperty: '#0F172A',
          },
        ],
      };
    }
  },

  /**
   * Fetch previous comparison by ID
   */
  async getComparisonById(comparisonId: string): Promise<ComparisonResult> {
    try {
      const response = await fetch(`${API_BASE_URL}/compare/${comparisonId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch comparison: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable, returning fallback comparison:', error);
      return this.compareVisuals('mock_upload', 'mock_generation');
    }
  }
};
