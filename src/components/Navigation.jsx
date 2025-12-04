import { NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export const Navigation = () => {
    const {isLoggedIn, user, logout} = useContext(AuthContext);

    return(
        <nav>
            <ul>
                <li className="bg-orange-500 text-white rounded pt-1 pb-1 pr-3 pl-3 transition-colors duration-200 hover:bg-white hover:text-orange-500">
                    {isLoggedIn ? <NavLink to="/" onClick={logout}> {user.username} </NavLink> : <NavLink to='/auth/login'>Login</NavLink>}
                </li>
            </ul>
        </nav>
    )
}