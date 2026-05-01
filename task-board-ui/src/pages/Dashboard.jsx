import { motion } from "framer-motion";

export default function Dashboard() {
  const stats = [
    { title: "Total Projects", value: 12 },
    { title: "Open Tasks", value: 48 },
    { title: "Completed", value: 31 },
    { title: "Overdue", value: 6 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-slate-800">
        Dashboard
      </h2>

      <div className="grid md:grid-cols-4 gap-5">
        {stats.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl shadow p-5 hover:-translate-y-1 transition"
          >
            <p className="text-slate-500">{item.title}</p>
            <h3 className="text-3xl font-bold text-blue-700 mt-2">
              {item.value}
            </h3>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}