import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";


export const ProtectedRouteAdmin = ({children}) => {
    const {isLoggedIn, user, isLoading} = useContext(AuthContext);
    const location = useLocation();
    
    if (isLoading) return <div>Cargando...</div>;

    return isLoggedIn && user?.role === 'admin' ? children: <Navigate to="/auth/login" state={{from: location}} replace />
}