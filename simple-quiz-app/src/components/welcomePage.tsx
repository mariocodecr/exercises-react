import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage: React.FC = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (name) {
      navigate('/quizPage', { state: { name } });
    } else {
      alert('Please enter your name');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white">
      <div className="bg-white rounded-lg shadow-lg p-10 text-center text-gray-800 w-96">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz!</h1>
        <p className="mb-6 text-lg">Enter your name to start:</p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <button
          onClick={handleStart}
          className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition-all duration-300"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
