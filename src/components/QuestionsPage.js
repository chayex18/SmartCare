import React from "react";
import { Link } from "react-router-dom";

const QuestionsPage = () => {
  return (
    <div>
      <h1>Here are the following questions</h1>
      <Link to="/">
        <button>Back to Landing Page</button>
      </Link>
    </div>
  );
};

export default QuestionsPage;
