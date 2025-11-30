import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/dashboard";
import AddTasks from "./components/Addtasks";
import Home from "./components/Home";
import About from "./components/About";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addtasks" element={<AddTasks />} />
      </Routes>
    </Router>
  );
}

export default App;
