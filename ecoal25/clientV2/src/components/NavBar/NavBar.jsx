import { Link } from "react-router-dom";
import Login from "../Login/Login";
import 'boxicons'
import styles from './NavBar.module.css'
import { useEffect, useState } from "react";

function NavBar() {
    const [pressed, setPressed] = useState(false);
    const [IsLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(token);
    }, []);

    function handleClick() {
        setPressed(!pressed);
    }

    function handleLogout() {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        handleClick();
    }

    return (
        <>
            <div className={styles.burger}>
                <box-icon onClick={handleClick} name={pressed ? "x" : "menu"} size={'lg'} color={pressed ? '#ffffff' : "#000000"}></box-icon>
            </div>
            <div>
                <nav className={`${styles.navbar} ${pressed ? styles.open : ""}`}>
                    <ul>
                        <li>
                            <Link onClick={handleClick} to="/">Home</Link>
                        </li>

                        <li>
                            <Link onClick={handleClick} to="/article">Articles</Link>
                        </li>

                        {IsLoggedIn ? (
                            <>
                                <li>
                                    <Link onClick={handleLogout}>Logout</Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link onClick={handleClick} to="/login">Login / Register</Link>
                            </li>
                        )}
                        
                        {IsLoggedIn && (
                            <li>
                                <Link onClick={handleClick} to="/newarticle">Create Article</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default NavBar
