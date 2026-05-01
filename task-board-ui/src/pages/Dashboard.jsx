import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban,
  ListTodo,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import api from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setData(res.data);
    } catch {
      setData({
        totalProjects: 12,
        totalTasks: 48,
        overdueTasks: 6,
        doneTasks: 30,
        todoTasks: 10,
        inProgressTasks: 5,
        reviewTasks: 3
      });
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
                <Icon className="text-blue-700" size={22} />
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
            Recent Activity
          </h3>

          <div className="space-y-4">
            {[
              "Homepage redesign task updated",
              "New project created",
              "Task moved to review",
              "Comment added by admin"
            ].map((item, i) => (
              <div
                key={i}
                className="border-b pb-3 text-slate-600 text-sm"
              >
                {item}
              </div>
            ))}
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
          className="h-full bg-blue-600 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}