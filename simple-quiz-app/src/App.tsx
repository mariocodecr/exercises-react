import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>welcomePage</h1>} />
        <Route path="/" element={<h1>quizPage</h1>} />
      </Routes>
    </Router>
  )
}

export default App;