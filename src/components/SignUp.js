import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {
    totalScore,
    averageScore,
    physicalActivity,
    yesNoAnswer,
    studentAnswer,
    gpaRange,
    sleepActivity,
    dietQuality,
    smokeActivity,
  } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the user already exists
    try {
      const response = await fetch("http://localhost:5001/users");
      const users = await response.json();
      const userExists = users.find((user) => user.username === username);

      if (userExists) {
        setError("User already exist!");
        return;
      }

      // Register the user
      const newUser = {
        username,
        password,
        name,
        age,
        email,
        averageScore,
        physicalActivity,
        sleepActivity,
        dietQuality,
        yesNoAnswer,
      };
      await fetch("http://localhost:5001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      // Redirect to Dashboard page after signup
      navigate("/dashboard", {
        state: {
          totalScore,
          averageScore: newUser.averageScore,
          physicalActivity, // Pass the user's physical activity data to the dashboard
          sleepActivity,
          dietQuality,
          smokeActivity,
          yesNoAnswer,
          studentAnswer,
          gpaRange,
          name,
        },
      });
    } catch (err) {
      setError("Failed to communicate with the server.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-primaryRed mb-6 text-center">
          Registration
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Age:
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-primaryRed hover:bg-red-700 text-white font-bold rounded-lg transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
