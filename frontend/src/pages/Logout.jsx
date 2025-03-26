import { useContext } from "react";
import { GeneralContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { user, snackbar, setUser, setIsLoading } = useContext(GeneralContext);
  const navigate = useNavigate();

  function handleLogout() {
    setIsLoading(true);

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setUser(null);

      snackbar(`${user.user.name} has logged out`);
      setIsLoading(false);
      navigate("/");
    }, 500);
  }
  return (
    <div className="user">
      Welcome ☺️ {`${user.user.name}`} good to have you back!
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
