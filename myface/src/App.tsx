import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Users from './Users.tsx'
import Posts from './Posts.tsx'
import './App.css'

function App() {

  // fetch("http://localhost:3001/posts").then(response => response.json()).then(data => console.log(data));

  return (
    <>
    <BrowserRouter>
      <nav>
        <Link to="/users">Users</Link> {" "} | {" "}
        <Link to="/posts">Posts</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />
        <Route path="/users" element={<Users />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </BrowserRouter>        
    </>
  )
}

export default App;
