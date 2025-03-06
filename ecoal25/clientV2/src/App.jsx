import {Route, Routes, Link} from "react-router-dom";
import './App.css';
import Home from "./components/Home/Home";
import NewArticle from './components/Addarticle/NewArticle';
import Login from "./components/Login/Login";
import NavBar from "./components/NavBar/NavBar";
import Article from "./components/Article/Article";
import Register from "./components/Register/Register";
import Articles from "./components/Articles/Articles";
function App() {
    return (
        <>
            <NavBar/>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/article" element={<Articles/>}/>
                    <Route path="/article/:id" element={<Article/>}/>
                    <Route path="/newarticle" element={<NewArticle/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;
