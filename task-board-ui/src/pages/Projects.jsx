import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderKanban,
  Search,
  Plus,
  Trash2,
  X,
  CalendarDays
} from "lucide-react";
import api from "../api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [projects, search]);

  const createProject = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const payload = {
      name: form.get("name"),
      description: form.get("description")
    };

    try {
      await api.post("/projects", payload);
      setOpen(false);
      e.target.reset();
      loadProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this project permanently?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/projects/${id}`);
      loadProjects();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Projects
          </h2>
          <p className="text-slate-500 mt-1">
            Manage all projects from one workspace.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-800 transition"
        >
          <Plus size={18} />
          New Project
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow px-5 py-4 flex items-center gap-3">
        <Search size={18} className="text-slate-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full outline-none"
        />
      </div>

      {loading ? (
        <div className="text-center py-10 text-slate-500">
          Loading projects...
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center">
          <FolderKanban
            size={40}
            className="mx-auto text-blue-700 mb-4"
          />
          <p className="text-slate-600">
            No projects available.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredProjects.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow p-6"
            >
              <div className="flex justify-between items-start">
                <div className="bg-blue-100 text-blue-700 p-3 rounded-xl">
                  <FolderKanban size={20} />
                </div>

                <button
                  onClick={() => deleteProject(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mt-5">
                {item.name}
              </h3>

              <p className="text-slate-500 mt-2 text-sm leading-6 min-h-[60px]">
                {item.description || "No description"}
              </p>

              <div className="flex items-center gap-2 text-sm text-slate-500 mt-4">
                <CalendarDays size={16} />
                {new Date(item.createdAt).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {open && (
          <CreateModal
            close={() => setOpen(false)}
            submit={createProject}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CreateModal({ close, submit }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center px-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800">
            Create Project
          </h3>

          <button onClick={close}>
            <X />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <input
            name="name"
            required
            placeholder="Project name"
            className="w-full border rounded-xl px-4 py-3 outline-none"
          />

          <textarea
            name="description"
            rows="4"
            placeholder="Description"
            className="w-full border rounded-xl px-4 py-3 outline-none"
          />

          <button className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800 transition">
            Create Project
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}