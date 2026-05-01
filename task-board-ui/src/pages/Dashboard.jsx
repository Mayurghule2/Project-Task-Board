import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban,
  ListTodo,
  AlertTriangle,
  CheckCircle2,
  RefreshCw
} from "lucide-react";
import api from "../api";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/dashboard");
      setData(res.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Projects",
      value: data?.totalProjects || 0,
      icon: FolderKanban
    },
    {
      title: "Tasks",
      value: data?.totalTasks || 0,
      icon: ListTodo
    },
    {
      title: "Completed",
      value: data?.doneTasks || 0,
      icon: CheckCircle2
    },
    {
      title: "Overdue",
      value: data?.overdueTasks || 0,
      icon: AlertTriangle
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin">
          <RefreshCw size={34} className="text-blue-700" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow p-8 text-center">
        <p className="text-red-500 font-medium">{error}</p>

        <button
          onClick={loadDashboard}
          className="mt-4 bg-blue-700 text-white px-5 py-2 rounded-xl hover:bg-blue-800 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold text-slate-800">
          Dashboard Overview
        </h2>

        <p className="text-slate-500 mt-1">
          Manage projects, tasks and progress in one place.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-5">
        {cards.map((item, i) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 shadow hover:-translate-y-1 transition"
            >
              <div className="flex justify-between items-center">
                <p className="text-slate-500">{item.title}</p>

                <Icon size={22} className="text-blue-700" />
              </div>

              <h3 className="text-3xl font-bold text-slate-800 mt-4">
                {item.value}
              </h3>
            </motion.div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-bold text-lg mb-5 text-slate-800">
            Task Status Breakdown
          </h3>

          <ProgressRow
            title="Todo"
            value={data?.todoTasks || 0}
            total={data?.totalTasks || 1}
          />

          <ProgressRow
            title="In Progress"
            value={data?.inProgressTasks || 0}
            total={data?.totalTasks || 1}
          />

          <ProgressRow
            title="Review"
            value={data?.reviewTasks || 0}
            total={data?.totalTasks || 1}
          />

          <ProgressRow
            title="Done"
            value={data?.doneTasks || 0}
            total={data?.totalTasks || 1}
          />
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-bold text-lg text-slate-800 mb-5">
            Summary Insights
          </h3>

          <div className="space-y-4 text-sm">
            <div className="border-b pb-3 text-slate-600">
              Total active work items:{" "}
              <span className="font-semibold">
                {data?.totalTasks || 0}
              </span>
            </div>

            <div className="border-b pb-3 text-slate-600">
              Overdue tasks needing attention:{" "}
              <span className="font-semibold text-red-500">
                {data?.overdueTasks || 0}
              </span>
            </div>

            <div className="border-b pb-3 text-slate-600">
              Due within 7 days:{" "}
              <span className="font-semibold text-blue-700">
                {data?.dueWithin7Days || 0}
              </span>
            </div>

            <div className="text-slate-600">
              Completed tasks:{" "}
              <span className="font-semibold text-green-600">
                {data?.doneTasks || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProgressRow({ title, value, total }) {
  const percent = Math.round((value / total) * 100);

  return (
    <div className="mb-5">
      <div className="flex justify-between mb-2 text-sm">
        <span>{title}</span>
        <span>{value}</span>
      </div>

      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}