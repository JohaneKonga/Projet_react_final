import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './pages/login.page';
import SignUp from './pages/auth.page';
import SearchList from './pages/SearchList';
import './App.css';
import HomePage from './pages/welcome.page';
import UserProfilePage from './pages/user.profils';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/search-list" element={<SearchList />} />
                    <Route path="/profile" element={<UserProfilePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
