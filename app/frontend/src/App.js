import React from "react";
import axios from "axios";
import Clock  from "./pages/login";
import Posts from "./pages/posts";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="wrapper">
        <Routes>
          <Route exact path="/posts" element={<Posts/>} />
          <Route exact path="/login" element={<Clock/>} />

        </Routes>
    </div>
  );
}

export default App;