// frontend/src/services/projectApi.ts

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || "/api";

export interface CreateProjectPayload {
  title?: string;
  description?: string;
  project_name?: string;
  framework?: string;
}

export const createProject = async (projectData: CreateProjectPayload) => {
  try {
    const payload = {
      project_name: projectData.project_name || projectData.title || "Untitled Project",
      framework: projectData.framework || "react-native",
      title: projectData.title || projectData.project_name || "Untitled Project",
      description: projectData.description || "",
    };

    const response = await fetch(`${API_BASE_URL}/projects/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), 
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Database submission failed:", error);
    throw error;
  }
};
