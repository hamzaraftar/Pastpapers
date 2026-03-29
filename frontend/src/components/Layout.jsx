import { Link } from "react-router-dom";
import Header from "./Header";
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* <Header /> */}
      {children}
    </div>
  );
}
