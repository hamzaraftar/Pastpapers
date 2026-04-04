import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import PapersListPage from "./pages/PapersListPage";
import PdfViewerPage from "./pages/PdfViewerPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses/:subjectId" element={<CoursesPage />} />
        <Route path="/pastpapers" element={<PapersListPage />} />
        <Route path="/pastpapers/:paperId" element={<PdfViewerPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
