# UIForge AI

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Gemini](https://img.shields.io/badge/Gemini_API-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white)](https://opencv.org/)

### An AI-Based Visual UI-to-Code Generation and Refinement System

UIForge AI is a web-based AI system that converts user interface screenshots into frontend code.

The system uses AI-based visual understanding to analyze a UI screenshot, identify interface components and layout structures, generate frontend code, display a live preview, compare the generated interface with the original design, and refine the generated code based on visual differences.

---

## 📌 Project Overview

Designers and developers often spend significant time converting UI designs into functional frontend code.

Existing design-to-code tools mainly work with structured design files such as Figma projects. However, a developer may only have a screenshot or PNG/JPG image of an interface.

UIForge AI aims to provide a workflow where a user can upload a UI screenshot and automatically generate frontend code from the visual design.

### Main Workflow

```text
UI Screenshot
      ↓
AI UI Analysis
      ↓
UI Structure / Intermediate Representation
      ↓
Code Generation
      ↓
Live Preview
      ↓
Visual Comparison
      ↓
AI Refinement
      ↓
Final Code
```

---

## 🎯 Objectives

The main objectives of UIForge AI are:

1. To analyze UI screenshots using AI-based visual understanding.
2. To identify UI components, layout structures, colors, typography, and spacing.
3. To represent the analyzed interface using a structured UI representation.
4. To generate frontend code from the analyzed UI structure.
5. To provide a live preview of the generated interface.
6. To compare the generated interface with the original screenshot.
7. To calculate visual similarity between the original and generated interfaces.
8. To allow users to refine the generated interface using natural-language instructions.
9. To export the generated frontend project as downloadable source code.

---

## ✨ Key Features

### 1. Screenshot Upload

Users can upload a UI screenshot in formats such as:

* PNG
* JPG
* JPEG

---

### 2. AI UI Analysis

Gemini API analyzes the uploaded screenshot and identifies:

* UI components
* Component hierarchy
* Layout structure
* Colors
* Typography
* Spacing
* Alignment
* Buttons
* Input fields
* Images
* Navigation elements
* Cards and other interface elements

---

### 3. UI Intermediate Representation

The analyzed interface is converted into a structured representation before code generation.

Example:

```json
{
  "screen": "Login",
  "layout": "centered",
  "components": [
    {
      "type": "logo",
      "position": "top"
    },
    {
      "type": "text_input",
      "placeholder": "Email"
    },
    {
      "type": "text_input",
      "placeholder": "Password"
    },
    {
      "type": "button",
      "text": "Login"
    }
  ]
}
```

This intermediate representation allows the system to support multiple frontend technologies in the future.

---

### 4. AI Code Generation

The system generates frontend code based on the analyzed UI structure.

Initial target:

* React.js

Future support may include:

* React Native
* Flutter
* HTML/CSS/JavaScript

---

### 5. Live Code Preview

Users can view the generated code and its rendered interface in the same workspace.

The system will use **Monaco Editor** to display and edit generated code.

---

### 6. Visual Similarity Analysis

The generated interface will be compared with the original screenshot.

Image-processing technologies include:

* OpenCV
* Pillow
* NumPy
* SSIM
* scikit-image

The system will produce a visual similarity measurement and identify major visual differences.

---

### 7. AI-Based Refinement

Users can provide instructions such as:

```text
Make the login button wider.
```

or:

```text
Move the form slightly higher.
```

The AI will modify the generated code based on the requested change.

The updated interface can then be compared again with the original screenshot.

---

### 8. Code Export

Users can download the generated project as a ZIP file containing the required source code and project files.

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │     UI Screenshot   │
                    │      PNG / JPG      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    React Frontend   │
                    │ TypeScript + Tailwind│
                    └──────────┬──────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │   FastAPI Backend   │
                    │       Python        │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
      ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
      │ Gemini API  │   │Image Process│   │ PostgreSQL  │
      │             │   │OpenCV/Pillow│   │ SQLAlchemy  │
      └─────────────┘   └──────┬──────┘   └─────────────┘
                                │
                                ▼
                         ┌─────────────┐
                         │ SSIM / NumPy│
                         │  Comparison │
                         └──────┬──────┘
                                │
                                ▼
                     ┌────────────────────┐
                     │ Generated UI + Code │
                     │  + Visual Refinement│
                     └────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer                | Technology            |
| -------------------- | --------------------- |
| UI/UX Design         | Figma                 |
| Frontend             | React.js + TypeScript |
| Styling              | Tailwind CSS          |
| Backend/API          | Python + FastAPI      |
| AI                   | Gemini API            |
| Image Processing     | OpenCV + Pillow       |
| Visual Similarity    | scikit-image / SSIM   |
| Numerical Processing | NumPy                 |
| Database             | PostgreSQL            |
| ORM                  | SQLAlchemy            |
| Code Editor          | Monaco Editor         |
| File Upload          | FastAPI UploadFile    |
| Export               | Python ZIP utilities  |
| Version Control      | Git + GitHub          |

---

## 📂 Project Structure

```text
uiforge-ai/
│
├── frontend/
│   ├── src/                    # React + TypeScript + Tailwind UI
│   ├── Dockerfile              # Multi-stage production Nginx container
│   └── nginx.conf              # SPA routing & API reverse proxy
│
├── backend/
│   ├── app/                    # FastAPI services, models, and endpoints
│   └── Dockerfile              # Python 3.11-slim container with OpenCV
│
├── docs/
│   ├── architecture/           # Pipeline and system architecture
│   ├── api/                    # OpenAPI endpoint specifications
│   ├── database/               # Relational ER schema and constraints
│   ├── deployment/             # Docker deployment guide
│   └── research/               # Computer vision & multimodal analysis
│
├── tests/                      # Automated pytest integration test suite
├── docker-compose.yml          # Postgres + Backend + Frontend stack
├── start-dev.ps1               # 1-click Windows PowerShell dev launcher
├── start-dev.bat               # 1-click Windows Batch dev launcher
├── package.json                # Root orchestration scripts
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Option A: Local Development (Fastest for Development)

1. **One-Click Launch:**
   - **PowerShell**: `./start-dev.ps1`
   - **Command Prompt**: `start-dev.bat`
   - **NPM**: `npm run dev`

2. **Access Services:**
   - Frontend Studio: [http://localhost:5173](http://localhost:5173)
   - Backend API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### Option B: Docker Containerization (Production / Portable Stack)

1. **Set your Gemini API Key:**
   ```bash
   # Windows PowerShell
   $env:GEMINI_API_KEY="your_api_key_here"

   # Linux / macOS
   export GEMINI_API_KEY="your_api_key_here"
   ```

2. **Launch all services via Docker Compose:**
   ```bash
   docker compose up -d --build
   ```

3. **Access Services:**
   - Frontend Studio: [http://localhost:3000](http://localhost:3000)
   - Backend API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
   - PostgreSQL Database: `localhost:5432` (db: `uiforge_db`, user: `postgres`)

---

## 🔄 Development Plan

### Phase 1 — Project Setup

* [x] Create GitHub repository
* [x] Configure React + TypeScript frontend
* [x] Configure FastAPI backend
* [x] Configure PostgreSQL & SQLite auto-fallback
* [x] Establish frontend-backend communication & Vite proxy

### Phase 2 — UI Design

* [x] Design UIForge AI screens in Figma
* [x] Create reusable frontend components
* [x] Implement the main 7-stage application workflow

### Phase 3 — Screenshot Processing

* [x] Implement screenshot upload
* [x] Validate image formats
* [x] Process images using Pillow/OpenCV
* [x] Store uploaded screenshots

### Phase 4 — AI UI Analysis

* [x] Integrate Gemini API (Vision)
* [x] Send screenshot to Gemini
* [x] Extract UI components & bounding boxes
* [x] Extract layout hierarchy
* [x] Extract colors, typography, and spacing
* [x] Generate structured UI Intermediate Representation (IR)

### Phase 5 — Code Generation

* [x] Create UI-to-code generation pipeline
* [x] Generate React.js / React Native + TypeScript code
* [x] Display generated code using interactive code viewer & tab selector
* [x] Create live interactive preview canvas

### Phase 6 — Visual Comparison

* [x] Side-by-side comparison of original vs generated UI
* [x] Implement OpenCV Gaussian filter SSIM
* [x] Calculate overall fidelity similarity score
* [x] Identify visual differences & generate Jet difference heatmap overlay

### Phase 7 — AI Refinement

* [x] Create refinement interface
* [x] Accept natural-language instructions
* [x] Send refinement request to Gemini
* [x] Update generated code and sync AST
* [x] Re-render generated UI
* [x] Track visual similarity progression

### Phase 8 — Export

* [x] Generate modular project file tree
* [x] Create in-memory ZIP package
* [x] Provide one-click download functionality

### Phase 9 — Testing & Evaluation

* [x] Automated backend integration tests with pytest (13 tests passing)
* [x] Test different UI screenshots (Mobile Login & SaaS Dashboard)
* [x] Test code generation accuracy & zip archive validity
* [x] Test visual similarity scoring & difference heatmap generation
* [x] Frontend TypeScript compilation & build verification

### Phase 10 — Containerization & Deployment

* [x] Multi-stage React/Nginx frontend `Dockerfile`
* [x] Python 3.11-slim FastAPI backend `Dockerfile` with OpenCV OS dependencies
* [x] Unified multi-service `docker-compose.yml` (Postgres, Backend, Frontend)
* [x] Reverse proxy configuration routing `/api/` and `/uploads/` seamlessly
* [x] Persistent volume mounts for database data and generated upload assets
* [x] Complete Docker deployment documentation (`docs/deployment/docker.md`)

---

## 🔐 Authentication

UIForge AI will initially operate **without user authentication**.

The application will use temporary project sessions.

```text
Student A
   ↓
Temporary Project
   ↓
Upload → Generate → Refine → Download
   ↓
Project expires / is deleted

Student B
   ↓
New Temporary Project
```

This allows different students to use the system without seeing previous users' projects.

---

## 🔌 Planned API Endpoints

```text
POST   /api/projects
POST   /api/projects/{id}/upload
POST   /api/projects/{id}/analyze
POST   /api/projects/{id}/generate
POST   /api/projects/{id}/compare
POST   /api/projects/{id}/refine

GET    /api/projects/{id}
GET    /api/projects/{id}/download

DELETE /api/projects/{id}
```

---

## 🗄️ Planned Database Entities

### Projects

Stores temporary project information.

### Screenshots

Stores uploaded screenshot information.

### UI Analysis

Stores the AI-generated UI structure.

### Generated Code

Stores generated code and versions.

### Refinements

Stores refinement instructions and updated code versions.

---

## 🧠 AI Processing Pipeline

```text
Screenshot
    ↓
Gemini Vision Analysis
    ↓
UI Component Detection
    ↓
Layout & Style Extraction
    ↓
Structured UI Representation
    ↓
Code Generation
    ↓
Rendered Interface
    ↓
Visual Comparison
    ↓
Refinement
    ↓
Improved Code
```

---

## 📊 Project Evaluation

The system will be evaluated using several factors:

### Code Generation

* Code validity
* Component correctness
* Structural accuracy
* Framework compatibility

### Visual Similarity

* SSIM score
* Layout similarity
* Component positioning
* Color similarity
* Typography similarity

### Refinement

* Improvement in visual similarity
* Correctness of requested changes
* Number of refinement iterations

### Usability

* Ease of uploading a design
* Ease of understanding generated code
* Ease of making refinements
* Overall workflow usability

---

## 🚧 Current Scope

The initial version will focus on:

```text
PNG/JPG Screenshot
        ↓
Gemini AI Analysis
        ↓
UI Structure
        ↓
React.js Code
        ↓
Live Preview
        ↓
SSIM Comparison
        ↓
AI Refinement
        ↓
Export
```

Additional frameworks such as React Native and Flutter may be added after the core system is completed.

---

## 🔮 Future Improvements

Possible future extensions include:

* Figma API integration
* React Native code generation
* Flutter code generation
* Multi-screen application generation
* Responsive layout generation
* Component library detection
* Accessibility analysis
* Design consistency checking
* Automatic asset extraction
* Improved visual-difference localization
* Support for additional frontend frameworks

---

## 👨‍💻 Project Status

**Status:** Planning / Initial Development

**Project:** UIForge AI

**Type:** Individual Undergraduate Project

**Primary AI:** Gemini API

**Primary Frontend:** React.js + TypeScript

**Primary Backend:** Python + FastAPI

---

## 📜 License

This project is developed for academic and educational purposes.
