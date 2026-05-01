import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarDays,
  MessageSquare,
  Send,
  Trash2,
  ArrowLeft
} from "lucide-react";
import api from "../api";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTask();
    loadComments();
  }, [id]);

  const loadTask = async () => {
    try {
      const res = await api.get(`/tasks/${id}`);
      setTask(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const res = await api.get(`/tasks/${id}/comments`);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      await api.post(`/tasks/${id}/comments`, {
        author: "Mayur",
        body: text
      });

      setText("");
      loadComments();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await api.delete(`/comments/${commentId}`);
      loadComments();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async () => {
    const confirmDelete = window.confirm(
      "Delete this task permanently?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/tasks/${id}`);
      navigate("/tasks");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-slate-500">
        Loading task...
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-center py-10 text-red-500">
        Task not found.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between gap-4 flex-wrap">
        <button
          onClick={() => navigate("/tasks")}
          className="bg-white shadow px-4 py-3 rounded-xl flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <button
          onClick={deleteTask}
          className="bg-red-500 text-white px-4 py-3 rounded-xl flex items-center gap-2"
        >
          <Trash2 size={18} />
          Delete Task
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              {task.title}
            </h2>

            <p className="text-slate-500 mt-2">
              {task.description || "No description"}
            </p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {task.priority}
            </div>

            <div className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
              {task.status}
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 text-slate-500">
          <CalendarDays size={16} />
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : "No Due Date"}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center gap-2 mb-5">
          <MessageSquare size={18} className="text-blue-700" />
          <h3 className="text-xl font-bold text-slate-800">
            Comments
          </h3>
        </div>

        <form
          onSubmit={addComment}
          className="flex gap-3 mb-6"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write comment..."
            className="flex-1 border rounded-xl px-4 py-3 outline-none"
          />

          <button className="bg-blue-700 text-white px-4 rounded-xl">
            <Send size={18} />
          </button>
        </form>

        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-slate-500 text-sm">
              No comments yet.
            </p>
          ) : (
            comments.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-4"
              >
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-800">
                      {item.author}
                    </p>

                    <p className="text-slate-600 mt-1 text-sm">
                      {item.body}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      deleteComment(item.id)
                    }
                    className="text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}