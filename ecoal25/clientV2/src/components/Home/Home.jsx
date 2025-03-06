import './Home.css';
import logo from '../../assets/logo/Logo.png';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // fetch articles when component mounts
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/article');
                const sortedArticles = response.data.sort((a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
                setArticles(sortedArticles);
                setLoading(false);
            } catch (error) {
                setError("An error occurred while fetching articles");
                setLoading(false);
            }
        }
        fetchArticles();
    }, []);

    return (
        <div className="home-page">
            <div className="logo">
                <h1>Welcome to </h1>
                <img src={logo} alt="logo" />
            </div>
            <div className='underline'></div>
            <div className='main-page'>
                <h2>Latest articles</h2>
                {loading ? (
                    <p>Loading articles...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="articles-grid">
                        {articles.map(article => (
                            <div key={article.id} className="article-card">
                                {article.mediaURL && (
                                    <div className="article-image-container">
                                        <img
                                            src={`http://localhost:8000${article.mediaURL}`}
                                            alt={article.title}
                                            className="article-thumbnail"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="article-content">
                                    <h3>{article.title}</h3>
                                    <p>{article.content.substring(0, 100)}...</p>
                                    <Link to={`/article/${article.id}`} className="read-more">
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="view-all-articles">
                    <Link to="/article" className="view-all-btn">View All Articles</Link>
                </div>
            </div>
            <div className='footer-section'>
                <div className="footer-column">
                    <h3>Useful links</h3>
                    <ul>
                        <li><Link to="/article">Articles</Link></li>
                        <li><Link to="/newarticle">Publish an Article</Link></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Contact</h3>
                    <ul>
                        <li>studentlife@example.com</li>
                        <li>(123) 456-7890</li>
                    </ul>
                </div>
                <div className="copyright">
                    &copy; {new Date().getFullYear()} Newspaper Blog. All rights reserved.
                </div>
            </div>
        </div>
    )
}
export default Home;