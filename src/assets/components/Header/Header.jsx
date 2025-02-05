import React, { useState, useEffect } from "react";
import { FaSearch, FaBars, FaUser, FaTimes } from "react-icons/fa"; 
import logo from "../../img/logo/logo.png";
import "./head.css";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [userNavOpen, setUserNavOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize); 
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header>
      <div className="header-container">
        {isMobile ? (
          <FaBars className="menu-icon" onClick={() => setNavOpen(!navOpen)} />
        ) : (
          <nav>
            <ul>
              <li><a href="">Home</a></li>
              <li><a href="">About</a></li>
              <li><a href="">Services</a></li>
              <li><a href="">Contact</a></li>
            </ul>
          </nav>
        )}

        <div className="logo">
          <a href=""><img src={logo} alt="xp" /></a>
        </div>

        <div className="right">
          <FaSearch className="search-icon" />

          {isMobile ? (
            <FaUser className="user-icon" onClick={() => setUserNavOpen(!userNavOpen)} />
          ) : (
            <nav>
              <ul>
                <li><a href="">Login</a></li>
                <li><a href="">Register</a></li>
              </ul>
            </nav>
          )}
        </div>
      </div>

      {isMobile && navOpen && (
        <div className="mobile-menu">
          <FaTimes className="close-icon" onClick={() => setNavOpen(false)} />
          <ul>
            <li><a href="">Home</a></li>
            <li><a href="">About</a></li>
            <li><a href="">Services</a></li>
            <li><a href="">Contact</a></li>
          </ul>
        </div>
      )}

      {isMobile && userNavOpen && (
        <div className="user-menu">
          <FaTimes className="close-icon" onClick={() => setUserNavOpen(false)} />
          <ul>
            <li><a href="">Login</a></li>
            <li><a href="">Register</a></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
