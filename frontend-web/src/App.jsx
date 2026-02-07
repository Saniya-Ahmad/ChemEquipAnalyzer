import "./App.css";
import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [auth, setAuth] = useState({ username: "", password: "", isLoggedIn: false });

  const handleLogin = (username, password) => {
    setAuth({ username, password, isLoggedIn: true });
  };

  return (
    <>
      {auth.isLoggedIn ? (
        <Dashboard auth={auth} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}
