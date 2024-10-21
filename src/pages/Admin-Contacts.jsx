// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom';
import '../components/layouts/Admin.css'
import { useAuth } from '../store/auth'
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
      console.log("This is a contacts All data", data);
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
      const data = await response.json();
      console.log("User after delete", data);
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
            <div className="card">Total Users: 1023</div>
            <div className="card">Active Users: 854</div>
            <div className="card">Messages: 123</div>
          </div>
        </section>


        <section id="contacts">
          <h2>Contacts</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  {/* <th>Update</th> */}
                  <th>Delete</th>
                </tr>
              </thead>
              {contacts.map((currContact, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td>{currContact.username}</td>
                      <td>{currContact.email}</td>
                      <td>{currContact.message}</td>
                      {/* <td>Edit</td> */}
                      <td><button onClick={()=> deleteContactById(currContact._id)}>Delete</button></td>
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