import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center p-6 bg-white shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-primaryRed">SmartCare</h1>
        </div>
        <div>
          <Link to="/login" className="text-primaryRed font-semibold ">
            Log In
          </Link>
        </div>
      </nav>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-[80vh] bg-gradient-to-r from-white via-red-100 to-red-200">
        <h1 className="text-primaryRed text-5xl md:text-7xl font-bold mb-6 text-center">
          Welcome to SmartCare
        </h1>
        <p className="text-gray-700 text-lg md:text-xl text-center max-w-3xl">
          Simplifying insurance for young adults by rewarding healthy habits
          with lower premiums. Track physical activity, sleep, nutrition, and
          more to improve your Wellness Score and unlock bonus rewards!
        </p>
        <Link to="/questions">
          <button className="mt-6 bg-primaryRed text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 transition duration-300">
            Start
          </button>
        </Link>
      </div>

      {/* Subtle Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-white to-red-50 animate-gradient-x opacity-40"></div>
    </div>
  );
};

export default LandingPage;
