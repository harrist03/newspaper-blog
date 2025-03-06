import './Home.css';
import logo from '../../assets/logo/Logo.png';
import { Link } from "react-router-dom"

function Home() {
    return (
        <div className="home-page">
            <div className="logo">
                <h1>Welcome to </h1>
                <img src={logo} alt="logo" />
            </div>
            <div className='underline'></div>
            <div className='main-page'>
                <h2>Latest Articles</h2>
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