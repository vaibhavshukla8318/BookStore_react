// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import './css/Admin.css'
import {NavLink, Outlet, Link} from 'react-router-dom';
import { useAuth } from '../../store/auth'

const BookRating = () => {
   const [book, setBook] = useState([]);
   const {authorizationToken, API} = useAuth();

   const getAllBooks = async () =>{
     try {
      const response = await fetch(`${API}/api/bookStore/allBooks`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken
         }
       });
       const data = await response.json();
       setBook(data);
      //  console.log("This is a user All data", data);
     } catch (error) {
      console.log(error);
     }
   }

  //  delete User by id
  const deleteBookById = async (id) =>{
    try {
     const response = await fetch(`${API}/api/bookStore/books/delete/${id}`, {
       method: "DELETE",
       headers: {
         Authorization: authorizationToken
        }
      });
      // const data = await response.json();
      // console.log("User after delete", data);
      if(response.ok){
        getAllBooks();
      }
    } catch (error) {
     console.log(error);
    }
  }



   useEffect(()=>{
    getAllBooks();
   }, []);


  return (
    <div className='admin-container'>
       <main className="main-content">
   
        <section id="dashboard">
          <h2>Dashboard</h2>
          <div className="dashboard-cards">
            <div className="card">Total Books: {book.length}</div>
          </div>
        </section>

         <section id="users">
          <div className="inventoryHeader">

           <NavLink className='link' to="/admin/inventory/bookRating">Update</NavLink>
           <NavLink className='link' to="/admin/inventory/comments">Comments</NavLink>
           <NavLink className='link' to="/admin/users">Users</NavLink>
           <NavLink className='link' to="/admin/contacts">Contacts</NavLink>

          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Images</th>
                  <th className='updateHeaderData'>Update</th>
                  <th>Total Likes</th>
                  <th>Average Ratings</th>
                  <th>Total Ratings</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {book.map((currUser, index) =>{
                return(
                <tbody  key={index}>
                  <tr className='table-row'>
                    <td>{currUser.title}</td>
                    <td>{currUser.author}</td>
                    <td><img className='inventoryImage' src={currUser.image} alt={currUser.title}/></td>
                    <td>
                      <Link  to={`/admin/bookStore/books/${currUser._id}/edit`} className='edit'>Edit</Link>
                    </td>
                    <td>{currUser.likes.length}</td>
                    <td>{currUser.averageRating}</td>
                    <td>{currUser.ratings.length}</td>
                    <td className='delete' onClick={()=> deleteBookById(currUser._id)}>Delete</td>
                  </tr>
                </tbody>
                )                      
              })}
              
            </table>       
          </div>
        </section> 
            

          <Outlet/>
       </main>
    </div>
  )
}

export default BookRating;
