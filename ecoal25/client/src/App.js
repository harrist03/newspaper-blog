import logo from './logo.svg';
import {Route, Routes, Link} from "react-router-dom";
import './App.css';
import Home from "./Home/Home";
import NewArticle from './components/Addarticle/NewArticle';
import Login from "./components/login_page/Login";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
      <>
          <NavBar/>
        <div className="App">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/newarticle" element={<NewArticle/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/articles" element={<Articles/>}/>
        </Routes>
      </>
  );
}

export default App;
