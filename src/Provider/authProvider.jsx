import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../baseUrl";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("Protectedtoken") || "");
  const navigate = useNavigate();
  const loginAction = async (userData) => {
    try {
      const body = { emailId: userData.emailId, password: userData.password };
      const resp = await axios({
        method: "POST",
        url: baseUrl + "admin/login",
        data: body,
      });
      console.log(resp.data);
      if (resp.data) {
        setUser(resp.data.data);
        setToken(resp.data.data.token);
        localStorage.setItem("Protectedtoken", resp.data.data.token);
        navigate("/admin");
        return;
      }
      throw new Error(resp.data.errMsg);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("Protectedtoken");
    navigate("/admin/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};