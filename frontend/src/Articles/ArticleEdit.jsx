import { useState, useEffect } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getValidToken } from "../../utils/tokenService";

export default function ArticleEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    title: "",
    createdAt: "",
    publishedAt: "",
    views: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchArticle() {
      if (id && id !== "new") {
        setLoading(true);
        const token = getValidToken();

        if (!token) {
          navigate("/");
          return;
        }

        try {
          const response = await fetch(
            `http://localhost:4000/news/articles/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              credentials: "include",
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch article");
          }

          const data = await response.json();

          // Format dates for input fields
          // YYYY-MM-DDTHH:mm:ss.sssZ
          const formattedData = {
            ...data,
            createdAt: data.createdAt
              ? new Date(data.createdAt).toISOString().split("T")[0]
              : "",
            publishedAt: data.publishedAt
              ? new Date(data.publishedAt).toISOString().split("T")[0]
              : "",
          };

          setArticle(formattedData);
        } catch (err) {
          setError("Error loading article: " + err.message);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchArticle();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = getValidToken();
    if (!token) {
      navigate("/");
      return;
    }

    const url =
      id && id !== "new"
        ? `http://localhost:4000/news/articles/${id}`
        : "http://localhost:4000/news/articles";

    const method = id && id !== "new" ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(article),
      });

      if (!response.ok) {
        throw new Error("Failed to save article");
      }

      await response.json();
      navigate("/");
    } catch (err) {
      setError("Error saving article: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="article-edit">
      <button>
        <Link to={"/"}>
          <AiOutlineRight /> Go back to articles
        </Link>
      </button>

      <h2>{id && id !== "new" ? "Edit Article" : "Add New Article"}</h2>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={article.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Created At:
            <input
              type="date"
              name="createdAt"
              value={article.createdAt}
              onChange={handleChange}
            />
          </label>

          <label>
            Published At:
            <input
              type="date"
              name="publishedAt"
              value={article.publishedAt}
              onChange={handleChange}
            />
          </label>

          <label>
            Views:
            <input
              type="number"
              name="views"
              value={article.views}
              onChange={handleChange}
            />
          </label>

          <button type="submit" disabled={loading}>
            {id && id !== "new" ? "Update Article" : "Add Article"}
          </button>
        </form>
      )}
    </div>
  );
}
