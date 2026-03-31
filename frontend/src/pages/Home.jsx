import Layout from "../components/Layout";
import api from "../api";
import { useEffect, useState } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import { Link } from "react-router-dom";

export default function Home() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSubjects() {
      try {
        const res = await api.get("/api/subjects/");
        setSubjects(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.log(error.message);
      }
    }
    getSubjects();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-7xl">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
            Explore Subjects
          </h1>
          <p className="text-slate-600 text-lg">
            Choose a subject to view its available courses and past papers.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center text-4xl items-center `min-h-100">
            <LoadingIndicator />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="bg-white rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 group"
              >
                <div className="p-6">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-100 transition-transform duration-300">
                    <span className="text-2xl font-bold">
                      {subject.name
                        ? subject.name.charAt(0).toUpperCase()
                        : "?"}
                    </span>
                  </div>
                  <h2
                    className="text-xl font-bold text-slate-800 mb-2 line-clamp-1"
                    title={subject.name}
                  >
                    {subject.name}
                  </h2>
                  {subject.description && (
                    <p className="text-slate-500 text-sm line-clamp-2">
                      {subject.description}
                    </p>
                  )}
                </div>
                <div className="px-6 py-5 bg-slate-50 border-t border-slate-100 mt-auto">
                  <Link
                    to={`/courses/${subject.id}`}
                    className="inline-flex w-full items-center justify-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-200"
                  >
                    View Courses
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
