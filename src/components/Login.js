import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verify user credentials
    try {
      const response = await fetch("http://localhost:5001/users");
      const users = await response.json();
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        console.log("User logged in:", { username });
        // Redirect to Dashboard page
        navigate("/dashboard", {
          state: {
            name: user.name,
            averageScore: user.averageScore,
            dietQuality: user.dietQuality,
            yesNoAnswer: user.yesNoAnswer,
            physicalActivity: user.physicalActivity,
            dietQuality: user.dietQuality,
          },
        });
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Failed to communicate with the server.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold text-center text-red-600 mb-4">
          Log In
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
