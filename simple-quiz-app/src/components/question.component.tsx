import React, {useState} from "react";
import Timer from "./timer.component";

interface QuestionProps {
    question: {
        question: string;
        options: string[];
        answer: string;
    }
    onNext: () => void;
}

const Question: React.FC<QuestionProps> = ({ question, onNext }) => {

    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleAnswer = () => {

        setIsCorrect(selectedOption === question.answer);
    }

    const handleNext = () => {

        setIsCorrect(null)
        setSelectedOption(null)
        onNext()
    }

    return (
        <div>
            <Timer time={60} onTimeUp={handleNext} />
            <h3>{question.question}</h3>
            <ul>
                {question.options.map((option) => (
                    <li key={option}>
                        <input type="radio"
                        name="answer"
                        value={option}
                        onChange={() => setSelectedOption(option)}
                        checked={selectedOption === option}
                         />
                         {option}
                    </li>
                ))}
            </ul>
            <button onClick={handleAnswer}>Submit Answer</button>
            {isCorrect !== null && (
                <div>{isCorrect ? 'correct!' : 'Wrong answer.'}</div>
            )}
            <button onClick={handleNext}>Next Question</button>
        </div>
    )
}

export default Question;