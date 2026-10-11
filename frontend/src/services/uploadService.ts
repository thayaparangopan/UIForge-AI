export interface UploadResult {
  id: string;
  project_id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  file_type: string;
  width?: number | null;
  height?: number | null;
  url: string;
  created_at?: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || '/api';
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
const MAX_FILE_SIZE_MB = 15;

export const uploadService = {
  /**
   * Validate file type and size before upload
   */
  validateFile(file: File): ValidationResult {
    if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
      return {
        valid: false,
        error: 'Invalid format. Allowed formats: PNG, JPG, JPEG, WebP',
      };
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return {
        valid: false,
        error: `File size exceeds the limit of ${MAX_FILE_SIZE_MB}MB`,
      };
    }

    return { valid: true };
  },

  /**
   * Upload UI screenshot to backend server for a specific project
   */
  async uploadScreenshot(file: File, projectId: string): Promise<UploadResult> {
    const validation = this.validateFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.detail || `Upload failed with status ${response.status}`);
    }

    return await response.json();
  },

  /**
   * Fetch latest screenshot metadata for a project
   */
  async getLatestScreenshot(projectId: string): Promise<UploadResult> {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/screenshot`);
    if (!response.ok) {
      throw new Error(`Failed to fetch project screenshot: ${response.statusText}`);
    }
    return await response.json();
  }
};
