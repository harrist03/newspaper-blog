import logo from './logo.svg';
import {Route, Routes, Link} from "react-router-dom";
import './App.css';
import Home from "./Home/Home";
import Login from "./components/login_page/Login";

function App() {
  return (
      <>
        <div className="App">
        </div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
      </>
  );
}

export default App;
