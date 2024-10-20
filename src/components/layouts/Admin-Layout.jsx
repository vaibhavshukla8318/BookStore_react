// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Admin.css';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

const AdminPanel = () => {
  return (
    <>
    <div className="admin-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-logo">
          <NavLink to="/admin" className="link">Admin Panel</NavLink>
        </div>
        <div className="navbar-links">
          <NavLink to="/admin/users">Users</NavLink>
          <NavLink to="/admin/contacts">Contacts</NavLink>
          <a href="#settings">Settings</a>
        </div>
       
      </header>

      {/* Sidebar */}
      <aside className="sidebar">
        <ul>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><NavLink to="/admin/users">Users</NavLink></li>
          <li><NavLink to="/admin/contacts">Contacts</NavLink></li>
          <li><a href="#reports">Reports</a></li>
          <li><a href="#settings">Settings</a></li>
        </ul>
      </aside>

      {/* Main Content */}
      {/* <main className="main-content">
      
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
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>john@example.com</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>Jane Doe</td>
                  <td>jane@example.com</td>
                  <td>Inactive</td>
                </tr>
              </tbody>
            </table>
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
        </section>
      </main> */}
       
    

    </div>
    <Outlet/>
  </>  
  );
};

export default AdminPanel
