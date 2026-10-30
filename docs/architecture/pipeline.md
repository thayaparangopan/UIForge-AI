# UIForge AI — System Architecture & Pipeline Specification

## 1. System Overview

UIForge AI bridges the gap between visual raster designs (screenshots, mockups, PNG/JPG assets) and production frontend code by executing a structured multi-stage synthesis pipeline:

```mermaid
flowchart TD
    A["User Screenshot (PNG / JPG)"] --> B["Image Processing & Telemetry (Pillow / OpenCV)"]
    B --> C["Gemini Vision Multimodal LLM"]
    C --> D["Structured UI Intermediate Representation (JSON IR)"]
    D --> E["AST Code Synthesis Engine"]
    E --> F["Production Code Bundle (React Native / React / Flutter)"]
    F --> G["Live Sandbox Preview & Code Editor"]
    G --> H["Visual SSIM Comparison Matrix (OpenCV)"]
    H --> I{"Fidelity & Disparity Analysis"}
    I -- "Natural Language Tweak" --> J["AI Refinement Engine"]
    J --> E
    I -- "Approved" --> K["Exported ZIP Archive"]
```

---

## 2. End-to-End Workflow Sequence

The interaction flow across the client, API gateway, multimodal AI model, image processing modules, and persistent storage:

```mermaid
sequenceDiagram
    autonumber
    actor User as User / Designer
    participant FE as React Frontend (Vite)
    participant API as FastAPI Backend
    participant DB as PostgreSQL / SQLite
    participant AI as Gemini 2.5 Flash
    participant CV as OpenCV / Pillow

    User->>FE: Uploads UI Screenshot (PNG/JPG)
    FE->>API: POST /api/projects/{id}/upload (Multipart)
    API->>CV: Extract image dimensions, channels, aspect ratio
    API->>DB: Store Screenshot record & save local raster
    API-->>FE: ScreenshotResponse (ID, URL, dimensions)

    User->>FE: Triggers "AI Analysis"
    FE->>API: POST /api/projects/{id}/analyze
    API->>AI: Send image tensor + structured extraction prompt
    AI-->>API: Validated JSON Intermediate Representation (IR)
    API->>DB: Store UIAnalysis record
    API-->>FE: AnalysisResponse (components, hierarchy, colors, typography)

    FE->>API: POST /api/generate (IR, target framework)
    API->>AI: Synthesize modular production components
    AI-->>API: Multi-file code bundle + metrics
    API-->>FE: Code files (screens, components, styles/theme)

    FE->>API: POST /api/compare (uploadId, generationId)
    API->>CV: Gaussian filter Structural Similarity Index (SSIM)
    API->>CV: Generate Jet colormap difference heatmap overlay
    API-->>FE: SSIM fidelity score, variance bounding boxes, heatmap URL

    User->>FE: Submits prompt tweak ("Make button 16px radius")
    FE->>API: POST /api/refine (generationId, promptText)
    API->>AI: Apply AST delta to target component
    AI-->>API: Updated code files + delta stream
    API-->>FE: Refined code + updated preview

    User->>FE: Clicks "Download ZIP"
    FE->>API: GET /api/download/{id}.zip
    API-->>FE: application/zip stream containing project source tree
```

---

## 3. UI Intermediate Representation (JSON IR)

Before synthesizing code for any target platform, UIForge AI normalizes the analyzed visual tree into a structured, technology-agnostic **UI Intermediate Representation (IR)**.

### IR Schema

```json
{
  "screenName": "LoginScreen",
  "layoutType": "flex-column",
  "dimensions": {
    "width": 390,
    "height": 844
  },
  "colorPalette": {
    "primary": "#2563EB",
    "secondary": "#10B981",
    "background": "#0F172A",
    "textPrimary": "#FFFFFF",
    "textSecondary": "#94A3B8"
  },
  "typography": {
    "fontFamily": "Inter",
    "baseFontSize": 16
  },
  "components": [
    {
      "id": "comp_header",
      "type": "navbar",
      "label": "Navigation Header",
      "bounding_box": {
        "x": 5.0,
        "y": 4.0,
        "width": 90.0,
        "height": 6.0
      },
      "style": {
        "textColor": "#94A3B8",
        "fontSize": 14
      }
    },
    {
      "id": "comp_submit_btn",
      "type": "button",
      "label": "Sign In to Workspace",
      "bounding_box": {
        "x": 8.0,
        "y": 60.0,
        "width": 84.0,
        "height": 7.5
      },
      "style": {
        "backgroundColor": "#0284C7",
        "textColor": "#FFFFFF",
        "borderRadius": 12
      }
    }
  ]
}
```

### Key Design Tenet: Normalized Percentage Coordinates
* `bounding_box.x`, `y`, `width`, and `height` are normalized as floating-point percentages ($0.0\%\text{--}100.0\%$).
* This prevents hardcoded pixel lock-in and allows the code generator to map responsive flexbox / grid rules that scale seamlessly across device screen sizes.

---

## 4. Visual Comparison Matrix (OpenCV SSIM)

To evaluate the precision of the generated UI against the original source design:

1. **Resolution Normalization**:
   Both source and rendered images are scaled to identical dimensions using `cv2.resize` with Lanczos interpolation.
2. **Grayscale SSIM Calculation**:
   Calculated using a $11 \times 11$ Gaussian kernel ($\sigma = 1.5$):
   $$\text{SSIM}(x, y) = \frac{(2\mu_x\mu_y + C_1)(2\sigma_{xy} + C_2)}{(\mu_x^2 + \mu_y^2 + C_1)(\sigma_x^2 + \sigma_y^2 + C_2)}$$
3. **Jet Diff Heatmap**:
   `cv2.absdiff` computes pixel-level absolute difference. A `cv2.COLORMAP_JET` overlay is generated and blended at $40\%$ opacity over the original mockup to visually highlight layout, spacing, and color variances.
