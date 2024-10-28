// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import '../../pages/adminPage/css/Admin.css';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';

const AdminPanel = () => {
  const { user, isLoading } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  if (isLoading) {
    return <h1>Loading ...</h1>
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />
  }

  return (
    <>
      <div className="admin-container">

        {/* Navbar */}
        <header className="navbar">
            <div className="navbar-logo">
              <NavLink to="/admin/dashboard" className="link">Admin Panel</NavLink>
            </div>
            <div className="navbar-links">
              <NavLink to="/admin/users">Users</NavLink>

             <NavLink to="/admin/contacts">Contacts</NavLink>

              <a href="#settings">Settings</a>

              {/* Menu Icon */}
              <div className="menu-icon" onClick={toggleMenu}>
                &#9776;
              </div>
            </div>
        </header>

      

       
          {/* Sidebar */}
          <aside className={`sidebar ${showMenu ? "nav-links active" : "nav-links"}`}>
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
              <li><a href="#reports">Reports</a></li>
              <li><a href="#settings">Settings</a></li>
            </ul>
          </aside>
      
      </div>
      <Outlet />
    </>
  );
};

export default AdminPanel;
