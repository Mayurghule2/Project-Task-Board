import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo
} from "lucide-react";

const links = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Projects", path: "/projects", icon: FolderKanban },
  { name: "Tasks", path: "/tasks", icon: ListTodo }
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-2xl p-6">
      <h1 className="text-2xl font-bold tracking-wide mb-10">
        Task Board
      </h1>

      <nav className="space-y-3">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-white text-blue-700 font-semibold"
                    : "hover:bg-blue-800"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}