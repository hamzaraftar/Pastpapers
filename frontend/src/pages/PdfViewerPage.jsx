import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../api";
import LoadingIndicator from "../components/LoadingIndicator";
import Header from "../components/Header";

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
  const courseName = paper.course || "Course";
  const paperType =
    paper.paper_type === "final" ? "Final Exam" : "Midterm Exam";
  const title = `${courseName} - ${paperType}`.trim();

  const fileUrl = paper.file
    ? paper.file.startsWith("http")
      ? paper.file
      : `http://localhost:8000${paper.file}`
    : null;

   return fileUrl ? (
  <div className="w-screen h-screen bg-slate-100 dark:bg-slate-900">
    <Header />
    <iframe
      src={`${fileUrl}#view=FitH`}
      title={title}
      className="w-full h-full"
      allowFullScreen
    />
  </div>
) : (
  <div className="flex flex-col items-center justify-center w-screen h-screen text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900">
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
);  }