import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import CoursesPage from "../pages/CoursesPage";
import PapersListPage from "../pages/PapersListPage";
import PdfViewerPage from "../pages/PdfViewerPage";
import AboutPage from "../pages/AboutPage";
import NotFound from "../pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/courses/:subjectId" element={<CoursesPage />} />
      <Route path="/pastpapers" element={<PapersListPage />} />
      <Route path="/pastpapers/:paperId" element={<PdfViewerPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
