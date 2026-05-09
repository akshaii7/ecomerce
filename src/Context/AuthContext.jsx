import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userData") || "null")
  );

  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem("userData") || "null");

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      setUser(storedUser);
      localStorage.setItem("loggedIn", "true");
      return true;
    }
    return false;
  };

  const signup = (name, email, password) => {
    const newUser = { name, email, password };
    localStorage.setItem("userData", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    localStorage.removeItem("loggedIn");
    setUser(null);  
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}