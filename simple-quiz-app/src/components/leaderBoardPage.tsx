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

        // Si existen `name` y `score`, intentamos agregar o actualizar al jugador
        if (name && score !== undefined) {
            const existingPlayerIndex = storedLeaders.findIndex(player => player.name === name);

            if (existingPlayerIndex >= 0) {
                // Si el jugador ya existe, actualizamos el puntaje solo si es mayor
                if (storedLeaders[existingPlayerIndex].score < score) {
                    storedLeaders[existingPlayerIndex].score = score;
                }
            } else {
                // Si el jugador no existe, lo agregamos a la lista
                storedLeaders.push({ name, score });
            }

            // Ordenamos y guardamos los líderes
            const sortedLeaders = storedLeaders.sort((a, b) => b.score - a.score);
            saveLeadersToLocalStorage(sortedLeaders);
            setLeaders(sortedLeaders);
        } else {
            // Si no hay nuevo jugador, solo cargamos los líderes almacenados
            setLeaders(storedLeaders);
        }

        // Verificar si se alcanzó el mínimo de jugadores (3)
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
