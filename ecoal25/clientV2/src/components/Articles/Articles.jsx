import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Articles.css";
import Search from "../Search/Search";
import './Articles.css';
import {useNavigate} from 'react-router-dom';
import APP_URL from "../../constant.js";

function Articles() {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/article")
            .then((response) => {
                setArticles(response.data);
                setFilteredArticles(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Impossible de charger les articles. Vérifiez la connexion.");
                setLoading(false);
            });
    }, []);

    const handleSearch = (tagName) => {
        if (tagName === "") {
            setFilteredArticles(articles);
        } else {
            axios
                .get(`http://127.0.0.1:8000/api/search/${tagName}`)
                .then((response) => setFilteredArticles(response.data))
                .catch((err) => console.error("Erreur lors du filtrage:", err));
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    };

    const handleClick = () => navigate("/newarticle");
    const handleArticleClick = (id) => navigate("/article/" + id);

    if (loading) return <p className="loading">Chargement...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="home-container">
            <header className="header">
                <h1>Articles</h1>
                <button className="add-article" onClick={handleClick}>
                    + Ajouter un article
                </button>
            </header>

            <Search onSearch={handleSearch} />

            <div className="articles-list">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                        <div
                            key={article.id}
                            className="article-card"
                            onClick={() => handleArticleClick(article.id)}
                        >
                            {article.mediaURL && (
                                <img
                                    src={APP_URL+article.mediaURL}
                                    alt={article.mediaType || 'Article Image'}
                                    className="article-image"
                                />
                            )}
                            <div className="article-content">
                                <h3>{article.title}</h3>
                                <p className="article-date">{formatDate(article.updated_at)}</p>
                                {article.tags && article.tags.length > 0 && (
                                    <div className="tags-container">
                                        {article.tags.map((tag) => (
                                            <span key={tag.id} className="tag">
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-articles">Aucun article trouvé</p>
                )}
            </div>
        </div>
    );
}

export default Articles;
