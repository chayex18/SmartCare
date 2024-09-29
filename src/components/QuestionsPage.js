import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    question: "How often do you perform physical activity?",
    options: [
      { answer: "No Activity", score: 0 },
      { answer: "Light Activity(1-2 times per week)", score: 25 },
      { answer: "Moderate Activity(3-4 times per week)", score: 50 },
      { answer: "Active (5-6 times per week)", score: 75 },
      { answer: "Very Active (daily physical activity)", score: 100 },
    ],
  },
  {
    id: 2,
    question: "How much do you sleep each night on average?",
    options: [
      { answer: "Less than 5 hours per night", score: 0 },
      { answer: "5-6 hours per night", score: 50 },
      { answer: "7-8 hours per night(recommended)", score: 100 },
      { answer: "More than 9 hours per night", score: 75 },
    ],
  },
  {
    id: 3,
    question: "How would you qualify your diet?",
    options: [
      {
        answer:
          "Mostly unhealthy diet (fast food, sugary drinks, little balance)",
        score: 0,
      },
      {
        answer:
          "Somewhat balanced diet (occasional fast food, some healthy meals)",
        score: 50,
      },
      {
        answer: "Balanced diet (regular fruits, vegetables, lean proteins)",
        score: 75,
      },
      {
        answer:
          "Highly nutritious, whole food diet (very few processed foods, highly varied nutrients)",
        score: 100,
      },
    ],
  },
  {
    id: 4,
    question: "How regularly do you smoke?",
    options: [
      { answer: "Don't smoke", score: 100 },
      { answer: "Occasionally smoke(once a week or less)", score: 50 },
      { answer: "Regularly smoke(a few times a week)", score: 25 },
      { answer: "Smoke every day", score: 0 },
    ],
  },
];

const QuestionsPage = () => {
  const [answers, setAnswers] = useState({});
  const [yesNoAnswer, setYesNoAnswer] = useState(null); // Track "Yes/No" question response
  const [studentAnswer, setStudentAnswer] = useState(null); // Track "Yes/No" for student
  const [gpaRange, setGpaRange] = useState(null); // Track GPA range for bonus points
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (questionId, score) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: score,
    }));
    setError(""); // Clear error on change
  };

  // Handles "Yes/No" response change
  const handleYesNoChange = (response) => {
    setYesNoAnswer(response); // Store response but don't affect score
  };

  // Handles "Yes/No" for student status
  const handleStudentChange = (response) => {
    setStudentAnswer(response);
  };

  // Handles GPA range change (only available if user is a student)
  const handleGpaChange = (gpa) => {
    setGpaRange(gpa);
  };

  const totalScore = Object.values(answers).reduce(
    (acc, curr) => acc + curr,
    0
  );
  const answeredQuestions = Object.keys(answers).length;
  const averageScore =
    answeredQuestions > 0 ? (totalScore / answeredQuestions).toFixed(2) : 0;

  // Calculate bonus points from GPA range if applicable
  const calculateBonusPoints = () => {
    switch (gpaRange) {
      case "3.8-4.0":
        return 5;
      case "3.5-3.7":
        return 3;
      case "3.0-3.4":
        return 2;
      case "2.5-2.9":
        return 1;
      default:
        return 0;
    }
  };

  const bonusPoints = calculateBonusPoints();

  const handleSubmit = () => {
    // Check if all required questions are answered
    const requiredQuestions = [1, 4]; // Update with all required question IDs
    for (let id of requiredQuestions) {
      if (answers[id] === undefined) {
        setError("Please answer all questions before submitting.");
        return;
      }
    }
    if (studentAnswer === null) {
      setError("Please answer the 'Are you a student?' question.");
      return;
    }

    // Check if GPA is answered if user is a student
    if (studentAnswer === "Yes" && gpaRange === null) {
      setError("Please select your GPA range.");
      return;
    }

    const finalTotalScore = totalScore + bonusPoints;

    // if (answeredQuestions < questions.length) {
    //   setError("Please answer all questions before submitting.");
    //   return;
    // }
    // Check if "Yes/No" question is answered (optional)
    if (answers[4] < 100 && yesNoAnswer === null) {
      setError("Please answer the 'Yes/No' question.");
      return;
    }
    // Navigate to results page and pass the scores
    navigate("/results", {
      state: {
        totalScore: finalTotalScore,
        averageScore,
        yesNoAnswer,
        studentAnswer,
        gpaRange,
      },
    });
  };

  return (
    <div>
      <h1>Questions</h1>
      {questions.map((q) => {
        // Conditionally render the follow-up question
        if (q.id === 5 && answers[4] >= 100) {
          return null; // Skip this question if user selected "Don't smoke"
        }

        return (
          <div key={q.id}>
            <p>{q.question}</p>
            {q.options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={option.score}
                  checked={answers[q.id] === option.score}
                  onChange={() => handleChange(q.id, option.score)}
                />
                {option.answer} ({option.score} points)
              </label>
            ))}
          </div>
        );
      })}

      {/* Conditionally render the "Yes/No" question based on previous answer */}
      {answers[4] < 100 && (
        <div>
          <p>Do smoke E-cigarrettes</p>
          <label>
            <input
              type="radio"
              name="yesNo"
              value="Yes"
              checked={yesNoAnswer === "Yes"}
              onChange={() => handleYesNoChange("Yes")}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="yesNo"
              value="No"
              checked={yesNoAnswer === "No"}
              onChange={() => handleYesNoChange("No")}
            />
            No
          </label>
        </div>
      )}

      {/* "Are you a student?" question */}
      <div>
        <p>Are you a student?</p>
        <label>
          <input
            type="radio"
            name="student"
            value="Yes"
            checked={studentAnswer === "Yes"}
            onChange={() => handleStudentChange("Yes", setStudentAnswer)}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="student"
            value="No"
            checked={studentAnswer === "No"}
            onChange={() => handleStudentChange("No", setStudentAnswer)}
          />
          No
        </label>
      </div>

      {/* Conditionally render GPA range question if the user is a student */}
      {studentAnswer === "Yes" && (
        <div>
          <p>What is your GPA range?</p>
          <label>
            <input
              type="radio"
              name="gpaRange"
              value="3.8-4.0"
              checked={gpaRange === "3.8-4.0"}
              onChange={() => handleGpaChange("3.8-4.0")}
            />
            3.8 - 4.0 (Bonus +5)
          </label>
          <label>
            <input
              type="radio"
              name="gpaRange"
              value="3.5-3.7"
              checked={gpaRange === "3.5-3.7"}
              onChange={() => handleGpaChange("3.5-3.7")}
            />
            3.5 - 3.7 (Bonus +3)
          </label>
          <label>
            <input
              type="radio"
              name="gpaRange"
              value="3.0-3.4"
              checked={gpaRange === "3.0-3.4"}
              onChange={() => handleGpaChange("3.0-3.4")}
            />
            3.0 - 3.4 (Bonus +2)
          </label>
          <label>
            <input
              type="radio"
              name="gpaRange"
              value="2.5-2.9"
              checked={gpaRange === "2.5-2.9"}
              onChange={() => handleGpaChange("2.5-2.9")}
            />
            2.5 - 2.9 (Bonus +1)
          </label>
          <label>
            <input
              type="radio"
              name="gpaRange"
              value="below-2.5"
              checked={gpaRange === "below-2.5"}
              onChange={() => handleGpaChange("below-2.5")}
            />
            Below 2.5 (No bonus)
          </label>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
  // <div>
  //   <h1>Questions</h1>
  //   {questions.map((q) => (

  //     <div key={q.id}>
  //       <p>{q.question}</p>
  //       {q.options.map((option) => (
  //         <label key={option}>
  //           <input
  //             type="radio"
  //             name={`question-${q.id}`}
  //             value={option.score}
  //             checked={answers[q.id] === option.score}
  //             onChange={() => handleChange(q.id, option.score)}
  //           />
  //           {option.answer}
  //         </label>
  //       ))}
  //     </div>
  //   ))}
  //   {error && <p style={{ color: "red" }}>{error}</p>}
  //   <div>
  //     <button onClick={handleSubmit}>Submit</button>
  //   </div>
  // </div>
  // );
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
