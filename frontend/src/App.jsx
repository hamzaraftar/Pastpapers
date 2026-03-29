import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CoursesPage from "./pages/CoursesPage";
import PapersListPage from "./pages/PapersListPage";
import PdfViewerPage from "./pages/PdfViewerPage";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/pastpapers" element={<PapersListPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/pastpapers/:paperId" element={<PdfViewerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
