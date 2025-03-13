const API_URL = "http://localhost:5000/api/news";


async function fetchNews() {
    const res = await fetch(API_URL);
    const news = await res.json();
    const container = document.getElementById("news-container");
    container.innerHTML = "";

    news.forEach((article) => {
        const div = document.createElement("div");
        div.className = "news-item";
        div.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <button onclick="deleteNews('${article._id}')">Delete</button>
        `;
        container.appendChild(div);
    });
}


async function addNews() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    if (!title || !description) {
        alert("Please fill in all fields.");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
    });

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    fetchNews();
}


async function deleteNews(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchNews();
}


window.onload = fetchNews;
