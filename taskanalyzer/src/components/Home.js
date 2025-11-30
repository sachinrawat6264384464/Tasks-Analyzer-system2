import React from "react";
import "./Home.css";   // <-- yaha CSS include karo

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Task Analyzer</h1>
      <p className="home-text">
        This is your personal task management and analysis dashboard.
      </p>
      <p className="home-text">
        You can add tasks, analyze priorities, and keep track of your daily work.
      </p>
    </div>
  );
};

export default Home;
