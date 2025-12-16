import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
export const WelcomeCard = () => {
    const {user} = useContext(AuthContext);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#1E293B] p-6 shadow-lg shadow-black/30 border border-white/5 m-3">
      
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between gap-6">
        
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">
            Welcome back,{" "}
            <span className="text-[#3B82F6]">{user?.username ?? "Player"}</span> 👋
          </h2>

          <button className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#3B82F6] px-5 py-2.5 text-white font-semibold hover:bg-[#60A5FA] transition shadow-md shadow-blue-500/20 cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
            Start a Race
            <span className="text-lg">⚡</span>
          </button>
        </div>

        {/* Icono / Ilustración
        <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-xl bg-[#0F172A] border border-white/10 shadow-inner">
          <img
            src="/src/assets/logo.png"
            alt="TypeRace logo"
            className="w-12 h-12 animate-pulse"
          />
        </div> */}
      </div>
    </div>
  );
};
