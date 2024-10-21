import React, { useState, useEffect } from "react";
import "./App.css";

// Questions data
const questionsData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Paris", "Madrid", "Rome"],
        correctAnswer: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Venus", "Mars", "Jupiter"],
        correctAnswer: "Mars",
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Whale", "Shark", "Dolphin"],
        correctAnswer: "Whale",
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Shakespeare", "Dickens", "Hemingway", "Tolstoy"],
        correctAnswer: "Shakespeare",
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Oxygen", "Osmium", "Ozone", "Orion"],
        correctAnswer: "Oxygen",
    },
];

function App() {
    const [timeLeft, setTimeLeft] = useState(60);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [submittedOptions, setSubmittedOptions] = useState({});
    const [submitted, setSubmitted] = useState(false);

    // Timer effect
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearInterval(timer);
        } else {
            alert("Time's up! Please reload the page to try again.");
        }
    }, [timeLeft]);

    // Handle option selection for a specific question
    const handleOptionClick = (questionIndex, option) => {
        if (!submitted) {
            setSelectedOptions({
                ...selectedOptions,
                [questionIndex]: option,
            });
        }
    };

    // Handle submit for the current question
    const handleSubmit = () => {
        if (!submitted && selectedOptions[currentQuestionIndex] !== undefined) {
            setSubmittedOptions({
                ...submittedOptions,
                [currentQuestionIndex]: selectedOptions[currentQuestionIndex],
            });
            setSubmitted(true);
        }
    };

    // Move to the next question
    const handleNext = () => {
        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSubmitted(false);
        } else {
            alert("You've completed the questionnaire!");
        }
    };

    // Function to determine class name for option styling
    const getOptionClass = (questionIndex, option) => {
        if (!submitted) {
            return selectedOptions[questionIndex] === option ? "selected" : "";
        }
        const isCorrect = questionsData[questionIndex].correctAnswer === option;
        const isSelected = selectedOptions[questionIndex] === option;
        if (isSelected && isCorrect) return "correct";
        if (isSelected && !isCorrect) return "incorrect";
        if (!isSelected && isCorrect) return "correct";
        return "";
    };

    // Current question data
    const currentQuestion = questionsData[currentQuestionIndex];

    return (
        <div className="container">
            <h1>Questionnaire</h1>
            <div className="timer">Time left: {timeLeft} seconds</div>
            
            {/* Render current question */}
            <div className="question">{currentQuestion.question}</div>
            <div className="options">
                {currentQuestion.options.map((option, index) => (
                    <div
                        key={index}
                        className={`option ${getOptionClass(currentQuestionIndex, option)}`}
                        onClick={() => handleOptionClick(currentQuestionIndex, option)}
                    >
                        {option}
                    </div>
                ))}
            </div>

            {/* Submit and Next Button */}
            {!submitted ? (
                <button className="submit-btn" onClick={handleSubmit}>
                    Submit
                </button>
            ) : (
                <button className="submit-btn" onClick={handleNext}>
                    Next
                </button>
            )}
        </div>
    );
}

export default App;
