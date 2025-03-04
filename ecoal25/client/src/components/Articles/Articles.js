import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Articles.css';
import {useNavigate} from 'react-router-dom';

function Articles() {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/article')
            .then((response) => {
                setArticles(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    if (loading) return <p className="loading">Chargement...</p>;
    if (error) return <p className="error">Erreur: {error}</p>;

    function handleClick() {
       navigate("/newarticle");
    }

    return (
        <div className="home-container">
            <header className="header">
                <h1>Articles</h1>
                <button className="add-article" onClick={handleClick} >+ Ajouter un article</button>
            </header>
            <div className="articles-list">
                {articles.length > 0 ? (
                    articles.map((article) => (
                        <div key={article.id} className="article-card">
                            {article.mediaURL && (
                                <img
                                    src={article.mediaURL}
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
                                            <span key={tag.id} className="tag">{tag.name}</span>
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



