import React from 'react'
import Home from './components/Home';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Register from './components/Register';

const App:React.FC = ()=> {
  return (
    <>
    <div className='App'>
    <Router>
        <Routes>
            <Route  path="/" element={<Home/>}/>
            <Route  path="/home" element={<Home/>}/>
            <Route  path="/register" element={<Register/>}/>
          </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;
