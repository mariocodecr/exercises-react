import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface QuestionType {
    question: string;
    answer: string;
    options: string[];
}

const QuizPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { name } = location.state || {};
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(60); // Temporizador inicial

    useEffect(() => {
        // Cargar preguntas
        setQuestions([
            {
                question: "What is 2 + 2?",
                options: ["3", "4", "5", "6"],
                answer: "4",
            },
            {
                question: "What is the capital of France?",
                options: ["Paris", "London", "Berlin"],
                answer: "Paris",
            },
            {
                question: "What is the capital of Germany?",
                options: ["Frankfurt", "London", "Berlin"],
                answer: "Berlin",
            },
            {
                question: "Which brand of car is from Japan?",
                options: ["BMW", "Ford", "Toyota", "Mercedes-Benz"],
                answer: "Toyota",
            },
            {
                question: "Which company created the iPhone?",
                options: ["Microsoft", "Google", "Apple", "Samsung"],
                answer: "Apple",
            },
            {
                question: "How many players are on a soccer (football) team on the field at once?",
                options: ["9", "10", "11", "12"],
                answer: "11",
            },
            {
                question: "Who was the first President of the United States?",
                options: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "John Adams"],
                answer: "George Washington",
            },
            {
                question: "Who is known as the King of Pop?",
                options: ["Elvis Presley", "Michael Jackson", "Prince", "Freddie Mercury"],
                answer: "Michael Jackson",
            },
            {
                question: "Which movie features a character named Jack Dawson?",
                options: ["Titanic", "Avatar", "The Great Gatsby", "Inception"],
                answer: "Titanic",
            },
            {
                question: "Who wrote Romeo and Juliet?",
                options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
                answer: "William Shakespeare",
            },
        ]);
    }, []);

    useEffect(() => {
        // Reiniciar el temporizador con cada nueva pregunta
        setTimer(60); 

        // Disminuir el temporizador cada segundo
        const intervalId = setInterval(() => {
            setTimer((prev) => {
                if (prev === 1) {
                    handleNextQuestion(); // Mover a la siguiente pregunta si el temporizador llega a 0
                }
                return prev - 1;
            });
        }, 1000);

        // Limpiar el intervalo cuando cambie la pregunta o se desmonte el componente
        return () => clearInterval(intervalId);
    }, [currentQuestionIndex]);

    const handleAnswerSelect = (answer: string) => {
        setSelectedAnswer(answer);
        if (answer === questions[currentQuestionIndex].answer) {
            setScore(score + 1); // Aumentar la puntuación si la respuesta es correcta
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        } else {
            navigate("/leaderboard", { state: { name, score } }); // Navegar a la página de clasificación cuando se complete el cuestionario
        }
    };

    if (!name) {
        return <div>Please provide your name to take the quiz.</div>;
    }

    if (questions.length === 0) {
        return <div>Loading questions...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div>
            <h1>Welcome, {name}!</h1>
            <h2>{currentQuestion.question}</h2>
            <p>Time remaining: {timer} seconds</p>
            <div>
                {currentQuestion.options.map((answer) => (
                    <button
                        key={answer}
                        className={`answer ${selectedAnswer === answer ? "selected" : ""}`}
                        onClick={() => handleAnswerSelect(answer)}
                    >
                        {answer}
                    </button>
                ))}
            </div>
            <button onClick={handleNextQuestion}>
                {currentQuestionIndex + 1 === questions.length ? "Finish Quiz" : "Next Question"}
            </button>
        </div>
    );
};

export default QuizPage;
