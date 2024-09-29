import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    averageScore,
    physicalActivity,
    sleepActivity,
    dietQuality,
    yesNoAnswer,
    name,
  } = location.state || {};

  // Calculate discount based on average score
  const calculateDiscount = (average) => {
    if (average >= 90) return 0.4;
    if (average >= 80) return 0.3;
    if (average >= 70) return 0.25;
    if (average >= 60) return 0.2;
    if (average >= 50) return 0.1;
    return 0.05; // Less than 50%
  };

  const baseInsurancePrice = 100; // Example base price
  const discount = calculateDiscount(averageScore);
  const currentPrice = (baseInsurancePrice * (1 - discount)).toFixed(2);
  const higherScorePrice = (baseInsurancePrice * 0.5).toFixed(2); // 50% discount

  const dietActivityTips = {
    low: [
      "We need to work more on improving your diet. " +
        "<a href='https://www.nhs.uk/live-well/eat-well/how-to-eat-a-balanced-diet/eight-tips-for-healthy-eating/' className='learn-more'>Learn more</a>",
    ],
    moderate: [
      "Your diet is well, but we could make some improvement. " +
        "<a href='https://www.nhs.uk/live-well/eat-well/how-to-eat-a-balanced-diet/eight-tips-for-healthy-eating/' className='learn-more'>Learn more</a>",
    ],
    high: ["Your diet is in the right path. Keep it that way!"],
  };

  const ECig = {
    low: [
      "E-Cigarettes are awful for your health. " +
        "<a href='https://www.cdc.gov/tobacco/e-cigarettes/quitting.html' className='learn-more'>Learn more</a>",
    ],
  };

  // Example: display user-specific tips based on physical activity level
  const physicalActivityTips = {
    low: [
      "Tip: Start with 10-minute walks daily to gradually increase activity. " +
        "<a href='https://www.healthline.com/nutrition/how-to-start-exercising' className='learn-more'>Learn more</a>",
    ],
    moderate: [
      "Great job! Maintain your current activity but try adding strength training. " +
        "<a href='https://www.nhlbi.nih.gov/health/educational/wecan/get-active/getting-active.htm' target='_blank' rel='noopener noreferrer' className='learn-more'>Learn more</a>",
    ],
    high: [
      "Awesome! You're very active. Consider working on flexibility or balance exercises.",
    ],
  };

  const sleepActivityTips = {
    low: [
      "You need to improve your sleep schedule. " +
        "<a href='https://newsinhealth.nih.gov/2021/04/good-sleep-good-health' className='learn-more'>Learn more</a>",
    ],
    moderate: [
      "Your sleep shcedule might be better. " +
        "<a href='https://newsinhealth.nih.gov/2021/04/good-sleep-good-health' target='_blank' rel='noopener noreferrer' className='learn-more'>Learn more</a>",
    ],
    high: ["You are sleeping the right amount of hours!"],
  };

  let activityLevelMessage = [];
  if (physicalActivity <= 25) {
    activityLevelMessage = physicalActivityTips.low;
  } else if (physicalActivity <= 50) {
    activityLevelMessage = physicalActivityTips.moderate;
  } else {
    activityLevelMessage = physicalActivityTips.high;
  }
  if (sleepActivity <= 25) {
    activityLevelMessage.push(sleepActivityTips.low);
  } else if (sleepActivity <= 75) {
    activityLevelMessage.push(sleepActivityTips.moderate);
  } else {
    activityLevelMessage.push(sleepActivityTips.high);
  }
  if (dietQuality <= 25) {
    activityLevelMessage.push(dietActivityTips.low);
  } else if (dietQuality <= 75) {
    activityLevelMessage.push(dietActivityTips.moderate);
  } else {
    activityLevelMessage.push(dietActivityTips.high);
  }
  if (yesNoAnswer == "Yes") {
    activityLevelMessage.push(ECig.low);
  }
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % activityLevelMessage.length);
  };

  const prevTip = () => {
    setCurrentTipIndex(
      (prev) =>
        (prev - 1 + activityLevelMessage.length) % activityLevelMessage.length
    );
  };

  const displayName = name || "User"; // Default to "User" if name is not available
  const displayWellnessScore = averageScore || "70";
  const handleSignOut = () => {
    navigate("/"); // Redirect to landing page
  };
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-primaryRed mb-4">
        Welcome to the Dashboard, {displayName}!
      </h1>
      <h2 className="text-2xl mb-4">
        Your Current Wellness Score: {displayWellnessScore}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl mb-8">
        {/* Left Widget: Current Insurance Price */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">
            Current Insurance Premium Price
          </h3>
          <p className="text-2xl font-bold">${currentPrice}</p>
          <p className="text-sm mt-2 text-gray-600">
            This would be the price with your current Wellness Score discount.
          </p>
        </div>

        {/* Right Widget: 50% Discount Price */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">
            Premium if your Wellness Score was Higher
          </h3>
          <p className="text-2xl font-bold">${higherScorePrice}</p>
          <p className="text-sm mt-2 text-gray-600">
            This would be the price with a higher Wellness Score.
          </p>
        </div>
      </div>

      {/* Tips Carousel */}
      <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-lg mb-4">
        <h2 className="text-xl font-semibold mb-2">Activity Tips</h2>
        <p
          className="text-lg"
          dangerouslySetInnerHTML={{
            __html: activityLevelMessage[currentTipIndex],
          }}
        ></p>
        <div className="flex justify-between mt-4">
          <button onClick={prevTip} className="text-primaryRed hover:underline">
            Previous
          </button>
          <button onClick={nextTip} className="text-primaryRed hover:underline">
            Next
          </button>
        </div>
      </div>

      <button
        onClick={handleSignOut}
        className="mt-4 px-4 py-2 bg-primaryRed text-white font-bold rounded-lg transition duration-300 hover:bg-red-700"
      >
        Sign Out
      </button>
    </div>
  );
};

export default DashboardPage;
