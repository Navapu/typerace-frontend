import { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { setTokens } from "../auth/tokens.js";
import { AuthContext } from "../context/AuthContext.jsx";
export const LoginGoogle = () => {
  const { getUserInformation } = useContext(AuthContext);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    const refreshToken = params.get("refreshToken");
    const refreshToken_id = params.get("refreshToken_id");

    setTokens(token, JSON.stringify({ refreshToken, refreshToken_id }));
    getUserInformation();
    navigate("/");
  }, [getUserInformation, params, navigate]);

  return <h2>Login ....</h2>;
};
