import { useEffect, useState } from "react";
import NewsItem from "./components/NewsItem";
import NewsForm from "./components/NewsForm";
import "./styles.css";

const API_URL = "http://localhost:5000/api/news";

const App = () => {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setNews(data);
  };

  const addNews = async (article) => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    });
    fetchNews();
  };

  const deleteNews = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchNews();
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div>
      <h1>News Articles</h1>
      <NewsForm onAdd={addNews} />
      <h2>All News</h2>
      <div id="news-container">
        {news.map((article) => (
          <NewsItem key={article._id} article={article} onDelete={deleteNews} />
        ))}
      </div>
    </div>
  );
};

export default App;
