import React, { useState, useEffect } from "react";
import { FaSearch, FaBars, FaUser, FaTimes } from "react-icons/fa";
import logo from "../../img/logo/logo.png";
import "./head.css";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [userNavOpen, setUserNavOpen] = useState(false);
  const [allNavOpen, setAllNavOpen] = useState(false);
  const [animateNav, setAnimateNav] = useState(false);
  const [animateUserNav, setAnimateUserNav] = useState(false);
  const [animateAllNav, setAnimateAllNav] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (navOpen) {
      setUserNavOpen(false);
      setAllNavOpen(false);
      setTimeout(() => setAnimateNav(true), 50);
    } else {
      setAnimateNav(false);
    }
  }, [navOpen]);

  useEffect(() => {
    if (userNavOpen) {
      setNavOpen(false);
      setAllNavOpen(false);
      setTimeout(() => setAnimateUserNav(true), 50);
    } else {
      setAnimateUserNav(false);
    }
  }, [userNavOpen]);

  useEffect(() => {
    if (allNavOpen) {
      setNavOpen(false);
      setUserNavOpen(false);
      setTimeout(() => setAnimateAllNav(true), 50);
    } else {
      setAnimateAllNav(false);
    }
  }, [allNavOpen]);
  

  const [isAbove500, setIsAbove500] = useState(window.innerWidth < 500);

  useEffect(() => {
    const handleResize = () => {
      setIsAbove500(window.innerWidth < 500);
    };

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
              <li>
                <a href="">Home</a>
              </li>
              <li>
                <a href="">About</a>
              </li>
              <li>
                <a href="">Services</a>
              </li>
              <li>
                <a href="">Contact</a>
              </li>
            </ul>
          </nav>
        )}

        <div
          className="logo"
          onClick={() => {
            if (isAbove500) {
              setAllNavOpen(!allNavOpen);
              setNavOpen(false); 
              setUserNavOpen(false);
            }
          }}
        >
          <a href="#">
            <img src={logo} alt="xp" />
          </a>
        </div>

        <div className="right">
          <FaSearch className="search-icon" />

          {isMobile ? (
            <FaUser
              className="user-icon"
              onClick={() => setUserNavOpen(!userNavOpen)}
            />
          ) : (
            <nav>
              <ul>
                <li>
                  <a href="">Login</a>
                </li>
                <li>
                  <a href="">Register</a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>

      {isMobile && (
        <div
          className={`mobile-menu ${navOpen ? "open" : ""} ${
            animateNav ? "show" : ""
          }`}
        >
          <FaTimes className="close-icon" onClick={() => setNavOpen(false)} />
          <ul>
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
            <li>
              <a href="">Services</a>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
          </ul>
        </div>
      )}

      {isMobile && (
        <div
          className={`user-menu ${userNavOpen ? "open" : ""} ${
            animateUserNav ? "show" : ""
          }`}
        >
          <FaTimes
            className="close-icon"
            onClick={() => setUserNavOpen(false)}
          />
          <ul>
            <li>
              <a href="">Login</a>
            </li>
            <li>
              <a href="">Register</a>
            </li>
          </ul>
        </div>
      )}

      {isMobile && (
        <div
          className={`all-menu ${allNavOpen ? "open" : ""} ${
            animateAllNav ? "show" : ""
          }`}
        >
          <FaTimes
            className="close-icon"
            onClick={() => setAllNavOpen(false)}
          />
          <ul>
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
            <li>
              <a href="">Services</a>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
            <hr />
            <li>
              <a href="">Login</a>
            </li>
            <li>
              <a href="">Register</a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
