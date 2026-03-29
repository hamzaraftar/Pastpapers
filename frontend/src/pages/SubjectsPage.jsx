import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Header from "../components/Header";

const subjects = [
  { id: "cs", name: "Computer Science", icon: "🎓" },
  { id: "math", name: "Mathematics", icon: "📚" },
  { id: "physics", name: "Physics", icon: "📐" },
  { id: "economics", name: "Economics", icon: "📊" },
  { id: "english", name: "English", icon: "📖" },
  { id: "management", name: "Management", icon: "📋" },
];

export default function SubjectsPage() {
  return (
    <Layout>
      <Header />
      <main className="max-w-[700px] mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold text-slate-800 text-center mb-8">
          Virtual University Past Papers
        </h1>

        <div className="relative mb-12 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search Subjects..."
            className="w-full border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none py-2.5 px-4 text-slate-700 placeholder-slate-400"
          />
          <Search className="absolute right-3 top-2.5 text-slate-400 w-5 h-5 cursor-pointer" />
        </div>

        <h2 className="text-xl font-medium text-slate-800 mb-6 text-left">
          Browse Subjects
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {subjects.map((sub) => (
            <Link
              key={sub.id}
              to={`/subjects/${sub.id}`}
              className="bg-slate-100/80 hover:bg-slate-200/80 transition-colors rounded border border-slate-200/60 p-6 flex flex-col items-center justify-center aspect-square shadow-sm"
            >
              <div className="text-4xl mb-3">{sub.icon}</div>
              <span className="text-sm font-medium text-slate-700 text-center">
                {sub.name}
              </span>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}
