// Leaderboard.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';

interface LeaderboardEntry {
    name: string;
    score: number;
}

const Leaderboard: React.FC = () => {
    const location = useLocation();
    const { score, name } = location.state || {};

   // We simulate a list of leaders. In a real application, this would come from an API.
    const leaders: LeaderboardEntry[] = [
        { name: "Alice", score: 10 },
        { name: "Bob", score: 8 },
        { name: "Charlie", score: 6 },
        { name: "Daniel", score: 5 },
        { name: "Eva", score: 4 },
        { name: name, score: score }, // Add the current player to the leaderboard
    ];

// Sort leaders by score in descending order
    const sortedLeaders = leaders.sort((a, b) => b.score - a.score);

    return (
        <div>
            <h1>Leaderboard</h1>
            <ul>
                {sortedLeaders.map((entry, index) => (
                    <li key={index}>
                        {entry.name}: {entry.score} points
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
