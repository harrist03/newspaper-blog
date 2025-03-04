import logo from './logo.svg';
import {Route, Routes, Link} from "react-router-dom";
import './App.css';
import Home from "./components/Home/Home";
import NewArticle from './components/Addarticle/NewArticle';
import Login from "./components/login_page/Login";
import NavBar from "./components/NavBar/NavBar";
import Articles from "./components/Articles/Articles";
import Article from "./components/Article/Article";

function App() {
  return (
      <>
          <NavBar/>
        <div className="App">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/article" element={<Articles/>}/>
                <Route path="/article/:id" element={<Article/>}/>
                <Route path="/newarticle" element={<NewArticle/>}/>
            </Routes>
        </div>
      </>
  );
}

export default App;
