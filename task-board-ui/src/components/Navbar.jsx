import { Bell, Search, Plus, UserCircle2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm px-6 py-4 rounded-2xl flex justify-between items-center">
      <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl w-80">
        <Search size={18} />
        <input
          placeholder="Search..."
          className="bg-transparent outline-none w-full"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-800 transition">
          <Plus size={18} />
          New Task
        </button>

        <Bell className="text-slate-600" />
        <UserCircle2 size={34} className="text-blue-700" />
      </div>
    </header>
  );
}