import React from "react";
import { useLocation, Link } from "react-router-dom";

const ResultsPage = () => {
  const location = useLocation();
  const { totalScore, averageScore } = location.state || {
    totalScore: 0,
    averageScore: 0,
  };

  return (
    <div>
      <h1>Results</h1>
      <p>Total Score: {totalScore}</p>
      <p>Average Score: {averageScore}</p>
      <Link to="/questions">
        <button>Back to Questionnaire</button>
      </Link>
      <Link to="/signup">
        <button>Sign Up</button> {/* Sign-up button */}
      </Link>
    </div>
  );
};

export default ResultsPage;
