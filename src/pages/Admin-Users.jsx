// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import '../components/layouts/Admin.css'
import { useAuth } from '../store/auth'

const AdminUsers = () => {
   const [user, setUser] = useState([]);
   const {authorizationToken} = useAuth();

   const getAllUsersData = async () =>{
     try {
      const response = await fetch('http://localhost:3000/api/admin/users', {
        method: "GET",
        headers: {
          Authorization: authorizationToken
         }
       });
       const data = await response.json();
       setUser(data);
       console.log("This is a use All data", data);
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
          <div className="card">Total Users: 1023</div>
          <div className="card">Active Users: 854</div>
          <div className="card">Messages: 123</div>
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
                        <th>Status</th>
                      </tr>
                    </thead>
                    {user.map((currUser, index) =>{
                      return(
                        <tbody  key={index}>
                          <tr>
                            <td>{currUser.name}</td>
                            <td>{currUser.email}</td>
                            <td>{currUser.phone}</td>
                            <td>Active</td>
                          </tr>
                        </tbody>
                      )
                      
                     })}
                  </table>
          
        </div>
      </section>

      {/* <section id="contacts">
        <h2>Contacts</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Michael Scott</td>
                <td>michael@dundermifflin.com</td>
                <td>Interested in collaboration!</td>
              </tr>
              <tr>
                <td>Pam Beesly</td>
                <td>pam@dundermifflin.com</td>
                <td>Requesting more information.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section> */}
       </main>
    </div>
  )
}

export default AdminUsers;