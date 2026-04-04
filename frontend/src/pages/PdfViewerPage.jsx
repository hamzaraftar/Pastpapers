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

    getPaper();
  }, [paperId]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center text-brand-600 dark:text-brand-400 min-h-150">
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
            className="inline-flex items-center text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-300 font-medium mb-6 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Back
          </button>
          <div className="text-center text-red-500 py-10 bg-red-50 dark:bg-red-900/20 rounded-xl max-w-2xl mx-auto border border-red-100 dark:border-red-900/50">
            <p className="font-medium">{error || "Paper not found."}</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Format the title out of available data
  const courseName = paper.course?.name || "Course";
  const paperType =
    paper.paper_type === "final" ? "Final Exam" : "Midterm Exam";
  const title = `${courseName} - ${paperType}`.trim();
  const fileUrl = paper.file
    ? paper.file.startsWith("http")
      ? paper.file
      : `http://localhost:8000${paper.file}`
    : null;

  return (
    <Layout>
      <main className="max-w-full mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-300 font-medium mb-4 transition-colors text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to List
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-2">
              {title}
            </h1>
            <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm gap-3">
              <span
                className={`px-2 py-1 text-xs font-bold rounded-lg tracking-wide capitalize ${
                  paper.paper_type === "final"
                    ? "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300"
                    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                }`}
              >
                {paper.paper_type || "Exam"}
              </span>
              {paper.code && (
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg">
                  Code: {paper.code}
                </span>
              )}
            </div>
          </div>

          
        </div>

        <div className="w-full h-px bg-slate-200 dark:bg-slate-800 mb-6"></div>

        <div className="flex flex-col gap-6 items-start">
          {/* Mobile Buttons */}
          {/* {fileUrl && (
            <div className="flex sm:hidden w-full gap-3">
              <a href={fileUrl} download className="flex-1 text-center bg-brand-600 dark:bg-brand-500 text-white py-2.5 rounded-lg font-semibold text-sm shadow-sm ring-1 ring-brand-700/50 dark:ring-brand-400/50 transition-colors">Download PDF</a>
            </div>
          )} */}

          {/* PDF Viewer Area */}
          <div className="w-full bg-slate-100 dark:bg-slate-900/50 p-2 sm:p-4 rounded-xl flex flex-col items-center min-h-[80vh] border border-slate-300 dark:border-slate-800 shadow-inner">
            {fileUrl ? (
              <iframe
                src={`${fileUrl}#view=FitH`}
                title={title}
                className="w-full h-[70vh] sm:h-[80vh] rounded-lg border border-slate-300 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-950"
                allowFullScreen
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400 py-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mb-4 text-slate-300 dark:text-slate-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
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
