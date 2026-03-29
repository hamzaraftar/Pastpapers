import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Breadcrumbs from "../components/Breadcrumbs";

export default function PapersListPage() {
  const { subjectId, courseId } = useParams();

  const mockPapers = [
    { id: "final-2023", title: "CS101 Final Exam 2023" },
    { id: "mid-2022", title: "CS101 Midterm 2022" },
    { id: "final-2021", title: "CS101 Final Exam 2021" },
    { id: "mid-2021", title: "CS101 Midterm 2021" },
  ];

  return (
    <Layout>
      <Header />
      <main className="max-w-[1126px] mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-slate-800 mb-4">
          CS101 Past Papers
        </h1>

        <Breadcrumbs
          items={[
            { label: "Computer Science", path: "/subjects/cs" },
            { label: "CS101" },
          ]}
        />

        <div className="w-full h-px bg-slate-200 mb-6"></div>

        <div className="flex flex-col gap-3">
          {mockPapers.map((paper) => (
            <Link
              key={paper.id}
              to={`/subjects/${subjectId}/courses/${courseId}/papers/${paper.id}`}
              className="bg-slate-100 hover:bg-slate-200 transition-colors text-[#175b9f] font-semibold text-sm rounded py-3 px-5 flex justify-between items-center shadow-sm"
            >
              <span>{paper.title}</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}
