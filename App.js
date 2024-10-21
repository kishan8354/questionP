import React, { useState, useEffect } from "react";
import "./App.css";

// Questions data
const questionsData = [
    {
        question: "What is the capital of India?",
        options: ["Berlin", "Paris", "India", "Rome"],
        correctAnswer: "India",
    },
    {
        question: "Which is the oldest IIT in India?",
        options: ["IIT Delhi", "IIT Bombay", "IIT Kharagpur", "IIT Madras"],
        correctAnswer: "IIT Kharagpur",
    },
    {
        question: "In which year was IIT Bombay established?",
        options: ["1951", "1958", "1961", "1959"],
        correctAnswer: "1958",
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

    const handleSubmit = () => {
        if (!submitted && selectedOptions[currentQuestionIndex] !== undefined) {
            setSubmittedOptions({
                ...submittedOptions,
                [currentQuestionIndex]: selectedOptions[currentQuestionIndex],
            });
            setSubmitted(true);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSubmitted(false);
        } else {
            alert("You've completed the questionnaire!");
        }
    };

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
