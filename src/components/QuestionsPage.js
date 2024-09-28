import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const questions = [
  {
    question: "How satisfied are you with our service?",
    options: [1, 2, 3, 4, 5],
  },
  {
    question: "How likely are you to recommend us?",
    options: [1, 2, 3, 4, 5],
  },
  {
    question: "How easy was it to navigate our website?",
    options: [1, 2, 3, 4, 5],
  },
];

const QuestionsPage = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    setError("");
  };

  const totalScore = answers.reduce((acc, curr) => acc + (curr || 0), 0);
  const averageScore = answers.filter((answer) => answer !== null).length
    ? (totalScore / answers.filter((answer) => answer !== null).length).toFixed(
        2
      )
    : 0;

  const handleSubmit = () => {
    if (answers.includes(null)) {
      setError("Please answer all questions before submitting.");
      return;
    }

    // Navigate to results page and pass the scores
    navigate("/results", { state: { totalScore, averageScore } });
  };

  return (
    <div>
      <h1>Questions</h1>
      {questions.map((q, index) => (
        <div key={index}>
          <p>{q.question}</p>
          {q.options.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                checked={answers[index] === option}
                onChange={() => handleChange(index, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

// const QuestionsPage = () => {
//   return (
//     <div>
//       <h1>Here are the following questions</h1>
//       <Link to="/">
//         <button>Back to Landing Page</button>
//       </Link>
//     </div>
//   );
// };

export default QuestionsPage;
