import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import './Article.css';

function Article(props) {
    const { id } = useParams(); // Récupère l'ID de l'URL
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/article/${id}`)
            .then(response => {
                setArticle(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("Article not found");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div>
            <div className="arrow" onClick={() => navigate(-1)}>
                <box-icon name='left-arrow-alt' size="lg"></box-icon>
            </div>
            <h1 onClick={() => navigate(-1)}>{article.title}</h1>
            <img src={article.mediaURL} alt={article.mediaType || "Article Image"}/>
            <p>{article.content}</p>
            <p>{article.tags.map(t => {
                return <span key={t.id}> {t.name}</span>
            })}</p>
        </div>
    );
}

export default Article;
