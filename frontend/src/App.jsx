import React, { useEffect, useState } from "react";
import Logout from "./pages/Logout";
import { Router, RouterAuth } from "./Router";
import Loader from "./components/Loader";
import Snackbar from "./components/Snackbar";

// eslint-disable-next-line react-refresh/only-export-components
export const GeneralContext = React.createContext();

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");

  console.log(user);

  const snackbar = (text) => {
    setSnackBarText(text);
    setTimeout(() => setSnackBarText(""), 3000);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.log("Error parsing user from localstorage", error);
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <GeneralContext.Provider value={{ user, snackbar, setUser, setIsLoading }}>
      <div className="app">
        <h1>News Management 📰🗞️</h1>
        {user && <Logout />}
        <div className="frame">
          {user ? <Router /> : <RouterAuth />}
          {isLoading && <Loader />}
          {snackBarText && <Snackbar text={snackBarText} />}
        </div>
      </div>
    </GeneralContext.Provider>
  );
}
