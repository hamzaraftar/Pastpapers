import Layout from "../components/Layout";
import api from "../api";
import { useEffect, useState } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import { Link } from "react-router-dom";
import { ChevronRight, Layers } from "lucide-react";

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

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center text-brand-600 dark:text-brand-400 items-center min-h-[40vh]">
          <LoadingIndicator />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 sm:py-20 max-w-7xl">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-2 px-4 bg-brand-50 dark:bg-brand-900/40 rounded-full mb-8 border border-brand-100/50 dark:border-brand-700/30 shadow-sm shadow-brand-100 dark:shadow-brand-900/50">
            <span className="text-brand-600 dark:text-brand-300 text-sm font-semibold tracking-wide uppercase">
              Your Academic Hub
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-8">
            Find the{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-600 to-cyan-500 dark:from-brand-400 dark:to-cyan-300">
              Right Materials
            </span>
            <br className="hidden sm:block" /> for Your Success.
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            PaperVault offers an organized collection of past papers from the{" "}
            <span className="text-blue-700">
              Virtual University of Pakistan
            </span>{" "}
            . Select a subject below and start preparing smarter.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="glass-card rounded-3xl flex flex-col justify-between overflow-hidden group hover:-translate-y-2 transition-transform duration-500 relative"
            >
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-brand-200/50 dark:bg-brand-800/40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="p-8 relative z-10">
                <div className="w-14 h-14 bg-linear-to-br from-brand-50 to-white dark:from-slate-800 dark:to-slate-900 border border-brand-100 dark:border-brand-800/50 text-brand-600 dark:text-brand-400 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:shadow-brand-500/20 transition-all duration-500">
                  <span className="text-2xl font-bold font-sans tracking-tight">
                    {subject.name
                      ? subject.name.charAt(0).toUpperCase()
                      : <Layers className="w-6 h-6" />}
                  </span>
                </div>

                <h2
                  className="text-2xl font-bold text-slate-800 dark:text-white mb-3 line-clamp-1 tracking-tight"
                  title={subject.name}
                >
                  {subject.name}
                </h2>

                {subject.description && (
                  <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed line-clamp-2">
                    {subject.description}
                  </p>
                )}
              </div>

              <div className="px-8 py-6 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 mt-auto relative z-10">
                <Link
                  to={`/courses/${subject.id}`}
                  className="flex w-full items-center justify-between px-5 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 text-slate-700 dark:text-slate-200 hover:text-brand-700 dark:hover:text-brand-400 text-[15px] font-semibold rounded-xl shadow-[0_2px_8px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_8px_16px_rgb(14,165,233,0.15)] dark:hover:shadow-[0_8px_16px_rgb(14,165,233,0.2)] transition-all duration-300 group/btn"
                >
                  View Courses

                  <div className="w-7 h-7 rounded-full bg-slate-50 dark:bg-slate-800 group-hover/btn:bg-brand-50 dark:group-hover/btn:bg-brand-900/50 flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}