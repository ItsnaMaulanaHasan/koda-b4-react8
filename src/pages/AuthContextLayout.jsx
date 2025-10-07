import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";

export function AuthContextProvider({ children }) {
  const [dataLogin, setDataLogin] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const users = JSON.parse(window.localStorage.getItem("users") || "[]");
    if (dataLogin && users.length > 0) {
      const isValidLogin = users.findIndex(
        (user) =>
          user.email === dataLogin.email && user.password === dataLogin.password
      );
      if (isValidLogin !== -1) {
        window.localStorage.setItem("userLogin", JSON.stringify(dataLogin));
        navigate("/");
      }
    }
  }, [dataLogin, navigate]);
  const contextValue = {
    userLogin: dataLogin,
    setUserLogin: setDataLogin,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default function AuthContextLayout() {
  return (
    <AuthContextProvider>
      <Outlet />
    </AuthContextProvider>
  );
}
