import { NavLink } from "react-router";
import { useContext, useState, useEffect, useRef  } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { FaUserCircle } from "react-icons/fa";
import { Dropdown } from "./Dropdown.jsx";
export const Navigation = () => {
    const {isLoggedIn, user, logout} = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }};
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
  
    return(
        <nav>
            <ul>
                <li className="bg-[#3B82F6]  text-white rounded-3xl pt-2 pb-2 pr-4 pl-4 transition-colors duration-200">   
                    {isLoggedIn ? 
                    <div>
                        <button className="flex items-center gap-3 cursor-pointer" onClick={toggleMenu}> 
                            <FaUserCircle size={20} />{user.username} 
                        </button>
                        {isMenuOpen && 
                        <div ref={dropdownRef}>
                            <Dropdown onLogout={logout} />
                        </div>}
                    </div>        
            
                    : 
                    
                    <NavLink to='/auth/login' className="flex items-center gap-3"> <FaUserCircle size={20}/> Login
                    
                    </NavLink>}
                </li>
            </ul>
        </nav>
    )
}