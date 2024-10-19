import { NavLink } from "react-router-dom"
import "./Navbar.css"
import { useAuth } from "../store/auth";

const Navbar = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <header className="header">
      <div className="Logo">
        <NavLink to="/">Hi, {user ? user.username : "User"}</NavLink>
      </div>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/services">services</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          {isLoggedIn ? (
            <li><NavLink to="/logout">Logout</NavLink></li>
          ) : 
          (
            <>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/register">Register</NavLink></li>
            </>
          )
          }
         
        </ul>
      </nav>
    </header>
  )
}

export default Navbar