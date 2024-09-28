import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const name = location.state?.name || "User"; // Default to "User" if name is not available
  const handleSignOut = () => {
    navigate("/"); // Redirect to landing page
  };
  return (
    <div>
      <h1>Welcome to Dashboard, {name}!</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default DashboardPage;
