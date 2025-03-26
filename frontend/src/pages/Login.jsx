import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../App";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { snackbar, setIsLoading, setUser } = useContext(GeneralContext);

  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.email) {
      snackbar("Please provide an valid Email");
      return;
    }
    if (!formData.password) {
      snackbar("Please provide a Password");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const userData = await response.json();
      snackbar(`${userData.user.name} logged in successfully`);
      localStorage.setItem("token", userData.user.token);
      setUser(userData);
      console.log(userData);

      navigate("/");
    } catch (error) {
      console.log(error);
      snackbar(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="login smallframe">
      <h2>Login to view our news 🗞️</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          E-Mail:
          <input
            type="text"
            id="email"
            name="email"
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleInputChange}
          />
        </label>

        <button type="submit">Login</button>
      </form>

      <p className="signup-link">
        <Link to="/signup">Don't have an account yet?</Link>
      </p>
    </div>
  );
}
