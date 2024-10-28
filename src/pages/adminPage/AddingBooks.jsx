// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';
import './css/Admin.css';

const AddingBooks = () => {
 
  const [books, setBooks] = useState({
    title: "",
    author: "",
    image: ""
  });

  const { API, authorizationToken } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setBooks({
      ...books,
      [name]: value
    });
  };


  // Define the same URL validation function
 const isValidImageUrl = (url) => {
  const regex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
  return regex.test(url);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(books);
  

    // accessing the image from the HTML
    const image = document.getElementById('image').value;

    // Validate image URL before sending to backend
    if (!isValidImageUrl(image)) {
     toast.error("Invalid image URL");
     return;
   }

    try {
      const response = await fetch(`${API}/api/bookstore/addedBooks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken
        },
        body: JSON.stringify(books),
      });

      const res_data = await response.json();
      // console.log("res from server", res_data.message);

      if (response.ok) {
        setBooks({
          title: "",
          author: "",
          image: ""
        });
        toast.success("Added Successfully");
      } else {
        // Show specific server error message if validation fails
        const errorMessage = res_data.message || "Failed to add book";
        toast.error(errorMessage);
      }

      console.log(response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (


    <div className="update-container">
      <h2>Add a Book</h2>
      <form className="update-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter book title"
            value={books.title}
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Enter author name"
            value={books.author}
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="Enter image URL"
            value={books.image}
            onChange={handleInput}
          />
        </div>

        <button type="submit" className="submit-btn">Add Book</button>
      </form>
    </div>
  );
};

export default AddingBooks;
