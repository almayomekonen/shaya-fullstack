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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) {
      return;
    }

    const token = getValidToken();
    if (!token) {
      navigate("/");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:4000/news/articles/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

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

      // Remove the deleted article from the state
      setArticles(articles.filter((article) => article.id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="articles-container">
      <div className="articles-header">
        <h2>Articles Management</h2>
        <Link to="/article/new">
          <button className="add-article-btn">Add New Article</button>
        </Link>
      </div>

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
          {articles.map((article, index) => (
            <tr key={article.id}>
              <td>{index + 1}</td>
              <td>{article.title}</td>
              <td>{new Date(article.createdAt).toLocaleDateString()}</td>
              <td>
                {article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString()
                  : "-"}
              </td>
              <td>{article.views}</td>

              <td className="action-buttons">
                <button
                  className="red"
                  onClick={() => handleDelete(article.id)}
                >
                  <AiFillDelete />
                </button>
                <Link to={`/article/${article.id}`}>
                  <button className="green">
                    <AiFillEdit />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
          {articles.length === 0 && (
            <tr>
              <td colSpan="6" className="no-articles">
                No articles found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
