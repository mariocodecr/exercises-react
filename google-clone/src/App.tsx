import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SearchResults from './components/SearchResults';

import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<SearchResults />} />
      </Routes>
    </Router>
  )
}

export default App;