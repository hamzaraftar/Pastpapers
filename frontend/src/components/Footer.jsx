// import Link from "next/link";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-blue-500 dark:bg-blue-700 text-gray-300 ">
      <div className="max-w-6xl mx-auto px-6 py-3.5">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* App Name */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold text-white">PaperVault </h2>
            <p className="text-md text-white mt-1">
              A platform that helps students easily find past papers for different courses and prepare more effectively for exams.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-6 text-sm">
            <Link to="/" className="hover:text-gray-200   text-white transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-200   text-white transition">
              About
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t white-gray-700 mt-4 pt-4 text-center text-sm text-white">
          © {new Date().getFullYear()} PaperVault . Built with ❤️ by{" "}
          <span className="text-white font-medium">Hamza Asghar</span>
        </div>
      </div>
    </footer>
  );
}
