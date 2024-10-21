// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Admin.css';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';
// import Navbar from '../Navbar';

const AdminPanel = () => {
  const {user, isLoading} = useAuth();
  console.log("admin layout ", user);

  if(isLoading){
    return <h1>Loading ...</h1>
  }

  if(!user.isAdmin){
    return <Navigate to="/" />
  }


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
          <li><NavLink to="/">Home</NavLink></li>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><NavLink to="/admin/users">Users</NavLink></li>
          <li><NavLink to="/admin/contacts">Contacts</NavLink></li>
          <li><a href="#reports">Reports</a></li>
          <li><a href="#settings">Settings</a></li>
        </ul>
      </aside>
    </div>
    <Outlet/>
  </>  
  );
};

export default AdminPanel
