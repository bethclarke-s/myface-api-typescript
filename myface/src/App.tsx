import React from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, Navigate } from 'react-router-dom';
import Users from './Users.tsx'
import Posts from './Posts.tsx'
import './App.css'
import UserDetails from './UserDetails.tsx';

function App() {

  return (
    <>
    <BrowserRouter>
      <nav className="site-nav">
        <Link className="brand" to="/posts">
          <span className="logo">😎</span>
          <span className="wordmark">MyFace</span>
        </Link>
        <NavLink className="nav-link" to="/users">Users</NavLink>
        <NavLink className="nav-link" to="/posts">Posts</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </BrowserRouter>        
    </>
  )
}

export default App;
