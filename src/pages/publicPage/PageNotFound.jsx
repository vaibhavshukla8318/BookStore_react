// eslint-disable-next-line no-unused-vars
import React from 'react';
import './css/PageNotFound.css';

const PageNotFound = () => {
  return (
    <div className="pagenotfound-container">
      <div className="text-section">
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.</p>
        <a href="/" className="back-home">Go Back Home</a>
      </div>
      <div className="animation-section">
        <img src="https://images.unsplash.com/photo-1531329462425-1c51ae1c9bc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDI4fHxjb21wdXRlciUyMGVycm9yfGVufDB8fHx8MTY5NzQxNTUzMA&ixlib=rb-1.2.1&q=80&w=400" alt="404 Not Found" className="animation-img" />
      </div>
    </div>
  );
};

export default PageNotFound;
