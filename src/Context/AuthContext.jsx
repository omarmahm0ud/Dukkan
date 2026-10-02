import { createContext, useContext, useState } from "react";

var AuthContext = createContext();

export function AuthProvider({ children }) {
  var [token, setToken] = useState(localStorage.getItem("token"));
  var [username, setUsername] = useState(localStorage.getItem("username"));

  function login(newToken, newUsername) {
    localStorage.setItem("token", newToken);
    localStorage.setItem("username", newUsername);
    setToken(newToken);
    setUsername(newUsername);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUsername(null);
  }

  return (
    <AuthContext.Provider value={{ token, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
