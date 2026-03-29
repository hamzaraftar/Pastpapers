import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubjectsPage from "./pages/SubjectsPage";
import CoursesPage from "./pages/CoursesPage";
import PapersListPage from "./pages/PapersListPage";
import PdfViewerPage from "./pages/PdfViewerPage";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubjectsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/subjects/:subjectId" element={<CoursesPage />} />
        <Route path="/subjects/:subjectId/courses/:courseId" element={<PapersListPage />} />
        <Route path="/subjects/:subjectId/courses/:courseId/papers/:paperId" element={<PdfViewerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
