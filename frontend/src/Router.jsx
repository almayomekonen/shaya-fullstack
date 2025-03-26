import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Articles from "./Articles/Articles";
import ArticleEdit from "./Articles/ArticleEdit";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Articles />} />
      <Route path="/article/:id" element={<ArticleEdit />} />
    </Routes>
  );
}

export function RouterAuth() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
