# UIForge AI — API Reference Documentation

All endpoints are hosted by default on `http://127.0.0.1:8000`.

---

## 1. Projects & Uploads

### `POST /api/projects/`
Creates a new project session.

**Request Body:**
```json
{
  "project_name": "Mobile Restaurant App",
  "framework": "react-native",
  "description": "Bistro food ordering interface"
}
```

**Response (`200 OK`):**
```json
{
  "id": "e6f47738-9cfb-4171-881b-5cfef3ffec22",
  "project_name": "Mobile Restaurant App",
  "framework": "react-native",
  "title": "Mobile Restaurant App",
  "description": "Bistro food ordering interface",
  "status": "created",
  "created_at": "2026-10-30T07:15:20.123456Z"
}
```

---

### `GET /api/projects/{id}`
Retrieves project metadata by UUID.

**Response (`200 OK`):**
```json
{
  "id": "e6f47738-9cfb-4171-881b-5cfef3ffec22",
  "project_name": "Mobile Restaurant App",
  "framework": "react-native",
  "status": "screenshot_uploaded",
  "created_at": "2026-10-30T07:15:20.123456Z"
}
```

---

### `POST /api/projects/{id}/upload`
Uploads a UI screenshot file. Validates MIME type (PNG, JPG, JPEG, WebP) and maximum file size (15 MB), then extracts dimensions using Pillow.

**Request:** `multipart/form-data`
* `file`: Binary image file.

**Response (`200 OK`):**
```json
{
  "id": "b3e9b1d2-2804-4b57-9d76-9d6614457e5e",
  "project_id": "e6f47738-9cfb-4171-881b-5cfef3ffec22",
  "file_name": "login_screen.png",
  "file_path": "uploads/e6f47738.../b3e9b1d2_login_screen.png",
  "file_size": 284192,
  "file_type": "image/png",
  "width": 390,
  "height": 844,
  "url": "/uploads/e6f47738.../b3e9b1d2_login_screen.png",
  "created_at": "2026-10-30T07:16:05.123456Z"
}
```

---

### `GET /api/projects/{id}/screenshot`
Fetches the latest uploaded screenshot for the project.

---

## 2. Vision Analysis

### `POST /api/projects/{id}/analyze`
Analyzes the uploaded screenshot using Gemini 2.5 Flash Vision. Returns structured UI components, layout hierarchy, and design tokens.

**Request Body (Optional):**
```json
{
  "screenshot_id": "b3e9b1d2-2804-4b57-9d76-9d6614457e5e"
}
```

**Response (`200 OK`):**
```json
{
  "id": "f5c88e7b-1a61-460b-8d76-4767123985a1",
  "project_id": "e6f47738-9cfb-4171-881b-5cfef3ffec22",
  "screenshot_id": "b3e9b1d2-2804-4b57-9d76-9d6614457e5e",
  "screen_name": "LoginScreen",
  "layout_type": "flex-column",
  "intermediate_representation": {
    "screenName": "LoginScreen",
    "layoutType": "flex-column",
    "colorPalette": {
      "primary": "#2563EB",
      "secondary": "#10B981",
      "background": "#0F172A",
      "textPrimary": "#FFFFFF",
      "textSecondary": "#94A3B8"
    },
    "components": []
  },
  "component_count": 8,
  "confidence_score": 94.5,
  "processing_time_ms": 1420,
  "created_at": "2026-10-30T07:16:30.123456Z"
}
```

---

## 3. Code Generation & Download

### `POST /api/generate`
Synthesizes modular production-ready code files from the Intermediate Representation (IR).

**Request Body:**
```json
{
  "analysisId": "f5c88e7b-1a61-460b-8d76-4767123985a1",
  "framework": "react-native",
  "intermediateRepresentation": { ... }
}
```

**Response (`200 OK`):**
```json
{
  "generationId": "gen_8b2e1a4d9c7f",
  "analysisId": "f5c88e7b-1a61-460b-8d76-4767123985a1",
  "framework": "react-native",
  "files": [
    {
      "path": "screens/LoginScreen.tsx",
      "name": "LoginScreen.tsx",
      "type": "tsx",
      "sizeBytes": 2840,
      "content": "import React from 'react';\n..."
    },
    {
      "path": "styles/theme.ts",
      "name": "theme.ts",
      "type": "ts",
      "sizeBytes": 850,
      "content": "export const theme = { ... };"
    }
  ],
  "manifest": {
    "totalFiles": 3,
    "bundleSizeBytes": 4540,
    "zipDownloadUrl": "/api/download/gen_8b2e1a4d9c7f.zip"
  },
  "metrics": {
    "astDepth": 4,
    "deduplicationRate": 96.5,
    "accessibilityScore": 100,
    "compilationStatus": "success"
  },
  "generatedAt": "2026-10-30T07:17:00.123456Z"
}
```

---

### `GET /api/download/{generation_id}.zip`
Streams the generated code bundle as an in-memory ZIP package.

* **Response Header**: `Content-Type: application/zip`
* **Response Header**: `Content-Disposition: attachment; filename="uiforge_react-native_gen_8b2e1a4d9c7f.zip"`

---

## 4. Visual Comparison & AI Refine

### `POST /api/compare`
Executes an OpenCV SSIM calculation comparing the original design against the generated output.

**Request Body:**
```json
{
  "uploadId": "b3e9b1d2-2804-4b57-9d76-9d6614457e5e",
  "generationId": "gen_8b2e1a4d9c7f"
}
```

**Response (`200 OK`):**
```json
{
  "comparisonId": "comp_9a3c1e",
  "generationId": "gen_8b2e1a4d9c7f",
  "uploadId": "b3e9b1d2-2804-4b57-9d76-9d6614457e5e",
  "originalImageUrl": "/uploads/.../login_screen.png",
  "renderedPreviewUrl": "/uploads/.../rendered.png",
  "diffHeatmapUrl": "/uploads/.../diff_heatmap_a1b2c3d4.png",
  "metrics": {
    "ssimScore": 94.2,
    "layoutMatchScore": 96.5,
    "colorMatchScore": 91.0,
    "typographyScore": 95.0,
    "overallSimilarity": 94.1
  },
  "disparities": [
    {
      "id": "disp_1",
      "componentName": "Action Button Corner Radius",
      "severity": "medium",
      "category": "layout",
      "description": "Corner radius 12px rendered instead of detected source 16px.",
      "originalProperty": "borderRadius: 16px",
      "generatedProperty": "borderRadius: 12px"
    }
  ],
  "comparedAt": "2026-10-30T07:17:30.123456Z"
}
```

---

### `POST /api/refine`
Applies natural language instructions to iteratively refine generated code.

**Request Body:**
```json
{
  "generationId": "gen_8b2e1a4d9c7f",
  "promptText": "Increase action button corner radius to 16px and set width to 100%."
}
```

**Response (`200 OK`):**
```json
{
  "refinementId": "ref_5d4e3f",
  "generationId": "gen_8b2e1a4d9c7f",
  "promptText": "Increase action button corner radius to 16px and set width to 100%.",
  "appliedChanges": [
    {
      "targetFile": "screens/LoginScreen.tsx",
      "changeType": "style_update",
      "description": "Updated ctaButton style borderRadius to 16 and width to 100%."
    }
  ],
  "latestUpdatedFiles": [ ... ],
  "status": "applied",
  "refinedAt": "2026-10-30T07:18:00.123456Z"
}
```
