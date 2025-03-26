import { useEffect, useState, useContext } from "react";
import "./Articles.css";
import { GeneralContext } from "../App";
import { clearAuth, getValidToken } from "../../utils/tokenService";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete, AiFillEdit, AiFillSetting } from "react-icons/ai";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const { setIsLoading, setUser } = useContext(GeneralContext);

  useEffect(() => {
    const token = getValidToken();
    if (!token) {
      navigate("/");
      setUser(null);
      console.log("Token is missing");
      return;
    }

    async function fetchArticles() {
      const token = getValidToken();

      if (!token) {
        navigate("/");
        return;
      }
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:4000/news/articles", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.status === 401) {
          clearAuth();
          setUser(null);
          navigate("/");
          return;
        }

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }

        const articlesNews = await response.json();
        setArticles(articlesNews);
        console.log(articlesNews);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticles();
  }, [setIsLoading, navigate, setUser]);

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>CreatedAt</th>
          <th>PublishedAt</th>
          <th>Views</th>
          <th>
            <AiFillSetting />
          </th>
        </tr>
      </thead>

      <tbody>
        {articles.map((a, index) => (
          <tr key={a.id}>
            <td>{index + 1}</td>
            <td>{a.title}</td>
            <td>{a.createdAt}</td>
            <td>{a.publishedAt}</td>
            <td>{a.views}</td>

            <td>
              <button className="red">
                <AiFillDelete />
              </button>
              <Link to={"/article/2pac"}>
                <button className="green">
                  <AiFillEdit />
                </button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
