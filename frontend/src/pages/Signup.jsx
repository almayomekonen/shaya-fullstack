import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GeneralContext } from "../App";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const { snackbar, setIsLoading } = useContext(GeneralContext);
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
    } else if (!formData.fullName) {
      snackbar("Please provide FullName");
    } else if (!formData.password) {
      snackbar("Please provide a Password");
    } else if (!formData.username) {
      snackbar("Please provide a userName");
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/signup", {
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
      <h2>Signup 🗞️</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="fullname">
          FullName:
          <input
            type="text"
            id="fullname"
            name="fullName"
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor="email">
          E-Mail:
          <input
            type="text"
            id="email"
            name="email"
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor="username">
          userName:
          <input
            type="text"
            id="username"
            name="username"
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

        <button type="submit">Signup</button>
      </form>

      <p className="login-link">
        <Link to="/">Click here to login</Link>
      </p>
    </div>
  );
}
