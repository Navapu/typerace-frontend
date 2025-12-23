import { NavLink } from "react-router";
import { IoLogOut, IoSettings } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";

export const Dropdown = ({ onLogout }) => {
  return (
    <ul className="w-48 rounded-xl bg-[#1E293B] border border-white/10 shadow-2xl shadow-black/50 p-1 text-gray-200">
      <li>
        <NavLink to='/play/random' className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-[#0F172A] transition-colors">
          <FaPlay size={16} className="text-[#3B82F6]"/>
          <span>Play</span>
        </NavLink>

        <NavLink to="/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-[#0F172A] transition-colors">
          <FaUser size={16} className="text-[#3B82F6]" />
          <span>Dashboard</span>
        </NavLink>
      </li>

      <li>
        <NavLink to="/settings" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-[#0F172A] transition-colors">
          <IoSettings size={18} className="text-[#3B82F6]" />
          <span>Settings</span>
        </NavLink>
      </li>

      <div className="my-1 h-px bg-white/10" />

      <li>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">
          <IoLogOut size={18} />
          <span>Logout</span>
        </button>
      </li>
    </ul>
  );
};
