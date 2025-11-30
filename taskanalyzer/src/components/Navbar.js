import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user, logout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        TaskAnalyzer
      </Link>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" className="nav-link" onClick={toggleMenu}>
          Home
        </Link>
        <Link to="/about" className="nav-link" onClick={toggleMenu}>
          About
        </Link>

        
          <>
            <Link to="/dashboard" className="nav-link" onClick={toggleMenu}>
              Dashboard
            </Link>
            <Link to="/addtasks" className="nav-link" onClick={toggleMenu}>
              Add Tasks
            </Link>
          </>
        
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
}

export default Navbar;
