import logo from './logo.svg';
import {Route, Routes, Link} from "react-router-dom";
import './App.css';
import Home from "./Home";

function App() {
  return (
      <>
        <div className="App">
        </div>
        <Routes>
            <Route path="/" element={<Home/>}/>
        </Routes>
      </>
  );
}

export default App;
