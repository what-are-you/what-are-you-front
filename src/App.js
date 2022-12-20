import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignIn from './components/login';
import SignUp from './components/signup';
import React from 'react';

function App() {
    return (
        <>
            <Router basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route exact path="/" element={<SignIn />} />
                    <Route exact path="/signup" element={<SignUp />} />
                </Routes>
            </Router>
        </>
    )
}

export default App;
