import React from 'react';
import '../App.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Welcome to Vaibhav's World</h1>
          <p>Your one-stop solution for learning and innovation.</p>
          <button>Get Started</button>
        </div>
        <div className="hero-image">
          <img src="../../public/images/heroImage.png" alt="Hero" />
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About Us</h2>
        <p>We are committed to providing high-quality education and resources for learners of all ages. Explore our wide range of subjects and interactive tools designed to help you succeed.</p>
      </section>

      {/* Collection Section */}
      <section className="collection">
        <h2>Our Collections</h2>
        <div className="collection-items">
          <div className="item">
            <img src="../../public/images/mathCollection.png" alt="Math Collection" />
            <p>Math Resources</p>
          </div>
          <div className="item">
            <img src="../../public/images/scienceCollectionImage.jpg" />
            <p>Science Resources</p>
          </div>
          <div className="item">
            <img src="../../public/images/programmingCollection.png" />
            <p>Programming Courses</p>
          </div>
        </div>
      </section>

      {/* Text Section */}
      <section className="texts">
        <h2>Explore More</h2>
        <div className="text-items">
          <div className="text">
            <h3>Why Choose Us?</h3>
            <p>We provide resources that are designed for ease of learning and effective knowledge transfer. Our tools and courses are built by experts.</p>
          </div>
          <div className="text">
            <h3>Our Mission</h3>
            <p>To make learning accessible to everyone and equip learners with the skills needed to thrive in today's fast-paced world.</p>
          </div>
          <div className="text">
            <h3>Our Vision</h3>
            <p>We envision a world where quality education is accessible, personalized, and impactful for learners of all ages.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
