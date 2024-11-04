// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import './css/Admin.css'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../store/auth'
import {toast} from 'react-toastify'

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const {authorizationToken, API} = useAuth();

  const getAllConatactData = async () =>{
    try {
     const response = await fetch(`${API}/api/admin/contact`, {
       method: "GET",
       headers: {
         Authorization: authorizationToken
        }
      });
      const data = await response.json();
      // console.log("This is a contacts All data", data);
      if(response.ok){
        setContacts(data);
      }
    } catch (error) {
     console.log(error);
    }
  }

   //  delete User by id
   const deleteContactById = async (id) =>{
    try {
     const response = await fetch(`${API}/api/admin/contact/delete/${id}`, {
       method: "DELETE",
       headers: {
         Authorization: authorizationToken
        }
      });
      // const data = await response.json();
      // console.log("User after delete", data);
      if(response.ok){
        toast.success("Contact deleted successfully");
        getAllConatactData();
      }
      else{
        toast.error("Failed to delete contact");
      }
    } catch (error) {
     console.log(error);
    }
  }


  useEffect(()=>{
    getAllConatactData();
  }, []);

  return (
    <div className='admin-container'>
       {/* Main Content */}
      <main className="main-content">
      
        <section id="dashboard">
          <h2>Dashboard</h2>
          <div className="dashboard-cards">
            {/* <div className="card">Total Users: 10</div>
            <div className="card">Active Users: 8</div> */}
            <div className="card">Messages: {contacts.length}</div>
          </div>
        </section>


        <section id="contacts">
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
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {contacts.map((currContact, index) => {
                return (
                  <tbody key={index}>
                    <tr className='table-row'>
                      <td>{currContact.username}</td>
                      <td>{currContact.email}</td>
                      <td><div className='messageData'>{currContact.message}</div></td>
                      
                      <td className='delete' onClick={()=> deleteContactById(currContact._id)}>Delete</td>
                    </tr>
                  </tbody>
                )
              })}
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminContacts