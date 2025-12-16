import { NavLink } from "react-router";
import { IoLogOut } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";

import { FaUser } from "react-icons/fa";

export const Dropdown = ({onLogout}) => {
  return (
    <ul className="absolute bg-white shadow-md rounded-lg mt-2 w-40 text-[#3B82F6]">
      <li className="py-2 px-2 hover:bg-[#3B82F6] hover:text-white transition-colors duration-300 ease-in-out rounded-md">
        <NavLink to="/dashboard" className="flex gap-1 items-center">
          <FaUser size={15}/> Dashboard
        </NavLink>
      </li>
      <li className="py-2 px-2 hover:bg-[#3B82F6] hover:text-white transition-colors duration-300 ease-in-out rounded-md">
        <NavLink to="/settings" className="flex gap-1 items-center">
          <IoSettings  size={15}/> Settings
        </NavLink>
      </li>
      <li className="py-2 px-2 hover:bg-[#3B82F6] hover:text-white transition-colors duration-300 ease-in-out flex gap-1 items-center cursor-pointer rounded-md" onClick={onLogout}>
        <IoLogOut size={20}/> Logout
      </li>
    </ul>
  );
};
