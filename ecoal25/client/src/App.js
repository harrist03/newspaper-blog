import logo from './logo.svg';
import {Route, Routes, Link} from "react-router-dom";
import './App.css';
import Home from "./components/Articles/Articles";
import Login from "./components/login_page/Login";
import Articles from "./components/Articles/Articles";

function App() {
  return (
      <>
        <div className="App">
        </div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/articles" element={<Articles/>}/>
        </Routes>
      </>
  );
}

export default App;
