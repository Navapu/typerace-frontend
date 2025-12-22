import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { apiClient } from "../services/apiClient.js";
import { useState } from "react";

const insertTextSchema = z.object({
  content: z
    .string()
    .min(250, "The text must be at least 250 characters long"),

  difficulty: z.enum(["easy", "medium", "hard"], {
    errorMap: () => ({
      message: "Difficulty must be easy, medium or hard",
    }),
  }),

  language: z.enum(["es", "en"], {
    errorMap: () => ({
      message: "Language must be es or en",
    }),
  }),
});

export const AdminInsertText = () => {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(insertTextSchema),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      setError(null);
      setMsg("");

      const response = await apiClient("/texts/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.msg || "Insert text failed");
      }

      setMsg("Text inserted successfully ✅");
      reset();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0F172A] px-4 overflow-hidden">
      {/* Blobs */}
      <div className="absolute -top-32 -right-32 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg bg-[#1E293B] rounded-2xl shadow-lg shadow-black/30 border border-white/5 p-8">
        <h1 className="text-3xl font-bold text-[#F8FAFC] text-center mb-8">
          Insert New Text
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Content */}
          <div>
            <label className="block text-gray-200 mb-2">Content</label>
            <textarea
              placeholder="Write the text here..."
              {...register("content")}
              rows={6}
              className={`w-full px-4 py-3 rounded-xl bg-[#0F172A] text-gray-100 border ${
                errors.content ? "border-orange-500" : "border-white/10"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner`}
            />
            {errors.content && (
              <p className="text-orange-400 mt-1 text-sm">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-gray-200 mb-2">Difficulty</label>
            <select
              {...register("difficulty")}
              className={`w-full px-4 py-3 rounded-xl bg-[#0F172A] text-gray-100 border ${
                errors.difficulty ? "border-orange-500" : "border-white/10"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            {errors.difficulty && (
              <p className="text-orange-400 mt-1 text-sm">
                {errors.difficulty.message}
              </p>
            )}
          </div>

          {/* Language */}
          <div>
            <label className="block text-gray-200 mb-2">Language</label>
            <select
              {...register("language")}
              className={`w-full px-4 py-3 rounded-xl bg-[#0F172A] text-gray-100 border ${
                errors.language ? "border-orange-500" : "border-white/10"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select language</option>
              <option value="es">Spanish</option>
              <option value="en">English</option>
            </select>
            {errors.language && (
              <p className="text-orange-400 mt-1 text-sm">
                {errors.language.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Insert Text"}
          </button>

          {/* Feedback */}
          {msg && (
            <div className="bg-green-500/20 border border-green-400/30 text-green-300 p-3 rounded-xl text-center">
              {msg}
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-400/30 text-red-300 p-3 rounded-xl text-center">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
