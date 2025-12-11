import { NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { FaUserCircle } from "react-icons/fa";

export const Navigation = () => {
    const {isLoggedIn, user, logout} = useContext(AuthContext);

    return(
        <nav>
            <ul>
                <li className="bg-[#3B82F6]  text-white rounded-3xl pt-2 pb-2 pr-4 pl-4 transition-colors duration-200 hover:bg-white hover:text-[#3B82F6]">
                    {isLoggedIn ? 
                    
                    <NavLink to="/" onClick={logout} className="flex items-center gap-3"> 
                        <FaUserCircle size={20} />{user.username} 
                    </NavLink> : 
                    
                    <NavLink to='/auth/login' className="flex items-center gap-3"> <FaUserCircle size={20}/> Login</NavLink>}
                </li>
            </ul>
        </nav>
    )
}