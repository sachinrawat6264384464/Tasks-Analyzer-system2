import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About Task Analyzer</h1>
      <p>
        Task Analyzer is a web app built with React and Django to help you prioritize your tasks efficiently.
      </p>
      <p>
        You can create an account, log in, add tasks, and see recommendations on which tasks to focus on first.
      </p>
      <p>
        This project uses REST API to communicate between the frontend and backend, ensuring fast and secure data handling.
      </p>
    </div>
  );
};

export default About;
