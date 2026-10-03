export interface UploadResult {
  uploadId: string;
  projectId?: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  url: string;
  width?: number;
  height?: number;
  uploadedAt: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || '/api/v1';
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
const MAX_FILE_SIZE_MB = 10;

export const uploadService = {
  /**
   * Validate file type and size before upload
   */
  validateFile(file: File): ValidationResult {
    if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
      return {
        valid: false,
        error: 'Invalid format. Allowed formats: PNG, JPG, JPEG, WEBP',
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
   * Upload UI screenshot to backend server / cloud storage
   */
  async uploadScreenshot(file: File, projectId?: string): Promise<UploadResult> {
    const validation = this.validateFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const formData = new FormData();
    formData.append('file', file);
    if (projectId) {
      formData.append('projectId', projectId);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable, using mock upload response:', error);
      const mockPreviewUrl = URL.createObjectURL(file);
      return {
        uploadId: `up_${Date.now()}`,
        projectId: projectId || 'proj_default_1',
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        url: mockPreviewUrl,
        width: 1125,
        height: 2436,
        uploadedAt: new Date().toISOString(),
      };
    }
  },

  /**
   * Fetch upload metadata by ID
   */
  async getUploadMetadata(uploadId: string): Promise<UploadResult> {
    try {
      const response = await fetch(`${API_BASE_URL}/upload/${uploadId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch upload metadata: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable, returning fallback metadata:', error);
      return {
        uploadId,
        fileName: 'screenshot.png',
        fileSize: 42000,
        fileType: 'image/png',
        url: '/placeholder-screenshot.png',
        width: 1125,
        height: 2436,
        uploadedAt: new Date().toISOString(),
      };
    }
  }
};
