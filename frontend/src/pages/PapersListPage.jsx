import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../api";
import LoadingIndicator from "../components/LoadingIndicator";

export default function PapersListPage() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("course");
  const navigate = useNavigate();

  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getPapers() {
      try {
        setLoading(true);
        const url = courseId ? `/api/papers/?course=${courseId}` : `/api/papers/`;
        const res = await api.get(url);
        setPapers(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("Failed to fetch papers. Please try again later.");
        console.error(err.message);
      }
    }
    
    getPapers();
  }, [courseId]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-7xl">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-6 transition-colors bg-transparent border-none cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Courses
          </button>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
            Past Papers
          </h1>
          <p className="text-slate-600 text-lg">
            Access previous examination papers to help you prepare effectively.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingIndicator />
          </div>
        ) : error ? (
           <div className="text-center text-red-500 py-10 bg-red-50 rounded-xl max-w-2xl mx-auto border border-red-100">
             <p className="font-medium">{error}</p>
           </div>
        ) : papers.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 border border-slate-100 rounded-2xl max-w-3xl mx-auto shadow-sm">
            <svg className="mx-auto h-12 w-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-slate-900 mb-1">No papers found</h3>
            <p className="text-slate-500">There are currently no past papers available for this selection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {papers.map((paper) => {
               return (
               <div 
                 key={paper.id} 
                 className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col group relative overflow-hidden"
               >
                 <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-full z-0 group-hover:scale-150 transition-transform duration-500 opacity-60"></div>
                 
                 <div className="relative z-10 flex-col flex h-full">
                   <div className="flex items-center space-x-2 mb-4">
                     <span className={`px-3 py-1 text-xs font-bold rounded-full tracking-wide capitalize ${
                       paper.paper_type === 'final' 
                         ? 'bg-rose-100 text-rose-700' 
                         : 'bg-emerald-100 text-emerald-700'
                     }`}>
                       {paper.paper_type || "Exam"}
                     </span>
                     {paper.code && (
                       <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full tracking-wide">
                         {paper.code}
                       </span>
                     )}
                   </div>
                   
                   <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                     {paper.paper_type === 'midterm' ? 'Midterm Exam Paper' : 'Final Exam Paper'}
                   </h2>
                   
                   <div className="mt-auto pt-6 flex gap-3">
                     <Link 
                       to={`/pastpapers/${paper.id}`}
                       className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 outline-none"
                     >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                       </svg>
                       View Details
                     </Link>
                   </div>
                 </div>
               </div>
            )})}
          </div>
        )}
      </div>
    </Layout>
  );
}
