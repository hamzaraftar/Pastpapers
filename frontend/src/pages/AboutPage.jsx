import { Link } from "react-router-dom";
import { GraduationCap, Target, Search, TrendingUp, BookOpen, ChevronRight } from "lucide-react";
import Layout from "../components/Layout";

export default function About() {
  const features = [
    {
      title: "For Students",
      description:
        "Students can search past papers by subject, university, or course code to understand exam patterns and practice effectively.",
      icon: <GraduationCap className="h-6 w-6 text-brand-600 dark:text-brand-400" />,
      bgColor: "bg-brand-50 dark:bg-brand-900/30",
      borderColor: "border-brand-100 dark:border-brand-800",
    },
    {
      title: "Our Mission",
      description:
        "Our mission is to create a centralized hub where students can easily access academic resources without wasting time.",
      icon: <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      bgColor: "bg-purple-50 dark:bg-purple-900/30",
      borderColor: "border-purple-100 dark:border-purple-800",
    },
    {
      title: "Easy Search",
      description:
        "Our platform provides a simple and clean interface to quickly find the papers you need for better exam preparation.",
      icon: <Search className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />,
      bgColor: "bg-cyan-50 dark:bg-cyan-900/30",
      borderColor: "border-cyan-100 dark:border-cyan-800",
    },
    {
      title: "Growing Platform",
      description:
        "We continuously add more universities, subjects, and papers to make the platform more useful for students.",
      icon: <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      bgColor: "bg-emerald-50 dark:bg-emerald-900/30",
      borderColor: "border-emerald-100 dark:border-emerald-800",
    },
  ];

  return (
    <Layout>
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white/50 dark:bg-slate-900/50 border-b border-gray-100 dark:border-slate-800 backdrop-blur-sm">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] bg-size-[24px_24px] mask-[linear-gradient(to_bottom,white,transparent)] dark:mask-[linear-gradient(to_bottom,black,transparent)]" />
        
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-brand-50 dark:bg-brand-900/40 rounded-2xl mb-8 shadow-sm ring-1 ring-brand-100/50 dark:ring-brand-800/50">
              <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-brand-600 dark:text-brand-400" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
              About <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-600 to-cyan-500 dark:from-brand-400 dark:to-cyan-300">PaperVault</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              PaperVault is a modern platform built to help students easily find past
              examination papers from different universities and subjects, so
              they can prepare smarter and achieve better results.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20 pb-24 md:pb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Why we built this platform</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg md:text-xl">
            We understand the struggle of finding quality, authentic past papers right before exams. 
            Here is how we aim to make your academic journey smoother.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-800 overflow-hidden"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"
              />
              <div className="relative z-10">
                <div className={`inline-flex p-4 rounded-2xl mb-6 ${feature.bgColor} border ${feature.borderColor} shadow-sm transition-colors`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="max-w-7xl mx-auto px-6 pb-24 md:pb-32">
        <div className="bg-linear-to-br from-brand-600 via-brand-700 to-cyan-800 dark:from-brand-500 dark:via-brand-700 dark:to-cyan-900 rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl dark:shadow-[0_20px_50px_rgb(14,165,233,0.3)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-size-[24px_24px]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Ready to start preparing?</h2>
            <p className="text-brand-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Join students who are already using PaperVault to ace their exams and save valuable time.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-brand-700 bg-white rounded-2xl shadow-lg hover:bg-brand-50 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Explore Subjects <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}