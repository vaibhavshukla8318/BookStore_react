import { useState } from 'react';
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';
import './css/Admin.css';

const AddingBooks = () => {
  const [books, setBooks] = useState({
    title: "",
    author: "",
    image: "",
    pdf: [],
    category: ""
  });

  const [newCategory, setNewCategory] = useState("");
  const existingCategories = ['recent', 'highRated', 'frontend', 'backend', 'react', 'popular', 'software', 'dsa'];
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

  const handleCategoryChange = (e) => {
    setBooks((prevBooks) => ({
      ...prevBooks,
      category: e.target.value
    }));
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleImageInput = (e) => {
    const file = e.target.files ? e.target.files[0] : null; // Check if file is selected
    if (file) {
      setBooks((prevBooks) => ({
        ...prevBooks,
        image: file, // Store the file object
      }));
    } else {
      setBooks((prevBooks) => ({
        ...prevBooks,
        image: e.target.value, // Store the URL as a string
      }));
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", books.title);
    formData.append("author", books.author);
    formData.append("image", books.image);
    formData.append("pdf", JSON.stringify(books.pdf));
    formData.append("category", books.category || newCategory);
  
    try {
      const response = await fetch(`${API}/api/bookstore/addedBooks`, {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
        },
        body: formData,
      });
  
      const res_data = await response.json();
      
      if (response.ok) {
        toast.success("Added Successfully");
        setBooks({ title: "", author: "", image: "", pdf: [], category: "" });
      } else {
        toast.error(res_data.message || "Failed to add book");
      }
    } catch (error) {
      console.error("Error:", error);
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
            type="file"
            id="image"
            name="image"
            onChange={handleImageInput}
          />
          <input
            type="text"
            id="imageURL"
            name="image"
            placeholder="Or enter image URL"
            value={typeof books.image === "string" ? books.image : ""}
            onChange={(e) => handleInput(e)}
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

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={books.category}
            onChange={handleCategoryChange}
          >
            <option value="">Select a Category</option>
            {existingCategories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Or Add New Category</label>
          <input
            type="text"
            placeholder="Enter new category"
            value={newCategory}
            onChange={handleNewCategoryChange}
          />
        </div>

        <button type="submit" className="submit-btn">Add Book</button>
      </form>
    </div>
  );
};

export default AddingBooks;