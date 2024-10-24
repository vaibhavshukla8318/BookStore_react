// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import './BookStore.css'

const BookStoreLayout = () => {
 
  const [isScrolled, setIsScrolled] = useState(false);
  const {isLoggedIn, isLoading, books} = useAuth();


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
      <main className="main-content">
        <section className='recently-added'>
          <div className='header-name'>
            <h2>Recently Added</h2>
            <small>our latest offers</small>
          </div>
          <div className='card-container'>
            {books.map((currData, index)=>{
              const {title, author, image} = currData;
              return(
                <>
                  <div className="book-card" key={index}>
                    <img src={image} alt="book cover" />
                    <div className='title-container'>
                      <p className='title'>{title}</p>
                      <p>{author}</p>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </section>
      </main>
      </div>
      <Outlet />
    </>
  );
};

export default BookStoreLayout;
