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
        navigate("/dashboard", { state: { name: user.name } });
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Failed to communicate with the server.");
    }
  };

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
