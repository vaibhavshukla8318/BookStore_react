// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RxCross2 } from "react-icons/rx";
import './css/Admin.css';

const UpdateBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    image: '',
    pdf: [],
  });

  const params = useParams();
  const { authorizationToken, API } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const handlePDFChange = (index, value) => {
    const updatedPDFs = [...bookData.pdf];
    updatedPDFs[index] = value;
    setBookData({
      ...bookData,
      pdf: updatedPDFs,
    });
  };

  const addPDFField = () => {
    setBookData({
      ...bookData,
      pdf: [...bookData.pdf, ''],
    });
  };

  const removePDFField = (index) => {
    const updatedPDFs = bookData.pdf.filter((_, i) => i !== index);
    setBookData({
      ...bookData,
      pdf: updatedPDFs,
    });
  };

  // get book by id (single book)
  const getSingleBookData = async () => {
    try {
      const response = await fetch(`${API}/api/bookStore/books/${params.id}`, {
        method: 'GET',
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log('Book data:', data);
      setBookData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleBookData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/api/bookStore/books/update/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken,
        },
        body: JSON.stringify(bookData),
      });
      if (response.ok) {
        toast.success('Book updated successfully');
      } else {
        toast.error('Failed to update book');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="update-container">
      <h2>Update Your Book</h2>
      <form className="update-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your title"
            value={bookData.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Enter your author"
            value={bookData.author}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="Enter your image URL"
            value={bookData.image}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>PDF Links</label>
          {bookData.pdf.map((pdfLink, index) => (
            <div key={index} className="pdf-input-group">
              <input
                type="text"
                placeholder={`Enter PDF link #${index + 1}`}
                value={pdfLink}
                onChange={(e) => handlePDFChange(index, e.target.value)}
                required
              />
              <span type="button" onClick={() => removePDFField(index)} className="remove-btn">
                <RxCross2 />
              </span>
            </div>
          ))}
          <button type="button" onClick={addPDFField} className="add-btn">
            Add PDF Link
          </button>
        </div>

        <button type="submit" className="submit-btn">Update</button>
      </form>
    </div>
  );
};

export default UpdateBook;
