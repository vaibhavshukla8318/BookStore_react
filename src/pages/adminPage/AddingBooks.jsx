import { useState } from 'react';
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';
import './css/Admin.css';

const AddingBooks = () => {
 
  const [books, setBooks] = useState({
    title: "",
    author: "",
    image: "",
    pdf: []
  });

  const { API, authorizationToken } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "pdf") {
      setBooks((prevBooks) => ({
        ...prevBooks,
        pdf: value.split(",").map((url) => url.trim())
      }));
    } else {
      setBooks((prevBooks) => ({
        ...prevBooks,
        [name]: value
      }));
    }
  };

  // Define the same URL validation function
  const isValidImageUrl = (url) => {
    const regex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
    return regex.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(books);

    const image = document.getElementById('image').value;

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

      if (response.ok) {
        setBooks({
          title: "",
          author: "",
          image: "",
          pdf: []
        });
        toast.success("Added Successfully");
      } else {
        const errorMessage = res_data.message || "Failed to add book";
        toast.error(errorMessage);
      }
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

        <div className="form-group">
          <label htmlFor="pdf">PDF</label>
          <input
            type="text"
            id="pdf"
            name="pdf"
            placeholder="Enter PDF URLs (comma-separated)"
            value={books.pdf.join(", ")}
            onChange={handleInput}
          />
        </div>

        <button type="submit" className="submit-btn">Add Book</button>
      </form>
    </div>
  );
};

export default AddingBooks;
