import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Breadcrumbs from "../components/Breadcrumbs";

export default function PdfViewerPage() {
  const { subjectId, courseId, paperId } = useParams();

  return (
    <Layout>
      <Header />
      <main className="max-w-[1126px] mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-slate-800 mb-4">
          CS101 Final Exam 2023
        </h1>

        <Breadcrumbs
          items={[
            { label: "CS101", path: `/subjects/${subjectId}/courses/${courseId}` },
            { label: "Final Exam 2023" },
          ]}
        />

        <div className="w-full h-px bg-slate-200 mb-6"></div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Mock PDF Viewer Area */}
          <div className="flex-1 w-full bg-slate-200/50 p-6 flex flex-col items-center min-h-[600px] border border-slate-300">
            <div className="w-full max-w-[600px] bg-white shadow min-h-[700px] p-12 text-center text-slate-800 border border-slate-200">
                <br /><br />
                <h2 className="uppercase text-lg tracking-widest text-slate-600 mb-6">Virtual University of Pakistan</h2>
                <div className="w-full h-px bg-slate-300 mb-6"></div>
                <h3 className="text-xl font-bold mb-4">CS101 - Introduction to Programming</h3>
                <h4 className="font-semibold text-slate-700">Final Term Examination - Fall 2023</h4>
                <div className="w-full h-px bg-slate-300 mt-6 mb-8"></div>
                
                <div className="flex justify-between text-xs text-slate-500 mb-8 border-b border-slate-200 pb-4 text-left">
                  <div>
                    <p>Duration: 120 Minutes</p>
                    <p>Total Marks: 60</p>
                  </div>
                  <div>
                    <p>Date: 12 Jan 2024</p>
                  </div>
                </div>

                <div className="text-left space-y-3 text-xs text-slate-400">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <p>In hac habitasse platea dictumst. Vivamus adipiscing.</p>
                </div>
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="w-full md:w-64 flex flex-col gap-3">
            <button className="bg-[#115a9b] hover:bg-[#0f4a80] text-white w-full py-3 px-4 flex items-center justify-center gap-2 rounded font-medium transition-colors shadow-sm">
              <span className="w-5 h-5 bg-white/20 rounded block text-center leading-5 text-sm">📄</span>
              View PDF
            </button>
            <button className="bg-[#115a9b] hover:bg-[#0f4a80] text-white w-full py-3 px-4 flex items-center justify-center gap-2 rounded font-medium transition-colors shadow-sm">
              <span className="w-5 h-5 bg-white/20 rounded block text-center leading-5 text-xl font-bold rotate-180">↑</span>
              Download PDF
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
}
