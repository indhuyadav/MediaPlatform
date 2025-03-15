import PropTypes from "prop-types";

const NewsItem = ({ article, onDelete }) => {
  return (
    <div className="news-item">
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <button onClick={() => onDelete(article._id)}>Delete</button>
    </div>
  );
};

NewsItem.propTypes = {
  article: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NewsItem;
