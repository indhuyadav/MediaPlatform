import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/news";

function App() {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  
  const fetchNews = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch news");
      const data = await res.json();
      setNews(data);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  
  const addNews = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) throw new Error("Failed to add news");

      const newArticle = await res.json();
      setNews((prevNews) => [...prevNews, newArticle]);

      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Error adding news:", err);
    } finally {
      setLoading(false);
    }
  };


  const deleteNews = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news item?")) return;

    try {
      console.log("Deleting news with ID:", id); 

      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Failed to delete news");

      
      setNews((prevNews) => prevNews.filter((article) => article._id !== id));
    } catch (err) {
      console.error("Error deleting news:", err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1>News Articles</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        ></textarea>
        <button
          onClick={addNews}
          style={{
            padding: "8px 16px",
            background: loading ? "gray" : "purple",
            color: "white",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add News"}
        </button>
      </div>

      <h2>All News</h2>
      <div>
        {news.length === 0 ? (
          <p>No news available</p>
        ) : (
          news.map((article) => (
            <div key={article._id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0" }}>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <button
                onClick={() => deleteNews(article._id)}
                style={{
                  padding: "5px 10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
