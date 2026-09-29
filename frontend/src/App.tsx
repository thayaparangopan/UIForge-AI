import { BrowserRouter, Routes, Route } from "react-router-dom"

import LandingPage from "./pages/LandingPage"
import CreateProjectPage from "./pages/CreateProjectPage"
import UploadPage from "./pages/UploadPage"
import AnalysisPage from "./pages/AnalysisPage"
import GenerationPage from "./pages/GenerationPage"
import PreviewPage from "./pages/PreviewPage"
import ComparisonPage from "./pages/ComparisonPage"
import RefinementPage from "./pages/RefinementPage"
import ExportPage from "./pages/ExportPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route
          path="/create"
          element={<CreateProjectPage />}
        />

        <Route
          path="/upload"
          element={<UploadPage />}
        />

        <Route
          path="/analysis"
          element={<AnalysisPage />}
        />

        <Route
          path="/generate"
          element={<GenerationPage />}
        />

        <Route
          path="/preview"
          element={<PreviewPage />}
        />

        <Route
          path="/compare"
          element={<ComparisonPage />}
        />

        <Route
          path="/refine"
          element={<RefinementPage />}
        />

        <Route
          path="/export"
          element={<ExportPage />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App