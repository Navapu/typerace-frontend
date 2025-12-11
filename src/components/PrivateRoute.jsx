import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext.jsx";

const PrivateRoute = ({children}) => {
    const { isLoggedIn, isLoading } = useContext(AuthContext);
    const location = useLocation();

    if (isLoading) return <div>Cargando...</div>;
    return isLoggedIn ? children : <Navigate to="/auth/login" state={{ from: location }} replace/>
}

export default PrivateRoute