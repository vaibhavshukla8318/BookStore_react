// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './css/Admin.css';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../store/auth';

const Comments = () => {
  const [books, setBooks] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getAllBooks = async () => {
    try {
      const response = await fetch(`${API}/api/bookStore/allBooks`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setBooks(data);
      // console.log("This is the comments Data", data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div className='admin-container'>
      <main className="main-content">
        <section id="dashboard">
          <h2>Dashboard</h2>
          <div className="dashboard-cards">
            <div className="card">Comments</div>
          </div>
        </section>

        <section id="users">
          <div className='inventoryHeader'>
            <NavLink className='link' to="/admin/inventory/bookRating">Update</NavLink>
            <NavLink className='link' to="/admin/inventory/comments">Comments</NavLink>
            <NavLink className='link' to="/admin/users">Users</NavLink>
            <NavLink className='link' to="/admin/contacts">Contacts</NavLink>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Comments</th>
                  <th>Reply</th>
                  <th>ID</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => {
                   
                  return book.comments.map((comment) => (
                    <tr className='table-row' key={comment._id}>
                       <td>
                      {book.title}
                      </td>
                      <td className='messageData'>
                        🟥{comment.content}
                      </td>

                       {comment.replies.length > 0 && (
                          <div>

                            {comment.replies.map((reply) => (
                             <td key={reply._id} className="messageData">👉{reply.content}</td>
                            ))}
                          </div>
                        )}
                      <td>{comment.userId}</td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </div>
        </section>

        <Outlet />
      </main>
    </div>
  );
};

export default Comments;
