import { useState } from 'react';
import { useNavigate } from 'react-router';
import { apiClient } from '../services/apiClient.js';
import { setTokens } from "../auth/tokens.js";
import { AuthContext } from '../context/AuthContext.jsx';

const getUser = () => {
    const localStorageUser = localStorage.getItem('user');
    return localStorageUser ? JSON.parse(localStorageUser) : null;
}

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(getUser());
    const navigate = useNavigate();
    
    const login = async (data) => {
        try{
            const response = await apiClient(`/auth/login`, {
                method: 'POST',
                body: JSON.stringify(data),
            });

            const res = await response.json();
            const responseData = res.data;

            if (!response.ok) {
                throw new Error(res.msg || 'Login failed');
            }
            console.log(responseData.token);
            setTokens(responseData.token, responseData.refreshToken);
            delete responseData.token;
            delete responseData.refreshToken;
            localStorage.setItem('user', JSON.stringify(responseData));

            setUser(responseData); 
            navigate('/');
        }catch(error){
            console.error("Login error:", error);
        }
    }
    
    return (
        <AuthContext.Provider value={{ user, login }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;