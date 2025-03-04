import logo from './logo.svg';
import {Route, Routes, Link} from "react-router-dom";
import './App.css';
import Home from "./Home/Home";
import NewArticle from './components/Addarticle/NewArticle';

function App() {
  return (
      <>
        <div className="App">
        </div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/newarticle" element={<NewArticle/>}/>
        </Routes>
      </>
  );
}

export default App;
