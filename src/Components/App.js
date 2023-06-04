import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import $ from 'jquery';

import '../Components/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import Subjects from './Admin/Subjects'
import Sections from './Admin/Sections'
import Questions from './Admin/Questions'
import Login from './User/Login/Login'
import Signup from './User/Signup/Signup'
import Home from './User/Home/Home'
import About from './User/About/About'
import Services from './User/Services/Services'
import Contact from './User/Contact/Contact'
import StartTest from './User/StartTest/StartTest'

import NotFound from './User/NotFound/NotFound';


function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    $(".navbar-toggler").on("click", function () {
      $(this).toggleClass("active")
    })
  }, []);

  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          
        <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/starttest" element={<StartTest />} />

          <Route path="/admin" element={<Subjects />} />
          <Route path="/sections" element={<Sections />} />
          <Route path="/questions" element={<Questions />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
