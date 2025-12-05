import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";


const PublicRoute = ({children}) => {
    const {isLoggedIn, isLoading} = useContext(AuthContext);
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    if (isLoading) return <div>Cargando...</div>;

    return isLoggedIn ? <Navigate to={from} replace /> : children;
}

export default PublicRoute