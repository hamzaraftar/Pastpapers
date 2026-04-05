import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-500 dark:bg-blue-700 text-gray-300 ">
      <div className="max-w-6xl mx-auto px-6 py-7">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* App Name */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold text-white">PaperVault</h2>
            <p className="text-md text-white mt-1">
              A platform that helps students easily find past papers for
              different courses and prepare more effectively for exams.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-6 text-sm">
            <Link to="/" className="hover:text-gray-200 text-white transition">
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-gray-200 text-white transition"
            >
              About
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 text-white text-lg">
            <a
              href="https://github.com/hamzaraftar"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/hamzaraftar/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="mailto:hamzaraftar765@gmail.com"
              className="hover:text-gray-200 transition"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-4 pt-4 text-center text-sm text-white">
          © {new Date().getFullYear()} PaperVault. Built with ❤️ by{" "}
          <span className="text-white font-bold">Hamza Asghar</span>
        </div>
      </div>
    </footer>
  );
}
