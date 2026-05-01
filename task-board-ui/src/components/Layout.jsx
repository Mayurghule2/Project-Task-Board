import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <div className="flex-1 ml-72">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}