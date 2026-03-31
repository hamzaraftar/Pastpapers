import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../api";
import LoadingIndicator from "../components/LoadingIndicator";

export default function PdfViewerPage() {
  const { paperId } = useParams();
  const navigate = useNavigate();
  
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getPaper() {
      try {
        setLoading(true);
        const res = await api.get(`/api/papers/${paperId}/`);
        setPaper(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("Failed to fetch paper details. Please try again later.");
        console.error(err.message);
      }
    }
    
    if (paperId) {
      getPaper();
    }
  }, [paperId]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-150">
          <LoadingIndicator />
        </div>
      </Layout>
    );
  }

  if (error || !paper) {
    return (
      <Layout>
        <div className="max-w-281.5 mx-auto px-6 py-10 text-center">
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-6 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
          <div className="text-center text-red-500 py-10 bg-red-50 rounded-xl max-w-2xl mx-auto border border-red-100">
            <p className="font-medium">{error || "Paper not found."}</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Format the title out of available data
  const courseName = paper.course?.name || "Course";
  const paperType = paper.paper_type === 'final' ? 'Final Exam' : 'Midterm Exam';
  const title = `${courseName} - ${paperType}`.trim();
  const fileUrl = paper.file ? (paper.file.startsWith('http') ? paper.file : `http://localhost:8000${paper.file}`) : null;

  return (
    <Layout>
      <main className="max-w-281.5 mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <button 
              onClick={() => navigate(-1)} 
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-4 transition-colors text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to List
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              {title}
            </h1>
            <div className="flex items-center text-slate-500 text-sm gap-3">
               <span className={`px-2 py-1 text-xs font-bold rounded-lg tracking-wide capitalize ${
                 paper.paper_type === 'final' 
                   ? 'bg-rose-100 text-rose-700' 
                   : 'bg-emerald-100 text-emerald-700'
               }`}>
                 {paper.paper_type || "Exam"}
               </span>
               {paper.code && <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg">Code: {paper.code}</span>}
            </div>
          </div>

          <div className="hidden sm:flex gap-3">
            {fileUrl && (
              <>
                <a 
                  href={fileUrl} 
                  download
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-5 flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors shadow-sm text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </a>
              </>
            )}
          </div>
        </div>

        <div className="w-full h-px bg-slate-200 mb-6"></div>

        <div className="flex flex-col gap-6 items-start">
          {/* Mobile Buttons */}
          {fileUrl && (
            <div className="flex sm:hidden w-full gap-3">
              <a href={fileUrl} download className="flex-1 text-center bg-indigo-600 text-white py-2.5 rounded-lg font-semibold text-sm shadow-sm">Download</a>
            </div>
          )}

          {/* PDF Viewer Area */}
          <div className="w-full bg-slate-100 p-2 sm:p-4 rounded-xl flex flex-col items-center min-h-[70vh] border border-slate-300 shadow-inner">
            {fileUrl ? (
              <iframe 
                src={`${fileUrl}#view=FitH`} 
                title={title}
                className="w-full h-[70vh] sm:h-[80vh] rounded-lg border border-slate-300 shadow-sm bg-white"
                allowFullScreen
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 py-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg">No PDF file attached to this paper.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
