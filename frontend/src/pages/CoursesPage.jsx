import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../api";
import LoadingIndicator from "../components/LoadingIndicator";

export default function CoursesPage() {
  const { subjectId } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getCourses() {
      try {
        setLoading(true);
        const res = await api.get(`/api/courses/?subject=${subjectId}`);
        setCourses(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("Failed to fetch courses. Please try again later.");
        console.error(err.message);
      }
    }
    
    if (subjectId) {
      getCourses();
    }
  }, [subjectId]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-7xl">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-6 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Subjects
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
            Available Courses
          </h1>
          <p className="text-slate-600 text-lg">
            Browse through the courses offered in this subject and find the past papers you need.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-100">
            <LoadingIndicator />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10 bg-red-50 rounded-xl max-w-2xl mx-auto border border-red-100">
            <p className="font-medium">{error}</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 border border-slate-100 rounded-2xl max-w-3xl mx-auto shadow-sm">
            <svg className="mx-auto h-12 w-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-slate-900 mb-1">No courses found</h3>
            <p className="text-slate-500">There are currently no courses available for this subject.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div 
                key={course.id} 
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col group relative overflow-hidden"
              >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-linear-to-br from-indigo-50 to-blue-50 rounded-full z-0 group-hover:scale-150 transition-transform duration-500 opacity-60"></div>
                
                <div className="relative z-10 flex-col flex h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full tracking-wide">
                      {course.code || "COURSE"}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">
                    {course.name}
                  </h2>
                  
                  <div className="mt-auto pt-6">
                    <Link 
                      to={`/pastpapers?course=${course.id}`}
                      className="inline-flex w-full items-center justify-center px-4 py-2.5 bg-slate-50 hover:bg-indigo-600 text-slate-700 hover:text-white text-sm font-semibold rounded-lg transition-all duration-200 border border-slate-200 hover:border-transparent focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 outline-none"
                    >
                      View Past Papers
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}