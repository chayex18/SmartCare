import { useLocation, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const ResultsPage = () => {
  const location = useLocation();
  const {
    totalScore,
    averageScore,
    physicalActivity,
    sleepActivity,
    dietQuality,
    smokeActivity,
    yesNoAnswer,
    studentAnswer,
    gpaRange,
  } = location.state || {};

  const navigate = useNavigate();

  // State to store remaining time and whether the discount is locked
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes = 180 seconds
  const [isDiscountLocked, setIsDiscountLocked] = useState(false);

  // Function to calculate the discount based on average score
  const calculateDiscount = () => {
    if (averageScore >= 90) return 40;
    if (averageScore >= 80) return 30;
    if (averageScore >= 70) return 25;
    if (averageScore >= 60) return 20;
    if (averageScore >= 50) return 10;
    return 5;
  };

  const discount = calculateDiscount();

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer); // Cleanup the timer on component unmount
    } else {
      setIsDiscountLocked(true); // Lock the discount when time runs out
    }
  }, [timeLeft]);

  const handleGoToSignUp = () => {
    if (!isDiscountLocked) {
      // Navigate to dashboard with user data
      navigate("/signup", {
        state: {
          totalScore,
          averageScore,
          physicalActivity, // Pass the user's physical activity data to the dashboard
          sleepActivity,
          dietQuality,
          smokeActivity,
          yesNoAnswer,
          studentAnswer,
          gpaRange,
        },
      });
    }
  };

  // Format time in mm:ss format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg text-center">
        <h1 className="text-4xl font-bold text-primaryRed mb-6">
          Your Wellness Score
        </h1>

        <p className="text-xl font-semibold text-gray-700 mb-4">
          Congratulations! Based on your wellness score, you're eligible for a{" "}
          {discount}% discount!
        </p>

        {!isDiscountLocked ? (
          <p className="text-lg text-gray-800 mb-6">
            Sign up within{" "}
            <span className="font-bold text-primaryRed">
              {formatTime(timeLeft)}
            </span>{" "}
            to lock in your discount.
          </p>
        ) : (
          <p className="text-lg text-red-600 mb-6">The discount has expired.</p>
        )}

        {/* Sign-up button, disabled when the discount is locked */}
        <button
          onClick={handleGoToSignUp}
          className={`w-full py-3 text-lg font-bold text-white rounded-lg transition duration-300 ${
            isDiscountLocked
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primaryRed hover:bg-red-700"
          }`}
          disabled={isDiscountLocked}
        >
          {isDiscountLocked ? "Discount Expired" : "Sign Up Now"}
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
