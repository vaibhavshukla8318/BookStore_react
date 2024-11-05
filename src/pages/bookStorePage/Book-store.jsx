// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import { FaArrowLeftLong, FaArrowRightLong, FaStar, FaHeart } from "react-icons/fa6";

const categories = ['recent', 'highRated', 'frontend', 'backend', 'react', 'popular'];

const createStateForCategories = (initialValue) =>
  categories.reduce((acc, category) => ({ ...acc, [category]: initialValue }), {});

const BookStore = () => {
  const [books, setBooks] = useState(createStateForCategories([]));
  const [currentPage, setCurrentPage] = useState(createStateForCategories(1));
  const [totalPages, setTotalPages] = useState(createStateForCategories(1));

  const itemsPerPage = 5;
  const { API, authorizationToken } = useAuth();

  // Fetch books from the backend by category with pagination
  const getBooksByCategory = async (category, page) => {
    try {
      const response = await fetch(
        `${API}/api/bookstore/books/categoryPagination/${category}?page=${page}&limit=${itemsPerPage}`,
        {
          method: 'GET',
          headers: {
            Authorization: authorizationToken
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBooks((prevBooks) => ({
          ...prevBooks,
          [category]: data.books || []
        }));
        setTotalPages((prevTotalPages) => ({
          ...prevTotalPages,
          [category]: data.totalPages || 1
        }));
      }
    } catch (error) {
      console.log(`Error fetching ${category} books: ${error}`);
    }
  };

  // Fetch books for all categories on component mount or page change
  useEffect(() => {
    categories.forEach((category) => {
      getBooksByCategory(category, currentPage[category]);
    });
  }, [currentPage]);

  // Pagination handlers
  const goToNextPage = (category) => {
    setCurrentPage((prevPage) => ({
      ...prevPage,
      [category]: Math.min(prevPage[category] + 1, totalPages[category])
    }));
  };

  const goToPrevPage = (category) => {
    setCurrentPage((prevPage) => ({
      ...prevPage,
      [category]: Math.max(prevPage[category] - 1, 1)
    }));
  };

  return (
    <main className="main-content">
      {categories.map((category) => (
        books[category].length > 0 && (
          <section key={category} className={`${category}-category`}>
            <div className="header-name">
              <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Books</h2>
              <div>
                <span onClick={() => goToPrevPage(category)} className={currentPage[category] === 1 ? "disabled" : ""}>
                  <FaArrowLeftLong />
                </span>
                <span onClick={() => goToNextPage(category)} className={currentPage[category] === totalPages[category] ? "disabled" : ""}>
                  <FaArrowRightLong />
                </span>
              </div>
            </div>
            <div className="card-container">
              <div>

              {books[category].map((currData) => {
                const { _id, title, author, image, likes, averageRating } = currData;
                return (
                  <Link to={`/bookstore/books/${_id}`} className="book-card" key={_id}>
                    <div className='like-container'>
                      <FaHeart style={{ color: '#FF1493' }} /> {likes.length}
                    </div>
                    <img src={image} alt="book cover" />
                    <div className="title-container">
                      <div>
                        <p className="title">{title}</p>
                        <p>{author}</p>
                      </div>
                      <div className="rating-container">
                        <FaStar style={{ color: 'gold' }} /> {averageRating.toFixed(1)}
                      </div>
                    </div>
                  </Link>
                );
              })}

              </div>
              <span>Page {currentPage[category]} of {totalPages[category]}</span>
            </div>
          </section>
        )
      ))}
    </main>
  );
};

export default BookStore;

