import {Link} from "react-router-dom";
import Login from "../login_page/Login";
import 'boxicons'
import styles from './NavBar.module.css'
import {useState} from "react";

function NavBar() {
    let [pressed, setPressed] = useState(false);
    function handleClick(){
        setPressed(!pressed);
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
                    <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/login">Login / Register</Link>
                    </li>
                    <li>
                        <Link to="/article">Articles</Link>
                    </li>
                    <li>
                        <Link to="/newArticle">Create an article</Link>
                    </li>
                </ul>
            </nav>
        </div>
        </>
    )
}

export default NavBar
