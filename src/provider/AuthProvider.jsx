import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { apiClient } from '../services/apiClient.js';
import { setTokens, clearTokens, getRefreshToken, getAccessToken } from "../auth/tokens.js";
import { AuthContext } from '../context/AuthContext.jsx';
const getUser = () => {
    const localStorageUser = localStorage.getItem('user');
    return localStorageUser ? JSON.parse(localStorageUser) : null;
}

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(getUser());
    const isLoggedIn = user !== null;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        checkToken();
    }, []);

    const login = async (data) => {
        try{
            const response = await apiClient(`/auth/login`, {
                method: 'POST',
                body: JSON.stringify(data),
            });

            const res = await response.json();
            const responseData = res.data;

            if (!response.ok) throw new Error(res.msg || 'Login failed');
            
            
            const refreshToken = {
                refreshToken: responseData.refreshToken,
                refreshToken_id: responseData.refreshToken_id
            }

            setTokens(responseData.token, JSON.stringify(refreshToken));
            delete responseData.token;
            delete responseData.refreshToken;
            delete refreshToken.refreshToken_id;
            localStorage.setItem('user', JSON.stringify(responseData));

            setUser(responseData); 
            navigate('/');
        }catch(error){
            console.error("Login error:", error);
            throw error;
        }
    }

    const logout = async() => {
        try{
            const refreshToken = getRefreshToken();
            const refreshToken_id = refreshToken ? {refreshToken_id : JSON.parse(refreshToken).refreshToken_id} : "";

            if(!refreshToken_id) throw new Error('refreshToken_id required');
            
            const response = await apiClient('/auth/logout', {
                method: 'DELETE',
                body: JSON.stringify(refreshToken_id),
            });
            
            const res = await response.json()
            if(!response.ok) throw new Error(res.msg || 'Logout failed');
            
            clearTokens();
            navigate('/auth/login');

        }catch(error){
            console.error("Logout error:", error);
            throw error;
        }
    }

    const checkToken = async () => {
        try{
            setIsLoading(true);
            const acesstoken = getAccessToken();
            const refreshToken = getRefreshToken();
            const refreshToken_token = refreshToken ? {refreshToken : JSON.parse(refreshToken).refreshToken} : "";
            
            if(!acesstoken || !refreshToken){
                setUser(null);
                setIsLoading(false);
                return;
            }

            const response = await apiClient('/auth/refresh', {
                method: 'POST',
                body: JSON.stringify(refreshToken_token),
            })
            const res = await response.json();
            const responseData = res.data;
            if(!response.ok){
                setUser(null);
                setIsLoading(false);
                clearTokens();
                throw new Error(res.msg || 'CheckToken failed');
            }
            
            setTokens(responseData.accessToken, refreshToken);
            setUser(getUser());
            
            setIsLoading(false);
        }catch(error){
            console.error("checkToken error:", error);
            throw error;
        }
    }
    
    return (
        <AuthContext.Provider value={{ user, login, isLoggedIn, logout, checkToken, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;