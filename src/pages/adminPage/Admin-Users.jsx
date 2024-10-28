// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import './css/Admin.css'
import {Link} from 'react-router-dom';
import { useAuth } from '../../store/auth'

const AdminUsers = () => {
   const [user, setUser] = useState([]);
   const {authorizationToken, API} = useAuth();

   const getAllUsersData = async () =>{
     try {
      const response = await fetch(`${API}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken
         }
       });
       const data = await response.json();
       setUser(data);
       console.log("This is a user All data", data);
     } catch (error) {
      console.log(error);
     }
   }

  //  delete User by id
  const deleteUserById = async (id) =>{
    try {
     const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
       method: "DELETE",
       headers: {
         Authorization: authorizationToken
        }
      });
      const data = await response.json();
      console.log("User after delete", data);
      if(response.ok){
        getAllUsersData();
      }
    } catch (error) {
     console.log(error);
    }
  }



   useEffect(()=>{
     getAllUsersData();
   }, []);


  return (
    <div className='admin-container'>
       <main className="main-content">
   
        <section id="dashboard">
          <h2>Dashboard</h2>
          <div className="dashboard-cards">
            <div className="card">Total Users: {user.length}</div>
            {/* <div className="card">Active Users: 854</div>
            <div className="card">Messages: 123</div> */}
          </div>
        </section>

        <section id="users">
          <h2>Users</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  {/* <th>Status</th> */}
                  <th className='updateHeaderData'>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {user.map((currUser, index) =>{
                return(
                <tbody  key={index}>
                  <tr className='table-row'>
                    <td>{currUser.username}</td>
                    <td>{currUser.email}</td>
                    <td>{currUser.phone}</td>
                    {/* <td>Active</td> */}
                    <td>
                      <Link className='dataLink' to={`/admin/users/${currUser._id}/edit`}>Edit</Link>
                    </td>
                    <td><button onClick={()=> deleteUserById(currUser._id)}>Delete</button></td>
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

export default AdminUsers;