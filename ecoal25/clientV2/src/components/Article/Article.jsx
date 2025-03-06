import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import './Article.css';
import APP_URL from "../../constant.js";
import logo from '../../assets/logo/Logo.png';
import Destroy from "../Destroy/Destroy";

function Article(props) {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const [IsLoggedIn, setIsLoggedIn] = useState(false);

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

            const token = localStorage.getItem('token');
            setIsLoggedIn(token);
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-EN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div>
            <div className="arrow" onClick={() => navigate(-1)}>
                <box-icon name='left-arrow-alt' size="lg"></box-icon>
            </div>
            <div className="article-logo">
                <img src={logo} alt="logo"></img>
            </div>
            <div
                key={article.id}
                className="article"
                onClick={() => handleArticleClick(article.id)}>

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
                    <source src={APP_URL + article.mediaURL} type="video/mp4"/>
                </video>}
                <h1>{article.title}</h1>
                <p className="article-tag">{article.tags.map(t => {
                    return <span key={t.id}> #{t.name}</span>
                })}</p>
                <p className="date">{formatDate(article.updated_at)}</p>
                <p>{article.content}</p>
                {IsLoggedIn ? (
                <Destroy id={article.id} />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default Article;
