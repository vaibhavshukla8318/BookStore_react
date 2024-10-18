import React from 'react';
import '../App.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Header Section */}
      <header className="about-header">
        <h1>About Us</h1>
        <p>We are passionate about providing the best web solutions to our users.</p>
      </header>

      {/* Analytics Section */}
      <section className="analytics-section">
        <h2>Our Impact</h2>
        <div className="analytics-cards">
          <div className="card">
            <h3>500+</h3>
            <p>Projects Completed</p>
          </div>
          <div className="card">
            <h3>300+</h3>
            <p>Happy Clients</p>
          </div>
          <div className="card">
            <h3>150K+</h3>
            <p>Active Users</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team">
          <div className="team-member">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fG1hbnxlbnwwfHx8fDE2OTc0MTM0MDU&ixlib=rb-1.2.1&q=80&w=150" alt="Team Member" />
            <h3>John Doe</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fHdvbWFufGVufDB8fHx8MTY5NzQxMzQzNw&ixlib=rb-1.2.1&q=80&w=150" alt="Team Member" />
            <h3>Jane Smith</h3>
            <p>Lead Developer</p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to deliver high-quality digital products and services that empower businesses to succeed online. We believe in innovation, teamwork, and integrity.
        </p>
      </section>
    </div>
  );
};

export default About;
