import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Sun, Moon, Search, X } from "lucide-react";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim() !== "") {
      console.log(searchQuery);

      navigate(`/pastpapers?search=${searchQuery}`);
      
      setSearchQuery("");
      setShowSearch(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-header relative transition-colors duration-500">

      <div className="absolute inset-0 bg-brand-500/5 dark:bg-brand-500/10 h-1"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-20 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">

            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-linear-to-br from-brand-500 to-brand-700 dark:from-brand-400 dark:to-brand-600 text-white font-bold text-xl shadow-lg transition-all duration-300">

              <BookOpen className="w-5 h-5 absolute opacity-0 group-hover:opacity-100 transition-opacity" />

              <span className="tracking-tighter group-hover:opacity-0 transition-opacity">
                PV
              </span>

            </div>

            <span className="text-2xl font-extrabold tracking-tight text-slate-800 dark:text-white hidden sm:block">
              PaperVault
            </span>

          </Link>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl"
          >
            <div className="flex w-full items-center bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2">

              <Search className="w-4 h-4 text-slate-500 mr-2" />

              <input
                type="text"
                placeholder="Search papers, courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-slate-700 dark:text-white"
              />

              <button
                type="submit"
                className="ml-2 px-4 py-1.5 rounded-lg bg-brand-600 text-white text-sm hover:bg-brand-700 cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-2">

            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

          </div>

          {/* Mobile Icons */}
          <div className="md:hidden flex items-center gap-2">

            {/* Search Icon */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {showSearch ? <X size={20} /> : <Search size={20} />}
            </button>

            {/* Dark Mode */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

          </div>

        </div>

      </div>

      {/* Mobile Search */}
      {showSearch && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800">

          <form
            onSubmit={handleSearch}
            className="px-4 py-4 flex gap-2"
          >

            <input
              type="text"
              placeholder="Search papers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-white outline-none"
            />

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-brand-600 text-white"
            >
              Search
            </button>

          </form>

        </div>
      )}
    </header>
  );
}