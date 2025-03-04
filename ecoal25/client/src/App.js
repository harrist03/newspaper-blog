import logo from './logo.svg';
import {Route, Routes, Link} from "react-router-dom";
import './App.css';
import Home from "./Home/Home";
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

      </>
  );
}

export default App;
