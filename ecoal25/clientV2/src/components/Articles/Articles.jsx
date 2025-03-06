import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Articles.css";
import APP_URL from "../../constant.js";
import { useNavigate } from "react-router-dom";
import Search from "../Search/Search";

function Articles() {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [IsLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        fetchArticles();
        const token = localStorage.getItem('token');
        setIsLoggedIn(token);
    }, []);

    const handleSearchTitle = (title) => {
        axios.get(`http://127.0.0.1:8000/api/article/searchText/${title}`)
            .then(response => setArticles(response.data))
            .catch(error => console.error("Erreur de recherche par titre:", error));
    };

    const resetSearchTitle = () => {
        axios.get(`http://127.0.0.1:8000/api/article`)
            .then(response => setArticles(response.data))
            .catch(error => console.error("Erreur de recherche par titre:", error));
    };
    
    const handleSearchTag = (tagName) => {
        axios.get(`http://127.0.0.1:8000/api/article/search/${tagName}`)
            .then(response => setArticles(response.data))
            .catch(error => console.error("Erreur de recherche par tag:", error));
    };
    

    const fetchArticles = async (tag = "") => {
        setLoading(true);
        try {
            let url = "http://127.0.0.1:8000/api/article";
            if (tag) {
                url = `http://127.0.0.1:8000/api/article/search/${tag}`;
            }
            const response = await axios.get(url);
            setArticles(response.data);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handleSearch = (tag) => {
        fetchArticles(tag);
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

    function handleArticleClick($id) {
        navigate("/article/" + $id)
    }

    if (loading) return <p className="loading">Chargement...</p>;
    if (error) return <p className="error">Erreur : {error}</p>;

    return (
        <div className="home-container">
            <div className="arrow" onClick={() => navigate(-1)}>
             <box-icon name='left-arrow-alt' size="lg"></box-icon>
        </div>
            <header className="header">
                <h1>Articles</h1>
                {IsLoggedIn ? (
                <button className="add-article" onClick={() => navigate("/newarticle")}>
                    + Ajouter un article
                </button>
                ) : (
                    <></>
                )}
                
            </header>

            <Search onSearchTitle={handleSearchTitle} onSearchTag={handleSearchTag} onReset={resetSearchTitle} />

            <div className="articles-list">
                {articles.length > 0 ? (
                    articles.map((article) => (
                        <div
                            key={article.id}
                            className="article-card"
                            onClick={() => handleArticleClick(article.id)}
                        >
                            {article.mediaType === "image" && <img
                                src={APP_URL + article.mediaURL}
                                alt={article.mediaType || 'Article Media'}
                                className="article-image"
                            />}
                            {article.mediaType === "sound" && <audio controls className="article-image">
                                <source src={APP_URL + article.mediaURL} type="audio/mp3"/>
                            </audio>}

                            {article.mediaType === "video" && <video
                                controls className="article-image">
                                    <source  src={APP_URL + article.mediaURL} type="video/mp4" />
                                </video>}


                            <div className="article-content">
                                <h3>{article.title}</h3>
                                <p className="article-date">{formatDate(article.updated_at)}</p>
                                {article.tags && article.tags.length > 0 && (
                                    <div className="tags-container">
                                        {article.tags.map((tag) => (
                                            <span
                                                key={`${article.id}-${tag.id}`}
                                                className="tag"
                                                onClick={() => handleSearch(tag.name)}
                                            >
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
