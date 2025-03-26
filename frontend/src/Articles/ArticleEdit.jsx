import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function ArticleEdit() {
  return (
    <div className="article-edit">
      <button>
        <Link to={"/"}>
          <AiOutlineRight /> Go back to articles
        </Link>
      </button>

      <form>
        <label htmlFor="">
          Title:
          <input type="text" />
        </label>
        <label htmlFor="">
          CreatedAt:
          <input type="text" />
        </label>
        <label htmlFor="">
          PublishedAt;
          <input type="text" />
        </label>
        <label htmlFor="">
          Views:
          <input type="text" />
        </label>

        <button>Add an article</button>
      </form>
    </div>
  );
}
