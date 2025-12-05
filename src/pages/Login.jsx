import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { AuthContext } from "../context/AuthContext.jsx";

const loginSchema = z.object({
  email: z.email("Email no válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const Login = () => {
    const [error, setError] = useState(null);
  const { login, loginGoogle } = useContext(AuthContext);
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
      setError(err);
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
            <label className="block text-gray-100 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
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
            <label className="block text-gray-100 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
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

          <button onClick={loginGoogle} type="button" className="mt-2 bg-[#ffffff] text-[#444444] border border-[#cccccc] rounded-lg px-4 py-[14px] font-semibold cursor-pointer text-[15px] transition duration-200 flex items-center justify-center gap-[10px] w-full">
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" className="w-5 h-5"/> Continue with Google
          </button>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors duration-200 disabled:opacity-50 cursor-pointer"
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
