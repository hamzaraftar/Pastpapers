import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CoursesPage from "./pages/CoursesPage";
import PapersListPage from "./pages/PapersListPage";
import PdfViewerPage from "./pages/PdfViewerPage";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses/:subjectId" element={<CoursesPage />} />
        <Route path="/pastpapers" element={<PapersListPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/pastpapers/:paperId" element={<PdfViewerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
