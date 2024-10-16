import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/welcomePage";
import QuizPage from "./components/quizPage";
import LeaderboardPage from "./components/leaderBoardPage";

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/quizPage" element={<QuizPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </Router>
  )
}

export default App;