import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="flex items-center text-sm text-slate-500 mb-6">
      <Link to="/" className="hover:text-blue-600 hover:underline">Home</Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <span className="mx-2">/</span>
          {item.path ? (
            <Link to={item.path} className="hover:text-blue-600 hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-700 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
