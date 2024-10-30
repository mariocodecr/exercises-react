import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface LeaderboardEntry {
    name: string;
    score: number;
}

const Leaderboard: React.FC = () => {
    const location = useLocation();
    const { score, name } = location.state || {};

    const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
    const [isMinimumPlayersMet, setIsMinimumPlayersMet] = useState(false);

    const getLeadersFromLocalStorage = (): LeaderboardEntry[] => {
        const storedLeaders = localStorage.getItem('leaders');
        return storedLeaders ? JSON.parse(storedLeaders) : [];
    };

    const saveLeadersToLocalStorage = (updatedLeaders: LeaderboardEntry[]) => {
        localStorage.setItem('leaders', JSON.stringify(updatedLeaders));
    };

    useEffect(() => {
        const storedLeaders = getLeadersFromLocalStorage();

      // If `name` and `score` exist, we try to add or update the player
        if (name && score !== undefined) {
            const existingPlayerIndex = storedLeaders.findIndex(player => player.name === name);

            if (existingPlayerIndex >= 0) {
           // If the player already exists, we update the score only if it is higher
                if (storedLeaders[existingPlayerIndex].score < score) {
                    storedLeaders[existingPlayerIndex].score = score;
                }
            } else {
              // If the player does not exist, we add it to the list
                storedLeaders.push({ name, score });
            }

         // We sort and save the leaderss
            const sortedLeaders = storedLeaders.sort((a, b) => b.score - a.score);
            saveLeadersToLocalStorage(sortedLeaders);
            setLeaders(sortedLeaders);
        } else {
        // If there is no new player, we only load the stored leaders
            setLeaders(storedLeaders);
        }

      // Check if the minimum number of players has been reached (3)
        setIsMinimumPlayersMet(storedLeaders.length >= 3);
    }, [name, score]);

    return (
        <div>
            <h1>Leaderboard</h1>
            {isMinimumPlayersMet ? (
                <ul>
                    {leaders.map((entry, index) => (
                        <li key={index}>
                            {entry.name}: {entry.score} points
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Se necesitan al menos 3 jugadores para ver el leaderboard.</p>
            )}
        </div>
    );
};

export default Leaderboard;
