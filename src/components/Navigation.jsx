import { NavLink, useLocation  } from "react-router";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { FaUserCircle } from "react-icons/fa";
import { Dropdown } from "./Dropdown.jsx";
export const Navigation = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    useEffect(() => {
        const timer = setTimeout(() => setIsMenuOpen(false), 0);
        return () => clearTimeout(timer);
    }, [location.pathname]);
  return (
    <nav className="relative z-50">
      <ul>
        <li className="relative bg-[#3B82F6] text-white rounded-3xl px-4 py-2 transition-colors duration-200">
          {isLoggedIn ? (
            <div ref={dropdownRef} className="relative">
              <button
                className="flex items-center gap-3 cursor-pointer"
                onClick={toggleMenu}
              >
                <FaUserCircle size={20} />
                {user.username}
              </button>

              {isMenuOpen && (
                <div className="absolute left-0 mt-3 z-9999">
                  <Dropdown onLogout={logout} />
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/auth/login" className="flex items-center gap-3">
              <FaUserCircle size={20} />
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};