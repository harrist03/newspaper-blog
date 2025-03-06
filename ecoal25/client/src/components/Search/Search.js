import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [query, setQuery] = useState('');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (query.length > 2) {
            setLoading(true);
            axios.get(`http://127.0.0.1:8000/api/article?search=${query}`)
                .then((response) => {
                    setArticles(response.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        } else {
            setArticles([]);
        }
    }, [query]);

    return (
        <div className="search-container">
            <input 
                type="text" 
                placeholder="Search for an article..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                className="search-input"
            />
            {loading && <p>Loading...</p>}
            {error && <p className="error">Error : {error}</p>}
            <div className="search-results">
                {articles.length > 0 ? (
                    articles.map((article) => (
                        <div key={article.id} className="search-item" onClick={() => navigate(`/article/${article.id}`)}>
                            <h3>{article.title}</h3>
                            <p>{article.excerpt || 'Without any available description'}</p>
                        </div>
                    ))
                ) : (
                    query.length > 2 && <p>No article found</p>
                )}
            </div>
        </div>
    );
}

export default Search;