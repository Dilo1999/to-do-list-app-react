// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirstScreen from './Screen/FirstScreen';
import HomeScreen from './Screen/HomeScreen';
import AddListScreen from './Screen/AddListScreen'; // Import AddListScreen

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/add-todo" element={<AddListScreen />} /> {/* Add route for AddListScreen */}
      </Routes>
    </Router>
  );
}

export default App;
