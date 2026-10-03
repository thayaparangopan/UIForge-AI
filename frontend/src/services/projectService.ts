export type TargetFramework = 'react-native' | 'react-js' | 'flutter';

export interface Project {
  id: string;
  project_name: string;
  framework: TargetFramework | string;
  status: string;
  created_at?: string;
  updated_at?: string;
  description?: string;
  config?: any;
}

export interface CreateProjectPayload {
  project_name: string;
  framework: string;
}

const API_BASE_URL = '/api';

export const projectService = {
  /**
   * Create a new UIForge project in PostgreSQL database via FastAPI
   */
  async createProject(payload: CreateProjectPayload): Promise<Project> {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to create project: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('Backend error or unavailable, returning fallback created project:', error);
      return {
        id: `proj_${Date.now()}`,
        project_name: payload.project_name,
        framework: payload.framework,
        status: 'created',
        created_at: new Date().toISOString(),
      };
    }
  },

  /**
   * Get project details by ID
   */
  async getProjectById(id: string): Promise<Project> {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`);
      if (!response.ok) {
        throw new Error(`Project not found: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable, returning fallback project by ID:', error);
      return {
        id,
        project_name: 'Restaurant Mobile UI',
        framework: 'react-native',
        created_at: new Date().toISOString(),
        status: 'created',
      };
    }
  },

  /**
   * List all projects
   */
  async listProjects(): Promise<Project[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/`);
      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable, returning fallback project list:', error);
      return [
        {
          id: 'proj_default_1',
          project_name: 'Restaurant Mobile UI',
          framework: 'react-native',
          created_at: new Date().toISOString(),
          status: 'created',
        }
      ];
    }
  }
};
