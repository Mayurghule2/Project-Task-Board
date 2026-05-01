import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Filter,
  CalendarDays,
  AlertTriangle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [tasks, setTasks] = useState([]);

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (projectId) {
      loadTasks();
    }
  }, [projectId, status, priority, page]);

  const loadProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);

      if (res.data.length > 0) {
        setProjectId(res.data[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadTasks = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/projects/${projectId}/tasks`,
        {
          params: {
            status,
            priority,
            page,
            pageSize: 6
          }
        }
      );

      setTasks(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const badgeColor = (value) => {
    if (value === "Critical")
      return "bg-red-100 text-red-600";

    if (value === "High")
      return "bg-orange-100 text-orange-600";

    if (value === "Medium")
      return "bg-blue-100 text-blue-700";

    return "bg-slate-100 text-slate-600";
  };

  const statusColor = (value) => {
    if (value === "Done")
      return "bg-green-100 text-green-600";

    if (value === "Review")
      return "bg-purple-100 text-purple-600";

    if (value === "InProgress")
      return "bg-yellow-100 text-yellow-700";

    return "bg-slate-100 text-slate-600";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold text-slate-800">
          Task Board
        </h2>

        <p className="text-slate-500 mt-1">
          Track progress and manage work items.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <select
          value={projectId}
          onChange={(e) => {
            setProjectId(e.target.value);
            setPage(1);
          }}
          className="bg-white shadow rounded-xl px-4 py-3 outline-none"
        >
          {projects.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="bg-white shadow rounded-xl px-4 py-3 outline-none"
        >
          <option value="">All Status</option>
          <option value="Todo">Todo</option>
          <option value="InProgress">In Progress</option>
          <option value="Review">Review</option>
          <option value="Done">Done</option>
        </select>

        <select
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
            setPage(1);
          }}
          className="bg-white shadow rounded-xl px-4 py-3 outline-none"
        >
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>

        <div className="bg-blue-700 text-white rounded-xl px-4 py-3 flex items-center gap-2">
          <Filter size={18} />
          Filters Active
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-slate-500">
          Loading tasks...
        </div>
      ) : tasks.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center">
          No tasks found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {tasks.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow p-6"
            >
              <div className="flex justify-between gap-3 flex-wrap" onClick={() => navigate(`/tasks/${task.id}`)}
                className="bg-white rounded-2xl shadow p-6 cursor-pointer">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mt-5">
                {task.title}
              </h3>

              <p className="text-slate-500 mt-2 text-sm leading-6 min-h-[55px]">
                {task.description || "No description"}
              </p>

              <div className="flex items-center gap-2 mt-5 text-sm text-slate-500">
                <CalendarDays size={16} />
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "No Due Date"}
              </div>

              {task.status !== "Done" &&
                task.dueDate &&
                new Date(task.dueDate) < new Date() && (
                  <div className="mt-4 flex items-center gap-2 text-red-500 text-sm">
                    <AlertTriangle size={16} />
                    Overdue
                  </div>
                )}
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex justify-end gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-white shadow px-4 py-2 rounded-xl disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="px-4 py-2 bg-blue-700 text-white rounded-xl">
          {page} / {totalPages}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="bg-white shadow px-4 py-2 rounded-xl disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}