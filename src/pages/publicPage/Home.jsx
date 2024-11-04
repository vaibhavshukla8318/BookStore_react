// eslint-disable-next-line no-unused-vars
import React from 'react';
import './css/Public.css';

const Home = () => {
  return (
    <div className="home-container">
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Discover Your Next Favorite Book</h1>
          <p>Your gateway to an endless collection of books and knowledge.</p>
          <button>Shop Now</button>
        </div>
        <div className="hero-image">
          <img src="https://img.freepik.com/free-photo/abundance-choice-modern-bookstore-generated-by-ai_188544-42341.jpg?semt=ais_hybrid" alt="Book Store" />
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About Us</h2>
        <p>At Vaibhav&apos;s Bookstore, we are passionate about books and dedicated to connecting readers with the stories and knowledge that inspire them. With a wide variety of genres and formats, we offer something for every type of reader.</p>
      </section>

      {/* Collection Section */}
      <section className="collection">
        <h2>Our Collections</h2>
        <div className="collection-items">
          <div className="item">
            <img src="https://img.freepik.com/free-photo/open-book-with-fairytale-scene_52683-107845.jpg?semt=ais_hybrid" alt="Fiction Collection" />
            <p>Fiction Books</p>
          </div>
          <div className="item">
            <img src="https://img.freepik.com/premium-photo/female-scientist-wearing-vr-headset-touching-dna_979520-131195.jpg?semt=ais_hybrid" alt="Science Books" />
            <p>Science & Technology</p>
          </div>
          <div className="item">
            <img src="https://img.freepik.com/free-vector/app-development-concept-with-laptop_23-2148699364.jpg?semt=ais_hybrid" alt="Programming Books" />
            <p>Programming & Development</p>
          </div>
        </div>
      </section>

      {/* Text Section */}
      <section className="texts">
        <h2>Why Choose Us?</h2>
        <div className="text-items">
          <div className="text">
            <h3>Curated Collections</h3>
            <p>We offer expertly curated collections to make finding your next great read easier than ever. Discover books by bestsellers, emerging authors, and timeless classics.</p>
          </div>
          <div className="text">
            <h3>Our Mission</h3>
            <p>Our mission is to foster a love for reading by providing accessible and diverse reading materials, helping everyone find the stories that resonate with them.</p>
          </div>
          <div className="text">
            <h3>Our Vision</h3>
            <p>We believe in creating a world where knowledge and stories are at everyone&apos;s fingertips, offering a seamless reading experience to all book lovers.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
