// Loader.js
// eslint-disable-next-line no-unused-vars
import React from 'react';
import './css/Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
