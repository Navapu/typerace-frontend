import { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { set } from "zod";
import { AuthContext } from "../context/AuthContext.jsx";

const loginSchema = z.object({
  email: z.email("Email no válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const Login = () => {
  const { login, error } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values) => {
    try {
      await login(values);
    } catch (err) {
      set(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E2A38] px-4">
      <div className="max-w-md w-full bg-[#334155] rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center text-center mb-6">
          <h1 className="text-3xl font-bold text-[#F8FAFC] text-center">TypeRace</h1>
          <img
            src="/src/assets/logo.png"
            alt="TypeRace Logo"
            className="w-25 h-25 bounce-animation"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-gray-100 mb-2">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              {...register("email")}
              className={`w-full px-4 py-3 rounded-lg bg-[#1E2A38] text-gray-100 border ${
                errors.email ? "border-orange-500" : "border-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && (
              <p className="text-orange-500 mt-1 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-100 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className={`w-full px-4 py-3 rounded-lg bg-[#1E2A38] text-gray-100 border ${
                errors.password ? "border-orange-500" : "border-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.password && (
              <p className="text-orange-500 mt-1 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors duration-200 disabled:opacity-50"
          >
            Login
          </button>

          {/* Error general */}
          {error && (
            <p className="text-orange-500 text-center mt-2">
              {error instanceof Error ? error.message : "Error desconocido"}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
