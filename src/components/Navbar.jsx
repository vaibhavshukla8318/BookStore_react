import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const menuRef = useRef(null); 

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const tooltipMessage = user?.isAdmin ? "Please enter here" : "Hey, you are not an admin";
  const openLibrohub = isLoggedIn ? "Please enter" : "Hey, you are not logged in";


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false); // Close menu if clicking outside
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <header className="header">
      <div className="Logo">
        <NavLink to="/" className="userName">Hi, {user ? user.username : "User"}</NavLink>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        &#9776;
      </div>
      <nav ref={menuRef} className={showMenu ? "nav-links active" : "nav-links"}>
        <ul>
          <li><NavLink className='link' to="/">Home</NavLink></li>
          <li><NavLink className='link' to="/about">About</NavLink></li>
          <li><NavLink className='link' to="/services">Services</NavLink></li>
          <li><NavLink className='link' to="/contact">Contact</NavLink></li>
          <li 
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                style={{ position: "relative" }}
              >
                <NavLink className='link' to="/bookStore">LibroHub</NavLink>
                {showTooltip && (
                  <div className="tooltip">{openLibrohub}</div>
                )}
          </li>
          {isLoggedIn ? (
            <>
              <li><NavLink className='link' to="/logout">Logout</NavLink></li>
              
              <li 
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                style={{ position: "relative" }}
              >
                <NavLink className='link' to="/admin/dashboard">Admin</NavLink>
                {showTooltip && (
                  <div className="tooltip">{tooltipMessage}</div>
                )}
              </li>
            </>
          ) : (
            <>
              <li><NavLink className='link' to="/login">Login</NavLink></li>
              <li><NavLink className='link' to="/register">Register</NavLink></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
