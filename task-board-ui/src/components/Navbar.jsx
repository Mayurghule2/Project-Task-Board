import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center rounded-2xl">
      <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl w-80">
        <Search size={18} />
        <input
          className="bg-transparent outline-none w-full"
          placeholder="Search tasks..."
        />
      </div>

      <div className="flex items-center gap-4">
        <Bell className="text-slate-600" />
        <UserCircle2 size={34} className="text-blue-700" />
      </div>
    </header>
  );
}