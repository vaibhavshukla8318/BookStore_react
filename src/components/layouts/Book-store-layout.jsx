// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import '../../pages/bookStorePage/css/BookStore.css'

const BookStoreLayout = () => {
 
  const [isScrolled, setIsScrolled] = useState(false);
  const {isLoggedIn, isLoading} = useAuth();


  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  if(isLoading){
    return <h1>Loading ...</h1>
  }

  if(!isLoggedIn){
    return <Navigate to="/" />
  }


  

  return (
    <>
      <div className="book-store">
      {/* Navbar */}
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-logo">
          <NavLink to="/bookStore" className="link">Books Store 👉</NavLink>
        </div>
        <div className="navbar-links">
          <NavLink className="link" to="/">Home</NavLink>
          <a href="#settings">Settings</a>
        </div>
       
      </header>
      
      <Outlet />
      </div>
    </>
  );
};

export default BookStoreLayout;
