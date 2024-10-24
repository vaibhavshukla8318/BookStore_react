// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../App.css';
import { useAuth } from '../store/auth';


const Services = () => {
  const {services} = useAuth();

  return (
    <div className="services-container">
      <h1>Our Services</h1>
      <div className="services-grid">
        {services.map((currElem, index) => {
          const {description, price, quantity, image} = currElem;
          
          return (
            <div key={index} className="service-card">
              <img src={image} alt={description} />
              <h2>{description}</h2>
              <p>Price: ${price}</p>
              <p>Quantity: {quantity}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;

