// eslint-disable-next-line no-unused-vars
import React from 'react';
import './css/About.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        {/* Header Section */}
        <header className="about-header">
          <h1>About Us</h1>
          <p>We are passionate about connecting readers with the stories that inspire them.</p>
        </header>

        {/* Analytics Section */}
        <section className="analytics-section">
          <h2>Our Impact</h2>
          <div className="analytics-cards">
            <div className="card">
              <h3>100+</h3>
              <p>Books Sold</p>
            </div>
            <div className="card">
              <h3>50+</h3>
              <p>Happy Readers</p>
            </div>
            <div className="card">
              <h3>100+</h3>
              <p>Book Reviews</p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team">
            <div className="team-member">
              <img src="https://avatars.githubusercontent.com/u/118811794?v=4" alt="John Doe" />
              <h3>Vaibhav Shukla</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <img src="https://img.freepik.com/free-photo/lifestyle-businessman_23-2148102423.jpg?semt=ais_hybrid" alt="Jane Smith" />
              <h3>Jane Smith</h3>
              <p>Chief Marketing Officer</p>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to deliver a diverse selection of quality books that empower readers to explore new ideas and perspectives. We believe in the transformative power of literature.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
