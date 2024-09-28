import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import QuestionsPage from "./components/QuestionsPage";
import ResultsPage from "./components/ResultsPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import DashboardPage from "./components/DashboardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
