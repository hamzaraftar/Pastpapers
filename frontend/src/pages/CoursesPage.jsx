import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Breadcrumbs from "../components/Breadcrumbs";

const coursesData = {
  cs: {
    name: "Computer Science",
    courses: [
      { id: "cs101", title: "CS101 - Introduction to Programming" },
      { id: "cs201", title: "CS201 - Data Structures" },
      { id: "cs301", title: "CS301 - Database Systems" },
      { id: "cs401", title: "CS401 - Operating Systems" },
      { id: "cs501", title: "CS501 - Software Engineering" },
    ],
  },
};

export default function CoursesPage() {
  const { subjectId } = useParams();
  const data = coursesData[subjectId] || coursesData.cs; // Fallback to CS for demo

  return (
    <Layout>
      <Header />
      <main className="max-w-[1126px] mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-slate-800 mb-4">
          {data.name} Courses
        </h1>

        <Breadcrumbs items={[{ label: data.name }]} />

        <div className="w-full h-px bg-slate-200 mb-6"></div>

        <div className="flex flex-col gap-3">
          {data.courses.map((course) => (
            <Link
              key={course.id}
              to={`/subjects/${subjectId}/courses/${course.id}`}
              className="bg-[#115a9b] hover:bg-[#1a4975] transition-colors text-white rounded px-5 py-4 font-medium text-left shadow-sm"
            >
              {course.title}
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}
